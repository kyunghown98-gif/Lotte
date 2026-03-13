import React from 'react'

const Category = ({tabs, activeTab,handleTabChange}) => {
  return (
    <div className='btn'>
      {
        tabs.map(tab=>(
            <button
            key={tab}
            type='button'
            className={`chip ${activeTab === tab ? 'on' : ''}`}
            onClick={()=>handleTabChange(tab)}
            >
                {tab}
            </button>
        ))
      }
    </div>
  )
}

export default Category
