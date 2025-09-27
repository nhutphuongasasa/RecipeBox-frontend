import { Header } from "@/layout/header";
import SidebarAdmin from "./sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col h-screen">
      <Header />
      <div className="flex h-full">
        <SidebarAdmin />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
