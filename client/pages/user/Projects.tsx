import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserProjects() {
  return (
    <AppLayout userRole="regional" userName="Directeur Régional">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes projets</h1>
            <p className="text-muted-foreground">
              Gestion de vos projets soumis et en cours
            </p>
          </div>
          <Button asChild>
            <Link to="/user-projects-new">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau projet
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderKanban className="mr-2 h-5 w-5" />
              Mes projets
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Page en cours de développement
            </h3>
            <p className="text-muted-foreground">
              La gestion des projets utilisateur sera bientôt disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
