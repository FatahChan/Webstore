import React, {PureComponent} from 'react';
import "./AttributeDetails.css"
class AttributeDetailsComponent extends PureComponent {


  render() {
    const type = this.props.type
    const items =
        type === 'text'?
            this.props.items.map((item)=>(
              <div
                  key={item.id}
                  onClick={() => this.props.updateAttributes(this.props.name, item.value)}
                  className={`text-attribute ${item.value === this.props.selectedAttributes[this.props.name]? 'text-attribute-selected': ''}`}
              >
                {item.value}
              </div>
            )):
            this.props.items.map((item)=> (
              <div
                  key={item.id}
                  onClick={() => this.props.updateAttributes(this.props.name, item.value)}
                  className={"swatch-attribute-container " + (item.value === this.props.selectedAttributes[this.props.name]? 'swatch-attribute-selected': '')}
              >
                <div className="swatch-attribute" style={{backgroundColor: item.value}}></div>
              </div>
            ))
    return (
        <>
          <div className="label">{this.props.name}:</div>
          <div className="attribute">{items}</div>
        </>
    );
  }
}

export default AttributeDetailsComponent;