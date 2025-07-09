import { UserLayout } from "@/components/layout/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

export default function Documents() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">
              Gestion de vos documents et fichiers
            </p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Télécharger document
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Mes documents
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Page en cours de développement
            </h3>
            <p className="text-muted-foreground">
              La gestion documentaire sera bientôt disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
