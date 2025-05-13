import React, { useContext } from 'react';
import { LoggedinContext } from '../GlobalContexts/Contexts';

const Footer = () => {

    const {downloading} = useContext(LoggedinContext)


  return (
    <footer className={` ${downloading?'d-none':''}  bg-dark text-white fixed-bottom py-4 mt-5`}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>PharmaOne Aims to bring together medicines from all local stores around you to your doorstep</p>
          </div>
          
          <div className="col-md-6">
            <h5>Contact</h5>
            <p>Email: pharmaone@email.com</p>
            <div>
              <a href="#" className="text-white me-2"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-2"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <hr className="border-light"/>
        <div className="text-center">
        <p>Email: <a href="mailto:example@email.com" className="text-white">pharmaone@email.com</a></p>
          <p>&copy; 2025 PharmaOne. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
