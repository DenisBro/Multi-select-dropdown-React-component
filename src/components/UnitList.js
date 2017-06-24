import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

  class UnitList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isChecked: false,
      }

      this.handleClick = this.handleClick.bind(this);
   }

  /**
   * Handle the event
   * @param  {object} e
   */
  handleClick(e) {

    // send data for dispatching
    this.props.selectElement({
      id: this.props.product.id,
      name: this.props.product.name
    });

    // set the new state make checkbox checked
    this.setState({isChecked: !this.state.isChecked});

    // change the background-color of button
    !this.state.isChecked ? e.target.style.background = '#f2fafd' : e.target.style.background = '#fff';

  }

  render() {
    let elemsID = [];
      if (this.props.selectedBlocks) {
      this.props.selectedBlocks.forEach(unit => {
        elemsID.push(unit.id);
      });
    }

    const productID = this.props.product.id;
    let pickUp = false;
    let elemID;
    if (elemsID.length !== 0){
      elemsID.forEach(elem => {
        if (elem === Number(productID))
        pickUp = true;
      });
    }

    console.log(pickUp)
    return(
        <ListGroupItem onClick={this.handleClick}>
          <input type="checkbox"
                 checked={pickUp}
                 id={`c${productID}`} />
          <label htmlFor={`c${productID}`}></label>
          { this.props.product.name }
      </ListGroupItem>

    );
  }
}
export default UnitList;
