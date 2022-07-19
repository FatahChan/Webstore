import React, {PureComponent} from 'react';
import {getCategories} from "../../BackendCalls/getCategories";
import {getCurrencies} from "../../BackendCalls/getCurrencies";
import {logo} from "../../Assets/logo";
import './Header.css'
import {Link, withRouter} from "react-router-dom";
import CartModalComponent from "./CartModal/CartModal.Component";
import CurrencyDropdownComponent from "./CurrencyDorpdown/CurrencyDropdownComponent";

class HeaderComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      showCurrencyDropdown: false,
      isLoading: true,
      selectedCategory: "",
      selectedCurrency: ""
    }
  }
  componentDidMount() {
    this.setupHeader().then(() => {
      const selectedCurrency= this.props.getSelectedCurrency()
      this.setState({selectedCurrency: selectedCurrency, isLoading: false})
    })

  }


  async setupHeader() {
    await getCategories().then((res) => {
      this.setState({categories: res})
    })
    await getCurrencies().then((res) => {
      this.setState({currencies: res})
    })
    this.setState({selectedCategory: this.props.location.pathname.split('/')[1]})
  }



  render() {
    if(this.state['isLoading']) { return <div>Loading...</div> }
    return (
        <div className="header">
          <div className="left-header">
          {this.state['categories'].map((category) => (
              <Link key={category} to={`/${category}`}>
                <div key={category} onClick={() => {this.setState({selectedCategory: category})}} className={`category-selector-header ${this.state['selectedCategory']===category? 'category-selected': ''}`}>
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
                  currencies={this.state['currencies']}
                  getSelectedCurrency={this.props.getSelectedCurrency}
                  setSelectedCurrency={this.props.setSelectedCurrency}
                  selectedCurrency={this.state.selectedCurrency}
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

export default withRouter(HeaderComponent);