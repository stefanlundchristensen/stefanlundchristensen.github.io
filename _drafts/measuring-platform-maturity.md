---
layout: post
title: "Measuring Platform Maturity Without OKR Percentage Games"
date: 2026-02-03
categories: metrics, platform-engineering, team-performance
status: draft
---

# Measuring Platform Maturity Without OKR Percentage Games

The question seemed simple at first: How do you measure whether a platform organization is maturing and improving?

The obvious answer was OKRs. Set objectives, measure key results, track progress. Agile, data-driven, modern.

But about halfway through the first quarter, we realized the metrics were creating exactly the wrong incentives.

## The OKR Percentage Problem

When you track "percentage of OKR completed," you get a specific set of behaviors:

**Optimism incentive**: If you're 40% through the quarter and only 20% done with an OKR, there's pressure to claim you're on track. You've got six weeks. You'll figure it out. The reporting mechanism becomes a forecast, and forecasts get padded.

**Granularity gaming**: One way to show progress is to break things into smaller pieces. Instead of "ship payment infrastructure," you ship "authentication component" and "ledger component" separately. On the OKR dashboard, this looks like progress. In reality, you're just subdividing work more finely.

**Sandbagging and heroics**: If you're 100% done with an OKR with two weeks left, there's no incentive to improve the thing. You're done. But if you're struggling to hit a deadline, you can pull an all-nighter and heroically finish. The metric rewards crisis behavior.

**Risk aversion**: If you're 50% toward an ambitious goal and there's significant uncertainty about the remaining 50%, what do you do? Many teams reduce scope to guarantee completion. The metric rewards conservative estimates.

**Divorce from impact**: You can hit 100% of your OKR and still fail to improve the thing you were trying to improve. The metric is about completion, not about outcomes.

## What We Changed

Instead of tracking "percentage complete," we shifted to tracking **confidence levels**.

The question changed from: "How much of this OKR have you completed?" to "How confident are you that you'll complete this by the end of the quarter?"

The confidence question creates different incentives:

**Honesty**: If you're not confident, you say so. You're not being evaluated on whether you succeeded yet. You're being evaluated on whether your assessment is realistic.

**Early problem-solving**: If you're currently 60% done and you're only 40% confident about the remaining 40%, that signals a problem. Now the conversation shifts to: What's the dependency? What's the technical complexity? What do you need to become more confident?

**Scope visibility**: Confidence goes down when scope is unclear, dependencies are hidden, or risks are unmitigated. The metric makes these problems visible.

**Sustainable pace**: You can't just throw more hours at a problem to game a confidence metric the way you can with a completion percentage. Confidence reflects actual risk, not effort.

**Realistic planning**: Teams learn to make better estimates because they're accountable for assessing confidence, not just completing work.

## Building the Maturity Framework

Beyond OKRs, we needed a way to assess platform maturity more broadly. This became a scorecard that articulated what we cared about as a platform organization.

The scorecard had several dimensions:

**Practical Health & Support**
Foundational elements. Do we have enough people managers? Is there sufficient mentorship and care? Are teams stable, or are we burning people out?

**Motivated Individuals in High-Performing Teams**
Engagement and capability. Are people motivated? Are they learning? Are teams collaborating well, or are silos forming?

**Leadership as a Team Sport**
How we operate as a leadership group. Is decision-making distributed or bottlenecked? Do we actually support each other, or are we in competition?

**High Expectations with Support**
The balance between rigor and help. We set high bars. But we're there to help teams meet them. This isn't "strict," it's "rigorous and supportive."

## How the Scorecard Works

Rather than percentage completion or numeric scores, the scorecard used a **progress indicator** for each dimension, assessed quarterly.

For each dimension, we asked: Are we improving? Are we stable? Are we regressing?

Specific questions:
- **Practical Health**: Do we have coverage of people managers? Are they spending time on mentorship? Is turnover acceptable? Are there obvious signs of burnout?
- **Motivated Teams**: Are engineers excited about their work? Are teams shipping things? Are there blocked or frustrated sub-teams?
- **Leadership Team**: Are decisions made quickly? Is credit shared? Are conflicts resolved constructively?
- **High Expectations**: Are we pushing for improvement? Are teams supported when they struggle?

Each quarter, each dimension would be assessed as:
- Improving (green)
- Stable (yellow)
- Regressing (red)

## Why This Works Better

**It removes gaming**: You can't game "are we improving?" You can game "did we hit the number?" The moment you shift from numeric targets to qualitative assessment, the incentive structure changes.

**It surfaced structural issues**: When "leadership as team sport" was regressing, that didn't mean someone was lazy. It meant we had structural problems—unclear decision rights, bottlenecks, lack of trust. The metric made the problem visible so we could address it.

**It acknowledged uncertainty**: Some things are hard to measure. Instead of creating false precision ("we're 73% confident"), the framework acknowledged that judgment and qualitative assessment are legitimate tools.

**It tracked leading indicators**: "Are we improving?" is a leading indicator. "Did we complete?" is a lagging indicator. Leading indicators let you course-correct mid-quarter.

**It forced conversation**: OKR percentage completion can be assessed by a dashboard. The maturity scorecard required conversation. What does "improving" look like? Are we being honest about regression? This forced alignment.

## Common Misconceptions

**"This is less rigorous than numbers"**
Actually, it's more rigorous. Numbers give false precision. "We're 67% done" feels more rigorous than "we're on track but facing risks," but the former is often less honest. The latter requires you to actually think about what's happening.

**"You need both"**
Some organizations try to do confidence-based OKRs *and* have numeric scorecards. This usually doesn't work. The confidence-based approach requires a fundamentally different mindset. Adding numeric targets on top reintroduces the gaming.

**"This is soft leadership"**
The opposite. This framework was used to have hard conversations. If a dimension is regressing, that's a signal to investigate and act. The conversation is tougher than "we didn't hit the target," because it requires understanding why and committing to change.

## What Didn't Work

**Not reviewing the framework itself**
We set up the scorecard and treated it as fixed. After two quarters, some dimensions weren't useful anymore. The framework itself needs to iterate.

**Letting it become a compliance exercise**
If leadership just rubber-stamps the assessments quarterly without actually discussing them, it becomes theater. The value is in the conversation, not the categorization.

**Not acting on regression signals**
If something shows red consistently and no one addresses it, the entire framework becomes meaningless. Signal requires response.

## Conclusion

The shift from OKR percentage completion to confidence-based OKRs and maturity scorecards fundamentally changed how the platform organization operated.

It wasn't about rejecting metrics or data. It was about using metrics and data to drive the right conversations and behaviors, rather than creating perverse incentives.

The key insight: **The structure of how you measure shapes the behavior of the people being measured.**

OKR percentages incentivize completion over impact, estimates over honesty, and individual heroics over systemic improvement.

Confidence-based approaches and maturity frameworks incentivize realistic assessment, early problem-solving, and sustainable pace.

If you're running a platform organization and you're frustrated with how OKRs are playing out—teams sandbagging, metrics divorcing from reality, people stressed about hitting targets—consider: What if you measured something different?

Not something softer. Something more honest.
