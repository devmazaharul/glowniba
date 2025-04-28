import Sidebar from './components/Navbar';
import Topbar from './components/Topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className=" ">
          <div>
            <Topbar />
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-1 hidden md:block">
              <Sidebar />
            </div>
            <div className="col-span-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
