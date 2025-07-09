import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Target,
  FolderKanban,
  CheckSquare,
  Users,
  MapPin,
  FileText,
  AlertTriangle,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const adminNavigationItems = [
  {
    title: "Tableau de bord",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Axes d'intervention",
    href: "/admin-axes",
    icon: Target,
  },
  {
    title: "Validations",
    href: "/admin-validations",
    icon: CheckSquare,
  },
  {
    title: "Projets",
    href: "/admin-projects",
    icon: FolderKanban,
  },
  {
    title: "Utilisateurs",
    href: "/admin-users",
    icon: Users,
  },
  {
    title: "Régions",
    href: "/admin-regions",
    icon: MapPin,
  },
  {
    title: "Rapports",
    href: "/admin-reports",
    icon: FileText,
  },
  {
    title: "Alertes",
    href: "/admin-alerts",
    icon: AlertTriangle,
  },
];

interface AdminSidebarProps {
  userName?: string;
}

export function AdminSidebar({
  userName = "Administrateur",
}: AdminSidebarProps) {
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
          Administration
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
            <p className="text-xs text-sidebar-foreground/60">
              Ministère du Tourisme
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {adminNavigationItems.map((item) => (
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
            to="/admin-settings"
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
