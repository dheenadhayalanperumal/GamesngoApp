'use client';

import Image from 'next/image';
import Link from 'next/link';
import './page.css';
import { useCallback, useState } from 'react';

const MOBILE_PLAY_LINK = 'https://gamesngo.com/play/now/hzyOmKF5K';

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(MOBILE_PLAY_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // noop
    }
  }, []);

 

  return (
    <main className="landing">
      {/* Header */}
      <header className="landing__nav">
        <div className="landing__container landing__nav-inner">
          <div className="landing__brand">
            <Image src="/logoblue.svg" alt="Games N Go" width={230} height={40} className="brand-logo" />
           
          </div>
          <nav className="landing__links">
            <Link href="#home">Home</Link>
            <Link href="#partners">Partners</Link>
            <Link href="#contact">Contact us</Link>
          </nav>
          <div className="landing__cta">
            <button className="btn btn--qr" onClick={() => setShowQR(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H10V10H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 3H21V10H14V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 14H10V21H3V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              QR Code
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="landing__hero">
        <div className="landing__container landing__hero-grid">
          <div className="landing__hero-copy">
            <h1>
              <span className="text-purple">Games <span className="text-yellow">N</span> Go</span> performs better <span className="text-purple">on </span>
              <Image src="/mobile-text1.png" alt="mobile" width={150} height={50} className="mobile-text1-img" />
            </h1>
            <p>
              Games N Go provides a smoother, faster, and more engaging experience on mobile devices compared to the desktop version of the platform.
            </p>
            <div className="landing__hero-actions">
              <button className="btn btn--outline-purple"  onClick={() => setShowQR(true)}>
                Show QR
                <svg width="26" height="26" className="show-qr-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="landing__hero-media">
            <div className="phone-illustration">
              <Image src="/landing-phone.png" alt="Phone Illustration" width={420} height={800} className="phone-illustration-img" />
              <div className="phone-screen">01</div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section id="qr" className="landing__qr">
        <div className="landing__qr-wrapper">
          <h2 className="landing__qr-title">
            <svg className="qr-icon-left" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 7V5C3 3.89543 3.89543 3 5 3H7M7 21H5C3.89543 21 3 20.1046 3 19V17M17 3H19C20.1046 3 21 3.89543 21 5V7M21 17V19C21 20.1046 20.1046 21 19 21H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Scan QR Code for Better Experience
            <svg className="qr-icon-right" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
            </svg>
          </h2>
          <div className="landing__qr-card">
            <img
              src={`/qrscreen.png`}
              alt="QR to play"
              className="qr-img"
              width={300}
              height={300}
            />
           
          </div>
          
          <div className="landing__qr-steps">
            <div className="step">
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 4H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Open Mobile Camera</p>
            </div>
            <div className="qr-step-arrow">
              <Image src="/stepline1.png" alt="Arrow" width={120} height={80} className="qr-step-arrow-img" />
            </div>
            <div className="step">
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3H10V10H3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 3H21V10H14V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14H10V21H3V14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Scan Below QR Code</p>
            </div>
            <div className="qr-step-arrow">
              <Image src="/stepline2.png" alt="Arrow" width={120} height={80} className="qr-step-arrow-img" />
            </div>
            <div className="step">
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12H18M18 12L15 9M18 12L15 15M6 12L9 9M6 12L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Start Gaming</p>
            </div>
            <div className="qr-step-arrow">
              <Image src="/stepline1.png" alt="Arrow" width={120} height={80} className="qr-step-arrow-img" />
            </div>
            <div className="step">
              <div className="step-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V11C16 9.89543 15.1046 9 14 9H10C8.89543 9 8 9.89543 8 11V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2L12 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 5L12 2L16 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Win Real Prizes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copy Link Section */}
      <section className="landing__copy">
        <div className="landing__container">
          <h3 className="landing__copy-title">
            <svg className="rook-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 20H19V18H17V16H19V14H17V12H19V10H17V8H19V6H17V4H19V2H5V4H7V6H5V8H7V10H5V12H7V14H5V16H7V18H5V20Z" fill="currentColor"/>
            </svg>
            Or copy link
            <svg className="rook-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 20H19V18H17V16H19V14H17V12H19V10H17V8H19V6H17V4H19V2H5V4H7V6H5V8H7V10H5V12H7V14H5V16H7V18H5V20Z" fill="currentColor"/>
            </svg>
          </h3>
          <div className="copy-content">
            <div className="copy-illustration">
             <Image src="/landing-link-icon.png" alt="Copy Link" width={400} height={350} className="copy-img" />
            </div>
            <div className="copy-form">
              <p className="copy-subtitle">Play & Win Instantly - Just Copy, Paste, and Start!</p>
              <div className="copy-row">
                <input type="text" value={MOBILE_PLAY_LINK} readOnly className="copy-input" />
                <button className="btn btn--dark" onClick={onCopy}>{copied ? 'Copied!' : 'Copy Link'}</button>
              </div>
              <div className="copy-steps">
                <div className="copy-step">
                  <span className="step-num">1</span>
                  <p>Copy link from desktop</p>
                </div>
                <div className="copy-step-arrow">
                  <Image src="/stepline1.png" alt="Arrow" width={120} height={80} className="step-arrow-img" />
                </div>
                <div className="copy-step">
                  <span className="step-num">2</span>
                  <p>Paste link in mobile browser</p>
                </div>
                <div className="copy-step-arrow">
                  <Image src="/stepline2.png" alt="Arrow" width={120} height={80} className="step-arrow-img" />
                </div>
                <div className="copy-step">
                  <span className="step-num">3</span>
                  <p>Start gaming, win prizes.</p>
                </div>
              </div>
              <div className="copy-cta">
                
                <span>🚀 Start gaming today and win real prizes with fun and exciting challenges!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mobile Gaming Section */}
      <section className="landing__why">
        <div className="landing__container">
          <h3 className="section-title">Why mobile gaming?</h3>
          <div className="why-grid">
            <div className="why-card why-card--purple">
              <h4>Optimized for Mobile Experience!</h4>
              <p>
                Our platform is built exclusively for mobile devices to deliver the best gaming performance and smooth controls.
              </p>
            </div>
            <div className="why-card why-card--pink">
              <h4>Play Instantly on Your Phone!</h4>
              <p>
                Scan the QR code or open this link on your mobile browser to start playing instantly - no app download needed!
              </p>
            </div>
            <div className="why-card why-card--teal">
              <h4>Touch-Friendly<br/> Controls</h4>
              <p>
                The games are designed for touch screens, giving you a more interactive and engaging experience.
              </p>
            </div>
            <div className="why-card why-card--blue">
              <h4>Seamless Rewards and Updates</h4>
              <p>
                Enjoy real-time rewards, faster load times, and all new updates directly on your mobile browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="landing__partners">
        <div className="landing__container">
          <h3 className="section-title">Our partners</h3>
          <div className="partners-row">
            <div className="partner-logo"><Image src="/partner1.png" alt="Hair Doc" width={300} height={100} className="partner-logo-img" /></div>
            <div className="partner-logo"><Image src="/partner2.png" alt="Delight Venue" width={300} height={100} className="partner-logo-img" /></div>
            <div className="partner-logo"><Image src="/partner3.png" alt="MOMO NATION CAFE" width={300} height={100} className="partner-logo-img" /></div>
            <div className="partner-logo"><Image src="/partner4.png" alt="Liam's Diner" width={300} height={100} className="partner-logo-img" /></div>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className="landing__touch">
        <div className="landing__container">
          <button className="btn btn--white-top">WRITE TO US</button>
          <h3 className="touch-title">Get In Touch</h3>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="landing__contact">
        <div className="landing__container">
          <div className="contact-grid">
            <div className="contact-media">
              <Image src="/lets-talk.png" alt="Support" width={400} height={350} className="contact-img" />
            </div>
            <div className="contact-content">
              <h3 className="contact-title">Lets Talk!</h3>
              <p className="contact-subtitle">
                Let&apos;s connect and grow together! Reach out for exciting partnership opportunities, collaboration ideas, or dedicated support anytime you need.
              </p>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <label>
                    First Name *
                    <input type="text" required />
                  </label>
                  <label>
                    Last Name *
                    <input type="text" required />
                  </label>
                </div>
                <label>
                  Mobile Number *
                  <input type="tel" required />
                </label>
                <label>
                  Email Address *
                  <input type="email" required />
                </label>
                <label className="form-message">
                  Message *
                  <textarea rows={6} required></textarea>
                </label>
                <div className="form-actions">
                  <button className="btn btn--yellow" type="submit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="landing__container footer-grid">
          <div className="footer-brand">
            <Image src="/footer-logo.svg" alt="Games N Go" width={240} height={50} className="footer-logo" />
           
          </div>
          <div className="footer-links">
            <h5>Quick Links</h5>
            <Link href="/terms-conditions">Terms & Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
          <div className="footer-social">
            <h5>Social Links</h5>
            <div className="social-row">
              <a href="#" aria-label="X" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17V10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
