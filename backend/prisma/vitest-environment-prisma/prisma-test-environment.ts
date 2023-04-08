import 'dotenv/config';

import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { Environment } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * Generates a new database connection url, based on the url provided in the environment variable, "DATABASE_URL", changing the schema value, which by default is "public", to the value of the string provided in the ` parameter schema`.
 * This function only depends on the `DATABASE_URL` environment variable being set. Otherwise, it will return an Error.
 * @param schema name to use when creating the database schema
 * @returns returns the new connection url with the bank using the informed `schema`
 */
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

/**
 * An interface representing an environment setup for a Prisma database.
 * @interface Environment
 * @property {string} name - The name of the environment, in this case, "prisma".
 * @property {Function} setup - A function that sets up the environment by creating a new database schema, generating a new database URL, applying database migrations, and returning an object with a teardown function.
 * @returns {Object} An object containing a teardown function. A function that tears down the environment by dropping the database schema and disconnecting from the Prisma client.
 */
export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
};
