(() => {
  'use strict';
  const config = window.WEDDING_CONFIG || {};
  const form = document.querySelector('#rsvp-form');
  const fields = document.querySelector('#rsvp-fields');
  const result = document.querySelector('#form-result');
  const notice = document.querySelector('#form-notice');
  // The receiver is a Google Apps Script web app that writes to our Google Sheet.
  const endpointReady = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]{20,}\/exec$/.test(config.rsvpEndpoint || '');
  const enabled = config.rsvpOpen === true && endpointReady;
  document.querySelector('#deadline').textContent = config.deadlineText || 'Svar senest 6. januar 2027.';
  if (enabled) {
    fields.disabled = false;
    form.action = config.rsvpEndpoint;
    notice.textContent = 'Vi glæder os til at høre fra jer.';
  }
  // Toastmaster: a pre-filled email, shown only when an address is configured.
  const mail = document.querySelector('#toastmaster-mail');
  if (mail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(config.toastmasterEmail || '')) {
    const subject = 'Bryllupsfest S + C 6/3 · Tale, indslag eller spørgsmål';
    const body = [
      'Hej Jonas', '',
      'Jeg vil gerne bidrage til S + C\'s bryllupsfest lørdag den 6. marts 2027.', '',
      'Hvad: tale / sang / indslag / spørgsmål (slet det, der ikke passer)',
      'Fra: ',
      'Varighed, cirka: ___ minutter',
      'Jeg har brug for: mikrofon / skærm / musik / andet: ',
      'Mobilnummer: ', '',
      'Kort om idéen:', '', '', '',
      'Kærlig hilsen', ''].join('\r\n');
    mail.href = `mailto:${config.toastmasterEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    mail.hidden = false;
    const plain = document.querySelector('#toastmaster-address');
    if (plain) { plain.textContent = config.toastmasterEmail; plain.href = mail.href; plain.parentElement.hidden = false; }
    const pending = document.querySelector('#toastmaster-pending');
    if (pending) pending.hidden = true;
  }
  const wishlist = document.querySelector('#wishlist-link');
  if (wishlist && /^https:\/\/\S+$/.test(config.wishlistUrl || '')) {
    wishlist.href = config.wishlistUrl;
    wishlist.hidden = false;
    const pending = document.querySelector('#wishlist-pending');
    if (pending) pending.hidden = true;
  }
  // Countdown to the party (15:00 Danish time). Hidden once the day has passed.
  const countdown = document.querySelector('#countdown');
  if (countdown) {
    const days = Math.ceil((Date.UTC(2027, 2, 6) - Date.now()) / 86400000);
    if (days >= 0) {
      countdown.textContent = days === 0 ? 'Det er i dag!' : days === 1 ? 'I morgen!' : `Om ${days} dage`;
      countdown.hidden = false;
    }
  }
  // After the party (from 06:00 on 7 March 2027, or ?efter for a preview): thank-you and photo album first,
  // RSVP and its links out of the way.
  const after = Date.now() >= Date.UTC(2027, 2, 7, 5) || /[?&]efter\b/.test(location.search);
  const thanks = document.querySelector('#efter');
  if (after && thanks) {
    thanks.hidden = false;
    document.querySelectorAll('[data-before]').forEach((el) => { el.hidden = true; });
    if (countdown) countdown.hidden = true;
    const album = document.querySelector('#album-link');
    if (album && /^https:\/\/\S+$/.test(config.albumUrl || '')) {
      album.href = config.albumUrl;
      album.hidden = false;
      document.querySelector('#album-pending').hidden = true;
    }
  }
  const extras = document.querySelector('#attending-fields');
  function updateAttendance() {
    const yes = form.elements.attendance.value === 'yes';
    extras.hidden = !yes;
    extras.querySelectorAll('input, textarea').forEach(input => { input.disabled = !yes; });
    form.elements.guest_count.required = yes;
  }
  form.addEventListener('change', updateAttendance);
  updateAttendance();
  // One question at a time. Only when the form is open; closed, it stays a plain list.
  const steps = enabled ? Array.from(form.querySelectorAll('.step')) : [];
  let flow = null;
  if (steps.length) {
    const back = document.querySelector('#step-back');
    const forward = document.querySelector('#step-next');
    const progress = document.querySelector('#step-progress');
    const send = form.querySelector('[type=submit]');
    let current = 0;
    let byPointer = false;
    const active = () => steps.filter(step => !extras.contains(step) || form.elements.attendance.value === 'yes');
    function show(focus) {
      const list = active();
      current = Math.min(current, list.length - 1);
      steps.forEach(step => { step.hidden = step !== list[current]; });
      const last = current === list.length - 1;
      back.hidden = current === 0;
      forward.hidden = last;
      send.hidden = !last;
      progress.textContent = `${current + 1} / ${list.length}`;
      progress.style.setProperty('--done', (current + 1) / list.length);
      if (focus) {
        const field = list[current].querySelector('input:not([type=radio]), textarea');
        if (field) field.focus({ preventScroll: true });
      }
    }
    const valid = () => Array.from(active()[current].querySelectorAll('input, textarea')).every(field => field.reportValidity());
    flow = {
      atEnd: () => current === active().length - 1,
      next() { if (!flow.atEnd() && valid()) { current += 1; show(true); } },
      back() { if (current > 0) { current -= 1; show(true); } }
    };
    form.classList.add('flow');
    progress.hidden = false;
    forward.addEventListener('click', flow.next);
    back.addEventListener('click', flow.back);
    form.addEventListener('pointerdown', () => { byPointer = true; });
    form.addEventListener('keydown', event => {
      byPointer = false;
      if (event.key === 'Enter' && event.target.tagName === 'INPUT' && !flow.atEnd()) {
        event.preventDefault();
        flow.next();
      }
    });
    form.addEventListener('change', event => {
      if (event.target.name !== 'attendance') return;
      show(false); // the number of questions depends on the answer
      // Tapping an answer moves on by itself; arrow keys only select.
      if (byPointer) setTimeout(flow.next, 260);
    });
    show(false);
  }
  let submitting = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!enabled || submitting) return;
    if (flow && !flow.atEnd()) { flow.next(); return; } // phone keyboards' "Go" key
    if (!form.reportValidity()) return;
    const submit = form.querySelector('[type=submit]');
    submitting = true;
    submit.disabled = true;
    submit.textContent = 'Sender …';
    result.textContent = '';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        // URL-encoded with no custom headers: a "simple" request, so no CORS preflight.
        method: 'POST', body: new URLSearchParams(new FormData(form)), signal: controller.signal
      });
      // Apps Script answers 200 even when the script fails, so trust only its own "ok".
      const answer = response.ok ? await response.json() : null;
      if (!answer || answer.ok !== true) throw new Error('Submission rejected');
      const coming = (form.elements.attendance && form.elements.attendance.value) === 'yes';
      form.reset();
      updateAttendance();
      fields.disabled = true;
      form.classList.add('done');
      result.textContent = 'Tak! Vi har modtaget jeres svar. Kærlig hilsen S + C';
      if (coming && typeof document.createElement === 'function') {
        const cue = document.createElement('a');
        cue.href = '#tale';
        cue.className = 'tale-after';
        cue.textContent = 'Vil du holde tale eller lave et indslag? Skriv til toastmaster Jonas →';
        result.append(document.createElement('br'), cue);
      }
      notice.textContent = 'Jeres svar er sendt.';
    } catch (error) {
      result.textContent = error.name === 'AbortError'
        ? 'Vi fik ikke bekræftet dit svar. Det kan være nået frem. Kontakt os direkte, før du prøver igen.'
        : 'Svaret blev ikke bekræftet. Dine oplysninger står stadig i formularen. Prøv igen, eller kontakt os direkte.';
      submit.disabled = false;
      submit.innerHTML = 'Prøv igen <span aria-hidden="true">→</span>';
    } finally {
      clearTimeout(timer);
      submitting = false;
      result.focus();
    }
  });
  document.querySelector('#calendar').addEventListener('click', () => {
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SC Wedding//DA',
      'BEGIN:VEVENT','UID:sc-wedding-20270306@stefanchristensen.me',
      'DTSTAMP:20261113T000000Z','DTSTART:20270306T140000Z', // 15:00 Danish time
      'DTEND:20270307T010000Z','SUMMARY:S + C — Bryllupsfest','LOCATION:Pakhus 11\\, Dampfærgevej 2\\, 2100 København Ø',
      'DESCRIPTION:Vi begynder kl. 15:00. Festen slutter kl. 02:00.','END:VEVENT','END:VCALENDAR',''].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'S-og-C-bryllup.ics'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    const toast = document.querySelector('#toast');
    toast.textContent = 'Kalenderfilen er klar \u2665\uFE0E';
    setTimeout(() => { toast.textContent = ''; }, 5000);
  });
})();

// #tale (from the programme, the RSVP thank-you or a shared link) opens the toastmaster answer.
(() => {
  const openTale = () => {
    if (typeof location === 'undefined' || location.hash !== '#tale') return;
    const d = document.querySelector('#tale');
    if (d) { d.open = true; d.scrollIntoView({ block: 'start' }); }
  };
  if (typeof window.addEventListener !== 'function') return;
  window.addEventListener('hashchange', openTale);
  openTale();
})();
