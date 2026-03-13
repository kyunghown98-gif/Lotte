import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import Our_BrandDate from './Our_BrandDate.jsx'
import '../css/Our_Brand.css'

const categoryTaglines = {
  'SIGNIEL': {
    en: ['Live Beyond Expectations'],
    ko: '기대 그 이상의 삶'
  },
  'LOTTE HOTELS': {
    en: ['Enriching Moments', 'At Global Destinations'],
    ko: '세계 곳곳에서 빛어내는 품격 있는 순간'
  },
  'L7 by LOTTE HOTELS': {
    en: ['Your Trendy Urban Stay'],
    ko: '트렌디한 도심 속 나만의 공간'
  },
  'LOTTE CITY HOTELS': {
    en: ['Comfort Meets Convenience'],
    ko: '편리함과 편안함이 만나는 곳'
  },
  'LOTTE RESORT': {
    en: ['Nature & Luxury, In Harmony'],
    ko: '자연과 럭셔리의 완벽한 조화'
  },
  'VL': {
    en: ['An Exclusive Private Residence'],
    ko: '프라이빗 럭셔리 레지던스'
  },
  'AFFILIATED by LOTTE HOTELS': {
    en: ['World-Class Affiliated Hotels'],
    ko: '세계적 수준의 제휴 호텔'
  },
}

const categories = [...new Set(Our_BrandDate.map(item => item.category))]

const Our_Brand = () => {
  const initialBg = Our_BrandDate.find(item => item.category === categories[0])?.backimg || ''

  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [bgSlot, setBgSlot] = useState({ a: initialBg, b: '' })
  const [activeBg, setActiveBg] = useState('a')

  const [swiperInstance, setSwiperInstance] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [progress, setProgress] = useState(0)

  const filtered = Our_BrandDate.filter(item => item.category === activeCategory)
  const tagline = categoryTaglines[activeCategory] || { en: [''], ko: '' }

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return

    const newBg = Our_BrandDate.find(item => item.category === cat)?.backimg || ''

    if (activeBg === 'a') {
      setBgSlot(prev => ({ ...prev, b: newBg }))
      setActiveBg('b')
    } else {
      setBgSlot(prev => ({ ...prev, a: newBg }))
      setActiveBg('a')
    }

    setActiveCategory(cat)
    setProgress(0)
    setIsBeginning(true)
    setIsEnd(false)
  }

  return (
    <div className='our_brand'>
      <div className="ob_wrap">

        {/* ── Left Panel ── */}
        <div className="ob_left">
          {/* Cross-fade background layers */}
          <div
            className={`ob_bg_layer ${activeBg === 'a' ? 'ob_bg_layer--visible' : ''}`}
            style={{ backgroundImage: bgSlot.a ? `url(${bgSlot.a})` : 'none' }}
          />
          <div
            className={`ob_bg_layer ${activeBg === 'b' ? 'ob_bg_layer--visible' : ''}`}
            style={{ backgroundImage: bgSlot.b ? `url(${bgSlot.b})` : 'none' }}
          />
          <div className="ob_left_overlay" />

          <div className="ob_left_content">
            <div className="ob_title">
              <h2>Our Brands</h2>
              <p>| 당사 브랜드</p>
            </div>

            <ul className="ob_category_list">
              {categories.map(cat => (
                <li
                  key={cat}
                  className={`ob_category_item ${cat === activeCategory ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span className="ob_cat_name">{cat}</span>
                  {cat === activeCategory && <span className="ob_arrow">→</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="ob_right">
          <div className="content">


            <div className="ob_tagline">
              <h3>
                {tagline.en.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </h3>
              <p>{tagline.ko}</p>
            </div>

            <div className="ob_slider_wrap">
              <Swiper
                key={activeCategory}
                modules={[Navigation]}
                onSwiper={(s) => {
                  setSwiperInstance(s)
                  setIsBeginning(s.isBeginning)
                  setIsEnd(s.isEnd)
                }}
                onSlideChange={(s) => {
                  setProgress(s.progress)
                  setIsBeginning(s.isBeginning)
                  setIsEnd(s.isEnd)
                }}
                onProgress={(s, p) => setProgress(p)}
                slidesPerView={2}
                spaceBetween={25}
                className="ob_swiper"
              >
                {filtered.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <div className={`ob_card ${index % 2 === 1 ? 'ob_card--offset' : ''}`}>
                      <div className="ob_card_img">
                        <img src={item.img} alt={item.hotel} loading="lazy" />
                      </div>
                      <p className="ob_card_name">{item.hotel}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="ob_nav_wrap">
                <div className="ob_progress_track">
                  <div
                    className="ob_progress_fill"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="ob_nav_btns">
                  <button
                    className="ob_nav_btn"
                    onClick={() => swiperInstance?.slidePrev()}
                    disabled={isBeginning}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className="ob_nav_btn"
                    onClick={() => swiperInstance?.slideNext()}
                    disabled={isEnd}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Our_Brand
