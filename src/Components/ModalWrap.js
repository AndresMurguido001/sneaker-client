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
          content="List you shoe"
          icon="upload"
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
