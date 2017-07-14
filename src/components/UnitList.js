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
    e.currentTarget.nextElementSibling.focus();
    this.props.changeState(0);
  }

  render() {
    const { id, name } = this.props.product;
    const focusID = this.props.active;

    // retrieve all elements `id`
    let elemsID = [];
      if (this.props.selectedBlocks) {
        this.props.selectedBlocks.forEach( unit => {
          elemsID.push(Number(unit.id));
        });
      }

    // check if the element is selected, for setting the `checked` attribute
    let pick = false;
    if (elemsID.length !== 0) {
      elemsID.forEach( elem => {
        if (elem === Number(id) || elemsID.indexOf(elem) === -1) {
            pick = true;
          }
      });
    }

    let bgColor = {};
    if (pick)  bgColor = {backgroundColor: '#f2fafd',
                          borderColor: '#c0dee9',
                          zIndex: 2};

    return(
        <ListGroupItem  style={bgColor}
                        className={"unitlist "+( focusID === id ? 'activeEl' : 'noactive')} >
        <div  className="unitlist_link" onClick={this.handleClick}>
          <input type="checkbox"
                 checked={pick}
                 id={`c${id}`}
                readOnly />
          <label htmlFor={`c${id}`}></label>
          <span>{ name }</span>
        </div>
        <div tabIndex='0' onKeyDown={this.props.keyHandle}></div>
      </ListGroupItem>

    );
  }
}
export default UnitList;
