# Content Creation Plan

**Created:** 2026-02-03
**Author:** Stefan Christensen
**Purpose:** Sustainable content strategy for stefanchristensen.me blog

---

## Philosophy & Approach

### Core Principle: Write to Think, Publish to Clarify

This content strategy isn't about building an audience or optimizing for engagement. It's about using writing as a tool to work through complex ideas, with the side effect that it establishes expertise and helps other operators.

### Priority Order

1. **Clarify thinking** - Use writing to process complex problems and patterns
2. **Build thought leadership** - Establish expertise in FinTech/payments/scaling
3. **Help practitioners** - Share hard-won lessons with other operators
4. **Attract opportunities** - Generate inbound for advisory, speaking, future roles

### How This Works

1. **Follow intellectual curiosity** - When wrestling with a problem at work, or a pattern you keep seeing, or a connection between domains—that's what you write about. The act of explaining it forces clarity.

2. **Rotate freely across topics** - Don't force thematic arcs or content calendars. One post on payment infrastructure, next on leadership development, then European market complexity. Write what's alive for you that week.

3. **Mix of depth and focus** - Default to long-form essays (1000-2000+ words) for deep exploration. But when you have a tight observation or framework, publish a focused 500-800 word piece. Length should match the idea, not a template.

4. **Sustainable cadence** - Aim for 1-2 posts per month (biweekly to monthly). Some months you publish nothing because you're processing. Other months you publish three pieces because ideas are flowing. The average works out to ~20 posts/year.

### Audience

Writing for yourself first. Mixed audience finds value:
- Current/future peers (SVPs, VPs at scale-ups)
- Earlier-stage operators (Directors, Senior PMs, Staff+ engineers)
- Investors and board members
- Hiring audience (CTOs, CEOs looking for exec talent)

Whoever finds it valuable is secondary to the intellectual exploration.

---

## Accountability Structure

### Monthly Content Rhythm

**Week 1: Idea Selection**
- Review the topic inventory below
- Pick the topic that's most intellectually alive for you right now
- Commit to one idea for the month

**Week 2-3: Draft & Process**
- Write the first draft (don't edit while drafting—just get ideas out)
- Let it sit for 2-3 days
- Come back, read it fresh, apply practitioner writing principles
- Use `/writing-critique` if you want a second pass

**Week 4: Publish**
- Final polish
- Publish to the blog
- Share on LinkedIn (optional, but compounds the value)

**Buffer Weeks:**
- Every other month, use Week 4 as a buffer—no publishing pressure
- This gives you the biweekly-to-monthly flexibility (12-24 posts/year)

### Accountability Mechanisms

1. **Idea list checkpoint** - Review the topic inventory first week of each month. If nothing on the list feels alive, pay attention to what's making you curious.

2. **Draft-by-mid-month rule** - If you haven't started a draft by the 15th, the month is at risk. Better to publish a focused 600-word piece than skip entirely.

3. **Quarterly review** - Every 3 months, look back at what you published. What topics keep coming up? What got the most engagement (either from you intellectually, or from readers)? Adjust your idea inventory.

---

## Topic Inventory

### Organizational Scaling & Systems Design

1. **"Conway's Law Isn't Advice, It's Physics"** - Your system architecture will mirror your org chart whether you want it to or not. How to design for this instead of fighting it.

2. **"The Span of Control Myth"** - Everyone says "7±2 reports." What actually matters is decision complexity, not headcount. Your framework from scaling to 100+ reports (indirectly).

3. **"Shared Services Are Coordination Debt"** - Why every "center of excellence" eventually becomes a bottleneck. When to centralize vs. federate capabilities.

4. **"How to Design Team Boundaries That Don't Break"** - Your Pleo framework for defining which team owns what. Domain-driven design for organizations.

5. **"Information Flow Is the Real Bottleneck"** - Not code, not people, not process. How information moves (or doesn't) determines velocity at scale.

6. **"The Modularity Trade-Off"** - Modular systems scale better but cost more to build. When you're big enough to pay that cost, and how to know.

7. **"Why Your Platform Team Needs Product Managers"** - Internal platforms are products. Treating them like infrastructure projects is why adoption fails.

8. **"Autonomy Without Context Is Chaos"** - Self-sufficient teams need rich context from leadership. Your quarterly all-hands framework and what actually gets shared.

9. **"The Meeting Tax at Scale"** - How sync time compounds as you grow. Your framework for deciding what requires meetings vs. async.

10. **"Organizational Abstractions: Hiding Complexity So Teams Can Move"** - Platform engineering for organizations. What you abstracted away at Pleo.

11. **"The Self-Sufficiency Tax"** - Why building truly independent teams costs more upfront (duplicate capabilities, platform investment) but pays off at scale. When is it worth it?

12. **"Decision Rights vs. Decision Speed"** - How Pleo structured who decides what at 100 vs. 850 people. The framework you actually used, not the theory.

13. **"Platform Teams Are a Bet on the Future"** - When to centralize capabilities (auth, payments, data) vs. let teams own end-to-end. The trade-offs you lived through.

14. **"Coordination Costs Compound Exponentially"** - Why adding "just one more sync meeting" kills velocity at scale. The math you don't see until it's too late.

15. **"How to Know When Structure Is the Problem"** - Observable signals that your org design is broken (not just "velocity feels slow"). Specific patterns you've seen.

### Payments Infrastructure & Technical Strategy

16. **"Why Payment Failures Are Never Simple"** - The diagnostic tree you actually use. Network timeouts, partner outages, regulation changes, customer behavior—how to isolate root cause.

17. **"Interchange Economics Shape Product Strategy"** - Card vs. A2A rails aren't just cost differences—they change what products you can build. Strategic implications of 0.2% vs. 2.5%.

18. **"Building Payment Routing Logic That Doesn't Become Spaghetti"** - How to handle: try card, fall back to bank transfer, route by country, by amount, by customer segment. The abstraction layers you built.

19. **"The Partner Integration That Seemed Simple Until Production"** - Partner says "REST API, simple integration." Reality: undocumented validation, rate limits, settlement timing. Your checklist for vetting partners.

20. **"Why We Renegotiated with JPMorgan"** - The 70% cost reduction story. What leverage you had, how you structured the conversation, what actually moved the needle.

21. **"Real-Time Payment Rails Change the Product Game"** - SEPA Instant vs. overnight settlement isn't just faster—it unlocks different customer experiences. What you built at Pleo.

22. **"Reconciliation Is Unsexy and Critical"** - Your three-week ledger debugging story expanded. Why financial systems that don't reconcile are time bombs.

23. **"Multi-Currency Without the Hairball"** - How to architect payments across currencies without 47 special cases per country. The abstraction layers that worked.

24. **"PSD2 SCA: The Regulation That Broke Checkout Flows"** - Strong Customer Authentication killed conversion. How you adapted at Pleo while staying compliant.

25. **"Card Scheme Negotiations Are Relationship Chess"** - Not just about basis points. Long-term partnership, product roadmap alignment, what actually matters beyond price.

26. **"Why Payments Partnerships Fail"** - The gap between sales promises and engineering reality. Your JPMorgan/BankingCircle/Yapily renegotiation stories.

27. **"Modularity Saved Us When a Partner Changed Terms"** - The KYC requirement change story (you mentioned losing 30% of customers in goal-setting post). How abstraction layers are insurance.

28. **"The Hidden Cost of 'Fully Managed' Payment Providers"** - When vendors say they handle everything, what they actually mean. Edge cases you discovered after integration.

29. **"Building Payment Systems That Don't Reconcile Is Expensive Theater"** - The three-week ledger debugging story. Why the money map matters before you write code.

30. **"From Cost Center to Competitive Advantage"** - How you turned payments from "something we have to do" into a moat. The 70% cost reduction story.

### European Market Complexity & Strategy

31. **"Why American FinTechs Underestimate Europe"** - The opening you wrote for european-payment-rails.md expanded into full post. Conversion rate drops, customer abandonment, what they miss.

32. **"Germany Expects Direct Debit, the Netherlands Expects iDEAL—Payment Preferences by Market"** - Deep dive on customer behavior across European markets. What actually drives conversion in each country.

33. **"Why Girocard Matters More Than Visa in Germany"** - The data from McKinsey: retailers losing 15-20% of transactions. When local schemes are strategic, not edge cases.

34. **"PSD3 vs. PSD2: What Actually Changes for Operators"** - Cut through regulatory complexity. The 3-5 things that will require engineering work vs. noise.

35. **"Open Banking in Theory vs. Practice Across Europe"** - EU says unified APIs. Reality: each country's banks implement differently. Your map of what actually works where.

36. **"Swish, MobilePay, Vipps—The Nordic Payment Apps That Dominate"** - Why Nordics leapfrogged cards for P2P and what that means for FinTechs entering these markets.

37. **"iDEAL, Girocard, and the Local Payment Schemes That Matter"** - Deep dive on why you can't ignore local schemes. The 15-20% transaction loss data from McKinsey.

38. **"SEPA Instant Is Mandatory Now—What That Means"** - The strategic implications of instant A2A payments being required across eurozone. How this changes competitive dynamics.

39. **"PSD3 Is Coming—Here's What Actually Changes"** - Cut through the regulatory noise. What operators need to know, not what lawyers talk about.

40. **"The Partner Said 'Instant Transfers' But Meant 'Maybe Same-Day'"** - Your Pleo story about documentation vs. reality. How to actually validate partner capabilities.

### Leadership & Technical Management

41. **"High Bar + High Support"** - How you balance demanding excellence with being there every step. Not corporate speak—what this looks like in practice.

42. **"Coaching Someone Into a Role They Don't Think They're Ready For"** - Your actual playbook. What you did with specific people (anonymized) that worked.

43. **"Building a Leadership Team That Trusts Each Other"** - How you unified your 7-person leadership team. Specific practices, not platitudes.

44. **"Promoting People Is Easy, Growing Them Is Hard"** - The 5+ promotions you secured. What did you do to set them up for success before and after the title change?

45. **"What Fatherhood Taught Me About Leadership"** - You mention this in your about page. What actually changed? Concrete examples of before/after.

### Systems Thinking & Cross-Domain Frameworks

46. **"Thinking in Systems: What Physics Taught Me About Organizations"** - How atomic clocks and quantum computing gave you frameworks for understanding complex systems.

47. **"Precision Measurement in Physics and Business"** - Atomic clocks require obsessive measurement discipline. Where that mindset applies to scaling companies and where it breaks.

48. **"State Machines for Organizations"** - How you think about team states, process states, system states. Physics training applied to organizational design.

49. **"Why Operators Need to Think Like Scientists"** - Hypothesis → experiment → measure → adjust. Your framework for decision-making under uncertainty.

50. **"Signal vs. Noise at Scale"** - In quantum computing and in 850-person organizations. How to detect real patterns vs. random fluctuation.

51. **"Abstractions All the Way Down"** - Physics abstracts away complexity (you don't think about quarks when modeling gases). Organizations and platforms do the same. Where the analogy holds.

52. **"The Consulting Trap: Why Advising Isn't Operating"** - What McKinsey couldn't teach you that Pleo did. The scars that make you effective.

53. **"Hypothesis-Driven Leadership"** - You mention thinking in hypotheses and experiments. How this shows up in team building, strategy, product decisions.

54. **"Each Domain Taught Me What the Others Couldn't"** - Physics gave rigor, consulting gave business lens, operating gave scars. Specific examples of each.

55. **"Building Atomic Clocks and Building Organizations Both Require Precision and Iteration"** - Exploring the parallels. Where the metaphor holds and where it breaks.

---

## How to Use This Plan

### When Starting Each Month

1. Open this document
2. Scan the topic inventory
3. Ask yourself: "Which of these ideas is most alive for me right now?"
4. Pick one, commit to it for the month
5. If nothing on the list feels right, write down what's actually pulling at you—add it to the inventory

### As New Ideas Emerge

- Add them to the appropriate section
- Don't worry about perfect categorization
- Some of your best posts will be ideas that aren't on this list yet

### Quarterly Review (March, June, September, December)

- Look at what you've published in the last 3 months
- What topics keep coming up?
- What got the most engagement (from you or readers)?
- What topics on this list no longer interest you? Remove them.
- What new patterns are you seeing? Add them.

### Publishing Checklist

Before you publish each post:

- [ ] Run `/writing-critique` to catch buzzwords, vague language, missing examples
- [ ] Add concrete numbers and specific examples (names, timeframes, data)
- [ ] Check that opening hooks immediately (no throat-clearing)
- [ ] Verify you have at least one detailed story/example
- [ ] Ensure the closing provokes thought (reflection questions or honest assessment)
- [ ] Add to git and commit
- [ ] Share on LinkedIn with a 2-3 sentence hook

---

## Success Metrics

### Don't Track These (vanity metrics)
- Page views
- Social media likes
- Newsletter subscribers (you don't have one)

### Do Notice These (real signals)
- How often you reference your own posts when explaining concepts to others
- Inbound messages from practitioners saying "this helped me"
- Job opportunities or speaking invitations that cite specific posts
- How much clearer you feel about a topic after writing about it

### The Real Goal

At the end of 2026, you should have ~20 posts that represent your clearest thinking on organizational scaling, payments infrastructure, European markets, and systems thinking. That corpus becomes:

1. A tool for your own thinking
2. A demonstration of expertise for future opportunities
3. A resource for other operators
4. A foundation for more ambitious projects (book, advisory practice, etc.)

---

## Current Status

**Plan Created:** 2026-02-03
**Posts Published:** 4 (goal-setting, payment-systems-lessons, european-payment-rails, self-sufficient-teams drafts ready)
**Next Action:** Pick first topic for February 2026 from inventory above
