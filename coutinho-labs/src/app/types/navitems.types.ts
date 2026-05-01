export type NavItem = {
  id?: string;
  label: string;
  route?: string;
};

export const LANDINGPAGE_NAV_ITEMS: NavItem[] = [
  { label: 'Início', id: 'home' },
  { label: 'Sobre', id: 'about' },
  { label: 'Fundadora', id:'about-founder' },
  { label: 'Projetos', id: 'projects' },
  { label: 'Perguntas', id: 'questions' },
  { label: 'Contato', id: 'contact' },
];

export const LAISCOUTINHO_NAV_ITEMS: NavItem[] = [
  { label: 'Início', id: 'home' },
  { label: 'Sobre', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experiência', id: 'experience' },
  { label: 'Projetos', id: 'projects' },
  { label: 'Pesquisa', id: 'research' },
  { label: 'Contato', id: 'contact' }
];
