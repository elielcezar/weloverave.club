import React from 'react'
import './SectionTitle.css'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="section-title">
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-heading">{title}</h2>
    </div>
  )
}

export default SectionTitle

