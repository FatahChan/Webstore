import React, {PureComponent} from 'react';
import './CurrencyDropdown.css'
import {getCurrencies} from "../../../BackendCalls/getCurrencies";
import {arrowDown} from "../../../Assets/arrowDown";
import {arrowUp} from "../../../Assets/arrowUp";
class CurrencyDropdownComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showCurrencyDropdown: '',
      currencies: [],
      isLoading: true
    }
  }
  componentDidMount() {
    window.addEventListener('click', (e) => {
      if(!e.target.matches('.currency-dropdown-button') && this.state['showCurrencyDropdown'] === 'show') {
        this.setState({showCurrencyDropdown: ''})
      }
    })
    getCurrencies().then((res) => { this.setState({currencies: res, isLoading: false}) })
  }
  render() {
    if(this.state['isLoading']) { return <div>Loading...</div> }
    return (
        <div className="currency-dropdown">
          <div
              onClick={()=> {this.setState({showCurrencyDropdown: 'show'})}}
              className="currency-dropdown-button"
          >
            {this.props.getSelectedCurrency().symbol}
            {this.state['showCurrencyDropdown'] === 'show' ? arrowUp : arrowDown}
          </div>
          <div className={`dropdown-content ${this.state['showCurrencyDropdown']}`}>
            {this.state['currencies'].map((currency) =>
                ( <div
                    key={currency.label}
                    onClick={() => {this.props.setSelectedCurrency(JSON.parse(JSON.stringify(currency)));}}
                    className="currency-option"
                >
                  {currency.symbol} {currency.label}
                </div> ))}

          </div>
        </div>
    );
  }
}

export default CurrencyDropdownComponent;