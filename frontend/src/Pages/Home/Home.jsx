import React from 'react';
import { Link } from 'react-router-dom';
import PopularProduct from '../../Components/PopularProduct/PopularProduct';
import CookieBanner from '../../Components/CookieBanner/CookieBanner';
import './Home.scss';

const Home = () => {
  return (
    <div>
        <section id="welcome" className="section__welcome">
          <div className="section__welcome-content">
              <h2>„Z nami osiągniesz więcej – w stylu i komforcie.”</h2>
              <p>„Oferujemy odzież sportową, która łączy wygodę, funkcjonalność i nowoczesny design. Dzięki naszym produktom osiągniesz więcej – zarówno na treningu, jak i na co dzień. Wybierz jakość, która wspiera Twoje pasje i cele.”</p>
              <Link to="/koszulka" className="button">Zobacz produkty</Link>
          </div>
        </section>

        <PopularProduct/>

        <section id="offer" className="section__offer">
          <div className="section__offer-content">
              <h2>Nie daj się ograniczeniom</h2>
              <p>W naszych koszulkach sportowych i kurtkach poczujesz się komfortowo i gotowy na każdy trening – bez względu na warunki. Wybierz odzież, która wspiera Twoją aktywność przez cały rok.</p>
              <Link to="/kurtka" className="button">Zobacz produkty</Link>
          </div>
        </section>

        <section className="section__category">
          <Link to="/kurtka" className="section__category-card">
              <div className="category-image"></div>
              <div className="category-content">
                  <h2>Kurtki</h2>
              </div>
          </Link>

          <Link to="/stroje" className="section__category-card">
              <div className="category-image"></div>
              <div className="category-content">
                  <h2>Stroje</h2>
              </div>
          </Link>

          <Link to="/koszulka" className="section__category-card">
              <div className="category-image"></div>
              <div className="category-content">
                  <h2>Koszulki</h2>
              </div>
          </Link>

          <Link to="/czapka" className="section__category-card">
              <div className="category-image"></div>
              <div className="category-content">
                  <h2>Czapki</h2>
              </div>
          </Link>
        </section>
    </div>
  );
}

export default Home;
