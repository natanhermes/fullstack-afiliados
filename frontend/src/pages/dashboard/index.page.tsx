import { DefaultLayout } from '@/components/DefaultLayout';
import { Dashboard } from '@/components/Dashboard';
import { withSSRAuth } from '@/helpers/withSSRAuth';

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
