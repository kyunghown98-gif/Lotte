import React, { useState } from 'react'
import PromotionDate from './PromotionDate.jsx'
import '../css/Promotion.css'

const Promotion = () => {

  const [activeCategory, setActiveCategory] = useState('객실')

  const categories = [...new Set(PromotionDate.map(item => item.category))]

  const leftItem = PromotionDate.find(item => item.category === activeCategory)

  const rightItems = PromotionDate.filter(
    item => item.category === activeCategory && item.id !== leftItem?.id
  )

  return (
    <div className='promotion'>
      <div className="promotion_i">

        <div className="top">
          <div className="title">
            <h2>Promotion & Packages</h2>
            <p>프로모션 & 패키지</p>
          </div>
          <div className="btn">
            <div className="category">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`cat_btn ${cat === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="show_all">
              <span>전체 보기</span>
              <button className="show_all_btn">
                <img src="./lotte/right_arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="left">
            {leftItem && (
              <div className="left_i">
                <img src={leftItem.img} alt={leftItem.title} />
                <p>{leftItem.title}</p>
              </div>
            )}
          </div>

          <div className="right">
            {rightItems.map(item => (
              <div className="right_card" key={item.id}>
                <div className="right_img">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="title">

                <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Promotion