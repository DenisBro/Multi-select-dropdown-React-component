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

    // bind `this` to the methods
    this.selectElement = this.selectElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.showList = this.showList.bind(this);
  }


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

  showList() {
    this.setState({trigger: !this.state.trigger});
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col className="column">
            <Panel className="sel_blocks">
              <SelectedBlocks blockParams={this.props.selectedBlocks}
                              removeElement={this.removeElement}/>

              <Glyphicon className="chevron1"
                         glyph="menu-up"
                         onClick={this.showList}/>
            </Panel>

          </Col>
        </Row>
        <Row>
          <Col className="column">
            <ListGroup fill>
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
