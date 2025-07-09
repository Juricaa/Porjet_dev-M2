import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  AlertTriangle,
  Settings,
  LogOut,
  CheckSquare,
  Upload,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const userNavigationItems = [
  {
    title: "Mon tableau de bord",
    href: "/user-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mes projets",
    href: "/user-projects",
    icon: FolderKanban,
  },
  {
    title: "Soumettre projet",
    href: "/user-projects-new",
    icon: Plus,
  },
  {
    title: "Mes tâches",
    href: "/user-tasks",
    icon: CheckSquare,
  },
  {
    title: "Documents",
    href: "/user-documents",
    icon: Upload,
  },
  {
    title: "Alertes",
    href: "/user-alerts",
    icon: AlertTriangle,
  },
];

interface UserSidebarProps {
  userName?: string;
  userRegion?: string;
}

export function UserSidebar({
  userName = "Utilisateur",
  userRegion = "Région",
}: UserSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <h1 className="text-lg font-semibold text-sidebar-foreground">
          Direction Régionale
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary-foreground">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">
              {userName}
            </p>
            <p className="text-xs text-sidebar-foreground/60">{userRegion}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {userNavigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground",
                )
              }
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.title}
            </NavLink>
          ))}
        </nav>

        <Separator className="my-4 bg-sidebar-border" />

        {/* Settings */}
        <nav className="space-y-1">
          <NavLink
            to="/user-settings"
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground",
              )
            }
          >
            <Settings className="mr-3 h-4 w-4" />
            Paramètres
          </NavLink>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
