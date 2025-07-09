import { ReactNode } from "react";
import { UserSidebar } from "../sidebars/UserSidebar";
import { useAuth } from "@/contexts/AuthContext";

interface UserLayoutProps {
  children: ReactNode;
}

const regionNames: Record<string, string> = {
  "1": "Atsinanana",
  "2": "Boeny",
  "3": "Analamanga",
  "4": "Menabe",
};

export function UserLayout({ children }: UserLayoutProps) {
  const { user } = useAuth();
  const userRegion = user?.region_id ? regionNames[user.region_id] : "Région";

  return (
    <div className="flex h-screen bg-background">
      <UserSidebar userName={user?.nom} userRegion={userRegion} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
