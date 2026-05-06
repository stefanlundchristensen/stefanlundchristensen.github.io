---
title: "The PM-to-Engineer Ratio Was Always Artificial"
date: 2026-05-13
draft: true
tags: ["ai-native-product-development", "ai", "product-management", "organizational-design", "leadership"]
categories: ["Leadership"]
---

The 1:5 PM-to-engineer ratio wasn't a physics constant. It was a coordination tax, and AI just made that tax optional.

That isn't the version of the story most people are telling. The dominant frame is about productivity: engineers ship more, so each PM can support more engineers, so the ratio widens. 1:5 becomes 1:15. Maybe 1:50. That framing misses what's changing.

## Where the Ratio Came From

The 1:5 ratio came from a world where engineers were the bottleneck. You needed enough of them to keep the build moving, and PMs existed to keep the engineers aimed and unblocked at scale. The PM was a coordination layer: tickets, priorities, dependencies, status, decisions about what to build next. The work that wasn't typing code, but was needed for the typing of code to produce something coherent.

The ratio reflected that. One person doing the coordination work could keep five to ten typers aligned. Fewer engineers per PM meant the PM had time on their hands; more meant the engineers were under-supported and started doing coordination themselves, badly.

That math made sense as long as engineers were the constraint and coordination was the support function. Both halves of that picture are now in question.

## What Changed

AI didn't only make engineers faster at typing. It also did something less commented on: it absorbed a lot of the coordination work the PM existed to handle.

The agent reads the customer ticket and drafts the spec. It breaks the spec into discrete issues sized to be picked up independently, writes the first-pass implementation, updates the status, and flags what's blocked. The PM still owns the call, but a lot of the connective work that used to fill the PM's day is being done by tooling that didn't exist three years ago.

When you take coordination work out of the PM role, the ratio that the role's surface area implied no longer holds. The math changes.

## The Counter-Reading

There's a counter-narrative going around. A fast-growing team reportedly added PMs because its engineering throughput multiplied and the PM layer became the new bottleneck. The right reading is that this isn't a contradiction; it's an honest description of what happens at the team level when you push on one constraint and a different one shows up. If engineers ship three times more code, the PM work that scales with shipped code scales too: the customer alignment, the success metrics, the release management. A single PM's surface area can keep up only so far before something gives.

The shape of the lesson isn't "the ratio widens" or "the ratio narrows"; it's that the ratio is now context-dependent in a way it wasn't before. In some teams, fewer PMs per engineer makes sense. In others, more. The 1:5 number was always doing two jobs at once: it was a real constraint, and it was a default everyone could plan around. The constraint is gone, and the default isn't coming back.

## What Doesn't Scale

Productivity numbers are easy to talk about because they're countable. What doesn't scale is harder to put on a dashboard.

Taste doesn't scale. The judgment about whether a feature is the right feature, whether a tradeoff is the right tradeoff, whether a moment is the right moment — that judgment is a function of context and exposure that doesn't 10x because the model gets better. A PM with deep customer context calls things one way; a PM with shallow context calls them another way; no amount of agent assistance changes that.

Customer-research depth has a similar ceiling. You can run more interviews per quarter, but the quality of the listening, the ability to spot a real signal in a noisy session, the connections you make to prior conversations: those are still bound by how much of the customer's world a single person can hold in their head. Tooling helps a little. It doesn't multiply by ten.

Hard-call judgment is the third one. When a team has a real decision to make, the kind that affects the next year, no amount of LLM context throws extra judgment at it. You still need a person whose intuition is calibrated by having lived through similar calls before, and that person's bandwidth is a real number.

So when someone says "one PM can cover fifty engineers," a careful reading is: one PM can cover fifty engineers' worth of throughput, but not fifty engineers' worth of judgment surface. Those are different units, and conflating them is how teams over-stretch their PM coverage and find out three quarters later that the work shipped quickly but pointed in the wrong direction.

## The Cleaner Frame: Stop Separating Roles

The interesting move isn't fighting over the right new ratio; it's noticing that ratios assume separation of roles and asking whether the separation is still doing useful work.

The case for separating PM and engineer was always about specialization under coordination cost. The PM thought about what; the engineer thought about how; coordination between the two was expensive enough that you needed two distinct people, with different titles and different career paths, to make the system run.

When AI makes coordination cheap and lifts the abstraction one level, from tickets and tasks to projects and outcomes, that case gets weaker. The same person can hold both ends. Not in the sense that everyone becomes a generalist. In the sense that a small group with overlapping skills can own a product end to end without needing a coordination layer between two role buckets.

That doesn't mean PM disappears as a role. It means PM as a separate role on a small product team becomes harder to defend. The team has a person, or a small group of people, who own the product. They specify, they prototype, they ship. Some of them lean more toward customer judgment, some toward technical taste. The labels matter less than the ownership.

If you're a PM reading this, that isn't bad news; it's a different career, with the parts that are durably valuable (taste, customer understanding, hard-call judgment) intact, and the parts that were always coordination tax (writing tickets, chasing status) absorbed by tooling. Your job stops being the seam between specifying and implementing. It starts being one end of a product team that owns both.

## What This Means for Hiring and Levelling

Specialist career paths get harder when the seam between roles is closing.

The classic ladder for a PM is a deepening of one craft: bigger products, more strategic ambiguity, more senior stakeholders, but always within the PM lane. Same for an engineer: deeper systems, harder technical problems, more architectural ownership, within the engineering lane. The senior versions of both are just deeper versions of the junior ones.

That's a less viable shape now. The people I see succeeding in AI-native teams have craft plus an adjacent dimension. The senior PM has technical taste deep enough to push back on an implementation choice. The senior engineer has product judgment deep enough to push back on a brief that's pointing at the wrong outcome. Each one is excellent at one thing and competent at the other, and they know which is which.

The hiring implication is uncomfortable. The deep specialist with no adjacent skill, who used to be a clear hire because their craft spike was enough, is now a less obvious one. Not because their craft is suddenly worth less, but because the surface where pure-craft contributions matter is smaller than it was, and the surface where cross-craft contributions matter is larger.

The levelling implication is harder still. If you assess senior PMs only on PM-craft depth, and senior engineers only on engineering-craft depth, you'll miss the people who are creating the most leverage on AI-native teams. Those people are operating across the seam. Levelling needs to follow.

## Moving the Ratio Without Breaking the Team

The right question isn't "what's the new ratio?"; it's "what path gets the team from where it is to where it needs to be?" Headcount moves are usually the wrong starting point.

The mistake is moving the ratio first. You change PM headcount, the new shape exposes how much coordination work the old PMs were doing, and the engineering teams suddenly feel adrift. Three months later you're hiring back PMs, but with worse morale and more confused org design.

The order that works better is the reverse. First, extend the surface area each existing PM can cover by giving them the tooling and the agent stack to do the coordination work that used to fill their day. See what they can hold when the coordination tax is paid by the tools, not by their hours. The headcount you have starts to feel like more headcount.

Then, if the work allows, re-org around the new shape. Not the old shape with thinner staffing. The new shape, where the team has fewer role boundaries, where engineers are closer to customers, where the spec is co-owned rather than handed off. The ratio sorts itself when the role boundaries soften.

This is slower than the headcount move. It's also less likely to break the team. And it gets you somewhere the headcount move alone can't, because you're not just changing the math; you're changing the shape the math describes.

## What Good Looks Like

The leaders who navigate this aren't the ones who land on the right new ratio; they're the ones willing to stop fighting about the number and ask what the team should look like instead.

The 1:5 ratio earned its place. It described a real constraint, and it told you something useful about how to staff. That constraint is gone. Replacing it with another number, even the right one, is staying inside the same frame. The people pulling ahead have teams that don't have a ratio in the leadership-meeting sense at all. They have a small group that owns a product, with overlapping roles by design, organizing the work around the artifact that matters now rather than the ones built for a world where coding was the expensive step.

The artifacts will keep changing. The shape of the team should change with them, not just the headcount inside the old shape.
