import React, {PureComponent} from 'react';
import CartItemInfoComponent from "./CartItemInfo/CartItemInfo.Component";
import CartItemCounterComponent from "./CartItemCounter/CartItemCounter.Component";
import CartItemCarouselComponent from "./CartItemCarousel/CartItemCarousel.Component";
import "./CartItem.css"
class CartItemComponent extends PureComponent {
  updateAttributes(attribute, value) {
    let cart = this.props.getCart();
    const product = this.props.product;
    const attributes = JSON.stringify(this.props.attributes);
    for (let i = 0; i < cart.length; i++) {
      if(cart[i]['product'].id === product.id && JSON.stringify(cart[i]['attributes']) === attributes){
        console.log(cart[i]['attributes']);
        cart[i]['attributes'][attribute]=value;
        let j;
        for (j = 0; j < cart.length; j++) {
          if(j===i)continue;
          if(cart[j]['product'].id ===  cart[i]['product'].id && JSON.stringify(cart[j]['attributes']) === JSON.stringify(cart[i]['attributes'])){
            cart[i]['quantity'] += cart[j]['quantity']
            cart.splice(j, 1);
          }
        }
        this.props.setCart(cart);
        return;
      }
    }
  }
  updateQuantity(quantity) {
    let cart = this.props.getCart();
    const product = this.props.product;
    const attributes = JSON.stringify(this.props.attributes);
    for (let i = 0; i < cart.length; i++) {
      if(cart[i]['product'].id === product.id && JSON.stringify(cart[i]['attributes']) === attributes){
        if(quantity === 0){
          cart.splice(i, 1);
          this.props.setCart(cart);
        }else {
          cart[i]['quantity'] = quantity;
          this.props.setCart(cart);
        }
        return;
      }
    }
  }
  render() {
    return (
        <div className="cart-item">
          <CartItemInfoComponent
            product={this.props.product}
            attributes={this.props.attributes}
            getSelectedCurrency={this.props.getSelectedCurrency}
            updateAttributes={this.updateAttributes.bind(this)}
          />
          <div className="cart-counter-carousel">
          <CartItemCounterComponent
            quantity={this.props.quantity}
            updateQuantity={this.updateQuantity.bind(this)}

          />
          <CartItemCarouselComponent gallery={this.props.product.gallery}/>
          </div>
        </div>
    );
  }
}

export default CartItemComponent;