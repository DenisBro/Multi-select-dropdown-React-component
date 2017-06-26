import React from 'react';

class SelectedBlocks extends React.Component {

  render() {
    let blockInfo;
     if (this.props.selectedBlocks && this.props.selectedBlocks.length !== 0) {
      blockInfo = this.props.selectedBlocks.map((block) => {
       return ( <div className="selected_box" key={block.id}>
                  <span>
                    {block.text}
                  </span>
                  <i className="material-icons" onClick={() => this.props.removeElement(block.id)}>close</i>
                </div>
              );
        })
      }else if (!this.props.selectedBlocks || this.props.selectedBlocks.length === 0) {
        blockInfo = <span className="select_title">Select the products</span>;
      }

    return(
      <div className="sel_blocks_wrap">
      { blockInfo }
      </div>
    );
  }
}

export default SelectedBlocks;
