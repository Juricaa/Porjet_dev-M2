import { UserLayout } from "@/components/layout/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
            <p className="text-muted-foreground">
              Configuration de votre compte et préférences
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Paramètres utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <SettingsIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Page en cours de développement
            </h3>
            <p className="text-muted-foreground">
              Les paramètres utilisateur seront bientôt disponibles.
            </p>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
