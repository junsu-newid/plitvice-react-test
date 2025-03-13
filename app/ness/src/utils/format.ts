import dayjs from 'dayjs';

// ex) "December 31, 2023 11:59 PM"
export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');

// ex) "12-31-2023 11:59 PM"
export const formatDateUS = (date: number) => dayjs(date).format('MM-DD-YYYY h:mm A');

// ex) "2023-12-31 11:59 PM"
export const formatDateKR = (date: number) => dayjs(date).format('YYYY-MM-DD h:mm A');
