import React from 'react';
import './Footer.scss';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

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
                    <p>Sprzęty</p>
                    <p>Odzież</p>
                    <p>Obuwie</p>
                </div>
            </div>
        </div>
        <p className='copyright'>Copyright © 2024 Nazwa | Polityka prywatności . Regulaminy . Klauzula informacyjna</p>
    </footer>
  )
}

export default Footer