import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@shared/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusConfig = {
  // New workflow statuses
  soumis: {
    label: "Soumis",
    variant: "secondary" as const,
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  en_révision: {
    label: "En révision",
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  validé: {
    label: "Validé",
    variant: "default" as const,
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  rejeté: {
    label: "Rejeté",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 hover:bg-red-100",
  },
  // Legacy statuses (still supported)
  non_démarré: {
    label: "Non démarré",
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  },
  en_cours: {
    label: "En cours",
    variant: "default" as const,
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  terminé: {
    label: "Terminé",
    variant: "default" as const,
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  retard: {
    label: "En retard",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 hover:bg-red-100",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  // Fallback for unknown statuses
  if (!config) {
    return (
      <Badge
        variant="outline"
        className={cn("bg-gray-100 text-gray-800", className)}
      >
        {status}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
