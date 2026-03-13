import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../css/notice.css'

const notices = [
  {
    id: 1,
    filter: '통합',
    category: '일반공지',
    tit: '홈페이지 서비스 점검에 따른 예약 및 예약조회 일시 중단 안내',
    date: '2026.03.11',
  },
  {
    id: 2,
    filter: '통합',
    category: '일반공지',
    tit: '롯데호텔앤리조트 사칭 범죄 유의 안내',
    date: '2026.02.05',
  },
  {
    id: 3,
    filter: '통합',
    category: '일반공지',
    tit: '보증용(개런티) 카드 등록 가능 카드사 안내',
    date: '2026.04.25',
  },
]

const Notice = () => {
  const swiperRef = useRef(null)
  const [current, setCurrent] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const total = notices.length

  const handlePrev = () => swiperRef.current?.slidePrev()
  const handleNext = () => swiperRef.current?.slideNext()

  const toggleAutoplay = () => {
    const swiper = swiperRef.current
    if (!swiper) return
    if (isPlaying) {
      swiper.autoplay.stop()
    } else {
      swiper.autoplay.start()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="notice">
      <div className="notice_i">
        {/* Swiper + 컨트롤 flex 래퍼 */}
        <div className="notice_inner">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, Pagination, A11y, Autoplay]}
            direction="vertical"
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            style={{ height: '72px' }}
            onRealIndexChange={(swiper) => setCurrent(swiper.realIndex + 1)}
          >
            {notices.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="left">
                  <p className="text1">{item.filter}</p>
                  <p className="text2">{item.category}</p>
                </div>
                <a href="#">{item.tit}</a>
                <p className="date">{item.date}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 컨트롤 */}
          <div className="notice_controls">
            <span className="notice_counter">{current}/{total}</span>
            <button className="notice_btn" onClick={handlePrev} aria-label="이전">
              〈
            </button>
            <button className="notice_btn play_btn" onClick={toggleAutoplay} aria-label="재생/정지">
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="notice_btn" onClick={handleNext} aria-label="다음">
              〉
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice