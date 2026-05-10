export const STEFAN = {
  name: 'Stefan Christensen',
  role: 'SVP Product & Engineering',
  subtitle: 'Product & engineering leader. Payments, platforms, the org work underneath.',
  city: 'Copenhagen',
  headline: 'I run product and engineering at Pleo.',
  tagline:
    'Stefan Christensen — SVP Product & Engineering at Pleo. Fifteen years in European fintech: payment rails, platform scale, org design. Based in Copenhagen.',
  longBio: [
    'I run product and engineering at Pleo — ~70 people across platform, data, AI infrastructure, and our regulated entities. I joined in 2019 to migrate the payments stack and ended up building the platform that runs the company.',
    "Most of what I've owned at Pleo started as something nobody else wanted to own — a payment-processor migration, a regulatory deadline, a market launch with weeks of runway. The pattern: go in, ship the unsexy thing, leave a team that doesn't need me anymore. Before Pleo: McKinsey advising Tier 1 European banks, and a PhD in physics building atomic clocks.",
  ],
  short:
    'I build and fix platform teams and the businesses they hold up. Currently SVP Product & Engineering at Pleo; previously McKinsey and a PhD in physics.',
  contact: {
    email: 'stefan_christensen@protonmail.com',
    linkedin: 'linkedin.com/in/stefanlchristensen',
    writing: 'stefanchristensen.me/posts',
    location: 'Copenhagen, DK',
  },
  metrics: [
    { value: '5 → 15', label: 'European markets, 11 months' },
    { value: '3×', label: 'Engineering throughput, flat headcount' },
    { value: '70%', label: 'Card scheme cost reduction' },
    { value: '~70', label: 'On the team today, platform + data + AI' },
  ],
  experience: [
    {
      years: '2024 — now',
      role: 'SVP Product & Engineering',
      org: 'Pleo',
      note: 'Series C spend management. 70+ people across platform engineering, data, AI infrastructure, and regulated entities. 70% reduction in card scheme costs.',
    },
    {
      years: '2023 — 2024',
      role: 'VP, Head of Platform',
      org: 'Pleo',
      note: '100+ people across payments, data, developer experience, infrastructure, security. 300% increase in engineering throughput with flat headcount.',
    },
    {
      years: '2021 — 2023',
      role: 'VP, Head of Payments',
      org: 'Pleo',
      note: 'Built the payments organisation from scratch. Scaled from 5 to 15 European markets in 11 months.',
    },
    {
      years: '2014 — 2019',
      role: 'Engagement Manager',
      org: 'McKinsey & Company',
      note: 'Advised Tier 1 European banks on payments, regulatory strategy, and digital transformation. Led founding of a pan-European payment infrastructure company.',
    },
    {
      years: '2009 — 2014',
      role: 'PhD in Physics',
      org: 'University of Copenhagen',
      note: 'Built atomic clocks beyond the quantum limit. The kind of problems where there is no textbook answer because nobody has solved them before.',
    },
  ],
  proposition: [
    {
      title: 'European payments, end-to-end',
      body: "Built Pleo's payments platform from scratch, scaled it from 5 to 15 markets in 11 months, and took 70% out of card scheme costs in a duopoly through direct negotiation. The work no one wants to own and that determines whether the company can scale at all.",
    },
    {
      title: 'Traditional companies going AI-first',
      body: "I'm in the middle of this transition right now: rearchitecting data pipelines, compliance automation, and internal tooling at a company that started as a card programme. Not the chatbot layer — the work that decides whether AI becomes the default way an organisation operates or stays a side project. Most of it isn't sexy.",
    },
    {
      title: 'Platform organisations crossing 50 → 200 engineers',
      body: 'Tripled engineering throughput on flat headcount in the last cycle. The unlock was treating platform teams as product teams with real users and real outcomes — and being willing to sit in the org-politics rooms nobody else wanted to be in. This is the threshold where org structure starts driving the product roadmap, and where most companies break.',
    },
  ],
  testimonials: [
    {
      quote:
        'Stefan is one of the strongest colleagues I have ever worked with. He navigates gnarly migrations, is an excellent org designer, and is a leader everyone wants to follow — because he genuinely cares for every individual on his team.',
      cite: 'VP Engineering, Pleo',
    },
  ],
} as const;
