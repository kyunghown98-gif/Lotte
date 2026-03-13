import React from 'react'
import '../css/membership.css'

const member =[
    {
        id:1,
        title:"숙박",
        img:"../lotte/ico_info_room01.svg",
        text1:'포인트',
        text2:"최대 10% 적립"
    },
    {
        id:2,
        title:"다이닝",
        img:"../lotte/ico_info_dining02.svg",
        text1:'포인트',
        text2:'리워즈 포인트 적립,사용'
    },
    {
        id:3,
        title:"쇼핑",
        img:"../lotte/ico_info_shopping.svg",
        text1:'리워즈 포인트로',
        text2:'LOTTE DUTY FREE,e-SHOP',
    },
    {
        id:4,
        title:"제휴사 포인트 전환",
        img:"../lotte/ico_rewards_points.svg",
        text1:'리워즈 포인트를',
        text2:'L.POINT,Npay,CJ ONE'
    },
]

const Membership = () => {
  return (
    <div className='membership'>
      <div className="ms_i">
        <div className="title_h">
            <div className="title">
                <div className="top">
                    <h2>Membership Benefits</h2>
                    <span>멤버십 혜택</span>
                </div>
                <p>회원가입 즉시 포인트 적립과 회원전용 특전을 경험하세요.</p>
            </div>
            <div className="btn">
                <div className="btn_i">
                    <a href="#">
                        <p>더 많은 혜택 알아보기</p>
                        <span>
                        </span>
                    </a>
                    <a href="#">
                        <p>리워즈 가입하기</p>
                        <span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div className="contents">
            <ul>
               {
                member.map(item => (
                    <li key={item.id}>
                        <div className="box">
                            <div className="tit">
                                <img src={item.img} alt={item.name}/>
                                <p>{item.title}</p>
                            </div>
                            <div className="txt">
                                <p>{item.text1}</p>
                                <p>{item.text2}</p>
                            </div>
                        </div>
                    </li>
                ))
               }
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Membership
