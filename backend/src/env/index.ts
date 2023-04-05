import "dotenv/config";
import { z } from "zod";

enum NodeEnvType {
  DEV = "dev",
  TEST = "test",
  PRODUCTION = "production",
}

/**
 * 
  Object containing the rules for validating the environment variables of the .env file.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum([NodeEnvType.DEV, NodeEnvType.TEST, NodeEnvType.PRODUCTION])
    .default(NodeEnvType.DEV),
  PORT: z.coerce.number().default(3333),
});

/**
 * Realiza a validação das variáveis ambiente com base no schema.
 */
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
