function SentimentSelector({ options, selected, onSelect }) {
  return (
    <div className="sentiment-selector">
      {options.map((option) => {
        const isActive = option.id === selected;
        return (
          <button
            type="button"
            key={option.id}
            aria-pressed={isActive}
            className={`sentiment-card ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(option.id)}
            aria-label={option.label}
          >
            <span className="sentiment-icon" role="img" aria-label={option.label}>
              {option.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default SentimentSelector;

