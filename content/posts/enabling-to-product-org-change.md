---
title: "Reorganizing from Enablement to Product-Focused Platform Teams"
date: 2026-02-03
draft: true
tags: ["organizational-design", "platform-engineering", "leadership", "restructuring"]
categories: ["Leadership", "Platform Engineering"]
---

# Reorganizing from Enablement to Product-Focused Platform Teams

We renamed teams and nothing changed.

WebCore was still WebCore. Mobile infrastructure was still mobile infrastructure. Same people, same work. But six months later, everything was different.

The transition from an enablement-focused platform organization to a product-focused one wasn't about creating new teams—it was about reframing their purpose. And that reframing mattered far more than we expected.

This shift aligns with a broader industry trend. By 2026, 80% of large software organizations will have platform teams in place, up from 55% in 2025. But adoption alone doesn't guarantee success—the difference between effective and struggling platform teams often comes down to whether they think like product teams or enablement services.

## Why the Old Structure Didn't Work

The original platform organization was structured around "enablement." The mandate was straightforward: help the product teams build faster. Provide tools, documentation, guidance, and support.

In practice, this created a few problems:

**1. No clear success metric**

If you're "enabling" teams, how do you know you've succeeded? Did you provide enough options? Is it the right documentation? Are teams happy?

These are vague. Teams optimized for what felt like activity—writing more guides, offering more choices, providing more options.

**2. Diffuse accountability**

When your job is to "enable," there's no clear end state. You're successful if teams say they're enabled.

But teams often don't know what they need until they try to do the work. So platform teams were always one step behind.

**3. Low agency for platform engineers**

Platform team members were frustrated. Many joined to write code and build infrastructure, not maintain documentation or run workshops.

The lack of concrete products meant the work felt abstract and endless.

**4. Invisible impact**

When your work is "enablement," it's hard to point to what you built. You wrote documentation (thousands of lines). You answered questions (hundreds). You helped ship features (indirectly).

But none of this felt concrete.

## The Reframe: Platform as Product

The transition started with a different framing: **platform teams own products, not processes.**

A product has:
- **Users**: Specific teams or engineers who use it
- **Clear value**: "Using this, you can X, and you get Y for free"
- **Iteration**: Based on feedback, you improve the product
- **Accountability**: Did the product solve the problem?

This wasn't a reorganization that changed who reported to whom. It was a reframing that changed how we thought about the work.

Evan Bottcher from ThoughtWorks describes platforms as "a foundation of self-service APIs, tools, services, knowledge and support, which are arranged as a compelling internal product." That word—compelling—is crucial. Not just functional. Not just available. Compelling enough that engineers choose to use it.

## What Changed Structurally

The organizational structure actually *looked* similar before and after. But the internal logic was different:

**Before**: Individual teams working on "developer enablement"
- WebCore (developer productivity)
- Mobile infrastructure
- DevEx
- Infrastructure

**After**: Individual teams owning platform products
- WebCore (frontend platform as a product for web engineers)
- Mobile Core (mobile platform as a product for iOS/Android engineers)
- DevX (developer experience infrastructure as a product for all engineers)
- Backend Core (backend infrastructure as a product for backend engineers)

The teams themselves barely changed. But the question each team asked shifted from "How do we help people build?" to "What product do we own that helps people build?" (I wrote more about the implementation details and principles behind this shift in [implementing platform engineering at scale](/posts/platform-engineering-approach/).)

## The Leadership Layer

One structural change was significant: **we put a product-focused leader in charge.**

This person's mandate was different from a traditional infrastructure lead:
- Think about platforms like products
- Do user research—talk to engineers, observe workflows
- Make prioritization decisions based on impact, not requests
- Own customer experience, not just technical implementation
- Iterate based on feedback

This role required someone with product thinking, who could bridge between deep technical understanding and user empathy. It's a challenging role to hire for, because it's not quite a traditional product manager (those are often less technical) and not quite a technical leader (those often skip user research).

The platform engineering community calls this "platform product thinking"—treating internal developer experience with the same rigor as external product experience. It means staying close to users (engineers), understanding their workflows through observation not just surveys, and making opinionated choices rather than maximizing optionality.

## Managing the Transition

The actual transition had a few key phases:

**Phase 1: Reframing (month 1-2)**
Clear communication about what was changing and why. This wasn't "your job is now different"—it was "our platform is becoming a product, and that changes how we work."

**Phase 2: Getting Specific (month 2-3)**
Each team articulated what their product was. Not vague ("developer enablement") but concrete ("the web framework that handles routing, state management, and deployment, giving teams X for free").

**Phase 3: User Research (month 3-6)**
Teams actually talked to engineers. What frustrated them? What slow them down? What could we solve? This was uncomfortable for some teams that had been operating in abstract space.

**Phase 4: Roadmap Shift (month 6+)**
Based on research, teams created roadmaps focused on their specific product. This meant saying "no" to things that didn't fit the product vision. It was liberating for some teams, unsettling for others.

## What Worked

**Clarity**: Teams knew what they owned. This was surprisingly powerful. Instead of "help people build," the mandate was "own the mobile platform, and measure success by whether teams can ship faster, more reliably." This clarity is also what enables [self-sufficient business units](/posts/self-sufficient-teams/)--when platform teams own clear products, product teams can operate independently.

**Agency**: Platform engineers could actually build things. Not maintain documentation--build products. This attracted different people and motivated the existing team.

**Impact visibility**: Instead of abstract "enablement," teams could point to concrete outcomes. "We shipped the deployment tool. Teams using it reduced deployment time by 40%. We're now working on X."

**User focus**: Talking to actual engineers changed what teams worked on. Instead of guessing what people needed, they knew. This shifted roadmaps significantly.

## What Was Hard

**Saying no**: Being product-focused means having a point of view. Not every request gets fulfilled. This was uncomfortable for teams used to "the best answer is maximum optionality."

**Resisting feature creep**: Once you're shipping a product, you get requests. Lots of them. Saying no to requests—even good ones—is hard. But every feature adds complexity and maintenance burden.

**Finding the right product leaders**: This role doesn't have a clear career ladder in most organizations. We had to create it as we went, which meant some experimentation and some misfires.

**Moving fast in a structured way**: Being product-focused also means thinking about consistency, compatibility, documentation, and long-term maintainability. This can slow down teams used to just shipping.

## The Outcome

Six months after the transition, the shift was visible:

- Teams were shipping more often (deployment frequency up 40% from baseline)
- Feature adoption was higher (from ~30% to 65%+ adoption within 30 days, because features were designed with users, not guessed at)
- Platform engineers reported higher job satisfaction (they were building, not just supporting)
- Product teams were moving faster (average time to ship features down from 3+ weeks to under 2 weeks, because the platforms actually solved their problems, rather than offering options)

The reframing didn't require new hiring, new budgets, or major structural changes. It required a shift in how we thought about the work and who we hired to lead it.

## Key Lessons

**1. Structure reflects and reinforces how you think**
An "enablement-focused" structure encourages abstract thinking. A "product-focused" structure encourages specific thinking.

**2. The leadership mandate matters**
Put someone in charge who thinks like a product leader. This person's decision-making will shape the entire platform.

**3. User research is non-negotiable**
You can't be product-focused without understanding your users. This means embedding, interviewing, observing—not just asking.

**4. Platform teams need agency**
If you're asking teams to own products, they need the autonomy to say no to requests and pursue their product vision. Give them that.

**5. Product doesn't mean perfect**
Platform products don't need to be flawless. They need to be clear, useful, and iterable. Done and useful beats perfect and delayed.

## Conclusion

Reorganizing from enablement to product wasn't a top-down restructuring. It was a shift in how we framed the work, combined with the right leadership to make that framing real. It required discipline—saying no, staying focused, doing user research—but it unlocked a different kind of organization.

That said, this reframing was part of a larger transformation. As we shifted platform thinking, we also had to evolve decision rights, funding models, and how we measured success. McKinsey research suggests these platform transformations succeed when organizations reimagine the entire tech operating model, not just team mandates. Our reframing was the catalyst, but the work extended beyond just naming.

If your platform teams are stuck in abstractions, constantly overextended, or struggling with unclear success metrics, it might be time to ask: What if these teams owned products instead of enabling people? What would change?

---

## Further Reading

The ideas in this post have been shaped by excellent work from the platform engineering community:

- **[What is Platform as a Product? Clues from Team Topologies](https://teamtopologies.com/videos-slides/what-is-platform-as-a-product-clues-from-team-topologies)** by Manuel Pais - How platforms serve internal customers through curated experiences
- **[Mind the Platform Execution Gap](https://martinfowler.com/articles/platform-prerequisites.html)** by Evan Bottcher - The definitive article on platforms as compelling internal products
- **[Platform Engineering in 2026: 5 Shifts Driving the Rise](https://www.growin.com/blog/platform-engineering-2026/)** - Industry trends on platform team adoption and ROI measurement
- **[The Big Product and Platform Shift](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-big-product-and-platform-shift-five-actions-to-get-the-transformation-right)** by McKinsey - Five actions for platform transformation including operating model changes

*Interested in discussing platform team transformations? [Let's connect](/about/).*
