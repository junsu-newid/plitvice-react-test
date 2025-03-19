import { atomWithStorage } from 'jotai/utils';
import { Country } from '@/types/enums';

export const countryState = atomWithStorage<string>('countryState', Country.US);
