---
title: "Why 'Do You Support Faster Payments?' Is the Wrong Question"
date: 2026-01-28
draft: true
tags: ["payments", "europe", "infrastructure", "fintech", "banking"]
categories: ["FinTech", "Payments"]
description: "We asked the bank if they supported Faster Payments. They said yes. Then we tested it at 9pm on a Saturday."
---

We did everything right.

We ran a proper RFP when selecting a UK bank for Faster Payments. We asked if they supported Faster Payments. We validated their answers in writing. We got confirmation from their partnerships team.

They said yes. We signed contracts. We completed months of compliance reviews.

Then, during implementation, we started testing across different hours of the day.

Faster Payments worked perfectly at 2pm on a Tuesday.

At 9pm? Customer tries to move money into their account. Nothing happens.

Saturday? Nothing.

Bank holiday? Nothing.

What should have been 24/7/365 instant payments worked weekdays during business hours, and nothing outside them.

## The Bank Didn't Know Either

When we raised this with the bank, they apologized. They didn't fully understand their own limitations.

The bank's payments team, the people we asked during diligence, didn't know their Faster Payments implementation had time restrictions. If the bank doesn't know, what chance do you have of asking the right question?

## We Were Locked In

By the time we discovered this, we'd spent months on compliance, legal review, and integration. We had binding contracts. We couldn't just walk away.

So we operated with a broken setup for six to nine months. During that time, customers couldn't fund their accounts outside business hours. Support was fielding calls explaining why instant payments weren't actually instant. We built workarounds and monitoring to catch failures, while simultaneously searching for a second banking partner.

Eventually, when other needs arose, we implemented another bank. We ran two banking relationships because we couldn't exit the first one fast enough.

## What We Changed

When we selected the second bank, we changed our approach entirely.

We stopped talking to payments teams. We started talking to cash managers.

The lesson wasn't about finding the perfect phrasing. It was about talking to the people who actually operate the systems, not the people who sell them.

The bank's payments team gave us answers they believed were true. But they didn't understand the operational details of how Faster Payments worked across different account types and time windows. The people who know those details are cash managers, operations teams, the people who investigate failed payments every day.

We started asking to speak with operational experts, not just partnerships teams. We started testing exhaustively during implementation: mornings, evenings, weekends, bank holidays, before any contracts were signed.

## The Questions That Would Have Helped

There was no single magic question. The problem was the level of abstraction.

Instead of "Do you support Faster Payments?", the useful questions ask about the specific mechanism: Are you a direct Scheme participant? Do payment notifications and account updates work 24/7/365, including bank holidays? For virtual IBANs specifically, is there any difference in processing compared to standard accounts? What is the end-to-end latency from payment initiation to account balance update, and does this vary by time of day or day of week?

The most important question of all: can we test this in UAT during off-hours and bank holidays before signing contracts? That requirement alone would have revealed what the bank's payments team didn't know. The tests would have told us what the conversations couldn't.

## Why This Matters Beyond the UK

The same gap shows up with SEPA Instant, with virtual IBANs across different European markets, with real-time payment rails that behave differently on weekends. Across Europe, the distance between what banks say they support and what works in production is larger than builders expect — especially coming from the US market, where banking infrastructure tends to be more standardized.

The pattern is consistent: generic support and production-ready support for your exact scenario are different things. It's especially pronounced when you're doing something slightly non-standard: virtual IBANs, high transaction volumes, real-time requirements, operating outside standard business hours. The sales answer is "yes, we support that." The operational reality requires a different conversation.

## What We'd Tell Our Past Selves

The most important shift was in who we talked to. Operations teams, the people who investigate failed payments every day, know where the edge cases live. Partnerships teams know what's in the marketing deck. Those aren't the same conversation, and learning to ask for the former changed everything downstream.

We'd also treat testing as a contract requirement, not an afterthought — exhaustive testing across hours and days, mornings, evenings, weekends, bank holidays, before commitments are made. And we'd negotiate exit clauses at the start, when you have leverage. We couldn't exit our first banking relationship quickly enough to avoid the cost of running two in parallel. Assume you'll eventually need a second partner anyway (we did) and plan for it rather than discovering it under pressure.

## The Broader Pattern

European payment infrastructure is fragmented. Regulatory harmonization created a framework, but implementation varies significantly by country, account type, and payment rail. What works in one market doesn't automatically work in another.

The companies that navigate this well accept the diligence cost upfront. They treat operational testing as a contract requirement, not a nice-to-have. They build relationships with the people who run the systems, not just the people who sell them.

The companies that struggle assume "we support X" means the same thing everywhere.

We learned this the expensive way, and the lesson has held in every market we've entered since.
