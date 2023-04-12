import { Header } from '../Header';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
