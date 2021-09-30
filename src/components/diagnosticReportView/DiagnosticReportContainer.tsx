import React, { useState } from 'react';

import DiagnosticReportControls from './DiagnosticReportControls';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';
import DiagnosticReportCard from './DiagnosticReportCard';
import { ValidatedSubtask } from '../../interfaces/generaltask';

interface DiagnosticReportViewProps {
  automationTasks: ValidatedSubtask[];
}

const DiagnosticReportView: React.FC<DiagnosticReportViewProps> = ({ automationTasks }: DiagnosticReportViewProps) => {
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newValue = (event.target.value as string[]) || [];
    setViewOptions(newValue);
  };

  return (
    <>
      <DiagnosticReportControls setViewOption={handleChange} />
      <DiagnosticReportCard viewOptions={viewOptions} automationTasks={automationTasks} />
    </>
  );
};

export default DiagnosticReportView;
