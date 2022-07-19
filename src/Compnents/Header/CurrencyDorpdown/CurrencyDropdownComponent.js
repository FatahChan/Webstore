import React, {Component} from 'react';
import {arrowUp} from "../../../Assets/arrowUp";
import {arrowDown} from "../../../Assets/arrowDown";
import "./CurrencyDropdown.css"
class CurrencyDropdownComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isListOpen: false,
      selectedCurrencySymbol: ''
    }
  }

  componentDidMount() {
    const selectedCurrencySymbol= this.props.selectedCurrency.symbol;
    this.setState({selectedCurrencySymbol: selectedCurrencySymbol, isLoading: false})
  }

  toggleList() {
    console.log('toggleList')
    this.setState({isListOpen: !this.state.isListOpen})
  }
  selectCurrency(currency){
    this.setState({selectedCurrencySymbol: currency.symbol, isListOpen: false}, () => this.props.setSelectedCurrency(currency))
  }

  render() {
    if(this.state['isLoading']) { return <div>Loading...</div> }
    return (
        <div className="currencies-drop-down">
          <div className="currency-drop-down-button" onClick={this.toggleList.bind(this)} >
            <div className="selected-currency">
              {this.state.selectedCurrencySymbol}
            </div>
            <div className="arrow">
              {this.state.isListOpen? arrowUp: arrowDown}
            </div>
          </div>
            {this.state.isListOpen && (
                <div className="currencies-list">
                  {this.props.currencies.map((currency) => (
                    <div className='currency-option' key={currency.symbol} onClick={() => this.selectCurrency(currency)}>
                      {currency.symbol} {currency.label}
                    </div>
                  ))}
                </div>
            )}
        </div>
    );
  }
}

export default CurrencyDropdownComponent;