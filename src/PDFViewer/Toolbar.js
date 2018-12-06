import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { scale } = this.state;
    if (scale !== nextState.scale) {
      return true;
    }
    return false;
  }

  zoomIn(e) {
    const { onZoomIn } = this.props;
    if (onZoomIn) {
      onZoomIn(e);
    }
  }

  zoomOut(e) {
    const { onZoomOut } = this.props;
    if (onZoomOut) {
      onZoomOut(e);
    }
  }

  render() {
    // const { scale } = this.state;
    return (
      <div className="Toolbar">
        <div
          tabIndex={0}
          key="zoomout"
          role="button"
          className="ZoomBtn"
          onClick={(e) => { this.zoomOut(e); }}
          onKeyPress={() => {}}
        >
          -
        </div>
        <div
          tabIndex={-1}
          key="zoomin"
          role="button"
          className="ZoomBtn"
          onClick={(e) => { this.zoomIn(e); }}
          onKeyPress={() => {}}
        >
          +
        </div>
        {/* <div className="ZoomPercent">{(scale * 100).toFixed(1)}</div> */}
      </div>
    );
  }
}

Toolbar.propTypes = {
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
};

Toolbar.defaultProps = {
  onZoomIn: () => {},
  onZoomOut: () => {},
};

export default Toolbar;
