import unimedLogo from '../assets/unimed_logo.jpeg';

function Header({ activePage, onNavigate }) {
  return (
    <header className="site-header">
      <div className="logo">
        <img
          src={unimedLogo}
          alt="Unimed Alto São Francisco"
          className="logo-img"
        />
      </div>

      <nav>
        <button
          type="button"
          className={activePage === 'csat' ? 'active' : ''}
          onClick={() => onNavigate('csat')}
        >
          Avaliação
        </button>
        <button
          type="button"
          className={activePage === 'faq' ? 'active' : ''}
          onClick={() => onNavigate('faq')}
        >
          FAQ
        </button>
      </nav>
    </header>
  );
}

export default Header;

