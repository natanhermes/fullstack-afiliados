import { ButtonHTMLAttributes } from 'react';
import { ButtonStyled } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...rest }: ButtonProps) {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
}
