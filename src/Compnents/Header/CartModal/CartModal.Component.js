import React, {Component} from 'react';
import {cart} from "../../../Assets/cart";
import "./CartModal.css"
import CartItemComponent from "../../Cart/CartItem/CartItem.Component";
import {withRouter} from "react-router-dom";

class CartModalComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showModal: '',
    }
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (e.target.matches(".dark-background")) this.setState({showModal: ''});
    })

    this.setState({
      isLoading: false,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.getCart().length === 0 && this.state.showModal === 'show') {
      this.setState({showModal: ''})
    }
  }

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
        <div className='cart-header'>
          <div
              className="cart-icon"
              onClick={() => {this.props.getCart().length > 0 && this.setState({showModal: 'show'})}}
          >{cart} {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</div>
          <div id="cart-modal" className={`modal-cart ${this.state.showModal}`}>
            <div className="dark-background"/>
          <div className="modal-cart-content">
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
              <div className="cart-modal-total">
                <div className="cart-modal-price-label">Total</div>
                <div
                    className="cart-modal-price"
                >{this.props.getSelectedCurrency().symbol}{total}</div>
              </div>
              <div className="cart-modal-buttons">
                <div onClick={()=>{this.props.history.push('/cart'); this.setState({showModal: ''})}} className="view-bag-button">View Bag</div>
                <div className="check-out-button">Check Out</div>
              </div>
          </div>
          </div>
        </div>
    );
  }
}

export default withRouter(CartModalComponent);