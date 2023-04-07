import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user-use-case';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('CreateUser Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
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

  it('should not be able to create user with same email twice', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    await sut.execute(userData);

    const handleDuplicateCreateUser = () => sut.execute(userData);
    await expect(handleDuplicateCreateUser).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });

  it('should be able to create user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    };
    const { user } = await sut.execute(userData);
    expect(user.id).toEqual(expect.any(String));
  });
});
