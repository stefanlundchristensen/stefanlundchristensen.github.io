# S + C wedding website

Plain HTML, CSS and JavaScript. No install, build dependencies, API keys or server.

- `public/wedding/index.html`: starting website, Supper Club direction.
- `public/wedding/variations.html`: comparison gallery with three complete directions.
- `public/wedding/directions/`: Supper Club, Love Letter, Wedding Gazette (Red Poster and Blue Picnic were dropped).
- `public/wedding/assets/config.js`: public RSVP settings.
- `build.py`: generates the HTML from one shared template. Edit copy here and run `python3 wedding-tools/build.py` from repository root. CSS and JS are edited directly in `public/wedding/assets/`. The hero uses `banquet.webp` and `banquet-800.webp` (made with `cwebp` from `banquet.png`, which is no longer referenced by any page).

All directions use the custom generated banquet illustration and preserve differently coloured hands at different heights. Date and initials come from the invitation. Confirmed: Pakhus 11, start 15:00, programme order, casual dress code, toastmaster Jonas Larsen. Also confirmed: Dampfærgevej 2, ends 02:00, RSVP deadline 6 January 2027, adults only except the very youngest, questions to Stefan by phone. Still open: the wish-list link (`wishlistUrl` in `config.js`) and the toastmaster's email (`toastmasterEmail` in `config.js`; the "Skriv til Jonas" button stays hidden until it is set).

## Local preview

From repository root: `python3 -m http.server 8000 --directory public`
Open `http://localhost:8000/wedding/variations.html` or `/wedding/`.

## Exact target: stefanchristensen.me/wedding/

The domain already serves a personal homepage. Copy the **whole `wedding/` folder** into the published root of the repository that currently serves stefanchristensen.me, and include it in that website's normal Pages output. For a framework, put it under the framework's public/static folder. Keep the personal site's existing homepage, CNAME, build and workflow intact. Relative asset paths work at `/wedding/` and under repository preview URLs. No CNAME is added by this project.

A separate project site in a repository called `Bryllup` normally uses `/Bryllup/`, not `/wedding/`. A CNAME changes the hostname, not that path. Do not point the personal domain at this repository to solve a path problem.

The included `.github/workflows/wedding-pages.yml` is a **manual preview deployment for this repository**. Set Settings → Pages → Source to GitHub Actions, then run the workflow. It uploads only `wedding-site/wedding`, so that repository's Pages root opens the wedding page and `/variations.html` opens the gallery. This workflow is not intended to replace the personal website's deployment. It does not run automatically on push.

## Enable real RSVPs (Google Sheet + mail)

GitHub Pages hosts static files; it does not receive form submissions. The form posts to a small Google Apps Script (`wedding-tools/rsvp-apps-script.gs`) that adds a row to a Google Sheet and sends a notification mail. It stays closed until the steps below are done.

1. Create a new Google Sheet (any name, e.g. "S + C svar") in the Google account that should own the answers.
2. In the Sheet: Extensions → Apps Script. Replace the sample code with the contents of `rsvp-apps-script.gs`. Optionally set `NOTIFY_EMAIL` at the top (empty = the account's own address). Save. Then pick `setup` in the function menu and press Run once: it creates the "Svar" tab and an "Overblik" tab with live totals, all allergies and all song wishes.
3. Deploy → New deployment → type "Web app". Execute as: **Me**. Who has access: **Anyone**. Approve the permissions Google asks for (edit this spreadsheet, send mail as you).
4. Copy the web app URL (`https://script.google.com/macros/s/…/exec`). Opening it in a browser should show `{"ok":true,"service":"S + C RSVP"}`.
5. Paste the URL into `public/wedding/assets/config.js` as `rsvpEndpoint` and set `rsvpOpen: true`.
6. Send a test answer from the page (yes and no). Check the row in the "Svar" tab and the mail. Delete the test rows afterwards.

After changing the script, use Deploy → Manage deployments → edit → Version: New version. That keeps the same URL. A "New deployment" gives a new URL.

One response per invitation: guest names, email, yes/no, conditional guest count, allergies and other needs, optional message. A decline hides and excludes attendance-specific inputs. Data is sent by POST to the script, never saved in Git, localStorage or URL parameters. The success message appears only when the script itself answers `{"ok":true}`. Failure retains entered values; an ambiguous timeout asks the guest to check directly rather than assume failure. RSVP stays disabled if `rsvpEndpoint` is missing or is not a script.google.com web app URL. The script ignores submissions that fill the hidden honeypot field, escapes text that would run as a spreadsheet formula, and does not mail guests (so it cannot be used to send mail to strangers). Google's free quota is about 100 mails a day.

The `noindex` directive discourages search indexing; it is not access control. GitHub Pages content is public. Do not add guest lists or private event details unless you intend visitors with the link to read them.

## Verification

Run `python3 wedding-tools/check.py`, `node wedding-tools/check-form.cjs` and `node --check public/wedding/assets/site.js`.
Browser verification and live deployment are outstanding: the current execution environment blocks local server sockets and cannot resolve the GitHub API/source host. No live deployment or real RSVP submission is claimed.

References: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages · https://developers.google.com/apps-script/guides/web

## Astro homepage integration check

Inspected the local `stefanlundchristensen.github.io` repository. It uses static Astro output, `public/CNAME` for stefanchristensen.me and the existing Astro Pages deployment workflow. The wedding directory can be copied into `public/wedding/`; its standalone HTML does not import the homepage layout or global styles.

`astro-wedding-integration.zip` is rooted at `public/wedding/` and contains the starting page, all five variations and assets. Extract it at the Astro repository root. No existing files need replacing.

Direct copying was blocked because the current session can write only inside Bryllup and temporary directories. The target repository was not modified. A build in a temporary copy failed on a pre-existing missing `markdown-it` dependency; the same failure occurred with the wedding directory removed. Run `npm ci` in the homepage repository to restore its declared dependencies, then build. Wedding link/form checks passed independently. RSVP still needs the Apps Script web app URL.
