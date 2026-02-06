---
title: "Navigating European Payment Rails: What Every FinTech Builder Should Know"
date: 2026-01-28
draft: true
tags: ["payments", "europe", "infrastructure"]
categories: ["FinTech", "Payments"]
---

Your checkout works perfectly in the US. Then you launch in Germany and conversion drops 40%.

You integrated Stripe. You handle Visa and Mastercard. What's the problem?

The problem is that Germans use Girocard, and you don't support it. Your Dutch customers expect iDEAL. Your French customers want Cartes Bancaires. The payment method you've never heard of is the one everyone in that market actually uses.

Building payment infrastructure across Europe isn't just different from the US—it's fundamentally fragmented in ways that seem irrational until you've operated there.

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

At McKinsey, we analyzed a retailer losing 15-20% of German transactions. They supported Visa and Mastercard. Customers reached checkout, saw no Girocard option, and left. The fix wasn't better marketing or pricing—it was adding the payment method Germans actually use.

### A2A Payments

The rise of open banking has accelerated A2A payments:
- SEPA Instant for real-time transfers (mandatory as of January 9, 2025 for receiving payments; October 2025 for sending—all eurozone banks must process payments within 10 seconds, 24/7)
- Local schemes like iDEAL (Netherlands, 65%+ of e-commerce transactions), Swish (Sweden, near-universal for P2P)
- Emerging Request-to-Pay standards

The economics are compelling—interchange of 0.2% or less versus 1.5-2.9% for cards. I've seen FinTech companies shift high-volume transactions to A2A rails and save meaningful basis points on payment costs. For invoice payments and large B2B transactions, customers actually prefer bank transfers. Lower cost and their preferred method.

The market is shifting. While fragmentation remains a challenge today, Worldpay's 2025 Global Payments Report shows convergence around digital methods: cards are projected to drop to just 33% of e-commerce payments by 2026, with digital wallets and A2A payments gaining share. The landscape is fragmenting and consolidating simultaneously—local methods still matter, but the future tilts toward digital rails.

## Regulatory Navigation

PSD2 transformed European payments, but implementation varies:
- Strong Customer Authentication (SCA) requirements
- Open banking API standards (but execution differs)
- Different licensing requirements by business model

Success requires understanding not just the EU directives, but how each country interprets them. I've seen this three times in the past two years at McKinsey and Pleo. Same business model, same license type. France approved in three months. Germany took six. The rule was identical. The regulator's interpretation wasn't.

## Building for Scale

If you're building payment infrastructure in Europe:

1. **Start local, plan global**: Perfect one market, then expand systematically
2. **Invest in compliance infrastructure**: It's table stakes, not a differentiator
3. **Build abstraction layers**: Your product shouldn't know about payment rail complexity (this is also a core principle of [platform engineering](/posts/platform-engineering-approach/)--sensible defaults and opinionated paths over maximum optionality)
4. **Monitor regulatory changes**: PSD3 is expected to be adopted in 2025-2026, expanding scope to BNPL, cryptocurrencies, and digital identities while mandating standardized APIs. The integration patterns you build today will need to adapt—plan for flexibility

The complexity is real, but so is the opportunity. Europe's fragmentation creates defensible moats for those who build the right infrastructure. (For practical lessons on building that infrastructure--from mapping money flows to managing partner relationships--see my post on [hard-won lessons from building payment systems at scale](/posts/payment-systems-lessons/).)

Modern payment platforms help manage this complexity. Providers like Stripe and Adyen support 250+ local payment methods through a single integration, handling the fragmentation so you can focus on your product. But even with these platforms, you still need to understand which methods to enable in which markets—technology can simplify integration, but it can't substitute for market knowledge.

---

## Further Reading

Key resources on European payment infrastructure and regulations:

- **[EU Instant Payments: Challenges and Compliance](https://www.ey.com/en_gl/insights/financial-services/emeia/eu-instant-payments-regulation-five-key-hurdles-for-banks-to-clear)** by EY - Five key hurdles including AML checks within 10 seconds
- **[European Payment Landscape 2025: Data-Driven Report](https://www.tembi.io/blog/payment-providers-in-european-e-commerce-a-country-by-country-analysis)** by Tembi - Country-by-country analysis of payment method market share
- **[Worldpay Global Payments Report 2025](https://www.worldpay.com/en/global-payments-report)** - Comprehensive data on payment trends, showing card share dropping to 33% by 2026
- **[From PSD2 to PSD3: What's Changing in Europe](https://www.trustbuilder.com/en/psd2-psd3-directive-future-payments-europe/)** by TrustBuilder - Overview of PSD3's expanded scope and timeline

*Building payment infrastructure in Europe? [Let's discuss](/about/).*
