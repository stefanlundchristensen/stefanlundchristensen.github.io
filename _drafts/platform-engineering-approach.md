---
layout: post
title: "From Enablement to Products: Implementing Platform Engineering at Scale"
date: 2026-02-03
categories: platform-engineering
status: draft
---

# From Enablement to Products: Implementing Platform Engineering at Scale

When internal platform teams focus on providing maximum optionality—every choice, every configuration, every possible path—something paradoxical happens. Engineers drown in choices. Documentation sprawls. The platform teams themselves burn out writing process guides instead of shipping code. And somehow, everyone feels like they're drowning.

This was the starting point for reimagining platform engineering: moving from an enablement model that offered everything, to a product model that offered something specific and genuinely useful.

## The Problem with "Maximum Optionality"

Traditional platform enablement teams face a genuine tension. They want to empower product teams. They want to avoid dictating solutions. So they try to offer maximum flexibility—every tool, every option, every possible configuration.

The results are predictable:

- **Sprawl**: Documentation balloons. Teams maintain extensive guides for dozens of alternatives, none of which are cohesive.
- **Decision fatigue**: Product teams face endless choices with little guidance on what actually works.
- **Distraction**: Platform teams spend cycles writing documentation instead of understanding customer needs. They lose touch with what's actually frustrating their users.
- **False satisfaction**: Everyone appears busy, but throughput doesn't improve. The system feels heavy.

The fundamental mistake is treating the platform as a service that should minimize constraints, rather than a service that should maximize value.

## The Shift: Platform as Product

The breakthrough came from a simple reframing: **platform teams should own products, not processes.**

This means:

1. **Sensible defaults over maximum optionality** - If there's no compelling reason not to do something a particular way, do it that way. You get monitoring, alerting, logging, scaling, and observability for free.

2. **Opinionated paths instead of open-ended choices** - The "golden path" isn't a limitation. It's the fastest, most reliable way to accomplish the task. Teams can deviate, but deviating is a decision, not the default.

3. **Active buy vs. build decisions** - Instead of building everything internally, evaluate what genuinely needs to be custom versus what should be purchased or integrated. Many organizations inherit a "build everything" mentality from their startup phase, but that doesn't scale.

This product-focused approach requires a shift in mindset. It means saying "no" to some requests. It means being willing to have opinions. And it means staying close to your users—the engineers and product managers using your platform—to understand what actually helps them move faster.

## Six Principles for Platform Products

To guide this shift, we anchored the platform work in six principles:

**1. Build for Humans**
This sounds simple but isn't. It means understanding the actual workflows of your users. How do engineers onboard? What frustrates them? What could be smoother? It requires talking to users, embedding in teams, observing their work.

**2. Focus on Impact (Outcome > Output)**
Measure what matters: Did the change help teams move faster? Did it reduce toil? Did it improve reliability? Not: How many features did we ship?

**3. Build API-First**
Whether internal tools or infrastructure, design for programmatic access first. This enables other teams to build on top of what you've created. It removes bottlenecks where teams have to wait for manual steps.

**4. Make Quality Your Business**
Quality isn't something that happens after launch. It's foundational. Tests, observability, monitoring, alerting—these aren't afterthoughts. They're part of what the platform provides for free.

**5. Treat Data as a Product**
Data that's locked in one system has limited value. Data that's accessible, documented, and discoverable becomes a platform resource. This applies to metrics, logs, events, and structured data alike.

**6. Think Safe & Secure**
Regulatory requirements, security posture, compliance—these aren't constraints imposed on the platform. They're core to what the platform enables. Teams should be able to build fast *and* safely.

## From Documentation to Implementation

Articulating these principles was a necessary first step. But principles without implementation are just words.

The platform teams created a "How We Build Things" database—essentially a collection of the sensible defaults, golden paths, and best practices, organized around concrete tasks. Instead of generic principles, it documented: "To deploy a service, do X. You get Y for free."

These weren't prescriptive documents trying to cover every edge case. They were products—actual tools, templates, and infrastructure—that implemented the sensible defaults. The documentation explained what you got and why.

The shift from "tell teams how to do things" to "give teams tooling that does the right thing by default" was profound. It meant engineers could adopt the path by simply using the tool, rather than reading extensive documentation and hoping they implemented it correctly.

## Measuring What Matters

How do you know this approach is working? The obvious metrics are throughput and speed:

- **Throughput**: Work completed increased significantly. More PRs shipped. More features deployed.
- **Cycle time**: Time from idea to production compressed. Average cycle times dropped from over 5 days to around 3 days, with fewer spikes.

But these metrics alone don't tell the full story. The more important signal was that platform teams stopped being a bottleneck. Product teams could move forward independently. Questions got answered. Decisions happened faster. The platform teams weren't context-switching between dozens of enablement requests—they were focused on products that genuinely helped.

## What Worked

- **Product thinking**: Staying close to users, understanding their needs, iterating on solutions based on feedback.
- **User research**: Even informal—embedding in teams, observing work, doing interviews. Small user populations mean you can do high-touch research.
- **Sensible defaults with free benefits**: "Do it this way and you get monitoring, alerting, logging, scaling for free" is more powerful than "here are all your options."
- **Building for concrete needs first, then generalizing**: Start with a specific, real problem. Solve it well. Then abstract the solution.
- **One clear entry point**: Instead of teams having to figure out which sub-team owns what, create one "front door" and let the platform figure out routing internally.

## What Didn't Work

- **Traditional product management approaches**: Techniques designed for external products with millions of users don't transfer well to internal platforms serving hundreds of engineers. A/B testing, statistical significance, complex experiments—these aren't the right tools for small user populations.
- **Enablement mentality creeping back in**: It's easy to slip back into "define it and they will obey" thinking. They won't. Compliance through documentation is weak. Compliance through tooling that makes the right thing the easy thing is strong.
- **Tracking % completion of OKRs**: Moving away from "how much of the OKR did we complete?" to "how confident are we that we'll complete this by end of quarter?" changed the conversation from arguments about estimation to discussions about dependencies and risk.

## Conclusion

Platform engineering isn't about having the most sophisticated tools or the most options. It's about understanding what your internal customers actually need and building products that help them move faster and with more confidence.

The shift from enablement to product doesn't happen overnight. It requires:

- Staying close to your users
- Being willing to have opinions
- Building implementation before writing documentation
- Measuring impact, not output
- Iterating based on feedback

When you get it right, the platform becomes invisible in the best way—teams stop thinking about it and start thinking about what they're building.
