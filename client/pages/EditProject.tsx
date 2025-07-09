import { useParams, Link, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Save, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { StatusBadge } from "@/components/ui/status-badge";

const mockRegions = [
  { id: "1", nom_region: "Atsinanana", code_region: "R01" },
  { id: "2", nom_region: "Boeny", code_region: "R02" },
  { id: "3", nom_region: "Analamanga", code_region: "R03" },
  { id: "4", nom_region: "Menabe", code_region: "R04" },
];

const mockAxes = [
  {
    id: 1,
    titre: "Développement de l'artisanat local",
    statut: "ouvert",
  },
  {
    id: 2,
    titre: "Valorisation de l'écotourisme",
    statut: "ouvert",
  },
  {
    id: 3,
    titre: "Modernisation des infrastructures touristiques",
    statut: "fermé",
  },
];

// Mock project data
const mockProjects: Record<string, any> = {
  "1": {
    id: 1,
    titre: "Développement du tourisme balnéaire à Tamatave",
    description:
      "Amélioration des infrastructures touristiques côtières pour attirer plus de visiteurs internationaux.",
    objectifs:
      "Augmenter le nombre de visiteurs de 25%, améliorer les infrastructures portuaires, créer 3 nouveaux centres d'accueil.",
    axe_intervention_id: 2,
    region_id: "1",
    date_debut: "2024-01-15",
    date_fin: "2024-06-30",
    statut: "en_cours",
    budget_demande: 45000000,
    responsable_id: "1",
    date_creation: "2024-01-10",
  },
  "2": {
    id: 2,
    titre: "Formation artisans textiles région Boeny",
    description:
      "Programme de formation pour 50 artisans locaux dans les techniques modernes.",
    objectifs:
      "Former 50 artisans, créer 2 ateliers de formation, augmenter la production de 30%.",
    axe_intervention_id: 1,
    region_id: "2",
    date_debut: "2024-02-01",
    date_fin: "2024-04-15",
    statut: "retard",
    budget_demande: 25000000,
    responsable_id: "2",
    date_creation: "2024-01-20",
  },
};

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    objectifs: "",
    axe_intervention_id: "",
    region_id: "",
    date_debut: "",
    date_fin: "",
    statut: "",
    budget_demande: "",
  });

  useEffect(() => {
    if (id && mockProjects[id]) {
      const projectData = mockProjects[id];
      setProject(projectData);
      setFormData({
        titre: projectData.titre,
        description: projectData.description,
        objectifs: projectData.objectifs || "",
        axe_intervention_id: projectData.axe_intervention_id?.toString() || "",
        region_id: projectData.region_id,
        date_debut: projectData.date_debut,
        date_fin: projectData.date_fin,
        statut: projectData.statut,
        budget_demande: projectData.budget_demande?.toString() || "",
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement project update logic
    console.log("Updating project:", formData);
    // Redirect to project details after update
    navigate(`/projects/${id}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      // TODO: Implement project deletion logic
      console.log("Deleting project:", id);
      navigate("/projects");
    }
  };

  if (!project) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Projet non trouvé</h1>
          <p className="text-muted-foreground mt-2">
            Le projet demandé n'existe pas ou vous n'avez pas les permissions
            pour le modifier.
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

  const formatBudget = (budget: string) => {
    if (!budget) return "";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MGA",
      minimumFractionDigits: 0,
    }).format(parseInt(budget));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/projects/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au projet
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Modifier le projet
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <StatusBadge status={project.statut} />
                <span className="text-sm text-muted-foreground">
                  Projet #{project.id}
                </span>
              </div>
            </div>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                Informations du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Titre */}
              <div className="space-y-2">
                <Label htmlFor="titre">Titre du projet *</Label>
                <Input
                  id="titre"
                  value={formData.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Objectifs */}
              <div className="space-y-2">
                <Label htmlFor="objectifs">Objectifs spécifiques</Label>
                <Textarea
                  id="objectifs"
                  placeholder="Listez les objectifs mesurables du projet..."
                  value={formData.objectifs}
                  onChange={(e) => handleChange("objectifs", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Axe d'intervention */}
                <div className="space-y-2">
                  <Label htmlFor="axe">Axe d'intervention *</Label>
                  <Select
                    value={formData.axe_intervention_id}
                    onValueChange={(value) =>
                      handleChange("axe_intervention_id", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un axe" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAxes
                        .filter((axe) => axe.statut === "ouvert")
                        .map((axe) => (
                          <SelectItem key={axe.id} value={axe.id.toString()}>
                            {axe.titre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Région */}
                <div className="space-y-2">
                  <Label htmlFor="region">Région *</Label>
                  <Select
                    value={formData.region_id}
                    onValueChange={(value) => handleChange("region_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une région" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRegions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.nom_region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date de début */}
                <div className="space-y-2">
                  <Label htmlFor="date_debut">Date de début *</Label>
                  <Input
                    id="date_debut"
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => handleChange("date_debut", e.target.value)}
                    required
                  />
                </div>

                {/* Date de fin */}
                <div className="space-y-2">
                  <Label htmlFor="date_fin">Date de fin *</Label>
                  <Input
                    id="date_fin"
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => handleChange("date_fin", e.target.value)}
                    required
                  />
                </div>

                {/* Statut */}
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut</Label>
                  <Select
                    value={formData.statut}
                    onValueChange={(value) => handleChange("statut", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soumis">Soumis</SelectItem>
                      <SelectItem value="en_révision">En révision</SelectItem>
                      <SelectItem value="validé">Validé</SelectItem>
                      <SelectItem value="rejeté">Rejeté</SelectItem>
                      <SelectItem value="en_cours">En cours</SelectItem>
                      <SelectItem value="terminé">Terminé</SelectItem>
                      <SelectItem value="retard">En retard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget demandé */}
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget demandé (MGA)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget_demande}
                    onChange={(e) =>
                      handleChange("budget_demande", e.target.value)
                    }
                  />
                  {formData.budget_demande && (
                    <p className="text-xs text-muted-foreground">
                      {formatBudget(formData.budget_demande)}
                    </p>
                  )}
                </div>
              </div>

              {/* Information box */}
              <div className="rounded-lg border bg-yellow-50 p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Attention</h4>
                <p className="text-sm text-yellow-800">
                  Certaines modifications peuvent affecter l'historique du
                  projet et nécessiter une nouvelle validation selon le workflow
                  défini.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                <Button type="button" variant="outline" asChild>
                  <Link to={`/projects/${id}`}>Annuler</Link>
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}
