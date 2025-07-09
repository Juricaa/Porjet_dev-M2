/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

import {
  Project,
  DashboardStats,
  ProjectFilters,
  User,
  Region,
  Alert,
} from "./types";

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Authentication responses
 */
export interface LoginRequest {
  email: string;
  mot_de_passe: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Dashboard API responses
 */
export interface DashboardResponse {
  stats: DashboardStats;
  recent_projects: Project[];
  recent_alerts: Alert[];
}

/**
 * Projects API responses
 */
export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectCreateRequest {
  titre: string;
  description: string;
  theme?: string;
  region_id: string;
  date_debut: string;
  date_fin: string;
  responsable_id: string;
}

export interface ProjectUpdateRequest {
  statut: string;
  commentaire: string;
}

/**
 * Regions API responses
 */
export interface RegionsResponse {
  regions: Region[];
}
