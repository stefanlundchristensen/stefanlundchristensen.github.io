---
title: "Building Self-Sufficient Business Units in High-Growth FinTech"
date: 2026-01-15
draft: true
tags: ["leadership", "organizational-design", "scaling"]
categories: ["FinTech", "Leadership"]
---

At 100 people, you can have everyone in a room. Product and engineering sync in hallway conversations. You ship fast because there's no bureaucracy yet.

At 850 people, the instinct is to add coordination. More roadmap reviews. More approval layers. More shared services every team depends on.

This feels like scaling. It's actually how you slow down.

## The Self-Sufficient Model

The alternative is to build business units that can operate independently—teams that have everything they need to make decisions and execute without constant escalation. Not autonomous in the sense of "do whatever you want," but self-sufficient in the sense of "you have the capabilities and authority to serve your customers."

Conway's Law states that systems mirror the communication structures of the organizations that build them. The inverse is also true: you can design team structures to encourage the system architecture you want. Self-sufficient teams with clear boundaries produce loosely coupled systems. Dependencies between teams create dependencies in the code.

### Key Principles

**Decision-Making Authority**: The people closest to the customer make the decisions. Leadership provides context, not commands.

At Pleo, product managers decided pricing changes, feature prioritization, and go-to-market strategy without executive approval. Leadership set company strategy and financial constraints. Teams executed within those boundaries.

One PM changed pricing for their segment, tested three variations over a month, and shipped the winner. No approval meeting. No slide deck. Just decision, test, ship.

Marty Cagan calls this "empowered product teams"—teams with authority to own decisions, roadmaps, and execution within strategic boundaries. The key isn't unlimited autonomy; it's giving teams the context and authority to make good decisions without waiting for permission.

**Complete Teams**: Each unit needs product, engineering, design, data, and go-to-market capabilities. No dependency on shared services for critical path work.

We had teams that shipped complete features—customer research, design, development, analytics, launch—without waiting on anyone. One team shipped a complete invoicing feature in six weeks: customer interviews, design mocks, backend API, frontend UI, analytics dashboard, launch email. No dependencies on shared services except authentication. They moved fast because they didn't wait.

Shared platform services existed for authentication, payments infrastructure, data pipelines. But not for critical path decisions.

**Clear Metrics**: Teams need to know what success looks like and measure it themselves. Not vanity metrics from above, but metrics the team owns and can move.

If you're measured on conversion rate, you need the ability to run experiments, access to analytics, and authority to change the experience. Measuring without authority is theater.

**Trust in Good Intent**: Assume everyone is trying to do the right thing. When disagreements happen, someone knows something others don't.

This isn't naive. It's practical.

If you default to "they must be wrong" instead of "what do they see that I don't?", you create defensive behavior and politics. Trust first, verify understanding second.

## Making It Work at Scale

As we scaled from 100 to 850 people at Pleo, this model proved essential. But it requires discipline:

**Clear boundaries between units**: We explicitly defined which team owned which customer segments and product areas. When overlap happened, the team closest to the customer decided. Others provided input, not approval.

**Strong context-setting from leadership**: Quarterly all-hands where leadership shared company strategy, financial performance, and strategic priorities. Teams made better decisions when they understood the context. We shared revenue, burn rate, runway—real numbers, not sanitized summaries.

**Investment in platform capabilities that all teams can leverage**: Authentication, payments infrastructure, data pipelines, compliance tooling--these lived in platform teams so product teams could focus on customer problems, not reinventing infrastructure. (How those platform teams should be structured is a topic in itself--I wrote about [reorganizing platform teams from enablement to product focus](/posts/enabling-to-product-org-change/) and the difference it makes.)

**A culture that rewards autonomy and accountability**: We celebrated teams that made bold decisions and learned from them. We didn't punish intelligent failures. But we did hold teams accountable for results. (I developed a [leadership scorecard](/posts/leadership-scorecard-beyond-single-team/) to track this kind of organizational maturity across multiple dimensions.)

The result? Teams that moved fast, made good decisions, and didn't need permission to serve customers well. Feature velocity stayed high even as headcount grew 8x.

A caveat: complete self-sufficiency has coordination costs. The model works because we had guardrails—clear boundaries between units, strong context-setting from leadership, and shared platform capabilities. Research shows there's a sweet spot between control and autonomy. Too much central control slows teams down; too much autonomy creates chaos. We found our balance through those three mechanisms.

---

## Further Reading

Key resources on autonomous teams and organizational design:

- **[Conway's Law and Team Boundaries](https://datascienceleadership.com/docs/technical-leadership/conway-law-team-boundaries)** - Why team structure shapes system architecture
- **[bliki: Conway's Law](https://martinfowler.com/bliki/ConwaysLaw.html)** by Martin Fowler - The Inverse Conway Maneuver: designing teams to encourage desired architecture
- **[Autonomy vs. Mission](https://www.svpg.com/autonomy-vs-mission/)** by Marty Cagan - Balancing team autonomy with organizational mission

*Want to discuss organizational scaling? [Get in touch](/about/).*
