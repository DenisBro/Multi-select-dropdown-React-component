import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

  class UnitList extends React.Component {

    constructor(props) {
      super(props);

      // bind `this` to the methods
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
  }

  render() {

    const{ id, name, elemColor} = this.props.product;

    // retrieve all elements `id`
    let elemsID = [];
      if (this.props.selectedBlocks) {
        this.props.selectedBlocks.forEach( unit => {
          elemsID.push(Number(unit.id));
        });
      }

    // check if the element is selected for setting the `checked` attribute
    let pick = false;
    if (elemsID.length !== 0) {
      elemsID.forEach( elem => {
        if (elem === Number(id) || elemsID.indexOf(elem) === -1) {
            pick = true;
          }
      });
    }

    return(
        <ListGroupItem onClick={this.handleClick}
                        style={{background: elemColor}}
                        className="unitlist" >
          <input type="checkbox"
                 checked={pick}
                 id={`c${id}`}
                readOnly />
          <label htmlFor={`c${id}`}></label>
          { name }
      </ListGroupItem>

    );
  }
}
export default UnitList;
