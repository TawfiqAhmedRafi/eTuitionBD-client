import React from "react";
import logoImg from '../../assets/logo.png'
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
     <div className="mt-16">
      <footer className="bg-base-200 text-base-content px-2 md:px-6 py-12">
        <div className=" grid gap-10 
                        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          
          {/* Brand */}
          <aside>
            <div className="text-2xl flex items-center font-bold mb-2" style={{ fontFamily: "Sora" }}>
             <img className="w-10 h-10" src={logoImg} alt="Logo" /> eTuitionBD 
            </div>
            <p className="opacity-80 max-w-sm">
              A complete tuition management platform connecting students, tutors,
              and trusted academic support.
            </p>
          </aside>

          {/* Platform */}
          <nav className="grid grid-cols-1">
            <h6 className="footer-title">Platform</h6>
            <a className="link link-hover">Tuitions</a>
            <a className="link link-hover">Tutors</a>
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">Support</a>
          </nav>

          {/* Company */}
          <nav className="grid grid-cols-1">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Contact</a>
          </nav>

          {/* Legal */}
          <nav className="grid grid-cols-1">
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Cookie Policy</a>
          </nav>


          <nav className="flex flex-col justify-start">
            <h6 className="footer-title">Social Platforms</h6>
             <div className="flex items-center ">
                <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex justify-center items-center rounded-full bg-base-200 text-gray-400 hover:bg-accent hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex justify-center items-center rounded-full bg-base-200 text-gray-400 hover:bg-accent hover:text-white transition-colors"
            >
              <FaXTwitter /> 
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex justify-center items-center rounded-full bg-base-200 text-gray-400 hover:bg-accent hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex justify-center items-center rounded-full bg-base-200 text-gray-400 hover:bg-accent hover:text-white transition-colors"
            >
              <FaLinkedin />
            </a>
             </div>
          </nav>
        </div>
      </footer>

      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© {new Date().getFullYear()} eTuitionBD — All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
