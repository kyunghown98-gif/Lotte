import React, { useState, useRef, useEffect } from 'react'
import "../css/Header.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState(null)
  const [dropdownHeight, setDropdownHeight] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const closeTimer = useRef(null)
  const innerRefs = useRef({})
  const [langOpen, setLangOpen] = useState(false)
  const [currOpen, setCurrOpen] = useState(false)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null)
  const [mobileLangOpen, setMobileLangOpen] = useState(false)
  const [mobileCurrOpen, setMobileCurrOpen] = useState(false)

  const languages = ['English', '日本語', '中文(简体字)', 'Русский', 'Tiếng Việt', 'ဗမာစာ', 'العربية']
  const currencies = ['한국 (KRW)', 'Australia (AUD)', 'Canada (CAD)', '中国 (CNY)', 'EU (EUR)', 'Hong Kong (HKD)', '日本 (JPY)', 'Россия (RUB)', 'USA (USD)', 'Việt Nam (VND)']

  const mobileMenus = [
    { name: '브랜드', sub: ['브랜드 소개', '시그니엘', '롯데호텔', 'L7 바이 롯데호텔', '롯데시티호텔', '롯데리조트', 'VL', '어필리에이티드 바이 롯데호텔'] },
    { name: '스페셜 오퍼', sub: ['객실 프로모션', '다이닝 프로모션', '호텔 이벤트', '제휴'] },
    { name: '다이닝', sub: [] },
    { name: '웨딩&컨벤션', sub: ['웨딩 소개', '웨딩 베뉴', '연회장 소개', '연회장', '연회장 문의', '웨딩 프로모션', '미팅&패키지', '케이터링'] },
    { name: '경험', sub: ['HEON Bedding', 'L.SOMM', 'Bath Amenity', 'NICE MUSIK', 'RETREAT SIGNIEL', 'Signature Scent', 'Art Experience', 'Artist Talk'] },
    { name: '멤버십', sub: ['롯데호텔 멤버십', '롯데호텔 리워즈', '리워즈', '트레비클럽', '리워즈 혜택', '포인트 전환', 'e바우처 신청', '포인트 기부', '멤버십 FAQ'] },
    { name: 'e-SHOP', sub: [] },
  ]

  const handleMouseEnter = (menu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setVisibleMenu(menu)
    setIsOpen(true)
    if (innerRefs.current[menu]) setDropdownHeight(innerRefs.current[menu].scrollHeight)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
    closeTimer.current = setTimeout(() => { setVisibleMenu(null); setDropdownHeight(0) }, 400)
  }

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.item_lang') && !e.target.closest('.item_curr')) {
        setLangOpen(false); setCurrOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const anyOpen = mobileOpen || mobileLangOpen || mobileCurrOpen
    document.body.style.overflow = anyOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, mobileLangOpen, mobileCurrOpen])

  return (
    <header className={`${isOpen ? 'is-open' : ''} ${isSticky ? 'is-sticky' : ''}`}>
      <div className="header_i">

        <div className="top">
          <div className="logo">
            <h1><a href="#"><span></span></a></h1>
          </div>

          <div className="utility desktop-only">
            <ul className="u_menu">
              <li className="item_bell"><button type="button">알림</button></li>
              <li><a href="#">로그인</a></li>
              <li><a href="#">회원가입</a></li>
              <li><a href="#">예약조회</a></li>
              <li><a href="#">호텔찾기</a></li>
              <li><a href="#">리워즈</a></li>
              <li className="item_lang" style={{ position: 'relative' }}>
                <button type="button" className="btn" onClick={() => { setLangOpen(!langOpen); setCurrOpen(false) }}>
                  <span>한국어</span>
                </button>
                <div className={`util_dropdown ${langOpen ? 'open' : ''}`}>
                  {languages.map(lang => <button key={lang} type="button" className="util_dropdown_item">{lang}</button>)}
                </div>
              </li>
              <li className="item_curr" style={{ position: 'relative' }}>
                <button type="button" className="btn" onClick={() => { setCurrOpen(!currOpen); setLangOpen(false) }}>
                  <span>KRW</span>
                </button>
                <div className={`util_dropdown ${currOpen ? 'open' : ''}`}>
                  {currencies.map(curr => <button key={curr} type="button" className="util_dropdown_item">{curr}</button>)}
                </div>
              </li>
            </ul>
          </div>

          <button
            className={`hamburger mobile-only ${mobileOpen ? 'is-active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            <span></span><span></span><span></span>
          </button>
        </div>

        <div className="bottom desktop-only">
          <nav className="gnb">
            <ul>
              <li onMouseEnter={() => handleMouseEnter('브랜드')} onMouseLeave={handleMouseLeave}><a href="#" className="main_link">브랜드</a></li>
              <li onMouseEnter={() => handleMouseEnter('스페셜오퍼')} onMouseLeave={handleMouseLeave}><a href="#" className="main_link">스페셜 오퍼</a></li>
              <li><a href="#" className="main_link">다이닝</a></li>
              <li onMouseEnter={() => handleMouseEnter('웨딩')} onMouseLeave={handleMouseLeave}><a href="#" className="main_link">웨딩&amp;컨벤션</a></li>
              <li onMouseEnter={() => handleMouseEnter('경험')} onMouseLeave={handleMouseLeave}><a href="#" className="main_link">경험</a></li>
              <li onMouseEnter={() => handleMouseEnter('멤버십')} onMouseLeave={handleMouseLeave}><a href="#" className="main_link">멤버십</a></li>
              <li><a href="#" className="main_link">e-SHOP</a></li>
            </ul>
            <div
              className={`dropdown ${isOpen ? 'active' : ''}`}
              style={{ height: dropdownHeight ? `${dropdownHeight}px` : '0' }}
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setIsOpen(true) }}
              onMouseLeave={handleMouseLeave}
            >
              <div ref={el => innerRefs.current['브랜드'] = el} className={`dropdown_inner ${visibleMenu === '브랜드' ? 'visible' : ''}`}>
                <div className="menu_name">브랜드</div>
                <div className="dropdown_menu">
                  <div className="sub_group">
                    <a href="#" className="sub_title">브랜드 소개</a>
                    <ul>
                      <li><a href="#">시그니엘</a></li><li><a href="#">롯데호텔</a></li>
                      <li><a href="#">L7 바이 롯데호텔</a></li><li><a href="#">롯데시티호텔</a></li>
                      <li><a href="#">롯데리조트</a></li><li><a href="#">VL</a></li>
                      <li><a href="#">어필리에이티드 바이 롯데호텔</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div ref={el => innerRefs.current['스페셜오퍼'] = el} className={`dropdown_inner ${visibleMenu === '스페셜오퍼' ? 'visible' : ''}`}>
                <div className="menu_name">스페셜 오퍼</div>
                <div className="dropdown_menu oper">
                  <div className="sub_group"><a href="#" className="sub_title">객실 프로모션</a></div>
                  <div className="sub_group"><a href="#" className="sub_title">다이닝 프로모션</a></div>
                  <div className="sub_group"><a href="#" className="sub_title">호텔 이벤트</a></div>
                  <div className="sub_group"><a href="#" className="sub_title">제휴</a></div>
                </div>
              </div>
              <div ref={el => innerRefs.current['웨딩'] = el} className={`dropdown_inner ${visibleMenu === '웨딩' ? 'visible' : ''}`}>
                <div className="menu_name">웨딩&amp;컨벤션</div>
                <div className="dropdown_menu">
                  <div className="sub_group"><a href="#" className="sub_title">웨딩</a><ul><li><a href="#">웨딩 소개</a></li><li><a href="#">웨딩 베뉴</a></li></ul></div>
                  <div className="sub_group"><a href="#" className="sub_title">컨벤션</a><ul><li><a href="#">연회장 소개</a></li><li><a href="#">연회장</a></li><li><a href="#">연회장 문의</a></li></ul></div>
                  <div className="sub_group"><a href="#" className="sub_title">웨딩 프로모션</a></div>
                  <div className="sub_group"><a href="#" className="sub_title">미팅&amp;패키지</a></div>
                  <div className="sub_group"><a href="#" className="sub_title">케이터링</a></div>
                </div>
              </div>
              <div ref={el => innerRefs.current['경험'] = el} className={`dropdown_inner ${visibleMenu === '경험' ? 'visible' : ''}`}>
                <div className="menu_name">경험</div>
                <div className="dropdown_menu">
                  <div className="sub_group"><a href="#" className="sub_title">Lifestyle</a><ul><li><a href="#">HEON Bedding</a></li><li><a href="#">L.SOMM</a></li><li><a href="#">Bath Amenity</a></li><li><a href="#">NICE MUSIK</a></li><li><a href="#">RETREAT SIGNIEL</a></li><li><a href="#">Signature Scent</a></li></ul></div>
                  <div className="sub_group"><a href="#" className="sub_title">Art</a><ul><li><a href="#">Art Experience</a></li><li><a href="#">Artist Talk</a></li></ul></div>
                </div>
              </div>
              <div ref={el => innerRefs.current['멤버십'] = el} className={`dropdown_inner ${visibleMenu === '멤버십' ? 'visible' : ''}`}>
                <div className="menu_name">멤버십</div>
                <div className="dropdown_menu">
                  <div className="sub_group"><a href="#" className="sub_title">롯데호텔 멤버십</a></div>
                  <div className="sub_group"><a href="#" className="sub_title">롯데호텔 리워즈</a><ul><li><a href="#">리워즈</a></li><li><a href="#">트레비클럽</a></li><li><a href="#">트레비클럽 부산</a></li><li><a href="#">시그니엘 컬렉션</a></li><li><a href="#">패밀리클럽</a></li><li><a href="#">피트니스&amp;스파</a></li><li><a href="#">부커클럽</a></li></ul></div>
                  <div className="sub_group"><a href="#" className="sub_title">리워즈 포인트</a><ul><li><a href="#">리워즈 혜택</a></li><li><a href="#">포인트 전환</a></li><li><a href="#">e바우처 신청</a></li><li><a href="#">포인트 기부</a></li></ul></div>
                  <div className="sub_group"><a href="#" className="sub_title">멤버십 FAQ</a></div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* 모바일 패널 */}
      <div className={`mobile-panel ${mobileOpen ? 'is-open' : ''}`}>
        <div className="mp-top">
          <div className="mp-top-left">
            <button className="mp-lang-btn" onClick={() => setMobileLangOpen(true)}>🏠 한국어 ∨</button>
            <button className="mp-curr-btn" onClick={() => setMobileCurrOpen(true)}>KRW ∨</button>
          </div>
          <button className="mp-close" onClick={() => { setMobileOpen(false); setMobileActiveMenu(null) }}>✕</button>
        </div>
        <div className="mp-login">
          <a href="#" className="mp-login-title">로그인 해주세요 →</a>
          <p>로그인을 하시고 더 많은 혜택과 서비스를 경험하세요.</p>
          <a href="#" className="mp-join">회원가입</a>
        </div>
        <div className="mp-divider" />
        <ul className="mp-shortcuts">
          {['예약하기', '예약조회', '호텔찾기', '리워즈'].map(item => (
            <li key={item}><a href="#">{item}</a><span>›</span></li>
          ))}
        </ul>
        <div className="mp-divider" />
        <div className="mp-body">
          <ul className="mp-nav">
            {mobileMenus.map(menu => (
              <li
                key={menu.name}
                className={mobileActiveMenu === menu.name ? 'active' : ''}
                onClick={() => setMobileActiveMenu(mobileActiveMenu === menu.name ? null : menu.name)}
              >
                {menu.name}
              </li>
            ))}
          </ul>
          <div className="mp-sub">
            {mobileMenus.map(menu => (
              mobileActiveMenu === menu.name && menu.sub.length > 0 && (
                <ul key={menu.name}>
                  {menu.sub.map(sub => <li key={sub}><a href="#">• {sub}</a></li>)}
                </ul>
              )
            ))}
          </div>
        </div>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => { setMobileOpen(false); setMobileActiveMenu(null) }} />}

      {/* 언어 바텀시트 */}
      {mobileLangOpen && <div className="bs-overlay" onClick={() => setMobileLangOpen(false)} />}
      <div className={`bottom-sheet ${mobileLangOpen ? 'is-open' : ''}`}>
        <div className="bs-handle" />
        <ul className="bs-list">
          {languages.map(lang => <li key={lang} onClick={() => setMobileLangOpen(false)}>{lang}</li>)}
        </ul>
      </div>

      {/* 통화 바텀시트 */}
      {mobileCurrOpen && <div className="bs-overlay" onClick={() => setMobileCurrOpen(false)} />}
      <div className={`bottom-sheet ${mobileCurrOpen ? 'is-open' : ''}`}>
        <div className="bs-handle" />
        <ul className="bs-list">
          {currencies.map(curr => <li key={curr} onClick={() => setMobileCurrOpen(false)}>{curr}</li>)}
        </ul>
      </div>

    </header>
  )
}

export default Header