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
      trigger: false,

    }
    this.selectElement = this.selectElement.bind(this);
  }

  /**
   * Send the data of selected element to reducer
   * @param  {object} data
   */
  selectElement(data) {
    console.log(data)
    this.props.dispatch({type: 'SELECT', item: {id: data.id, name: data.text}});
  }

  render() {
    // console.log(this.props);
    return (
      <Grid>
        <Row>
          <Col className="column">
            <Panel>
              <SelectedBlocks />
              <Glyphicon className="chevron1" glyph="chevron-up"/>
            </Panel>

          </Col>
        </Row>
        <Row>
          <Col className="column">
            <ListGroup fill>
              {this.props.unitText.map((unitText) => {
                  return ( <UnitList key={unitText.id}
                                     unitText={unitText}
                                     selectElement={this.selectElement} />
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
    unitText: state.elements.unitText,
  }),
)(App);
