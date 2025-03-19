export const Country = {
    US: 'US',
    KR: 'KR',
};
export type Country = (typeof Country)[keyof typeof Country];

export const Language = {
    en: 'en',
    ko: 'ko',
};
export type Language = (typeof Language)[keyof typeof Language];

export const LegalType = {
    PRIVACY_POLICY: 'PRIVACY',
    TERMS_OF_USE: 'TERMS',
    DO_NOT_SHARE: 'SHARE',
};
export type LegalType = (typeof LegalType)[keyof typeof LegalType];
