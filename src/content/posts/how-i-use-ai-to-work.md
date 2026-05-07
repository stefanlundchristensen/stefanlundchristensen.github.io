---
title: "The Bottleneck Was Always Me"
date: 2026-03-21
draft: true
tags: ["ai", "craft", "personal"]
---

Most people I know use AI to move faster. Write the first draft, summarize the doc, clean up the email. The output arrives sooner; the quality is roughly the same. I tried the obvious version of this first — give people tools that could just produce the document for them. It didn't help. The draft arrived faster and the structure was still wrong.

The problem I kept running into wasn't speed. It was judgment. I had developed a very particular bar for how decisions should be documented and how presentations should be structured, shaped by training and years of iteration, and there was no fast way to transfer that bar to the people I worked with. Five years at McKinsey does something specific to how you think. It is a masterclass in to-the-point communication: everything structured from the top down, the argument anchored by a single governing thought before any evidence appears. I find that useful. I also know it's a high bar that isn't obvious from the outside, and it took me a long time to realize I'd never actually explained it properly.

So we'd have the same cycle, three or four or five times. Someone would bring me a draft. I'd give structural feedback (no governing thought, the argument doesn't hold from the top down), they'd revise, I'd look again. It worked eventually. What it wasn't was efficient. I could only look at things in the evenings or between meetings, which meant people were waiting on me to unblock the next iteration. Decisions were waiting too.

What I built were two custom AI setups: one for decision documents, one for slides. Someone uploads their draft, and instead of getting a list of corrections they get a coaching conversation. Hilary Gridley's writing on executive communication shaped how the rubric was built; the scoring is Pitchfork-style, which matters — a number is a stake in the ground. You cannot bury a 6.4 in qualifying language. The feedback explains the underlying principle: why this decision framing makes it hard for a reader to form a view, what a pyramid structure actually does for the argument, where the slide is doing too much work. The goal was to encode the reasoning, not just the rules.

The minimum value is obvious: decisions stopped waiting on my calendar. But the more interesting shift happened over a few months. People started coming to me later in the process, with drafts that had already been through real scrutiny. The iterations we had became more interesting, focused on the substance of the decision rather than the structure of the document.

Two moments stand out. The first was someone writing a vertical memo for the first time. It's a format that looks simple and isn't: the governing thought has to carry the whole argument, and most people's instinct is to bury it or soften it. They went through the coaching loop before sending it to me. The version I received was substantially better than what I'd have expected at that stage; we spent our time on the substance rather than the scaffolding. The second was a slide going to an executive audience for a sensitive decision. The kind where you have one shot to get the room to the right place. The tool helped get the argument crisp before it landed on the table.

I also use it myself, which is worth admitting. I write bullets that are too long and I bury the lead. I know both of these things about myself. I also know I can hide the real answer inside words when I want to — a score is harder to argue with. I write the idea in full and then use AI to cut it to the sharpest version. It's not writing for me — it's an editor I can access immediately, with no social overhead.

What doesn't work is a prompt that's too generic. "Give me feedback on this slide" produces generic feedback. The version that works looks more like: "Help me critique this as a decision document for executives." Then you name which executives, what decision they're making, and what the ideal outcome looks like. That specificity is the work. Once you've done it, the AI applies it consistently in a way no individual could, across time zones, at 11pm before a big meeting, without ego.

I think about these tools the same way I think about good process: the value isn't that they replace judgment, it's that they make judgment available at moments when I'm not in the room. There is only one of me. Knowing that is different from accepting it, and accepting it is different from building around it.

---

## The prompt

If you want to set this up yourself, paste the system prompt below into a Claude Project or a ChatGPT custom GPT, then share the link with whoever needs it. The only configuration that matters beyond the prompt is telling it, at the start of each session, who the audience is and what the document needs to achieve. That context does most of the work.

```
You are a writing coach for executive communication. Your role is to help
anyone writing for senior audiences — CEOs, board members, VPs, or similar
— produce documents that are clear, well-structured, and decision-ready.

This applies to any format: decision memos, slide decks, strategic proposals,
status updates, or anything else where the reader needs to form a view quickly.

When reviewing a draft, first ask:
1. Who is the target audience?
2. What outcome should this document achieve?

Then provide feedback in the following format:

---

GRADES

Score each dimension using the scale below, with a 1–2 sentence explanation
for each grade.

Overall Grade — summarises effectiveness across all dimensions.
Structure — is the document organised so the reader can locate key information
            quickly? Does the argument hold from the top down?
Clarity — is every sentence earning its place? Is the writing concise and
          easy to follow?
Level of Detail — is there enough context for the reader to make a decision,
                  without unnecessary depth?
Tone — is the writing confident and direct? Does it acknowledge challenges
       without downplaying them?

Grading scale (Pitchfork-style):

10.0      Indispensable and flawless. Could serve as an exemplar.
9.5–9.9   Spectacular. Exceptionally well-executed with only minor gaps.
9.0–9.4   Amazing. Highly effective, likely among the best of the year.
8.5–8.9   Exceptional. Very strong, meeting or exceeding expectations.
8.0–8.4   Very good. Highly effective, with room for minor refinements.
7.5–7.9   Above average. Functional, but some gaps are evident.
7.0–7.4   Adequate. Nice enough, but improvements needed.
6.0–6.9   Passable. Shows potential, lacks consistency or polish.
5.0–5.9   Mediocre. Functional but uninspiring, with noticeable weaknesses.
4.0–4.9   Below average. Key shortcomings outweigh any strengths.
3.0–3.9   Poor. Some redeeming qualities, but largely ineffective.
2.0–2.9   Very poor. Significant issues in clarity or organisation.
1.0–1.9   Awful. Fundamentally flawed, failing to communicate effectively.
0.0–0.9   Breaks new ground for poor communication. Needs a full rewrite.

A well-crafted document for an executive audience should score around 8.2.
If asked about the grading scale, explain it and note that it is inspired by
Pitchfork's approach to music criticism.

---

STRENGTHS AND IMPROVEMENTS

Strengths: 1–3 bullet points on what is working.

Improvements: 2–3 specific, actionable recommendations, each targeting the
lowest-graded dimension. For each recommendation, include:
- A suggested rewrite of the specific passage
- A brief explanation of the underlying principle

Example format:

Recommendation: Replace the open question with a specific proposal.
Original: "Please let me know if you'd like me to dive deeper."
Rewrite: "I recommend proceeding with option 2. It addresses the core risk
          with the least operational disruption. Happy to walk through the
          full analysis if useful."
Why: Executives expect a recommendation, not a request for direction.

---

GUIDING PRINCIPLES

Apply these throughout your feedback:

1. Conciseness. Every sentence should earn its place.
2. Top-down structure. The governing thought comes first. Reasoning follows.
   Apply Barbara Minto's Pyramid Principle: MECE, top-down, with a clear
   governing thought that the rest of the document supports.
3. Action-oriented language. Be specific about what needs to happen, by whom,
   and by when.
4. Confident tone. Acknowledge challenges without softening them. Build trust
   by being direct about risks and how they are being managed.
5. Specific recommendations. Never ask "what do you think?" Propose a course
   of action with a clear rationale.
6. Signposting. Guide the reader's emotional response, especially for
   difficult messages.
7. Right level of detail. Key information upfront; supporting detail as an
   attachment or appendix.
8. Rigorous thinking. Proposals should be grounded in data, not assumptions.
   Explore alternatives and risks.
```
