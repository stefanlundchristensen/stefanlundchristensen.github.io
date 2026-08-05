---
title: "Solve Business Problems with Technology, Not Technical Problems Near the Business"
date: 2026-07-11
draft: true
tags: ["leadership", "platform", "finance", "roadmaps", "unit-economics", "strategy"]
categories: ["Leadership", "FinTech"]
description: "The best compliment I've received from a finance partner reshaped how I build platform roadmaps: start from the P&L line, not the architecture diagram."
---

A finance partner I worked with for years put words to something I'd been doing half-consciously: solving business problems with technology, rather than solving technical problems that happen to be near the business. The distinction sounds like wordplay until you look at two platform roadmaps side by side and realise they're built from opposite directions.

The first roadmap starts from the architecture. It has migration projects, upgrade projects, refactoring projects, each justified by engineering pain: this system is old, this dependency is risky, this service is hard to change. All true, all worthy, and all invisible to the people deciding whether the platform deserves its headcount. When the budget conversation comes, this roadmap defends itself with adjectives.

The second roadmap starts from the P&L. Somewhere in the company's financials there is a margin line that a piece of infrastructure quietly determines, a cost line that scales with volume when it shouldn't, a revenue line capped by something technical that nobody in the revenue organisation can name. This roadmap is a list of those lines, each attached to the technical work that moves it. When the budget conversation comes, it defends itself with arithmetic.

## The same work, facing a different direction

This is more than framing, and my first project as an operator is the cleanest example I have. We migrated 20,000 customers to a new payment processor. Described technically, it was a migration: risky, unglamorous, a year of careful work that customers should never notice. Described from the P&L, it was 20 points of margin, permanently, on every transaction that followed. Same project. One description gets deferred every quarter in favour of features; the other one gets asked "can you go faster?"

The card scheme renegotiation that came years later ran the same pattern at larger scale. The technical work underneath it, rebuilding our cost analytics until we understood every fee code, would never have survived prioritisation as "improve billing observability." As "the path to taking 70% out of scheme costs," it had executive sponsorship before the first line of analysis was written.

I've come to believe most platform organisations have this inventory of latent business wins sitting unexamined, because the people who can read the P&L and the people who can read the architecture are different people who meet twice a year at budget time.

## What this asks of a platform leader

The uncomfortable implication is that a platform leader has to be bilingual, and most of us were trained in only one language. Fluency in infrastructure comes with the territory. Fluency in budget implications, stakeholder alignment, unit economics, and the trade-off conversations finance actually cares about has to be acquired on purpose.

The practical version of acquiring it, in my experience: treat your finance partner as a design partner, not a control function. Invite them into prioritisation before the roadmap is set, when their questions about ROI and trade-offs can still change the answer. Ask them which cost lines worry them and which margin assumptions feel fragile. The first time I did this properly, the conversation produced [TODO: concrete example], a roadmap item no engineer would have generated and no finance person could have specified, and it turned out to matter more than half of what we'd planned.

Engineers raise a quiet objection to all this, which is that it reduces engineering to servicing the spreadsheet. My experience has been the opposite. The platform work framed in business terms is the work that gets funded, staffed, and then left alone to be done properly. The refactor you could never justify on its own merits ships inside the margin project. Speaking the language of the P&L turns out to be how you buy the freedom to do engineering well.

I spent five years at McKinsey learning to read businesses and the years since learning to build the systems underneath them, and for a long time I treated those as two separate educations. The most useful thing I've done as a leader is refuse to keep them separate.
