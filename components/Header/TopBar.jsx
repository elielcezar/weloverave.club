'use client'

import React from 'react'
import Image from 'next/image'

import './TopBar.css'

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container-wide">
        <div className="topbar-content">
          <div className="topbar-left">
            
          </div>

          <div className="topbar-center">
            <a href="/" className="logo-section">
              
                <Image src="/weloverave.png" alt="We Love Rave" width={400} height={48} />
              
            </a>
          </div>

          <div className="topbar-right">
            {/*<button className="topbar-btn btn-subscribe">SUBSCRIBE</button>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

