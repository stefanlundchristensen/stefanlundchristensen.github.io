export const STEFAN = {
  name: 'Stefan Christensen',
  role: 'SVP Product & Engineering',
  subtitle: 'Notes on payments, platforms, organisations, and constraints.',
  city: 'Copenhagen',
  headline: 'A notebook for load-bearing systems and the decisions underneath.',
  tagline:
    'Stefan Christensen — SVP Product & Engineering at Pleo. Fifteen years across physics, European fintech, payment rails, platform scale, and org design. Based in Copenhagen.',
  longBio: [
    "I'm drawn to problems that sit between disciplines — where the cleanest technical answer and the right business answer pull in opposite directions, and someone has to decide which one wins. Physics trained me to work without a textbook; McKinsey, to read a boardroom and a regulator; operating taught me the constraint is rarely the technology.",
    "That pulls me toward the load-bearing work: the systems and teams a company depends on, built to keep working after I've left the room. The point was never to own everything. It was to leave behind an organisation that doesn't need me.",
  ],
  short:
    'I build and fix platform teams and the businesses they hold up. Currently SVP Product & Engineering at Pleo; previously McKinsey and a PhD in physics.',
  contact: {
    linkedin: 'linkedin.com/in/stefanlchristensen',
    writing: 'stefanchristensen.me/posts',
    location: 'Copenhagen, DK',
  },
  metrics: [
    { value: '5 → 15', label: 'European markets, 11 months' },
    { value: '3×', label: 'Engineering throughput, flat headcount' },
    { value: '70%', label: 'Card scheme cost reduction' },
    { value: '20 pts', label: 'Margin uplift on a processor migration' },
  ],
  operatingPrinciples: [
    {
      title: 'The load-bearing layer is the product',
      body: 'Payment rails, developer platforms, data systems, regulatory entities, and org design decide what the customer experience can become.',
      proof: 'Pleo payments, platform engineering, data, AI infrastructure, regulated entities',
    },
    {
      title: 'Constraints are design material',
      body: 'A regulator, a legacy rail, a boardroom, or a physical limit is not just a blocker. It is information about the shape a good system can take.',
      proof: 'Atomic clocks, European banking, fragmented payment rails',
    },
    {
      title: 'Internal platforms have customers',
      body: 'Developer experience, infrastructure, security, and TechOps work best when treated as products with users, feedback, adoption, and alternatives.',
      proof: 'Developer experience, infrastructure, security, TechOps',
    },
    {
      title: 'The system should survive the author',
      body: 'The useful end state is not dependency on one leader. It is leaders, systems, and decisions that keep working after the room changes.',
      proof: 'Teams across payments, platform, data, and AI infrastructure',
    },
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
      title: 'Platform organisations crossing 50 → 200 engineers',
      body: 'Tripled engineering throughput on flat headcount in the last cycle. The unlock was treating platform teams as product teams with real users and real outcomes — and being willing to sit in the org-politics rooms nobody else wanted to be in. This is the threshold where org structure starts driving the product roadmap, and where most companies break.',
    },
    {
      title: 'European payments, end-to-end',
      body: "Built Pleo's payments platform from scratch, scaled it from 5 to 15 markets in 11 months, and took 70% out of card scheme costs in a duopoly through direct negotiation. The kind of infrastructure work that decides whether the company can scale at all.",
    },
    {
      title: 'Making AI the default way a company operates',
      body: "I'm in the middle of this transition right now: rearchitecting data pipelines, compliance automation, and internal tooling at a company that started as a card programme. Not the chatbot layer — the pipelines, permissions, and tooling that decide whether AI sticks or stays a side project. Most of it isn't sexy.",
    },
    {
      title: 'Building product organisations through growth-stage',
      body: "Joined Pleo at 100 people; helped take it past 850. Six years inside the product engine of a Series C fintech, after five at McKinsey advising European banks. Product at growth-stage isn't the discovery loop — it's pricing, packaging, regulatory readiness, and saying no to the things that don't compound. Get it right and momentum survives Series B; get it wrong and the company stalls.",
    },
  ],
  testimonials: [
    {
      quote:
        'Stefan is one of the strongest colleagues I have ever worked with. He navigates gnarly migrations, is an excellent org designer, and is a leader everyone wants to follow — because he genuinely cares for every individual on his team.',
      cite: 'VP Engineering, Pleo',
    },
    {
      quote:
        "He doesn't just solve technical problems; he solves business problems with technology. On complex decisions, Stefan brings both the technical rigor and the business judgment needed to get the right outcome.",
      cite: 'Senior Finance Business Partner',
    },
    {
      quote:
        'One of the most capable leaders I have encountered in fintech engineering. When we were stuck, he made the tough decisions that moved us forward immediately — but never at the expense of long-term stability.',
      cite: 'Staff Engineer & Architect',
    },
    {
      quote:
        'A true force multiplier. Stefan knew how to ask the right questions and provide the right guidance. He empowered people to do their best work rather than stepping in to do it for them.',
      cite: 'Data Lead, direct report',
    },
    {
      quote:
        'He knows when to coach, when to challenge, and when to roll up his sleeves and help. Stefan combines strong strategic thinking with deep empathy for the people around him — a rare combination in leadership.',
      cite: 'Product Lead, direct report',
    },
  ],
} as const;
