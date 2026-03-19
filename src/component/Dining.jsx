import React, { useState } from 'react'
import '../css/dining.css'
import { diData } from './DiningData'

const diningHotels = [...new Set(diData.map(d => d.hotel))]

// --- 다이닝 선택 패널 ---
const DiningSelectPanel = ({ onClose, onConfirm, selectedDining }) => {
  const [activeHotel, setActiveHotel] = useState(diningHotels[0])
  const [tempSelected, setTempSelected] = useState(selectedDining)
  const filteredList = diData.filter(d => d.hotel === activeHotel)

  return (
    <div className="side_panel dining_panel">
      {/* 모바일: 히어로 헤더 */}
      <div className="dining_hero_header">
        {/* <img src="다이닝선택배경이미지" alt="" /> */}
        <div className="dining_hero_content">
          <h2 className="dining_hero_title">다이닝 선택</h2>
          <button className="dining_hero_close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 데스크탑: 일반 헤더 */}
      <div className="sp_header dining_desktop_header">
        <h2 className="sp_title">다이닝 선택</h2>
        <button className="sp_close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="dining_body">
        {/* 왼쪽: 호텔 목록 */}
        <div className="dining_hotel_list">
          <p className="dining_list_label">호텔 선택</p>
          {diningHotels.map(hotel => (
            <button
              key={hotel}
              className={`dining_hotel_item ${activeHotel === hotel ? 'active' : ''}`}
              onClick={() => setActiveHotel(hotel)}
            >
              {hotel}
            </button>
          ))}
        </div>

        {/* 오른쪽: 다이닝 카드 */}
        <div className="dining_restaurant_list">
          <p className="dining_list_label">다이닝 선택</p>
          {filteredList.map(item => (
            <div
              key={item.id}
              className={`dining_card ${tempSelected?.id === item.id ? 'active' : ''}`}
              onClick={() => setTempSelected(item)}
            >
              <div className="dining_card_img">
                <img src={item.img} alt={item.title} />
              </div>
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
        <button
          className="sp_confirm_btn"
          onClick={() => onConfirm(tempSelected)}
          disabled={!tempSelected}
        >선택</button>
      </div>
    </div>
  )
}

// --- 인원수 패널 ---
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
      {/* 모바일: 히어로 헤더 */}
      <div className="dining_hero_header">
        {/* <img src="인원수배경이미지" alt="" /> */}
        <div className="dining_hero_content">
          <h2 className="dining_hero_title">인원수</h2>
          <button className="dining_hero_close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 데스크탑: 일반 헤더 */}
      <div className="sp_header dining_desktop_header">
        <h2 className="sp_title">인원수</h2>
        <button className="sp_close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* 데스크탑: 가로 3열 */}
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

      {/* 모바일: 세로 3줄 */}
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

// --- 메인 Dining ---
const Dining = () => {
  const [activePanel, setActivePanel] = useState(null)
  const [selectedDining, setSelectedDining] = useState(null)
  const [persons, setPersons] = useState({ adults: 1, children: 0, infants: 0 })

  const openPanel = (name) => setActivePanel(name)
  const closePanel = () => setActivePanel(null)

  const diningDisplayText = selectedDining ? selectedDining.title : null

  return (
    <>
      {/* 다이닝 선택 섹션 */}
      <div className="dining_section" onClick={() => openPanel('dining')}>
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

      {/* 예약 인원 섹션 */}
      <div className="dining_section dining_person" onClick={() => openPanel('person')}>
        {/* 데스크탑: 3열 */}
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
        {/* 모바일: 한 줄 */}
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

      {/* 리워즈 배너 - reservation과 동일 위치 */}
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

      {/* 다이닝 선택 패널 */}
      <div className={`panel_wrapper ${activePanel === 'dining' ? 'open' : ''}`}>
        {activePanel === 'dining' && (
          <DiningSelectPanel
            onClose={closePanel}
            onConfirm={(item) => { setSelectedDining(item); closePanel() }}
            selectedDining={selectedDining}
          />
        )}
      </div>

      {/* 인원수 패널 */}
      <div className={`panel_wrapper ${activePanel === 'person' ? 'open' : ''}`}>
        {activePanel === 'person' && (
          <DiningPersonPanel
            onClose={closePanel}
            onSelect={(p) => { setPersons(p); closePanel() }}
            persons={persons}
          />
        )}
      </div>
    </>
  )
}

export default Dining