import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Footer.css';

/**
 * Privacy Policy pop-up - same look and behaviour as the Terms of Service pop-up
 * (click outside, the X, or Esc closes it; the page behind does not scroll).
 * Wording comes from "Sethmo Group Privacy Policy" (updated October 2026).
 */
const PrivacyModal = ({ onClose }) => {
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
      <div
        className="terms-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terms-modal-header">
          <div>
            <h2 className="terms-modal-title" id="privacy-title">Privacy Policy</h2>
            <p className="terms-modal-updated">Updated October 2026</p>
          </div>

          <button className="terms-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="terms-modal-body">
          <section className="terms-section">
            <h3>Sethmo Group | www.sethmogroup.com</h3>
            <p>
              This privacy notice describes the types of personal information we collect on
              www.sethmogroup.com, how we may use that information, and with whom we may share that
              information. This privacy notice also describes the measures we take to protect the
              security of the information. We also tell you how you can reach us to provide feedback,
              inquire about our company and its subsidiaries and their services, or answer questions
              you may have about our privacy practices.
            </p>
          </section>

          <section className="terms-section">
            <h3>Information We Collect and How We Use It</h3>
            <p>
              Information may be automatically collected by our website, including your IP address, the
              address of the site you visited just before ours (if available), and the number of times
              you accessed our site and the resources within it. You may choose to provide personal
              information, in various fields, on our site (such as your name, address, telephone number
              and email address). The following are the ways you may provide the information and the
              types of information you may submit.
            </p>

            <h4 className="terms-subheading">Marketing Purposes</h4>
            <p>
              When you share contact information (i.e. email address, phone number) we may use the
              information we collect to:
            </p>
            <ul className="terms-list">
              <li>Provide products and services;</li>
              <li>Send you promotional materials or other communications;</li>
              <li>Respond to your inquiries.</li>
            </ul>
            <p>You can opt out at any time by contacting us.</p>

            <h4 className="terms-subheading">Log Files</h4>
            <p>
              Unlike many companies, we do not use cookies, but we do use log files on our website. Log
              files are small text files that websites automatically create when a user visits a site.
            </p>

            <h4 className="terms-subheading">Third Party Analytics</h4>
            <p>
              We may use third-party web analytics services on our website such as Google Analytics.
              These service providers help us analyze how users use the website. The information
              collected for this purpose (including your IP address and other information collected by
              automated means) will be disclosed to or collected directly by these service providers.
              Our website does not use cookies, therefore, we do not respond to &quot;do not
              track&quot; signals from browsers.
            </p>

            <h4 className="terms-subheading">Links to Other Websites</h4>
            <p>
              We may provide links to other websites of our Subsidiaries for your convenience and
              information. These sites may operate independently from Sethmo Group and may not be under
              our control.
            </p>
          </section>

          <section className="terms-section">
            <h3>Information We Share</h3>
            <p>
              We do not sell, rent, trade, share or otherwise disclose any information about our website
              visitors.
            </p>
          </section>

          <section className="terms-section">
            <h3>Security</h3>
            <p>
              We maintain security controls to protect against unauthorized disclosure, use or
              alteration of personal information in our possession.
            </p>
          </section>

          <section className="terms-section">
            <h3>Zambian Data Protection Compliance</h3>
            <p>
              Sethmo Group is committed to complying with the Data Protection Act No. 3 of 2021 of
              Zambia, which governs the collection, processing, and storage of personal data. In
              accordance with this Act, you have the right to access, correct, or request deletion of
              your personal data held by us. To exercise these rights, please contact us at the details
              provided below.
            </p>
          </section>

          <section className="terms-section">
            <h3>Updates to this Privacy Notice</h3>
            <p>
              We may change or update portions of this privacy notice at any time and without prior
              notice to you. We encourage you to review this page periodically for any updates.
            </p>
          </section>

          <section className="terms-section">
            <h3>Contact Us</h3>
            <p>
              You may choose to contact us through our website{' '}
              <a href="https://www.sethmogroup.com" className="terms-link" target="_blank" rel="noopener noreferrer">
                www.sethmogroup.com
              </a>{' '}
              or email us at{' '}
              <a href="mailto:info@sethmogroup.com" className="terms-link">info@sethmogroup.com</a> or{' '}
              <a href="mailto:customer@sethmogroup.com" className="terms-link">customer@sethmogroup.com</a>.
              You can send us a WHATSAPP message to{' '}
              <a href="https://wa.me/260767841135" className="terms-link" target="_blank" rel="noopener noreferrer">
                (+260) 767841135
              </a>
              . If you email us or submit comments or questions using the Contact Us form on this
              website, we will use the information you provide to respond to your inquiries.
            </p>
          </section>
        </div>

        <div className="terms-modal-footer">
          <p>&copy; {new Date().getFullYear()} Sethmo Group Limited. All rights reserved.</p>
          <button className="terms-close-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
