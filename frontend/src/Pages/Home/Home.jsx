import React from 'react';
import PopularProduct from '../../Components/PopularProduct/PopularProduct';
import CookieBanner from '../../Components/CookieBanner/CookieBanner';
import './Home.scss';

const Home = () => {
  return (
    <div>
        <CookieBanner />

        <section id="welcome" className="section__welcome">
          <div className="section__welcome-content">
              <h2>„Z nami osiągniesz więcej – w stylu i komforcie.”</h2>
              <p>„Oferujemy odzież sportową, która łączy wygodę, funkcjonalność i nowoczesny design. Dzięki naszym produktom osiągniesz więcej – zarówno na treningu, jak i na co dzień. Wybierz jakość, która wspiera Twoje pasje i cele.”</p>
              <button>Dowiedz się więcej</button>
          </div>
        </section>

        <PopularProduct/>

        <section id="offer" className="section__offer">
          <div className="section__offer-content">
              <h2>Nie daj się ograniczeniom</h2>
              <p>W naszych koszulkach sportowych i kurtkach poczujesz się komfortowo i gotowy na każdy trening – bez względu na warunki. Wybierz odzież, która wspiera Twoją aktywność przez cały rok.</p>
              <button>Zobacz produkty</button>
          </div>
        </section>

        <section className="section__category">
          <div className="section__category-card">
            <div className="category-image"></div>
            <div className="category-content">
              <h3>Kategoria 1</h3>
              <p>Opis kategorii 1</p>
              <a href="/kategoria-1" className="btn">Zobacz więcej</a>
            </div>
          </div>

          <div className="section__category-card">
            <div className="category-image"></div>
            <div className="category-content">
              <h3>Kategoria 2</h3>
              <p>Opis kategorii 2</p>
              <a href="/kategoria-2" className="btn">Zobacz więcej</a>
            </div>
          </div>

          <div className="section__category-card">
            <div className="category-image"></div>
            <div className="category-content">
              <h3>Kategoria 3</h3>
              <p>Opis kategorii 3</p>
              <a href="/kategoria-3" className="btn">Zobacz więcej</a>
            </div>
          </div>

          <div className="section__category-card">
            <div className="category-image"></div>
            <div className="category-content">
              <h3>Kategoria 4</h3>
              <p>Opis kategorii 4</p>
              <a href="/kategoria-4" className="btn">Zobacz więcej</a>
            </div>
          </div>
        </section>
    </div>
  );
}

export default Home;
