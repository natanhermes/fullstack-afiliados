import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { productsRoutes } from './http/controllers/products/products.routes';
import { usersRoutes } from './http/controllers/users/users.routes';
import { collaboratorsRoutes } from './http/controllers/collaborators/collaborators.routes';
import { transactionsRoutes } from './http/controllers/transactions/transaction.routes';

export const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10n',
  },
});

app.register(fastifyCookie);
app.register(fastifyMultipart);
app.register(usersRoutes);
app.register(collaboratorsRoutes);
app.register(productsRoutes);
app.register(transactionsRoutes);

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
