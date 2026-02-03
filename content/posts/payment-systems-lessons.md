---
title: "Six Hard-Won Lessons from Building Payment Systems at Scale"
date: 2026-02-03
draft: false
tags: ["payments", "infrastructure", "fintech"]
categories: ["FinTech", "Payments"]
---

Payment systems look deceptively simple from the outside. Integrate an API, money moves, done. But the gap between "it works in demo" and "it works at scale across markets with regulatory changes and partner drama" is where companies burn millions and lose years.

These six habits come from my years scaling Pleo's payments infrastructure from startup to competitive moat, plus setting up payment infrastructure across multiple European banks at McKinsey. They're not comprehensive - you could write books on this - but they're the patterns that separate teams who build resilient systems from those who constantly fight fires.

## 1. Draw the Money Map First

**The habit:** Before implementing anything, diagram which accounts funds move between, when transfers happen, and how balances change at each step. Not just the happy path - chargebacks, refunds, partial settlements, currency conversions.

**Why it matters:** Reconciliation breaks when you don't understand state changes. Customer disputes become nightmares. Regulatory reporting fails audits.

**My learning:** I once spent three weeks debugging why our ledger didn't balance, only to discover a partner was holding funds in an intermediate account we didn't know existed. Three weeks of engineering time and customer support chaos - all because we hadn't mapped the complete flow upfront.

## 2. Documentation Lies - Test the Real Thing

**The habit:** Mock end-to-end journeys with manual API calls using Postman, curl, or whatever tool you prefer. Call the actual endpoints with real parameters. Don't assume the documentation matches reality.

**Why it matters:** Partner documentation is aspirational. It describes what should work, not the edge cases, rate limits, or undocumented validation rules you'll hit in production.

**My learning:** A partner's documentation said they supported instant transfers across Europe. We built our product roadmap around it. When we finally tested the actual APIs, we discovered "instant" meant "maybe same-day if submitted before 3 PM on weekdays, and only in certain markets." We had to redesign the customer experience and delay our launch.

## 3. Get Engineers Talking to Engineers

**The habit:** When working with third-party payment providers, insist that the right experts connect directly. Engineers to engineers, compliance to compliance, product to product. Don't let everything flow through account managers.

**Why it matters:** Account managers are incentivized to make things sound simple and solvable. Engineers will tell you about the actual constraints, the undocumented quirks, and what really breaks in production.

**My learning:** We wasted two months on a partnership evaluation where the account manager kept saying "yes, we can do that." When our engineers finally got on a call with their engineers, we learned half our requirements weren't possible without significant custom development that would take quarters, not weeks. The account manager genuinely believed it was simple - they just didn't understand the technical complexity.

## 4. Beware the Full-Service Promise

**The habit:** When a partner claims they handle everything across all markets and rails, dig into the edge cases. Payments is a game of exceptions - they might be live in a market but only on slow overnight rails, or they support a currency but with manual review delays.

**Why it matters:** "Full coverage" in a sales deck doesn't mean "works for your use case." You'll discover limitations after integration, when it's expensive to switch.

**My learning:** A partner promised pan-European payment coverage during procurement. After we'd integrated and gone live, we discovered they could only process certain transactions on D+1 settlement rails, not the instant transfers our product experience depended on. We had to build workarounds and eventually add a second provider - doubling our integration cost and ongoing operational complexity.

## 5. Modularity Is Your Insurance Policy

**The habit:** If you depend on partners for something core to your product, architect your platform to be modular. Build abstraction layers that let you swap providers or add redundancy without rewriting your entire stack.

**Why it matters:** Partners change. They update compliance requirements, shift their strategic focus, get acquired, or sunset products. If your system is tightly coupled to their specific implementation, you're at their mercy.

**My learning:** A key partner changed their KYC requirements with 90 days notice. Because we'd built tight integration directly against their specific APIs throughout our codebase, we couldn't adapt quickly. We had to offboard roughly 30% of our customer base. A modular architecture with proper abstraction layers would have let us add a second provider and migrate customers smoothly instead of losing them.

## 6. Payments Is a Partnership Sport

**The habit:** Don't wait for other teams to come to you with payment questions. Proactively partner with product, sales, marketing, and finance. Educate them on what's possible with new payment technologies and rails. They don't know what they don't know.

**Why it matters:** Other teams aren't payment experts - they won't naturally think about how instant transfers, request-to-pay, or account-to-account payments could unlock new product experiences or reduce costs. If you stay in your silo, you miss opportunities and create misaligned expectations.

**My learning:** Our sales team kept promising customers features that didn't exist because they didn't understand our payment constraints. Deals would get to the legal stage before we'd discover the commitments couldn't be fulfilled. When we started running regular education sessions and brought sales into early product discussions, they became better at selling what we could actually deliver - and they surfaced customer needs that shaped our roadmap in valuable ways.

---

## The Common Thread

These habits share a common thread: they're all about reducing assumptions and increasing visibility. Payment systems fail in the gaps - between what documentation says and what APIs do, between what sales promises and engineering can deliver, between what worked yesterday and what regulations require tomorrow.

The learning curve in payments is expensive. These habits won't eliminate the cost, but they'll reduce the tuition you pay while building expertise.

---

*Building payment infrastructure in your organization? [Let's connect on LinkedIn](https://www.linkedin.com/in/stefanlchristensen/).*
