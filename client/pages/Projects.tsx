import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Project, Region, ProjectFilters } from "@shared/types";

// Mock data
const mockRegions: Region[] = [
  { id: "1", nom_region: "Atsinanana", code_region: "R01" },
  { id: "2", nom_region: "Boeny", code_region: "R02" },
  { id: "3", nom_region: "Analamanga", code_region: "R03" },
  { id: "4", nom_region: "Menabe", code_region: "R04" },
];

const mockProjects: Project[] = [
  {
    id: 1,
    titre: "Développement du tourisme balnéaire à Tamatave",
    description: "Amélioration des infrastructures touristiques côtières",
    theme: "Tourisme balnéaire",
    region_id: "1",
    date_debut: "2024-01-15",
    date_fin: "2024-06-30",
    statut: "en_cours",
    responsable_id: "1",
    date_creation: "2024-01-10",
    progress_percentage: 65,
    days_remaining: 45,
    region: mockRegions[0],
    responsable: {
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
    titre: "Formation artisans textiles région Boeny",
    description: "Programme de formation pour 50 artisans locaux",
    theme: "Artisanat",
    region_id: "2",
    date_debut: "2024-02-01",
    date_fin: "2024-04-15",
    statut: "retard",
    responsable_id: "2",
    date_creation: "2024-01-20",
    progress_percentage: 30,
    days_remaining: -10,
    region: mockRegions[1],
    responsable: {
      id: "2",
      nom: "Marie Andry",
      email: "m.andry@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
  {
    id: 3,
    titre: "Rénovation marché artisanal Antananarivo",
    description: "Modernisation du marché central d'artisanat",
    theme: "Infrastructure",
    region_id: "3",
    date_debut: "2024-03-01",
    date_fin: "2024-08-15",
    statut: "en_cours",
    responsable_id: "3",
    date_creation: "2024-02-25",
    progress_percentage: 25,
    days_remaining: 120,
    region: mockRegions[2],
    responsable: {
      id: "3",
      nom: "Paul Rabe",
      email: "p.rabe@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
  {
    id: 4,
    titre: "Création circuit touristique Menabe",
    description: "Développement d'un circuit éco-touristique",
    theme: "Eco-tourisme",
    region_id: "4",
    date_debut: "2024-01-01",
    date_fin: "2024-12-31",
    statut: "terminé",
    responsable_id: "4",
    date_creation: "2023-12-15",
    progress_percentage: 100,
    days_remaining: 0,
    region: mockRegions[3],
    responsable: {
      id: "4",
      nom: "Sophie Razafy",
      email: "s.razafy@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
  {
    id: 5,
    titre: "Formation guides touristiques Atsinanana",
    description: "Certification de 30 nouveaux guides touristiques",
    theme: "Formation",
    region_id: "1",
    date_debut: "2024-04-01",
    date_fin: "2024-07-30",
    statut: "non_démarré",
    responsable_id: "1",
    date_creation: "2024-03-10",
    progress_percentage: 0,
    days_remaining: 90,
    region: mockRegions[0],
    responsable: {
      id: "1",
      nom: "Jean Rakoto",
      email: "j.rakoto@region.mg",
      role: "regional",
      actif: true,
      date_creation: "2024-01-01",
    },
  },
];

const themes = [
  "Tourisme balnéaire",
  "Artisanat",
  "Infrastructure",
  "Eco-tourisme",
  "Formation",
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(mockProjects);
  const [filters, setFilters] = useState<ProjectFilters>({});

  useEffect(() => {
    // Apply filters
    let filtered = projects;

    if (filters.search) {
      filtered = filtered.filter(
        (project) =>
          project.titre.toLowerCase().includes(filters.search!.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(filters.search!.toLowerCase()),
      );
    }

    if (filters.region_id) {
      filtered = filtered.filter(
        (project) => project.region_id === filters.region_id,
      );
    }

    if (filters.statut) {
      filtered = filtered.filter(
        (project) => project.statut === filters.statut,
      );
    }

    if (filters.theme) {
      filtered = filtered.filter((project) => project.theme === filters.theme);
    }

    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleFilterChange = (key: keyof ProjectFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilter = (key: keyof ProjectFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
            <p className="text-muted-foreground">
              Gestion des projets touristiques et artisanaux
            </p>
          </div>
          <Button asChild>
            <Link to="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau projet
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={filters.search || ""}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <Select
                  value={filters.region_id || ""}
                  onValueChange={(value) =>
                    handleFilterChange("region_id", value)
                  }
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
              <Select
                value={filters.statut || ""}
                onValueChange={(value) => handleFilterChange("statut", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non_démarré">Non démarré</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="terminé">Terminé</SelectItem>
                  <SelectItem value="retard">En retard</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.theme || ""}
                onValueChange={(value) => handleFilterChange("theme", value)}
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
              <Button variant="outline" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredProjects.length} projet(s) trouvé(s)
          </p>
        </div>

        {/* Projects Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projet</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>��chéance</TableHead>
                  <TableHead>Progrès</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <h4 className="font-medium">{project.titre}</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                        {project.theme && (
                          <Badge variant="outline" className="text-xs">
                            {project.theme}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{project.region?.nom_region}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={project.statut} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{project.responsable?.nom}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">
                            {new Date(project.date_fin).toLocaleDateString(
                              "fr-FR",
                            )}
                          </p>
                          {project.days_remaining !== undefined && (
                            <p
                              className={`text-xs ${project.days_remaining < 0 ? "text-red-600" : "text-muted-foreground"}`}
                            >
                              {project.days_remaining < 0
                                ? `${Math.abs(project.days_remaining)} jours de retard`
                                : project.days_remaining === 0
                                  ? "Échéance aujourd'hui"
                                  : `${project.days_remaining} jours restants`}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{
                              width: `${project.progress_percentage || 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm">
                          {project.progress_percentage || 0}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/${project.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/${project.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
