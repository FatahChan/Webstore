import React, {PureComponent} from 'react';
import AttributeDetailsComponent from "./AttributesDetails/AttributeDetails.Component";
import './ProductInfo.css'
import {Interweave} from "interweave";
class ProductInfoComponent extends PureComponent {
  render() {
    return (
        <div className='product-info'>
          <div className='brand-label'>{this.props.product.brand}</div>
          <div className='name-label'>{this.props.product.name}</div>
          <div className="attributes">
            {
              this.props.product.attributes.map((attribute) => (
              <AttributeDetailsComponent
                key={JSON.stringify({attribute: attribute.name, selected: this.props.selectedAttributes[attribute.name]})}
                type={attribute.type}
                items={attribute.items}
                name={attribute.name}
                selectedAttributes={this.props.selectedAttributes}
                updateAttributes={this.props.updateAttributes}
              />))
            }
          </div>
          <div className="label">Price:</div>
          <div className="price">{this.props.price.currency.symbol}{this.props.price.amount}</div>
          <div onClick={this.props['product']['inStock']? this.props.addToCart: ()=>{}} className={`add-to-cart ${this.props['product']['inStock']? '':'out-of-stock-button'}`}>ADD TO CART</div>
          <div className="description ">
            <Interweave content={this.props.product.description}/>
          </div>
        </div>
    );
  }
}

export default ProductInfoComponent;