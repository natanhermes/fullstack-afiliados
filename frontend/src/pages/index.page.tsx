import { withSSRGuest } from '@/helpers/withSSRGuest';
import { GetServerSideProps } from 'next';

export { default } from '@/pages/home';

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
