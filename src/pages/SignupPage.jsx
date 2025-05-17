import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Container,
  Row,
  Col
} from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SocialMedia from '../components/SocicalMedia';
import { signup } from '../features/auth/authSlice';
import { ReactComponent as SignupIllustration } from '../image/signup.svg';
import './signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: submitting } = useSelector(state => state.auth);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreed: false
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const validate = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    if (!form.firstName) errors.firstName = 'First name is required';
    if (!form.lastName) errors.lastName = 'Last name is required';

    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Email is not valid';
    }

    if (!form.password) {
      errors.password = 'Password is required';
    } else if (
      form.password.length < 6 ||
      form.password.length > 18 ||
      !/[A-Za-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)
    ) {
      errors.password =
        'Password must be 6-18 characters and contain at least one letter, one digit, and one special character';
    }

    return errors;
  };

  const errors = validate();
  const isFormValid =
    Object.values(errors).every(x => x === '') && form.agreed && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, password: true });

    if (!isFormValid) return;

    try {

      await dispatch(signup({ firstName: form.firstName, lastName: form.lastName, password: form.password, email: form.email })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <Container fluid className="signup-container">
      <Row style={{ backgroundColor: "#F8F8F8" }} className="flex-column flex-md-row min-vh-100">
        <Col md="8" className="text-center d-flex justify-content-center align-items-center">
          <SignupIllustration
            alt="Signup"
            className="img-fluid signup-illustration"
          />
        </Col>

        <Col md="4" className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>
          <div className="signup-box p-2 p-md-5 w-100 mt-3 mt-md-5">
            <div className="signup-header mb-4">
              <h4>Adventure starts here</h4>
              <p>Make your app management easy and fun!</p>
            </div>

            <Form className="w-100" onSubmit={handleSubmit} noValidate>
              <FormGroup className='mb-0'>
                <Label className="required-label" for="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur('firstName')}
                  invalid={touched.firstName && !!errors.firstName}
                />
                <FormFeedback>{errors.firstName}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label className="required-label" for="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur('lastName')}
                  invalid={touched.lastName && !!errors.lastName}
                />
                <FormFeedback>{errors.lastName}</FormFeedback>
              </FormGroup>

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
                  name="agreed"
                  id="agree"
                  checked={form.agreed}
                  onChange={handleChange}
                  className="me-2"
                />
                <Label for="agree" check>
                  I agree to <Link to="#" className="action-link">privacy policy & terms</Link>
                </Label>
              </FormGroup>

              <Button className="action-button" block disabled={!isFormValid || submitting}>
                {submitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Form>

            <div className="signup-footer mt-4 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="action-link" onClick={() => navigate('/login')}>
                  Sign in instead
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
