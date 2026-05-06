---
title: "Three Lanes: What to Build, Spec Built, Build"
date: 2026-05-27
draft: true
tags: ["ai-native-product-development", "ai", "product-development", "operating-model", "engineering-management"]
categories: ["Leadership"]
---

Most AI-native operating-model writing is abstract. Familiar phrases include "cross-functional pods of three to five," "humans plus agents in a seamless blend," and "speed to market." All true at some altitude, none of it operational. None of it tells a small team what to do on Monday morning.

This post is concrete. It's the operating model I keep coming back to when I work with small teams running AI-native development. Three lanes, with explicit owners, with artifacts crossing the boundaries instead of meetings. It works for a three-to-five-person team. It generalizes upward, with more lanes per layer, but the shape is the same.

## The Three Lanes

The three lanes are what to build, spec built, and build. Each has a different owner, and each lane is independent enough that a team can stand them up one at a time, in any order.

What to build is everything upstream of any specific feature. This lane captures inputs from customer signal, ideas across the company, competitor research, and gaps the team notices, and turns them into a structured view of what should be built next.

Spec built picks up an item from the first lane and turns it into a tangible plan: the user, the interaction, the success criteria, the constraints. Not the code. The point is to make what's being built concrete enough that someone can take it the rest of the way without having to re-derive intent.

Build is the third lane. It picks up the spec from the second lane and ships it. Implementation plan, agent execution, review, merge, deploy.

What ties the three together is what crosses the boundary: an artifact, not a meeting.

## Lane One: What to Build

The job of this lane is connecting the team to the signal it already generates and turning that signal into a structured view of what to build next.

There are three input streams worth setting up: ideas from anyone with a half-formed thought, conversations with customers across sales and support, and competitor research on what others in the space are shipping or not. Each stream feeds into the same place, captured as items linked to the source so the team can go back to the original later.

The structure should make two things obvious at a glance: what's being asked for most often, and who asked for it. The first tells the team what's worth building. The second tells the team who to come back to when the spec lands or when something ships.

AI does the unglamorous part of this lane. It takes raw notes, transcripts, and threads, and turns them into something readable and tagged, clusters similar requests so the team can see what's a real pattern, and runs a weekly summary that shows what's most-requested and where the gaps in coverage are. The team's job is to set up the pipes; the agent's job is to keep them flowing.

What the agent doesn't do is decide what to build. The agent triages, clusters, summarizes. The human picks. That distinction is important. Letting the agent pick is how you end up building what's loudest, not what matters.

## Lane Two: Spec Built

This lane picks up an idea from the first lane and turns it into a tangible plan: the interaction, the user flow, the design intent. Not the code. The point is to make what's being built concrete enough that whoever picks up the build can take it the rest of the way without having to re-derive intent.

Three things make this lane work.

A standard prompt or skill takes every spec through the same questions: who it's for, what the interaction looks like, what success feels like, what edge cases matter. Same questions every time means the output is comparable across specs, and the team gets faster at writing them.

Visual inspection matters more than people expect. The person owning this lane should be able to run the resulting design and see it — a clickable mock, a rendered flow, a generated screen. Catching bad design at the visual level is much cheaper than catching it after the implementation.

The spec needs to land as a project in the team's tracker, ready to be picked up. Not a Claude session. The tracker is the durable artifact; the conversation that produced the spec is the workshop, not the output.

The owner of this lane is whoever has the strongest combination of product sense and design taste on the team. On a small team, that might be a founder, a lead PM, a designer who can prototype, or a product engineer who's spent enough time with users to think in interactions. The label matters less than the skill mix.

## Lane Three: Build

This is where the project becomes shipped product.

The flow starts with a joint review of the spec. The engineer and the spec author read the project together, and the engineer pushes back on anything ambiguous before any agent touches code. This is the cheapest place to catch a fuzzy spec.

The engineer then kicks off the implementation directly from the project in the tracker, not from a separate Claude window. The tracker is the entry point.

An agent breaks the project into discrete issues sized to be picked up independently. The plan itself is reviewable, and the engineer signs off before any execution starts.

Separate agents in different worktrees and different sessions then work the issues in parallel. The engineer's role here is keeping them unblocked.

The engineer's real job, the one that determines whether this lane works at all, is no longer typing. It's keeping agents unblocked, reviewing PRs as they land, and continuously improving the environment so the next round runs smoother. The CLAUDE.md file, the team skills, the test coverage, the MCP setup. The engineer is no longer the typist; they're the conductor.

That last part is where most teams stumble. The engineer's instinct, especially the experienced engineer's instinct, is to reach for the keyboard and write the code. The teams that work well in this lane have engineers who've accepted that the work has changed. Their leverage isn't in the typing anymore; it's in the orchestration.

## What Crosses the Boundary

What crosses the boundary between the three lanes is the artifact. Not the meeting.

This is the part most teams get wrong. They set up the lanes correctly, then bridge them with synchronous coordination (a daily standup that includes everyone, a weekly handoff meeting, a slack channel where the lanes ping each other constantly). That kind of coordination collapses the lanes back into one big undifferentiated process. The whole point of the lane structure is that each lane runs at its own cadence with its own rhythm, and the artifact is what carries information forward.

The first handover, from "what to build" to "spec built," is a structured backlog. The author of the backlog and the author of the spec don't need to meet to do the handover; the backlog carries the intent.

Going from "spec built" to "build" is the second handover, and the artifact is a project in the tracker. It contains the spec, the agent instruction file, the success criteria, and any reference designs. The engineer picks it up and runs.

There's a third handover that teams often miss. When something ships, the loop has to close back to the input source: the customer ticket that started it, the competitor-research log entry that asked for it. Closing the loop is what keeps the first lane honest about what's worth building.

When the artifact is good, the lanes work without much coordination. When the artifact is thin, you have to add meetings, and meetings turn the operating model back into the old shape.

## Why Lanes Work Better Than Roles

The cleaner thing about lanes versus roles is that lanes don't depend on having three role buckets to fill.

A small team probably doesn't have a dedicated PM, a dedicated designer, a dedicated implementation lead, plus a quality engineer, plus a customer-research lead. The three-lane model can still work, because the lanes are about work, not about job titles. On a five-person team, one person might own "what to build" alongside their other work, another might own "spec built," and the build lane is probably split across two engineers, with one acting as conductor for any given project.

The lanes give the team a way to talk about who's responsible for what without forcing the team to pretend it has more headcount than it does. The role buckets are emergent. They map to the lanes loosely, with the same person sometimes covering more than one. The artifact discipline matters more than the headcount discipline.

This is the part of the model that scales upward. Larger teams can have multiple owners per lane, multiple instances of each lane running in parallel for different product areas, dedicated quality and customer-research roles inside the lanes. The shape stays the same; the lanes just get wider.

## Where This Breaks

The model has predictable failure modes, and most of them are mechanical rather than philosophical.

The biggest is tooling that resists the model: trackers that don't link to source code, design tools that can't render runnable prototypes, customer-feedback systems that don't flow into the tracker. Each of these creates friction at exactly the boundaries the model depends on, and the team ends up bridging the friction with synchronous coordination (meetings, slack threads, manual updates) that turns the lanes back into one undifferentiated process.

Most of this friction is addressable. Pick a tracker that handles project-level work and links to the repo. Use design tools that can produce clickable prototypes. Set up the customer-feedback flow into the tracker as one of the first things the team does, not the last. None of this is novel work; it's unglamorous setup that has to happen before the lanes can run.

The other common failure mode is engineers who can't or won't make the conductor shift. The lanes only work if the build lane is run by an engineer who's keeping agents unblocked and improving the environment, not by an engineer who's reaching for the keyboard. If the senior engineer on the team won't make that shift, the build lane backs up, and the spec lane gets blamed for it. Make sure the engineer is bought into the conductor role before standing the model up. Otherwise the model will look broken when the real problem is somewhere else.

## Setting It Up

For a team starting from scratch, the order that works is to set up one lane at a time, finishing each before moving to the next.

Start with what to build. Pick the call-recording or customer-feedback tool the team will use. Audit what's already captured and where the gaps are. Stand up a project or view in the tracker for customer signal, with structure that makes "what's most-requested" and "who asked for it" obvious at a glance. Run an AI pass weekly that summarizes and clusters. None of this is glamorous, and it's the foundation everything else sits on.

Move to spec built next. Write the standard spec prompt, the questions every spec must answer. Iterate the prompt across the first three specs the team writes. Get the local development environment to a minimum-viable bar so the spec author can run a generated design and see it before any production code is written. Define the project template a finished spec lands in. Run the loop end-to-end on one real backlog item before scaling.

Move to build last. Increase test coverage so tests can carry weight as a merge gate. Set up branch protection on main, with review required and no direct pushes. Build out the CLAUDE.md sections and team skills that move the team forward. Define the prompt the engineer runs to break a project into agent-sized issues. Document the conductor role in the team's playbook so the next engineer joining the team understands what the role is.

The whole sequence takes weeks for a small team that's focused on it, months for a team that's doing it alongside everything else. Either is fine. What doesn't work is trying to stand all three lanes up at once. The team doesn't have enough hours, and partially-set-up lanes are worse than no lanes at all.

## What Good Looks Like

The thing that separates teams that talk about AI-native development from teams that run it in practice is operating-model discipline.

Most teams have someone on them who can use Claude Code. That's not the differentiator. Most teams have a CLAUDE.md file in the repo. That's not the differentiator either. The differentiator is whether the team has a way of working that takes advantage of those tools: a structured way of figuring out what to build, a way of turning that into a tangible plan, a way of executing on the plan with agents in the loop and humans in the right places.

The three lanes are one shape that works. The shape isn't sacred. What's sacred is the principle: artifacts, not meetings, cross the lanes; each lane has an owner; the lanes are independent enough to be set up one at a time. A team that picks a different shape but holds those principles will probably do better than a team that copies the lanes exactly without holding them.

The reason most teams aren't running this way isn't that the model is hard to understand; it's that standing it up requires real changes to how the team works, and those changes are uncomfortable. The teams that get there are the ones whose leadership is willing to be uncomfortable for the few weeks it takes to set the lanes up, and then run them with discipline once they exist.
