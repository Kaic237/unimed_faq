import { useState } from 'react';

function FaqCard({ entry }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`faq-item ${isOpen ? 'open' : ''}`}>
      <header onClick={() => setIsOpen((prev) => !prev)}>
        <div>
          <p className="category">{entry.category}</p>
          <h3>{entry.question}</h3>
        </div>
        <span className="toggle" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </header>

      {isOpen && (
        <div className="faq-content">
          <p>{entry.answer}</p>
          <div className="faq-keywords">
            {(entry.keywords || []).map((keyword) => (
              <span key={keyword} className="chip">
                #{keyword}
              </span>
            ))}
          </div>

          <div className="faq-extra">
            {entry.relatedLinks?.length ? (
              <div>
                <p className="extra-title">Links úteis</p>
                <ul>
                  {entry.relatedLinks.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {entry.contact ? (
              <div>
                <p className="extra-title">Contato</p>
                <p>{entry.contact.email}</p>
                <p>{entry.contact.phone}</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </article>
  );
}

export default FaqCard;


