import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  FolderKanban,
  Clock,
  CheckCircle,
  AlertTriangle,
  CheckSquare,
  TrendingUp,
  Plus,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardStats, Project, Alert } from "@shared/types";

// Mock data for demonstration
const mockStats: DashboardStats = {
  total_axes: 3,
  axes_by_status: {
    ouvert: 2,
    fermé: 1,
    suspendu: 0,
  },
  total_projects: 42,
  projects_by_status: {
    soumis: 8,
    en_révision: 5,
    validé: 12,
    rejeté: 2,
    en_cours: 18,
    terminé: 12,
    retard: 4,
  },
  projects_by_region: {
    Atsinanana: 12,
    Boeny: 8,
    Analamanga: 15,
    Menabe: 7,
  },
  pending_validations: 8,
  overdue_projects: 4,
  upcoming_deadlines: 6,
};

const mockRecentProjects: Project[] = [
  {
    id: 1,
    titre: "Développement du tourisme balnéaire à Tamatave",
    description: "Amélioration des infrastructures touristiques",
    region_id: "1",
    date_debut: "2024-01-15",
    date_fin: "2024-06-30",
    statut: "en_cours",
    responsable_id: "1",
    date_creation: "2024-01-10",
    progress_percentage: 65,
    days_remaining: 45,
    region: { id: "1", nom_region: "Atsinanana", code_region: "R01" },
  },
  {
    id: 2,
    titre: "Formation artisans textiles région Boeny",
    description: "Programme de formation pour 50 artisans",
    region_id: "2",
    date_debut: "2024-02-01",
    date_fin: "2024-04-15",
    statut: "retard",
    responsable_id: "2",
    date_creation: "2024-01-20",
    progress_percentage: 30,
    days_remaining: -10,
    region: { id: "2", nom_region: "Boeny", code_region: "R02" },
  },
  {
    id: 3,
    titre: "Rénovation marché artisanal Antananarivo",
    description: "Modernisation du marché central d'artisanat",
    region_id: "3",
    date_debut: "2024-03-01",
    date_fin: "2024-08-15",
    statut: "en_cours",
    responsable_id: "3",
    date_creation: "2024-02-25",
    progress_percentage: 25,
    days_remaining: 120,
    region: { id: "3", nom_region: "Analamanga", code_region: "R03" },
  },
];

const mockRecentAlerts: Alert[] = [
  {
    id: 1,
    project_id: 2,
    date_alerte: "2024-03-20",
    statut: "non_vue",
    message: "Projet en retard de 10 jours",
    pv_recu: false,
    project: mockRecentProjects[1],
  },
  {
    id: 2,
    project_id: 1,
    date_alerte: "2024-03-18",
    statut: "vue",
    message: "Échéance dans 45 jours - validation requise",
    pv_recu: true,
    project: mockRecentProjects[0],
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [recentProjects, setRecentProjects] =
    useState<Project[]>(mockRecentProjects);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>(mockRecentAlerts);

  useEffect(() => {
    // In a real app, fetch data from API
    // fetchDashboardData();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Vue d'ensemble des axes d'intervention et projets associés
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/axes/new">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel axe
              </Link>
            </Button>
            <Button asChild>
              <Link to="/validations">
                <CheckSquare className="mr-2 h-4 w-4" />
                Validations ({stats.pending_validations})
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            title="Axes ouverts"
            value={stats.axes_by_status.ouvert}
            description="Axes d'intervention actifs"
            icon={Target}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Projets soumis"
            value={
              stats.projects_by_status.soumis +
              stats.projects_by_status.en_révision
            }
            description="En attente de validation"
            icon={CheckSquare}
            className="border-orange-200"
          />
          <StatsCard
            title="Projets validés"
            value={
              stats.projects_by_status.validé +
              stats.projects_by_status.en_cours
            }
            description="Projets approuvés et actifs"
            icon={CheckCircle}
            className="border-green-200"
          />
          <StatsCard
            title="Terminés"
            value={stats.projects_by_status.terminé}
            description="Projets terminés avec succès"
            icon={FolderKanban}
            className="border-blue-200"
          />
          <StatsCard
            title="En retard"
            value={stats.projects_by_status.retard}
            description="Projets nécessitant une attention"
            icon={AlertTriangle}
            className="border-red-200"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projets récents</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/projects">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir tout
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm leading-none">
                        {project.titre}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {project.region?.nom_region}
                      </p>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={project.statut} />
                        {project.progress_percentage && (
                          <span className="text-xs text-muted-foreground">
                            {project.progress_percentage}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Échéance:{" "}
                        {new Date(project.date_fin).toLocaleDateString("fr-FR")}
                      </p>
                      {project.days_remaining !== undefined && (
                        <p
                          className={`text-xs ${project.days_remaining < 0 ? "text-red-600" : "text-muted-foreground"}`}
                        >
                          {project.days_remaining < 0
                            ? `${Math.abs(project.days_remaining)} jours de retard`
                            : `${project.days_remaining} jours restants`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Alertes récentes</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/alerts">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir tout
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <h4 className="font-medium text-sm">
                          {alert.project?.titre}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            alert.statut === "vue" ? "secondary" : "destructive"
                          }
                          className="text-xs"
                        >
                          {alert.statut === "vue" ? "Vue" : "Non vue"}
                        </Badge>
                        {alert.pv_recu && (
                          <Badge variant="outline" className="text-xs">
                            PV reçu
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.date_alerte).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Répartition par région
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(stats.projects_by_region).map(
                ([region, count]) => (
                  <div
                    key={region}
                    className="text-center p-4 border rounded-lg"
                  >
                    <h3 className="font-semibold text-lg">{count}</h3>
                    <p className="text-sm text-muted-foreground">{region}</p>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
