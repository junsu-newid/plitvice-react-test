import * as z from 'zod';

// 환경변수 생성 함수
const createEnv = () => {
    // 환경변수 스키마 정의
    const EnvSchema = z.object({
        API_URL: z.string(),
        APP_URL: z.string().optional().default('http://localhost:3000'), // 기본 Port 3000번으로 설정
    });

    // vite 환경 변수 처리 (import.meta.env)
    const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>((acc, curr) => {
        const [key, value] = curr;
        // Vite 프리픽스 필터링
        if (key.startsWith('VITE_')) {
            // 프리픽스 제거
            acc[key.replace('VITE_', '')] = value;
        }
        return acc;
    }, {});

    // 환경변수 파싱
    const parsedEnv = EnvSchema.safeParse(envVars);

    // 파싱 실패 시 에러 발생
    if (!parsedEnv.success) {
        throw new Error(
            `Invalid env provided.
    The following variables are missing or invalid:
    ${Object.entries(parsedEnv.error.flatten().fieldErrors)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}
    `,
        );
    }

    // 검증된 환경 변수 반환
    return parsedEnv.data;
};

// 환경변수 객체 export
export const env = createEnv();
