import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ValidatedScaleInversionSolution } from '../../interfaces/generaltask';

interface ScaleDiagnosticReportCardProps {
  scaleInversionSolutions: ValidatedScaleInversionSolution[];
}

const ScaleDiagnosticReportCard: React.FC<ScaleDiagnosticReportCardProps> = ({
  scaleInversionSolutions,
}: ScaleDiagnosticReportCardProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  if (!scaleInversionSolutions[currentImage]) {
    return <Typography> There are no valid reports to show. </Typography>;
  }

  return (
    <>
      <Card>
        <CardContent>
          <h4>
            Scale Inversion Solution {scaleInversionSolutions[currentImage].scale_inversion_solution.id}
            &nbsp;&nbsp;&nbsp;
            <Link to={`/ScaleInversionSolution/${scaleInversionSolutions[currentImage].scale_inversion_solution.id}`}>
              [more]
            </Link>
          </h4>
        </CardContent>
      </Card>
    </>
  );
};

export default ScaleDiagnosticReportCard;
