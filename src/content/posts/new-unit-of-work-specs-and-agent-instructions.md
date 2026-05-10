---
title: "The New Unit of Work: Project Specs and Agent Instruction Files"
date: 2026-05-20
draft: true
tags: ["ai-native-product-development", "ai", "product-development", "engineering-management", "spec-driven-development"]
categories: ["Leadership"]
description: "Tickets were the right unit when a day was the right scope. AI changes the scope, and the unit moves up to project specs and agent instruction files."
---

The ticket was the right unit when a day was about as much as one engineer could carry before needing to coordinate with someone else. The unit hasn't been right for a while now, and it's about to stop being the unit at all.

What replaces it isn't a smaller version of itself; it's a larger artifact, with a different genre and a different set of authors.

## Why the Ticket Was the Unit

Tickets exist because coordination is expensive. When two people need to align on a piece of work, you need a contract between them — what's being done, who's doing it, when it's expected, what done looks like. The ticket is that contract.

A day's worth of work is roughly the right size for that contract because a day is about as much as a person can hold before needing to coordinate again. Smaller units mean too much overhead per unit; larger units mean coordination breaks down because too much state has to be passed forward.

That logic produced everything we recognize as the modern ticket. The acceptance criteria. The estimation. The labels. The dependencies. The board. All of it is infrastructure for the contract.

When the contract is between two people, that infrastructure earns its keep. When the contract is between a person and themselves plus their tools, most of it is overhead.

## The New Unit: The Project Spec

The unit that matches AI-native development is roughly a project spec. Not a ticket. Not a sprint backlog. A specification of what one engineer with strong AI tooling can take from problem statement to shipped change as a coherent piece of work.

What goes in it is different from what goes in a ticket. A ticket says what to do. A spec says what outcome you want and what's in scope to get there. It captures intent, constraints, and the criteria for "done" in language specific enough to be useful and abstract enough to leave room for the implementation to be discovered.

This unit is bigger than a ticket but smaller than what most teams call an epic. An epic is a planning artifact, a way of grouping months of work for portfolio purposes. A project spec is closer to executable: a person and an agent can pick it up, prototype against it, decide on an approach, and ship.

There's a useful frame coming out of the AI labs around replacing roadmaps with "side quests": afternoon prototype experiments that let model capability shape what's worth building. The unit that side quests are sized to is closer to the project spec than to the ticket. The team that operates this way is one level of abstraction up from where most teams still are.

## A Spec vs a Ticket

The contrast is clearer in the concrete than the abstract.

A ticket might read: "Add validation to the email field on signup. Reject malformed addresses. Show inline error." Three sentences. It tells the engineer what to type. The author of that ticket has already made every decision that matters; the engineer is implementing.

A project spec for the same area of work might read: "Reduce signup friction for mobile users. Prototype three approaches to input validation, including patterns that catch format errors at submit and patterns that catch them at field exit. Evaluate each on completion rate and on user recovery from a first error. Pick the one that wins on both. Aim to ship in the same sprint." Different genre. The decisions aren't made yet. The brief sets up the decisions.

The spec isn't a longer ticket; it's a different artifact. The ticket is a transcription of an already-made decision; the spec is a frame for a decision the team is about to make. When the implementation is cheap, the framing of the decision is where the leverage is.

## Agent Instruction Files

The project spec isn't the only new artifact. There's a second one that almost no team has formally adopted yet, and it sits between the spec and the running agent: the agent instruction file.

Specs describe outcomes. Tickets describe tasks. Neither of those is quite what an agent needs to operate well on a given piece of work. What an agent needs is something more like a working manual: what it should do, what constraints apply, what conventions to follow, what "done" looks like, what tests have to pass, what the existing code expects in this part of the system.

If you've used Claude Code or a similar agent stack with a CLAUDE.md file in the repo, you've already met an early form of this artifact. CLAUDE.md is a primitive. The mature version is per-project, written for a specific scope of work, and treated as a first-class artifact alongside the spec.

Two things matter about this file. It's executable: the agent reads it and behaves differently because of what's in it. That isn't true of most documentation. And it's durable: the chat session is ephemeral, but the instruction file survives, gets versioned, and improves over time. The agent gets better not only because the model gets better but because the instruction file accumulates knowledge of the team's standards, the system's quirks, and the patterns the team wants enforced.

Who owns this file is one of the more interesting org-design questions of the next year. It isn't a pure spec, the way a PM might own a spec, and it isn't a pure system prompt, the way an engineer might own a prompt. It lives in the seam between them, and the team that figures out how to co-own it well will get more leverage out of their agent stack than the teams who treat it as one or the other.

## Where These Artifacts Live

The artifacts have to live somewhere durable, or they'll get lost.

The most common mistake is treating the chat session as the artifact. The conversation in Claude or Cursor where the work happened is not the artifact. It's the workshop. The artifact is what survives the conversation: the project spec in the issue tracker, the agent instruction file in the repo, the design note that captures the decision someone might revisit in six months.

If you can't point to where the spec lives outside the chat, you don't have a spec. You have a transcript. The transcript decays with the next conversation, and you've lost the durable thing the team needed.

Linear, Jira, GitHub Projects, Notion, the repo itself — different teams will pick different homes. The home matters less than the discipline that the home is the source of truth and the chat is the workshop. Specs go into the home before they're acted on. Updates get reflected in the home as the work changes. New team members read the home, not the chat history.

This sounds obvious. It isn't, in practice, where most teams are. The instinct to treat the chat as the artifact is strong because the chat feels like the place where the work is happening. The work is happening there. The artifact has to live somewhere else.

## Who Owns These Artifacts

The other live question is ownership.

A ticket has clear ownership. A PM writes it. An engineer picks it up. The boundary between roles is also the boundary between authoring and executing.

A project spec is harder. The brief, the outcome, the success criteria are PM-flavored work. The technical scope, the constraints, the implementation considerations are engineering-flavored. A spec that has only one of those is incomplete. A spec that's drafted by either a pure PM or a pure engineer alone tends to be missing something the other side would have caught.

The agent instruction file is harder still. It encodes the team's standards, the system's quirks, the patterns the agent should follow, the failure modes to avoid. That's deeply engineering work. It also encodes what "done" means in business terms, what the user is trying to do, what kinds of behavior are out of scope. That's PM work. There isn't a clean side to give it to.

What's working in practice is co-ownership: the spec and the instruction file are written and reviewed by both a PM and an engineer, with the version of each role that has crossover skills doing most of the drafting. The artifact lives in the seam between roles, and the seam is where you want experienced people who can speak both languages.

When the artifact ends up owned by only one side, the other side stops engaging with it, and that's the failure mode. The instruction file becomes a system prompt that the engineer maintains and the PM never reads, or the spec becomes a brief the PM writes and the engineer ignores. Both are common. Both produce worse outputs than the co-owned version.

## Spec-Driven Development as a Term

There's a movement in the developer-tooling world calling this spec-driven development. The framing has merit, and several useful tools exist to support it: pattern templates for what a good spec contains, repository conventions that link specs to code, validation tools that check whether the implementation has drifted from the spec.

The reason the term is worth knowing is that it puts a name on a real shift. The reason to be careful with it is that, like every adopted term, it can collapse into a tool category, where you pick the right spec-driven dev tool and that's the answer, when the real work is harder and more organizational.

The questions this post has been working through aren't about which tool to pick; they're about who writes the spec, who reviews it, where it lives, what its relationship is to the agent instruction file, and what reviews look like when the spec is the leverage point. Tooling supports those answers. It doesn't supply them.

A team that picks the best spec tool and doesn't change anything else about how it operates will not be doing spec-driven development in the sense that matters. It'll be doing the old development with a new label.

## What Reviews Look Like Now

When the spec is the leverage point, the review of the spec becomes more important than the review of the code.

This is hard for teams that have spent years building review culture around pull requests. The PR is where engineers earn their reputation, where senior engineers shape the team's standards, where bugs get caught and architecture gets debated. Telling that culture that spec review now matters more is uncomfortable, because the spec hasn't traditionally been where engineers spent their reputation-earning effort.

The shift has to be deliberate. Specs need to be reviewed with the same seriousness PRs used to get. In practice, that means a senior engineer reads the spec before any code is written and pushes back on ambiguities, missing constraints, or scopes that will produce bad implementation regardless of the agent. A senior PM reads it for the same things from the user-and-outcome side. The whole review happens before the team commits any of its agent-time to the work.

PR review still happens, but it changes character. It's checking that the implementation matches the spec, not that the implementation is sensibly designed in the abstract. Sensible design is now the spec's job. The PR review is closer to a regression check.

DX's [Q4 2025 impact report](https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/) found this dichotomy directly in the data. Some organizations see code quality improve as AI usage rises; others see real degradation. The split tracks engineering hygiene and the AI practices that were in place before adoption. Teams that already had strong tests, conventions, and review discipline got better outcomes from AI; teams that didn't got worse ones. The implication for spec review is the same shape as the implication for tests and conventions. Quality moved earlier in the process; the teams investing earlier are the teams getting paid for it.

The teams that don't make this shift end up with a worst-of-both-worlds setup: agents writing more code than the team can carefully PR-review, and specs that haven't been reviewed because the team's review muscle is still aimed at the PR. That setup ships fast and ships fragile.

## The Shift Starts With One Project

The teams that get this right don't write fewer artifacts. They write different artifacts.

They write fewer tickets and better specs. They co-own agent instruction files. They keep those artifacts in a durable place that survives a chat session, and they review the spec with the seriousness they used to reserve for the code.

That's a different way of working than most teams have, and it can't be adopted in one big move. The instinct to keep doing what you've been doing, writing tickets and reviewing PRs, is strong because that's where the team's muscle memory lives.

The shift starts with one project. Pick something the team is about to build. Write a project spec for it, not a ticket queue. Co-own the agent instruction file with whoever is going to do the work. Review the spec the way you used to review the code. Watch what happens to the work that ships out the other end.
