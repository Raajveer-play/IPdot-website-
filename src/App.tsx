import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';


const nav = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Services', 'services'],
  ['Portfolio', 'portfolio'],
  ['Contact', 'contact']
];

const logo = (onClick: (p: string) => void) => (
  <a className="brand brand-full" href="#" onClick={(e) => { e.preventDefault(); onClick('home'); }} aria-label="IPdot — Web Development Agency, Founder Rajveer">
    <img src="/assets/ipdot-original.jpg" alt="Complete original IPdot logo including emblem, wordmark, agency name and Founder Rajveer" />
  </a>
);

const services = [
  ['〈/〉', 'Web Development', 'Modern, fast and scalable websites built around your goals.', 'web-development'],
  ['◉', 'UI/UX Design', 'Clear, considered interfaces that make every interaction feel effortless.', 'ui-ux-design'],
  ['⬡', 'Branding', 'A distinctive visual identity with a consistent digital presence.', 'branding'],
  ['↗', 'Digital Experiences', 'Thoughtful digital solutions that help your brand move forward.', 'digital-experiences']
];

const projects = [
  ['Automotive Experience', 'A bold digital showroom concept for premium vehicles.', 'auto', '01'],
  ['Technology Platform', 'A refined product and SaaS website concept.', 'tech', '02'],
  ['Architecture Studio', 'An editorial portfolio concept for an architecture brand.', 'arch', '03'],
  ['Creative Agency', 'A distinctive studio website concept with immersive art direction.', 'studio', '04']
];

const projectMessages = [
  'DRIVE\nBEYOND.',
  'Technology,\nrefined.',
  'Spaces with\nintention.',
  'Ideas into\nexperiences.'
];

export default function App() {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formNotice, setFormNotice] = useState('Your enquiry will be sent to the IPdot inbox. We will get back to you shortly.');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);

    // Scroll reveal animation logic
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .service-card, .project-card').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [page]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormNotice('Sending your enquiry...');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    


    try {
      const response = await fetch("https://formspree.io/f/moeenged", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setFormNotice('Your enquiry could not be sent. Please try again or email us directly.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setFormNotice('Your enquiry will be sent to the IPdot inbox. We will get back to you shortly.');
  };


  const Header = () => (
    <header className="topbar wrap">
      {logo(setPage)}
      <nav className="nav">
        {nav.map(([n, k]) => (
          <a 
            key={k} 
            className={page === k ? 'active' : ''} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setPage(k); }}
          >
            {n}
          </a>
        ))}
      </nav>
      <a className="pill" href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>
        Let's Talk <b>↗</b>
      </a>
      <button className="menu" aria-label="Open menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '☰'}
      </button>
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        {nav.map(([n, k]) => (
          <a key={k} href="#" onClick={(e) => { e.preventDefault(); setPage(k); }}>{n}</a>
        ))}
        <a href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>Let's Talk ↗</a>
      </nav>
    </header>
  );

  const Footer = () => (
    <footer className="footer wrap">
      <div className="footer-top">
        {logo(setPage)}
        <nav className="footer-nav">
          {nav.map(([n, k]) => (
            <a key={k} href="#" onClick={(e) => { e.preventDefault(); setPage(k); }}>{n}</a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('privacy'); }}>Privacy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('terms'); }}>Terms</a>
        </nav>
        <div className="social">
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="YouTube">▶</a>
          <a href="#" aria-label="Instagram">◎</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </div>
      <div className="copyright">
        <span>© {new Date().getFullYear()} IPdot. All rights reserved.</span>
        <span>Designed with <b style={{ color: '#d5a47d' }}>♥</b> by IPdot</span>
      </div>
    </footer>
  );

  const PageHero = ({ k, title, desc }: { k: string, title: string, desc: string }) => (
    <section className="page-hero">
      <div className="wrap">
        <div className="kicker">IPdot / {k}</div>
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <p>{desc}</p>
      </div>
    </section>
  );

  const renderHome = () => (
    <main>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow"><i></i> Premium Digital Agency</span>
          <h1>Build Something<br /><span>Extraordinary</span></h1>
          <p className="lead">At IPdot, we turn ideas into powerful digital experiences with thoughtful technology and timeless design.</p>
          <div className="actions">
            <a className="btn" href="#" onClick={(e) => { e.preventDefault(); setPage('portfolio'); }}>Explore Our Work <b>→</b></a>
            <a className="watch" href="#" onClick={(e) => { e.preventDefault(); setPage('about'); }}><span className="play">▶</span> Discover IPdot</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orbit"></div>
          <div className="logo-stage">
            <img src="/assets/ipdot-lockup.png" alt="Original IPdot logo with Web Development Agency and Founder Rajveer" />
          </div>
          <span className="scroll">SCROLL TO DISCOVER</span>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <div className="kicker">✦ &nbsp; Our Services</div>
            <h2>What We <span className="gold">Do</span></h2>
          </div>
          <p className="section-intro">From the first idea to the final detail, we shape digital experiences with purpose.</p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <article key={i} className="service-card reveal">
              <div className="service-icon">{s[0]}</div>
              <h3>{s[1]}</h3>
              <p>{s[2]}</p>
              <a className="text-link" href="#" onClick={(e) => { e.preventDefault(); setPage(`service-${s[3]}`); }}>Explore service →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="portfolio-layout">
          <div>
            <div className="kicker">✦ &nbsp; Selected Concepts</div>
            <h2>Our <span className="gold">Work</span></h2>
            <p className="section-intro">A glimpse of the visual directions and digital experiences we can create.</p>
            <a className="pill" href="#" onClick={(e) => { e.preventDefault(); setPage('portfolio'); }}>Explore Portfolio →</a>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <article key={i} className="project-card reveal">
                <a className="project-open" href="#" onClick={(e) => { e.preventDefault(); setPage('project'); }} aria-label={`View ${p[0]} concept`}>
                  <div className={`project-art art-${p[2]}`}>
                    <div className="art-browser">
                      <div className="art-top"><i></i><i></i><i></i><span>{p[0].toUpperCase()}</span></div>
                      <div className="art-content">
                        <small>IPdot / CONCEPT {p[3]}</small>
                        <strong dangerouslySetInnerHTML={{ __html: projectMessages[i].replace(/\n/g, '<br/>') }}></strong>
                        <em>Explore the experience ↗</em>
                      </div>
                    </div>
                  </div>
                  <h3>{p[0]}</h3>
                </a>
                <div className="concept-note">Concept showcase · Not a client project</div>
                <p>{p[1]}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="metrics">
          <div className="metric"><strong>01</strong><span>Focused creative process</span></div>
          <div className="metric"><strong>∞</strong><span>Room to build ideas</span></div>
          <div className="metric"><strong>01:01</strong><span>Attention to every detail</span></div>
          <div className="metric"><strong>100%</strong><span>Made around your brief</span></div>
        </div>
      </section>

      <section className="wrap cta">
        <div>
          <div className="kicker">✦ &nbsp; Let's Create Together</div>
          <h2>Have a <span className="gold">Project</span> in Mind?</h2>
          <p className="section-intro">Let's turn your idea into a thoughtful digital experience.</p>
        </div>
        <a className="btn" href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>Contact Us →</a>
      </section>
    </main>
  );

  const renderAbout = () => (
    <main>
      <PageHero k="ABOUT" title="Digital craft. <span class='gold'>Clear purpose.</span>" desc="IPdot is a web development and digital solutions agency founded by Rajveer. We bring design thinking and practical technology together to create a confident online presence for every project." />
      <section className="section wrap">
        <div className="content-grid">
          <article className="info-card">
            <div className="kicker">01 / Our approach</div>
            <h3>Built with intention</h3>
            <p>Good digital work is more than a striking first impression. It should be clear to use, consistent in its details and shaped around the people it serves.</p>
          </article>
          <article className="info-card">
            <div className="kicker">02 / Our focus</div>
            <h3>Design meets development</h3>
            <p>We connect visual direction, user experience and dependable front-end development in one considered process.</p>
          </article>
        </div>
      </section>
      <section className="section wrap">
        <div className="kicker">THE IPdot PROCESS</div>
        <h2>From first thought to <span className="gold">launch.</span></h2>
        <div className="steps">
          <div className="info-card"><div className="step-num">01</div><h3>Discover</h3><p>Understand the idea, audience and goals.</p></div>
          <div className="info-card"><div className="step-num">02</div><h3>Define</h3><p>Shape the structure and visual direction.</p></div>
          <div className="info-card"><div className="step-num">03</div><h3>Develop</h3><p>Build responsive, purposeful experiences.</p></div>
          <div className="info-card"><div className="step-num">04</div><h3>Deliver</h3><p>Review, refine and prepare for launch.</p></div>
        </div>
      </section>
    </main>
  );

  const renderServices = () => (
    <main>
      <PageHero k="SERVICES" title="Digital solutions, <span class='gold'>thoughtfully made.</span>" desc="A focused set of services to help shape, build and strengthen your digital presence." />
      <section className="section wrap">
        <div className="service-grid">
          {services.map((s, i) => (
            <article key={i} className="service-card reveal">
              <div className="service-icon">{s[0]}</div>
              <h3>{s[1]}</h3>
              <p>{s[2]}</p>
              <a className="text-link" href="#" onClick={(e) => { e.preventDefault(); setPage(`service-${s[3]}`); }}>Explore service →</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );

  const renderPortfolio = () => (
    <main>
      <PageHero k="PORTFOLIO" title="Selected concepts. <span class='gold'>Distinct experiences.</span>" desc="Explore four different website directions created to demonstrate IPdot’s design and development approach. Each preview is a concept, not a completed client project." />
      <section className="section wrap">
        <div className="portfolio-intro">
          <div>
            <div className="kicker">04 / CREATIVE DIRECTIONS</div>
            <h2>Designed to make <span className="gold">an impression.</span></h2>
          </div>
          <p className="section-intro">Select any concept to view its project-detail page. Real client work can be added here as it becomes available.</p>
        </div>
        <div className="project-grid portfolio-grid">
          {projects.map((p, i) => (
            <article key={i} className="project-card reveal">
              <a className="project-open" href="#" onClick={(e) => { e.preventDefault(); setPage('project'); }}>
                <div className={`project-art art-${p[2]}`}>
                  <div className="art-browser">
                    <div className="art-top"><i></i><i></i><i></i><span>{p[0].toUpperCase()}</span></div>
                    <div className="art-content">
                      <small>IPdot / CONCEPT {p[3]}</small>
                      <strong dangerouslySetInnerHTML={{ __html: projectMessages[i].replace(/\n/g, '<br/>') }}></strong>
                      <em>Explore the experience ↗</em>
                    </div>
                  </div>
                </div>
                <h3>{p[0]}</h3>
              </a>
              <div className="concept-note">Concept showcase · Not a client project</div>
              <p>{p[1]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );

  const renderContact = () => (
    <main>
      <PageHero k="CONTACT" title="Let’s make something <span class='gold'>meaningful.</span>" desc="Share a little about what you have in mind. We can start with the idea and work out the right next step together." />
      <section className="section wrap">
        <div className="contact-grid">
          <div>
            <div className="kicker">START A CONVERSATION</div>
            <h2>Your idea starts <span className="gold">here.</span></h2>
            <p className="lead">Tell us what you are planning, what you need and what success would look like for you.</p>
            <p className="notice">Your enquiry will be sent to the IPdot inbox. We'll review your project details and get in touch soon.</p>
          </div>
          
          <div className="form-container">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="form" 
                  id="contactForm" 
                  onSubmit={handleContactSubmit}
                >
                  <input name="name" placeholder="Your name" autoComplete="name" required />
                  <input name="email" type="email" placeholder="Email address" autoComplete="email" required />
                  <input name="phone" type="tel" placeholder="Phone / WhatsApp number" autoComplete="tel" />
                  <input name="project" placeholder="Service required (e.g. website, e-commerce)" required />
                  <input name="budget" placeholder="Estimated budget (optional)" />
                  <textarea name="message" placeholder="Tell us a little about your project..." required></textarea>
                  <input type="hidden" name="_subject" value="New IPdot Website Enquiry" />
                  <button className={`btn ${isSubmitting ? 'submitting' : ''}`} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Enquiry →'}
                  </button>
                  {formNotice && !isSubmitting && (
                    <p className="notice" id="formNotice" role="status">
                      {formNotice}
                    </p>
                  )}
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-view"
                  style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    background: 'rgba(180, 122, 76, 0.05)', 
                    border: '1px solid var(--line)',
                    borderRadius: '24px'
                  }}
                >
                  <div className="success-icon" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <motion.circle 
                        cx="40" cy="40" r="38" 
                        stroke="#4ade80" 
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.path 
                        d="M25 40L35 50L55 30" 
                        stroke="#4ade80" 
                        strokeWidth="6" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#f3eee8' }}>Enquiry Sent Successfully!</h3>
                  <p style={{ color: '#aaa29b', lineHeight: '1.6', marginBottom: '32px', maxWidth: '400px', marginInline: 'auto' }}>
                    Thank you for contacting IPdot. We've received your enquiry and will get back to you soon.
                  </p>
                  <button className="pill" onClick={handleResetForm} style={{ cursor: 'pointer', background: 'transparent' }}>
                    Send Another Enquiry ↺
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );

  const renderLegal = (which: string) => {
    const title = which === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
    return (
      <main>
        <PageHero k={which.toUpperCase()} title={title} desc="Clear information about using the IPdot website." />
        <section className="section wrap">
          <article className="info-card">
            <h3>{which === 'privacy' ? 'Information and privacy' : 'Website use'}</h3>
            <p>{which === 'privacy' ? 'This website includes a functional contact-form backend via Formspree. If you contact IPdot, share only information needed for your enquiry.' : 'The website is provided as an informational showcase. Concept visuals are illustrative and should not be interpreted as completed client work or guaranteed outcomes.'}</p>
            <h3>Updates</h3>
            <p>These pages are starter policy content and should be reviewed and completed before the website is used commercially.</p>
          </article>
        </section>
      </main>
    );
  };

  const renderProject = () => (
    <main>
      <PageHero k="PROJECT DETAIL" title="A closer look at <span class='gold'>the process.</span>" desc="This page is a reusable project-detail layout. Replace this sample content with an approved project when one is ready." />
      <section className="section wrap">
        <div className="content-grid">
          <article className="info-card">
            <div className="kicker">01 / Challenge</div>
            <h3>Define the opportunity</h3>
            <p>Describe the project context, audience and problem to solve.</p>
          </article>
          <article className="info-card">
            <div className="kicker">02 / Direction</div>
            <h3>Build a clear response</h3>
            <p>Explain the design and development decisions behind the final experience.</p>
          </article>
        </div>
      </section>
    </main>
  );

  const serviceDetails: Record<string, { title: string, hero: string, desc: string, features: string[], benefits: string[] }> = {
    'web-development': {
      title: 'Web Development',
      hero: 'Modern, fast and <span class="gold">scalable.</span>',
      desc: 'We build websites that are not just visually stunning but also technically superior. Our development process focuses on performance, accessibility, and clean code to ensure your digital presence is robust and future-proof.',
      features: ['Custom React & TypeScript Apps', 'Performance Optimization', 'Responsive & Adaptive Layouts', 'SEO-Ready Architecture'],
      benefits: ['Fast load times for better conversion', 'Seamless experience across all devices', 'Scalable code that grows with your business', 'Higher search engine visibility']
    },
    'ui-ux-design': {
      title: 'UI/UX Design',
      hero: 'Interfaces with <span class="gold">clarity and purpose.</span>',
      desc: 'Great design is more than just aesthetics; it is about how it works. We create intuitive user experiences and beautiful interfaces that guide your visitors and make every interaction feel effortless.',
      features: ['User Journey Mapping', 'High-Fidelity Prototyping', 'Visual Interface Design', 'Design Systems & Style Guides'],
      benefits: ['Increased user engagement', 'Reduced friction in user flows', 'Stronger brand perception', 'Consistent visual language']
    },
    'branding': {
      title: 'Branding',
      hero: 'A distinctive <span class="gold">visual identity.</span>',
      desc: 'Your brand is the soul of your business. We help you define and express your identity through thoughtful design, consistent visual language, and a clear digital presence.',
      features: ['Logo & Visual Identity', 'Brand Guidelines', 'Typography & Color Systems', 'Brand Strategy & Positioning'],
      benefits: ['Memorable market presence', 'Trust and credibility with users', 'Consistent brand experience', 'Clearer communication of values']
    },
    'digital-experiences': {
      title: 'Digital Experiences',
      hero: 'Thoughtful <span class="gold">digital solutions.</span>',
      desc: 'We go beyond websites to create immersive digital experiences. From concept to launch, we help your brand move forward with innovative technology and art direction.',
      features: ['Interactive Storytelling', 'Creative Art Direction', 'Custom Animations', 'Emerging Tech Integration'],
      benefits: ['Unforgettable user experiences', 'Higher brand differentiation', 'Stronger emotional connection', 'Cutting-edge digital presence']
    }
  };

  const renderServiceDetail = (slug: string) => {
    const s = serviceDetails[slug];
    if (!s) return renderHome();
    return (
      <main>
        <PageHero k={s.title.toUpperCase()} title={s.hero} desc={s.desc} />
        <section className="section wrap">
          <div className="content-grid">
            <article className="info-card">
              <div className="kicker">✦ &nbsp; Key Features</div>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                {s.features.map((f, i) => (
                  <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#c1b8b0' }}>
                    <span style={{ color: 'var(--champ)' }}>✔</span> {f}
                  </li>
                ))}
              </ul>
            </article>
            <article className="info-card">
              <div className="kicker">✦ &nbsp; Business Benefits</div>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                {s.benefits.map((b, i) => (
                  <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#c1b8b0' }}>
                    <span style={{ color: 'var(--champ)' }}>→</span> {b}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <section className="section wrap">
          <div className="kicker">OUR PROCESS</div>
          <h2>How we deliver <span className="gold">excellence.</span></h2>
          <div className="steps">
            <div className="info-card"><div className="step-num">01</div><h3>Discover</h3><p>Understanding the project goals.</p></div>
            <div className="info-card"><div className="step-num">02</div><h3>Define</h3><p>Planning the strategy.</p></div>
            <div className="info-card"><div className="step-num">03</div><h3>Develop</h3><p>Building the solution.</p></div>
            <div className="info-card"><div className="step-num">04</div><h3>Deliver</h3><p>Launching and refining.</p></div>
          </div>
        </section>
        <section className="wrap cta">
          <div>
            <div className="kicker">✦ &nbsp; Ready to start?</div>
            <h2>Get a <span className="gold">Quote</span> for {s.title}</h2>
            <p className="section-intro">Let's turn your idea into a thoughtful digital experience.</p>
          </div>
          <a className="btn" href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>Contact Us →</a>
        </section>
      </main>
    );
  };

  const pages: Record<string, () => JSX.Element> = {
    home: renderHome,
    about: renderAbout,
    services: renderServices,
    portfolio: renderPortfolio,
    contact: renderContact,
    project: renderProject,
    'service-web-development': () => renderServiceDetail('web-development'),
    'service-ui-ux-design': () => renderServiceDetail('ui-ux-design'),
    'service-branding': () => renderServiceDetail('branding'),
    'service-digital-experiences': () => renderServiceDetail('digital-experiences'),
    privacy: () => renderLegal('privacy'),
    terms: () => renderLegal('terms'),
  };

  return (
    <div className="app-container">
      <Header />
      {pages[page] ? pages[page]() : renderHome()}
      <Footer />
    </div>
  );
}
