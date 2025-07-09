import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Calendar,
  MapPin,
  User,
  FileText,
  Clock,
  AlertTriangle,
  Download,
  Upload,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Project, ProjectUpdate, Document } from "@shared/types";

// Mock data - in real app, this would come from API
const mockProjects: Record<string, Project> = {
  "1": {
    id: 1,
    titre: "Développement du tourisme balnéaire à Tamatave",
    description:
      "Amélioration des infrastructures touristiques côtières pour attirer plus de visiteurs internationaux. Le projet inclut la rénovation des plages, la construction de nouveaux hébergements, et l'amélioration des accès routiers.",
    theme: "Tourisme balnéaire",
    region_id: "1",
    date_debut: "2024-01-15",
    date_fin: "2024-06-30",
    statut: "en_cours",
    responsable_id: "1",
    date_creation: "2024-01-10",
    progress_percentage: 65,
    days_remaining: 45,
    region: { id: "1", nom_region: "Atsinanana", code_region: "R01" },
    responsable: {
      id: "1",
      nom: "Jean Rakoto",
      email: "j.rakoto@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
  "2": {
    id: 2,
    titre: "Formation artisans textiles région Boeny",
    description:
      "Programme de formation pour 50 artisans locaux dans les techniques modernes de textile traditionnel malgache. Formation de 3 mois avec certification finale.",
    theme: "Artisanat",
    region_id: "2",
    date_debut: "2024-02-01",
    date_fin: "2024-04-15",
    statut: "retard",
    responsable_id: "2",
    date_creation: "2024-01-20",
    progress_percentage: 30,
    days_remaining: -10,
    region: { id: "2", nom_region: "Boeny", code_region: "R02" },
    responsable: {
      id: "2",
      nom: "Marie Andry",
      email: "m.andry@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
};

const mockUpdates: ProjectUpdate[] = [
  {
    id: 1,
    project_id: 1,
    date_suivi: "2024-03-15",
    statut: "en_cours",
    commentaire:
      "Avancement satisfaisant. Travaux de rénovation des plages terminés à 70%.",
    utilisateur_id: "1",
    utilisateur: {
      id: "1",
      nom: "Jean Rakoto",
      email: "j.rakoto@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
  {
    id: 2,
    project_id: 1,
    date_suivi: "2024-03-01",
    statut: "en_cours",
    commentaire: "Début des travaux d'aménagement. Équipe mobilisée.",
    utilisateur_id: "1",
    utilisateur: {
      id: "1",
      nom: "Jean Rakoto",
      email: "j.rakoto@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
];

const mockDocuments: Document[] = [
  {
    id: 1,
    nom_fichier: "rapport_avancement_mars.pdf",
    url: "/documents/rapport_avancement_mars.pdf",
    type_fichier: "pdf",
    date_upload: "2024-03-15",
    project_id: 1,
    utilisateur_id: "1",
  },
  {
    id: 2,
    nom_fichier: "photos_chantier.zip",
    url: "/documents/photos_chantier.zip",
    type_fichier: "zip",
    date_upload: "2024-03-10",
    project_id: 1,
    utilisateur_id: "1",
  },
];

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    if (id && mockProjects[id]) {
      setProject(mockProjects[id]);
      setUpdates(
        mockUpdates.filter((update) => update.project_id === parseInt(id)),
      );
      setDocuments(
        mockDocuments.filter((doc) => doc.project_id === parseInt(id)),
      );
    }
  }, [id]);

  if (!project) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Projet non trouvé</h1>
          <p className="text-muted-foreground mt-2">
            Le projet demandé n'existe pas ou vous n'avez pas les permissions
            pour le voir.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {project.titre}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <StatusBadge status={project.statut} />
                {project.theme && (
                  <Badge variant="outline">{project.theme}</Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  Projet #{project.id}
                </span>
              </div>
            </div>
          </div>
          <Button asChild>
            <Link to={`/projects/${project.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>

            {/* Progrès */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Avancement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{project.progress_percentage}%</span>
                  </div>
                  <Progress
                    value={project.progress_percentage}
                    className="h-2"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Temps restant:</span>
                  <span
                    className={
                      project.days_remaining && project.days_remaining < 0
                        ? "text-red-600 font-medium"
                        : ""
                    }
                  >
                    {project.days_remaining && project.days_remaining < 0
                      ? `${Math.abs(project.days_remaining)} jours de retard`
                      : project.days_remaining === 0
                        ? "Échéance aujourd'hui"
                        : `${project.days_remaining} jours`}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Historique des mises à jour */}
            <Card>
              <CardHeader>
                <CardTitle>Historique des mises à jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {updates.map((update) => (
                    <div
                      key={update.id}
                      className="border-l-2 border-gray-200 pl-4 pb-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <StatusBadge status={update.statut} />
                          <p className="text-sm text-muted-foreground mt-1">
                            Par {update.utilisateur?.nom} •{" "}
                            {new Date(update.date_suivi).toLocaleDateString(
                              "fr-FR",
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{update.commentaire}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Détails du projet */}
            <Card>
              <CardHeader>
                <CardTitle>Détails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {project.region?.nom_region}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.region?.code_region}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {project.responsable?.nom}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.responsable?.email}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Dates</p>
                    <p className="text-xs text-muted-foreground">
                      Du{" "}
                      {new Date(project.date_debut).toLocaleDateString("fr-FR")}{" "}
                      au{" "}
                      {new Date(project.date_fin).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Documents</CardTitle>
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2 border rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {doc.nom_fichier}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.date_upload).toLocaleDateString(
                              "fr-FR",
                            )}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Aucun document disponible
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            {project.statut === "retard" && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Projet en retard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 mb-3">
                    Ce projet nécessite un rapport de justification.
                  </p>
                  <Button size="sm" className="w-full">
                    Téléverser rapport PV
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
