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
  document.querySelector('#deadline').textContent = config.deadlineText || 'Svar senest 15. januar 2027.';
  if (enabled) {
    fields.disabled = false;
    form.action = config.rsvpEndpoint;
    notice.textContent = 'Vi glæder os til at høre fra jer.';
  }
  // Toastmaster: a pre-filled email, shown only when an address is configured.
  const mail = document.querySelector('#toastmaster-mail');
  if (mail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(config.toastmasterEmail || '')) {
    const subject = 'S & C Bryllup | Spørgsmål til toastmaster';
    const body = ['Hej Jonas', '', 'Jeg skriver om: (tale / indslag / spørgsmål)', 'Navn(e): ',
      'Telefon: ', 'Ca. varighed: ', 'Det skal jeg bruge (mikrofon, skærm, musik …): ', '',
      'Besked:', '', '', 'Kærlig hilsen', ''].join('\r\n');
    mail.href = `mailto:${config.toastmasterEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    mail.hidden = false;
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
      form.reset();
      updateAttendance();
      fields.disabled = true;
      form.classList.add('done');
      result.textContent = 'Tak! Vi har modtaget jeres svar. Kærlig hilsen S + C';
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
