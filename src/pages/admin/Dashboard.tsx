import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  FolderKanban,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  Plus,
  Eye,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardStats } from "@shared/types";

const mockNationalStats: DashboardStats = {
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
  pending_validations: 13,
  overdue_projects: 4,
  upcoming_deadlines: 6,
};

const mockPendingValidations = [
  {
    id: 15,
    titre: "Centre de formation artisanale Fianarantsoa",
    region: "Haute Matsiatra",
    axe: "Développement de l'artisanat local",
    date_soumission: "2024-03-18",
    statut: "soumis" as const,
  },
  {
    id: 16,
    titre: "Circuit écotouristique Andasibe",
    region: "Alaotra-Mangoro",
    axe: "Valorisation de l'écotourisme",
    date_soumission: "2024-03-20",
    statut: "en_révision" as const,
  },
];

const mockRecentAxes = [
  {
    id: 1,
    titre: "Développement de l'artisanat local",
    statut: "ouvert",
    projets_soumis: 15,
    budget_utilise: 65,
  },
  {
    id: 2,
    titre: "Valorisation de l'écotourisme",
    statut: "ouvert",
    projets_soumis: 12,
    budget_utilise: 42,
  },
];

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>(mockNationalStats);

  const getDaysWaiting = (dateSubmission: string) => {
    const today = new Date();
    const submissionDate = new Date(dateSubmission);
    const diffTime = today.getTime() - submissionDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de bord administrateur
            </h1>
            <p className="text-muted-foreground">
              Gestion nationale des axes d'intervention et validation des
              projets
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/admin-axes-new">
                <Target className="mr-2 h-4 w-4" />
                Nouvel axe
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin-validations">
                <CheckSquare className="mr-2 h-4 w-4" />
                Validations ({stats.pending_validations})
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            title="Axes d'intervention"
            value={stats.total_axes}
            description="Orientations stratégiques actives"
            icon={Target}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Projets en validation"
            value={stats.pending_validations}
            description="Nécessitent votre approbation"
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
            icon={FolderKanban}
            className="border-green-200"
          />
          <StatsCard
            title="Terminés"
            value={stats.projects_by_status.terminé}
            description="Projets terminés avec succès"
            icon={TrendingUp}
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

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Validations prioritaires
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin-validations">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir tout
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPendingValidations.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm leading-none">
                        {project.titre}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {project.region} • {project.axe}
                      </p>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={project.statut} />
                        <span
                          className={`text-xs ${
                            getDaysWaiting(project.date_soumission) > 7
                              ? "text-red-600 font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {getDaysWaiting(project.date_soumission)} jours
                        </span>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/projects/${project.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Axes d'intervention
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin-axes">
                  <Eye className="mr-2 h-4 w-4" />
                  Gérer
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentAxes.map((axe) => (
                  <div
                    key={axe.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{axe.titre}</h4>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{axe.projets_soumis} projets soumis</span>
                        <span>Budget utilisé: {axe.budget_utilise}%</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        axe.statut === "ouvert" ? "default" : "secondary"
                      }
                    >
                      {axe.statut}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides - Cycle de gestion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg text-center">
                <Target className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium mb-2">1. Lancer un axe</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Créer une nouvelle orientation stratégique
                </p>
                <Button size="sm" asChild>
                  <Link to="/admin-axes-new">Créer un axe</Link>
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <CheckSquare className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium mb-2">2. Valider les projets</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Examiner les propositions des régions
                </p>
                <Button size="sm" asChild>
                  <Link to="/admin-validations">
                    Valider ({stats.pending_validations})
                  </Link>
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <FileText className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium mb-2">3. Générer rapports</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Exporter l'état global des projets
                </p>
                <Button size="sm" asChild>
                  <Link to="/admin-reports">Voir rapports</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
