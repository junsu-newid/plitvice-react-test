import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createUpload } from '../api/create-upload';

export const FileUploader = () => {
    const [fileProgress, setFileProgress] = useState<Record<string, number>>({});
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleDrop = (acceptedFiles: File[]) => {
        setSelectedFiles(acceptedFiles);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || isUploading) return;

        setIsUploading(true);
        try {
            await createUpload(
                selectedFiles,
                (fileId: string, percent: number) => {
                    setFileProgress((prev) => ({ ...prev, [fileId]: percent }));
                },
                {
                    concurrency: 6, // 동시 청크 업로드 수
                    maxRetries: 5, // 최대 재시도 횟수
                },
            );
        } finally {
            setIsUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: { 'video/quicktime': ['.mov'], 'image/png': ['.png'] }, // MOV 파일만 허용
        multiple: true, // 다중 파일 업로드 허용
    });

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div style={{ width: '800px' }}>
            <div
                {...getRootProps()}
                style={{
                    border: '2px dashed #ccc',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
                }}
            >
                <input {...getInputProps()} />
                <p>파일을 드래그하거나 클릭하여 선택 (일단 MOV 파일만 가능)</p>
            </div>

            {selectedFiles.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>선택된 파일 목록:</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedFiles.map((file, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <span>
                                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                                <button
                                    onClick={() => removeFile(index)}
                                    style={{ marginLeft: '1rem', cursor: 'pointer' }}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isUploading ? 'not-allowed' : 'pointer',
                            opacity: isUploading ? 0.7 : 1,
                        }}
                    >
                        {isUploading ? '업로드 중...' : '업로드 시작'}
                    </button>
                </div>
            )}

            {Object.entries(fileProgress).length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>업로드 진행 상황:</h3>
                    {Object.entries(fileProgress).map(([fileId, percent]) => (
                        <div key={fileId} style={{ marginBottom: '0.5rem' }}>
                            <span>{fileId.split('-')[0]}</span>
                            <progress value={percent} max="100" style={{ marginLeft: '0.5rem', width: '70%' }} />
                            <span style={{ marginLeft: '0.5rem' }}>{percent.toFixed(0)}%</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
