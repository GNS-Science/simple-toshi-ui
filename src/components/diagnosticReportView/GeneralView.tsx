import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import buildUrl from 'build-url-ts';
import { diagnosticReportViewOptions } from '../../constants/diagnosticReport';
import { SolutionDiagnosticsOption } from '../../interfaces/generaltask';
import MultiSelect from '../common/MultiSelect';
import { Card } from '@mui/material';

const PREFIX = 'GeneralView';

const classes = {
  imageContainer: `${PREFIX}-imageContainer`,
  image: `${PREFIX}-image`,
  card: `${PREFIX}-card`,
};

const Root = styled('div')(() => ({
  [`& .${classes.imageContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: '30vh',
  },

  [`& .${classes.image}`]: {
    padding: '5px',
    maxHeight: '80vh',
    width: '100%',
    objectFit: 'contain',
  },
  [`& .${classes.card}`]: {
    padding: '5px',
    maxHeight: '80vh',
    width: '25%',
    objectFit: 'contain',
    flexGrow: 3,
    flexShrink: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface GeneralViewProps {
  id: string;
  generalViews: string[];
  setGeneralViews: (selection: string[]) => void;
}

const GeneralView: React.FC<GeneralViewProps> = ({ id, generalViews, setGeneralViews }: GeneralViewProps) => {
  const [generalViewSelections, setGeneralViewSelections] = useState<SolutionDiagnosticsOption[]>([
    diagnosticReportViewOptions[0],
  ]);

  useEffect(() => {
    const filtered = diagnosticReportViewOptions.filter((option) => {
      return generalViews.includes(option.displayName);
    });
    setGeneralViewSelections(filtered);
  }, [generalViews]);

  const reportUrl = (path: string, id: string) => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${path}`,
    });
  };

  const generalViewDisplayNames: string[] = [];

  diagnosticReportViewOptions.map((option) => {
    generalViewDisplayNames.push(option.displayName);
  });

  return (
    <Root>
      <MultiSelect
        name="Reports"
        selected={generalViews}
        options={generalViewDisplayNames}
        setOptions={setGeneralViews}
      />
      <div className={classes.imageContainer}>
        {generalViewSelections.map((option) => (
          <Card key={option.finalPath} className={classes.card} variant="outlined">
            <img
              key={option.finalPath}
              className={classes.image}
              src={reportUrl(option.finalPath, id)}
              alt={option.finalPath}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                let newUrl;

                switch (option.finalPath) {
                  case 'mfd_plot_Total_MFD.png':
                    newUrl = reportUrl('mfd_plot_Total_Target_MFDs.png', id);
                    break;
                  case 'mfd_plot_Total_MFD_cumulative.png':
                    newUrl = reportUrl('mfd_plot_Total_Target_MFDs.png', id);
                    break;
                  case 'rate_dist.png':
                    newUrl = reportUrl('mfd_plot_Total_Target_MFDs.png', id);
                    break;
                  default:
                    newUrl = '/img-placeholder.jpg';
                }

                if (e.currentTarget.src !== newUrl && e.currentTarget.src !== '/imgPlaceholder.jpeg') {
                  e.currentTarget.src = newUrl;
                } else if (e.currentTarget.src === newUrl && e.currentTarget.src !== '/imgPlaceholder.jpeg') {
                  e.currentTarget.src = '/img-placeholder.jpg';
                }
              }}
            />
          </Card>
        ))}
      </div>
    </Root>
  );
};

export default GeneralView;
