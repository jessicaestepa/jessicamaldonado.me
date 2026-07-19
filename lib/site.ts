/** SEO + site content — edit copy and data here. */
export const site = {
  name: 'Jessica Maldonado Estepa',
  shortName: 'Jessica Maldonado',
  displayName: 'MALDONADO, JESSICA',
  tagline: 'jessicamaldonado.me',
  profession: 'Founder & CEO, Vorena Capital',
  shortDescription:
    'I buy profitable tech companies, operate them with AI and LATAM talent, and make them more profitable.',
  city: 'Mexico City',
  country: 'MX',
  countryName: 'Mexico',
  timeZone: 'America/Mexico_City',
  email: 'jessica@vorena.capital',
  url: 'https://jessicamaldonado.me',
  alternateNames: ['Jessica Maldonado', 'Jessica M. Estepa'] as const,
  knowsAbout: [
    'Micro private equity',
    'Tech acquisitions',
    'AI operations',
    'Vorena Capital',
    'LATAM talent',
  ] as const,
  social: {
    linkedin: 'https://linkedin.com/in/jessicaestepa',
    github: 'https://github.com/jessicaestepa',
    instagram: 'https://instagram.com/jessicaestepa',
    twitter: 'https://x.com/Jess_Estepa',
    twitterHandle: '@Jess_Estepa',
    substack: 'https://jessicamaldonado423298.substack.com',
  },

  /** Document chrome — the race-result idiom. */
  doc: {
    label: 'Official Result',
    bib: 'BIB 001 · CHIP OK',
    distance: 42.2,
  },

  race: {
    label: 'Berlin Marathon',
    shortLabel: 'Berlin 42K',
    date: '2026-09-27T09:15:00+02:00',
    displayDate: 'Sep 27, 2026',
  },
  vitals: {
    acquisitions: '02',
    training: '5–6×/wk',
    commits: 'daily',
  },

  hero: {
    heading: 'I buy profitable tech companies and make them more profitable.',
    sub: 'AI-native operations. LATAM talent. Two acquisitions in — investment recovered and generating returns.',
    ctaPrimary: 'Selling your company?',
    ctaSecondary: 'The short version',
  },

  about: {
    title: 'The short version',
    paragraphs: [
      "I'm 28, from Colombia. I've lived in Bogotá and Montreal; today I run everything from Mexico City.",
      "I started at Rappi before it became LATAM's first unicorn. Then I joined a VC fund as its first employee and built its operations from scratch — five years of financial models, diligence, and term sheets.",
      "That's where I saw it: the best returns in tech aren't always in startups. They're in profitable companies nobody's paying attention to.",
      'So I started Vorena — an AI-native holding company that buys those companies and operates them from Latin America. Two acquisitions done. Investment recovered. Generating returns.',
    ],
    pull: "I don't sprint. I compound.",
    marginNote:
      'Drafted in Mexico City, mid Berlin block. Five to six sessions a week — the legs disagree with some of these paragraphs.',
  } as const,

  splits: [
    {
      km: '05K',
      name: 'Rappi',
      result: 'Learned speed',
      body: "Joined before the unicorn round. Learned how fast a company can move when everyone's pointed the same way.",
      live: false,
    },
    {
      km: '21K',
      name: 'Latin Leap',
      result: 'Learned diligence',
      body: 'First employee at a VC fund. Built its operations from zero and read hundreds of deals. Learned what actually makes money — and what just looks like it.',
      live: false,
    },
    {
      km: '42K',
      name: 'Vorena Capital',
      result: 'In progress',
      body: 'Founder & CEO. Buying profitable tech companies and operating them with AI and LATAM talent. This is the long run.',
      live: true,
    },
  ],

  now: [
    'Operating two acquired companies and hunting the next one.',
    'Training for the Berlin Marathon — Sep 27, 2026. Five to six sessions a week, with a coach.',
    'Documenting the training block on YouTube.',
    'Committing code every day. This site included.',
  ],

  beyond: [
    {
      title: 'The long run',
      body: 'Olympic-distance triathlete. Marathoner in training. Endurance sport taught me everything I know about compounding.',
    },
    {
      title: 'On vinyl',
      body: 'Records over playlists. Choosing the next side by hand is the point.',
    },
    {
      title: 'Built in public',
      body: 'Daily GitHub contributor. I build the tools Vorena runs on.',
    },
  ],

  contact: {
    kicker: 'Get in touch',
    heading: 'Selling a profitable software company?',
    body: "Or want to compare marathon splits, term sheets, or record collections? Write me. I answer.",
  },
} as const
