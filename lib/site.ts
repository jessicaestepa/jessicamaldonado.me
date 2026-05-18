/** SEO y datos del sitio — ajusta aquí profesión, ciudad y redes. */
export const site = {
  name: 'Jessica Maldonado Estepa',
  tagline: 'jessicamaldonado.me',
  profession: 'Founder, Vorena',
  shortDescription:
    'I buy profitable tech companies, operate them with AI and LATAM talent, and make them more profitable.',
  about: {
    title: 'About me',
    paragraphs: [
      "I'm 28. I buy profitable tech companies, operate them with AI and LATAM talent, and make them more profitable.",
      "I started at Rappi before it became LATAM's first unicorn. Then I built the operations of a VC fund from scratch. That's where I realized the best returns in tech aren't always in startups — they're in profitable companies no one is paying attention to.",
      'Today I run Vorena, an AI-native micro-PE fund acquiring tech companies globally and operating them from Latin America. Two acquisitions done. Investment recovered. Generating returns.',
    ],
  } as const,
  city: 'Bogotá',
  country: 'CO',
  countryName: 'Colombia',
  email: 'hola@jessicamaldonado.me',
  url: 'https://jessicamaldonado.me',
  alternateNames: ['Jessica Maldonado', 'Jessica M. Estepa'] as const,
  knowsAbout: [
    'Micro private equity',
    'Tech acquisitions',
    'AI operations',
    'Vorena',
    'LATAM talent',
  ] as const,
  social: {
    linkedin: 'https://linkedin.com/in/jessicaestepa',
    github: 'https://github.com/jessicaestepa',
    instagram: 'https://instagram.com/jessicaestepa',
    twitter: 'https://twitter.com/jessicaestepa',
    twitterHandle: '@jessicaestepa',
  },
} as const
