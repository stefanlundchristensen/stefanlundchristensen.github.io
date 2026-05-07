---
title: "When the Cost of Coding Goes to Zero, Everything Else Has to Change"
date: 2026-05-06
draft: true
tags: ["ai-native-product-development", "ai", "product-development", "leadership", "engineering-management"]
categories: ["Leadership"]
---

Most companies aren't getting much from AI in product development. A few are pulling away, fast.

The vast majority are running pilots, getting some productivity uplift, calling it a win. The outliers look different. Their lifecycle has changed shape, not just sped up.

Getting into the entry zone is easy. The next mile is brutal — the curve gets steep fast, and the reason is that going further means tearing apart how your company has done product development for the last twenty years.

## The Easy Mile

The first mile of AI adoption is mostly a tooling story. Engineers use Copilot or Cursor, PMs draft specs in a chat tool, designers mock things up with image models. Productivity goes up. DX's [Q4 2025 impact report](https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/) puts the average at 3.6 hours saved per developer per week, with daily users saving more, and the number has roughly doubled in a year.

This is where most companies are, and there's nothing wrong with it. The problem is mistaking it for the destination.

What this version of AI adoption doesn't change is the shape of the lifecycle. PMs still write tickets that engineers pick up, sprints still assume work is sized in days, code review is still the main quality gate, and specialists still hand artifacts to other specialists.

Faster is still faster, but it's faster on the same shape. DORA's [ROI of AI-assisted software development report](https://services.google.com/fh/files/misc/dora-roi-of-ai-assisted-software-development-2026.pdf) names the gap directly: individual-level metrics improve sharply, but organizational delivery metrics stay flat. They call it the AI productivity paradox. The paradox is the easy mile. The outliers have a different shape.

## The Assumption That Changes Everything

Underneath all of this is one assumption: the cost of coding is going to zero.

Not literally zero. But on a trajectory where the time and human attention required to turn an idea into running software keeps falling, and the trajectory looks more like a step change than a smooth curve. Better models, better agents, better integration with the tools that run the work. Each generation pushes the floor further down.

If you take that assumption seriously, you have to look at every artifact in your product development lifecycle and ask what it was designed for. Most of those artifacts were designed for a world where coding was the expensive step. The ticket, the sprint, the PM-to-engineer ratio, the code review, the design-to-engineering handoff. They all encode the same scarcity. When the scarcity goes away, the artifacts stop making sense.

The companies pulling ahead got there by taking this assumption seriously and rebuilding their lifecycle around it. Better tools alone don't do it.

## Human Judgment Moves Left and Up

The unifying shift, the one all the artifact changes are downstream of, is that human judgment moves left and up.

Left means earlier in the process. The expensive judgment used to live at code review, when the work was almost done. Now it lives at the spec, before the work has started. The earlier you place the judgment, the more downstream value depends on it being good.

Up means higher in abstraction. The expensive judgment used to be "is this implementation correct?" It becomes "is this the right thing to build, and is the brief good enough that the agent will produce something correct?" The unit of attention rises from line of code to outcome and constraint.

Take that one shift seriously and the rest follows. The lifecycle's old artifacts were built around a different distribution of where judgment lived. Each of them has to be rethought.

## What This Breaks in the Lifecycle

A lot of the artifacts you've built your career on stop making sense once judgment moves left and up.

The PM-to-engineer ratio was sized for a world where engineers were the constraint. They aren't anymore. The right number of PMs per engineer becomes context-dependent in ways the old ratio never was, and the cleaner question is whether you should be separating the two roles at all.

Tickets were the right unit when a day was about as much as one engineer could carry without coordinating. AI changes how much one engineer can carry, and the unit moves up. Project specs and agent instruction files start replacing tickets as the durable artifact teams work from.

Code review used to be where quality lived, because that was where expensive mistakes got caught. When agents are writing meaningful chunks of the code, the gate moves to the inputs: the spec, the standards, the tests that exist before work starts, the context the agent has access to. Spec review starts to matter more than PR review.

Single-threaded craft used to be the safe career shape — great PM, great designer, great engineer, each role deep in its own domain. That's harder to make work now. The people pulling ahead have craft plus an adjacent dimension: engineers with product taste, PMs who can prototype, designers who can ship.

Each of these is its own essay. Together they answer what going further looks like in practice.

## How to Find What to Change

If you accept that the lifecycle has to change, the question is where to start. The mistake I see most often is starting with the abstract: running an off-site, drafting a target operating model, mapping a future-state process.

The version that works is concrete. Pick one piece of work. One customer request, one feature, one thing you'd build anyway. Doesn't matter how big.

Walk it through your current process end to end. The spec. The estimation. The technical design. The implementation. The review. The QA. The release. At every step, ask the same question: if AI could be there, what would change?

You don't need a hypothesis about the answer. You're not designing the future-state process. You're finding the bottlenecks. Where does the current process slow down work that AI could now do faster, or require coordination that AI removes the need for? Where does it produce artifacts that exist for reasons that no longer apply?

By the time you've walked one feature end to end with that question in mind, you'll have a list of specific things to change. That list is more useful than any framework. It's grounded in real work, with real people, on a real timeline.

## What the Outliers Have

The companies pulling ahead with AI aren't the ones with the most expensive tooling or the largest AI budget; they're the ones willing to pull their own process apart.

That's a leadership move, not a tooling move. It means looking at artifacts you've built your career on, like the way tickets are written, the way teams are sized, the way reviews work, and being willing to say that some of them were designed for a world that's leaving. It means tolerating the discomfort of not knowing what the new shape is yet, while you walk through your own work to find it.

Each of those strands deserves its own treatment, and I'll come back to them: the ratio shift, the new unit of work, the move from PR review to spec review, and the way agents are becoming users in their own right. They're all downstream of the same shift this post described.

The easy mile is buying tools and pointing them at the existing process. The next mile is admitting the existing process is the thing that has to change. The leaders who can say that out loud, and then do the slow concrete work of redesigning, are the ones whose teams will be on the steep part of the curve.
