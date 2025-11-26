import instagramIcon from '../assets/ico_instagram-hover.svg';
import googlePlayImage from '../assets/google_play.png';
import appStoreImage from '../assets/app_store.svg';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div className="footer-card">
          <p className="footer-title">Sede Administrativa Unimed Alto São Francisco</p>
          <p>Rua Dr. Teixeira Soares, 151 – Centro</p>
          <p>Formiga – MG | CEP: 35570-090</p>
        </div>

        <div className="footer-card">
          <p className="footer-title">Central de Atendimento Formiga</p>
          <p className="footer-phone">(37) 3329-6100</p>
          <p>De segunda a sexta, das 07:30h às 17:30h</p>
        </div>

        <div className="footer-card">
          <p className="footer-title">Siga nossas redes sociais:</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/unimedaltosaofrancisco" target="_blank" rel="noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
          </div>

          <p className="footer-title">Baixe nosso aplicativo</p>
          <div className="store-buttons">
            <a className="store-btn" href="https://play.google.com/store/apps/details?id=br.coop.unimed.cliente" target="_blank" rel="noreferrer">
              <img src={googlePlayImage} alt="Disponível no Google Play" className="store-image" />
            </a>
            <a className="store-btn" href="https://apps.apple.com/br/app/unimed-cliente/id1458902471" target="_blank" rel="noreferrer">
              <img src={appStoreImage} alt="Baixar na App Store" className="store-image" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <p className="footer-copy">Copyright 2001 - {currentYear} Unimed do Brasil - Todos os direitos reservados</p>
    </footer>
  );
}

export default Footer;

