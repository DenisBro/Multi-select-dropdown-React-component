import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Glyphicon, ListGroup } from 'react-bootstrap';
import {connect} from 'react-redux';

import SelectedBlocks from './SelectedBlocks';
import UnitList from './UnitList';

import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trigger: false,
      elemQueueD: 1,
      elemQueueU: 0,
    }

    // bind `this` to the methods
    this.selectElement = this.selectElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.showList = this.showList.bind(this);
    this.onKeypresshandler = this.onKeypresshandler.bind(this);


  }

  /**
   * Remove the element from selected
   * @param  {number} data [the id of selected element by mouse]
   */
  removeElement(data) {
    this.props.dispatch({type: 'DELETE', elemID: data});
  }

  /**
   * Send the data of selected element to reducer
   * @param  {object} data
   */
  selectElement(data) {
    this.props.dispatch({type: 'SELECT', item: {id: data.id, name: data.name}});
  }

  /**
   * Show or hide the products list
   */
  showList() {
    this.setState({trigger: !this.state.trigger});
  }

  /**
   * Handle the keyboard events
   * @param  {object} e [the event object]
   */
  onKeypresshandler(e) {
    e.stopPropagation();
    // check if the products list is showen
    if (this.state.trigger) {

      const prodLength = this.props.products.length;

      // set the `background-color` on element when the down arrow is pressed
      if (e.keyCode === 40 && this.props.products) {
        if (prodLength !== 0 && this.state.elemQueueD <= prodLength) {
          this.props.dispatch({type: "KEY_ADD_COLOR", elem: this.state.elemQueueD});

          //change the state props (the state holds elemnts id)
          this.setState({elemQueueD: this.state.elemQueueD + 1});
          this.setState({elemQueueU: this.state.elemQueueD - 2});
          if (this.state.elemQueueD > prodLength) {
            this.setState({elemQueueU: this.state.elemQueueD - 2});
            this.setState({elemQueueD: 1});
          }
        }
      }

      // set the `background-color` on element when the up arrow is pressed
      if (e.keyCode === 38 && this.props.products) {
        if (this.state.elemQueueU === 0) {
          this.setState({elemQueueU: prodLength});
        }
        if (prodLength !== 0 && this.state.elemQueueU <= prodLength) {
          this.props.dispatch({type: "KEY_ADD_COLOR", elem: this.state.elemQueueU});
          this.setState({elemQueueU: this.state.elemQueueU - 1});
          this.setState({elemQueueD: this.state.elemQueueU + 2});

        }
        if (this.state.elemQueueD > prodLength) {
          this.setState({elemQueueD: 1});
        }
      }
  }
      //handle space bar
      if (e.keyCode === 32 && this.props.products) {
        this.props.dispatch({type: 'KEY_ADD_CHECKED'});
      }

}

  render() {
    document.addEventListener("keydown", this.onKeypresshandler, false);
    const visibileState = this.state.trigger ? "visible" : "hidden";
    const unvisibileState = !this.state.trigger ? "visible" : "hidden";
    return (
      <Grid>
        <div className="main_wrap" >
          <div className="cell_wrap" >
          <Row>
            <Col className="column">
              <Panel className="sel_blocks">
                <SelectedBlocks selectedBlocks={this.props.selectedBlocks}
                                removeElement={this.removeElement}/>

                <Glyphicon className="chevron1"
                           glyph="menu-down"
                           onClick={this.showList}
                           style={{visibility: unvisibileState}} />
               <Glyphicon className="chevron1"
                          glyph="menu-up"
                          onClick={this.showList}
                          style={{visibility: visibileState}} />

              </Panel>
            </Col>
          </Row>
          <Row>
            <Col className="column">
              <ListGroup fill className="unitlist_group">
                {this.props.products.map((product) => {
                  if (this.state.trigger) {
                    return ( <UnitList key={product.id}
                                       product={product}
                                       selectElement={this.selectElement}
                                       isChecked={this.state.isChecked}
                                       selectedBlocks={this.props.selectedBlocks}/>
                            );
                  } else return null;
                })
              }
              </ListGroup>
            </Col>
          </Row>
        </div>
        </div>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    products: state.products.unitText,
    selectedBlocks: state.products.elSelected,
  }),
)(App);
