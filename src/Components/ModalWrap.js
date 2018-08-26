import React from "react";
import { Modal, Button } from "semantic-ui-react";

class ModalWrap extends React.Component {
  state = {
    open: false
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open, dimmer } = this.state;
    return (
      <div>
        <Button
          content={this.props.contentDescription}
          icon={this.props.iconName}
          style={{ margin: "10px 0" }}
          labelPosition="left"
          onClick={this.show(true)}
        />
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
export default ModalWrap;
