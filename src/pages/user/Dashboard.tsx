import { useEffect, useState } from "react";
import { UserLayout } from "@/components/layout/UserLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FolderKanban,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Upload,
  FileText,
  Calendar,
  TrendingUp,
  CheckSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@shared/types";

// Mock data for regional dashboard
const mockRegionalStats = {
  mes_projets: 8,
  projets_soumis: 3,
  projets_valides: 4,
  projets_termines: 1,
  projets_retard: 2,
  taches_a_faire: 12,
  taches_terminees: 28,
  documents_en_attente: 4,
};

const mockMyProjects: Project[] = [
  {
    id: 1,
    titre: "Centre de formation artisanale Tamatave",
    description: "Formation de 50 artisans aux techniques modernes",
    objectifs: "Former 50 artisans, créer 2 ateliers",
    axe_intervention_id: 1,
    region_id: "1",
    date_debut: "2024-01-15",
    date_fin: "2024-06-30",
    statut: "en_cours",
    responsable_id: "2",
    soumis_par: "2",
    date_soumission: "2024-01-10",
    date_validation: "2024-01-12",
    date_creation: "2024-01-10",
    progress_percentage: 65,
    days_remaining: 45,
    axe: {
      id: 1,
      titre: "Développement de l'artisanat local",
      description: "",
      objectifs: "",
      date_lancement: "2024-01-01",
      statut: "ouvert",
      created_by: "",
      date_creation: "",
    },
  },
  {
    id: 2,
    titre: "Circuit touristique côte Est",
    description: "Développement d'un circuit écotouristique",
    objectifs: "Créer 3 points d'accueil, former 10 guides",
    axe_intervention_id: 2,
    region_id: "1",
    date_debut: "2024-02-01",
    date_fin: "2024-05-15",
    statut: "soumis",
    responsable_id: "2",
    soumis_par: "2",
    date_soumission: "2024-03-20",
    date_creation: "2024-03-18",
    progress_percentage: 0,
    days_remaining: 90,
    axe: {
      id: 2,
      titre: "Valorisation de l'écotourisme",
      description: "",
      objectifs: "",
      date_lancement: "2024-02-01",
      statut: "ouvert",
      created_by: "",
      date_creation: "",
    },
  },
  {
    id: 3,
    titre: "Marché artisanal moderne",
    description: "Rénovation et modernisation du marché central",
    objectifs: "Rénover 100 stands, améliorer l'accès",
    axe_intervention_id: 1,
    region_id: "1",
    date_debut: "2024-01-01",
    date_fin: "2024-03-31",
    statut: "retard",
    responsable_id: "2",
    soumis_par: "2",
    date_soumission: "2023-12-15",
    date_validation: "2023-12-20",
    date_creation: "2023-12-10",
    progress_percentage: 80,
    days_remaining: -15,
    axe: {
      id: 1,
      titre: "Développement de l'artisanat local",
      description: "",
      objectifs: "",
      date_lancement: "2024-01-01",
      statut: "ouvert",
      created_by: "",
      date_creation: "",
    },
  },
];

const mockAvailableAxes = [
  {
    id: 1,
    titre: "Développement de l'artisanat local",
    description: "Promotion des métiers traditionnels",
    statut: "ouvert",
    projets_soumis: 15,
  },
  {
    id: 2,
    titre: "Valorisation de l'écotourisme",
    description: "Tourisme durable et respectueux",
    statut: "ouvert",
    projets_soumis: 12,
  },
];

const mockTasksToComplete = [
  {
    id: 1,
    projet: "Centre de formation artisanale Tamatave",
    tache: "Finaliser l'achat des équipements",
    echeance: "2024-04-15",
    priorite: "haute",
  },
  {
    id: 2,
    projet: "Marché artisanal moderne",
    tache: "Déposer rapport PV de retard",
    echeance: "2024-04-10",
    priorite: "urgente",
  },
  {
    id: 3,
    projet: "Centre de formation artisanale Tamatave",
    tache: "Organiser la formation des formateurs",
    echeance: "2024-04-20",
    priorite: "moyenne",
  },
];

export default function UserDashboard() {
  const [stats] = useState(mockRegionalStats);

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "urgente":
        return "bg-red-100 text-red-800";
      case "haute":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Mon tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Gestion de vos projets et suivi des tâches
            </p>
          </div>
          <Button asChild>
            <Link to="/user-projects-new">
              <Plus className="mr-2 h-4 w-4" />
              Soumettre un projet
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            title="Mes projets"
            value={stats.mes_projets}
            description="Total de projets gérés"
            icon={FolderKanban}
            trend={{ value: 25, isPositive: true }}
          />
          <StatsCard
            title="En validation"
            value={stats.projets_soumis}
            description="En attente d'approbation"
            icon={Clock}
            className="border-orange-200"
          />
          <StatsCard
            title="Projets validés"
            value={stats.projets_valides}
            description="Approuvés et en cours"
            icon={CheckCircle}
            className="border-green-200"
          />
          <StatsCard
            title="Tâches à faire"
            value={stats.taches_a_faire}
            description="Nécessitent votre action"
            icon={CheckSquare}
            className="border-blue-200"
          />
          <StatsCard
            title="En retard"
            value={stats.projets_retard}
            description="Nécessitent un rapport PV"
            icon={AlertTriangle}
            className="border-red-200"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mes projets récents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <FolderKanban className="mr-2 h-5 w-5" />
                Mes projets
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/user-projects">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir tout
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMyProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm leading-none">
                        {project.titre}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {project.axe?.titre}
                      </p>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={project.statut} />
                        {project.progress_percentage !== undefined && (
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

          {/* Tâches prioritaires */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Tâches prioritaires
              </CardTitle>
              <Badge variant="destructive">{mockTasksToComplete.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTasksToComplete.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{task.tache}</h4>
                      <p className="text-xs text-muted-foreground">
                        {task.projet}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="secondary"
                          className={getPriorityColor(task.priorite)}
                        >
                          {task.priorite}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          <Calendar className="inline mr-1 h-3 w-3" />
                          {new Date(task.echeance).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cycle de gestion - Actions régionales */}
        <Card>
          <CardHeader>
            <CardTitle>Actions régionales - Cycle de gestion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 border rounded-lg text-center">
                <Plus className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium mb-2">1. Soumettre</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Proposer un projet sur un axe ouvert
                </p>
                <Button size="sm" asChild>
                  <Link to="/user-projects-new">Soumettre</Link>
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium mb-2">2. Suivre</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mettre à jour l'avancement des tâches
                </p>
                <Button size="sm" asChild>
                  <Link to="/user-projects">Suivre</Link>
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Upload className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium mb-2">3. Documenter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ajouter pièces justificatives
                </p>
                <Button size="sm" asChild>
                  <Link to="/user-documents">
                    {stats.documents_en_attente} en attente
                  </Link>
                </Button>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <FileText className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-medium mb-2">4. Justifier</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Déposer rapports PV si retard
                </p>
                <Button size="sm" variant="destructive" asChild>
                  <Link to="/user-alerts">
                    {stats.projets_retard} rapports requis
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
