import React, { useState, useEffect, useRef } from 'react'
import '../css/reservation.css'
import '../css/dining.css'
import { reData } from './ReservationData'
import { diData } from './DiningData'

// =====================
// 날짜 유틸
// =====================
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()
const getDayName = (year, month, day) => {
  const d = new Date(year, month, day).getDay()
  return ['일','월','화','수','목','금','토'][d]
}
const getWeekdayLabel = (idx) => ['일','월','화','수','목','금','토'][idx]

const formatDate = (dateObj) => {
  if (!dateObj) return ''
  const { year, month, day } = dateObj
  const m = month + 1
  const dayName = getDayName(year, month, day)
  return `${String(m).padStart(2,'0')}월 ${String(day).padStart(2,'0')}일(${dayName})`
}

const calcNights = (checkin, checkout) => {
  if (!checkin || !checkout) return 0
  const a = new Date(checkin.year, checkin.month, checkin.day)
  const b = new Date(checkout.year, checkout.month, checkout.day)
  return Math.round((b - a) / (1000 * 60 * 60 * 24))
}

const getHotelDisplayText = (selectedHotels) => {
  if (!selectedHotels || selectedHotels.length === 0) return null
  if (selectedHotels.length === 1) return selectedHotels[0].hotel
  return `${selectedHotels[0].hotel} 외 ${selectedHotels.length - 1}`
}

// =====================
// 공통 패널 히어로 헤더
// 데스크탑: 일반 헤더만 표시
// 모바일:   히어로 이미지 + 타이틀 오버레이
// =====================
const PanelHeroHeader = ({ title, onClose, heroImg }) => (
  <>
    {/* 모바일 히어로 헤더 */}
    <div className="panel_hero_header">
      {heroImg && <img src={heroImg} alt="" />}
      <div className="panel_hero_content">
        <h2 className="panel_hero_title">{title}</h2>
        <button className="panel_hero_close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    {/* 데스크탑 헤더 */}
    <div className="sp_header panel_desktop_header">
      <h2 className="sp_title">{title}</h2>
      <button className="sp_close" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  </>
)

// =====================
// 호텔 패널
// =====================
const HotelPanel = ({ onClose, onConfirm, selectedHotels, setSelectedHotels }) => {
  const countries = [...new Set(reData.map(d => d.country))]
  const allBrands  = [...new Set(reData.map(d => d.brand))]

  const [filterType, setFilterType] = useState('국가별')
  const [activeLeft, setActiveLeft] = useState('한국')

  const handleFilterSwitch = (type) => {
    setFilterType(type)
    setActiveLeft(type === '국가별' ? '한국' : allBrands[0])
  }

  const leftItems = filterType === '국가별' ? countries : allBrands

  const getGroupedHotels = () => {
    if (filterType === '국가별') {
      const filtered = reData.filter(d => d.country === activeLeft)
      const brands   = [...new Set(filtered.map(d => d.brand))]
      return brands.map(brand => ({ groupLabel: brand, hotels: filtered.filter(d => d.brand === brand) }))
    } else {
      const filtered      = reData.filter(d => d.brand === activeLeft)
      const countryGroups = [...new Set(filtered.map(d => d.country))]
      return countryGroups.map(country => ({ groupLabel: country, hotels: filtered.filter(d => d.country === country) }))
    }
  }

  const toggleHotel = (hotel) => {
    const isSelected = selectedHotels.some(h => h.id === hotel.id)
    if (isSelected) setSelectedHotels(prev => prev.filter(h => h.id !== hotel.id))
    else if (selectedHotels.length < 3) setSelectedHotels(prev => [...prev, hotel])
  }

  const removeHotel = (id) => setSelectedHotels(prev => prev.filter(h => h.id !== id))
  const clearAll    = () => setSelectedHotels([])
  const hasSelected = selectedHotels.length > 0

  return (
    <div className="side_panel hotel_panel">
      <PanelHeroHeader title="호텔/지역" onClose={onClose} heroImg="./lotte/m객실.jpg" />
      <div className="sp_search_wrap">
        <div className="sp_search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#999" strokeWidth="1.5"/>
            <path d="M16.5 16.5L21 21" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input type="text" placeholder="호텔, 명소, 도시를 검색해 보세요." />
        </div>
      </div>
      <div className="sp_filter_row">
        <div className="sp_filter_tabs">
          <button className={`filter_tab ${filterType === '국가별' ? 'active' : ''}`} onClick={() => handleFilterSwitch('국가별')}>
            {filterType === '국가별' && <span className="check_icon">✓ </span>}국가별
          </button>
          <span className="filter_divider">|</span>
          <button className={`filter_tab ${filterType === '브랜드별' ? 'active' : ''}`} onClick={() => handleFilterSwitch('브랜드별')}>
            {filterType === '브랜드별' && <span className="check_icon">✓ </span>}브랜드별
          </button>
        </div>
        <span className="sp_max_info">최대 3개 선택 가능</span>
      </div>
      <div className="sp_body">
        <div className="country_list">
          {leftItems.map(item => (
            <button key={item} className={`country_item ${activeLeft === item ? 'active' : ''}`} onClick={() => setActiveLeft(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className={`hotel_list ${hasSelected ? 'has_scroll' : ''}`}>
          {getGroupedHotels().map(({ groupLabel, hotels }) => (
            <div key={groupLabel} className="brand_group">
              <p className="brand_name">{groupLabel}</p>
              <div className="hotel_tags">
                {hotels.map(d => {
                  const isActive   = selectedHotels.some(h => h.id === d.id)
                  const isDisabled = selectedHotels.length >= 3 && !isActive
                  return (
                    <button key={d.id} className={`hotel_tag ${isActive ? 'active' : ''} ${isDisabled ? 'tag_disabled' : ''}`} onClick={() => toggleHotel(d)}>
                      {d.hotel}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`hotel_footer ${hasSelected ? 'visible' : ''}`}>
        <div className="selected_tags_row">
          <div className="selected_tags">
            {selectedHotels.map(h => (
              <span key={h.id} className="selected_tag">
                {h.hotel}
                <button className="selected_tag_remove" onClick={() => removeHotel(h.id)}>×</button>
              </span>
            ))}
          </div>
          <button className="clear_all_btn" onClick={clearAll}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{marginRight:'0.4rem'}}>
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            선택해제
          </button>
        </div>
        <div className="sp_footer_btn_wrap">
          <button className="sp_confirm_btn" onClick={() => onConfirm(selectedHotels)}>선택</button>
        </div>
      </div>
    </div>
  )
}

// =====================
// 캘린더 패널
// =====================
const CalendarPanel = ({ onClose, onSelect, checkin, checkout }) => {
  const today = new Date()
  const [viewYear, setViewYear]       = useState(today.getFullYear())
  const [viewMonth, setViewMonth]     = useState(today.getMonth())
  const [selecting, setSelecting]     = useState('checkin')
  const [tempCheckin, setTempCheckin]   = useState(checkin)
  const [tempCheckout, setTempCheckout] = useState(checkout)

  const leftYear   = viewYear
  const leftMonth  = viewMonth
  const rightMonth = viewMonth + 1 > 11 ? 0 : viewMonth + 1
  const rightYear  = viewMonth + 1 > 11 ? viewYear + 1 : viewYear

  const handleNext = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) } else setViewMonth(m => m + 1) }
  const handlePrev = () => { if (viewMonth === 0)  { setViewMonth(11); setViewYear(y => y - 1) } else setViewMonth(m => m - 1) }

  const handleDayClick = (year, month, day) => {
    const clicked = { year, month, day }
    if (selecting === 'checkin') {
      setTempCheckin(clicked); setTempCheckout(null); setSelecting('checkout')
    } else {
      const a = new Date(tempCheckin.year, tempCheckin.month, tempCheckin.day)
      const b = new Date(year, month, day)
      if (b <= a) { setTempCheckin(clicked); setTempCheckout(null) }
      else { setTempCheckout(clicked); setSelecting('checkin') }
    }
  }

  const isCheckin  = (y, m, d) => tempCheckin  && tempCheckin.year===y  && tempCheckin.month===m  && tempCheckin.day===d
  const isCheckout = (y, m, d) => tempCheckout && tempCheckout.year===y && tempCheckout.month===m && tempCheckout.day===d
  const isBetween  = (y, m, d) => {
    if (!tempCheckin || !tempCheckout) return false
    const a = new Date(tempCheckin.year, tempCheckin.month, tempCheckin.day)
    const b = new Date(tempCheckout.year, tempCheckout.month, tempCheckout.day)
    const c = new Date(y, m, d)
    return c > a && c < b
  }
  const isPast = (y, m, d) => new Date(y, m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const renderMonth = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay    = getFirstDayOfMonth(year, month)
    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(<td key={`e-${i}`}></td>)
    for (let d = 1; d <= daysInMonth; d++) {
      const past = isPast(year, month, d)
      const ci   = isCheckin(year, month, d)
      const co   = isCheckout(year, month, d)
      const bet  = isBetween(year, month, d)
      cells.push(
        <td key={d}>
          <button className={`cal_day ${ci?'checkin':''} ${co?'checkout':''} ${bet?'between':''} ${past?'past':''}`}
            onClick={() => !past && handleDayClick(year, month, d)} disabled={past}>{d}</button>
        </td>
      )
    }
    const rows = []; let row = []
    cells.forEach((cell, i) => {
      row.push(cell)
      if ((i + 1) % 7 === 0 || i === cells.length - 1) {
        while (row.length < 7) row.push(<td key={`p-${i}-${row.length}`}></td>)
        rows.push(<tr key={i}>{row}</tr>)
        row = []
      }
    })
    return rows
  }

  const nights = calcNights(tempCheckin, tempCheckout)

  return (
    <div className="side_panel date_panel">
      <PanelHeroHeader title="체크인/아웃" onClose={onClose} heroImg="./lotte/m객실.jpg" />
      <div className="cal_selected_bar">
        <span className={`cal_sel_item ${selecting==='checkin'?'active':''}`}>{tempCheckin ? formatDate(tempCheckin) : '체크인'}</span>
        <span className="cal_sel_sep">~</span>
        <span className={`cal_sel_item ${selecting==='checkout'?'active':''}`}>{tempCheckout ? formatDate(tempCheckout) : '체크아웃'}</span>
        {nights > 0 && <span className="cal_nights">/ {nights}박</span>}
      </div>
      <div className="cal_wrap">
        <div className="cal_months">
          <div className="cal_month">
            <div className="cal_month_header">
              <button className="cal_nav_btn" onClick={handlePrev}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <span className="cal_month_label">{leftYear}. {String(leftMonth+1).padStart(2,'0')}</span>
            </div>
            <table className="cal_table">
              <thead><tr>{[0,1,2,3,4,5,6].map(i => <th key={i} className={i===0?'sun':i===6?'sat':''}>{getWeekdayLabel(i)}</th>)}</tr></thead>
              <tbody>{renderMonth(leftYear, leftMonth)}</tbody>
            </table>
          </div>
          <div className="cal_month">
            <div className="cal_month_header">
              <span className="cal_month_label">{rightYear}. {String(rightMonth+1).padStart(2,'0')}</span>
              <button className="cal_nav_btn" onClick={handleNext}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <table className="cal_table">
              <thead><tr>{[0,1,2,3,4,5,6].map(i => <th key={i} className={i===0?'sun':i===6?'sat':''}>{getWeekdayLabel(i)}</th>)}</tr></thead>
              <tbody>{renderMonth(rightYear, rightMonth)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="sp_footer_btn_wrap">
        <button className="sp_confirm_btn" onClick={() => onSelect(tempCheckin, tempCheckout)} disabled={!tempCheckin || !tempCheckout}>선택</button>
      </div>
    </div>
  )
}

// =====================
// 객실/인원 패널
// =====================
const RoomPanel = ({ onClose, onSelect, rooms: initRooms }) => {
  const [rooms, setRooms] = useState(initRooms || [{ adults: 2, children: 0 }])

  const updateRoom = (idx, field, val) =>
    setRooms(prev => prev.map((r, i) => i === idx
      ? { ...r, [field]: Math.max(field==='adults'?1:0, Math.min(field==='adults'?8:4, val)) } : r))
  const addRoom = () => { if (rooms.length < 3) setRooms(prev => [...prev, { adults: 2, children: 0 }]) }

  return (
    <div className="side_panel room_panel">
      <PanelHeroHeader title="객실/인원" onClose={onClose} heroImg="./lotte/m객실.jpg" />
      <div className="room_list">
        {rooms.map((room, idx) => (
          <div key={idx} className="room_item">
            <div className="room_item_header">
              <span className="room_label">객실 {idx + 1}</span>
              <a href="#" className="children_age_link" onClick={e => e.preventDefault()}>어린이 연령 정보 &gt;</a>
            </div>
            <div className="room_item_body">
              <div className="counter_group">
                <span className="counter_label">성인</span>
                <div className="counter">
                  <button className="counter_btn" onClick={() => updateRoom(idx, 'adults', room.adults - 1)} disabled={room.adults <= 1}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <span className="counter_val">{room.adults}</span>
                  <button className="counter_btn" onClick={() => updateRoom(idx, 'adults', room.adults + 1)} disabled={room.adults >= 8}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
              <div className="counter_divider"></div>
              <div className="counter_group">
                <span className="counter_label">어린이</span>
                <div className="counter">
                  <button className="counter_btn" onClick={() => updateRoom(idx, 'children', room.children - 1)} disabled={room.children <= 0}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <span className="counter_val">{room.children}</span>
                  <button className="counter_btn" onClick={() => updateRoom(idx, 'children', room.children + 1)} disabled={room.children >= 4}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {rooms.length < 3 && <button className="add_room_btn" onClick={addRoom}>객실 추가</button>}
      </div>
      <div className="sp_footer_btn_wrap">
        <button className="sp_confirm_btn" onClick={() => onSelect(rooms)}>선택</button>
      </div>
    </div>
  )
}

// =====================
// 다이닝 선택 패널
// =====================
const diningHotels = [...new Set(diData.map(d => d.hotel))]

const DiningSelectPanel = ({ onClose, onConfirm, selectedDining }) => {
  const [activeHotel, setActiveHotel]   = useState(diningHotels[0])
  const [tempSelected, setTempSelected] = useState(selectedDining)
  const filteredList = diData.filter(d => d.hotel === activeHotel)

  return (
    <div className="side_panel dining_panel">
      <PanelHeroHeader title="다이닝 선택" onClose={onClose} heroImg="./lotte/m다이닝.jpg" />
      <div className="dining_body">
        <div className="dining_hotel_list">
          <p className="dining_list_label">호텔 선택</p>
          {diningHotels.map(hotel => (
            <button key={hotel} className={`dining_hotel_item ${activeHotel === hotel ? 'active' : ''}`} onClick={() => setActiveHotel(hotel)}>
              {hotel}
            </button>
          ))}
        </div>
        <div className="dining_restaurant_list">
          <p className="dining_list_label">다이닝 선택</p>
          {filteredList.map(item => (
            <div key={item.id} className={`dining_card ${tempSelected?.id === item.id ? 'active' : ''}`} onClick={() => setTempSelected(item)}>
              <div className="dining_card_img"><img src={item.img} alt={item.title} /></div>
              <div className="dining_card_info">
                <p className="dining_card_category">{item.category}</p>
                <p className="dining_card_title">{item.title}</p>
              </div>
              <div className={`dining_card_radio ${tempSelected?.id === item.id ? 'checked' : ''}`}></div>
            </div>
          ))}
        </div>
      </div>
      <div className="sp_footer_btn_wrap dining_footer">
        <button className="sp_confirm_btn" onClick={() => onConfirm(tempSelected)} disabled={!tempSelected}>선택</button>
      </div>
    </div>
  )
}

// =====================
// 인원수 패널 (다이닝)
// =====================
const DiningPersonPanel = ({ onClose, onSelect, persons: initPersons }) => {
  const [persons, setPersons] = useState(initPersons || { adults: 1, children: 0, infants: 0 })

  const update = (field, val) => {
    const min = field === 'adults' ? 1 : 0
    setPersons(prev => ({ ...prev, [field]: Math.max(min, Math.min(10, val)) }))
  }

  const rows = [
    { field: 'adults',   label: '성인',  val: persons.adults,   min: 1 },
    { field: 'children', label: '어린이', val: persons.children, min: 0 },
    { field: 'infants',  label: '유아',  val: persons.infants,  min: 0 },
  ]

  return (
    <div className="side_panel person_panel">
      <PanelHeroHeader title="인원수" onClose={onClose} heroImg="./lotte/m다이닝.jpg" />
      <div className="person_body person_desktop">
        <div className="person_row">
          {rows.map(({ field, label, val, min }, i) => (
            <React.Fragment key={field}>
              {i > 0 && <div className="person_divider"></div>}
              <div className="person_col">
                <span className="person_label">{label}</span>
                <div className="counter">
                  <button className="counter_btn" onClick={() => update(field, val - 1)} disabled={val <= min}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <span className="counter_val">{val}</span>
                  <button className="counter_btn" onClick={() => update(field, val + 1)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="person_body person_mobile">
        <div className="person_mobile_list">
          {rows.map(({ field, label, val, min }) => (
            <div key={field} className="person_mobile_row">
              <span className="person_mobile_label">{label}</span>
              <div className="counter">
                <button className="counter_btn" onClick={() => update(field, val - 1)} disabled={val <= min}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                <span className="counter_val">{val}</span>
                <button className="counter_btn" onClick={() => update(field, val + 1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sp_footer_btn_wrap dining_footer">
        <button className="sp_confirm_btn" onClick={() => onSelect(persons)}>선택</button>
      </div>
    </div>
  )
}

// =====================
// 다이닝 UI (순수 표시용)
// =====================
const DiningUI = ({ onOpenPanel, selectedDining, persons }) => {
  const diningDisplayText = selectedDining ? selectedDining.title : null

  return (
    <>
      <div className="dining_section" onClick={() => onOpenPanel('dining')}>
        <div className="dining_section_inner">
          <div className="title"><p>다이닝</p></div>
          <div className="re_value">
            <p className={diningDisplayText ? 'selected' : 'placeholder'}>
              {diningDisplayText || '다이닝을 선택해 주세요.'}
            </p>
          </div>
        </div>
        <svg className="dining_section_arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="dining_section dining_person" onClick={() => onOpenPanel('person')}>
        <div className="dining_section_inner dining_person_row">
          <div className="dining_person_item">
            <span className="summary_label">성인</span>
            <span className="summary_val">{persons.adults}</span>
          </div>
          <div className="dining_person_item">
            <span className="summary_label">어린이</span>
            <span className="summary_val">{persons.children}</span>
          </div>
          <div className="dining_person_item">
            <span className="summary_label">유아</span>
            <span className="summary_val">{persons.infants}</span>
          </div>
        </div>
        <div className="dining_section_inner dining_person_mobile">
          <div className="title"><p>예약 인원</p></div>
          <p className="dining_person_mobile_val">
            성인 {persons.adults}, 어린이 {persons.children}, 유아 {persons.infants}
          </p>
        </div>
        <svg className="dining_section_arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="dining_promotion_code">
        <div className="code">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:'0.6rem', flexShrink:0}}>
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="7" y1="7" x2="7.01" y2="7" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p>프로모션 코드</p>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{marginLeft:'0.4rem'}}>
            <path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </>
  )
}

// =====================
// 메인 Reservation
// =====================
const Reservation = () => {
  const [activeTab, setActiveTab]     = useState('객실')
  const [activePanel, setActivePanel] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const scrollLockRef = useRef(false)

  const today    = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const [selectedHotels, setSelectedHotels] = useState([])
  const [checkin,  setCheckin]  = useState({ year: today.getFullYear(),    month: today.getMonth(),    day: today.getDate() })
  const [checkout, setCheckout] = useState({ year: tomorrow.getFullYear(), month: tomorrow.getMonth(), day: tomorrow.getDate() })
  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }])

  const [selectedDining, setSelectedDining] = useState(null)
  const [diningPersons, setDiningPersons]   = useState({ adults: 1, children: 0, infants: 0 })

  const nights        = calcNights(checkin, checkout)
  const totalAdults   = rooms.reduce((s, r) => s + r.adults, 0)
  const totalChildren = rooms.reduce((s, r) => s + r.children, 0)
  const hotelDisplayText = getHotelDisplayText(selectedHotels)

  const openPanel  = (name) => setActivePanel(name)
  const closePanel = () => setActivePanel(null)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const handleScroll = () => {
      if (scrollLockRef.current || window.innerWidth <= 760) return
      if (window.scrollY > 0) setIsCollapsed(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 760) {
      if (isMobileOpen) document.body.classList.add('re_open')
      else              document.body.classList.remove('re_open')
    }
    return () => document.body.classList.remove('re_open')
  }, [isMobileOpen])

  const handleMobileClose   = () => { setIsMobileOpen(false); document.body.classList.remove('re_open') }
  const handleCollapsedClick = () => {
    if (window.innerWidth <= 760) {
      setIsMobileOpen(true)
    } else {
      scrollLockRef.current = true
      setIsCollapsed(false)
      setTimeout(() => { scrollLockRef.current = false }, 3000)
    }
  }

  return (
    <div className={`reservation ${isCollapsed && window.innerWidth > 760 ? 'collapsed' : ''}`}>

      <button
        className="re_collapsed_btn mobile_btn_show"
        onClick={handleCollapsedClick}
        style={isMobileOpen ? { display: 'none' } : undefined}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#fff" strokeWidth="1.5"/>
          <path d="M3 9h18" stroke="#fff" strokeWidth="1.5"/>
          <path d="M8 2v4M16 2v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 14h4M7 17h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span>예약하기</span>
      </button>

      {activePanel && <div className="panel_overlay" onClick={closePanel}></div>}

      <div className={`panel_wrapper ${activePanel === 'hotel'  ? 'open' : ''}`}>
        {activePanel === 'hotel'  && <HotelPanel onClose={closePanel} onConfirm={(hotels) => { setSelectedHotels(hotels); closePanel() }} selectedHotels={selectedHotels} setSelectedHotels={setSelectedHotels} />}
      </div>
      <div className={`panel_wrapper ${activePanel === 'date'   ? 'open' : ''}`}>
        {activePanel === 'date'   && <CalendarPanel onClose={closePanel} onSelect={(ci, co) => { if (ci) setCheckin(ci); if (co) setCheckout(co); closePanel() }} checkin={checkin} checkout={checkout} />}
      </div>
      <div className={`panel_wrapper ${activePanel === 'room'   ? 'open' : ''}`}>
        {activePanel === 'room'   && <RoomPanel onClose={closePanel} onSelect={(r) => { setRooms(r); closePanel() }} rooms={rooms} />}
      </div>
      <div className={`panel_wrapper ${activePanel === 'dining' ? 'open' : ''}`}>
        {activePanel === 'dining' && <DiningSelectPanel onClose={closePanel} onConfirm={(item) => { setSelectedDining(item); closePanel() }} selectedDining={selectedDining} />}
      </div>
      <div className={`panel_wrapper ${activePanel === 'person' ? 'open' : ''}`}>
        {activePanel === 'person' && <DiningPersonPanel onClose={closePanel} onSelect={(p) => { setDiningPersons(p); closePanel() }} persons={diningPersons} />}
      </div>

      {/* ── 데스크탑 ── */}
      <div className="reservation_i">
        <div className="modal_header">
          <div className="m_notice">
            <a href="#">
              <span className='icon'></span>
              <span className='text'>리워즈 회원가입하고 다양한 혜택을 받아보세요</span>
            </a>
          </div>
          <div className="m_switch">
            <div className={`btn ${activeTab === '다이닝' ? 'dining' : ''}`}>
              <button type='button' className={activeTab === '객실'   ? 'active' : ''} onClick={() => setActiveTab('객실')} ><span>객실</span></button>
              <button type='button' className={activeTab === '다이닝' ? 'active' : ''} onClick={() => setActiveTab('다이닝')}><span>다이닝</span></button>
            </div>
          </div>
        </div>
        <div className="modal_content">
          {activeTab === '다이닝' ? (
            <DiningUI onOpenPanel={openPanel} selectedDining={selectedDining} persons={diningPersons} />
          ) : (
            <>
              <div className="re_hotel" onClick={() => openPanel('hotel')}>
                <div className="title"><p>호텔/지역</p></div>
                <div className="re_value">
                  <p className={hotelDisplayText ? 'selected' : 'placeholder'}>{hotelDisplayText || '호텔을 선택해 주세요.'}</p>
                </div>
              </div>
              <div className="re_date" onClick={() => openPanel('date')}>
                <div className="title"><p>체크인/아웃</p></div>
                <div className="re_value">
                  <p className="date_value">{formatDate(checkin)} ~ {formatDate(checkout)} / {nights}박</p>
                </div>
              </div>
              <div className="re_number" onClick={() => openPanel('room')}>
                <div className="room_summary">
                  <div className="room_summary_item"><span className="summary_label">객실</span><span className="summary_val">{rooms.length}</span></div>
                  <div className="room_summary_item"><span className="summary_label">성인</span><span className="summary_val">{totalAdults}</span></div>
                  <div className="room_summary_item"><span className="summary_label">어린이</span><span className="summary_val">{totalChildren}</span></div>
                </div>
              </div>
              <div className="promotion_code">
                <div className="code">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:'0.6rem', flexShrink:0}}>
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="7" y1="7" x2="7.01" y2="7" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p>프로모션 코드</p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{marginLeft:'0.4rem'}}>
                    <path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="modal_footer">
          <div className="search"><button type='button'><span>검색</span></button></div>
        </div>
      </div>

      {/* ── 모바일 ── */}
      <div className={`reservation_m ${!isMobileOpen ? 'mobile_closed' : ''}`}>

        <div className={`m_hero_img ${activeTab === '다이닝' ? 'm_hero_dining' : 'm_hero_room'}`}>
          {activeTab === '다이닝'
            ? <img src="./lotte/m다이닝.jpg" alt="" />
            : <img src="./lotte/m객실.jpg" alt="" />
          }
        </div>

        <button className="m_close_btn" onClick={handleMobileClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="m_tab_wrap">
          <div className={`m_tab_btn_wrap ${activeTab === '다이닝' ? 'dining' : ''}`}>
            <button className={activeTab === '객실'   ? 'active' : ''} onClick={() => setActiveTab('객실')} >객실</button>
            <button className={activeTab === '다이닝' ? 'active' : ''} onClick={() => setActiveTab('다이닝')}>다이닝</button>
          </div>
        </div>

        <div className="m_modal_content">
          {activeTab === '다이닝' ? (
            <DiningUI onOpenPanel={openPanel} selectedDining={selectedDining} persons={diningPersons} />
          ) : (
            <>
              <div className="m_section re_hotel" onClick={() => openPanel('hotel')}>
                <div className="m_section_left">
                  <span className="m_section_label">호텔/지역</span>
                  <p className={hotelDisplayText ? 'm_section_value' : 'm_section_placeholder'}>{hotelDisplayText || '호텔을 선택해 주세요.'}</p>
                </div>
                <svg className="m_section_arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="m_section re_date" onClick={() => openPanel('date')}>
                <div className="m_section_left">
                  <span className="m_section_label">체크인/아웃</span>
                  <p className="m_section_value">{formatDate(checkin)} ~ {formatDate(checkout)} / {nights}박</p>
                </div>
                <svg className="m_section_arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="m_section re_number" onClick={() => openPanel('room')}>
                <div className="m_section_left">
                  <span className="m_section_label">객실/인원</span>
                  <p className="m_section_value">객실 {rooms.length} / 성인 {totalAdults}, 어린이 {totalChildren}</p>
                </div>
                <svg className="m_section_arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="m_promotion">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="7" y1="7" x2="7.01" y2="7" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>프로모션 코드</span>
              </div>
            </>
          )}
        </div>

        {/* 배너 — 탭 공통, m_footer 바로 위 */}
        <div className="m_banner_area">
          <img src="./lotte/m_banner.png" alt="리워즈" />
          <p>리워즈 회원가입하시고 혜택받으세요.</p>
        </div>

        <div className="m_footer">
          <button className="m_search_btn" type="button">검색</button>
        </div>
      </div>

    </div>
  )
}

export default Reservation