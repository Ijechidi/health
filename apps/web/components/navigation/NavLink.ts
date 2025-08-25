export interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  {
    id: 'home',
    label: 'Accueil',
    href: '#home'
  },
  {
    id: 'find-doctor',
    label: 'Trouver un médecin',
    href: '#find-doctor'
  },
  {
    id: 'services',
    label: 'Services',
    href: '#services'
  },
  {
    id: 'about',
    label: 'À propos',
    href: '#about'
  },
  {
    id: 'contact',
    label: 'Contactez-nous',
    href: '#contact'
  }
];