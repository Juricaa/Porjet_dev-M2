import { UserLayout } from "@/components/layout/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info } from "lucide-react";

export default function Alerts() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes Alertes</h1>
            <p className="text-muted-foreground">
              Notifications et alertes de vos projets
            </p>
          </div>
          <Badge variant="destructive">2 alertes</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertes actives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-yellow-50">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-900">
                  Échéance approchante
                </p>
                <p className="text-sm text-yellow-700">
                  Rapport mensuel à soumettre avant le 30/03
                </p>
              </div>
              <Button size="sm" variant="outline">
                Voir
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50">
              <Info className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-blue-900">Validation requise</p>
                <p className="text-sm text-blue-700">
                  Document de projet en attente de validation
                </p>
              </div>
              <Button size="sm" variant="outline">
                Voir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
