import { useCallback, useEffect, useState } from 'react';
import useCountry from '@/hooks/useCountry';
import { LegalItem } from '@/api/model/legal';
import { fetchLegal, upsertLegal } from '@/api/service/legal';
import { Country, Language, LegalType } from '@/types/enums';

const dummyLegalItem: LegalItem = {
    id: 0,
    content: '',
    type: LegalType.PRIVACY_POLICY,
    lang: Language.en,
    country: Country.US,
    updatedAt: '',
};

function useLegals() {
    const { country } = useCountry();
    const [type, setType] = useState<LegalType>(LegalType.PRIVACY_POLICY);
    const [lang, setLang] = useState<Language>(Language.en);
    const [list, setList] = useState<LegalItem[]>([]);
    const [data, setData] = useState<LegalItem>(dummyLegalItem);

    const changeType = useCallback((type: LegalType) => {
        setType(type);
    }, []);

    const changeLang = useCallback((lang: Language) => {
        setLang(lang);
    }, []);

    const upsert = useCallback((item: LegalItem) => {
        upsertLegal(item);
    }, []);

    useEffect(() => {
        const data = list.find((item) => item.type === type);
        if (data) {
            setData(data);
        } else {
            dummyLegalItem.type = type;
            dummyLegalItem.lang = lang;
            setData(dummyLegalItem);
        }
    }, [type, lang, list]);

    useEffect(() => {
        dummyLegalItem.country = country;
        fetchLegal(country).then((result) => setList(result));
    }, [country]);

    return {
        data,
        changeType,
        changeLang,
        upsert,
    };
}
export default useLegals;
