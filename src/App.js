import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CsatPage from './pages/CsatPage';
import FaqPage from './pages/FaqPage';

function App() {
  const [activePage, setActivePage] = useState('csat');

  const renderPage = activePage === 'faq' ? <FaqPage /> : <CsatPage />;

  return (
    <div className="app-shell">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main>{renderPage}</main>
      <Footer />
    </div>
  );
}

export default App;
