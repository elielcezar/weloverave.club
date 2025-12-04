'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram, FaYoutube, FaVimeoV } from 'react-icons/fa'
import { getTranslation } from '@/utils/translations'
import './Sidebar.css'

const Sidebar = ({ posts = [], lang = 'en' }) => {
  const t = (key) => getTranslation(key, lang)
  
  // Derive trending posts (e.g., first 3)
  const trendingPosts = posts.slice(0, 3);

  // Derive small posts (e.g., next 4)
  const smallPosts = posts.slice(3, 7);

  return (
    <div className="sidebar">      

      
    </div>
  )
}

export default Sidebar

