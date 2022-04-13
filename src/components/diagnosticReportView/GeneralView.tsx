import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { diagnosticReportViewOptions } from '../../constants/diagnosticReport';
import { SolutionDiagnosticsOption } from '../../interfaces/generaltask';
import MultiSelect from '../common/MultiSelect';
import GeneralViewMfdDynamicDialog from './GeneralViewMfdDynamicDialog';
import GeneralViewMfdStaticDialog from './GeneralViewMfdStaticDialog';
import { MetaArguments } from '../../interfaces/mySolutions';

const PREFIX = 'GeneralView';

const classes = {
  imageContainer: `${PREFIX}-imageContainer`,
  image: `${PREFIX}-image`,
  card: `${PREFIX}-card`,
  title: `${PREFIX}-title`,
};

const Root = styled('div')(() => ({
  [`& .${classes.imageContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: '30vh',
    '&>*:nth-child(-n+2)': {
      flexGrow: 1,
    },
  },
  [`& .${classes.image}`]: {
    padding: '5px',
    maxHeight: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  [`& .${classes.title}`]: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  [`& .${classes.card}`]: {
    padding: '0px',
    maxHeight: '100%',
    width: '33%',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    boxShadow: 'none',
  },
}));

interface GeneralViewProps {
  id: string;
  meta:
    | readonly ({
        readonly k: string | null;
        readonly v: string | null;
      } | null)[]
    | null
    | undefined;
  mfdTableId: string;
  filteredMeta: MetaArguments;
  generalViews: string[];
  currentImage: number;
  automationTasksLength: number;
  setGeneralViews: (selection: string[]) => void;
  isScaledSolution: boolean;
}

const GeneralView: React.FC<GeneralViewProps> = ({
  id,
  mfdTableId,
  meta,
  generalViews,
  filteredMeta,
  setGeneralViews,
  currentImage,
  automationTasksLength,
  isScaledSolution,
}: GeneralViewProps) => {
  const [viewOptions, setViewOptions] = useState<SolutionDiagnosticsOption[]>([diagnosticReportViewOptions[0]]);
  const [generalViewSelections, setGeneralViewSelections] = useState<SolutionDiagnosticsOption[]>([viewOptions[0]]);

  useEffect(() => {
    let scaledReportViewOptions: SolutionDiagnosticsOption[] = [];
    if (isScaledSolution) {
      scaledReportViewOptions = diagnosticReportViewOptions.filter(
        (option) =>
          option.displayName !== 'Perturbations & Non-Zero Rates' &&
          option.displayName !== 'Energy vs Time' &&
          option.displayName !== 'Misfit Progress' &&
          option.displayName !== 'Re-Weighting',
      );
      setViewOptions(scaledReportViewOptions);
    } else {
      setViewOptions(diagnosticReportViewOptions);
    }
  }, [isScaledSolution]);

  useEffect(() => {
    const filtered = viewOptions.filter((option) => generalViews.includes(option.displayName));
    setGeneralViewSelections(filtered);
  }, [viewOptions, generalViews]);

  const generalViewDisplayNames: string[] = [];

  viewOptions.map((option) => {
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
        {generalViewSelections.length &&
          generalViewSelections.map((option) => {
            if (
              (option.finalPath === 'mfd_plot_Total_MFD.png' ||
                option.finalPath === 'mfd_plot_Total_MFD_cumulative.png') &&
              isScaledSolution === false
            ) {
              return (
                <GeneralViewMfdDynamicDialog
                  mfdTableId={mfdTableId}
                  meta={meta}
                  option={option}
                  currentImage={currentImage}
                  automationTasksLength={automationTasksLength}
                  filteredMeta={filteredMeta}
                />
              );
            } else {
              return (
                <GeneralViewMfdStaticDialog
                  id={id}
                  option={option}
                  currentImage={currentImage}
                  automationTasksLength={automationTasksLength}
                  filteredMeta={filteredMeta}
                />
              );
            }
          })}
      </div>
    </Root>
  );
};

export { GeneralView, classes };
