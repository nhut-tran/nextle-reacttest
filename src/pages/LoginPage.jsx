import React, { useState } from 'react';
import {
  Container, Form, FormGroup, Label, Input, Button, FormFeedback, Row, Col
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import SocialMedia from '../components/SocicalMedia';
import { ReactComponent as LoginIllustration } from '../image/login.svg';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading } = useSelector(state => state.auth);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const validate = () => {
    const errors = {
      email: '',
      password: ''
    };


    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Email is not valid';
    }

    if (!form.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };
  let errors = validate();
  const isFormValid =
    Object.values(errors).every(x => x === '')

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      await dispatch(login(form)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed");
    }
  };
  return (
    <Container fluid className="signup-container">
      <Row style={{ backgroundColor: "#F8F8F8" }} className="flex-column flex-md-row min-vh-100">
        <Col md="8" className="text-center d-flex justify-content-center align-items-center">
          <LoginIllustration
            className="img-fluid signup-illustration"
          />
        </Col>

        <Col md="4" className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>
          <div className="signup-box p-2 p-md-5 w-100 mt-3 mt-md-5">
            <div className="signup-header mb-4">
              <h4>Welcome to ReactJS Test Interview! 👋🏻</h4>
              <p>Please sign-in to your account and start the adventure</p>
            </div>
            <Form className="w-100" onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <Label className="required-label" for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur('email')}
                  invalid={touched.email && !!errors.email}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label className="required-label" for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur('password')}
                  invalid={touched.password && !!errors.password}
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              <FormGroup check className="mb-3 mt-3 mt-md-5 d-flex align-items-center">
                <Input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={form.agreed}
                  onChange={handleChange}
                  className="me-2"
                />
                <Label for="agree" check>
                  Remember me
                </Label>
              </FormGroup>
              <Button className="action-button" block disabled={!isFormValid || loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" />}
                Login
              </Button>
            </Form>

            <div className="signup-footer mt-4 text-center">
              <p>
                New on our platform?{' '}
                <Link to="/signup" className="action-link" >
                  Create an account
                </Link>
              </p>
              <div className="or-divider mt-3">
                <span>or</span>
              </div>
              <SocialMedia />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
