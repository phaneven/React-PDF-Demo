import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from './Viewer';
import Toolbar from './Toolbar';
import './style/index.less';

const pdfjsLib = require('pdfjs-dist/webpack');

class PDFViewer extends Component {
  componentDidMount() {
    const { url } = this.props;
    const loadingTask = pdfjsLib.getDocument({
      url,
      cMapPacked: true,
      withCredentials: true,
    });
    loadingTask.promise.then((doc) => {
      // eslint-disable-next-line no-console
      console.log(`Document ${url} loaded ${doc.numPages} page(s)`);
      this.viewer.setState({
        doc,
      });
    }, (reason) => {
      // eslint-disable-next-line no-console
      console.error(`Error during ${url} loading: ${reason}`);
    });
  }

  // eslint-disable-next-line no-unused-vars
  zoomIn(_e) {
    this.viewer.setState({
      scale: this.viewer.state.scale * 1.1,
    });
  }

  // eslint-disable-next-line no-unused-vars
  zoomOut(_e) {
    this.viewer.setState({
      scale: this.viewer.state.scale / 1.1,
    });
  }

  displayScaleChanged(e) {
    this.toolbar.setState({
      scale: e.scale,
    });
  }

  render() {
    const { fileName } = this.props;
    return (
      <div className="PDFViewer">
        <div className="PDFViewer-header">
          <span>{fileName}</span>
        </div>
        <Toolbar
          ref={(ref) => { this.toolbar = ref; }}
          onZoomIn={e => this.zoomIn(e)}
          onZoomOut={e => this.zoomOut(e)}
        />
        <div className="PDFViewer-body">
          <Viewer
            ref={(ref) => { this.viewer = ref; }}
            onScaleChanged={e => this.displayScaleChanged(e)}
          />
        </div>
      </div>
    );
  }
}

PDFViewer.propTypes = {
  url: PropTypes.string,
  fileName: PropTypes.string,
};

PDFViewer.defaultProps = {
  url: '',
  fileName: '',
};

export default PDFViewer;
