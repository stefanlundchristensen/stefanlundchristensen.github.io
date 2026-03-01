---
title: "How We Structured Pleo's Payments Platform to Not Become a Bottleneck"
date: 2026-02-26
draft: true
tags: ["payments", "platform-engineering", "organizational-design", "fintech"]
categories: ["Payments", "Leadership"]
---

Every payments platform reaches the same crisis point.

You've built something useful. Other teams depend on it. And then, slowly, every new feature in the product touches your team. You become the team everything routes through — part infrastructure, part feature shop, part compliance team, part support desk.

You're the bottleneck. And you got there by being helpful.

## How We Got There

At Pleo, our payments area was originally structured around customer flows and product features. Teams owned slices of the payment experience: onboarding, card usage, expense management, settlements.

It felt logical because it mirrored how the business talked about itself.

But it meant every team owned a piece of everything. There was no clean ownership of the actual payment infrastructure. When a product team needed something from the payment layer, they'd ask around until they found the team that roughly owned the relevant part — then that team would build it or help build it or review it.

The payments teams were responsive and smart. They just couldn't say no without creating a problem somewhere else. The requests accumulated. The roadmap filled up with other people's priorities.

We were a platform in name. We were a service desk in practice.

## The Philosophical Shift

The fix wasn't a reorganization. It was a decision.

We are a platform. We offer APIs. Nothing else.

That sounds clean in retrospect. At the time it was a genuine fight. Saying "we only do platform work" meant saying no to product teams who had real problems and real timelines. It meant letting some things move slower in the short term. There were stakeholders who pushed back hard.

But the alternative was permanent drift. Without a clear identity, the platform teams would keep absorbing whatever came at them, and the roadmap would never be theirs.

The moment we committed to "APIs only," everything downstream became easier. Who owns this? Is it a platform concern or a product team concern? You could answer that question. Before, you couldn't.

## What the Structure Looked Like

Once we had the identity, the structure followed.

We reorganized around payment instruments rather than customer flows. Each team owned a distinct domain: account-to-account payments, card payments, settlements, compliance infrastructure. Clean vertical ownership. Clear interfaces. No shared fate with downstream feature work.

The hardest part of making this real was letting go of front-end ownership entirely.

There were things the payments platform teams had historically owned that were really product features — just features that happened to touch payments. We handed those off. It was uncomfortable. Product teams weren't always ready to take them. But keeping them would have undermined the whole model.

Platform identity isn't just a strategy statement. You have to enforce it by what you keep and what you give away.

## The Rules We Used

A few principles kept us honest:

**Own the capability, not the feature.** A platform team should own account-to-account payment execution. They should not own the user experience for initiating a bank transfer — that belongs to a product team.

**APIs are the contract.** If a product team can build what they need using your APIs without talking to you, the platform is working. If they need your team to build something for them every time, it's not.

**Saying no is the job.** Every platform team will get requests they could technically fulfill. Most of them they shouldn't. The question isn't "can we do this?" — it's "does this belong on our roadmap?" Platform teams that can't say no aren't platforms. They're just teams with more requests than capacity.

**Stay two quarters ahead.** Platform teams should be building what product teams will need, not what they're asking for right now. If your roadmap is driven by current feature requests, you're already behind.

## What Changed

Twelve months after committing to the model, the teams were operating differently.

Product teams knew where to go. They weren't routing requests around hoping to find the right person. The interfaces were clear enough that they could build against them without pulling the platform team into every conversation.

The payments platform teams had roadmaps that were actually theirs. They were investing in reliability, scalability, compliance infrastructure — things that had always been important but kept getting deprioritized by more urgent requests.

And crucially, when something broke or needed to change in the payment layer, there was a team that unambiguously owned it. Ownership was real.

## The Lesson

Becoming a platform isn't an organizational maneuver. It's a commitment to a specific kind of work.

You can rename teams. You can draw new org charts. You can write platform strategy documents. None of it matters until you decide what you are — and hold that line.

The hard part is that holding the line means disappointing people who have real needs and real timelines. Platform clarity has a cost in the short term. The alternative is permanent bottleneck.

Choose deliberately. The structure follows the decision.
