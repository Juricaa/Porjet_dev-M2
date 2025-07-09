import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Shared pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminInterventionAxes from "./pages/admin/InterventionAxes";
import AdminNewAxis from "./pages/admin/NewAxis";
import AdminValidations from "./pages/admin/Validations";
import AdminUsers from "./pages/admin/Users";
import AdminRegions from "./pages/admin/Regions";
import AdminReports from "./pages/admin/Reports";
import AdminAlerts from "./pages/admin/Alerts";
import AdminSettings from "./pages/admin/Settings";

// User pages
import UserDashboard from "./pages/user/Dashboard";
import UserProjects from "./pages/user/Projects";
import UserNewProject from "./pages/user/NewProject";
import UserTasks from "./pages/user/Tasks";
import UserDocuments from "./pages/user/Documents";
import UserAlerts from "./pages/user/Alerts";
import UserSettings from "./pages/user/Settings";

// Shared pages
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";

const queryClient = new QueryClient();

// Component to handle role-based dashboard redirection
function DashboardRedirect() {
  const { user } = useAuth();

  if (user?.role === "national") {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (user?.role === "regional") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

// Component to handle role-based projects redirection
function ProjectsRedirect() {
  const { user } = useAuth();

  if (user?.role === "national") {
    return <Navigate to="/admin-projects" replace />;
  } else if (user?.role === "regional") {
    return <Navigate to="/user-projects" replace />;
  }

  return <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardRedirect />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/projects" element={<ProjectsRedirect />} />

            {/* Admin routes (national level only) */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-axes"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminInterventionAxes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-axes-new"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminNewAxis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-validations"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminValidations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-projects"
              element={
                <ProtectedRoute requiredRole="national">
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-regions"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminRegions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-reports"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-alerts"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminAlerts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-settings"
              element={
                <ProtectedRoute requiredRole="national">
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* User routes (regional level only) */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-projects"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-projects-new"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserNewProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-tasks"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-documents"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserDocuments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-alerts"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserAlerts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-settings"
              element={
                <ProtectedRoute requiredRole="regional">
                  <UserSettings />
                </ProtectedRoute>
              }
            />

            {/* Shared routes (both roles) - for legacy support */}
            <Route
              path="/projects/:id"
              element={
                <ProtectedRoute>
                  <ProjectDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:id/edit"
              element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
