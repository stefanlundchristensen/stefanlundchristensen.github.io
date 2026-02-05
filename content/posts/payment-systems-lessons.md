---
title: "Six Hard-Won Lessons from Building Payment Systems at Scale"
date: 2026-02-03
draft: true
tags: ["payments", "infrastructure", "fintech"]
categories: ["FinTech", "Payments"]
---

Payment systems look deceptively simple. Integrate an API, money moves, done.

Then you hit production. Reconciliation breaks. Partners change requirements. Regulations shift. The demo that worked perfectly now costs millions to fix.

These six habits come from scaling Pleo's payments infrastructure from Series A to unicorn (100 to 850 people), plus setting up payment infrastructure across multiple European banks at McKinsey. They're the patterns that separate teams who build resilient systems from those who constantly fight fires.

Reconciliation at scale is such a universal challenge that 95% of finance leaders are now investing in AI to solve it. The learning curve is expensive across the industry—these lessons reduce the tuition you'll pay.

## 1. Draw the Money Map First

**The habit:** Before implementing anything, diagram which accounts funds move between, when transfers happen, and how balances change at each step. Not just the happy path - chargebacks, refunds, partial settlements, currency conversions.

**Why it matters:** Reconciliation breaks when you don't understand state changes. Customer disputes become nightmares. Regulatory reporting fails audits.

**My learning:** I spent three weeks debugging why our ledger didn't balance. Three weeks of engineering time, customer support chaos, stressed finance team preparing for month-end close.

The problem? A partner was holding funds in an intermediate account we didn't know existed. We hadn't mapped the complete flow upfront.

Modern payment infrastructure uses double-entry accounting not just for compliance, but as an infrastructure necessity. Every fund movement creates debits and credits across accounts. When you don't map these state changes completely—including intermediate accounts, holds, reversals, and fees—your ledger won't balance and reconciliation becomes manual detective work.

## 2. Documentation Lies - Test the Real Thing

**The habit:** Mock end-to-end journeys with manual API calls using Postman, curl, or whatever tool you prefer. Call the actual endpoints with real parameters. Don't assume the documentation matches reality.

**Why it matters:** Partner documentation is aspirational. It describes what should work, not the edge cases, rate limits, or undocumented validation rules you'll hit in production.

**My learning:** A partner's documentation said they supported instant transfers across Europe. We built our product roadmap around it.

When we finally tested the APIs, "instant" meant "maybe same-day if submitted before 3 PM on weekdays, and only in certain markets."

We redesigned the customer experience and delayed launch.

That said, mature platforms like Stripe have earned trust through years of reliable documentation. The skill isn't blanket distrust—it's knowing when to verify everything (newer providers, complex integrations, custom requirements) versus when to trust (established platforms with strong track records). Start skeptical until a provider proves reliability.

## 3. Get Engineers Talking to Engineers

**The habit:** When working with third-party payment providers, insist that the right experts connect directly. Engineers to engineers, compliance to compliance, product to product. Don't let everything flow through account managers.

**Why it matters:** Account managers are incentivized to make things sound simple and solvable. Engineers will tell you about the actual constraints, the undocumented quirks, and what really breaks in production.

**My learning:** We spent two months evaluating a partnership. The account manager kept saying "yes, we can do that."

When our engineers finally talked to their engineers, half our requirements weren't possible without custom development. Quarters of work, not weeks.

The account manager genuinely believed it was simple. They just didn't understand the technical complexity.

## 4. Beware the Full-Service Promise

**The habit:** When a partner claims they handle everything across all markets and rails, dig into the edge cases. Payments is a game of exceptions - they might be live in a market but only on slow overnight rails, or they support a currency but with manual review delays.

**Why it matters:** "Full coverage" in a sales deck doesn't mean "works for your use case." You'll discover limitations after integration, when it's expensive to switch.

**My learning:** A partner promised pan-European payment coverage during procurement. After integration and launch, we discovered they only processed certain transactions on D+1 settlement rails. Not the instant transfers our product depended on. (The fragmentation of [European payment rails](/posts/european-payment-rails/) makes this especially common--what "coverage" means varies dramatically by country and payment method.)

We built workarounds. Then added a second provider. Double the integration cost, double the operational complexity.

## 5. Modularity Is Your Insurance Policy

**The habit:** If you depend on partners for something core to your product, architect your platform to be modular. Build abstraction layers that let you swap providers or add redundancy without rewriting your entire stack.

**Why it matters:** Partners change. They update compliance requirements, shift their strategic focus, get acquired, or sunset products. If your system is tightly coupled to their specific implementation, you're at their mercy.

**My learning:** A key partner changed their KYC requirements with 90 days notice. We'd built tight integration directly against their APIs throughout our codebase. We couldn't adapt quickly.

We offboarded roughly 30% of our customer base.

A modular architecture with proper abstraction layers would have let us add a second provider and migrate customers smoothly. Instead we lost them. This is the same lesson we learned in [platform engineering](/posts/platform-engineering-approach/)--building opinionated defaults with clean abstraction layers isn't just good engineering practice, it's an insurance policy.

Industry best practice is multi-provider resilience. Smart fintech builders layer orchestration, compliance, and redundancy into their payment architecture from the start rather than depending on a single PSP. The upfront investment in abstraction layers pays off when—not if—providers change terms or capabilities.

## 6. Payments Is a Partnership Sport

**The habit:** Don't wait for other teams to come to you with payment questions. Proactively partner with product, sales, marketing, and finance. Educate them on what's possible with new payment technologies and rails. They don't know what they don't know.

**Why it matters:** Other teams aren't payment experts - they won't naturally think about how instant transfers, request-to-pay, or account-to-account payments could unlock new product experiences or reduce costs. If you stay in your silo, you miss opportunities and create misaligned expectations.

**My learning:** Our sales team kept promising features that didn't exist. They didn't understand our payment constraints. Deals reached the legal stage before we discovered the commitments couldn't be fulfilled.

We started running regular education sessions. Brought sales into early product discussions. They got better at selling what we could deliver. And they surfaced customer needs that shaped our roadmap.

---

## The Common Thread

These habits share a common thread: they're all about reducing assumptions and increasing visibility. Payment systems fail in the gaps—between what documentation says and what APIs do, between what sales promises and engineering can deliver, between what worked yesterday and what regulations require tomorrow.

The learning curve in payments is expensive. I've seen companies spend millions learning these lessons the hard way. These habits won't eliminate the cost, but they'll reduce the tuition you pay while building expertise.

---

## Further Reading

Key resources on building resilient payment infrastructure:

- **[How to Build a Real-Time Ledger with Double-Entry Accounting](https://finlego.com/tpost/c2pjjza3k1-designing-a-real-time-ledger-system-with)** by FinLego - Why double-entry ledgers are infrastructure necessity, not just compliance
- **[The Architecture Behind Stripe's Global Payments](https://observabilityguy.medium.com/the-architecture-behind-stripes-global-payments-in-seconds-52c834dc3961)** - How Stripe tracks money movement and state changes at scale
- **[Payments Infrastructure: Stripe, Adyen, and Beyond](https://insart.com/payments-infrastructure-stripe-adyen-multi-psp-guide/)** by INSART - Guide to multi-PSP strategies and when to use them
- **[Market Insights 2025: Reconciliation Tech at Heart of Fintech](https://www.dialectica.io/community-hub/fintech-in-2025-ai-strategic-scaling-and-payment-dominance)** - Industry data on reconciliation challenges and AI solutions

*Building payment infrastructure in your organization? [Let's connect on LinkedIn](https://www.linkedin.com/in/stefanlchristensen/).*
