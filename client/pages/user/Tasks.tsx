import { UserLayout } from "@/components/layout/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Calendar, User } from "lucide-react";

export default function Tasks() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes Tâches</h1>
            <p className="text-muted-foreground">
              Suivi de vos tâches et activités en cours
            </p>
          </div>
          <Badge variant="secondary">5 tâches en cours</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Tâches assignées
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <CheckSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Page en cours de d��veloppement
            </h3>
            <p className="text-muted-foreground">
              La gestion des tâches sera bientôt disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
