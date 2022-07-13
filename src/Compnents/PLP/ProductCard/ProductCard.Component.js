import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import {addToCart} from "../../../Assets/addToCart";
import {getProduct} from "../../../BackendCalls/getProduct";
import "./ProductCard.css"
class ProductCardComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: {},
      attributes: {},
      price: "USD"
    }
  }
  componentDidMount() {
    getProduct(this.props.id).then((res) => {
      let prices = res['product'].prices.slice()
      prices = prices.filter((price)=> {
        return price.currency.label === this.props.getSelectedCurrency().label
      })
      const price = prices[0];
      this.setState({
        product: res['product'],
        attributes: res['attributes'],
        price: price,
        isLoading: false
      })
    })
  }
  _addToCart(){
    let cart = this.props.getCart();
    const product = JSON.stringify(this.state['product']);
    const attributes = JSON.stringify(this.state['attributes']);
    for (let i = 0; i < cart.length; i++) {
      if(JSON.stringify(cart[i]['product']) === product && JSON.stringify(cart[i]['attributes']) === attributes){
        cart[i]['quantity'] += 1;
        this.props.setCart(cart);
        return;
      }
    }
    cart.push({ product: this.state['product'], attributes: this.state['attributes'], quantity: 1 });
    this.props.setCart(cart);
  }
  render(){
    if (this.state['isLoading']) { return <div></div> }
    if(this.state['product']['inStock'] === false){
      console.log("out of stock", this.state['product']['name'])
    }
    return (
        <div className="product-card" key={this.props.id}>
          <Link style={{textDecoration: 'none', "color": "black"}} to={`/product/${this.props.id}`}>
            <div className="card">
              <img className={this.state['product']['inStock']? '':'out-of-stock'} alt={this.state['product'].name} src={this.state['product'].gallery[0]}/>
              <div className={`out-of-stock-label ${this.state['product']['inStock']? '':'show-out-of-stock'}`}>OUT OF STOCK</div>
              <></>
              <div className="card-text">
                <div className="brand-name-card">{this.state['product'].brand} {this.state['product'].name}</div>
                <div className="price-card">
                  {this.state['price'].currency.symbol}{this.state['price'].amount}
                </div>
              </div>
            </div>
          </Link>
          <div onClick={this._addToCart.bind(this)} className={`card-add-button ${this.state['product']['inStock']? '': 'out-of-stock-button'}`}>
            <div className="cart-icon">{addToCart}</div>
          </div>
        </div>
    );
  }
}

export default ProductCardComponent;