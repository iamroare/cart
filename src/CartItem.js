import React from 'react';

const CartItem =(props) => {
    


    
  // render () {
    const {price, title, qty}= props.product;
    const {
      product, 
      onIncreaseQuantity,
      onDecreaseQuantity, 
      onDeleteProduct
    }= props;
    // else we can directly access the property like this.state.price

    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image}  src={product.img}/>
        </div>
        <div className="right-block">
          <div style={ { fontSize: 25 } }>{title} </div>
          <div style={ { color: '#777' } }>Rs. {price} </div>
          <div style={ { color: '#777' } }>Qty: {qty} </div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img  
            // onClick={()=>this.props.onIncreaseQuantity(this.props.product)}
            onClick={()=>onIncreaseQuantity(product)}
            alt='increase'
             className='action-icons'
              src="https://cdn-icons-png.flaticon.com/512/149/149688.png"
              />
            <img  
              onClick={()=>onDecreaseQuantity(product)}
            // onClick={()=>this.props.onDecreaseQuantity(this.props.product)}
            alt='decrease' 
            className='action-icons' 
            src="https://cdn-icons-png.flaticon.com/512/181/181667.png"
            />
            <img  
            alt='delete' 
            className='action-icons' 
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            onClick={()=>onDeleteProduct(product.id)}
            />
          </div>
        </div>
      </div>
    );
  }
// }

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: '#ccc'
  }
}

export default CartItem;