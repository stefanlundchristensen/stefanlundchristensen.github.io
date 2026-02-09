---
title: "Why 'Do You Support Faster Payments?' Is the Wrong Question"
date: 2026-01-28
draft: true
tags: ["payments", "europe", "infrastructure", "fintech", "banking"]
categories: ["FinTech", "Payments"]
---

We did everything right.

At Pleo, when we selected a UK bank for Faster Payments, we ran a proper RFP. We asked if they supported Faster Payments. We validated their answers in writing. We got confirmation from their partnerships team.

They said yes. We signed contracts. We completed months of compliance reviews.

Then, during implementation, we started testing across different hours of the day.

Faster Payments worked perfectly at 2pm on a Tuesday.

At 9pm? Customer tries to move money into their Pleo account. Nothing happens.

Saturday? Nothing.

Bank holiday? Nothing.

What should have been 24/7/365 instant payments worked weekdays during business hours. That's it.

## The Bank Didn't Know Either

When we raised this with the bank, they apologized. They didn't fully understand their own limitations.

Think about that for a moment.

The bank's payments team—the people we asked during diligence—didn't know their Faster Payments implementation had time restrictions.

If the bank doesn't know, what chance do you have of asking the right question?

## We Were Locked In

By the time we discovered this, we'd spent months on compliance, legal review, and integration. We had binding contracts. We couldn't just walk away.

So we operated with a broken setup for six to nine months.

During that time:
- Customers couldn't move money into Pleo outside business hours
- Support had to explain why "instant payments" weren't actually instant
- We built workarounds and monitoring to catch failures
- We started searching for a second banking partner

Eventually, when other needs arose, we implemented another bank. We ran two banking relationships because we couldn't exit the first one fast enough.

## What We Changed

When we selected the second bank, we changed our approach entirely.

**We stopped talking to payments teams. We started talking to cash managers.**

The lesson wasn't about finding the perfect phrasing. It was about talking to the people who actually operate the systems, not the people who sell them.

The bank's payments team gave us answers they believed were true. But they didn't understand the operational details of how Faster Payments worked across different account types and time windows.

The people who know those details? Cash managers. Operations teams. The people who investigate failed payments every day.

We started asking to speak with operational experts, not just partnerships teams. We started testing exhaustively during implementation—mornings, evenings, weekends, bank holidays—before we were contractually locked in.

## The Questions That Would Have Helped

Not one magic question. A different approach:

**Instead of:** "Do you support Faster Payments?"

**Ask:**
- "Are you a direct participant in the Faster Payments Scheme?"
- "Do payment notifications and account updates work 24/7/365, including bank holidays?"
- "For virtual IBANs specifically, is there any difference in processing compared to standard accounts?"
- "What is the end-to-end latency from payment initiation to account balance update? Does this vary by time of day or day of week?"
- **"Can we test this in UAT during off-hours and bank holidays before signing contracts?"**

That last one is key. We should have required exhaustive testing across all time windows before finalizing contracts. The tests would have revealed what the bank's payments team didn't know.

## Why This Matters Beyond the UK

This isn't unique to Faster Payments or the UK.

I've seen this pattern with SEPA Instant in Germany, with virtual IBANs in France, with real-time payments in Sweden. Across Europe, the gap between what banks say they support and what actually works in production is larger than builders expect—especially if you're coming from the US market.

This is especially true when you're doing something slightly non-standard:
- Virtual IBANs instead of regular accounts
- High transaction volumes
- Real-time requirements
- Operating outside standard business hours

The sales answer is "yes, we support that." The operational reality is often more complex.

## What We'd Tell Our Past Selves

If we were selecting banking partners today:

**1. Talk to operations teams, not just partnerships teams**

The people who handle failed payments know where the edge cases are. The people who sell partnerships know what's in the marketing deck.

**2. Test exhaustively before signing contracts**

Weekday morning, weekday evening, Saturday, Sunday, bank holiday. Test every scenario that matters to your business. Make this a contractual requirement.

**3. Understand the difference between "we support X" and "X works 24/7/365 for your specific use case"**

Generic support and production-ready support for your exact scenario are different things.

**4. Build in exit clauses**

Assume you'll discover limitations during implementation. Negotiate terms that let you exit if critical functionality doesn't work as specified.

**5. Plan for multiple banking partners from day one**

Don't assume one bank will meet all your needs. We ended up with two banks anyway—we just paid the cost of running them in parallel for longer than necessary.

## The Broader Pattern

European payment infrastructure is fragmented. PSD2 created regulatory harmonization, but implementation varies wildly. What works in one country doesn't automatically work in another. What works for one account type doesn't automatically work for another.

The companies that succeed in Europe are the ones who:
- Accept that they'll need deep technical diligence, not just commercial conversations
- Test assumptions exhaustively before committing
- Talk to operational experts, not just business development teams
- Plan for complexity and variation, not harmonization

The companies that struggle are the ones who assume "we support X" means the same thing everywhere.

We learned this the expensive way. You don't have to.

## Before You Sign Your Next Banking Contract

Three questions:

**Are you talking to the people who operate the systems, or the people who sell them?** If you haven't spoken to cash managers or operations teams, you're getting sales answers.

**Have you tested at 9pm on a Saturday?** If your testing happened during business hours, you don't know if it actually works when your customers need it.

**What happens when you discover limitations after signing?** If you don't have exit clauses or contractual protection, you're betting the bank knows their own infrastructure better than ours did.

For more on building payment infrastructure that actually works at scale, see my post on [hard-won lessons from building payment systems](/posts/payment-systems-lessons/).

*Building payment infrastructure in Europe? [Let's discuss](/about/).*
