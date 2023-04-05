import { describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository();
    /**
     * System Under Test
     */
    const sut = new AuthenticateUseCase(usersRepository);

    const { email, name, password } = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    });

    const credentialsToAuthenticate = {
      email,
      password,
    };

    const { user } = await sut.execute(credentialsToAuthenticate);
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    /**
     * System Under Test
     */
    const sut = new AuthenticateUseCase(usersRepository);

    const credentialsToAuthenticate = {
      email: 'johndoe@example.com',
      password: '123456',
    };

    const handleAuthenticateIncorrrectCredentials = () =>
      sut.execute(credentialsToAuthenticate);
    expect(handleAuthenticateIncorrrectCredentials).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    /**
     * System Under Test
     */
    const sut = new AuthenticateUseCase(usersRepository);

    const { email, name, password } = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    });

    const incorrectCredentialsToAuthenticate = {
      email,
      password: '6661',
    };

    const handleAuthenticateIncorrrectCredentials = () =>
      sut.execute(incorrectCredentialsToAuthenticate);
    expect(handleAuthenticateIncorrrectCredentials).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });
});
