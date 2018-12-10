/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const XLSX = require('xlsx');

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
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
      const originGrid = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // this.setState({ grid: originGrid });
      const grid = originGrid.map(list => list.map(i => ({ value: i })));
      console.log(grid);
      this.setState({ grid });
    };
    req.send();
  }

  render() {
    // return <div>test</div>;
    const { grid } = this.state;
    console.log(grid);
    return (
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.value}
        // onCellsChanged={(changes) => {
        //   const g = grid.map(row => [...row]);
        //   changes.forEach(({
        //     // eslint-disable-next-line no-unused-vars
        //     cell,
        //     row,
        //     col,
        //     value,
        //   }) => {
        //     g[row][col] = { ...g[row][col], value };
        //   });
        //   this.setState({ grid: g });
        // }}
        onCellsChanged={() => {}}
      />
    );
  }
}

Sheet.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Sheet;
