import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Category from './Category'
import 'swiper/css'
import '../css/Destinations.css'

const items = [
  {
    id: 1, category: "국내", name: "서울", img: "./lotte/서울.webp",
    hotel: [
      { name: "시그니엘 서울" }, { name: "롯데호텔 서울" }, { name: "롯데호텔 월드" },
      { name: "L7 명동 바이 롯데호텔" }, { name: "L7 강남 바이 롯데호텔" },
      { name: "L7 홍대 바이 롯데호텔" }, { name: "롯데시티호텔 마포" },
      { name: "롯데시티호텔 김포공항" }, { name: "롯데시티호텔 명동" },
    ]
  },
  {
    id: 2, category: "국내", name: "부산", img: "./lotte/부산.webp",
    hotel: [{ name: "시그니엘 부산" }, { name: "롯데호텔 부산" }, { name: "L7 해운대 바이 롯데호텔" }]
  },
  {
    id: 3, category: "국내", name: "제주", img: "./lotte/제주.webp",
    hotel: [{ name: "롯데호텔 제주" }, { name: "롯데시티호텔 제주" }, { name: "아트빌라스 제주" }]
  },
  {
    id: 4, category: "국내", name: "울산", img: "./lotte/울산.webp",
    hotel: [{ name: "롯데호텔 울산" }, { name: "롯데시티호텔 울산" }]
  },
  {
    id: 5, category: "국내", name: "대전", img: "./lotte/대전.webp",
    hotel: [{ name: "롯데시티호텔 대전" }]
  },
  {
    id: 6, category: "국내", name: "광주", img: "./lotte/광주.webp",
    hotel: [{ name: "L7 충장 바이 롯데 호텔" }]
  },
  {
    id: 7, category: "해외", name: "아시아", img: "./lotte/아시아.webp",
    hotel: [
      { name: "롯데아라이리조트" }, { name: "롯데호텔 사이공" }, { name: "롯데호텔 하노이" },
      { name: "L7웨스트 레이크 하노이 롯데호텔" }, { name: "롯데호텔 양곤" },
      { name: "롯데시티호텔 타슈켄트팰리스" },
    ]
  },
  {
    id: 8, category: "해외", name: "미국", img: "./lotte/미국.webp",
    hotel: [{ name: "롯데뉴욕팰리스" }, { name: "롯데호텔 시애틀" }]
  },
  {
    id: 9, category: "해외", name: "러시아", img: "./lotte/러시아.webp",
    hotel: [
      { name: "롯데호텔 모스크바" }, { name: "롯데호텔 상트페테르부르크" },
      { name: "롯데호텔 블라디보스토크" }, { name: "롯데호텔 사마라" },
    ]
  },
]

const Destinations = () => {
  const [hovered, setHovered] = useState(null)
  const [activeTab, setActiveTab] = useState('국내')
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  // 모바일 드롭다운
  const [dropOpen, setDropOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(1)
  const dropRef = useRef(null)

  const tabs = [...new Set(items.map(item => item.category))]
  const filtered = items.filter(item => item.category === activeTab)
  const selectedItem = filtered.find(i => i.id === selectedId) || filtered[0]

  // 탭 변경시 첫 번째 도시 선택
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setHovered(null)
    const first = items.find(i => i.category === tab)
    if (first) setSelectedId(first.id)
  }

  // 외부 클릭 닫기
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const slideWidth = (id) => {
    if (!hovered) return 'calc((140rem - 1.2rem) / 3)'
    if (hovered === id) return 'calc((140rem - 1.2rem) / 2)'
    return 'calc((140rem - 1.2rem) / 3)'
  }

  const handleSwiper = (s) => {
    setSwiperInstance(s)
    setIsBeginning(s.isBeginning)
    setIsEnd(s.isEnd)
  }

  const handleSlideChange = (s) => {
    setIsBeginning(s.isBeginning)
    setIsEnd(s.isEnd)
    setProgress(s.progress)
  }

  return (
    <div className='destinations'>
      <div className="d_i">

        {/* 타이틀 + 탭(데스크탑) + 드롭다운(모바일) */}
        <div className="tit">
          <div className="title">
            <h2>Destinations</h2>
            <span>여행지</span>
          </div>

          {/* 데스크탑 탭 */}
          <div className="dest-tab-wrap">
            <Category tabs={tabs} activeTab={activeTab} handleTabChange={handleTabChange} />
          </div>

          {/* 모바일 도시 드롭다운 */}
          <div className="dest-drop-wrap" ref={dropRef}>
            <button
              className="dest-city-btn"
              onClick={() => setDropOpen(!dropOpen)}
            >
              <span>{selectedItem?.name}</span>
              <span className={`dest-chevron ${dropOpen ? 'open' : ''}`}>∨</span>
            </button>
            {dropOpen && (
              <ul className="dest-city-dropdown">
                {filtered.map(item => (
                  <li
                    key={item.id}
                    className={selectedId === item.id ? 'active' : ''}
                    onClick={() => { setSelectedId(item.id); setDropOpen(false) }}
                  >
                    {item.name}
                    {selectedId === item.id && <span className="dest-check">✓</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="box">

          {/* 데스크탑 슬라이더 */}
          <div className="dest_card_area dest-desktop">
            <Swiper
              onSwiper={handleSwiper}
              onSlideChange={handleSlideChange}
              onProgress={(s, p) => setProgress(p)}
              slidesPerView="auto"
              spaceBetween={6}
              className="dest_swiper"
            >
              {filtered.map(item => (
                <SwiperSlide key={item.id} style={{ width: slideWidth(item.id) }}>
                  <div
                    className={`card ${hovered === item.id ? 'active' : ''}`}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <img className='d_img' src={item.img} alt={item.name} />
                    <div className="d_label">{item.name}</div>
                    <div className="d_infor">
                      <p className='d_city'>{item.name}</p>
                      <ul className='d_hotel'>
                        {item.hotel.map(h => (
                          <li key={h.name}><a href="#">{h.name}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 모바일 단일 카드 */}
          <div className="dest-mobile">
            {selectedItem && (
              <div className="card mobile-card">
                <img className='d_img' src={selectedItem.img} alt={selectedItem.name} />
                <div className="d_infor d_infor--always">
                  <p className='d_city'>{selectedItem.name}</p>
                  <ul className='d_hotel d_hotel--always'>
                    {selectedItem.hotel.map(h => (
                      <li key={h.name}><a href="#">{h.name}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 하단 진행바 + 네비 */}
          <div className="dest-bottom">
            <div className="dest-progress-track">
              <div className="dest-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="dest-nav">
              <button className="nav-btn" onClick={() => swiperInstance?.slidePrev()} disabled={isBeginning}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="nav-btn" onClick={() => swiperInstance?.slideNext()} disabled={isEnd}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Destinations