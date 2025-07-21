import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function AppLayout({ children, showHeader = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header - only shown when showHeader is true */}
      {showHeader && <Header />}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
