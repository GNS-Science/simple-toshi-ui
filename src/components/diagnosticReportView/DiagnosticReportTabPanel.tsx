import React from 'react';

interface DiagnosticReportTabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const DiagnosticReportTabPanel: React.FC<DiagnosticReportTabPanelProps> = ({
  children,
  value,
  index,
}: DiagnosticReportTabPanelProps) => {
  return (
    <div role="tabpenel" id={`simple-tabpanel-${index}`} hidden={value !== index}>
      {children}
    </div>
  );
};

export default DiagnosticReportTabPanel;
