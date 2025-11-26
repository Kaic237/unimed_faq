import { useMemo, useState } from 'react';
import faqSchema from '../data/faqSchema.json';
import FaqSearch from '../components/FaqSearch';
import FaqCard from '../components/FaqCard';
import bannerImage from '../assets/banner.png.webp';

function FaqPage() {
  const [query, setQuery] = useState('');
  const entries = faqSchema.faqEntries;

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return entries;
    }

    return entries.filter((entry) => {
      const searchableText = [
        entry.question,
        entry.answer,
        entry.category,
        ...(entry.keywords || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [entries, query]);

  return (
    <section className="page faq-page">
      <div className="faq-banner">
        <img src={bannerImage} alt="Banner Unimed" className="banner-image" />
        <div className="banner-content">
          <span className="badge">FAQ Inteligente</span>
          <h1>Encontre respostas rapidamente</h1>
          <p>
            Busque por palavras-chave ou categorias e descubra orientações oficiais
            da Unimed Alto São Francisco.
          </p>
        </div>
      </div>

      <div className="card faq-card">
        <FaqSearch value={query} onChange={setQuery} />
        <div className="faq-meta">
          <span>{filteredEntries.length} resultados</span>
          <span>Base atualizada em {faqSchema.metadata.updatedAt}</span>
        </div>

        <div className="faq-list">
          {filteredEntries.map((entry) => (
            <FaqCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqPage;

