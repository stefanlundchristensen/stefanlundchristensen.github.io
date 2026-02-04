---
title: "Navigating European Payment Rails: What Every FinTech Builder Should Know"
date: 2026-01-28
draft: true
tags: ["payments", "europe", "infrastructure"]
categories: ["FinTech", "Payments"]
---

Most American FinTech companies underestimate European payments. They see the EU as one market and assume Stripe or Adyen will handle the complexity. Then they discover why their conversion rates in Germany are half what they expected, or why their Dutch customers abandon checkout.

Building payment infrastructure across Europe isn't just different from the US—it's fundamentally fragmented in ways that seem irrational until you've operated there. That fragmentation creates real complexity, but also defensible advantages for those who navigate it well.

## The European Payment Ecosystem

Unlike the relatively unified US market, Europe has:
- 27+ different regulatory regimes (though harmonized by PSD2/PSD3)
- Multiple card networks with varying market share by country
- Diverse Account-to-Account (A2A) payment schemes
- Wildly different customer preferences—Germans expect direct debit (Lastschrift), the Dutch expect iDEAL, Swedes won't use cards for person-to-person transfers

### Card Payments

While Visa and Mastercard dominate, local schemes control significant volume:
- Cartes Bancaires in France (the majority of card transactions)
- Girocard in Germany (used more than Visa/Mastercard at physical POS)
- Bancontact in Belgium (near-universal for local payments)

When I worked on payment strategy at McKinsey, we saw retailers lose 15-20% of potential transactions in Germany by not supporting Girocard. Customers would reach checkout, see only Visa/Mastercard, and leave.

### A2A Payments

The rise of open banking has accelerated A2A payments:
- SEPA Instant for real-time transfers (now mandatory for all banks in the eurozone)
- Local schemes like iDEAL (Netherlands, 65%+ of e-commerce transactions), Swish (Sweden, near-universal for P2P)
- Emerging Request-to-Pay standards

The economics are compelling—interchange of 0.2% or less versus 1.5-2.9% for cards. At Pleo, shifting high-volume transactions to A2A rails saved meaningful basis points on payment costs. For certain use cases like invoice payments or large B2B transactions, customers actually prefer bank transfers over cards.

## Regulatory Navigation

PSD2 transformed European payments, but implementation varies:
- Strong Customer Authentication (SCA) requirements
- Open banking API standards (but execution differs)
- Different licensing requirements by business model

Success requires understanding not just the EU directives, but how each country interprets and enforces them. I've seen companies get approved in one market only to spend six months navigating a different regulator's interpretation of the exact same rule in another.

## Building for Scale

If you're building payment infrastructure in Europe:

1. **Start local, plan global**: Perfect one market, then expand systematically
2. **Invest in compliance infrastructure**: It's table stakes, not a differentiator
3. **Build abstraction layers**: Your product shouldn't know about payment rail complexity
4. **Monitor regulatory changes**: PSD3 is coming, and it will shift the landscape again

The complexity is real, but so is the opportunity. Europe's fragmentation creates defensible moats for those who build the right infrastructure.

---

*Thoughts on European payments? [Let's discuss](/about/).*
