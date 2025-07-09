import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

export default function Alerts() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alertes</h1>
            <p className="text-muted-foreground">
              Suivi des alertes et notifications système
            </p>
          </div>
          <Badge variant="destructive">3 alertes critiques</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertes actives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="font-medium text-red-900">
                  Projet en retard critique
                </p>
                <p className="text-sm text-red-700">
                  Centre touristique Andasibe - 15 jours de retard
                </p>
              </div>
              <Button size="sm" variant="outline">
                Voir
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg bg-yellow-50">
              <Info className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-900">Budget dépassé</p>
                <p className="text-sm text-yellow-700">
                  Formation artisans Fianarantsoa - 120% du budget initial
                </p>
              </div>
              <Button size="sm" variant="outline">
                Voir
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-900">
                  Projet terminé avec succès
                </p>
                <p className="text-sm text-green-700">
                  Marché artisanal Mahajanga complété dans les délais
                </p>
              </div>
              <Button size="sm" variant="outline">
                Voir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
