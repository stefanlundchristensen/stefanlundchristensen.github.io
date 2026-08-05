---
title: "A Regulatory Deadline Is a Terrible Thing to Waste"
date: 2026-07-11
draft: true
tags: ["compliance", "cass-15", "safeguarding", "ai", "regulation", "fintech"]
categories: ["FinTech"]
description: "CASS 15 gave us a hard deadline to rebuild safeguarding. We used it to rebuild the tooling underneath it, with AI doing the work AI is good at."
---

Nobody celebrates when the regulator rewrites the rulebook. When the FCA moved safeguarding for payments and e-money firms into a new chapter of its client assets regime, CASS 15, the default reaction across the industry was the usual one: a compliance project, a gap analysis, a binder of new procedures, and a collective sigh.

I hold formal accountability to the UK regulator for our EMD licence, so this deadline had my name on it in a very literal way. But the longer we looked at the requirements, the more they read like a platform roadmap someone else had funded. The new regime demands daily reconciliation discipline, cleaner records, and faster evidence of where client funds sit. Those are properties of a well-built platform as much as they are compliance requirements, and we now had a mandate to build them.

## The trap of the minimum viable compliance project

The cheapest way to hit a regulatory deadline is to layer process on top of what you have: more checklists, more manual reviews, another spreadsheet reconciled by another analyst at month-end. It works, in the sense that you pass the audit. It also compounds. Every future requirement lands on a taller pile of manual process, and three years later you have a compliance function whose actual job is data entry.

We had lived a version of this before with [TODO: earlier compliance programme, e.g. PSD2], and we'd learned the expensive way that manual process scales linearly with volume while platforms scale with almost none. So we made a different call: treat CASS 15 as the forcing function to rebuild safeguarding tooling properly, and use AI where it earns its place.

## Where AI earned its place, and where it didn't

The phrase "AI in compliance" makes regulators nervous, and it should. Accountability cannot be delegated to a model, and a safeguarding calculation that nobody can explain is worse than a slow one. So we drew the line early: AI does preparation, humans make decisions, and every number that matters is computed deterministically.

In practice that meant three kinds of work went to models. Document extraction: pulling terms out of bank agreements and mapping them against safeguarding requirements, work that used to consume days of a lawyer's time per document. Reconciliation triage: when the daily reconciliation throws breaks, a model does the first-pass classification of what kind of break it likely is and assembles the evidence a human needs to resolve it. And drafting: the first version of the audit narrative, assembled from the actual records, then reviewed and owned by a person whose name goes on it.

None of this is the glamorous end of AI. There's no agent autonomously moving client money, and there never will be if I have anything to say about it. But the triage alone changed the shape of the team's day: analysts stopped hunting for evidence and started spending their time on the judgment calls the regulation actually requires of them.

## What the deadline bought us

The reconciliation rebuild had been on the backlog for [TODO: how long], losing prioritisation fights to revenue work quarter after quarter. It was the right call every single quarter and the wrong call cumulatively. The regulatory deadline ended the argument. Suddenly the work had a date, an executive owner, and a cost of failure that finance could price.

That's the lesson I'd pass on to anyone staring down their own version of CASS 15. The deadline is leverage inside your own company, for every piece of foundational work that never quite wins on its own merits, and not only with the regulator. Spend it on process and you'll be back here in two years, with a taller pile. Spend it on the platform and the next rulebook change gets cheaper instead of more expensive.

We passed [TODO: audit/implementation milestone] with the new tooling in place. What I'm proudest of is that the daily reconciliation now runs in a way the team trusts, and that when the next regime lands, and it will, we'll be reading it for opportunities.
