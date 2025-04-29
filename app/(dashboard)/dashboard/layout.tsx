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
          <div className="grid grid-cols-7">
            <div className="col-span-1 hidden md:block">
              <Sidebar />
            </div>
            <div className="col-span-7 md:col-span-6 ">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
