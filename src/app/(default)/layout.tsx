import { Header } from '@/components/header/Header';


interface ILayout extends Readonly<{ children: React.ReactNode }> { }

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}