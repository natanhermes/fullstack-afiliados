import { Button } from '../Button';
import {
  FormContainer,
  FormTitle,
  Form,
  InputGroup,
  Input,
  ErrorMessage,
} from './styles';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido!' }),
  password: z.string().min(6, 'Mínimo 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function FormLogin() {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLogin({ email, password }: LoginFormData) {
    await signIn({
      email,
      password,
    }).catch((err) => {
      alert(err.message.response.data.message);
    });
  }

  return (
    <FormContainer>
      <FormTitle>Plataforma Afiliados</FormTitle>
      <Form onSubmit={handleSubmit(handleLogin)} noValidate>
        <InputGroup>
          <label htmlFor="email">E-mail de acesso:</label>
          <Input
            autoCorrect={'off'}
            id="email"
            type="email"
            {...register('email')}
          />
          {!!errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <label htmlFor="password">Senha:</label>
          <Input id="password" type="password" {...register('password')} />
          {!!errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputGroup>

        <Button type="submit">Entrar</Button>

        <Link
          href={'/register'}
          style={{
            display: 'flex',
            alignSelf: 'center',
            textDecoration: 'none',
            marginTop: '1rem',
            color: 'var(--primary)',
          }}
        >
          Cadastre-se
        </Link>
      </Form>
    </FormContainer>
  );
}
