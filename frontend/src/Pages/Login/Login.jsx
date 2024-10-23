import React, {useEffect, useState} from 'react'
import {Col, Row, Button, FormGroup, Input} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.scss';

const initialUser = {password: "", identifier: ""};

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const handleChange = ({target}) => {
    const { name, value } = target;

    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }))
  };
  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const res = await axios.post(url, user);
        console.log({res});
      }
    }
    catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      })
    }
  };

  return (
    <Row className="login">
      <Col sm='12' md={{ size: 4, offset: 4}}>
        <div>
          <h1>Zaloguj się!</h1>
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
          <p>Nie masz jeszcze konta? <a href="/registration">Zarejestruj się</a></p>
        </div>
      </Col>
    </Row>
  )
}

export default Login