/**
 * User roles in the system
 */
export type UserRole = "national" | "regional";

/**
 * Intervention axis status
 */
export type AxisStatus = "ouvert" | "fermé" | "suspendu";

/**
 * Project status enumeration (updated workflow)
 */
export type ProjectStatus =
  | "soumis"
  | "en_révision"
  | "validé"
  | "rejeté"
  | "en_cours"
  | "terminé"
  | "retard";

/**
 * Task status for to-do items
 */
export type TaskStatus = "à_faire" | "en_cours" | "terminé" | "bloqué";

/**
 * Alert status enumeration
 */
export type AlertStatus = "envoyée" | "vue" | "non_vue";

/**
 * User interface
 */
export interface User {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
  region_id?: string;
  actif: boolean;
  date_creation: string;
}

/**
 * Region interface
 */
export interface Region {
  id: string;
  nom_region: string;
  code_region: string;
}

/**
 * Intervention Axis interface
 */
export interface InterventionAxis {
  id: number;
  titre: string;
  description: string;
  objectifs: string;
  date_lancement: string;
  date_cloture?: string;
  statut: AxisStatus;
  budget_alloue?: number;
  created_by: string;
  date_creation: string;
}

/**
 * Project Task interface (to-do items)
 */
export interface ProjectTask {
  id: number;
  project_id: number;
  titre: string;
  description: string;
  date_echeance?: string;
  statut: TaskStatus;
  ordre: number;
  created_by: string;
  date_creation: string;
  date_completion?: string;
}

/**
 * Project interface (updated for new workflow)
 */
export interface Project {
  theme: string;
  id: number;
  titre: string;
  description: string;
  objectifs: string;
  axe_intervention_id: number;
  region_id: string;
  date_debut: string;
  date_fin: string;
  statut: ProjectStatus;
  responsable_id: string;
  soumis_par: string;
  date_soumission: string;
  date_validation?: string;
  validé_par?: string;
  commentaires_validation?: string;
  budget_demande?: number;
  date_creation: string;
  region?: Region;
  responsable?: User;
  axe?: InterventionAxis;
  tasks?: ProjectTask[];
  progress_percentage?: number;
  days_remaining?: number;
}

/**
 * Project update interface
 */
export interface ProjectUpdate {
  id: number;
  project_id: number;
  date_suivi: string;
  statut: ProjectStatus;
  commentaire: string;
  utilisateur_id: string;
  utilisateur?: User;
}

/**
 * Document interface
 */
export interface Document {
  id: number;
  nom_fichier: string;
  url: string;
  type_fichier: string;
  date_upload: string;
  project_id: number;
  utilisateur_id: string;
  utilisateur?: User;
}

/**
 * Alert interface
 */
export interface Alert {
  id: number;
  project_id: number;
  date_alerte: string;
  statut: AlertStatus;
  message: string;
  rapport_pdf_url?: string;
  pv_recu: boolean;
  project?: Project;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  total_axes: number;
  axes_by_status: Record<AxisStatus, number>;
  total_projects: number;
  projects_by_status: Record<ProjectStatus, number>;
  projects_by_region: Record<string, number>;
  pending_validations: number;
  overdue_projects: number;
  upcoming_deadlines: number;
}

/**
 * Project filters for listing
 */
export interface ProjectFilters {
  theme: string;
  region_id?: string;
  axe_intervention_id?: number;
  statut?: ProjectStatus;
  search?: string;
}
