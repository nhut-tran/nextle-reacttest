import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { ReactComponent as Hamburger } from '../image/hamburger.svg';
import { ReactComponent as Power } from '../image/power.svg';
import { ReactComponent as LogoutIcon } from '../image/logout.svg';
import { ReactComponent as DashboardIllustration } from '../image/dashboard.svg';
import './dashboard.css';


const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  //const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard-page min-h-100vh d-flex flex-column">
      <Navbar light expand="md" className="bg-white px-3 py-2 dashboard-navbar position-relative">
        <NavbarBrand className="d-none d-md-block" href="/">Demo App</NavbarBrand>
        <div
          className="d-flex align-items-center d-md-none"
          onClick={() => setDrawerOpen(true)}
          style={{ cursor: 'pointer', fontSize: '1.5rem', userSelect: 'none', width: 24 }}
          aria-label="Open menu"
        >
          <Hamburger />
        </div>
        <Nav className="ms-auto d-flex align-items-center flex-row" navbar>
          <NavItem className="text-end me-3">
            <div className="fw-medium small">{user?.name || 'John Doe'}</div>
            <div className="text-muted small">Available</div>
          </NavItem>
          <div className="position-relative" style={{ cursor: 'pointer' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src={user?.avatarUrl || "/asset/img/default_avatar.png"}
              alt="avatar"
              className="avatar"
            />
            <span
              className="position-absolute bg-success rounded-circle"
              style={{
                width: '12px',
                height: '12px',
                bottom: '0',
                right: '0',
                border: '2px solid white',
              }}
            />
          </div>
        </Nav>
        {dropdownOpen && (
          <div
            className="position-absolute d-none d-md-block end-0 mt-2 me-3 bg-white border rounded shadow-sm"
            style={{ bottom: '0%', transform: 'translateY(100%)', zIndex: 100 }}
          >
            <div
              className="dropdown-item d-flex align-items-center ps-5 pe-3 py-2"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              Logout <Power className="ms-2" />
            </div>
          </div>
        )}
      </Navbar>
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center min-vh-100 py-5">
        <h2 className="text-secondary fw-bold mb-4">Welcome to Demo App</h2>
        <DashboardIllustration

          alt="Dashboard Illustration"
          className="dashboard-illustration my-auto"
        />

        <div
          className={`drawer ${drawerOpen ? 'open' : ''}`}
          onClick={() => { setDrawerOpen(false); }}
        >
          <div className="drawer-content">
            <div
              className="dropdown-item d-flex align-items-center px-3 py-2"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              <LogoutIcon className="me-3" /> Logout
            </div>
          </div>
        </div>
        <footer className="dashboard-footer w-100 text-start px-3 mt-auto">COPYRIGHT © {new Date().getFullYear()}</footer>
      </Container>
    </div>
  );
};

export default Dashboard;
