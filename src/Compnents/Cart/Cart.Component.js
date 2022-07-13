import React, {Component} from 'react';
import CartItemComponent from "./CartItem/CartItem.Component";
import  "./Cart.css"
class CartComponent extends Component {
  round(value) {
    return Math.round(value * 100) / 100

  }
  render() {
    let cartCount = 0;
    let total = 0
    this.props.getCart().forEach((item) => {
      cartCount += item.quantity
      total += item.product.prices.find((price)=> price.currency.label === this.props.getSelectedCurrency().label).amount * item.quantity
    })
    total= this.round(total)
    return (
        <div className="cart-page">
          <div className="cart-page-label">CART</div>
          <div className="cart-items">
              {this.props.getCart().map((cartItem) => (
              <CartItemComponent
                  key={JSON.stringify({product: cartItem.product, attributes: cartItem.attributes})}
                  getSelectedCurrency={this.props.getSelectedCurrency}
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                  attributes={cartItem.attributes}
                  setCart={this.props.setCart}
                  getCart={this.props.getCart}
              />))}
          </div>
          <div className="check-out-total-div">
            <div className="check-quantity">
              <div className="check-quantity-label">Quantity:</div>
              <div className="check-quantity-value">{cartCount}</div>
            </div>
            <div className="check-total">
              <div className="check-total-label">Total:</div>
              <div className="check-total-value">{this.props.getSelectedCurrency().symbol}{total}</div>
            </div>
            <div className="check-out-button-label">Check Out</div>
          </div>
        </div>
    );
  }
}

export default CartComponent;