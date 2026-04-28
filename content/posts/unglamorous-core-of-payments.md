---
title: "The Unglamorous Core of Payments"
date: 2026-04-26
draft: true
tags: ["payments", "infrastructure", "settlement", "clearing", "fintech"]
categories: ["FinTech", "Payments"]
description: "The smooth checkout is an illusion. The unglamorous infrastructure work behind it is where payments actually live."
---

The customer expected €110.37 in their account. What they saw was €81.22.

The call came in to support, then to operations, then to engineering. The team spent weeks — not days, weeks — tracing where €29.15 had gone. Through systems they thought they understood. Through partner integrations they had signed off on. Through ledger entries that nearly balanced.

This is what most of the work in payments looks like. Not the smooth checkout. Not the elegant card. A customer wanting to know why their money looks wrong, and the long quiet effort to give them a real answer.

This is also why payments is unforgiving in a way most software isn't. The customer cares about €29.15 of their own money more than they care about almost anything you'll ship this quarter. There is no graceful degradation, no "we'll get to it next sprint" that the customer will accept. The number is wrong, and the number is theirs, and they want it to be right today.

## Where money actually moves

Most people who build on top of payments rarely think about where money truly moves. The instinct is to imagine money flowing the way information does, through some abstract network, settling at the speed of the API call. That isn't what happens.

Money, the actual currency, the kind you can't just journal in a database, moves between a small number of institutions that hold accounts at a central bank. In Europe, the ECB's instant payment settlement system, TIPS, has roughly 123 direct participants. The wholesale euro system, T2, sits in the low thousands. Card schemes settle through a handful of designated banks. Whichever rail you look at, the picture is similar: a small core of direct participants, and an enormous population of fintechs, processors, and indirect banks layered on top of them.

Inside that core, currency moves on a schedule. Some rails settle once a day. Some a few times a day. The instant rails come close to continuous, but still inside discrete cycles with their own cut-offs and operating windows. The smooth UX you see at checkout, in the app, on the receipt: none of that is the moment money moves. That moment happens later, somewhere else, between parties most of your customers will never hear of.

## The illusion of instant

Take the cross-border money transfer experience that defined a generation of consumer fintech. You enter an amount in one currency, you tap send, and seconds later the recipient has the money in another currency. It feels instant, though almost none of the money has moved yet.

What's happening underneath is that the provider holds liquidity in both currencies. Your money goes into the local pool on one side. The recipient is paid out from the local pool on the other side. The two pools are reconciled later, through the actual settlement layer, on the rails' own schedule. The provider takes some FX risk in the middle and prices it into the rate. The customer experience is real-time. The money movement is not.

A more recent version is the smart corporate card. We built one that picks the optimal currency at the moment of the tap. The cardholder doesn't make a choice. They just tap, and the card decides which wallet to charge based on the merchant's currency, the available balances, and the FX implications.

To the cardholder, that's a single instant action. Underneath sit scheme authorisation, FX, fees, and a settlement chain that takes days. The product is the illusion. The illusion is the right thing for the customer.

But understanding that it is an illusion changes what you build. If you forget, you treat the smooth surface as the real system. You miss what's moving underneath and when. And then, later, a customer calls about €81.22.

## Where the illusion breaks

Return to that customer. Why is the number wrong?

There are a small set of usual suspects, all unglamorous. The FX rate moved between authorisation and settlement, so the amount finally posted is different from the amount the customer saw at the tap. A fee was applied somewhere along the chain, the card scheme's, the issuer's, an intermediary's, and the customer didn't see it on the receipt. A return came back from the other side of the rail, days later, in a slightly different shape than it left.

The ten-day return is the worst version. An outbound payment leaves the system at one FX rate. Something downstream rejects it. It comes back ten days later at a different FX rate. The amount no longer matches the original. The two sides of the entry don't square. You now have a reconciliation gap, and a reconciliation gap is a P&L gap. The only way to close it is to go all the way down: which rail, which intermediary, which timestamp, which FX source, which fee. You explain the missing €29.15 line by line, or you eat it.

The other reasons live in the same place. A field in a payment message that the sender and the receiver interpret differently. A hold somewhere downstream waiting on a cut-off you didn't know about. An intermediary correspondent in the chain that nobody in the partnership conversation mentioned, because they didn't think it was worth mentioning. None of this shows up in a roadmap. All of it determines whether the product works on day 400.

## The ledger you didn't build

Here is the contrarian view that follows from all of this. Almost every fintech, at almost any size, is too late to start building a proper ledger. By the time the team agrees they need one, they have been running for years on a patchwork of partner reports, internal reconciliations, and brittle batch jobs. The cost of building it then is much higher than the cost of having built it earlier. And the product is shipping money on top of a system nobody can fully see.

A ledger is the only honest record of how money is moving through your business, and treating it as plumbing you can defer is the misread that gets the most teams in trouble. It tells you, in real time, what you owe whom, what you are holding, what has not settled yet, what is at risk if a partner falls over tomorrow. Without it, you have a smooth UX on top and a fog underneath. Customers occasionally call about the fog.

The advantages compound. Resilience when a partner has an incident. Speed when finance closes the month. A clear answer when a regulator asks a question that doesn't fit into a spreadsheet. None of these are visible to the customer. All of them are why the customer's experience holds up over years instead of months.

The reason teams defer a ledger isn't laziness. There is always something more pressing. A new market to launch. A compliance deadline. A feature the commercial team needs by next quarter. A ledger looks like internal plumbing while the roadmap fills with revenue-shaped initiatives, and so it gets pushed. The teams that build one early are the ones whose leadership has decided that being able to see your own money is a feature, even when no customer is asking for it.

The unglamorous infrastructure work in this post, the formats, the cut-offs, the returns, the FX timing, is in the end a single piece of work. It is the work of seeing your own money clearly. A ledger is what makes that possible. Build it before you think you need it. By the time you think you need it, you already did.

## The kind of person who likes this

The reason to do this work is that it is hard. Not the kind of hard you finish in ten minutes and move on from. The kind that asks you to go to the core: customers, money movements, technology, and people, all at once, in the same problem, with the same answer.

That is a rare combination, and the leaders who build payments that hold up are the ones who want exactly that. They light up when the question gets specific. They want to know which rail, which timestamp, which fee, which intermediary. They will read the message format. They will trace €29.15 through six systems on a Tuesday because the customer wants their money to make sense, and because the work itself is interesting.

The smooth experience on top exists only because someone wanted that.
