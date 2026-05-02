export type Languages = 'React' | 'Angular' | 'TypeScript' | 'JavaScript' | 'HTML' | 'CSS' | 'SCSS' | 'Tailwind' | 'JavaScript' | 'Python' | 'Java';
export type Tools = 'Git' | 'Docker' | 'Postman' | 'Trello' | 'ClickUp' | 'Scrum' | 'Inteligência Artificial' | 'Figma' | 'VS Code';

export type ProjectsType = {
  id?: number;
  title: string;
  description?: string;
  languages: Languages[];
  tools: Tools[];
  link?: string;
  imageUrl?: string;
};

export const PROJECTS_ITEMS: ProjectsType[] = [
  {
    id: 1,
    title: 'Her Tech Rise',
    description: 'O Her Tech Rise é uma plataforma desenvolvida como projeto acadêmico para a disciplina de Engenharia de Software, com o objetivo de fomentar a inclusão, o networking e o empoderamento de mulheres na área de tecnologia.',
    languages: [
      'React', 'Tailwind', 'JavaScript'
    ],
    tools: [
      'Git', 'Trello', 'Scrum', 'Figma', 'VS Code'
    ],
    link: 'https://cynthiapinheiro.ifce.edu.br/hertechrise/',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 2,
    title: 'Nosso Contar ',
    description: 'Uma plataforma lúdica, acessível e interativa que ensina Libras por meio de vídeos educativos, trilhas de aprendizado, histórias infantis e jogos de memória, promovendo o aprendizado de forma envolvente e significativa.',
    languages: [
      'React', 'Tailwind', 'JavaScript'
    ],
    tools: [
      'Git', 'Scrum', 'Figma', 'VS Code'
    ],
    link: 'https://nosso-contar.vercel.app/',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 3,
    title: 'Calculadora Multiuso',
    description: 'Projeto de calculadora multiuso desenvolvida com HTML, CSS e JavaScript, com foco em experiência do usuário (UX), design futurista e organização visual consistente. O objetivo é concentrar diferentes tipos de cálculo em uma única interface clara, moderna e intuitiva.',
    languages: [
      'HTML', 'CSS', 'JavaScript'
    ],
    tools: [
      'Git', 'Figma', 'VS Code'
    ],
    link: 'https://github.com/laiscoutinho/calculadora',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 4,
    title: 'Boamente',
    description: 'Boamente é uma ferramenta que utiliza IA e processamento de linguagem para monitorar sinais de ideação suicida, coletando textos via teclado virtual e armazenando apenas classificações para garantir a privacidade. Os dados são exibidos em dashboards intuitivos, permitindo acompanhamento em tempo real e intervenções precoces por profissionais de saúde mental.',
    languages: [
      'HTML', 'CSS', 'React', 'JavaScript', 'Python'
    ],
    tools: [
      'Git', 'Scrum', 'Inteligência Artificial', 'Figma', 'VS Code'
    ],
    link: 'https://boamente-frontend.vercel.app/',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 5,
    title: 'Hearted',
    description: 'Em breve.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman', 'Inteligência Artificial', 'Figma', 'VS Code'
    ],
    link: 'https://github.com/laiscoutinho/hearted',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 6,
    title: 'Sorteio Amigo Secreto',
    description: 'A aplicação permite criar uma lista de participantes e realizar um sorteio aleatório para definir o amigo secreto.',
    languages: [
      'HTML', 'CSS', 'JavaScript'
    ],
    tools: [
      'Git', 'VS Code'
    ],
    link: 'https://laiscoutinho.github.io/secret-friend/',
    imageUrl: 'https://example.com/image.jpg'
  },
];
