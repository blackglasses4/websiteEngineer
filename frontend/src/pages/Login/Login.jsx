import React, {useState} from 'react'
import {Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import './Login.scss';

const initialUser = {password: "", identifier: ""};

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const handleChange = () => {};
  const handleLogin = () => {};

  return (
    <Row className="login">
      <Col sm='12' md={{ size: 4, offset: 4}}>
        <div>
          <h2>Zaloguj się: </h2>
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
          </FormGroup>
          <Button color='primary' onClick={handleLogin}>Zaloguj się</Button>
        </div>
      </Col>
    </Row>
  )
}

export default Login