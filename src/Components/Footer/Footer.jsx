import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="mt-16">
      <footer className="bg-base-200 text-base-content px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <aside className="flex flex-col items-center relative">
            {/* Logo container */}
            <div className="md:relative mt-7 w-32 h-32">
              <Link to='/'> <div className="md:absolute inset-0 flex justify-center items-center">
                
                <Logo width="100%" height="100%" scale={1.8} />
              </div></Link>
             
            </div>

            {/* Paragraph right below */}
            <p className="opacity-80 max-w-sm text-center absolute top-full -mt-10 md:-mt-30">
              A complete tuition management platform connecting students,
              tutors, and trusted academic support.
            </p>
          </aside>

          {/* Platform */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title">Platform</h6>
            <a className="link link-hover">Tuitions</a>
            <a className="link link-hover">Tutors</a>
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">Support</a>
          </nav>

          {/* Company */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title">Company</h6>
            <Link to='/aboutUs' className="link link-hover">About Us</Link>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Careers</a>
            <Link to='/contact' className="link link-hover">Contact</Link>
          </nav>

          {/* Legal */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Cookie Policy</a>
          </nav>

          {/* Social */}
          <nav className="flex flex-col gap-4">
            <h6 className="footer-title">Social Platforms</h6>
            <div className="flex gap-3">
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

      {/* Bottom copyright */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© {new Date().getFullYear()} eTuitionBD — All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
