import React from "react";

class ButtonLogic extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  init = () => {
  }

  pressFunc = next => {
    this.props.onPressEvent(next, this.props.params);
  };
}
export default ButtonLogic;
