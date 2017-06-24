import React from 'react';

class SelectedBlocks extends React.Component {

  render() {
    let blockInfo;
     if (this.props.blockParams) {
      blockInfo = this.props.blockParams.map((block) => {
       return ( <div className="selected_box" key={block.id}>
                  <span>
                    {block.text}
                  </span>
                  <i className="material-icons" onClick={() => this.props.removeElement(block.id)}>close</i>
                </div>
              );
        })
      }else {
        blockInfo = 'Select the products';
      }

    return(
      <div className="sel_blocks_wrap">
      { blockInfo }
      </div>
    );
  }
}

export default SelectedBlocks;
