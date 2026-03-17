import React, { useState } from 'react'
import '../css/footer.css'

const Footer = () => {
  const [familyOpen, setFamilyOpen] = useState(false)

  // 모바일 아코디언 상태
  const [accordionOpen, setAccordionOpen] = useState({
    destination: false,
    company: false,
    hotline: false,
    terms: false,
    other: false,
  })

  const toggleAccordion = (key) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <footer className="footer">
      {/* 메인 푸터 영역 */}
      <div className="footer__main">
        <div className="footer__inner">

          {/* ── 데스크탑: 상단 로고 + 앱스토어 ── */}
          <div className="footer__top footer__top--desktop">
            <h1 className="footer__logo">LOTTE HOTELS &amp; RESORTS</h1>
            <div className="footer__apps">
              <a href="#" className="footer__app-link">
                <span className="footer__app-icon"></span>
                <span>App Store</span>
              </a>
              <a href="#" className="footer__app-link">
                <span className="footer__app-icon">▶</span>
                <span>Google Play</span>
              </a>
            </div>
          </div>

          {/* ── 데스크탑: 네비게이션 + 컨택트 ── */}
          <div className="footer__body footer__body--desktop">
            <div className="footer__nav">
              <div className="footer__col">
                <h3 className="footer__col-title">Destination</h3>
                <ul className="footer__col-list">
                  <li><a href="#">롯데호텔앤리조트 소개</a></li>
                  <li><a href="#">브랜드 소개</a></li>
                  <li><a href="#">지점별 연락처</a></li>
                  <li><a href="#">고객의 소리</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <h3 className="footer__col-title">Company</h3>
                <ul className="footer__col-list">
                  <li><a href="#">(주)호텔롯데 기업소개</a></li>
                  <li><a href="#">채용</a></li>
                  <li><a href="#">신규 개발</a></li>
                  <li><a href="#">서비스아카데미</a></li>
                  <li><a href="#">지속가능경영</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <h3 className="footer__col-title">Hotline</h3>
                <ul className="footer__col-list">
                  <li><a href="#">신문고</a></li>
                  <li><a href="#">컴플라이언스</a></li>
                </ul>
              </div>
              <div className="footer__col">
                <h3 className="footer__col-title">Terms &amp; Policy</h3>
                <ul className="footer__col-list">
                  <li><a href="#">약관 및 정책</a></li>
                  <li><a href="#">사이트 이용약관</a></li>
                </ul>
              </div>
            </div>

            <div className="footer__divider" />

            <div className="footer__contact">
              <h3 className="footer__col-title">Contact</h3>
              <address className="footer__address">
                <p>04533, 서울특별시 중구 을지로 30</p>
                <p>02-771-1000</p>
                <p>대표이사 정호석</p>
                <p>사업자등록번호 104-81-25980</p>
                <p>통신판매신고번호 중구02802호</p>
              </address>
              <div className="footer__family">
                <button className="footer__family-btn" onClick={() => setFamilyOpen(!familyOpen)}>
                  <em>Family Site</em>
                  <span className={`footer__family-icon ${familyOpen ? 'open' : ''}`}>+</span>
                </button>
                <div className={`footer__family-dropdown ${familyOpen ? 'open' : ''}`}>
                  <a href="#">(주)호텔롯데</a>
                  <a href="#">롯데지주</a>
                  <a href="#">롯데건설</a>
                  <a href="#">롯데글로벌로지스</a>
                  <a href="#">롯데기공</a>
                  <a href="#">롯데렌탈</a>
                  <a href="#">롯데이네오스화학</a>
                  <a href="#">롯데면세점제주</a>
                  <a href="#">롯데멤버스(L.POINT)</a>
                  <a href="#">롯데물산</a>
                  <a href="#">롯데스카이힐CC</a>
                  <a href="#">롯데상사</a>
                  <a href="#">롯데시네마</a>
                  <a href="#">롯데아사히주류</a>
                  <a href="#">롯데알미늄</a>
                  <a href="#">롯데엠시시</a>
                  <a href="#">롯데월드</a>
                  <a href="#">롯데피플네트웍스</a>
                  <a href="#">롯데인재개발원</a>
                  <a href="#">롯데개발</a>
                  <a href="#">롯데자이언츠</a>
                  <a href="#">롯데이노베이트</a>
                  <a href="#">롯데웰푸드</a>
                  <a href="#">롯데제이티비</a>
                  <a href="#">롯데중앙연구소</a>
                  <a href="#">롯데채용사이트</a>
                  <a href="#">롯데칠성음료(음료BG)</a>
                  <a href="#">롯데칠성음료</a>
                </div>
              </div>
              <div className="footer__sns">
                <a href="#" className="footer__sns-link" aria-label="TripAdvisor">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-3-8a3 3 0 116 0 3 3 0 01-6 0z"/>
                  </svg>
                </a>
                <a href="#" className="footer__sns-link" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.47 12.35 12.35 0 00-7.64 0A4.83 4.83 0 014.41 6.69 11.94 11.94 0 003 12a11.94 11.94 0 001.41 5.31 4.83 4.83 0 003.77 2.47 12.35 12.35 0 007.64 0 4.83 4.83 0 003.77-2.47A11.94 11.94 0 0021 12a11.94 11.94 0 00-1.41-5.31zM10 15V9l5 3-5 3z"/>
                  </svg>
                </a>
                <a href="#" className="footer__sns-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="footer__sns-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="footer__sns-link footer__sns-blog" aria-label="Blog">
                  <span>blog</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── 데스크탑: 하단 약관 ── */}
          <div className="footer__bottom footer__bottom--desktop">
            <nav className="footer__policy">
              <a href="#">통합숙박권 예약</a>
              <span className="footer__dot">•</span>
              <a href="#">임직원</a>
              <span className="footer__dot">•</span>
              <a href="#">리조트 분양회원</a>
              <span className="footer__dot">•</span>
              <a href="#" className="footer__policy--bold">개인정보 처리방침</a>
              <span className="footer__dot">•</span>
              <a href="#">FAQ</a>
              <span className="footer__dot">•</span>
              <a href="#">쿠키설정</a>
              <span className="footer__dot">•</span>
              <a href="#">사이트맵</a>
            </nav>
          </div>

          {/* ══════════════════════════════════════
              모바일 전용 레이아웃 (760px 이하)
          ══════════════════════════════════════ */}
          <div className="footer__mobile">

            {/* 아코디언 메뉴 */}
            <div className="footer__accordion">

              {/* DESTINATION */}
              <div className="footer__acc-item">
                <button
                  className={`footer__acc-btn ${accordionOpen.destination ? 'open' : ''}`}
                  onClick={() => toggleAccordion('destination')}
                >
                  <span>DESTINATION</span>
                  <span className="footer__acc-icon">{accordionOpen.destination ? '—' : '+'}</span>
                </button>
                <div className={`footer__acc-panel ${accordionOpen.destination ? 'open' : ''}`}>
                  <ul className="footer__acc-list">
                    <li><a href="#">롯데호텔앤리조트 소개</a></li>
                    <li><a href="#">브랜드 소개</a></li>
                    <li><a href="#">지점별 연락처</a></li>
                    <li><a href="#">고객의 소리</a></li>
                  </ul>
                </div>
              </div>

              {/* COMPANY */}
              <div className="footer__acc-item">
                <button
                  className={`footer__acc-btn ${accordionOpen.company ? 'open' : ''}`}
                  onClick={() => toggleAccordion('company')}
                >
                  <span>COMPANY</span>
                  <span className="footer__acc-icon">{accordionOpen.company ? '—' : '+'}</span>
                </button>
                <div className={`footer__acc-panel ${accordionOpen.company ? 'open' : ''}`}>
                  <ul className="footer__acc-list">
                    <li><a href="#">(주)호텔롯데 기업소개</a></li>
                    <li><a href="#">채용</a></li>
                    <li><a href="#">신규 개발</a></li>
                    <li><a href="#">서비스아카데미</a></li>
                    <li><a href="#">지속가능경영</a></li>
                  </ul>
                </div>
              </div>

              {/* HOTLINE */}
              <div className="footer__acc-item">
                <button
                  className={`footer__acc-btn ${accordionOpen.hotline ? 'open' : ''}`}
                  onClick={() => toggleAccordion('hotline')}
                >
                  <span>HOTLINE</span>
                  <span className="footer__acc-icon">{accordionOpen.hotline ? '—' : '+'}</span>
                </button>
                <div className={`footer__acc-panel ${accordionOpen.hotline ? 'open' : ''}`}>
                  <ul className="footer__acc-list">
                    <li><a href="#">신문고</a></li>
                    <li><a href="#">컴플라이언스</a></li>
                  </ul>
                </div>
              </div>

              {/* TERMS & POLICY */}
              <div className="footer__acc-item">
                <button
                  className={`footer__acc-btn ${accordionOpen.terms ? 'open' : ''}`}
                  onClick={() => toggleAccordion('terms')}
                >
                  <span>TERMS &amp; POLICY</span>
                  <span className="footer__acc-icon">{accordionOpen.terms ? '—' : '+'}</span>
                </button>
                <div className={`footer__acc-panel ${accordionOpen.terms ? 'open' : ''}`}>
                  <ul className="footer__acc-list">
                    <li><a href="#">약관 및 정책</a></li>
                    <li><a href="#">사이트 이용약관</a></li>
                  </ul>
                </div>
              </div>

              {/* OTHER INFORMATION */}
              <div className="footer__acc-item">
                <button
                  className={`footer__acc-btn ${accordionOpen.other ? 'open' : ''}`}
                  onClick={() => toggleAccordion('other')}
                >
                  <span>OTHER INFORMATION</span>
                  <span className="footer__acc-icon">{accordionOpen.other ? '—' : '+'}</span>
                </button>
                <div className={`footer__acc-panel ${accordionOpen.other ? 'open' : ''}`}>
                  <ul className="footer__acc-list">
                    <li><a href="#">통합숙박권 예약</a></li>
                    <li><a href="#">임직원</a></li>
                    <li><a href="#">리조트 분양회원</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">쿠키설정</a></li>
                    <li><a href="#">사이트맵</a></li>
                  </ul>
                </div>
              </div>

            </div>
            {/* // 아코디언 끝 */}

            {/* 모바일 하단 정보 섹션 */}
            <div className="footer__mobile-info">
              <h1 className="footer__logo">LOTTE HOTELS<br />&amp; RESORTS</h1>
              <address className="footer__address">
                <p>04533, 서울특별시 중구 을지로 30</p>
                <p>02-771-1000</p>
                <p>대표이사 정호석</p>
                <p>사업자등록번호 104-81-25980</p>
                <p>통신판매신고번호 중구02802호</p>
              </address>

              <div className="footer__mobile-links">
                <a href="#" className="footer__policy--bold">개인정보 처리방침</a>
                <a href="#">롯데호텔앤리조트 신문고(제보)</a>
              </div>
            </div>

            {/* 모바일 앱 버튼 */}
            <div className="footer__mobile-apps">
              <a href="#" className="footer__mobile-app-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>App Store</span>
              </a>
              <a href="#" className="footer__mobile-app-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M3.18 23.76c.3.17.64.22.97.15l13.2-7.62-2.82-2.82-11.35 10.29zm-1.8-20.7v17.88c0 .45.24.84.6 1.05l12.37-12.37L1.98 3.06a1.18 1.18 0 00-.6 1zM20.13 10.2l-2.49-1.44-3.18 3.18 3.18 3.18 2.52-1.46c.72-.42.72-1.44-.03-1.86v-.6zm-17.95-7.8l11.35 10.32 2.82-2.82L3.15 2.31c-.33-.06-.67-.01-.97.09z"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>

            {/* 모바일 SNS */}
            <div className="footer__mobile-sns">
              <a href="#" className="footer__sns-link" aria-label="TripAdvisor">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-3-8a3 3 0 116 0 3 3 0 01-6 0z"/>
                </svg>
              </a>
              <a href="#" className="footer__sns-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.47 12.35 12.35 0 00-7.64 0A4.83 4.83 0 014.41 6.69 11.94 11.94 0 003 12a11.94 11.94 0 001.41 5.31 4.83 4.83 0 003.77 2.47 12.35 12.35 0 007.64 0 4.83 4.83 0 003.77-2.47A11.94 11.94 0 0021 12a11.94 11.94 0 00-1.41-5.31zM10 15V9l5 3-5 3z"/>
                </svg>
              </a>
              <a href="#" className="footer__sns-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="footer__sns-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="footer__sns-link footer__sns-blog" aria-label="Blog">
                <span>blog</span>
              </a>
            </div>

          </div>
          {/* // 모바일 끝 */}

        </div>
      </div>

      {/* 브랜드 바 */}
      <div className="footer__brand-bar">
        <div className="footer__brand-inner">
          <a href="#" className="footer__brand-link">SIGNIEL</a>
          <a href="#" className="footer__brand-link">LOTTE HOTELS</a>
          <a href="#" className="footer__brand-link">L7 by LOTTE HOTELS</a>
          <a href="#" className="footer__brand-link">LOTTE CITY HOTELS</a>
          <a href="#" className="footer__brand-link">LOTTE RESORT</a>
          <a href="#" className="footer__brand-link">VL</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer