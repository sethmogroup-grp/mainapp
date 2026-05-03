import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, X } from 'lucide-react';
import './Footer.css';
import icon from '../assets/icon.png';

const TermsModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="terms-overlay" onClick={onClose}>
      <div className="terms-modal" onClick={(e) => e.stopPropagation()}>

        <div className="terms-modal-header">
          <div>
            <h2 className="terms-modal-title">Terms of Use</h2>
            <p className="terms-modal-updated">Last Updated: February 2026</p>
          </div>

          <button className="terms-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="terms-modal-body">

          <section className="terms-section">
            <h3>Acceptance of Terms</h3>
            <p>
              By accessing or using the Site, you agree to and accept these Terms of Use as well as any
              additional rules that we may post on the Site. These Terms of Use provide for the terms and
              conditions of use of this site and also contain limitations of liability.
            </p>
            <p>
              We may make changes to these Terms of Use from time to time; we may notify you of such changes
              by any reasonable means, including by posting the revised version of these Terms of Use on the
              Site. Your access to or use of the Site following changes to these Terms of Use will constitute
              and reflect your acceptance of those changes.
            </p>
            <p>
              This website is created and maintained by The Sethmo Group, referred to as "Sethmo," "we,"
              and "us". The term "affiliated entities" means any direct or indirect parent, subsidiaries,
              sponsors, or affiliated companies of Sethmo Group and shall include any authorized producers,
              partners or agencies of Sethmo Group.
            </p>
          </section>

          <section className="terms-section">
            <h3>1. Intended Use of the Site</h3>
            <p>
              The Site, its features and its Content are for personal and non-commercial use only. You may not
              use or otherwise exploit the Site and/or any Content in connection with any business or
              commercial undertaking, whether or not for profit. Your use of the Site and/or Content must at
              all times comply with all applicable laws, rules and regulations.
            </p>
            <p>
              We welcome visitors to this Site of all ages. By accessing and/or using the Site, you affirm
              that you are of legal age to enter into these Terms of Use or, if you are not, that you have
              obtained parental or guardian consent to enter into these Terms of Use.
            </p>
          </section>

          <section className="terms-section">
            <h3>2. Content Made Available on the Site</h3>
            <p>
              <strong>2.1</strong> Sethmo Group may make available via the Site content, including information,
              comments, reviews, copy, product information and other texts, photos, pictures, images, films,
              movies, music, video clips, news, press or media coverage, audio files, software, applications
              or games.
            </p>

            <p>
              <strong>2.2</strong> Neither we nor any of our affiliates, officers, employees or agents shall
              be liable for any loss, damage or expense arising out of any access or use of this site, this
              site's content or any site linked to it.
            </p>

            <p>
              <strong>2.3</strong> All comments, suggestions, graphics, ideas and other information or
              materials you submit to us through this website will become and remain our exclusive property,
              including any future rights associated with such submissions.
            </p>

            <p>
              <strong>2.4</strong> This means that you disclaim any proprietary rights in such submissions,
              and you acknowledge our unrestricted right to use them in any medium, now and in the future,
              without notice, compensation or other obligation to you or any other person.
            </p>

            <p>
              <strong>2.5</strong> We reserve the right to make any changes and corrections to this site as
              and when we consider it appropriate and without notice.
            </p>

            <p>
              <strong>2.6</strong> The Content posted on this website is not intended to provide legal,
              accounting or tax advice and should not be relied upon in that respect.
            </p>

            <p>
              <strong>2.7</strong> Unauthorized use of the site or any content on the site may result in
              monetary damages and other civil or criminal penalties, including copyright and intellectual
              property infringement.
            </p>
          </section>

          <section className="terms-section">
            <h3>3. Trademarks and Copyrights</h3>
            <p>
              <strong>3.1</strong> We, our affiliated entities and/or our licensors own all Content made
              available through the Site. Such Content is subject to copyright, trademark or other
              intellectual property rights and laws.
            </p>

            <p>
              <strong>3.2</strong> You acknowledge that the Site itself is protected by copyright law. Sethmo
              Group owns the trademarks "Sethmo", "Improving Lives" and all associated Sethmo trade names,
              service marks and logos.
            </p>

            <p>
              <strong>3.3</strong> You are permitted to browse this site and reproduce extracts by printing,
              downloading to a hard disk and distribution to other people, but only for non-commercial,
              informational or personal purposes.
            </p>
          </section>

          <section className="terms-section">
            <h3>4. Content You Share With Us</h3>
            <p>
              <strong>4.1</strong> We may include features on the Site that allow you to share your Content
              with us and other users of the Site. By sharing Content through the Site, your Content may
              become publicly accessible.
            </p>

            <p>
              <strong>4.2</strong> The foregoing licenses shall survive any termination of your use of the
              Site.
            </p>

            <p>
              <strong>4.3</strong> For all of the Content you share through the Site, you represent and
              warrant that you have all rights necessary for you to grant these licenses.
            </p>
          </section>

          <section className="terms-section">
            <h3>5. Rules of Conduct</h3>
            <p>
              <strong>5.1</strong> In using the Site, you agree to comply with the following Rules of Conduct.
              Sethmo will fully cooperate with law enforcement authorities and/or court orders where necessary.
            </p>

            <p><strong>5.2</strong> You are prohibited from posting or transmitting:</p>

            <ul className="terms-list">
              <li>Any unlawful, threatening, defamatory, obscene, fraudulent, pornographic, or infringing material.</li>
              <li>Any virus, worm, Trojan horse, spyware or other harmful computer code.</li>
              <li>Any unsolicited advertising, junk mail, spam, chain letters, or pyramid schemes.</li>
              <li>Any material non-public information about a company without proper authorization.</li>
            </ul>

            <p><strong>5.3</strong> In addition, you will not:</p>

            <ul className="terms-list">
              <li>Use the Site for any fraudulent or unlawful purpose.</li>
              <li>Use the Site to defame, abuse, harass, stalk, threaten, or violate the rights of others.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
              <li>Interfere with or disrupt the operation of the Site.</li>
              <li>Access or use the Site through unauthorized technology or means.</li>
              <li>Restrict or inhibit any other person from using the Site.</li>
              <li>Use the Site to advertise, sell or buy goods or services without prior written consent.</li>
              <li>Reproduce, duplicate, copy, sell, or resell any portion of the Site for commercial purposes.</li>
              <li>Reverse engineer, decompile or disassemble any portion of the Site.</li>
              <li>Remove copyright, trademark or other proprietary rights notices from the Site.</li>
              <li>Frame or mirror any part of the Site without express written consent.</li>
              <li>Create a database by systematically downloading and storing Site content.</li>
              <li>Use any robot, spider, scraper, or data-mining device without consent.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h3>6. Links</h3>
            <p>
              The Site may provide links to other websites and online resources. We are not responsible for
              and do not endorse such external sites or resources. Your use of third-party websites and
              resources is at your own risk.
            </p>
          </section>

          <section className="terms-section">
            <h3>7. Data Protection</h3>
            <p>
              Sethmo Group treats data protection with seriousness. Please see our Privacy Policy and Cookie
              Policy for information on how we process or use your personal data.
            </p>
          </section>

          <section className="terms-section">
            <h3>8. Liability</h3>
            <p>
              <strong>8.1</strong> This site and all content, information and materials made available through
              this site are provided to you "as is" without express warranties or representations of any kind.
            </p>

            <p>
              <strong>8.2</strong> We do not promise that this site, or any information, content or materials
              made available through this site, will be accurate, reliable, complete, error free or compatible
              with any particular hardware or software.
            </p>

            <p>
              <strong>8.3</strong> Neither Sethmo nor its affiliated entities is liable for any direct,
              incidental, consequential, indirect, or punitive damages or losses arising out of your access
              to or use of the site.
            </p>

            <p>
              <strong>8.4</strong> Our maximum liability for all damages, losses and causes of action shall
              be the total amount paid by you to us for any products purchased from the site.
            </p>
          </section>

          <section className="terms-section">
            <h3>9. Indemnity</h3>
            <p>
              Except to the extent prohibited under applicable law, you agree to defend, indemnify and hold
              harmless Sethmo, its affiliated entities, and their respective directors, officers, employees,
              agents, shareholders, licensors and representatives from and against all claims, losses, costs
              and expenses arising out of your use of the Site or violation of these Terms.
            </p>
          </section>

          <section className="terms-section">
            <h3>10. Right to Restrict or Terminate Access</h3>
            <p>
              We may terminate your access to or use of the Site at any time if you breach these Terms of
              Use. Upon termination, your right to access and use the Site will immediately cease.
            </p>
          </section>

          <section className="terms-section">
            <h3>11. Contact</h3>
            <p>
              This Site is operated by Sethmo Group, Cairo Road, Plot No. 120, Lusaka, Zambia.
            </p>
          </section>

          <section className="terms-section">
            <h3>12. Information or Complaint</h3>
            <p>
              If you have a question or complaint regarding the Site or these Terms of Use, please send an
              email to{' '}
              <a href="mailto:info@sethmogroup.com" className="terms-link">
                info@sethmogroup.com
              </a>
              . You may also contact us by writing to Public Relations and Corporate Affairs, Sethmo Group,
              Cairo Road, Plot No. 120, Lusaka, Zambia or by calling us at{' '}
              <a href="tel:+260771574157" className="terms-link">
                +260 771 574 157
              </a>
              .
            </p>

            <p>
              Please note that email communications may not be secure; therefore, you should not include
              credit card information or other sensitive information in your email correspondence with us.
            </p>
          </section>

          <section className="terms-section">
            <h3>13. Governing Law</h3>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of Zambia.
              You agree to the exclusive jurisdiction of courts located in Zambia.
            </p>
          </section>

          <section className="terms-section">
            <h3>14. Miscellaneous</h3>
            <p>
              <strong>14.1</strong> If any provision of these Terms of Use is deemed unlawful, void or
              unenforceable, that provision shall be deemed severable and shall not affect the validity of
              the remaining provisions.
            </p>

            <p>
              <strong>14.2</strong> These Terms of Use do not create any partnership, joint venture,
              employer-employee, agency or franchise relationship between you and us.
            </p>

            <p>
              <strong>14.3</strong> No waiver by either party of any breach or default will be deemed a
              waiver of any preceding or subsequent breach or default.
            </p>

            <p>
              <strong>14.4</strong> These Terms of Use, together with all agreements and statements referred
              to herein, form the entire agreement between you and us.
            </p>

            <p>
              <strong>14.5</strong> We will not be responsible for failures to fulfil obligations due to
              causes beyond our control.
            </p>

            <p>
              <strong>14.6</strong> You may print, download or otherwise retain a copy of these Terms of Use
              for your records.
            </p>
          </section>

        </div>

        <div className="terms-modal-footer">
          <p>© {new Date().getFullYear()} Sethmo Group Limited. All rights reserved.</p>
          <button className="terms-close-action" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <footer className="main-footer">

        <div className="footer-content">

          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={icon} alt="Sethmo Logo" className="footer-logo-img" />
              <span className="footer-logo-text">
                Sethmo<span className="text-highlight">Group</span>
              </span>
            </div>

            <p className="footer-desc">
              A diversified multi-sector powerhouse committed to sustainable growth,
              innovation, and community impact. Driven by excellence, we remain
              proudly <strong>Inspired By You</strong>.
            </p>

            <div className="social-links">
              <a
                href="https://www.facebook.com/share/1DJHvBsWiu/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://x.com/SethmoGroup"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Twitter size={18} />
              </a>

              <a
                href="https://www.instagram.com/sethmogroup?igsh=dmUxcHZ1Z200dXIy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/@SethmoGroup"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Our Sectors</h4>
            <ul className="footer-links-list">
              <li><Link to="/services/mining">Mining &amp; Resources</Link></li>
              <li><Link to="/services/agriculture">Agribusiness</Link></li>
              <li><Link to="/services/finance">Finance &amp; Capital</Link></li>
              <li><Link to="/services/logistics">Logistics &amp; Shipping</Link></li>
              <li><Link to="/services/manufacturing">Manufacturing</Link></li>
              <li><Link to="/services/hospitality">Hospitality</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/news">News &amp; Media</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>

            <div className="contact-row">
              <span className="contact-icon">📍</span>
              <p>
                Room No., Great North Road Next to Shoprite,
                <br />
                Lusaka, Zambia
              </p>
            </div>

            <div className="contact-row">
              <span className="contact-icon">📞</span>
              <p>+260 976252655</p>
            </div>

            <div className="contact-row">
              <span className="contact-icon">✉️</span>
              <p>info@sethmogroup.com</p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">

            <p>&copy; {currentYear} Sethmo Group Limited. All rights reserved.</p>

            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>

              <span className="separator">|</span>

              <button
                type="button"
                className="terms-trigger-btn"
                onClick={() => setShowTerms(true)}
              >
                Terms of Service
              </button>

              <span className="separator">|</span>

              <div className="dmca-badge-wrapper">
                <a
                  href="//www.dmca.com/Protection/Status.aspx?ID=a9472487-f9e5-4c63-ae11-33046f504d4a"
                  title="DMCA.com Protection Status"
                  className="dmca-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-01.png?ID=a9472487-f9e5-4c63-ae11-33046f504d4a"
                    alt="DMCA.com Protection Status"
                  />
                </a>
              </div>
            </div>

          </div>
        </div>

      </footer>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
};

export default Footer;