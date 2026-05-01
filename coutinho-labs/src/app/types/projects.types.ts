export type Languages = 'React' | 'Angular' | 'TypeScript' | 'JavaScript' | 'HTML' | 'CSS' | 'SCSS' | 'JavaScript' | 'Python' | 'Java';
export type Tools = 'Git' | 'Docker' | 'Postman' | 'Trello' | 'ClickUp' | 'Agile Methodology';

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
    title: 'PROJETO-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman'
    ],
    link: 'https://example.com',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 2,
    title: 'PROJETO-2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman'
    ],
    link: 'https://example.com',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 3,
    title: 'PROJETO-3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman'
    ],
    link: 'https://example.com',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 4,
    title: 'PROJETO-4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman'
    ],
    link: 'https://example.com',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 5,
    title: 'PROJETO-5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman'
    ],
    link: 'https://example.com',
    imageUrl: 'https://example.com/image.jpg'
  },
  {
    id: 6,
    title: 'PROJETO-6',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    languages: [
      'Angular', 'TypeScript', 'SCSS'
    ],
    tools: [
      'Git', 'Docker', 'Postman'
    ],
    link: 'https://example.com',
    imageUrl: 'https://example.com/image.jpg'
  },
];
