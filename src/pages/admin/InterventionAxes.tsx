import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { InterventionAxis, AxisStatus } from "@shared/types";

// Mock data
const mockAxes: InterventionAxis[] = [
  {
    id: 1,
    titre: "Développement de l'artisanat local",
    description:
      "Promotion et développement des métiers artisanaux traditionnels malgaches",
    objectifs:
      "Augmenter la production artisanale de 30%, former 200 artisans, créer 5 nouveaux centres de formation",
    date_lancement: "2024-01-01",
    statut: "ouvert",
    budget_alloue: 50000000,
    created_by: "ministre",
    date_creation: "2023-12-15",
  },
  {
    id: 2,
    titre: "Valorisation de l'écotourisme",
    description:
      "Développement durable du tourisme respectueux de l'environnement",
    objectifs:
      "Créer 10 circuits écotouristiques, former 50 guides, augmenter les visiteurs de 25%",
    date_lancement: "2024-02-01",
    statut: "ouvert",
    budget_alloue: 75000000,
    created_by: "ministre",
    date_creation: "2024-01-20",
  },
  {
    id: 3,
    titre: "Modernisation des infrastructures touristiques",
    description: "Amélioration des infrastructures d'accueil touristique",
    objectifs:
      "Rénover 15 sites touristiques, construire 3 centres d'accueil, améliorer la signalétique",
    date_lancement: "2023-06-01",
    date_cloture: "2024-05-31",
    statut: "fermé",
    budget_alloue: 120000000,
    created_by: "ministre",
    date_creation: "2023-05-15",
  },
];

const statusConfig = {
  ouvert: {
    label: "Ouvert",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  fermé: {
    label: "Fermé",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  },
  suspendu: {
    label: "Suspendu",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
};

export default function AdminInterventionAxes() {
  const [axes, setAxes] = useState<InterventionAxis[]>(mockAxes);
  const [filteredAxes, setFilteredAxes] =
    useState<InterventionAxis[]>(mockAxes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AxisStatus | "">("");

  useEffect(() => {
    let filtered = axes;

    if (searchTerm) {
      filtered = filtered.filter(
        (axe) =>
          axe.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          axe.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((axe) => axe.statut === statusFilter);
    }

    setFilteredAxes(filtered);
  }, [searchTerm, statusFilter, axes]);

  const formatBudget = (budget?: number) => {
    if (!budget) return "-";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MGA",
      minimumFractionDigits: 0,
    }).format(budget);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Axes d'intervention
            </h1>
            <p className="text-muted-foreground">
              Gestion des orientations stratégiques du ministère
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/axes/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel axe
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total des axes
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{axes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Axes ouverts
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {axes.filter((axe) => axe.statut === "ouvert").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Budget total
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatBudget(
                  axes.reduce((sum, axe) => sum + (axe.budget_alloue || 0), 0),
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projets associés
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Projets soumis par les régions
              </p>
            </CardContent>
          </Card>
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
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un axe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as AxisStatus | "")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ouvert">Ouvert</SelectItem>
                  <SelectItem value="fermé">Fermé</SelectItem>
                  <SelectItem value="suspendu">Suspendu</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("" as AxisStatus | "");
                }}
              >
                Effacer les filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredAxes.length} axe(s) trouvé(s)
          </p>
        </div>

        {/* Axes Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Axe d'intervention</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Budget alloué</TableHead>
                  <TableHead>Projets</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAxes.map((axe) => (
                  <TableRow key={axe.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <h4 className="font-medium">{axe.titre}</h4>
                        <p className="text-sm text-muted-foreground">
                          {axe.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusConfig[axe.statut].className}
                      >
                        {statusConfig[axe.statut].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">
                            Depuis le{" "}
                            {new Date(axe.date_lancement).toLocaleDateString(
                              "fr-FR",
                            )}
                          </p>
                          {axe.date_cloture && (
                            <p className="text-xs text-muted-foreground">
                              Jusqu'au{" "}
                              {new Date(axe.date_cloture).toLocaleDateString(
                                "fr-FR",
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatBudget(axe.budget_alloue)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <span className="text-lg font-semibold">8</span>
                        <p className="text-xs text-muted-foreground">projets</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/axes/${axe.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/axes/${axe.id}/edit`}>
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
    </AdminLayout>
  );
}
