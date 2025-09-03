import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Outlet /> {}
      </main>
      <Footer />
    </div>
  );
};