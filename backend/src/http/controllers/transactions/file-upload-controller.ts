import { FastifyRequest, FastifyReply } from 'fastify';

import { processFile } from '@/utils/process-file';
import { makeReadFileUseCase } from '@/use-cases/factories/make-read-file-use-case';
import { Stream } from 'pump';

export async function transactionsUpload(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const data = await req.file();

    const transactions = await processFile(data?.file as Stream);

    const readFileUseCase = makeReadFileUseCase();

    const a = await readFileUseCase.execute({
      transactions,
      userId: req.user.sub,
    });

    return reply.status(201).send(a);
  } catch (err) {
    console.log(err);
    return reply.status(500).send({
      message: 'Oops! Error processing file.',
    });
  }
}
