import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "../sidebars/AdminSidebar";
import { UserSidebar } from "../sidebars/UserSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth();

  // If no user, render without sidebar (for shared pages)
  if (!user) {
    return (
      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {user.role === "national" ? (
        <AdminSidebar currentUser={user} />
      ) : (
        <UserSidebar currentUser={user} />
      )}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
