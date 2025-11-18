import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container-wide">
          <div className="footer-grid">
            {/* About Widget */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">Sobre Nós</h3>
              <div className="footer-logo">
                <div className="footer-logo-text">EDM NEWS</div>
              </div>
              <p className="footer-text">
                Sua fonte definitiva para notícias sobre música eletrônica. Cobertura completa de festivais, 
                lançamentos, entrevistas exclusivas com DJs e produtores.
              </p>
              <p className="footer-text">
                <strong>Email:</strong> contato@edmnews.com<br />
                <strong>Contato:</strong> +55 11 9999-9999
              </p>
            </div>

            {/* Popular Posts */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">Posts Populares</h3>
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
              <h3 className="footer-widget-title">Categorias</h3>
              <ul className="footer-links">
                <li><Link href="/festivais">Festivais</Link></li>
                <li><Link href="/djs">DJs & Produtores</Link></li>
                <li><Link href="/posts">Lançamentos</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="#">Tutoriais</Link></li>
                <li><Link href="#">Equipamentos</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-widget">
              <h3 className="footer-widget-title">Links Rápidos</h3>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="#">Sobre</Link></li>
                <li><Link href="/contato">Contato</Link></li>
                <li><Link href="#">Política de Privacidade</Link></li>
                <li><Link href="#">Termos de Uso</Link></li>
                <li><Link href="#">Anuncie Conosco</Link></li>
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
              © 2024 EDM News. Todos os direitos reservados.
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
              <Link href="/">Home</Link>
              <Link href="/festivais">Festivais</Link>
              <Link href="/djs">DJs</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/contato">Contato</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

