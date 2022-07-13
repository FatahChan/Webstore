import React, {PureComponent} from 'react';
import ProductCardComponent from "./ProductCard/ProductCard.Component";
import {getCategory} from "../../BackendCalls/getCategory";
import {Redirect, withRouter} from "react-router-dom";
import "./PLP.css"
import {getCategories} from "../../BackendCalls/getCategories";
class ProductListingPageComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      products: [],
      category: "",
      redirect: false

    }
  }
  componentDidMount() {
    this.setup().then(() => {
      console.log("setup done")
    });
  }
  async setup() {
    if (this.props['match']['params']['category'] === "default") {
      let categories = await getCategories();
      this.setState({category: categories[0], redirect: true});
    }else{
      let res = await getCategory(this.props['match']['params']['category']);
      this.setState({products: res, category: this.props['match']['params']['category'], isLoading: false})
    }
  }
  render() {
    if (this.state.redirect) {return <Redirect to={`/${this.state.category}`}/>}
    if (this.state['isLoading']) { return <div>Loading...</div> }
    const ProductCards = this.state['products'].map((product) => (
        <ProductCardComponent
            key={JSON.stringify(product)}
            id={product.id}
            name={product.name}
            brand={product.brand}
            prices={product.prices}
            gallery={product.gallery}
            getCart={this.props.getCart}
            setCart={this.props.setCart}
            getSelectedCurrency={this.props.getSelectedCurrency}
        />
    ))
    return (
        <div>
          <div className="product-list-category-name">{this.state.category}</div>
          <div className="product-list" key={this.state.category}>
            {ProductCards}
          </div>
        </div>
    );
  }
}

export default withRouter( ProductListingPageComponent);