document.addEventListener('DOMContentLoaded', () => {
  const advisorSection = document.getElementById('advisor');
  if (!advisorSection || document.getElementById('advisor-form')) return;

  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = 'advisor-form.css';
  document.head.appendChild(styles);

  const formWrap = document.createElement('div');
  formWrap.className = 'advisor-form-wrap';
  formWrap.id = 'advisor-form';
  formWrap.innerHTML = `
    <div class="advisor-form-copy">
      <span class="eyebrow">Talk to an Advisor</span>
      <h3>Let's find the right <em>property for you.</em></h3>
      <p>Share your details and preferred viewing time. Our advisor will receive your request on WhatsApp and can follow up with you directly.</p>
    </div>
    <form class="advisor-form" id="advisor-form-submit">
      <div class="advisor-form-grid">
        <div class="advisor-field">
          <label for="advisor-name">Full Name</label>
          <input id="advisor-name" name="name" type="text" placeholder="Enter your full name" autocomplete="name" required>
        </div>
        <div class="advisor-field">
          <label for="advisor-email">Email Address</label>
          <input id="advisor-email" name="email" type="email" placeholder="Enter your email" autocomplete="email" required>
        </div>
        <div class="advisor-field">
          <label for="advisor-phone">Phone Number</label>
          <input id="advisor-phone" name="phone" type="tel" placeholder="Enter your phone number" autocomplete="tel" required>
        </div>
        <div class="advisor-field">
          <label for="advisor-property">Property of Interest</label>
          <select id="advisor-property" name="property" required>
            <option value="" selected disabled>Select a property</option>
            <option>Family Flat — Al-Thuqbah</option>
            <option>Residential Property — Al Khobar</option>
            <option>Property Consultation</option>
          </select>
        </div>
        <div class="advisor-field">
          <label for="advisor-date">Preferred Date</label>
          <select id="advisor-date" name="date" required>
            <option value="" selected disabled>Select a date</option>
          </select>
        </div>
        <div class="advisor-field">
          <label for="advisor-time">Preferred Time</label>
          <select id="advisor-time" name="time" required>
            <option value="" selected disabled>Select time</option>
            <option>09:00–11:30</option>
            <option>13:30–15:30</option>
            <option>15:30–18:00</option>
            <option>18:00–21:30</option>
          </select>
        </div>
        <div class="advisor-field advisor-field-full">
          <label for="advisor-message">Message <span>(Optional)</span></label>
          <textarea id="advisor-message" name="message" rows="4" placeholder="Tell us anything we should know..."></textarea>
        </div>
      </div>
      <button class="btn advisor-submit" type="submit">Register / Book Now <i data-lucide="arrow-right"></i></button>
      <p class="advisor-form-note"><i data-lucide="shield-check"></i> Your request will open WhatsApp with the details you provided.</p>
    </form>
  `;

  const grid = advisorSection.querySelector('.advisor-cta-grid');
  if (grid) grid.insertAdjacentElement('afterend', formWrap);
  else advisorSection.querySelector('.container')?.appendChild(formWrap);

  const dateSelect = document.getElementById('advisor-date');
  if (dateSelect) {
    const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    for (let i = 1; i <= 14; i += 1) {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() + i);
      const option = document.createElement('option');
      option.value = date.toISOString().slice(0, 10);
      option.textContent = formatter.format(date);
      dateSelect.appendChild(option);
    }
  }

  document.getElementById('advisor-form-submit')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello SAMA United Real Estate Co, I would like to talk to an advisor.',
      '',
      `Full Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      `Property of Interest: ${data.get('property')}`,
      `Preferred Date: ${data.get('date')}`,
      `Preferred Time: ${data.get('time')}`,
      `Message: ${data.get('message') || 'N/A'}`
    ].join('\n');
    window.open(`https://wa.me/966505723111?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  if (window.lucide) window.lucide.createIcons();
});
