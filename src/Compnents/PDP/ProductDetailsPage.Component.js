import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ProductCarouselComponent from "./ProductCarousel/ProductCarousel.Component";
import ProductInfoComponent from "./ProductInfo/ProductInfo.Component";
import {getProduct} from "../../BackendCalls/getProduct";
import "./ProductDetailsPage.css"
class ProductDetailsPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: {},
      attributes: {},
      price: {}
    }
  }
  componentDidMount() {
    getProduct(this.props['match']['params'].id).then((res) => {
      let prices = res['product']['prices'].slice()
      prices = prices.filter((price)=> {
        return price.currency.label === this.props.getSelectedCurrency().label;
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
  updateAttributes(attribute, value) {
    let attributes = JSON.parse(JSON.stringify(this.state.attributes));
    attributes[attribute] = value;
    this.setState({attributes: attributes});
  }
  render() {
    if (this.state['isLoading']) { return <div>Loading...</div> }
    return (
        <div className='product-details-page'>
          <ProductCarouselComponent
              gallery={this.state['product']['gallery']}
          />
          <ProductInfoComponent
              product={this.state['product']}
              price={this.state['price']}
              selectedAttributes={JSON.parse(JSON.stringify(this.state.attributes))}
              addToCart={this._addToCart.bind(this)}
              updateAttributes={this.updateAttributes.bind(this)}
          />
        </div>

    );
  }
}

export default withRouter(ProductDetailsPageComponent);