interface UploadOptions {
    chunkSize?: number;
    maxRetries?: number;
    concurrency?: number;
    allowedFileTypes?: string[];
}

interface UploadResult {
    fileId: string;
    fileName: string;
    success: boolean;
    error?: string;
}

export const createUpload = async (
    files: File[],
    onProgress: (fileId: string, percentage: number) => void,
    options: UploadOptions = {},
    onCancel?: (callback: () => void) => void,
): Promise<UploadResult[]> => {
    const { chunkSize = 5 * 1024 * 1024, maxRetries = 3, concurrency = 4, allowedFileTypes = [] } = options;

    let isCancelled = false;
    if (onCancel) {
        onCancel(() => {
            isCancelled = true;
        });
    }

    // 병렬 업로드 처리 함수
    const uploadWithRetry = async (file: File, fileId: string): Promise<UploadResult> => {
        // 파일 타입 검증
        if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
            return {
                fileId,
                fileName: file.name,
                success: false,
                error: `File type not allowed: ${file.type}`,
            };
        }

        try {
            const totalChunks = Math.ceil(file.size / chunkSize);
            let uploadedChunks = 0;
            const uploadedChunkIds = new Set<number>();

            const uploadChunk = async (chunk: number, retryCount = 0): Promise<void> => {
                if (isCancelled) {
                    throw new Error('Upload cancelled');
                }

                try {
                    const formData = new FormData();
                    const start = chunk * chunkSize;
                    const end = Math.min(start + chunkSize, file.size);
                    formData.append('file', file.slice(start, end));
                    formData.append('chunk', chunk.toString());
                    formData.append('totalChunks', totalChunks.toString());
                    formData.append('fileId', fileId);

                    const response = await fetch('/api/chunked-upload/', {
                        method: 'POST',
                        body: formData,
                    });

                    // 서버 응답 확인
                    if (!response.ok) {
                        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                    }

                    const result = await response.json();
                    if (!result.success) {
                        throw new Error(result.message || 'Unknown server error');
                    }

                    uploadedChunks++;
                    uploadedChunkIds.add(chunk);
                    onProgress(fileId, Math.round((uploadedChunks / totalChunks) * 100));
                } catch (error) {
                    if (retryCount < maxRetries && !isCancelled) {
                        // 지수 백오프를 사용한 재시도
                        const delay = 1000 * Math.pow(2, retryCount);
                        await new Promise((resolve) => setTimeout(resolve, delay));
                        return uploadChunk(chunk, retryCount + 1);
                    }
                    throw error;
                }
            };

            // 청크 병렬 처리 (동시성 제어)
            const chunks = Array.from({ length: totalChunks }, (_, i) => i);

            // 청크를 순차적으로 처리하되 동시성 제한
            while (chunks.length > 0 && !isCancelled) {
                const batch = chunks.splice(0, concurrency);
                await Promise.all(batch.map((chunk) => uploadChunk(chunk)));
            }

            // 모든 청크가 업로드되었는지 확인
            if (uploadedChunkIds.size !== totalChunks) {
                throw new Error(
                    `Not all chunks were uploaded. Expected: ${totalChunks}, Got: ${uploadedChunkIds.size}`,
                );
            }

            // 업로드 완료 알림
            const completeResponse = await fetch('/api/complete-upload/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileId, totalChunks }),
            });

            if (!completeResponse.ok) {
                throw new Error('Failed to complete upload');
            }

            return {
                fileId,
                fileName: file.name,
                success: true,
            };
        } catch (error) {
            return {
                fileId,
                fileName: file.name,
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    };

    // 파일별 업로드 시작
    const results = await Promise.all(
        files.map((file) => {
            const fileId = `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
            return uploadWithRetry(file, fileId);
        }),
    );

    return results;
};
