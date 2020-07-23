import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Link to="/about">
          <div className="footer-content about">
            Meet the Team
          </div>
        </Link>
        <div>
            Copyright &copy; 2020 Restaurant Roulette
          </div>
      </div>
    </footer>
  );  
};

export default Footer;