---
title: "Five lessons I wish someone told me before about building in payments"
date: 2025-12-10
draft: true
tags: ["payments", "infrastructure", "fintech"]
categories: ["FinTech", "Payments"]
description: "Payment systems look simple until you hit production. The learning curve is expensive, and most of the lessons live in the gaps between what documentation says and what APIs do."
linkedinPost: |
  Payment systems look deceptively simple. Integrate an API, money moves, done.

  Then you hit production. I've watched teams spend weeks, not days, debugging why a ledger wouldn't balance, only to discover a partner was holding funds in an intermediate account nobody had mapped. Three weeks of debugging usually means three days of diagramming were skipped.

  A few other lessons that cost real time to learn. Talk to the partner's engineers, not their account managers. Account managers are incentivised to make things sound simple. Engineers will tell you what actually breaks in production.

  Build for the partner you'll need next, not the one you have. Partners change terms, get acquired, sunset products. Tight coupling turns that into a crisis.

  And know enough about the domain to ask the right questions. A single wrong parameter in a chip card profile can break your product in market. The partner will answer what you ask. They won't fill in what you didn't know to ask.
twitterPost: |
  Payment systems look simple until you hit production.

  Lessons that cost real time to learn: diagram every fund movement before you build, talk to partner engineers (not account managers), and know enough about the domain to ask the questions you don't yet know to ask.
---

Payment systems look deceptively simple. Integrate an API, money moves, done.

Then you hit production. I've seen teams spend weeks debugging why ledgers don't balance. Not days. Weeks. Engineering time, customer support chaos, finance teams scrambling before month-end close. The root cause was a payment partner holding funds in an intermediate account that wasn't mapped upfront. The learning curve in payments is expensive, and most of the tuition goes to lessons you could have learned earlier if you'd known where to look.

## See How Money Moves Before You Build

<figure class="post-diagram">
<svg viewBox="0 0 640 132" role="img" aria-label="Funds move from customer to payment service provider to an intermediate holding account, then to settlement and the merchant. Refunds, chargebacks and fees return into the holding account.">
<defs><marker id="pf-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" class="d-head"/></marker><marker id="pf-k" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" class="d-head--key"/></marker></defs>
<rect x="0" y="16" width="104" height="40" class="d-node"/><text x="52" y="41" class="d-label" text-anchor="middle">Customer</text>
<line x1="110" y1="36" x2="128" y2="36" class="d-line" marker-end="url(#pf-a)"/>
<rect x="134" y="16" width="104" height="40" class="d-node"/><text x="186" y="41" class="d-label" text-anchor="middle">PSP</text>
<line x1="244" y1="36" x2="262" y2="36" class="d-line" marker-end="url(#pf-a)"/>
<rect x="268" y="16" width="104" height="40" class="d-node d-node--key"/><text x="320" y="41" class="d-label d-label--key" text-anchor="middle">Holding</text>
<line x1="378" y1="36" x2="396" y2="36" class="d-line" marker-end="url(#pf-a)"/>
<rect x="402" y="16" width="104" height="40" class="d-node"/><text x="454" y="41" class="d-label" text-anchor="middle">Settlement</text>
<line x1="512" y1="36" x2="530" y2="36" class="d-line" marker-end="url(#pf-a)"/>
<rect x="536" y="16" width="104" height="40" class="d-node"/><text x="588" y="41" class="d-label" text-anchor="middle">Merchant</text>
<path d="M588 60 L588 104 L320 104 L320 64" class="d-line d-line--key" marker-end="url(#pf-k)"/>
<text x="306" y="100" class="d-sub" text-anchor="end">Refunds, chargebacks, fees</text>
</svg>
<figcaption>Money doesn't only run left to right. Refunds, chargebacks, partial settlements and fees re-enter at the intermediate holding account rather than reversing along the path they came in on — which is why leaving that account off the map is what stops a ledger balancing.</figcaption>
</figure>

Before implementing anything, diagram which accounts funds move between, when transfers happen, and how balances change at each step. Not just the happy path: chargebacks, refunds, partial settlements, currency conversions. Every fund movement creates debits and credits across accounts. When you haven't mapped the state changes completely (the holds, the reversals, the fees), your ledger won't balance and reconciliation becomes manual detective work.

Three weeks of debugging can usually be prevented by three days of diagramming.

The diagram also teaches you something about partner documentation. Partner docs are aspirational. They describe what should work, not the edge cases, rate limits, or undocumented validation rules you'll find in production. One team built a product roadmap and trained sales around a partner's promise of instant transfers across Europe. When they tested the APIs, "instant" meant "maybe same-day if submitted before 3 PM on weekdays, and only in certain markets." The customer experience had to be redesigned. The launch delayed.

Mock end-to-end journeys before you trust anything. Call the actual endpoints with real parameters. The tests tell you what the documentation can't. Not every provider needs the same level of scepticism (mature platforms like Stripe have earned trust through years of reliable documentation), but with newer providers or complex integrations, start sceptical until they prove otherwise.

## Know Your Partners, Not Their Account Managers

The second set of lessons is about the people on the other side of the integration.

Insist on direct connections between the right people. Engineers to engineers. Compliance to compliance. Product to product. Don't let everything flow through account managers. Account managers are incentivised to make things sound simple and solvable. Engineers will tell you about the real constraints, the undocumented quirks, and what breaks in production. One team spent months evaluating partnerships where the account manager kept saying "yes, we can do that." When engineers finally talked directly to engineers, half the core requirements turned out to need custom development. Quarters of work, not weeks. The account manager believed it was simple. They just didn't understand the technical complexity they were promising away.

When a partner claims they handle everything across all markets and rails, dig into the edge cases. Payments is a game of exceptions. They might be live in a market but only on slow overnight rails, or support a currency with manual review delays. "Full coverage" in a sales deck doesn't mean "works for your use case." One team discovered after integration and launch that only D+1 settlement rails were supported, not the instant transfers the product depended on. The result was workarounds, then a second provider. Double the integration cost and double the operational complexity. The fragmentation of European payment rails makes this especially common.

## Build for the Partner You'll Need Next

If you depend on partners for something core to your product, architect for modularity. Partners change. They update compliance requirements, shift their strategic focus, get acquired, or sunset products. If your system is tightly coupled to their specific implementation, you're at their mercy.

When a key partner changed compliance requirements with minimal notice on us, the cost showed up as forced customer offboarding because the system lacked the flexibility to onboard an alternative quickly. A modular architecture turns that into a manageable migration rather than a crisis. The upfront investment pays off, because providers always change terms or capabilities eventually.

## The Questions You Don't Know to Ask

The lesson that took me longest to learn isn't about APIs or architecture. It's about what happens when you go into a conversation with a partner without enough domain knowledge. Not because you're unprepared, but because you don't yet know what you don't know.

It happens the same way every time: you ask at a high level, the partner answers at the same level, and everything sounds workable. Then the gap shows up in production. A parameter you didn't know to specify. A configuration that needed explicit discussion. A behaviour that didn't match your expectations because you didn't know the vocabulary.

Chip card profiles are one example. A single wrong parameter setting in a card chip profile can make or break your product in market. If you don't know enough about EMV chip specifications to ask about specific profile configurations, you'll get a "yes, it works" that's technically accurate but doesn't protect you from the edge case that matters. The partner answered what you asked. The gap between what you asked and what you needed to know showed up later.
