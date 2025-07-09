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
import { Plus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const mockRegions = [
  { id: "1", nom_region: "Atsinanana", code_region: "R01" },
  { id: "2", nom_region: "Boeny", code_region: "R02" },
  { id: "3", nom_region: "Analamanga", code_region: "R03" },
  { id: "4", nom_region: "Menabe", code_region: "R04" },
];

const themes = [
  "Tourisme balnéaire",
  "Artisanat",
  "Infrastructure",
  "Eco-tourisme",
  "Formation",
];

export default function NewProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    theme: "",
    region_id: "",
    date_debut: "",
    date_fin: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement project creation logic
    console.log("Creating project:", formData);
    // Redirect to projects list after creation
    navigate("/projects");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Nouveau projet
            </h1>
            <p className="text-muted-foreground">
              Créer un nouveau projet touristique ou artisanal
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5" />
                Informations du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Titre */}
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre du projet *</Label>
                  <Input
                    id="titre"
                    placeholder="Ex: Développement du tourisme balnéaire"
                    value={formData.titre}
                    onChange={(e) => handleChange("titre", e.target.value)}
                    required
                  />
                </div>

                {/* Thème */}
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => handleChange("theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                          {theme}
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
                <div className="space-y-2 md:col-start-2">
                  <Label htmlFor="date_fin">Date de fin *</Label>
                  <Input
                    id="date_fin"
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => handleChange("date_fin", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les objectifs et le contenu du projet..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                <Button type="button" variant="outline" asChild>
                  <Link to="/projects">Annuler</Link>
                </Button>
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer le projet
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}
