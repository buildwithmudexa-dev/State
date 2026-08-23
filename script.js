document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('link[href="property-search.css"]')) {
    const propertySearchStyles = document.createElement('link');
    propertySearchStyles.rel = 'stylesheet';
    propertySearchStyles.href = 'property-search.css';
    document.head.appendChild(propertySearchStyles);
  }
  if (!document.querySelector('link[href="property-listings.css"]')) {
    const propertyListingStyles = document.createElement('link');
    propertyListingStyles.rel = 'stylesheet';
    propertyListingStyles.href = 'property-listings.css';
    document.head.appendChild(propertyListingStyles);
  }
  if (window.lucide) window.lucide.createIcons();

  // Core page interactions. Language/theme/menu controls are handled by navbar-enhancements.js.
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.counter || 0);
        const start = performance.now();
        const tick = now => {
          const progress = Math.min((now - start) / 900, 1);
          el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.35 });
    counters.forEach(el => observer.observe(el));
  }

  // View Properties search panel.
  const servicesSection = document.getElementById('services');
  const propertyGrid = servicesSection?.querySelector('.property-grid');
  if (propertyGrid && !document.getElementById('property-search-panel')) {
    const panel = document.createElement('div');
    panel.className = 'property-search-panel';
    panel.id = 'property-search-panel';
    panel.innerHTML = `
      <div class="property-search-heading">
        <span class="eyebrow">Find your property</span>
        <h2>Search <em>properties.</em></h2>
        <p>Choose your preferences and explore the property information available with SAMA United.</p>
      </div>
      <form class="property-search-form" id="property-search-form">
        <div class="property-search-field">
          <label for="type-filter">Property Type</label>
          <select id="type-filter" name="type">
            <option value="all">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div class="property-search-field">
          <label for="location-filter">Location</label>
          <select id="location-filter" name="location">
            <option value="all">All Locations</option>
            <option value="al-thuqbah">Al-Thuqbah</option>
            <option value="al-khobar">Al Khobar</option>
          </select>
        </div>
        <div class="property-search-field">
          <label for="status-filter">For</label>
          <select id="status-filter" name="status">
            <option value="all">For Sale &amp; Rent</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div class="property-search-field">
          <label for="price-filter">Price Range</label>
          <select id="price-filter" name="price">
            <option value="all">Any Price</option>
            <option value="under1m">Under SAR 1M</option>
            <option value="1to3m">SAR 1M – 3M</option>
            <option value="3to5m">SAR 3M – 5M</option>
            <option value="over5m">Over SAR 5M</option>
          </select>
        </div>
        <button class="btn property-search-submit" type="submit">Search <i data-lucide="search"></i></button>
      </form>
    `;
    servicesSection.querySelector('.section-header')?.insertAdjacentElement('afterend', panel);
    if (window.lucide) window.lucide.createIcons();
  }

  // Real property inventory shown in View Properties.
  const propertyInventory = [
    { id:'SAM-001', title:'Al-Thuqbah Signature Villa', type:'residential', location:'al-thuqbah', status:'sale', availability:'available', price:1850000, priceLabel:'SAR 1,850,000', image:'assets/property-villa.svg', alt:'Luxury modern villa', meta:[['home','Villa'],['bed-double','5 Beds'],['bath','4 Baths']], description:'A spacious contemporary villa designed for comfortable family living in Al-Thuqbah.' },
    { id:'SAM-002', title:'Al Khobar Modern Apartment', type:'residential', location:'al-khobar', status:'sale', availability:'available', price:875000, priceLabel:'SAR 875,000', image:'assets/property-apartment.svg', alt:'Modern apartment building', meta:[['building-2','Apartment'],['bed-double','3 Beds'],['bath','3 Baths']], description:'A refined modern apartment with practical family spaces and a convenient Al Khobar setting.' },
    { id:'SAM-003', title:'Al-Thuqbah Garden Townhouse', type:'residential', location:'al-thuqbah', status:'rent', availability:'available', price:72000, priceLabel:'SAR 72,000 / year', image:'assets/property-townhouse.svg', alt:'Contemporary townhouse', meta:[['home','Townhouse'],['bed-double','4 Beds'],['trees','Private Garden']], description:'An elegant townhouse offering generous rooms, privacy and a welcoming outdoor space.' },
    { id:'SAM-004', title:'Al Khobar Executive Penthouse', type:'residential', location:'al-khobar', status:'sale', availability:'sold', price:3250000, priceLabel:'SAR 3,250,000', image:'assets/property-penthouse.svg', alt:'Luxury penthouse terrace', meta:[['building-2','Penthouse'],['bed-double','4 Beds'],['sparkles','Premium']], description:'A high-end penthouse residence with expansive living areas and a distinctive luxury feel.' },
    { id:'SAM-005', title:'Al Khobar Business Office', type:'commercial', location:'al-khobar', status:'rent', availability:'available', price:180000, priceLabel:'SAR 180,000 / year', image:'assets/property-office.svg', alt:'Modern commercial office', meta:[['building-2','Office'],['briefcase-business','Commercial'],['map-pin','Al Khobar']], description:'A polished commercial office suitable for a growing business seeking a professional address.' },
    { id:'SAM-006', title:'Al-Thuqbah Family Residence', type:'residential', location:'al-thuqbah', status:'sale', availability:'sold', price:1425000, priceLabel:'SAR 1,425,000', image:'assets/property-residence.svg', alt:'Elegant family residence', meta:[['home','Residence'],['bed-double','4 Beds'],['users','Family']], description:'A comfortable family residence with a balanced layout and an inviting neighbourhood setting.' }
  ];

  const cards = [...document.querySelectorAll('.property-card')];
  cards.forEach((card, index) => {
    const item = propertyInventory[index % propertyInventory.length];
    card.dataset.type = item.type;
    card.dataset.location = item.location;
    card.dataset.status = item.status;
    card.dataset.price = String(item.price);
    card.classList.add('property-card-enhanced');
    card.innerHTML = `
      <div class="property-image">
        <img src="${item.image}" alt="${item.alt}" width="1200" height="800" loading="lazy" decoding="async">
        <span class="property-status-badge ${item.availability}">${item.availability === 'available' ? 'Available' : 'Sold'}</span>
        <span class="property-badge">${item.type === 'commercial' ? 'Commercial' : 'Residential'}</span>
      </div>
      <div class="property-content">
        <div class="property-price-row"><div class="property-price">${item.priceLabel}<small>${item.status === 'rent' ? 'For Rent' : 'For Sale'}</small></div><span class="property-listing-id">${item.id}</span></div>
        <span class="property-type">${item.type === 'commercial' ? 'Commercial Property' : 'Residential Property'}</span>
        <h3>${item.title}</h3>
        <p class="property-description">${item.description}</p>
        <div class="property-meta">${item.meta.map(([icon,text]) => `<span><i data-lucide="${icon}"></i>${text}</span>`).join('')}<span><i data-lucide="map-pin"></i>${item.location === 'al-khobar' ? 'Al Khobar' : 'Al-Thuqbah'}</span></div>
      </div>
    `;
  });
  propertyGrid?.classList.add('property-grid-enhanced');
  if (window.lucide) window.lucide.createIcons();

  const search = document.getElementById('property-search');
  const status = document.getElementById('status-filter');
  const type = document.getElementById('type-filter');
  const location = document.getElementById('location-filter');
  const price = document.getElementById('price-filter');
  const empty = document.getElementById('empty-state');

  const priceMatch = (value, filter) => {
    if (!filter || filter === 'all' || !value) return true;
    const n = Number(value);
    if (!Number.isFinite(n)) return true;
    if (filter === 'under1m') return n < 1000000;
    if (filter === '1to3m') return n >= 1000000 && n <= 3000000;
    if (filter === '3to5m') return n > 3000000 && n <= 5000000;
    if (filter === 'over5m') return n > 5000000;
    return true;
  };
  const filterCards = () => {
    const q = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const ok = (!q || card.textContent.toLowerCase().includes(q)) &&
        (!status || status.value === 'all' || card.dataset.status === status.value) &&
        (!type || type.value === 'all' || card.dataset.type === type.value) &&
        (!location || location.value === 'all' || card.dataset.location === location.value || (location.value === 'al-khobar' && card.dataset.location === 'al-thuqbah')) &&
        priceMatch(card.dataset.price, price?.value);
      card.hidden = !ok;
      if (ok) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  };
  [search, status, type, location, price].forEach(el => {
    el?.addEventListener('input', filterCards);
    el?.addEventListener('change', filterCards);
  });

  document.getElementById('property-search-form')?.addEventListener('submit', event => {
    event.preventDefault();
    filterCards();
    propertyGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('.property-favorite').forEach(button => {
    button.addEventListener('click', () => button.classList.toggle('saved'));
  });

  const testimonials = [...document.querySelectorAll('.testimonial')];
  let testimonialIndex = 0;
  const showTestimonial = index => {
    if (!testimonials.length) return;
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, i) => item.classList.toggle('active', i === testimonialIndex));
  };
  document.getElementById('testimonial-prev')?.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
  document.getElementById('testimonial-next')?.addEventListener('click', () => showTestimonial(testimonialIndex + 1));

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item?.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen && item) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Premium CTA upgrade for the State homepage.
  const heroActions = document.querySelector('.hero .hero-actions');
  if (heroActions) {
    heroActions.innerHTML = `
      <a class="btn btn-light" href="#services">View Properties <i data-lucide="arrow-up-right"></i></a>
      <a class="btn btn-outline-light" href="#advisor">Talk to an Advisor <i data-lucide="user-round"></i></a>
    `;
  }

  const locationSection = document.getElementById('location');
  if (locationSection && !document.getElementById('advisor')) {
    const ctaSection = document.createElement('section');
    ctaSection.className = 'section advisor-cta-section';
    ctaSection.id = 'advisor';
    ctaSection.innerHTML = `
      <div class="container">
        <div class="advisor-cta-header">
          <span class="eyebrow">Explore &amp; Connect</span>
          <h2>Find your next <em>property.</em></h2>
          <p>Explore our property options or speak directly with an advisor for guidance tailored to your needs.</p>
        </div>
        <div class="advisor-cta-grid">
          <article class="advisor-cta-card">
            <div class="advisor-cta-image"><img src="assets/view-properties-generated.svg" alt="Contemporary luxury property" loading="lazy" decoding="async"></div>
            <div class="advisor-cta-content"><span class="property-type">01 · Properties</span><h3>View Properties</h3><p>Browse the available property information and discover spaces that fit your plans.</p><a class="btn btn-dark" href="#services">View Properties <i data-lucide="arrow-up-right"></i></a></div>
          </article>
          <article class="advisor-cta-card">
            <div class="advisor-cta-image"><img src="assets/talk-to-advisor-generated.svg" alt="Professional real estate advisor consultation" loading="lazy" decoding="async"></div>
            <div class="advisor-cta-content"><span class="property-type">02 · Consultation</span><h3>Talk to an Advisor</h3><p>Get clear, personal real estate guidance from the SAMA United team.</p><a class="btn btn-dark" href="#contact">Talk to an Advisor <i data-lucide="user-round"></i></a></div>
          </article>
        </div>
      </div>
    `;
    locationSection.parentNode.insertBefore(ctaSection, locationSection);
  }

  if (window.lucide) window.lucide.createIcons();
});
