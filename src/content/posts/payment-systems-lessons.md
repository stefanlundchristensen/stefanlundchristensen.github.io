---
title: "Five lessons I wish someone told me before about building in payments"
date: 2025-12-10
draft: false
tags: ["payments", "infrastructure", "fintech"]
categories: ["FinTech", "Payments"]
description: "Payment systems look simple until you hit production. The learning curve is expensive, and most of the lessons live in the gaps between what documentation says and what APIs do."
---

Payment systems look deceptively simple. Integrate an API, money moves, done.

Then you hit production. I've seen teams spend weeks debugging why ledgers don't balance. Not days. Weeks. Engineering time, customer support chaos, finance teams scrambling before month-end close. The root cause was a payment partner holding funds in an intermediate account that wasn't mapped upfront. The learning curve in payments is expensive, and most of the tuition goes to lessons you could have learned earlier if you'd known where to look.

## See How Money Moves Before You Build

<!-- DIAGRAM: drop the Excalidraw SVG export at public/diagrams/payment-flow.svg, then uncomment the line below.
![Payment flow showing customer account, intermediate holding accounts, settlement, and merchant account, with refunds, partial settlements, and chargebacks branching off the happy path](/diagrams/payment-flow.svg)
-->

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
