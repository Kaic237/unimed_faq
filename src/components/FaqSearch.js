function FaqSearch({ value, onChange }) {
  return (
    <div className="faq-search">
      <label htmlFor="faq-search-input">Busque por palavras-chave</label>
      <div className="search-field">
        <input
          id="faq-search-input"
          type="search"
          placeholder="Ex.: autorização, guia médico, boleto..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="shortcut">Ctrl+K</span>
      </div>
    </div>
  );
}

export default FaqSearch;

