import React from "react";
import { Modal, Button } from "semantic-ui-react";

class ModalWrap extends React.Component {
  render() {
    return (
      <div>
        <Button
          content={this.props.contentDescription}
          icon={this.props.iconName}
          style={{ margin: "10px 0" }}
          labelPosition="left"
          onClick={this.props.handleClick}
        />
        <Modal open={this.props.open} onClose={this.props.onClose}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
export default ModalWrap;
