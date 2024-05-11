import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Registration } from './registration';
import React from 'react';
import { renderWrapper } from '@/shared/tests/utils';

describe('Тест компонента регистрации', () => {
    beforeEach(() => {
        renderWrapper(<Registration />);
    });

    const newEmail = 'asd@mail.ru';

    it('Компонент отображается', () => {
        const title = screen.getByText('Регистрация');
        expect(title).toBeInTheDocument();
    });

    it('Заполняется инпут', () => {
        const emailInput = screen.getByPlaceholderText('your@email.com') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: newEmail } });
        expect(emailInput.value).toBe('asd@mail.ru');
    });

    it('Валидация пароля', () => {
        const emailInput = screen.getByPlaceholderText('your@email.com') as HTMLInputElement;
        const buttonSubmit = screen.getByText('Отправить');

        fireEvent.change(emailInput, { target: { value: newEmail } });
        fireEvent.click(buttonSubmit);

        expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
});
