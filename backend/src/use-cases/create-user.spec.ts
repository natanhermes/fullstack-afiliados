import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user-use-case';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { mockUser } from '@/utils/test/mocks/mocks-users';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('CreateUser Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should be hash user password upon registration', async () => {
    const { user } = await sut.execute(mockUser);

    const isPasswordCorrectlyHashed = await compare(
      mockUser.password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create user with same email twice', async () => {
    await sut.execute(mockUser);

    const handleDuplicateCreateUser = () => sut.execute(mockUser);
    await expect(handleDuplicateCreateUser).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });

  it('should be able to create user', async () => {
    const { user } = await sut.execute(mockUser);
    expect(user.id).toEqual(expect.any(String));
  });
});
