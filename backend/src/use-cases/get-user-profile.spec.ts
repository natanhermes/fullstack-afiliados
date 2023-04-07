import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
/**
 * System Under Test
 */
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const { email, name, password } = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const createdUser = await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual(name);
  });

  it('should not be able to get user profile with wrong id', async () => {
    const handleUserNotExists = () =>
      sut.execute({
        userId: 'non-existing-id',
      });
    await expect(handleUserNotExists).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
