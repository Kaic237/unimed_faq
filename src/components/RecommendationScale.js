function RecommendationScale({ selectedScore, onSelect }) {
  const scores = [1, 2, 3, 4, 5];

  return (
    <div className="recommendation-scale">
      {scores.map((score) => {
        const isActive = score === selectedScore;
        return (
          <button
            key={score}
            type="button"
            className={`scale-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(score)}
          >
            {score}
          </button>
        );
      })}
    </div>
  );
}

export default RecommendationScale;


