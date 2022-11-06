import React, {PureComponent} from 'react';
import "./CartItemCounter.css"
class CartItemCounterComponent extends PureComponent {
  render() {
    return (

        <div className="cart-item-counter">
          <div onClick={() => this.props.updateQuantity(this.props.quantity + 1)} className="cart-item-increment"> &#43;</div>
          <div>{this.props.quantity}</div>
          <div onClick={() => this.props.updateQuantity(this.props.quantity - 1)} className="cart-item-decrement"> &minus;</div>
        </div>

    );
  }
}

export default CartItemCounterComponent;