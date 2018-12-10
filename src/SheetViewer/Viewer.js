/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

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
      const grid = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.setState({ data: grid, cols: makeCols(ws['!ref']) });
    };
    req.send();
  }

  render() {
    const { cols, data } = this.state;
    return (
      <div>
        <div className="table-responsive-sm">
          <table className="table table-striped">
            <thead>
              <tr>{cols.map(c => <th key={c.key}>{c.name}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  {cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Sheet.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Sheet;
