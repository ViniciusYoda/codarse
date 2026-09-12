import { Header } from '@/components/header/Header';


type LayoutProps = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
