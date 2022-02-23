export interface RegionalizedMfdSeries {
  displayName: string;
  path: string;
}

export const regionalizedMfdSeries = [
  {
    displayName: 'Total Target GR - All',
    path: 'totalTargetGR.all',
  },
  {
    displayName: 'Total Target GR - SansTVZ',
    path: 'InversionTargetMFDs.totalTargetGR_SansTVZ',
  },
  {
    displayName: 'Total Target GR - TVZ',
    path: 'InversionTargetMFDs.totalTargetGR_TVZ',
  },
  {
    displayName: 'Truly Off Fault MFD - All',
    path: 'trulyOffFaultMFD.all',
  },
  {
    displayName: 'Truly Off Fault MFD - SansTVZ',
    path: 'InversionTargetMFDs.trulyOffFaultMFD_SansTVZ.',
  },
  {
    displayName: 'Truly Off Fault MFD - TVZ',
    path: 'InversionTargetMFDs.trulyOffFaultMFD_TVZ.',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD - All',
    path: 'targetOnFaultSupraSeisMFD.all',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD - SansTVZ',
    path: 'InversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD - TVZ',
    path: 'InversionTargetMFDs.targetOnFaultSupraSeisMFD_TVZ',
  },
  {
    displayName: 'Total Subseismo On Fault MFD - All',
    path: 'totalSubSeismoOnFaultMFD.all',
  },
  {
    displayName: 'Total Subseismo On Fault MFD - SansTVZ',
    path: 'InversionTargetMFDs.totalSubSeismoOnFaultMFD_SansTVZ.',
  },
  {
    displayName: 'Total Subseismo On Fault MFD - TVZ',
    path: 'InversionTargetMFDs.totalSubSeismoOnFaultMFD_TVZ.',
  },
  {
    displayName: 'Solution MFD',
    path: 'solutionMFD',
  },
];

export const mfdCurvesOptions = [
  {
    displayName: 'Total Target GR',
    path: 'totalTargetGR',
  },
  {
    displayName: 'Truly Off Fault MFD',
    path: 'trulyOffFaultMFD',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD ',
    path: 'targetOnFaultSupraSeisMFD',
  },
  {
    displayName: 'Total Subseismo On Fault MFD',
    path: 'totalSubSeismoOnFaultMFD',
  },
  {
    displayName: 'Solution MFD',
    path: 'solutionMFD',
  },
];

export const regionalizedMfdColors: string[] = ['orange', 'steelblue', 'lightgray', 'black', 'red'];
