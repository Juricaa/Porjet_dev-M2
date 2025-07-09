import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";

export default function NewAxis() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Nouvel Axe d'Intervention
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Créer un nouvel axe d'intervention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Code de l'axe</label>
                <Input placeholder="AXE-001" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourisme">Tourisme</SelectItem>
                    <SelectItem value="artisanat">Artisanat</SelectItem>
                    <SelectItem value="mixte">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de l'axe</label>
              <Input placeholder="Développement du tourisme durable" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Description détaillée de l'axe d'intervention..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Budget alloué (MGA)
                </label>
                <Input placeholder="1000000000" type="number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Durée (mois)</label>
                <Input placeholder="24" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Objectifs</label>
              <Textarea
                placeholder="Objectifs spécifiques de cet axe d'intervention..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Créer l'axe
              </Button>
              <Button variant="outline">Annuler</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
