import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be hash user password upon registration', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    const { user } = await sut.execute(userData);

    const isPasswordCorrectlyHashed = await compare(
      userData.password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    await sut.execute(userData);

    const handleDuplicateRegister = () => sut.execute(userData);
    await expect(handleDuplicateRegister).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });

  it('should be able to register', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    const { user } = await sut.execute(userData);
    expect(user.id).toEqual(expect.any(String));
  });
});
