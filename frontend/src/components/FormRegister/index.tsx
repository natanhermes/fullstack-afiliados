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
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

const TOAST_DURATION_IN_MS = 3000;

const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Insira um e-mail válido!' }),
  password: z.string().min(6, 'Mínimo 6 caracteres.'),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function FormRegister() {
  const { signUp } = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister({ email, name, password }: RegisterFormData) {
    const toastId = toast.loading('Cadastrando usuário...', {
      autoClose: TOAST_DURATION_IN_MS,
    });
    signUp({
      email,
      name,
      password,
    })
      .then(() => {
        toast.update(toastId, {
          render: 'Usuário cadastrado com sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: TOAST_DURATION_IN_MS,
        });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: `Erro ao cadastrar usuário: ${err.message.response.data.message}`,
          type: 'error',
          isLoading: false,
          autoClose: TOAST_DURATION_IN_MS,
        });
      });

    setTimeout(() => router.push('/'), TOAST_DURATION_IN_MS);
  }

  return (
    <>
      <ToastContainer theme="colored" />
      <FormContainer>
        <FormTitle>Cadastre-se</FormTitle>
        <Form onSubmit={handleSubmit(handleRegister)} noValidate>
          <InputGroup className="input-group">
            <label htmlFor="name">Insira seu nome:</label>
            <Input id="name" type="name" {...register('name')} />
            {!!errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <label htmlFor="email">E-mail de acesso:</label>
            <Input
              id="email"
              type="email"
              className="input-group"
              {...register('email')}
            />
            {!!errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="password">Senha:</label>
            <Input
              id="password"
              type="password"
              className="input-group"
              {...register('password')}
            />
            {!!errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputGroup>

          <Button type="submit">Entrar</Button>
        </Form>
      </FormContainer>
    </>
  );
}
