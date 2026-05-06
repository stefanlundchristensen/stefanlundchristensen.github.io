---
title: "When the Cost of Coding Goes to Zero, Everything Else Has to Change"
date: 2026-05-06
draft: true
tags: ["ai", "product-development", "leadership", "engineering-management"]
categories: ["Leadership"]
---

Most companies aren't getting much from AI in product development. A few are pulling away, fast.

The vast majority are running pilots, getting some productivity uplift, calling it a win. The outliers look different. Their lifecycle has changed shape, not just sped up.

Getting into the entry zone is easy. The next mile is brutal — the curve gets steep fast, and the reason is that going further means tearing apart how your company has done product development for the last twenty years.

## The Easy Mile

The first mile of AI adoption is mostly a tooling story. Engineers use Copilot or Cursor. PMs use a chat tool to draft specs. Designers use image models to mock things up. Productivity goes up by some amount that's hard to measure precisely but everyone agrees is real.

This is where most companies are, and there's nothing wrong with it. The problem is mistaking it for the destination.

What this version of AI adoption doesn't change is the shape of the lifecycle. PMs still write tickets that engineers pick up. Sprints still assume work is sized in days. Code review is still the main quality gate. Specialists still hand artifacts to other specialists.

Faster is still faster. But it's faster on the same shape. The outliers have a different shape.

## The Assumption That Changes Everything

Underneath all of this is one assumption: the cost of coding is going to zero.

Not literally zero. But on a trajectory where the time and human attention required to turn an idea into running software keeps falling, and the trajectory looks more like a step change than a smooth curve. Better models. Better agents. Better integration with the tools that actually run the work. Each generation pushes the floor further down.

If you take that assumption seriously, you have to look at every artifact in your product development lifecycle and ask what it was designed for. Most of those artifacts were designed for a world where coding was the expensive step. The ticket. The sprint. The PM-to-engineer ratio. The code review. The design-to-engineering handoff. They all encode the same scarcity. When the scarcity goes away, the artifacts stop making sense.

The companies pulling ahead aren't the ones with better tools. They're the ones who took this assumption seriously and started rebuilding their lifecycle around it.

## The PM-to-Engineer Ratio Was Always Artificial

The classic ratio was one PM for five to ten engineers. It came from a world where engineers were the constraint. You needed enough of them to keep the build going, and you couldn't afford a PM per engineer because that wasn't the bottleneck.

That ratio is going to change, and probably more than people are ready for. There aren't many products where you need ten engineers per PM if the engineers are working with strong AI tooling. That's a hard thing to say out loud in a leadership meeting, but the underlying math is straightforward.

The cleaner frame, the one I keep coming back to, is to stop separating product manager from engineer at all. A small group owns a product. They decide what to build, they build it, they ship it. The line between specifying and implementing gets thinner because both ends of it are cheaper.

Once that frame lands, a lot of the artifacts that exist to coordinate across the line stop being valuable. The labels on the ticket, the right fields filled in, which sprint it belongs to — these matter when the ticket is the contract between people. When the same group owns both ends, the contract is internal, and you can just write the code.

## Tickets Get Bigger

I used to think a well-sized ticket was about a day of work for one engineer. That was the right unit because a day was about as much as a person could hold in their head before needing to coordinate.

That isn't the right unit anymore. With AI doing more of the typing and more of the boilerplate thinking, what one engineer can carry forward in a coherent piece of work has shifted upward. The handoff point, the place where the work has to be written down and passed to someone else, moves higher.

In the old shape, a lot of the energy went into the conversation between tickets. Was this ticket sized right? Did it have the right acceptance criteria, and was it blocked on something else? When you have multiple people coordinating across small chunks of work, those questions matter. When the same person can carry a much larger piece end-to-end with AI assistance, the conversation moves up a level. You're talking about epics, not tickets. Outcomes, not implementation steps.

The teams that get this right spend less time grooming a backlog of tickets and more time framing the next epic well enough that one person and their tools can take it from problem to shipped change.

## Quality Lives in the Inputs Now

Code review used to be the place where quality happened. Two engineers, a diff, a back-and-forth about edge cases.

When agents are writing meaningful chunks of the code, the review still matters but it stops being the main gate. The main gate moves earlier. The quality of the spec, the clarity of the description, the tests that exist before the work starts, the standards the agent has been given to follow, the context it has access to: these become the levers. The output is roughly as good as the input. So the work shifts toward making the input good enough that the output is too.

This is uncomfortable for organizations that have spent years building review culture. The instinct is to do more review, more carefully, because there's now more code to review. The better answer is to push the work upstream. Better tests, better standards, better agent context. Less code that needs careful review in the first place because the structure of the work made bad code unlikely.

This is also a craft shift. Writing clear specs and good tests has always mattered. It now matters more, because more downstream value depends on it.

## You Try More Ideas Now

When building something cost a week, you tried five ideas before picking one to ship. When it costs a day, you try fifty.

That sounds like a quantitative change, but it lands as a qualitative one. The bottleneck stops being "what can we afford to build" and becomes "what's worth picking out of everything we just built." Selection replaces construction as the hard problem.

Most product development processes are not built for this. They assume getting to a working prototype is expensive, so they spend a lot of effort deciding what to prototype. Once that decision is cheap, the value of all the deciding-what-to-prototype work goes down. The discipline that matters is what you do with fifty live options, not how you narrow the list before building.

This is one of the places where the easy mile and the hard mile look very different. The easy mile speeds up the existing funnel. The hard mile redesigns the funnel because the shape it had assumed building was the bottleneck.

## Single-Threaded Craft Isn't Enough

For a long time you could be excellent at one thing and have a successful career. Great PM, great designer, great engineer. The narrowness was the point.

That's harder to make work now. The people I see succeeding in AI-native teams have craft plus an adjacent dimension. Engineers with product taste — the ability to feel whether a feature is the right feature, not just whether it's built well. PMs who can prototype themselves and read the technical implications of a design choice. Designers who can ship working code instead of throwing a Figma over the wall.

Craft still matters. I want to be precise about that. The bar on each individual skill hasn't dropped. What's changed is that the surrounding skills matter much more, because the boundary between roles is thinner and the cost of crossing it is lower.

The career advice that follows from this is uncomfortable for specialists. You can stay narrow and still be good. The people pulling ahead aren't.

## How to Find What to Change

If you accept that the lifecycle has to change, the question is where to start. The mistake I see most often is starting with the abstract: running an off-site, drafting a target operating model, mapping a future-state process.

The version that works is concrete. Pick one piece of work. One customer request, one feature, one thing you'd build anyway. Doesn't matter how big.

Walk it through your current process end to end. The spec. The estimation. The technical design. The implementation. The review. The QA. The release. At every step, ask the same question: if AI could be there, what would change?

You don't need a hypothesis about the answer. You're not designing the future-state process. You're finding the bottlenecks. Where does the current process slow down work that AI could now do faster, or require coordination that AI removes the need for? Where does it produce artifacts that exist for reasons that no longer apply?

By the time you've walked one feature end to end with that question in mind, you'll have a list of specific things to change. That list is more useful than any framework. It's grounded in real work, with real people, on a real timeline.

## What the Outliers Have

The companies pulling ahead with AI aren't the ones with the most expensive tooling or the largest AI budget; they're the ones willing to pull their own process apart.

That's a leadership move, not a tooling move. It means looking at artifacts you've built your career on, like the way tickets are written, the way teams are sized, the way reviews work, and being willing to say that some of them were designed for a world that's leaving. It means tolerating the discomfort of not knowing what the new shape is yet, while you walk through your own work to find it.

The easy mile is buying tools and pointing them at the existing process. The next mile is admitting the existing process is the thing that has to change. The leaders who can say that out loud, and then do the slow concrete work of redesigning, are the ones whose teams will be on the steep part of the curve.
