// 경로 설정
export const paths = {
    app: {
        root: {
            path: '/',
            getHref: () => '/',
        },
        dashboard: {
            path: '',
            getHref: () => '/',
        },
        simpleUpload: {
            path: 'simple-upload',
            getHref: () => '/simple-upload',
        },
        advancedUpload: {
            path: 'advanced-upload',
            getHref: () => '/advanced-upload',
        },
        encodingStatus: {
            path: 'encoding-status',
            getHref: () => '/encoding-status',
        },
    },
} as const;
