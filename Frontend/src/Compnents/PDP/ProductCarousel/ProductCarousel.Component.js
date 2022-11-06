import React, {PureComponent} from 'react';
import  "./ProductCarousel.css"
class ProductCarouselComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }
  updateIndex(e){
    this.setState({
      index: parseInt(e.target.getAttribute('id'))
    })
  }
  render() {
    const column = this.props.gallery.map((url, i) =>(
      <img
          id={i}
          src={url}
          key={url}
          alt={`#${i}`}
          onClick={this.updateIndex.bind(this)}
          className={this.state['index'] === i? 'selected-img': ''}/>
    ))
    return (
        <div className='carousel'>
          <div className='carousel-column'>{column}</div>
          <div className='carousel-display'><img src={this.props.gallery[this.state['index']]} alt={`big #${this.state['index']}`}/></div>
        </div>
    );
  }
}

export default ProductCarouselComponent;