import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import HeaderComponent from "./Compnents/Header/Header.Component";
import ProductListingPageComponent from "./Compnents/PLP/PLP.Component";
import ProductDetailsPageComponent from "./Compnents/PDP/ProductDetailsPage.Component";
import CartComponent from "./Compnents/Cart/Cart.Component";
import "./App.css"
import {getCategories} from "./BackendCalls/getCategories";
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      selectedCurrency: {label: "USD", symbol: "$"},
      categories: []
    }
  }
  componentDidMount() {
    getCategories().then((res) => {
      this.setState({categories: res})
    })
    if(sessionStorage.getItem("cart")){
      this.setState({cart: JSON.parse(sessionStorage.getItem("cart"))})
    }
  }

  setCart(cart){
    console.log("setCart", cart);
    this.setState({cart: cart});
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
  getCart() {
    return JSON.parse(JSON.stringify(this.state.cart));
  }
  getSelectedCurrency() {
    return this.state.selectedCurrency;
  }
  setSelectedCurrency(currencyLabel){
    this.setState({selectedCurrency: currencyLabel})
  }
  render() {
    return (
        <div>
          <BrowserRouter>
            <HeaderComponent
                key={JSON.stringify({ selectedCurrency: this.state.selectedCurrency})}
                setSelectedCurrency={this.setSelectedCurrency.bind(this)}
                getSelectedCurrency={this.getSelectedCurrency.bind(this)}
                setCart={this.setCart.bind(this)}
                getCart={this.getCart.bind(this)}
            />
            <Switch>
              <Route exact path="/" >
                <Redirect to={`/default`}/>
              </Route>
              <Route path="/product/:id" render={(props) => (
                  <ProductDetailsPageComponent
                      key={JSON.stringify({id: props.match.params.id, currency: this.state.selectedCurrency})}
                      setCart={this.setCart.bind(this)}
                      getCart={this.getCart.bind(this)}
                      getSelectedCurrency={this.getSelectedCurrency.bind(this)}/>
                 )}
              />
              <Route exact path="/cart" render={() => (
                 <CartComponent
                     key={JSON.stringify({cart: this.state.cart, currency: this.state.selectedCurrency})}
                     setCart={this.setCart.bind(this)}
                     getCart={this.getCart.bind(this)}
                     getSelectedCurrency={this.getSelectedCurrency.bind(this)}/>
                  )}
                />)
              }
              />
              <Route exact path="/:category" render={(props) => (
                <ProductListingPageComponent
                  key={JSON.stringify({id: props.match.params.category, currency: this.state.selectedCurrency})}

                  setSelectedCurrency={this.setSelectedCurrency.bind(this)}
                  getSelectedCurrency={this.getSelectedCurrency.bind(this)}
                  setCart={this.setCart.bind(this)}
                  getCart={this.getCart.bind(this)}
                />)}
              />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;