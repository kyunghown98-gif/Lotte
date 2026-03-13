import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../css/Hero.css'

const slides = [
  {
    id: 1,
    badge: '',
    title: 'The Strawberry Festive',
    titleClass: 'title-en',
    sub: '프리미엄 딸기로 전하는 달콤한 행복,\n롯데호텔에서 다채로운 미식의 순간을 선보입니다.',
    link: '/global/ko/offers/dining/strawberry-festive',
    eventAction: 'Main_Banner_1',
    pcImg: 'https://img.lottehotel.com/cms/asset/2026/02/20/37323/260220-3-1920-mai-GLOBAL.webp',
    moImg: 'https://img.lottehotel.com/cms/asset/2026/02/20/37287/260220-720mo-mai-GLOBAL.webp',
    alt: 'LOTTE HOTELS & RESORTS',
  },
  {
    id: 2,
    badge: '',
    title: '겨울이 더 행복해지는 곳, 롯데호텔 괌',
    titleClass: '',
    sub: '추운 겨울, 따뜻한 휴양지에서 즐기는 행복한 시간\n롯데호텔 괌으로 특별한 겨울 바캉스를 떠나보세요!',
    link: '/guam-hotel/ko/offers/packages/250106/special-offer1',
    eventAction: 'Main_Banner_2',
    pcImg: 'https://img.lottehotel.com/cms/asset/2025/12/12/35196/251212-1920-mai-LTGU.webp',
    moImg: 'https://img.lottehotel.com/cms/asset/2025/12/12/35193/251212-720-mai-LTGU.webp',
    alt: '롯데호텔 괌, 키비주얼',
  },
  {
    id: 3,
    badge: '',
    title: 'L7 충장 바이 롯데호텔\n광주의 새로운 라이프스타일을 선보입니다',
    titleClass: '',
    sub: '새롭게 선보이는 L7 충장 바이 롯데호텔의 공식 홈페이지에서 다양한 정보와 혜택을 가장 먼저 만나보세요.',
    link: '/chungjang-l7/ko',
    eventAction: 'Main_Banner_3',
    pcImg: 'https://img.lottehotel.com/cms/asset/2025/07/25/31260/250725-1-1920-mai-L7CJ.webp',
    moImg: 'https://img.lottehotel.com/cms/asset/2025/07/25/31261/250725-1-720mo-mai-L7CJ.webp',
    alt: '충장 로비',
  },
  {
    id: 4,
    badge: '',
    title: '2026 롯데 루미나리에 프로모션',
    titleClass: '',
    sub: "'소망, 빛으로 물들다'\n거대한 빛의 터널 속에서 소중한 사람들과 특별한 추억을 남겨보세요!",
    link: '/global/ko/offers/packages/260205/2026-luminarie',
    eventAction: 'Main_Banner_4',
    pcImg: 'https://img.lottehotel.com/cms/asset/2026/02/03/36790/260203-1920-mai-GLOBAL.webp',
    moImg: 'https://img.lottehotel.com/cms/asset/2026/02/03/36791/260202-720mo-mai-GLOBAL.webp',
    alt: 'LOTTE HOTELS & RESORTS',
  },
]

const Hero_section = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef(null)

  const togglePlay = () => {
    if (!swiperRef.current) return
    if (isPlaying) {
      swiperRef.current.autoplay.stop()
    } else {
      swiperRef.current.autoplay.start()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="global-ma-wrap global-ma-kv">
      <div className="global-ma-inner">
        <div className="global-ma-cont">
          <div className="component-swiper swiper-main-kv">

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{
                type: 'progressbar',
                el: '.swiper-pagination',
              }}
              onSwiper={(swiper) => { swiperRef.current = swiper }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              className="swiper-container"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id} className="swiper-slide">
                  <div className="component-card">
                    <a
                      className="card-inner"
                      data-event-category="Global_Main"
                      data-event-action={slide.eventAction}
                      data-event-label={slide.title}
                      href={slide.link}
                    >
                      <div className="card-top">
                        <div className="card-img card-dimm03">
                          <img
                            alt={`LOTTE HOTELS & RESORTS - ${slide.alt}`}
                            src={slide.pcImg}
                            loading="lazy"
                            className="pc"
                          />
                          <img
                            alt={`LOTTE HOTELS & RESORTS - ${slide.alt}`}
                            src={slide.moImg}
                            loading="lazy"
                            className="mo"
                          />
                        </div>
                      </div>
                      <div className="card-info white">
                        {slide.badge && (
                          <span className="badge">
                            <span className="badge-txt">{slide.badge}</span>
                          </span>
                        )}
                        <div className="card-info-tit swiper-motion">
                          <div className={`info-tit ${slide.titleClass}`}>
                            {slide.title.split('\n').map((line, i, arr) => (
                              <React.Fragment key={i}>
                                {line}{i < arr.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="card-info-sub swiper-motion">
                          <div className="info-sub">
                            {slide.sub.split('\n').map((line, i, arr) => (
                              <React.Fragment key={i}>
                                {line}{i < arr.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="card-info-link swiper-motion">
                          <div className="btn btn-text02 white btn-arrow-hover">
                            <span className="btn-txt">자세히 보기</span>
                            <i className="ico ico-btn-arrow" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              ))}

              {/* 컨트롤 영역 */}
              <div className="swiper-controls type04">

                <div className="swiper-pagination"></div>

                <div className="swiper-fraction">
                  <span className="swiper-pagination-current">{currentIndex + 1}</span>
                  <span className="slash">/</span>
                  <span className="swiper-pagination-total">{slides.length}</span>
                </div>

                <div
                  className="swiper-button-prev"
                  role="button"
                  aria-label="이전 슬라이드로 이동"
                ></div>

                <button
                  type="button"
                  className={`btn-stop ${isPlaying ? 'isplay' : 'ispause'}`}
                  onClick={togglePlay}
                >
                  <i className={`ico ${isPlaying ? 'ico-pause' : 'ico-play'}`} aria-hidden="true"></i>
                  <span className="hide-txt">
                    {isPlaying ? '자동 슬라이드 일시 정지' : '자동 슬라이드 재생'}
                  </span>
                </button>

                <div
                  className="swiper-button-next"
                  role="button"
                  aria-label="다음 슬라이드로 이동"
                ></div>

              </div>

            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero_section