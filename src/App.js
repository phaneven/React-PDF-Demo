import React from 'react';
import PDFViewer from './PDFViewer';
import ExcelViewer from './SheetViewer/Viewer';
import Aux from './hoc/Aux';

const App = () => {
  const check = 'excel';
  return (
    <Aux>
      {check === 'pdf' && <PDFViewer url="/public/BayesTheorem.pdf" />}
      {check === 'excel' && <ExcelViewer url="/public/file.xlsx" />}
    </Aux>
  );
};

export default App;
