import fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((err, _req, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: err.format(),
    });
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(err);
  } else {
    // TODO: Add log error to sentry/datadog/newrelic
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  });
});
