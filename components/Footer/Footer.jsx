'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import { getTranslation, getHomeUrl } from '@/utils/translations'
import { supportedLanguages, defaultLanguage } from '@/utils/translations'
import './Footer.css'

const Footer = () => {
  const pathname = usePathname()
  const pathSegments = pathname?.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  const lang = supportedLanguages.includes(firstSegment) ? firstSegment : defaultLanguage
  const t = (key) => getTranslation(key, lang)
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container-wide">
          
          <div className="footer-top">

            <div className="footer-top-left">
                <div className="footer-logo">
                  <a href="/" className="logo-section">              
                    <Image src="/weloverave.png" alt="We Love Rave" width={400} height={48} />              
                  </a>                
                </div>
                <p className="footer-text">
                  {lang === 'pt' && 'Sua fonte definitiva para notícias sobre música eletrônica. Cobertura completa de festivais, lançamentos, entrevistas exclusivas com DJs e produtores.'}
                  {lang === 'en' && 'Your definitive source for electronic music news. Complete coverage of festivals, releases, exclusive interviews with DJs and producers.'}
                  {lang === 'es' && 'Tu fuente definitiva de noticias sobre música electrónica. Cobertura completa de festivales, lanzamientos, entrevistas exclusivas con DJs y productores.'}
                </p>
                <p className="footer-text">
                  <strong>{lang === 'pt' ? 'Email:' : lang === 'en' ? 'Email:' : 'Correo:'}</strong> contact@weloverave.club
                </p>
            </div>

          </div>
            
          <div className="footer-middle">
            {/* Newsletter Widget - Beehiiv */}
            <div className="footer-widget">              
              <div className="widget widget-newsletter">                
                <p className="widget-text">
                  {t('common.newsletter.description')}
                </p>
                <iframe 
                  src="https://subscribe-forms.beehiiv.com/53b63e20-6c57-4b77-8bcb-a6f596870bd8" 
                  className="beehiiv-embed"
                  data-test-id="beehiiv-embed" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{
                    width: '100%',
                    maxWidth: '100%',      
                    height: '60px',
                    margin: 0,
                    borderRadius: '0px',
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                  }}
                />
              </div>              
            </div> 
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container-wide">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2026 WeLoveRave. {t('footer.copyright')}.
            </div>
            <div className="footer-social">
            
              <a href="https://www.facebook.com/weloverave.club/" target="_blank" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://x.com/WeLoveRaveClub" target="_blank" className="social-link" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/weloverave.club/" target="_blank" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com/@weloverave.club" target="_blank" className="social-link" aria-label="YouTube">
                <FaTiktok />
              </a>
            </div>
            <nav className="footer-nav">
              <Link href={getHomeUrl(lang)}>{t('menu.home')}</Link>
              <Link href={getHomeUrl(lang)}>{t('menu.allNews')}</Link>
            </nav>
            </div>
          </div>
        </div>
      
    </footer>
  )
}

export default Footer

