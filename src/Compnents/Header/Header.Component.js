import React, {PureComponent} from 'react';
import {getCategories} from "../../BackendCalls/getCategories";
import {getCurrencies} from "../../BackendCalls/getCurrencies";
import {logo} from "../../Assets/logo";
import './Header.css'
import {Link} from "react-router-dom";
import CurrencyDropdownComponent from "./CurrencyDorpdown/CurrencyDropdown.Component";
import CartModalComponent from "./CartModal/CartModal.Component";
class HeaderComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      showCurrencyDropdown: false,
      isLoading: true,
      selectedCategory: ""
    }
  }
  componentDidMount() {
    this.setupHeader().then(() => {
      this.setState({isLoading: false})
    })
  }


  async setupHeader() {
    await getCategories().then((res) => {
      this.setState({categories: res})
    })
    await getCurrencies().then((res) => {
      this.setState({currencies: res})
    })
  }


  render() {
    if(this.state['isLoading']) { return <div>Loading...</div> }

    return (
        <div className="header">
          <div className="left-header">
          {this.state['categories'].map((category) => (
              <Link key={category} style={{textDecoration: 'none'}} to={`/${category}`}>
                <div key={category} className={`category-selector-header ${this.state['selectedCategory']===category? 'category-selected': ''}`}>
                  {category}
                </div>
              </Link>
          ))}
          </div>
          <div className="middle-header">
            <div className="logo">{logo}</div>
          </div>
          <div className="right-header">
              <CurrencyDropdownComponent
                getSelectedCurrency={this.props.getSelectedCurrency}
                setSelectedCurrency={this.props.setSelectedCurrency}
              />
              <CartModalComponent
                  getSelectedCurrency={this.props.getSelectedCurrency}
                  getCart={this.props.getCart}
                  setCart={this.props.setCart}
              />
          </div>
        </div>
    )
  }
}

export default HeaderComponent;