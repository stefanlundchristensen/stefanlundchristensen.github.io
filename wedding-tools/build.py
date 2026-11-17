from pathlib import Path
from icons import PROGRAMME, svg  # shared with the printed invitation (Bryllup/print-suite/icons)
root=Path(__file__).resolve().parent.parent/'public'/'wedding'
directions=[('supper','01','Supper Club','Et langt bord. Et stort hjerte.','Papircollage, bordeaux og den lange, levende middag.'),('letter','02','Love Letter','Et kærligt brev til jer.','Luftigt, håndskrevet og intimt. Som at folde invitationen ud.'),('gazette','05','Wedding Gazette','En ganske særlig lørdag.','Aviskolonner, små rubrikker og et festligt tillæg.')]
theme_colors={'supper':'#f3eedf','letter':'#f7f1e7','gazette':'#eae2d1'}
fonts='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap">'
viewport='<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
programme_html='<ol class="tl">'+''.join(
  f'<li>{svg(icon, 34)}<span>' + (f'<b>{time}</b>' if time else '') + f'{title}</span></li>'
  for icon, time, title in PROGRAMME)+'</ol>'

def page(theme,num,name,prefix):
 return f"""<!doctype html>
<html lang="da" data-theme="{theme}">
<head>
<meta charset="utf-8">
{viewport}
<meta name="theme-color" content="{theme_colors[theme]}">
<meta name="color-scheme" content="light">
<meta name="robots" content="noindex,nofollow">
<title>S + C · Bryllupsfest · 6. marts 2027</title>
<meta name="description" content="Alt om vores bryllupsfest den 6. marts 2027 kl. 15 på Pakhus 11. Praktiske detaljer og svar på invitationen.">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:url" content="https://stefanchristensen.me/wedding/">
<meta property="og:title" content="S + C · Bryllupsfest 6. marts 2027">
<meta property="og:description" content="Lørdag den 6. marts 2027 kl. 15 på Pakhus 11. Find detaljerne, og svar på invitationen her.">
<meta property="og:image" content="https://stefanchristensen.me/wedding/assets/share-4.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Et rødt akvarelhjerte med S + C, holdt af to hænder, og ordet Bryllupsfest.">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{prefix}assets/embrace.svg" type="image/svg+xml">
{fonts}
<link rel="stylesheet" href="{prefix}assets/site.css?v=20261117c">
<script defer src="{prefix}assets/config.js?v=20261117c"></script>
<script defer src="{prefix}assets/site.js?v=20261117c"></script>
</head>
<body>
<a class="skip" href="#praktisk">Gå til praktisk information</a>
<header>
<a class="logo" href="#top">S + C<span>6. marts 2027</span></a>
<nav aria-label="Navigation"><a href="#dagen">Dagen</a><a href="#praktisk">Godt at vide</a><a href="#svar" data-before>Svar på invitationen</a></nav>
</header>
<main id="top">

<section class="hero">
<div class="edition"><span>LØRDAG · 06.03.2027 · KL. 15</span><span>EN DAG MED ALLE VORES MENNESKER</span></div>
<div class="hero-grid">
<div class="hero-copy">
<p class="hand">Kære alle jer, vi holder af.</p>
<h1>Bryllups<br><em>fest!</em></h1>
<p class="intro">Vi har inviteret dig og en masse andre dejlige mennesker – alle vores yndlingsmennesker – til bryllupsfest. Vi blev gift for syv år siden, så vi tænker, at det må være tid nok.</p>
<a class="button" href="#svar" data-before>Vi håber, du kommer <span aria-hidden="true">→</span></a>
</div>
<figure class="art heart-art">
<div class="heart-wrap"><img src="{prefix}assets/hjerte-stor.webp" width="900" height="936" fetchpriority="high" alt="Et rødt hjerte malet i akvarel, holdt af en lyseblå og en lilla hånd."><span aria-hidden="true">S <i>+</i> C</span></div>
<figcaption><span class="hand">Lige fra hjertet.</span><b>6.3.27</b></figcaption>
</figure>
</div>
<div class="hero-bottom"><span>INVITATIONEN FORTSÆTTER HER</span><a href="#dagen">Alle de små detaljer ↓</a></div>
</section>


<section id="efter" class="section after" hidden>
<p class="hand">Tak for i går.</p>
<h2>Tusind tak, <em>fordi I kom.</em></h2>
<p>Vi har samlet billederne fra festen ét sted. Læg gerne dine egne derind, så vi alle kan se natten fra hinandens vinkler.</p>
<a class="button" id="album-link" href="#" target="_blank" rel="noopener" hidden>Se og del billederne <span aria-hidden="true">→</span></a>
<p class="small" id="album-pending">Billedalbummet kommer her, så snart det er klar.</p>
</section>

<section id="dagen" class="section day">
<p class="eyebrow">01 / SÆT ET KRYDS</p>
<div class="two-column">
<h2>En dag.<br>Et ja.<br> <em>Og jer.</em></h2>
<div class="story">
<p class="lead">Den 6. marts 2027 kl. 15 samler vi vores yndlingsmennesker på Pakhus 11.</p>
<p>Her finder I alt det, der ikke kunne være på invitationen. Vi opdaterer siden, efterhånden som detaljerne falder på plads.</p>
<p class="hand countdown" id="countdown" hidden></p>
<div class="date-card"><span>LØRDAG</span><b>06.03.27</b><span>START</span><b>kl. 15:00</b><span>STED</span><b>Pakhus 11</b><button type="button" id="calendar">Gem datoen i kalenderen <span aria-hidden="true">↓</span></button></div>
<p class="small address">Dampfærgevej 2, 2100 København Ø · <a href="https://www.google.com/maps/search/?api=1&amp;query=Pakhus+11%2C+Dampf%C3%A6rgevej+2%2C+2100+K%C3%B8benhavn+%C3%98" target="_blank" rel="noopener">Se på kort <svg class="ext" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 9 3M4.2 3H9v4.8"/></svg></a></p>
</div>
</div>
</section>

<section class="section programme">
<p class="eyebrow">02 / DER ER NOGET GODT I VENTE</p>
<h2>Fra første kram<br>til <em>sidste dans.</em></h2>
<p>Vi begynder kl. 15.00 på Pakhus 11 og slutter kl. 02.00.</p>
{programme_html}
</section>

<section id="praktisk" class="section practical">
<p class="eyebrow">03 / GODT AT VIDE</p>
<div class="two-column">
<div class="practical-intro"><h2>De små<br> <em>detaljer.</em></h2><p>Så du kan bruge energien<br>på at glæde dig.</p><img class="small-embrace" src="{prefix}assets/hjerte.webp" width="480" height="499" alt=""></div>
<div class="questions">
<details open><summary>Hvor og hvornår?<span aria-hidden="true">+</span></summary><p>Lørdag den 6. marts 2027 kl. 15:00 på Pakhus 11, Dampfærgevej 2, 2100 København Ø. Festen slutter kl. 02:00.</p><p><a class="mail-link" href="https://www.google.com/maps/search/?api=1&amp;query=Pakhus+11%2C+Dampf%C3%A6rgevej+2%2C+2100+K%C3%B8benhavn+%C3%98" target="_blank" rel="noopener">Åbn i kort <svg class="ext" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 9 3M4.2 3H9v4.8"/></svg></a></p></details>
<details><summary>Find vej<span aria-hidden="true">+</span></summary><p>Pakhus 11 ligger på Dampfærgevej 2 ved Amerika Plads. Nærmeste station er Nordhavn, cirka 10 minutters gang derfra. Der er ret få parkeringspladser i området, så tag gerne metro, bus, cykel eller taxa. Indgangen skriver vi her, når dagen nærmer sig.</p></details>
<details><summary>Påklædning<span aria-hidden="true">+</span></summary><p>Helt afslappet. Kom i det, du har det bedst i. Der er ingen grund til at finde det store frem. Alt foregår indenfor, men Pakhus 11 ligger smukt helt nede ved vandet, så tag en god jakke med, hvis du vil ud og trække vejret.</p></details>
<details><summary>Allergier &amp; andre hensyn<span aria-hidden="true">+</span></summary><p>Skriv allergier og andre hensyn, vi skal tage, i dit svar nedenfor. Så sørger vi for, at der er noget godt til alle.</p></details>
<details><summary>Taler &amp; indslag<span aria-hidden="true">+</span></summary><p>Jonas Larsen er toastmaster og holder styr på aftenens taler og indslag. Skriv til ham, hvis du vil sige noget, har planlagt et indslag eller har et spørgsmål.</p><p><a class="mail-link" id="toastmaster-mail" hidden>Skriv til Jonas <span aria-hidden="true">→</span></a><span id="toastmaster-pending">Jonas' mailadresse kommer her.</span></p><p class="small" hidden>Knappen åbner en færdig mail i dit mailprogram. Du kan også skrive direkte til <a id="toastmaster-address" href="#"></a>.</p></details>
<details><summary>Gaver &amp; ønsker<span aria-hidden="true">+</span></summary><p>Det vigtigste er, at I kommer. Har I lyst til at give en gave, samler vi vores ønsker ét sted.</p><p><a class="mail-link" id="wishlist-link" target="_blank" rel="noopener" hidden>Se ønskelisten <svg class="ext" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 9 3M4.2 3H9v4.8"/></svg></a><span id="wishlist-pending">Ønskelisten kommer her.</span></p></details>
<details><summary>Børn<span aria-hidden="true">+</span></summary><p>Festen er for de voksne. De allermindste, der endnu ikke kan undvære mor og far, er selvfølgelig velkomne.</p></details>
<details><summary>Andre spørgsmål<span aria-hidden="true">+</span></summary><p>Ring eller skriv til Stefan, så finder vi ud af det.</p><p><a class="mail-link" href="tel:+4521725185">+45 21 72 51 85</a></p></details>
</div>
</div>
</section>

<section id="svar" class="section reply" data-before>
<p class="eyebrow">04 / ET LILLE SVAR BETYDER MEGET</p>
<div class="two-column">
<div class="reply-copy">
<p class="hand">Ingen fest uden gæster.</p>
<h2>Er du<br> <em>med?</em></h2>
<p>Ét svar pr. invitation. Skriv navnene på alle, svaret gælder for.</p>
<p class="small" id="deadline">Svar senest 6. januar 2027.</p>
</div>
<div class="form-paper">
<p id="form-notice" class="form-notice" role="status">Tilmeldingen åbner snart. Indtil da kan du se, hvad vi spørger om.</p>
<form id="rsvp-form" method="post">
<fieldset id="rsvp-fields" disabled>
<legend class="sr-only">Svar på invitationen</legend>
<div class="step">
<fieldset class="attendance">
<legend>Kommer I? <span class="req">*</span></legend>
<label><input type="radio" name="attendance" value="yes" required> Ja, vi glæder os!</label>
<label><input type="radio" name="attendance" value="no" required> Vi må desværre melde afbud</label>
</fieldset>
</div>
<div class="step">
<label for="names">Hvem svarer du for? <span class="req">*</span></label>
<input id="names" name="names" autocomplete="name" autocapitalize="words" enterkeyhint="next" maxlength="300" required placeholder="Alle navne på invitationen">
</div>
<div id="attending-fields" hidden>
<div class="step">
<label for="count">Hvor mange kommer I? <span class="req">*</span></label>
<input id="count" name="guest_count" type="number" min="1" max="20" inputmode="numeric" enterkeyhint="next" placeholder="Antal gæster">
</div>
<div class="step">
<label for="diet">Allergier og andre hensyn <span class="optional">valgfrit</span></label>
<textarea id="diet" name="allergies_and_needs" maxlength="1500" rows="3" placeholder="Fx allergier, vegetar eller andet, vi skal tage hensyn til. Skriv gerne, hvem det gælder."></textarea>
</div>
<div class="step">
<label for="song">Hvilken sang får dig på dansegulvet? <span class="optional">valgfrit</span></label>
<input id="song" name="song" maxlength="200" enterkeyhint="next" placeholder="Kunstner og titel">
</div>
</div>
<div class="step">
<label for="email">Hvilken e-mail kan vi fange dig på? <span class="req">*</span></label>
<input id="email" name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" maxlength="254" required placeholder="dig@eksempel.dk">
</div>
<div class="step">
<label for="message">En lille hilsen til os <span class="optional">valgfrit</span></label>
<textarea id="message" name="message" maxlength="2000" rows="3" placeholder="Noget, vi skal vide?"></textarea>
<p class="privacy">Dit svar gemmes i vores eget Google-regneark og bruges kun til planlægningen af brylluppet. Skriv kun de oplysninger, vi har brug for.</p>
</div>
<div class="honey" aria-hidden="true"><label>Lad feltet være tomt<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
<div class="step-nav">
<span class="step-progress" id="step-progress" hidden></span>
<button type="button" class="step-back" id="step-back" hidden><span aria-hidden="true">←</span> Tilbage</button>
<button type="button" class="button" id="step-next" hidden>Næste <span aria-hidden="true">→</span></button>
<button class="button submit" type="submit">Send vores svar <span aria-hidden="true">→</span></button>
</div>
</fieldset>
<p id="form-result" role="status" aria-live="polite" tabindex="-1"></p>
</form>
<noscript><p>Aktivér JavaScript for at åbne tilmeldingen. Du kan også ringe til Stefan på +45 21 72 51 85.</p></noscript>
</div>
</div>
</section>

</main>
<footer><a class="logo" href="#top">S + C</a><p>6. marts 2027<br><span class="hand">Vi glæder os til at se jer.</span></p><a href="#top">Til toppen ↑</a></footer>
<div id="toast" role="status" aria-live="polite"></div>
</body>
</html>
"""
(root/'index.html').write_text(page('supper','01','Supper Club',''))
print('Built the wedding page (01 Supper Club).')
