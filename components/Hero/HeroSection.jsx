import React from 'react'
import Image from 'next/image'
import './HeroSection.css'

const heroData = [
  {
    id: 1,
    category: 'Festivais',
    categoryColor: 'pink',
    title: 'Tomorrowland 2024: Line-up Completo Revelado com Surpresas',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    size: 'large'
  },
  {
    id: 2,
    category: 'DJs',
    categoryColor: 'blue',
    title: 'Martin Garrix Anuncia Residência em Las Vegas',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6c1de29?w=800&q=80',
    size: 'medium'
  },
  {
    id: 3,
    category: 'Lançamentos',
    categoryColor: 'red',
    title: 'Calvin Harris Revela Novo Album "Funk Wav Bounces Vol. 3"',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    size: 'medium'
  },
  {
    id: 4,
    category: 'Notícias',
    categoryColor: 'purple',
    title: 'Techno em Alta: Gênero Domina Paradas Mundiais',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    size: 'small'
  }
]

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container-wide">
        <div className="hero-grid">
          {heroData.map((item) => (
            <article key={item.id} className={`hero-card hero-card--${item.size}`}>
              <div className="hero-card__image">
                <img src={item.image} alt={item.title} />
                <div className="hero-card__overlay"></div>
              </div>
              <div className="hero-card__content">
                <span className={`category-tag category-tag--${item.categoryColor}`}>
                  {item.category}
                </span>
                <h2 className="hero-card__title">{item.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

