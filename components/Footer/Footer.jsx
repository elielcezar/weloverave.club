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
                <strong>{lang === 'pt' ? 'Email:' : lang === 'en' ? 'Email:' : 'Correo:'}</strong> contact@weloverave.club<br />
                <strong>{lang === 'pt' ? 'Contato:' : lang === 'en' ? 'Contact:' : 'Contacto:'}</strong> +55 11 9999-9999
              </p>
            </div>

            {/* Popular Posts */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">{t('footer.popularPosts')}</h3>
              <div className="footer-posts">
                <article className="footer-post">
                  <h4 className="footer-post-title">
                    Calvin Harris Anuncia Novo Album para 2024
                  </h4>
                  <span className="footer-post-date">Nov 18, 2024</span>
                </article>
                <article className="footer-post">
                  <h4 className="footer-post-title">
                    Tomorrowland Revela Line-up Completo
                  </h4>
                  <span className="footer-post-date">Nov 17, 2024</span>
                </article>
                <article className="footer-post">
                  <h4 className="footer-post-title">
                    Guia Completo: Como Produzir House Music
                  </h4>
                  <span className="footer-post-date">Nov 16, 2024</span>
                </article>
              </div>
            </div>

            {/* Categories */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">
                {lang === 'pt' ? 'Categorias' : lang === 'en' ? 'Categories' : 'Categorías'}
              </h3>
              <ul className="footer-links">
                <li><Link href={getHomeUrl(lang)}>{lang === 'pt' ? 'Todas' : lang === 'en' ? 'All' : 'Todas'}</Link></li>
                <li><Link href={`${getHomeUrl(lang)}?categoria=festival`}>{lang === 'pt' ? 'Festivais' : lang === 'en' ? 'Festivals' : 'Festivales'}</Link></li>
                <li><Link href={`${getHomeUrl(lang)}?categoria=music`}>{lang === 'pt' ? 'Música' : lang === 'en' ? 'Music' : 'Música'}</Link></li>
                <li><Link href={getHomeUrl(lang)}>{lang === 'pt' ? 'Notícias' : lang === 'en' ? 'News' : 'Noticias'}</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">{t('footer.quickLinks')}</h3>
              <ul className="footer-links">
                <li><Link href={getHomeUrl(lang)}>{t('menu.home')}</Link></li>
                <li><Link href={getHomeUrl(lang)}>{t('menu.allNews')}</Link></li>
                <li><Link href={getHomeUrl(lang)}>{lang === 'pt' ? 'Contato' : lang === 'en' ? 'Contact' : 'Contacto'}</Link></li>
              </ul>
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

