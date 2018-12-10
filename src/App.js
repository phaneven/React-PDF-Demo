import React from 'react';
import PDFViewer from './PDFViewer';
import ExcelViewer from './SheetViewer/Viewer';

const App = () => {
  const check = 'excel';
  return (
    <div>
      {check === 'pdf' && <PDFViewer url="/public/BayesTheorem.pdf" />}
      {check === 'excel' && <ExcelViewer url="/public/file.xlsx" />}
    </div>
  );
};

export default App;
