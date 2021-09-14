import { SolutionDiagnosticsOption, ViewTypeEnum } from '../interfaces/generaltask';

export const diagnosticReportViewOptions: SolutionDiagnosticsOption[] = [
  {
    viewType: ViewTypeEnum.Report,
    displayName: 'Annealing Energy',
    finalPath: 'simulated-annealing-energy',
    imgHght: undefined,
    imgWdth: undefined,
  },
  {
    viewType: ViewTypeEnum.Report,
    displayName: 'Energy progress',
    finalPath: 'energy-progress',
    imgHght: undefined,
    imgWdth: undefined,
  },
  {
    viewType: ViewTypeEnum.Report,
    displayName: 'Solution MFDs',
    finalPath: 'solution-mfds',
    imgHght: undefined,
    imgWdth: undefined,
  },
  {
    viewType: ViewTypeEnum.Report,
    displayName: 'Slip Rates',
    finalPath: 'slip-rates',
    imgHght: undefined,
    imgWdth: undefined,
  },
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Image',
    finalPath: 'mfd_plot_Total_Target_MFDs.png',
    imgHght: 600,
    imgWdth: 500,
  },
];
