---
title: "Designing an Organization When Every Framework Says Something Different"
date: 2026-05-03
draft: true
tags: ["organizational-design", "leadership", "team-topologies", "platform-engineering"]
categories: ["Leadership"]
---

There is no clean way to design an organization. Every framework you can pick up is right, and they each point you somewhere different.

If you come at it from the people side, you ask about span of control: how many reports per manager, what ratios are healthy, when does someone become a bottleneck. If you come at it from product, you ask about empowered teams and where you draw the boundaries — by customer persona, by user journey, by problem space. If you come at it from engineering, you reach for Team Topologies and ask which teams are stream-aligned, which are platform, which are enabling. And under all of that, the technical architecture is pulling at the shape too, asking to be respected.

Each lens gives you a defensible answer. The answers don't match. So what do you actually do?

## The Frameworks Don't Agree

I've designed organizations a few times now. Each time, I've wished there were a framework that just gave me the answer. There isn't.

The HR-shaped answer wants symmetric teams of seven or eight people each, manager spans you can defend in a leadership conversation, a clean reporting tree. The product-shaped answer wants teams that are close to customer outcomes, with end-to-end ownership of a journey or a problem, however that lands on the org chart. The Team Topologies answer wants you to be honest about which teams build for users and which teams build for other teams, and to keep the boundaries between those types clean. And the architecture answer wants the team boundaries to follow the system boundaries, because the alternative is endless cross-team dependencies and slow change.

Pick any one of those frameworks and run with it, and you'll do well on that dimension and badly on the others. The HR-clean org has product teams stretched across journeys they don't own. The product-clean org has wild manager spans and platform teams that look like service desks, while the architecture-clean org has people doing work they didn't sign up for because that's where the system boundary fell.

The frameworks are right. They're also incomplete on their own.

## The Setup

The hardest version of this I've worked on came when I was asked to fold four separate areas into one. The output had to be a single company-wide technology platform that served every team in the company, on every kind of work they did.

Four different histories, four different sets of priorities, four different ways of thinking about who their customer was. And now, on paper, one organization, with one identity and one direction.

No framework alone made the shape obvious. Span of control didn't. Team Topologies didn't. The customer journey lens broke down the moment you realized "the customer" was every other team in the company, doing very different work. The technical architecture had four overlapping stacks that were going to take years to consolidate, and the org couldn't wait for that.

I had to find a way through.

## Start With What You Want

The first thing I learned is that none of the framework work matters until you can articulate, in one or two sentences, what the organization is for.

It doesn't have to be a slogan, but it does have to be a clear statement of where you're taking the business and what role this organization plays in getting there. It doesn't need to be perfect on the first attempt. It needs to exist. Without it, every later trade-off becomes arbitrary, because there's no anchor against which to weigh it.

For us, that meant getting honest about whether we were a service function for the rest of the company or a force pulling the technology stack toward something better. Those two answers produce very different organizations. One is shaped to absorb requests. The other is shaped to set direction. We had to pick.

The vision is the spine. It drives the business forward, and the rest of the org design has to align to it: every team boundary, every leadership choice, every cadence. If the spine bends, everything else does too.

## A First Cut on Customers, People, and Technology

The vision is necessary but not sufficient. The next thing is a first view on the three things the vision has to live inside: customers, people, and technology.

A first view on customers means knowing, at a useful level of detail, who you're serving and how they group. In an internal platform context, that means specific teams with specific work, with patterns you can name. Some are doing one thing many times. Some are doing many things rarely. Those two groups don't want the same platform.

A first view on people means knowing the leaders you have, the strengths they bring, what they're motivated by, where they're stretched and where they have headroom. You can't design an org without this and call the result anything more than a wish list.

A first view on technology means understanding what you've inherited and where it's going. Which systems are converging, which ones are being deprecated, where the boundaries are firming up and where they're still soft. The org you design has to live on top of the architecture you have, not the one in someone's whitepaper.

These aren't side exercises; they're inputs the vision has to be tested against. The vision drives. Customers, people, and technology constrain. If any of the three is missing from the picture when you start drawing teams, the design that comes out of it is fiction.

## The Paper Exercise

With the vision and the three first cuts in hand, you can do the paper exercise.

The paper exercise is laying every proposed team out and looking at it through every lens at once. Where does it sit on Team Topologies? Is it stream-aligned, platform, enabling, or some uneasy hybrid? Which customer groups does it serve, and is that one or many? What's the span of control? Does it match a coherent piece of the technical architecture, or is it cutting across boundaries that will fight back?

What you get when you do this honestly is a map of friction. Some teams come out clean. They're a clear archetype, they serve a clear customer group, they sit on a coherent piece of the stack, and the manager has the right number of reports. Most teams don't come out clean. Most teams have at least one dimension where they're awkward, and a few teams are awkward on all of them.

The exercise is valuable even when it gives you a messy picture. Especially when it gives you a messy picture. The mess isn't a failure of the exercise; it's the real shape of the trade-offs you're being asked to make. Without the exercise, those trade-offs stay implicit. Someone makes a call about team boundaries and someone else complains about span of control later, and nobody can connect the two conversations because they happen in different rooms with different vocabulary. The paper exercise puts everything on one piece of paper and forces it into the open.

## Pick the Compromise

Once you can see the friction, you have to decide what you're willing to live with. This is the part nobody really teaches.

Are you fine that one team serves multiple customer groups, because the alternative would split the technology in a way you can't afford? Are you fine that a span of control is wider than you'd like, because the leader you have can hold it? Are you fine that a team isn't a clean Team Topologies archetype, because the work itself is genuinely hybrid? You have to name these out loud — you have to say which dimension you're prioritizing for this team, and which dimension you're knowingly compromising on.

If you can't say which compromise you're choosing, you haven't designed an organization. You've drawn a wishlist and convinced yourself it's a plan. The wishlist will get rebuilt the first time it meets reality, and you'll have lost the credibility you needed to make the next round of trade-offs.

The compromise has to be stated in a way that's defensible six months later, when someone asks why a particular team has the shape it does. "We chose this because the technology lives here and we're willing to take the span-of-control hit" is a defensible answer. "It just worked out that way" is not.

## Where Reality Hits

Then you have to staff it.

This is where the paper version meets the people you actually have, and the design starts to bend in ways you didn't predict on paper.

A strong leader can hold more complexity than the framework suggests. They can run a wider span, manage more interfaces, sit in a hybrid team type and still ship. Another leader, equally good in their own way, can't. Putting them in the same role on paper produces two different organizations in practice. The paper doesn't know that. You do.

There's also the retention question. Some of the people you most need are also the ones with the most options. If a leader has been running a piece of the org for years and is good at it, the design that takes that piece away from them might be the right design on paper and the wrong one in practice, because they leave. You end up accommodating part of what they want, keeping a scope they care about, giving them the path they've been promised, not because the paper says so but because losing them costs more than the design imperfection.

This is the part that makes org design feel uncomfortable to people who like clean answers. You're trading a small amount of structural elegance for execution capacity. That looks like compromise, and it is. It is also how the work gets done.

## Don't Do It Alone

The first instinct, when you're doing this kind of design, is to do it privately. It feels too sensitive to share. People's roles are about to change. Some people are going to lose scope. You don't want to start a panic by talking about a draft that might never happen.

I've come to think this instinct is wrong, if you've built the trust for it.

Involving your direct reports in the design, not in the final call but in the analysis and the trade-offs, gives you a much better answer. They see things about the customers, the people, and the technology that you don't, and they see them sooner than you would. They also tell you, before you commit to it, which compromise is going to fall apart in execution, and that signal is worth more than the discomfort of having the conversation early.

The risk you're managing is the gap between what the paper says and what the day looks like for someone reporting into one of these new teams. Your reports close that gap. You can't close it on your own.

## Structure Without Cadence Fails

The other thing the frameworks don't talk about much is that the org chart is only half of the design.

The other half is how the organization runs once you've drawn the boxes. What cadences do teams have? What decisions do they make on their own and which ones come up to you? How do problems get raised? How does information move sideways between teams that depend on each other? If the structure is good and the operating cadence is bad, the structure won't save you. Teams either drift, because they have too much space and no rhythm, or they stall, because they have too little space and every decision goes through the leader.

I've watched org redesigns that got the structure right and then ignored the cadence question, and the new org performed worse than the old one. The boxes weren't wrong. The problem was that nobody had thought through how decisions moved through the new boxes, and the teams were waiting for permission they used to have, on shapes of problems they used to handle without escalating.

Org design has two layers: the shape and the rhythm. The shape is what people draw. The rhythm is what makes the shape work. Looking at one without the other is the most common mistake I see, and it is the one I most often have to remind myself not to make.

## What Good Looks Like

The leaders I've watched do this well aren't the ones who pick the cleanest framework and apply it.

What they share is something else. They hold a clear vision of where the organization is going, and they test it against what they actually see in their customers, their people, and their technology. They name the trade-offs out loud instead of pretending they don't exist, stay close enough to the staffing reality that the design can survive contact with the people in it, and pair the structure with a rhythm that lets the teams operate.

The rhythm is the part that gets dropped most often, because it is the least visible part of the work. It is also the part that decides whether the design lives.

Org design done well isn't a search for the perfect answer — it's the willingness to choose a coherent compromise, in front of the people it affects, and then run it well enough that it earns the right to exist.
