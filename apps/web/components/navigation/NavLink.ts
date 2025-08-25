export interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home'
  },
  {
    id: 'find-doctor',
    label: 'Find Doctor',
    href: '#find-doctor'
  },
  {
    id: 'services',
    label: 'Services',
    href: '#services'
  },
  {
    id: 'about',
    label: 'About Us',
    href: '#about'
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '#contact'
  }
];