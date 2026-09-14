// @ts-check
import { defineConfig } from 'astro/config';

// Configuration intelligente pour GitHub Pages :
// GitHub Actions définit automatiquement les variables GITHUB_ACTIONS et GITHUB_REPOSITORY.
const isGithubActions = !!process.env.GITHUB_ACTIONS;
const githubRepo = process.env.GITHUB_REPOSITORY; // Exemple: "mon-pseudo/my-portfolio"
const [githubOwner, githubRepoName] = githubRepo ? githubRepo.split('/') : [];

export default defineConfig({
  // URL complète du site sur GitHub Pages
  site: isGithubActions && githubOwner
    ? `https://${githubOwner}.github.io`
    : undefined,

  // Sous-dossier automatique si le dépôt n'est pas "mon-pseudo.github.io"
  base: isGithubActions && githubRepoName && !githubRepoName.endsWith('.github.io')
    ? `/${githubRepoName}/`
    : '/',

  // Optimisation performances Core Web Vitals :
  // Inliner les feuilles de styles pour éliminer les requêtes CSS bloquantes (FCP/LCP)
  build: {
    inlineStylesheets: 'always',
  },
});
