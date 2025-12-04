'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa'
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
          <div className="footer-grid">
            {/* About Widget */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">
                {lang === 'pt' && 'Sobre Nós'}
                {lang === 'en' && 'About Us'}
                {lang === 'es' && 'Sobre Nosotros'}
              </h3>
              <div className="footer-logo">
                <div className="footer-logo-text">We Love Rave</div>
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

             {/* Categories */}
             <div className="footer-widget">
              <h3 className="footer-widget-title">
                {lang === 'pt' ? 'Categorias' : lang === 'en' ? 'Categories' : 'Categorías'}
              </h3>
              <ul className="footer-links">
                <li><Link href={getHomeUrl(lang)}>{lang === 'pt' ? 'Todas' : lang === 'en' ? 'All' : 'Todas'}</Link></li>
                <li><Link href={`${getHomeUrl(lang)}?categoria=festival`}>{lang === 'pt' ? 'Eventos' : lang === 'en' ? 'Events' : 'Eventos'}</Link></li>
                <li><Link href={`${getHomeUrl(lang)}?categoria=music`}>{lang === 'pt' ? 'Música' : lang === 'en' ? 'Music' : 'Música'}</Link></li>
                <li><Link href={getHomeUrl(lang)}>{lang === 'pt' ? 'Tecnologia' : lang === 'en' ? 'Technology' : 'Tecnología'}</Link></li>
              </ul>
            </div>

            {/* Popular Posts */}
            <div className="footer-widget">              
              {/* Newsletter Widget */}
                <div className="widget widget-newsletter">
                  <h3 className="widget-title">{t('common.newsletter.title')}</h3>
                  <p className="widget-text">
                    {t('common.newsletter.description')}
                  </p>
                  <form className="newsletter-form">
                    <input
                      type="email"
                      placeholder={t('common.newsletter.placeholder')}
                      className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-btn">
                      {t('common.newsletter.subscribe')}
                    </button>
                  </form>
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
              © 2024 WeLoveRave. {t('footer.copyright')}.
            </div>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="footer-social-link" aria-label="Pinterest">
                <FaPinterest />
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

