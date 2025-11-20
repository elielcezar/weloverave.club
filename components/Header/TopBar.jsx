'use client'

import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import './TopBar.css'

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container-wide">
        <div className="topbar-content">
          <div className="topbar-left">
            <div className="social-icons">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="topbar-center">
            <a href="/" className="logo-section">
              <div className="logo-main">GOOD<span className="logo-accent">NEWS</span></div>
            </a>
          </div>

          <div className="topbar-right">
            <button className="topbar-btn btn-subscribe">SUBSCRIBE</button>
            <button className="topbar-btn btn-login">
              <span className="login-icon">👤</span> LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

