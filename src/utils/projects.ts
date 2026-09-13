import type { CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

/**
 * Trie les projets selon :
 * 1. Ordre numérique explicite (ordre croissant : 1, 2, 3...)
 * 2. Statut mis en avant (featured)
 * 3. Date de réalisation la plus récente d'abord
 */
export function sortProjects(projects: ProjectEntry[]): ProjectEntry[] {
  return [...projects].sort((a, b) => {
    const orderA = a.data.order ?? 999;
    const orderB = b.data.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;

    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;

    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

/**
 * Filtre les projets destinés à la page d'accueil.
 * Exclut :
 * - Les projets marqués "projects_only" (réservés à la page /projects)
 * - Les projets marqués "hidden" (masqués partout)
 */
export function filterProjectsForHome(projects: ProjectEntry[]): ProjectEntry[] {
  return projects.filter((p) => {
    const vis = p.data.visibility || 'both';
    return vis !== 'projects_only' && vis !== 'hidden';
  });
}

/**
 * Filtre les projets destinés à la page dédiée Projets (/projects).
 * Exclut :
 * - Les projets marqués "home_only" (réservés à l'accueil)
 * - Les projets marqués "hidden" (masqués partout)
 */
export function filterProjectsForPage(projects: ProjectEntry[]): ProjectEntry[] {
  return projects.filter((p) => {
    const vis = p.data.visibility || 'both';
    return vis !== 'home_only' && vis !== 'hidden';
  });
}

/**
 * Filtre les projets publics visibles (non masqués).
 */
export function filterVisibleProjects(projects: ProjectEntry[]): ProjectEntry[] {
  return projects.filter((p) => {
    const vis = p.data.visibility || 'both';
    return vis !== 'hidden';
  });
}

/**
 * Résout une URL de média (image, upload, etc.) en gérant les espaces,
 * les chemins relatifs et le sous-dossier de déploiement GitHub Pages.
 */
export function resolveMediaUrl(url?: string, base?: string): string {
  if (!url || !url.trim()) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  const effectiveBase = base || import.meta.env.BASE_URL || '/';
  const cleanBase = effectiveBase.endsWith('/') ? effectiveBase : `${effectiveBase}/`;
  const cleanPath = trimmed.replace(/^\/+/, '');
  const encodedPath = cleanPath
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/');
  return `${cleanBase}${encodedPath}`;
}

