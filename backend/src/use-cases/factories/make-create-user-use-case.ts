import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../create-user-use-case';

export function makeCreateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new CreateUserUseCase(prismaUsersRepository);

  return useCase;
}
