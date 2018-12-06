import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PDFJSViewer = require('pdfjs-dist/web/pdf_viewer.js');


class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null,
      scale: window.innerWidth / window.innerHeight * 1.1,
    };
  }

  componentDidMount() {
    this.initEventBus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { doc, scale } = this.state;
    if (doc !== nextState.doc || scale !== nextState.scale) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    const { doc, scale } = this.state;
    if (doc !== nextState.doc) {
      this.pdfViewer.setDocument(nextState.doc);
    }
    if (scale !== nextState.scale) {
      this.pdfViewer.currentScale = nextState.scale;
    }
  }

  initEventBus() {
    const {
      onInit,
      onScaleChanged,
    } = this.props;
    const { scale } = this.state;

    const eventBus = new PDFJSViewer.EventBus();
    // eslint-disable-next-line no-unused-vars
    eventBus.on('pagesinit', (_e) => {
      this.pdfViewer.currentScaleValue = 'page-width';
      this.setState({
        scale: this.pdfViewer.currentScale,
      });
      if (onInit) {
        onInit({});
      }
      if (onScaleChanged) {
        onScaleChanged({ scale });
      }
    });
    eventBus.on('scalechange', (e) => {
      if (onScaleChanged) {
        onScaleChanged({ scale: e.scale });
      }
    });
    this.eventBus = eventBus;
    const viewerContainer = this.ref_element;
    this.pdfViewer = new PDFJSViewer.PDFViewer({
      container: viewerContainer,
      eventBus: this.eventBus,
      textLayerMode: 0,
      useOnlyCssZoom: true,
    });
  }

  render() {
    return (
      <div ref={(c) => { this.ref_element = c; }} className="Viewer">
        <div className="pdfViewer" />
      </div>
    );
  }
}

Viewer.propTypes = {
  onInit: PropTypes.func,
  onScaleChanged: PropTypes.func,
};

Viewer.defaultProps = {
  onInit: () => {},
  onScaleChanged: () => {},
};

export default Viewer;
