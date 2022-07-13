import React, {PureComponent} from 'react';
import CartItemAttributeDetailsComponent from "./AttributesDetails/CartItemAttributeDetails.Component";
import "./CartItemInfo.css"
class CartItemInfoComponent extends PureComponent {


  render() {
    const price = this.props.product.prices.find((price) => price.currency.label === this.props.getSelectedCurrency().label);
    return (
        <div className="cart-item-info">
          <div className='cart-brand-label'>{this.props.product.brand}</div>
          <div className='cart-name-label'>{this.props.product.name}</div>

          <div className="cart-attributes">
            <div className="cart-label">Price:</div>
            <div className="cart-price">{price.currency.symbol}{price.amount}</div>
            {
              this.props.product.attributes.map((attribute) => (
                  <CartItemAttributeDetailsComponent
                      key={JSON.stringify({attribute: attribute.name, value: this.props.attributes[attribute.name]})}
                      attribute={attribute}
                      attributes={this.props.attributes}
                      updateAttributes={this.props.updateAttributes}
                  />))
            }
          </div>
        </div>
    );
  }
}

export default CartItemInfoComponent;