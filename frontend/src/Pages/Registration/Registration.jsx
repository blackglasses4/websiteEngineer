import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

import { FaEnvelope, FaLock } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './Registration.scss';

const initialUser = { password: "", identifier: "" };

const Registration = () => {
  const [imageData, setImageData] = useState(null);
  const [user, setUser] = useState(initialUser);
  const handleChange = () => {};
  const handleLogin = () => {};

  useEffect(() => {
    const foundImage = {
      id: '1',
      path: "images/shirt_women8.jpg", // Zakładamy, że zdjęcie jest w folderze public/images
      alt: "Obraz do rejestracji, kobieta w sportowym ubraniu"
    };
    setImageData(foundImage);
  }, []);

  return (
    <div className="registration">
      {imageData && 
        <div className="register-image">
          <LazyLoadImage
            src={imageData.path}
            effect="blur"
            alt={`Image ${imageData.alt}`}
            width="100%"
            height="auto"
            threshold={100}
          />
        </div>
      }

      <div className="registration-form">
        <h1>Zarejestruj się!</h1>
        <FormGroup className='input-with-icon'> 
          <FaEnvelope className="input-icon" />
          <Input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Twój email">
          </Input>
        </FormGroup>
        <FormGroup className='input-with-icon'>
          <FaLock className="input-icon" />
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Hasło">
          </Input>
        </FormGroup>
        <p className='p-min'>Min. 8 znaków &bull; wielka litera &bull; mała litera &bull; cyfra</p>
        <div className="d-grid gap-2">
          <Button color='primary' onClick={handleLogin}>Zaloguj się</Button>
        </div>
        <p>Masz już swoje konto? <a href="/login">Zaloguj się</a></p>
      </div>
    </div>
  )
}

export default Registration;