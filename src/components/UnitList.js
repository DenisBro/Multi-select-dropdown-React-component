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
    e.preventDefault();
    // send data for dispatchin
      this.props.selectElement({
        id: this.props.product.id,
        name: this.props.product.name
      });
  }

  render() {

    const{ id, name, elemColor, bordColor, zIndex} = this.props.product;

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
        <ListGroupItem style={{background: elemColor,
                                borderColor: bordColor,
                                zIndex: zIndex
                              }}
                        className="unitlist" >
        <div onClick={this.handleClick} className="unitlist_link">
          <input type="checkbox"
                 checked={pick}
                 id={`c${id}`}
                readOnly />
          <label htmlFor={`c${id}`}></label>
          <span>{ name }</span>
        </div>
      </ListGroupItem>

    );
  }
}
export default UnitList;
