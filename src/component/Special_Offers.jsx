import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import OffersDate from './OffersDate.jsx'
import '../css/Special_Offers.css'

const getBadgeClass = (hotel) => {
  if (hotel.startsWith('시그니엘')) return 'badge--signiel'
  if (hotel.startsWith('L7')) return 'badge--l7'
  if (hotel.startsWith('롯데시티호텔')) return 'badge--city'
  if (hotel.startsWith('롯데호텔')) return 'badge--hotel'
  if (hotel.startsWith('롯데아라이')) return 'badge--arai'
  if (hotel.startsWith('뉴요커')) return 'badge--newyorker'
  return 'badge--default'
}

const Special_Offers = () => {
  const [activeCountry, setActiveCountry] = useState('한국')
  const [activeArea, setActiveArea] = useState('서울')
  const [countryOpen, setCountryOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(1)

  const countries = [...new Set(OffersDate.map(c => c.country))]
  const areas = [...new Set(OffersDate.filter(c => c.country === activeCountry).map(a => a.area))]
  const filtered = OffersDate.filter(
    c => c.country === activeCountry && c.area === activeArea
  )

  const handleCountrySelect = (country) => {
    setActiveCountry(country)
    const firstArea = OffersDate.find(c => c.country === country)?.area || ''
    setActiveArea(firstArea)
    setCountryOpen(false)
  }

  return (
    <div className='special_Offers'>
      <div className="special_i">
        <div className="top">
          <div className="bg">
            <img src="./lotte/bg.webp" alt="bg" />
          </div>

          <div className="title">
            <h2>Special Offers</h2>
            <p>스페셜 오퍼</p>
          </div>

          <div className="country">
            <div className="country_wrap">
              <button className='country_btn' onClick={() => setCountryOpen(prev => !prev)}>
                {activeCountry}
                <span className={`circle ${countryOpen ? 'open' : ''}`}>
                  <img src="./lotte/bottom_arrow.svg" alt="arrow" />
                </span>
              </button>
              {countryOpen && (
                <ul className="country_dropdown">
                  {countries.map(c => (
                    <li
                      key={c}
                      className={c === activeCountry ? 'active' : ''}
                      onClick={() => handleCountrySelect(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="area">
            {areas.map(area => (
              <button
                key={area}
                className={`area_tab ${area === activeArea ? 'active' : ''}`}
                onClick={() => setActiveArea(area)}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* bottom */}
        <div className="bottom">
          <div className="contents">
            <div className="slider_wrap">
              <Swiper
                modules={[Navigation]}
                onSwiper={(s) => {
                  setSwiperInstance(s)
                  setIsBeginning(s.isBeginning)
                  setIsEnd(s.isEnd)
                  setCurrentIndex(1)
                }}
                onSlideChange={(s) => {
                  setProgress(s.progress)
                  setIsBeginning(s.isBeginning)
                  setIsEnd(s.isEnd)
                  setCurrentIndex(s.realIndex + 1)
                }}
                onProgress={(s, p) => setProgress(p)}
                slidesPerView={3}
                spaceBetween={12}
                breakpoints={{
                  761: {
                    slidesPerView: 4,
                    spaceBetween: 17,
                  }
                }}
                className="so_swiper"
              >
                {filtered.map(item => (
                  <SwiperSlide key={item.id}>
                    <div className="s_card">
                      <div className="s_card_img">
                        <img src={item.img} alt={item.title} />
                      </div>
                      <div className="s_card_info">
                        <span className={`s_badge ${getBadgeClass(item.hotel)}`}>
                          {item.hotel}
                        </span>
                        <p className="s_card_title">{item.title}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* 데스크탑 진행바 */}
              <div className="s_bottom s_bottom--desktop">
                <div className="s_progress_track">
                  <div className="s_progress_fill" style={{ width: `${progress * 100}%` }} />
                </div>
                <div className="s_nav">
                  <button className="s_nav_btn" onClick={() => swiperInstance?.slidePrev()} disabled={isBeginning}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="so_nav_btn" onClick={() => swiperInstance?.slideNext()} disabled={isEnd}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 모바일 숫자 + 버튼
              <div className="s_bottom s_bottom--mobile">
                <div className="s_fraction">
                  <span className="s_current">{currentIndex}</span>
                  <span className="s_slash"> / </span>
                  <span className="s_total">{filtered.length}</span>
                </div>
                <div className="s_nav">
                  <button className="s_nav_btn" onClick={() => swiperInstance?.slidePrev()} disabled={isBeginning}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="so_nav_btn" onClick={() => swiperInstance?.slideNext()} disabled={isEnd}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Special_Offers