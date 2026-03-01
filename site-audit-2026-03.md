# Site Audit: stefanchristensen.me
*Conducted March 2026*

---

## Site Overview

**Tech stack:** Hugo static site generator, hello-friend-ng theme (git submodule), custom SCSS override (`assets/scss/custom.scss`), deployed via GitHub Actions to GitHub Pages with custom domain. Pure static HTML — no JS framework, no CMS.

**Structure:**
- Homepage (`_index.md`) — identity + metrics + writing preview + CTA
- About (`about.md`) — narrative bio + convictions + what he's thinking about
- Experience (`experience.md`) — career history in long-form narrative format
- Now (`now.md`) — current focus snapshot
- Blog (`/posts/`) — 4 published posts, 8 drafts sitting invisible
- Navigation: About / Experience / Blog / Now

**What I found:** Deliberate design choices — pure black/white Scandinavian palette, system fonts, avatars explicitly hidden via CSS (`display: none !important`). Social links: LinkedIn + email only.

---

## Scorecard

| Category | Rating | Rationale |
|---|---|---|
| A. First Impression & Positioning | 🟡 Partial | Clear role + metrics above the fold, but **no photo** and no explicit availability signal |
| B. Career Narrative & Story | 🟢 Strong | First-person, sharp POV, memorable throughline — genuinely well-written |
| C. Experience & Track Record | 🟡 Partial | Strong metrics but the page fails the 30-second scan test — too narrative, too dense |
| D. Social Proof & Credibility | 🔴 Missing / Weak | Zero testimonials, zero press, zero speaking, zero external signals of any kind |
| E. Thought Leadership | 🟡 Partial | Distinctive topics and voice, but only 4 published posts surfaced; 8 drafts invisible |
| F. Contact & CTA | 🟡 Partial | LinkedIn + email present, but CTAs are soft and no availability signal |
| G. Design & Aesthetics | 🟡 Partial | Intentionally minimal but anonymous — no face, no personality, no visual anchor |
| H. Technical Quality | 🟡 Partial | Fast, mobile-responsive, robots/sitemap present, but no OG image and likely no Person schema |

---

## Detailed Findings

---

### A. First Impression & Positioning

**What's working:**

The homepage opens with this:

> "SVP Product & Engineering at Pleo. I lead 100+ people across platform engineering, payments infrastructure, and core banking integrations."

That's a clean, first-person opener. Role, company, team scope — covered in two sentences. The `homeSubtitle` in config reads: *"SVP Product & Engineering. Scaling FinTech organizations across payments, platform, and people."* — solid one-liner.

The metrics block is strong and correctly placed:

> "70% reduction in card scheme costs. Scaled from 5 to 15 markets in 11 months. 300% increase in engineering throughput. 20 percentage point margin uplift through payment processor migration."

Four concrete outcomes, above the fold, no fluff. This passes the "why should I care" test.

**What's missing or weak:**

**No photo. This is the single largest gap on the entire site.** The CSS explicitly hides any avatar: `.avatar, .profile-image, img.avatar { display: none !important; }`. This is a deliberate design choice, and it's the wrong one.

Executive personal sites without a face are cold. A founder, VC, or recruiter landing here cannot connect with a person. They see a text document. The "personal" part of personal brand requires the person. On a site built for startup exec positioning — where trust, relationships, and whether someone "gets it" culturally are everything — the absence of a photo signals either insecurity or prioritization of aesthetic over function. Neither reads well.

**No explicit availability signal.** If this site exists partly to surface Stefan for new roles (which the structure strongly implies), there is no tasteful way to read that. The closest signal is: *"Building in payments, scaling a platform org, or thinking about leadership at growth-stage? Let's connect."* That's fine for networking. It's not a signal to a recruiter that he's exploratory.

**Specific recommendations:**
- **[Critical]** Add a professional photo above the fold. It doesn't need to be large — even a small circular headshot in the header changes the entire human feel of this page.
- **[Important]** Add a subtle availability signal. Something like a single line in the "Now" page or homepage: *"I'm selectively exploring what's next — reach out if you're building something I should know about."* That's tasteful, not desperate.

---

### B. Career Narrative & Story

**What's working:**

This is the strongest section on the site. The copy is first-person, specific, and has a genuine voice. The through-line is clearly articulated and memorable:

> "Physics → Payments → Platform. Different domains, same muscle: building systems that work when nobody's solved it before."

That's a brand line. It's distinctive, it's compact, and it makes the career arc make sense to someone who might otherwise ask "why did a physicist end up at a FinTech startup?"

The About page convictions section is excellent:

> "Platform teams should be product teams. If your platform org measures success by 'enabling others,' you've already lost."

> "The best organizational structures are the ones that make good decisions happen without you in the room. If your team needs you for every call, you haven't built an organization — you've built a dependency."

This is the stuff startup founders and CTOs actually want to hear from a senior hire. It signals that this person has opinions forged from operating experience, not borrowed frameworks.

The fatherhood line in About — *"I went from a logical executor to an emotionally balanced leader who gets shit done"* — is risky but works. It humanizes without over-sharing.

**What's missing or weak:**

The About page ends without a forward-looking signal. The final paragraph is:

> "I'm drawn to the intersection of a few shifts happening at the same time: how AI changes the infrastructure layer of fintech, how European payment rails are converging after decades of fragmentation, and how the next generation of technical leaders gets built. These are the problems I want to keep working on — whether at Pleo or wherever the most interesting version of this work is happening."

*"Whether at Pleo or wherever the most interesting version of this work is happening"* is doing a lot of work quietly. That's the most explicit signal of openness anywhere on the site — buried at the bottom of the About page, two paragraphs above the footer. A startup founder skimming this will probably miss it.

**Specific recommendations:**
- **[Nice-to-have]** Surface the "wherever the most interesting version of this work is happening" signal more explicitly, or move a version of it higher up.
- **[Nice-to-have]** The About page is ~250 words — right at the edge of earnable length. It earns it, but tighten the penultimate paragraph (the "Outside of work" section) which currently reads like padding.

---

### C. Experience & Track Record

**What's working:**

The metrics are present and specific: 70% card cost reduction, 5→15 markets in 11 months, 300% engineering throughput, 20pp margin uplift, 20,000+ customers migrated. Those are real numbers that differentiate from generic "I led strategic initiatives" CVs.

The experience page has a genuine structure and doesn't just dump job descriptions. There's reflection at the end of each role — *"What I learned:"* sections — which signals self-awareness and intellectual honesty.

Company name + title + dates are present for each role, which is table stakes but worth noting it's done correctly.

**What's missing or weak:**

**The experience page fails the 30-second scan test.** It's structured as dense narrative paragraphs. A founder or recruiter skimming this page cannot quickly extract: what company, what title, what years, what results. You have to read every word to navigate it.

Compare this to what a startup exec wants to see: role titles that jump out, dates at a glance, 2–3 bullet metrics per role, company context in a sentence. The current format buries the most impressive achievements inside paragraphs.

Some specific structural issues:
- McKinsey section lists only `**Engagement Manager** *(final role)*` — no dates for this specific role, just "Jan 2014 - Aug 2019" for the whole McKinsey tenure. How long was he Engagement Manager vs. other levels?
- The current Pleo SVP role includes: *"Same role, broader mandate."* That's vague and undersells what should be the highest-stakes description on the page.
- Team sizes are mentioned but buried: *"Led ~25 people"*, *"Led 100+ people"* — these should be surfaced more prominently, not tucked mid-paragraph.

**No company context for Pleo for a reader outside FinTech.** Pleo is well-known in European B2B FinTech but not a household name globally. A single line — *"Pleo is a corporate spend management platform, Series C/D, ~850 employees, operating across 18 European markets"* — gives a recruiter or founder the frame they need.

**Specific recommendations:**
- **[Critical]** Restructure the experience page with a scannable layout: company header → role + dates → 2–3 metrics as bullets → 1–2 sentence "what I learned" reflection. The current narrative format works well in a blog post but fails as a professional credential page.
- **[Important]** Add a one-line company descriptor for Pleo (and optionally McKinsey for younger readers who don't know it).
- **[Important]** Expand the current SVP role description — it currently says *"Same role, broader mandate"* which is the weakest entry on the page for the most senior position.

---

### D. Social Proof & Credibility Signals

**What's working:**

Nothing. There is genuinely nothing here. This is the section where the site breaks.

**What's missing or weak:**

Zero testimonials. Zero press mentions. Zero conference or podcast appearances. Zero advisory roles. Zero angel investments. The only external validation anywhere on this site is a LinkedIn link.

This is the most consequential gap for exec-level startup positioning. Here's why: at the Series A–D level, founders and VCs make hiring decisions on pattern recognition and trusted signal. They want to know who else has bet on this person. A site with no external credibility signals reads as: *"This person says they did impressive things, but I have no way to verify any of it."*

Every other section of this site describes what Stefan did at Pleo. That's all self-reported. Testimonials, press, and speaking gigs are the external audit. Without them, the site is a single-source claim.

At minimum, a personal site targeting senior roles should have:
- 3–5 testimonials from peers, founders, investors, or direct reports — with name, title, company
- 1–2 speaking engagements or podcast appearances listed
- If any angel investments exist, they signal ecosystem participation

**Specific recommendations:**
- **[Critical]** Solicit and add 3–5 testimonials. Former Pleo CTO, a VP who reports to Stefan, a founder from the ecosystem — anyone who can speak to working style and impact. These don't need to be long (2–3 sentences is fine) but they need name + title attribution.
- **[Critical]** If Stefan has spoken at any conferences, done any podcasts, or been quoted in any press, list them. Even a single external mention changes the credibility calculus.
- **[Important]** Add an advisory or investment section if applicable. Even informal advisory relationships signal ecosystem trust.

---

### E. Thought Leadership & Point of View

**What's working:**

The topics are well-chosen and genuinely differentiated. *"Goal Setting Doesn't Need Another Framework"* taking aim at OKR theater is exactly the kind of contrarian-but-earned take that gets shared at startups. *"Support Meetings, Not Status Meetings"* is a sticky reframe that people forward to their leadership teams.

The draft post pipeline is rich: European payment rail fragmentation, platform teams vs. feature teams, why approximations are underrated, physicist's path to FinTech — these are distinctive angles that no generic leadership blogger is writing about.

The 4 published posts are all from within the last 4 weeks (relative to site date). Recency is good.

**What's missing or weak:**

**8 draft posts are sitting invisible.** The writing exists. It just isn't published. From the outside, this site looks like someone who just started writing in February 2026. The draft pipeline would make this look like an active, prolific thinker. Right now, 4 posts is thin.

The homepage only surfaces 2 of the 4 published posts. This is a missed opportunity — a small blog roll or "recent posts" section that surfaces all 4 would help.

No Twitter/X, Substack, or any platform beyond LinkedIn is linked. LinkedIn is where Stefan's audience lives but it's also where everyone posts generic "5 lessons from 5 years in leadership" carousels. Having a secondary platform (even just a Substack for longer-form pieces) signals seriousness about building a public voice.

The homepage writing description is: *"I write about scaling organizations, payments infrastructure, and platform engineering."* That's accurate but generic. What's missing is the hook — what's the distinctive angle? Why follow this voice versus any other VP of Engineering writing online?

**Specific recommendations:**
- **[Critical]** Publish the draft posts. Pick the 3 best and publish them now. The pipeline is the asset — visibility is the bottleneck.
- **[Important]** Surface all published posts on the homepage, not just 2.
- **[Important]** Add a hook to the writing description. Something like: *"I write about the things most engineering leaders avoid thinking about: payment infrastructure complexity, how platform teams actually fail, and what it takes to build organizations that work without you in the room."*
- **[Nice-to-have]** Consider a Substack or newsletter. It gives people a way to follow without depending on them checking back.

---

### F. Contact & Call to Action

**What's working:**

LinkedIn and email are present in the theme's social links area. Email is accessible. The bottom of the homepage and About page both have CTAs. The Now page ends with *"If any of this overlaps with what you're working on, reach out."*

**What's missing or weak:**

The CTAs are soft. The homepage CTA is: *"Building in payments, scaling a platform org, or thinking about leadership at growth-stage? Let's connect on LinkedIn or email me."* This is fine for networking but has no urgency. There's no clear ask.

No Calendly or calendar link. For exec conversations, the path from "interested" to "on the calendar" should be one click. If someone has to send an email, wait for a reply, coordinate schedules — you've already lost half the conversations.

The protonmail address (`stefan_christensen@protonmail.com`) is a minor friction point — it signals privacy consciousness but some people will raise an eyebrow at using a privacy email for professional outreach. It's fine, just an observation.

**Specific recommendations:**
- **[Important]** Add a Calendly or cal.com link. One-click to schedule a 30-minute conversation is dramatically lower friction than cold email.
- **[Important]** Make the availability signal clearer. If open to conversations about roles, say so — even subtly. *"I'm exploratory about what's next — feel free to reach out if you're building something I should know about."* That's not desperate. It's direct.
- **[Nice-to-have]** Add a dedicated contact section or page with both LinkedIn, email, and calendar link in one place so it's always findable.

---

### G. Design & Aesthetics

**What's working:**

The Scandinavian minimalist approach is intentional, disciplined, and coherent. The custom SCSS is clean. 720px max-width, 17px body text, 1.75 line-height, negative letter spacing on headings — these are considered typographic choices. The site is visually uncluttered.

The navigation is clean. The "Now" page is a nice touch that signals someone who is engaged and current, not just maintaining a static CV site.

**What's missing or weak:**

**No photo makes this a text document, not a personal brand.** This is both a Section A finding and a design finding. Black-and-white minimalism is a legitimate aesthetic choice. Black-and-white minimalism with no face is just... a blog. The CSS rule `display: none !important` on `.avatar, .profile-image` is an active choice to remove humanity from the site. This is the wrong trade-off for exec positioning.

**The design has no distinctive personality.** "Minimal black and white" describes approximately 40% of developer personal sites built in the last five years. The hello-friend-ng theme is a recognizable open-source theme. Without customization beyond color stripping, the site looks like an unmodified template — even if the writing is original.

**System fonts are a defensible choice, but they vary by OS.** On macOS, `-apple-system` renders beautifully. On Windows, this falls through to Segoe UI and then Roboto. The reading experience is inconsistent. For an exec site, consider a single web font (even just for headings) that ensures consistency — something like Inter, DM Serif Display, or Playfair Display.

**"Powered by Hugo" in the footer.** This is a minor signal but the wrong one for exec positioning. The footer should say something like *"Stefan Christensen · 2026"* and nothing else. No one hiring a SVP Product & Engineering needs to know the static site generator powering his personal site.

**No custom Open Graph image.** When someone shares `stefanchristensen.me` in a Slack message, LinkedIn DM, or email, the preview card will either be blank or use a default. A custom OG image (1200×630, clean — name, title, brief tagline) would dramatically improve how the site appears when shared.

**Specific recommendations:**
- **[Critical]** Add a professional photo. It doesn't have to be large — a header headshot or even a small inset — but it is essential.
- **[Important]** Create a custom OG image so link shares look professional.
- **[Important]** Remove "Powered by Hugo" from the footer.
- **[Nice-to-have]** Consider a single display font for headings to differentiate from the generic system font appearance.

---

### H. Technical Quality

**What's working:**

- Meta description is set and specific in `hugo.toml`: *"SVP Product & Engineering at Pleo. Builder and operator scaling FinTech organizations..."* — solid.
- Keywords defined (though `<meta name="keywords">` has low SEO value in 2026, it doesn't hurt).
- `robots.txt` present and correctly configured with sitemap reference.
- Hugo auto-generates `sitemap.xml` — good.
- Mobile responsive via CSS breakpoints.
- HTTPS via GitHub Pages with custom domain.
- Static HTML = very fast load times by default.
- `canonifyURLs = true` set for GitHub Pages — correct.

**What's missing or weak:**

**No Open Graph tags confirmed.** The hello-friend-ng theme does generate basic OG tags using `hugo.toml` description, but without a custom OG image, shared links will look generic or blank on LinkedIn and Slack. This is a real problem for executive networking — links get shared constantly.

**No Person JSON-LD schema.** A `Person` schema in the `<head>` would tell Google that this is a personal site for a named professional with a specific role, employer, and expertise. This improves rich search results (Google Knowledge Panel) and is a 20-minute addition with meaningful long-term SEO benefit.

**Google Analytics is configured but there's no `googleAnalytics` ID in `hugo.toml`.** The privacy settings reference GA but there's no tracking code — meaning either there's no analytics at all, or the setup is incomplete.

**The `canonifyURLs = true` setting is a potential SEO footgun** in some Hugo versions — it can cause URL canonicalization issues. Should be tested.

**Specific recommendations:**
- **[Important]** Create a custom OG image and ensure it's referenced in the theme's head template.
- **[Important]** Add Person JSON-LD schema. This is a one-time addition to a custom layout file.
- **[Nice-to-have]** Set up proper analytics (Plausible or similar privacy-friendly analytics) if tracking traffic matters.
- **[Nice-to-have]** Verify `canonifyURLs` behavior in production — some Hugo themes handle this inconsistently.

---

## Top 5 Priorities

*Ranked by effort-to-impact ratio — highest impact first.*

---

**1. Add a professional photo** (effort: low, impact: critical)

This is the single highest-leverage change on the entire site. Personal brand requires a person. Founders and VCs who land on this site are evaluating: can I trust this person, can I introduce this person, can I picture this person in a boardroom? A face answers all three questions before a word is read. The current aesthetic choice to hide all avatars is actively working against the site's purpose.

**2. Add 3–5 testimonials** (effort: medium, impact: critical)

Every word on this site is self-reported. There is no external verification anywhere. For exec-level startup positioning — where someone might be placed as a COO, CPO, or VP Eng — founders want signal from other operators who've worked with this person. Three short quotes from a former CTO, a current direct report turned director, and a peer founder would transform the credibility posture of this site completely.

**3. Publish the draft posts** (effort: low, impact: high)

Eight posts exist and are written. They're invisible. The gap between "has been writing for years" and "just started a blog in February" is entirely in the draft folder. Publishing 3–5 of these would show the depth of the pipeline, give the blog real substance, and surface the distinctive angles (physics-to-FinTech, European payment rails, approximation thinking) that differentiate this voice from every other engineering leader blog.

**4. Restructure the experience page for scannability** (effort: medium, impact: high)

The experience page is well-written but fails the speed read. A recruiter or founder spending 45 seconds on this page should be able to extract: company, title, team size, 2–3 outcomes, dates — without reading every paragraph. Converting each role to a header + tight bullets would preserve the strong writing while enabling scan-first, read-second navigation. At the Series A–D level, people are pattern-matching fast — make the pattern visible.

**5. Create a custom Open Graph image and add a clear availability signal** (effort: low, impact: medium)

When someone shares `stefanchristensen.me` in a Slack DM to a founder or forwards it to a VC, the link preview is what they see first. A blank or generic preview undercuts the quality of everything else on the site. Thirty minutes to create a 1200×630 image with name, title, and a sharp tagline will make every shared link look polished. Paired with a cleaner availability signal on the homepage or Now page, this closes the gap between "nice portfolio site" and "this person is actively worth introducing."

---

## Overall Verdict

The copy is the best thing about this site — first-person, metric-dense, intellectually honest, with a genuinely memorable through-line (Physics → Payments → Platform). The writing voice is startup-native, the convictions section on the About page is exactly what senior hiring looks for, and the fact that 12 blog posts exist (even 8 in draft) shows someone who thinks in public.

But the site has a fundamental credibility problem: **it looks like someone saying impressive things about themselves with zero third-party evidence**. No photo, no testimonials, no press, no speaking — the external world does not appear on this site at all. For exec-level startup positioning, where every hire is a bet on trust and track record, this is disqualifying. A founder or VC who lands here thinks: *"Strong story, but who else vouches for this person, and what does this person actually look like?"*

The design is a secondary issue — clean and intentional, but the deliberate choice to hide all imagery while using an unmodified theme produces a site with no visual identity. It reads as a developer's minimal blog, not an executive's intentional personal brand.

Fix the photo. Add testimonials. Publish the drafts. Those three changes — all achievable in a week — would take this site from "impressive resume" to "executive personal brand worth forwarding."
