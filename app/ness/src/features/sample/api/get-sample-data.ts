import { api } from '@/lib/api-client';

export type SampleData = unknown; // Replace with the actual type of your API response

export const getSampleData = async (): Promise<SampleData> => {
    // The api client already returns response.data due to the interceptor
    return api.get('/api/sample-api/');
};
