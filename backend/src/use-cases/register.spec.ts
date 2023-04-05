import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    const { user } = await registerUseCase.execute(userData);

    const isPasswordCorrectlyHashed = await compare(
      userData.password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    await registerUseCase.execute(userData);

    const duplicateRegister = () => registerUseCase.execute(userData);
    await expect(duplicateRegister).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    const { user } = await registerUseCase.execute(userData);
    expect(user.id).toEqual(expect.any(String));
  });
});
