import React, {PureComponent} from 'react';
import "./CartItemAttributeDetails.css"
class CartItemAttributeDetailsComponent extends PureComponent {



  render() {
    const {name, type, items} = this.props.attribute;
    const selected = this.props.attributes[name];
    let attributeOptions;
    if (type === 'text') {
      attributeOptions = items.map((item)=>(
              <div
                  key={item.id}
                  onClick={() => this.props.updateAttributes(name, item.value)}
                  id={JSON.stringify({attribute: name, value: item.value})}
                  className={`cart-text-attribute ${item.value === selected? 'cart-text-attribute-selected': ''}`}
              >
                {item.value}
              </div>
            ))
    }else if(type === 'swatch') {
      attributeOptions =items.map((item) => (
          <div
              key={item.id}
              onClick={() => this.props.updateAttributes(name, item.value)}
              className={"cart-swatch-attribute-container " + (item.value === selected ? 'cart-swatch-attribute-selected' : '')}
          >
            <div className="cart-swatch-attribute" style={{backgroundColor: item.value}}></div>
          </div>
      ))
    }
    return (
        <>
          <div className="cart-label">{name}:</div>
          <div className="cart-attribute">{attributeOptions}</div>
        </>
    );
  }
}

export default CartItemAttributeDetailsComponent;