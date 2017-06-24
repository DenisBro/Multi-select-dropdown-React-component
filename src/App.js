import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Glyphicon, ListGroup } from 'react-bootstrap';
import {connect} from 'react-redux';

import SelectedBlocks from './components/SelectedBlocks';
import UnitList from './components/UnitList';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trigger: false

    }

    this.selectElement = this.selectElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.changeState   = this.changeState.bind(this);
  }

  changeState(data) {
    this.setState(data);
  }

  removeElement(data) {
    console.log(data)
    this.setState({elemID: data});
    this.props.dispatch({type: 'DELETE', elemID: data});
  }

  /**
   * Send the data of selected element to reducer
   * @param  {object} data
   */
  selectElement(data) {
    this.props.dispatch({type: 'SELECT', item: {id: data.id, name: data.name}});
  }

  render() {
    // console.log(this.props);
    return (
      <Grid>
        <Row>
          <Col className="column">
            <Panel>
              <SelectedBlocks blockParams={this.props.selectedBlocks}
                              removeElement={this.removeElement}/>

              <Glyphicon className="chevron1" glyph="menu-up"/>
            </Panel>

          </Col>
        </Row>
        <Row>
          <Col className="column">
            <ListGroup fill>
              {this.props.products.map((product) => {
                  return ( <UnitList key={product.id}
                                     product={product}
                                     selectElement={this.selectElement}
                                     isChecked={this.state.isChecked}
                                     selectedBlocks={this.props.selectedBlocks}/>
                          );
              })
            }
            </ListGroup>
          </Col>
        </Row>

      </Grid>
    );
  }
}

export default connect(
  state => ({
    products: state.products.unitText,
    selectedBlocks: state.products.selection,
  }),
)(App);
