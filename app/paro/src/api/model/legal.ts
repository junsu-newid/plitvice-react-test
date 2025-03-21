import { Country, Language, LegalType } from '@/types/enums';

export type LegalItem = {
    id: number;
    content: string;
    type: LegalType;
    lang: Language;
    country: Country;
    updatedAt: string;
};
