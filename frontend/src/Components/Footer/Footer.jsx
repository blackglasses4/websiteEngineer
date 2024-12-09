import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube} from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Footer.scss';


const Footer = () => {
  return (
    <footer>
        <div className='f-top'>
            <div className='f-contact'>
                <div className='f-contact-form'>
                    <h2>Skontaktuj się z nami</h2>
                    <p>Formularz kontaktowy</p>
                </div>
                <div className='f-contact-community'>
                    <h2>Dołącz do społeczności</h2>
                    <div className="icons">
                        <a href="/"><FaInstagram /></a>
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaYoutube /></a>
                    </div>
                </div>
            </div>
            
            <div className='f-subpages'>
                <div className="f-subpages-name">
                    <h2>Nazwa</h2>
                    <p>O sklepie</p>
                </div>
                <div className="f-subpages-offer">
                    <h2>Oferta</h2>
                    <Link to="/koszulka" className='f-link' rel='internal'>Koszulki</Link>
                    <Link to="/kurtka" className='f-link' rel='internal'>Kurtki</Link>
                    <Link to="/spodnie" className='f-link' rel='internal'>Spodnie</Link>
                    <Link to="/czapka" className='f-link' rel='internal'>Czapki</Link>
                    <Link to="/bielizna" className='f-link' rel='internal'>Bielizna</Link>
                    <Link to="/equipment" className='f-link' rel='internal'>Sprzęty</Link>
                </div>
            </div>
        </div>
        <p className='copyright'>Copyright © 2024 Nazwa | Polityka prywatności . Regulaminy . Klauzula informacyjna</p>
    </footer>
  )
}

export default Footer