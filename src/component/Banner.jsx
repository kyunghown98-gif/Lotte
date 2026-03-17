import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '../css/banner.css'

const Banner = () => {
  const images = [
    { src: './lotte/251119-img-banner01-ko.webp', alt: 'banner' },
    { src: './lotte/250516-banner-activiel.webp', alt: 'banner' },
  ]

  return (
    <div className='banner'>
      {/* 데스크탑: 2단 */}
      <div className="banner__desktop">
        <div className="banner_i">
          {images.map((img, i) => (
            <div key={i} className={i === 0 ? 'left' : 'right'}>
              <a href="#"><img src={img.src} alt={img.alt} /></a>
            </div>
          ))}
        </div>
      </div>

      {/* 모바일: Swiper */}
      <div className="banner__mobile">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} loop={true} className="banner__swiper">
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <a href="#"><img src={img.src} alt={img.alt} /></a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Banner