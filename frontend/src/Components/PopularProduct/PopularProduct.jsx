import React from 'react'
import './PopularProduct.scss'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const PopularProduct = () => {
  return (
    <div className='popularProduct'>
        <h1>POPULAR PRODUCT</h1>
        <div className="popular-item">
            {data_product.map((item, i)=> {
                return <Item
                key={i} id={item.id} name={item.name}
                image={item.image} new_price={item.new_price}
                old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default PopularProduct