---
title: "Two Customers, Not One"
date: 2026-05-09
draft: true
tags: ["fintech", "compliance", "leadership"]
categories: ["FinTech", "Leadership", "Payments"]
description: "Running product inside a licensed entity means serving the regulator alongside the user. Treat them as a customer, not a tax."
---

The first time a regulator asked me who had signed off a change to our transaction monitoring system, I realized the answer mattered more than the change itself.

## The Habits That Don't Travel

If you've run product before but only outside a licensed entity, the first weeks inside one feel like a category error. Move fast and break things, the operating slogan a generation of product people grew up reciting, does not translate. Some of the instincts that made you good at the last job are now liabilities, and a few of the habits you suppressed are suddenly your most useful traits.

The change is not that the work becomes slower. It's that the work becomes a different shape. You are not adding compliance on top of a product; you are building a product that exists because a license sits underneath it. Without that license you have no business, and the license is granted on conditions that cannot be negotiated by shipping faster. None of the discovery, prioritization, or build muscle goes away. It just stops being the only thing that decides whether your work survives.

The first lesson is the discomfort itself. Habits you can't shake are usually a sign that you've taken the constraint personally. The shape of the work has changed, and the discomfort is information about which of your old reflexes will need to be retrained before they get you in trouble.

## Two Customers

The framing that helped me most came from Mayur Kamat on Lenny's podcast. He put it simply: in a licensed entity, you have two customers, not one.

Customer one is the person paying for the product. Everything most product people learn is about this customer: their needs, their workflows, their willingness to pay, the gap between what they say and what they do.

Customer two is the regulator, the auditor, the body that grants you the license to operate. They are not paying you. They will not delight at a clean onboarding flow. But they will, at any moment, ask whether you are the kind of firm that should continue to hold a license, and the answer they reach is binding.

The symmetry matters. Serve only customer one and the license eventually gets pulled, and a product without a license is not a product. Serve only customer two and you have a perfectly compliant operation that nobody is using. Either failure mode is fatal; the second is just slower.

Almost every team I've watched struggle in regulated product was over-indexed on customer one. The regulator was a tax to minimize, a checklist someone else owned, a meeting nobody wanted on the calendar. That posture is the trap.

## What the Regulator Actually Wants

The good news is that customer two is unusually well-specified. Once you read the relevant rulebooks, four asks recur, and they are roughly the same across regimes.

The first is **clear accountability**. There must be a named person who can sign and say, "this is true." Under UK money-laundering rules that person is the MLRO, the Money Laundering Reporting Officer. Under UK safeguarding it's the named accountable officer responsible for customer funds. Different regimes use different titles, but the structural ask is the same: one human, named, with the authority and the obligation to attest. If you cannot point to that person for any given regulatory question, you have a gap, and you don't get to be vague about it.

The second is **clear governance**. The right forum has to decide the right thing. A critical third-party provider is not signed by whoever negotiated the contract; it is approved by the board, or by a body the board has explicitly designated. Risk assessments are board-approved. Exit plans, the documents that describe how you wind the relationship down without harming customers, are board-approved. None of this directly benefits the end user, and it is not optional.

The third is **documented decision-making**. A correct decision, taken by the wrong person, is still a problem. We changed our transaction monitoring rules once with what I was certain was the right answer; the issue was that the MLRO had not formally signed it. The decision was sound and the person who took it was wrong, and the second part is the part the regulator cared about. The fix was not to change the decision. It was to redo the path that produced it.

The fourth is **risks and controls mapped to the regulation**. You start from the applicable text: the Danish hvidvask law (the country's anti-money-laundering statute), CASS 15 in the UK (the safeguarding rules for client money), the EU's Digital Operational Resilience Act (DORA), depending on your jurisdiction and product. You decide what applies. Where you've ruled something out, you write down why; "not in scope" without a reason is not an answer. You map the risks each applicable rule creates, knowing that one risk can sit under several rules. You define controls. A single control can mitigate several risks at once. Then you evidence them. Some controls are a sign-off, like the MLRO signing before a production push. Some are an automated setting in the system, a configuration that cannot be turned off without a ticket. The evidence is not a one-time artifact. It is the day-to-day work, captured as it happens.

## The Tractable Customer

Sit with those four asks for a while and a strange thing happens. They start to feel like a product brief.

Most paying users are notoriously hard to specify. They contradict themselves, change preferences quarter to quarter, and ask for one thing while behaving as if they want another. Customer two doesn't do that. The asks are written down, indexed, and consistent across firms in the same regime. The rulebook is public. The auditors have read it before they walk in, and so should you.

Once I started reading regulatory text as customer requirements, the work changed character. The hvidvask scoping exercise stopped feeling like a nuisance. The CASS reconciliation cadence became a thing we designed for, rather than a thing we tolerated. The DORA register of third parties became, slowly, the cleanest map of our supply chain anybody had.

None of that softened what the regulator could ask of us. It meant we knew, before they asked, what the answer would be. And it meant the engineering work was no longer split between things we were doing for the user and things we were doing for the auditor. Both ended up being things we were doing for the business.

## On the Front Foot

What does it look like when customer two is on the customer list from the start?

The audit is not a fire drill. The license review is not a scramble. When the regulator sends a letter, the answer is written down somewhere already, and the work is just gathering it rather than constructing it under pressure. The MLRO sign-off has been part of the change process for so long that nobody remembers a time it wasn't. The board has seen the exit plan; the exit plan has seen daylight. The controls run in production every day, leaving evidence as a side effect.

That is the posture worth aiming at. It does not make customer one any less important. It makes customer two no longer a periodic emergency. The license that lets you serve customer one stops being something you carry uneasily, and starts being something you operate, the same way you operate everything else in the business.
