---
title: "Designing for Agents as Users"
date: 2026-06-03
draft: true
tags: ["ai-native-product-development", "ai", "product-design", "api-design", "agent-experience"]
categories: ["Leadership"]
description: "Agents consume products differently than humans. Most teams don't have anyone whose job it is to think about that."
---

There's a new user type in your system, and you probably aren't designing for them.

Most product teams still have one user persona that matters: the human who clicks, types, and reads. The artifacts of design (wireframes, copy decks, accessibility audits, usability tests) are all built around that persona. But over the last two years, a second user has been quietly arriving. Software is increasingly consumed not just by people but by LLMs and agentic systems acting on people's behalf, and the way those agents consume your product is meaningfully different from the way humans do.

Almost no team has someone whose job it is to think about that.

## The New Persona

Agents and LLMs consume products, APIs, and documentation differently than humans. The differences matter, and they're not just performance considerations.

The differences add up. There's bandwidth: a human reads at maybe 250 words per minute and gets fatigued after a few thousand, while an agent processes documentation in tokens, can hold tens of thousands at once, and pays for every token in inference cost and context-window slots. Documentation that's leisurely for a human is wasteful for an agent.

Context works differently too. A human comes in with months of accumulated knowledge about your product, your domain, and the workflow they're trying to complete. An agent comes in with whatever you put in its context window in this session, and nothing else. Your product has to be self-explanatory to a degree it never had to be for human users.

Failure modes diverge in ways that matter most. A human gets stuck and asks for help. An agent gets stuck and either gives up silently or hallucinates a plausible-looking answer. Errors that a human would shrug off and recover from become hard failures for an agent because the recovery path isn't obvious from your interface.

These differences add up to a real persona. Treating agents as just another consumer of your existing human-oriented product is a category error. They're a different user, with different needs, who deserves a design conversation of their own.

## What Already Exists

The technical layer of this is being figured out. There's a small set of patterns the developer-tooling world has converged on, and they're worth knowing.

Markdown is the preferred format for agent-readable documentation. It compresses to roughly a tenth of the tokens that the equivalent HTML uses, which translates directly into more documentation that fits in a context window.

The llms.txt convention serves as an index for AI tools, a kind of robots.txt for documentation. An agent looking for canonical docs reads the llms.txt and can fetch the right pages without scraping the whole site.

OpenAPI specifications are increasingly the canonical contract from which both human and agent-facing documentation get generated. Single source of truth, with the agent-friendly markdown view and the human-friendly browseable view both falling out of the same definition.

There's a discipline emerging called context engineering, focused on what to put in a context window: retrieval quality, summarization, deduplication, clear information hierarchy. The constraint isn't context-window size in modern models; it's context quality. The teams that invest in this close the gap between what the model can theoretically handle and what it can reliably do in production.

This is good work, and the developer-tooling world is making real progress. But the technical layer is the easy part. The harder shift is organizational.

## The Bigger Shift Is Organizational

When humans were the only users, design owned UX. There was a discipline, a set of practitioners, a place in the org chart, a process. The CEO knew who to talk to about the design of the product. The customer knew whose hand was behind the interface they were using.

When agents are also users, the question of who owns "agent UX" has no answer in most organizations. Engineering does some of it (better APIs, better documentation), product does some of it (feature decisions that incidentally affect agent consumption), and design rarely touches it because design tools and design conventions are oriented around human consumers. The result is that nobody is accountable for the experience an agent has of your product.

That's the gap. Not "we don't know how to write llms.txt" — the gap is structural. There's a real user category your organization doesn't have an owner for, and the user category is growing fast.

The teams that close this gap will look different from the teams that don't. Someone on the team will have clear ownership of agent experience: probably a senior engineer with product taste, or a product person with deep technical sense. They'll think about agent personas the way a designer thinks about user personas, measure agent success the way a product manager measures human success, and advocate for agent-readability the way an accessibility specialist advocates for screen-reader compatibility.

That's a new role, or a new dimension of an existing role. Either way, it's a structural change. Most teams haven't made it.

## What Good Agent UX Looks Like

The principles aren't complicated. They're rarely applied because most teams aren't thinking about agent users at all.

Predictability matters more than cleverness. An agent encountering your API for the first time will follow patterns. If the patterns are consistent, the agent works. If different endpoints behave differently in subtle ways, the agent stumbles, and the human supervising the agent has to intervene. Boring, regular APIs are agent-friendly APIs.

The same applies to documentation: parseability beats presentation. An agent reading your docs isn't appreciating the careful typography or the friendly tone. It's parsing. Documentation with clear hierarchy, machine-readable structure, and code blocks that work as code is documentation an agent can use. Beautiful documentation visually structured in ways that don't translate to text is documentation an agent has to fight.

Scope tightness shows up in tools and APIs. An agent given a tool that does too many things, with too many flags and modes, struggles to choose the right one for a given situation. Tools with focused scope and clear naming are easier for agents to compose into the workflows they're running. The product equivalent: features that do one thing predictably are agent-friendly; features with mode-dependent behavior are not.

Recoverable errors are the last principle worth naming. When an agent hits an error, it has to be able to recover or it gets stuck. Error messages that tell the agent what went wrong and what to try next are usable. Error messages designed only to be readable by a developer staring at a stack trace are not.

## What This Means for Roadmaps

If agents are users, they belong on the roadmap.

The product team that takes this seriously starts treating agents as a real persona. They prioritize features that improve the agent experience the way they would for any other meaningful user segment, and measure how well agents are succeeding with the same seriousness they apply to human metrics. Agent workflows get supported alongside human workflows.

This is uncomfortable for product teams that have spent years saying "our user is X" as a way of focusing the work. Adding "and agents acting on behalf of X" to that statement changes what gets prioritized. Some features that didn't make sense for human users alone start making sense once you add the agent population. Some features that made sense for human users alone start mattering less because agents bypass them.

The hardest version of this is when human and agent users want different things. The clean answer is to make explicit choices: you're prioritizing one or the other, or you're serving both with stated tradeoffs. The unclean answer, which is what most teams currently do, is to default to humans without examining whether that default still makes sense for the workload the product is serving.

## The Structural Advantage

The companies that design well for agents become platforms that other agents build on. If your API and documentation are structured to be reliably consumed by agents, then any team building an agent that needs your kind of capability picks you. You become the dependency, the way every web platform built value on top of the early HTTP and HTML conventions that made the web composable.

This compounds. Each agent that successfully uses your product reduces friction for the next. The companies that don't design for agents leave that advantage on the table — their competitive position softens slowly, in ways that are hard to detect from quarterly metrics alone. Most current adopters underrate this because the conversation tends to be about productivity gains in your own development process, which is real but smaller. The bigger lever is being the kind of product that other people's agents prefer to use.

## A Concrete Test

If you want to know whether your product is designed for agents, run a simple test.

Pick one workflow that humans currently do through your product. Sign up for an account, place an order, configure a setting, integrate with a webhook, anything that has a clear before-and-after. Now try doing it as an agent. Use Claude Code or a similar tool, point it at your documentation, and ask it to complete the workflow against your live system or a sandbox.

The friction you watch the agent run into is your roadmap. Documentation it can't parse, API endpoints with non-obvious behavior, error messages it can't recover from, authentication flows that assume browser interaction, anything that requires an agent to ask its human supervisor for help. Each one is a missing piece of agent UX.

This is a useful exercise even if you don't yet have a strategy for agents as users. It shows what would have to change before agents could succeed with your product. The list is usually shorter than people expect, and most of it is the same kind of cleanup that improves the product for human users too.

The teams that run this exercise once tend to run it regularly after that. Once you've watched an agent struggle with something a human handles in seconds, you start noticing that struggle in features you used to call shipped.

## The Mobile Parallel

The teams that take this seriously will look in a few years like the teams that took mobile seriously in 2009.

When mobile was a small share of usage, it was a side project for most teams. The teams that treated it as a real user, with real design constraints and real strategic implications, built advantages that compounded over the next decade. The teams that treated it as a smaller version of desktop got eaten.

Agents as users are at a similar moment. Most teams are treating them as an afterthought. A few are treating them as the real new persona they are. The compounding will favor the second group.

The leaders who see this aren't necessarily the ones with the deepest technical understanding of agents; they're the ones willing to say, in a leadership meeting, that their product has a new user, that the product needs an owner for that user, and that the roadmap has to reflect it. That's a small statement to make and a hard one to follow through on. Most companies still don't have anyone whose job it is to make sure agents have a good time using their product. The ones that get there first are doing something competitors will be slow to copy.
