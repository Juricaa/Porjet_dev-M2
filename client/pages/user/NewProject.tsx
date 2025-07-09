import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserNewProject() {
  return (
    <AppLayout userRole="regional" userName="Directeur Régional">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/user-projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Soumettre un projet
            </h1>
            <p className="text-muted-foreground">
              Proposer un nouveau projet sur un axe d'intervention
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Soumission de projet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Plus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Page en cours de développement
            </h3>
            <p className="text-muted-foreground">
              Le formulaire de soumission de projet sera bientôt disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
