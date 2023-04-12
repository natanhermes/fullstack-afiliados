import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

import { parseCookies } from 'nookies';

export function withSSRAuth<P extends object>(
  fn: GetServerSideProps<P>,
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies['afiliados.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
