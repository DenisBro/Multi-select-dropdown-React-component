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
      focusID: 0
    }

    // bind `this` to the methods
    this.removeElement = this.removeElement.bind(this);
    this.selectElement = this.selectElement.bind(this);
    this.showList      = this.showList.bind(this);
    this.keyHandle     = this.keyHandle.bind(this);
    this.changeState   = this.changeState.bind(this);

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
  showList(e) {
    this.setState({trigger: !this.state.trigger});
    //set the focus when the dropdown is opened
    e.currentTarget.parentElement.focus();
  }

  /**
   * Handle the keyboard events
   * @param  {object} e [the event object]
   */
  keyHandle(e) {

    if (this.state.trigger) {

      const prodLength = this.props.products.length;
      let allProductId = [];
      this.props.products.forEach(unit => {
        allProductId.push(unit.id);
      });

         // set the `background-color` on element when the down arrow is pressed
         if (e.keyCode === 40 && this.props.products) {
           if (prodLength !== 0) {
            if (this.state.focusID !== 0) {
             const focId = this.state.focusID;
             let nextId = allProductId.findIndex(unit => unit === focId) + 1;
             nextId = allProductId[nextId];
             if (nextId) {
               this.setState({focusID: nextId});
             }else {
                this.setState({focusID: this.props.products[0].id});
             }
           }else {
             const focId = this.props.products[0].id;
             this.setState({focusID: focId});
            }
           }
         }

         // set the `background-color` on element when the up arrow is pressed
         if (e.keyCode === 38 && this.props.products) {
           if (prodLength !== 0) {
            if (this.state.focusID !== 0) {
             const focId = this.state.focusID;
             let nextId = allProductId.findIndex(unit => unit === focId) - 1;
             nextId = allProductId[nextId];
             if (nextId) {
               this.setState({focusID: nextId});
             }else {
                this.setState({focusID: this.props.products[prodLength-1].id});
             }
           }else {
             const focId = this.props.products[prodLength-1].id;
             this.setState({focusID: focId});
            }
           }
         }

         //handle space bar
         if (e.keyCode === 32 && this.props.products) {
           this.props.dispatch({type: 'KEY_ADD_CHECKED', elemid: this.state.focusID});
         }

    }
  }

  /**
   * Changes the state
   * @param  {number} id
   */
  changeState(id) {
    this.setState({focusID: id});
  }

  render() {
    const visibileState = this.state.trigger ? "visible" : "hidden";
    const unvisibileState = !this.state.trigger ? "visible" : "hidden";
    return (
      <Grid>
        <div className="main_wrap" >
          <div className="cell_wrap" >
          <Row>
            <Col className="column">
              <Panel className="sel_blocks" tabIndex="0" onKeyDown={this.keyHandle} >
                <SelectedBlocks selectedBlocks={this.props.selectedBlocks}
                                removeElement={this.removeElement} />

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
                                       selectedBlocks={this.props.selectedBlocks}
                                       active={this.state.focusID}
                                       keyHandle={this.keyHandle}
                                       changeState={this.changeState}/>
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
