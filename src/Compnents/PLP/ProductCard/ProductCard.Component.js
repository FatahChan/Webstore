import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import {addToCart} from "../../../Assets/addToCart";
import "./ProductCard.css"
class ProductCardComponent extends PureComponent {

  _addToCart(){
    let cart = this.props.getCart();
    const product = this.props['product'];
    const attributes = JSON.stringify(this.props['defaultAttributes']);
    for (let i = 0; i < cart.length; i++) {
      if(cart[i]['product'].id === product.id && JSON.stringify(cart[i]['attributes']) === attributes){
        cart[i]['quantity'] += 1;
        this.props.setCart(cart);
        return;
      }
    }
    cart.push({ product: this.props['product'], attributes: this.props['defaultAttributes'], quantity: 1 });
    console.log('at add cart',cart);
    this.props.setCart(cart);
  }
  render(){
    const price = this.props['product']['prices'].find((price)=> { return price.currency.label === this.props.getSelectedCurrency().label; });
    return (
        <div className="product-card" key={this.props.product.id}>
          <Link to={`/product/${this.props.product.id}`}>
            <div className="card">
              <img className={this.props['product']['inStock']? '':'out-of-stock'} alt={this.props['product'].name} src={this.props['product'].gallery[0]}/>
              <div className={`out-of-stock-label ${this.props['product']['inStock']? '':'show-out-of-stock'}`}>OUT OF STOCK</div>
              <div className="card-text">
                <div className="brand-name-card">{this.props['product'].brand} {this.props['product'].name}</div>
                <div className="price-card">
                  {price.currency.symbol}{price.amount}
                </div>
              </div>
            </div>
          </Link>
          {this.props.product.inStock && <div onClick={this._addToCart.bind(this)} className={`card-add-button ${this.props['product']['inStock']? '': 'out-of-stock-button'}`}>
            <div className="cart-icon">{addToCart}</div>
          </div>}
        </div>
    );
  }
}

export default ProductCardComponent;