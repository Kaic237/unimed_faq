import { useEffect } from 'react';
import './AlertDialog.css';

function AlertDialog({ isOpen, onClose, title, message, type = 'info' }) {
  useEffect(() => {
    if (isOpen) {
      // Fechar ao pressionar ESC
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll do body quando dialog está aberto
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="alert-dialog-overlay" onClick={onClose}>
      <div 
        className={`alert-dialog ${type}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="alert-dialog-header">
          <h3 className="alert-dialog-title">{title}</h3>
          <button 
            className="alert-dialog-close" 
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="alert-dialog-body">
          <p>{message}</p>
        </div>
        <div className="alert-dialog-footer">
          <button 
            className="alert-dialog-button" 
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;

