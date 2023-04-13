import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { mockUser } from '@/utils/test/mocks/mocks-users';

let usersRepository: InMemoryUsersRepository;
/**
 * System Under Test
 */
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const { email, name, password } = mockUser;

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
    const credentialsToAuthenticate = {
      email: mockUser.email,
      password: mockUser.password,
    };

    const handleAuthenticateIncorrrectCredentials = () =>
      sut.execute(credentialsToAuthenticate);
    expect(handleAuthenticateIncorrrectCredentials).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    const { email, name, password } = mockUser;

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
    await expect(
      handleAuthenticateIncorrrectCredentials,
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
