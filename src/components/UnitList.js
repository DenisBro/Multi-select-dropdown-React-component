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

    // set the new state make checkbox checked
    this.setState({isChecked: !this.state.isChecked});

    // change the background-color of button
    !this.state.isChecked ? e.target.style.background = '#f2fafd' : e.target.style.background = '#fff';

    // send data for dispatching
    this.props.selectElement({
      id: this.props.unitText.id,
      name: this.props.unitText.name
    });

  }

  render() {

    return(
        <ListGroupItem onClick={this.handleClick}>
          <input type="checkbox"
                 checked={this.state.isChecked}
                 id={`c${this.props.unitText.id}`} />
          <label htmlFor={`c${this.props.unitText.id}`}></label>
          { this.props.unitText.name }
      </ListGroupItem>

    );
  }
}
export default UnitList;
