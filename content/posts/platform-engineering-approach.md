---
title: "From Twelve Options to One Command: How We Transformed Platform Engineering"
date: 2026-02-03
draft: true
tags: ["platform-engineering", "organizational-design", "infrastructure", "leadership", "restructuring"]
categories: ["Leadership", "Platform Engineering"]
---

Your platform team offers engineers 12 different ways to deploy a service. Each option is documented. Each is "supported." You're being helpful.

Then you watch an engineer spend three days choosing which option to use.

This was us. Our platform teams wrote thousands of lines of documentation. Engineers read almost none of it. Everyone felt like they were working hard. Throughput barely moved.

We tried renaming teams. "Developer Enablement" became "Platform Products."

Nothing changed.

Six months later, everything was different. But not because of the name. Because we changed what the teams actually did.

## Why Enablement Thinking Fails

Our platform teams were structured around "enablement." The mandate: help product teams build faster. Provide tools, documentation, guidance, support.

Sounds reasonable. In practice, it created a trap.

Platform teams believed the best way to enable others was to offer maximum flexibility. Every tool, every option, every possible configuration. Twelve deployment options because different teams had different preferences.

The trap had four dimensions. Engineers spent days choosing between deployment options: three days on a single decision, hours researching which logging tool to use, sprint planning sessions debating infrastructure choices that had nothing to do with customer problems. The platform teams, meanwhile, burned out writing documentation instead of building. One engineer told me: "I spend 80% of my time writing guides that 20% of engineers read." Many had joined to build infrastructure, not maintain wikis.

Measuring success was impossible. When your job is to "enable," how do you know you've succeeded? We tracked workshops run, documentation pages created, support tickets answered: activity metrics, none of which told us whether engineers were moving faster. And without a clear end state, platform teams were permanently reactive, responding to whatever came next instead of building what they needed to build.

The mistake was treating the platform as a service designed to minimize constraints rather than maximize value.

## The Reframe: Products, Not Processes

The shift came from a question: **What if platform teams owned products instead of providing services?**

A product has users, clear value, iteration cycles, and accountability. "Using this tool, you get deployment with monitoring, alerting, and rollback for free" is a product.

"We support teams in building things" is not a product. It's a mandate so broad it means almost nothing.

This wasn't a reorganization. Nobody changed reporting lines. The teams themselves barely changed. But the question each team asked shifted.

The old question was "How do we help people build?" The new one: "What product do we own, and does it help people build?" Asking it that way, and meaning it, changed almost everything about how the teams prioritized.

## What Actually Changed

### The Teams

The org chart looked almost identical before and after. The same teams (WebCore, Mobile Infrastructure, DevEx, Backend Infrastructure) had all been working on "developer enablement." After, each owned a specific product. WebCore owned the frontend platform. Mobile Core owned the mobile platform. DevX owned developer experience tooling. Backend Core owned backend infrastructure.

Same people. Different mandate.

### The Leadership

One change was critical: we hired leaders who thought like product managers.

Not traditional infrastructure leads who optimized for technical elegance. Not traditional product managers who lacked technical depth. People who could do user research with engineers, make opinionated prioritization decisions, and say no to requests that didn't fit the product vision.

This was hard to hire for. The role doesn't have a standard career ladder. We had some misfires. But getting this right shaped everything downstream.

### The Work

The biggest practical change was moving from documentation to implementation.

Before, we offered twelve ways to deploy a service, each with its own guide. After, running our deploy command gave you automated build, canary deployment with automatic rollback, monitoring dashboards, error tracking, performance metrics, and security scanning, all configured with sensible defaults.

We called these "golden paths." Not documentation describing best practices but actual tools that implemented them as defaults.

Ninety percent of teams never customized anything. They got production-ready deployment without thinking about it. The 10% who needed something different could customize, but deviating was a deliberate choice, not the default.

One platform team learned during user research that their documentation was comprehensive but engineers never read it. They replaced a 40-page deployment guide with an interactive CLI tool. Adoption went from 30% to 85% in a month.

That's the difference between enablement and product thinking. Enablement says "we wrote the docs, it's on them to read it." Product thinking says "if they're not using it, our product isn't good enough."

## The Principles Behind the Products

Six principles guided what we built:

**Build for humans.** Not in the abstract. Literally embed with engineering teams. Watch them work. See where they get frustrated, confused, or stuck. One observation session is worth ten surveys.

**Outcome over output.** We stopped tracking how many features platform teams shipped. We started tracking whether product teams moved faster. Did deployment frequency increase? Did cycle time decrease? Did fewer things break?

**Sensible defaults over maximum optionality.** If there's no compelling reason to do something a particular way, do it that way. You get monitoring, alerting, logging, scaling for free. The golden path isn't a limitation — it's the fastest, most reliable way to get to production. Constraints create freedom.

**API-first everything.** Internal tools designed for programmatic access first. This removes bottlenecks where teams wait for manual steps and lets other teams build on top of platform capabilities.

**Quality is the product.** Tests, observability, monitoring, alerting: not afterthoughts bolted onto the platform. They're part of what the platform provides by default. You don't add monitoring separately. It's already there.

**Security and compliance built in.** Regulatory requirements aren't constraints imposed on the platform. They're core capabilities the platform provides. Teams build fast *and* safely because the golden path handles compliance requirements they'd otherwise need to figure out themselves.

## How We Made the Transition

The actual shift happened in four phases over six months. It wasn't smooth.

### Months 1-2: Reframing

We ran sessions with each platform team explaining what product thinking meant for their work. Not "your job is now different." Instead: "Our platform is becoming a product, and that changes how we make decisions."

Some teams got it immediately. Others were skeptical. "We've always done enablement. Why change something that works?" It didn't work, though that wasn't obvious from the inside.

### Months 2-3: Getting Specific

Each team had to articulate what their product was. Not vague ("developer enablement") but concrete ("the web framework that handles routing, state management, and deployment, giving teams X for free").

This was harder than expected. First attempts were still too abstract. We iterated until each team could answer three questions: What product do we own? Who uses it? What specific value does it provide?

Some teams needed four or five attempts before the answer was concrete enough.

### Months 3-6: User Research

This was the uncomfortable part. Teams that had been operating in abstract space now had to sit with engineers and watch them work.

What they learned surprised them. Problems they'd never considered were causing significant friction. Features they thought mattered didn't. The deployment tool that platform teams were proud of? Engineers avoided it because the error messages were incomprehensible. Nobody had told them because nobody thought it would change.

### Month 6+: Roadmap Shift

Based on research, teams created roadmaps focused on their specific product. This meant saying "no" to things that didn't fit the product vision.

Liberating for some teams. Unsettling for others. Teams used to saying "yes" to every request now had to make hard prioritization decisions. A platform engineer came to me and said: "I got three requests this week that are all reasonable. But they don't fit our product roadmap. Am I allowed to say no?"

That's the job.

## What Worked

The most effective thing we did was make the right path the easy path. "Do it this way and you get monitoring, alerting, logging, and scaling for free" required no persuasion. Engineers used the tools and got better infrastructure than they could have built themselves. Adoption followed the value.

We also learned to build rather than document. Every time we replaced a guide with a tool, adoption went up. Stopping writing and starting building was the right call, even when the documentation felt more thorough.

User research was more valuable than we expected, even at small scale. Embedding with teams for a day, watching an engineer onboard, sitting next to someone during a deploy — ten conversations gave us more signal than any survey. Small user populations enable high-touch research; you just have to do it.

One structural change that helped: a single entry point. Engineers didn't need to know which sub-team owned what. They needed to get their work done.

## What Didn't Work

Traditional product management techniques don't translate. A/B testing, statistical significance, and conversion funnels are built for millions of users. We had hundreds of engineers. We needed direct observation, not quantitative experimentation.

The enablement mentality kept creeping back. A team gets a flood of requests and starts saying yes to everything again. Compliance through documentation is weak; compliance through tooling that makes the right thing the easy thing is strong. We had to actively reinforce the product mindset, more than once.

We also learned to measure differently. Tracking OKR completion percentages led to arguments about estimation. Shifting to "how confident are we that we'll complete this by end of quarter?" changed the conversation from defense to problem-solving.

Feature creep was harder to resist than expected. Saying no to good requests is harder than saying no to bad ones. Every feature adds complexity and maintenance burden. We underestimated how much discipline this required.

## Six Months Later

The shift was visible across the organization. Platform teams were building products, not documentation. Deployment frequency was up 40% and job satisfaction went with it, because engineers were writing code instead of wikis. Product teams felt it differently: feature delivery time dropped from over three weeks to under two, and platform feature adoption jumped from 30% to 65%+ within 30 days of launch. Less time debating infrastructure, more time on customer problems.

For the organization as a whole, feature velocity stayed high even as headcount grew. Platform investment had clear, measurable ROI. The engineering culture shifted toward sensible-defaults thinking: teams started asking "is there a golden path for this?" rather than starting from scratch.

The shift didn't require new hiring, new budgets, or major structural changes. It required a change in how we thought about the work and who we hired to lead it.

## When This Doesn't Work

This approach assumes relatively homogeneous use cases. If your teams have diverse requirements (a machine learning team, a mobile team, and a hardware team all on different stacks) sensible defaults might not exist across all of them.

It also assumes you're past pure experimentation phase. If you're still figuring out your architecture, premature standardization will slow you down.

The tradeoff is real: optionality increases flexibility but decreases velocity. Choose deliberately.

## The Test

Are your platform teams measuring activity or impact? If they count docs written or workshops run, they're in enablement mode. If they measure adoption rates and engineer velocity, they're in product mode.

Can engineers use your platform without reading documentation? If the answer is no, you're optimizing for optionality over usability. Good platform products make the right thing the easy thing.

Do your platform teams say no? If every request becomes a commitment, you're building a service desk, not a product organization.

When engineers stop thinking about the platform and start thinking about what they're building — you'll know it worked.
