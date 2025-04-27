import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './dashboard/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger className="cursor-pointer" />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
