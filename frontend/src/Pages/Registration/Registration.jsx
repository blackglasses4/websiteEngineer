import React, {useEffect, useState} from 'react';
import {Col, Row, Button, FormGroup, Input} from 'reactstrap';
import './Registration.scss';

const initialUser = {password: "", identifier: ""};

const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const handleChange = () => {};
  const handleLogin = () => {};

  return (
    <Row className="registration">
      <Col sm='12' md={{ size: 4, offset: 4}}>
        <div>
          <h1>Zarejestruj się!</h1>
          <FormGroup>
            <Input
              type="email"
              name="identifier"
              value={user.identifier}
              onChange={handleChange}
              placeholder="Twój email">
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Hasło">
            </Input>
            <p className='p-min'>Min. 8 znaków &bull; wielka litera &bull; mała litera &bull; cyfra</p>
          </FormGroup>
          <div className="d-grid gap-2">
            <Button color='primary' onClick={handleLogin}>Zaloguj się</Button>
          </div>
          {/* <Button color='primary' disabled={isLoading} onClick={!isLoading ? handleClick : null}>
              {isLoading ? 'Loading…' : 'Zaloguj się'}
            </Button> */}
          <p>Masz już swoje konto? <a href="/login">Zaloguj się</a></p>
        </div>
      </Col>
    </Row>
  )
}

export default Registration