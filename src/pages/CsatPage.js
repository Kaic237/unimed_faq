import RecommendationScale from '../components/RecommendationScale';
import SentimentSelector from '../components/SentimentSelector';
import AlertDialog from '../components/AlertDialog';
import { useState } from 'react';

const SentimentOptions = [
  {
    id: 'very-bad',
    label: 'Muito insatisfeito',
    icon: '😠',
    value: 0,
  },
  {
    id: 'bad',
    label: 'Insatisfeito',
    icon: '🙁',
    value: 1,
  },
  {
    id: 'neutral',
    label: 'Neutro',
    icon: '😐',
    value: 2,
  },
  {
    id: 'good',
    label: 'Satisfeito',
    icon: '🙂',
    value: 3,
  },
  {
    id: 'great',
    label: 'Muito satisfeito',
    icon: '😁',
    value: 4,
  },
];


const GOOGLE_FORM_ID = '1FAIpQLSc3LhzyUdBdDDpCcGpHdz7JWurvLMjE1z8paGffIUMKV4_1mQ';
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const FIELD_IDS = {
  prestador: 'entry.594448763',       // Campo: Prestador (texto)
  recommendation: 'entry.758117700', // Campo: Recomendação (1-5)
  sentiment: 'entry.337258985',       // Campo: Sentimento (0-5)
  dataPrivacy: 'entry.294372701',     // Campo: Dados pessoais (1-5)
  feedback: 'entry.510131250',         // Campo: Feedback (texto)
};

function CsatPage() {
  const [prestador, setPrestador] = useState('');
  const [recommendationScore, setRecommendationScore] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [dataPrivacy, setDataPrivacy] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showDialog = (title, message, type = 'info') => {
    setDialog({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeDialog = () => {
    setDialog({
      isOpen: false,
      title: '',
      message: '',
      type: 'info'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação
    if (!prestador.trim()) {
      showDialog('Atenção', 'Por favor, informe o prestador onde realizou o atendimento.', 'warning');
      return;
    }

    if (recommendationScore === null) {
      showDialog('Atenção', 'Por favor, selecione uma nota de recomendação.', 'warning');
      return;
    }

    if (sentiment === null) {
      showDialog('Atenção', 'Por favor, selecione como você avalia o atendimento.', 'warning');
      return;
    }

    if (dataPrivacy === null) {
      showDialog('Atenção', 'Por favor, responda sobre o tratamento dos seus dados pessoais.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Mapear sentiment para valor numérico (0-4)
      const selectedSentiment = SentimentOptions.find((opt) => opt.id === sentiment);
      const sentimentValue = selectedSentiment ? selectedSentiment.value : 4;

      // Mapear sentiment (0-4) para escala 0-5 do Google Forms
      const sentimentMapped = Math.round((sentimentValue / 4) * 5);

      // Preparar dados do formulário no formato URL-encoded
      const params = new URLSearchParams();
      params.append(FIELD_IDS.prestador, prestador.trim());
      params.append(FIELD_IDS.recommendation, recommendationScore.toString());
      params.append(FIELD_IDS.sentiment, sentimentMapped.toString());
      params.append(FIELD_IDS.dataPrivacy, dataPrivacy.toString());
      params.append(FIELD_IDS.feedback, feedback.trim());

      // Enviar usando fetch com no-cors para evitar problemas de CSP
      try {
        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors', // <--- OBRIGATÓRIO: Sem isso, dá erro!
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString()
        });
      } catch (fetchError) {
        // Mesmo com erro, tentamos enviar via formulário HTML como fallback
        throw fetchError;
      }

      // Com no-cors, não podemos verificar o status, mas assumimos sucesso
      setSubmitStatus('success');
      showDialog('Sucesso!', 'Obrigado por compartilhar sua experiência com a Unimed!', 'success');
      
      // Limpar formulário
      setPrestador('');
      setRecommendationScore(null);
      setSentiment(null);
      setDataPrivacy(null);
      setFeedback('');
    } catch (error) {
      setSubmitStatus('error');
      showDialog('Erro', 'Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page csat-page">
      <div className="card csat-card">
        <h2>Avalie sua experiência</h2>
        <p className="subtitle">
        Queremos saber como foi sua experiência com a Unimed Alto São Francisco para continuarmos melhorando nosso atendimento.        </p>

        <form onSubmit={handleSubmit} className="csat-form">
          <div className="form-block">
            <div className="form-header">
              <h3>Em qual prestador você realizou o atendimento?</h3>
              <span className="required">*</span>
            </div>
            <input
              type="text"
              className="form-input"
              placeholder="Digite o nome do prestador..."
              value={prestador}
              onChange={(event) => setPrestador(event.target.value)}
              required
            />
          </div>

          <div className="form-block">
            <div className="form-header">
              <h3>O quanto você recomendaria a Unimed?</h3>
              <span className="required">*</span>
            </div>
            <RecommendationScale
              selectedScore={recommendationScore}
              onSelect={setRecommendationScore}
            />
            <div className="scale-legend">
              <span>Não recomendaria</span>
              <span>Recomendaria</span>
            </div>
          </div>

          <div className="form-block">
            <div className="form-header">
              <h3>Como você avalia o atendimento médico que recebeu hoje?</h3>
              <span className="required">*</span>
            </div>
            <SentimentSelector
              options={SentimentOptions}
              selected={sentiment}
              onSelect={setSentiment}
            />
            <div className="scale-legend">
              <span>Muito insatisfeito(a)</span>
              <span>Muito satisfeito(a)</span>
            </div>
          </div>

          <div className="form-block">
            <div className="form-header">
              <h3>Você considera que seus dados pessoais foram tratados de forma adequada e segura?</h3>
              <span className="required">*</span>
            </div>
            <RecommendationScale
              selectedScore={dataPrivacy}
              onSelect={setDataPrivacy}
            />
            <div className="scale-legend">
              <span>Discordo totalmente</span>
              <span>Concordo totalmente</span>
            </div>
          </div>

          <div className="form-block">
            <div className="form-header">
              <h3>O que podemos fazer para melhorar sua experiência?</h3>
            </div>
            <textarea
              className="feedback-textarea"
              placeholder="Compartilhe suas sugestões, críticas ou elogios..."
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </form>
      </div>

      <AlertDialog
        isOpen={dialog.isOpen}
        onClose={closeDialog}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </section>
  );
}

export default CsatPage;

