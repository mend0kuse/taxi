// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe, expect, it } from 'vitest';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';

describe('Тест функции transformAxiosError', () => {
    const message = 'Message';

    it('Возвращает пустую строку, если не передан объект', () => {
        const result = transformAxiosError();
        expect(result).toBe('');
    });

    it('Возвращает message, если передан response.data.message', () => {
        const result = transformAxiosError({ response: { data: { message } } });
        expect(result).toBe(message);
    });

    it('Возвращает пустую строку, если передано не поле message', () => {
        const result = transformAxiosError({ response: { data: { wrongField: message } } });
        expect(result).toBe('');
    });
});
