/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import './style/index.less';

const XLSX = require('xlsx');

const makeCols = (refstr) => {
  const o = [];
  const C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; i += 1) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cols: [],
      wb: null,
      sheetNames: [],
      selected: '',
    };
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    this.handleFile();
  }

  handleFile() {
    const { url } = this.props;
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onload = () => {
      const data = new Uint8Array(req.response);
      const wb = XLSX.read(data, { type: 'array', cellStyles: true });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const grid = XLSX.utils.sheet_to_json(ws, { header: 'A' });
      this.setState({
        data: grid,
        cols: makeCols(ws['!ref']),
        wb,
        sheetNames: wb.SheetNames,
        selected: wb.SheetNames[0],
      });
    };
    req.send();
  }

  selectSheet(wsname) {
    const { wb } = this.state;
    const ws = wb.Sheets[wsname];
    const grid = XLSX.utils.sheet_to_json(ws, { header: 'A' });
    this.setState({
      data: grid,
      cols: makeCols(ws['!ref']),
      selected: wsname,
    });
  }

  render() {
    const {
      cols,
      data,
      sheetNames,
      selected,
    } = this.state;
    const { url } = this.props;
    return (
      <div className="xlsx-container">
        <div className="xlsx-file">
          {url.replace('/public/', '')}
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                {cols.map(c => <th key={c.key}>{c.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                data.map(item => (
                  <tr key={item.__rowNum__}>
                    <td>{item.__rowNum__ + 1}</td>
                    {
                      cols.map(c => <td key={c.key}>{item[c.name]}</td>)
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="sheet-selector">
          {
            sheetNames.map(name => (
              <div
                role="button"
                tabIndex={0}
                className={name === selected ? 'sheet-name sheet-name-selected' : 'sheet-name'}
                key={name}
                onKeyPress={() => {}}
                onClick={() => {
                  this.selectSheet(name);
                }}
              >
                {name}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Sheet.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Sheet;
