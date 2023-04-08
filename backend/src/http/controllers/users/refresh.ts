import { FastifyRequest, FastifyReply } from 'fastify';

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true }); // Validate user authenticated without header infos

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '1d',
      },
    },
  );

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
