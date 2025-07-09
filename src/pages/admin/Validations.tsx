import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";

export default function Validations() {
  const projectsToValidate = [
    {
      id: "PRJ-001",
      name: "Amélioration infrastructure touristique Andasibe",
      region: "Alaotra-Mangoro",
      axis: "Tourisme durable",
      submittedDate: "2024-01-15",
      budget: "500,000,000 MGA",
      status: "soumis",
    },
    {
      id: "PRJ-002",
      name: "Formation artisans traditionnels Fianarantsoa",
      region: "Haute Matsiatra",
      axis: "Artisanat traditionnel",
      submittedDate: "2024-01-12",
      budget: "200,000,000 MGA",
      status: "en_révision",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Validation des Projets
          </h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {projectsToValidate.length} projets en attente
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Projets soumis pour validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom du projet</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Axe d'intervention</TableHead>
                  <TableHead>Date soumission</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsToValidate.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.region}</TableCell>
                    <TableCell>{project.axis}</TableCell>
                    <TableCell>{project.submittedDate}</TableCell>
                    <TableCell>{project.budget}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "soumis" ? "default" : "secondary"
                        }
                      >
                        {project.status === "soumis" ? "Soumis" : "En révision"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button size="sm" variant="default">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Valider
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Rejeter
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
