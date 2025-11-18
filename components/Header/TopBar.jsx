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
          <div className="topbar-right">
            <button className="topbar-btn btn-subscribe">Inscrever-se</button>
            <button className="topbar-btn btn-login">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

