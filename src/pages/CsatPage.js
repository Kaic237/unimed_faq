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

// Google Forms submission URL
// Para descobrir os IDs corretos dos campos:
// 1. Abra o Google Forms no navegador
// 2. Abra as ferramentas de desenvolvedor (F12)
// 3. Inspecione os campos do formulário
// 4. Procure por atributos "name" que começam com "entry."
// 5. Substitua os IDs abaixo pelos IDs reais encontrados
const GOOGLE_FORM_ID = '1FAIpQLSc3LhzyUdBdDDpCcGpHdz7JWurvLMjE1z8paGffIUMKV4_1mQ';
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

// IDs dos campos do Google Forms (ajuste conforme necessário)
const FIELD_IDS = {
  recommendation: 'entry.758117700', // Campo: Recomendação (0-5)
  sentiment: 'entry.337258985',       // Campo: Sentimento (0-5)
  feedback: 'entry.510131250',         // Campo: Feedback (texto)
};

function CsatPage() {
  const [recommendationScore, setRecommendationScore] = useState(null);
  const [sentiment, setSentiment] = useState(null);
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
    if (recommendationScore === null) {
      console.error('[CSAT Form] Erro de validação: Nota de recomendação não selecionada');
      showDialog('Atenção', 'Por favor, selecione uma nota de recomendação.', 'warning');
      return;
    }

    if (sentiment === null) {
      console.error('[CSAT Form] Erro de validação: Sentimento não selecionado');
      showDialog('Atenção', 'Por favor, selecione como você avalia o atendimento.', 'warning');
      return;
    }

    if (!feedback.trim()) {
      console.error('[CSAT Form] Erro de validação: Campo de feedback vazio');
      showDialog('Atenção', 'Por favor, preencha o campo de feedback.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('[CSAT Form] Iniciando envio do formulário...', {
        recommendationScore,
        sentiment,
        feedbackLength: feedback.trim().length
      });

      // Mapear sentiment para valor numérico (0-4)
      const selectedSentiment = SentimentOptions.find((opt) => opt.id === sentiment);
      const sentimentValue = selectedSentiment ? selectedSentiment.value : 4;

      // Mapear sentiment (0-4) para escala 0-5 do Google Forms
      const sentimentMapped = Math.round((sentimentValue / 4) * 5);

      console.log('[CSAT Form] Valores mapeados:', {
        sentimentOriginal: sentiment,
        sentimentValue,
        sentimentMapped,
        recommendationScore
      });

      // Preparar dados do formulário no formato URL-encoded
      const params = new URLSearchParams();
      params.append(FIELD_IDS.recommendation, recommendationScore.toString());
      params.append(FIELD_IDS.sentiment, sentimentMapped.toString());
      params.append(FIELD_IDS.feedback, feedback.trim());

      console.log('[CSAT Form] Dados preparados para envio:', {
        recommendation: recommendationScore.toString(),
        sentiment: sentimentMapped.toString(),
        feedbackLength: feedback.trim().length,
        formUrl: GOOGLE_FORM_URL
      });

      // Enviar usando fetch com no-cors para evitar problemas de CSP
      try {
        console.log('[CSAT Form] Enviando dados via fetch...');
        const response = await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors', // <--- OBRIGATÓRIO: Sem isso, dá erro!
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString()
        });
        
        // Com no-cors, não podemos verificar o status da resposta
        // mas o envio foi iniciado
        console.log('[CSAT Form] Requisição enviada com sucesso (no-cors mode)', response);
        console.log('parametros enviados', params.toString());
      } catch (fetchError) {
        console.error('[CSAT Form] Erro ao enviar via fetch:', fetchError);
        // Mesmo com erro, tentamos enviar via formulário HTML como fallback
        throw fetchError;
      }

      // Com no-cors, não podemos verificar o status, mas assumimos sucesso
      setSubmitStatus('success');
      console.log('[CSAT Form] Status atualizado para sucesso');
      showDialog('Sucesso!', 'Obrigado por compartilhar sua experiência com a Unimed!', 'success');
      
      // Limpar formulário
      setRecommendationScore(null);
      setSentiment(null);
      setFeedback('');
      console.log('[CSAT Form] Formulário limpo após envio bem-sucedido');
    } catch (error) {
      console.error('[CSAT Form] Erro ao enviar formulário:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        recommendationScore,
        sentiment,
        feedbackLength: feedback ? feedback.length : 0,
        timestamp: new Date().toISOString()
      });
      setSubmitStatus('error');
      showDialog('Erro', 'Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.', 'error');
    } finally {
      setIsSubmitting(false);
      console.log('[CSAT Form] Estado de submissão finalizado');
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
              <h3>Em uma escala de 0 a 5, o quanto você recomendaria a Unimed?</h3>
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
              <h3>O que podemos fazer para melhorar sua experiência?</h3>
              <span className="required">*</span>
            </div>
            <textarea
              className="feedback-textarea"
              placeholder="Compartilhe suas sugestões, críticas ou elogios..."
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              required
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

