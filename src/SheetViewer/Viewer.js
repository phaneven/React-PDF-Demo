/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
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

  // eslint-disable-next-line class-methods-use-this
  handleFile() {
    const { url } = this.props;
    // url = '/public/file.xlsx';
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onload = () => {
      console.log(req.response);
      const data = new Uint8Array(req.response);
      const wb = XLSX.read(data, { type: 'array', cellStyles: true });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // const originGrid = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // const HTML = XLSX.utils.sheet_to_html(ws);
      // document.getElementById('root').innerHTML = HTML;
      const grid = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(grid);
      console.log(makeCols(ws['!ref']));
      this.setState({ data: grid, cols: makeCols(ws['!ref']) });
    };
    req.send();
  }

  render() {
    // return <div>test</div>;
    // const { grid } = this.state;
    // console.log(grid);
    const { cols, data } = this.state;
    return (
      <div>
        <div className="table-responsive">
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
