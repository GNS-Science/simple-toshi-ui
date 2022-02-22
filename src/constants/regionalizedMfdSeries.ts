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
    path: 'inversionTargetMFDs.totalTargetGR_SansTVZ',
  },
  {
    displayName: 'Total Target GR - TVZ',
    path: 'inversionTargetMFDs.totalTargetGR_TVZ',
  },
  {
    displayName: 'Truly Off Fault MFD - All',
    path: 'trulyOffFaultMFD.all',
  },
  {
    displayName: 'Truly Off Fault MFD - SansTVZ',
    path: 'inversionTargetMFDs.trulyOffFaultMFD_SansTVZ',
  },
  {
    displayName: 'Truly Off Fault MFD - TVZ',
    path: 'inversionTargetMFDs.trulyOffFaultMFD_TVZ',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD - All',
    path: 'targetOnFaultSupraSeisMFD.all',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD - SansTVZ',
    path: 'inversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ',
  },
  {
    displayName: 'Target On Fault Supra Seis MFD - TVZ',
    path: 'inversionTargetMFDs.targetOnFaultSupraSeisMFD_TVZ',
  },
  {
    displayName: 'Total Subseismo On Fault MFD - All',
    path: 'totalSubSeismoOnFaultMFD.all',
  },
  {
    displayName: 'Total Subseismo On Fault MFD - SansTVZ',
    path: 'inversionTargetMFDs.totalSubSeismoOnFaultMFD_SansTVZ',
  },
  {
    displayName: 'Total Subseismo On Fault MFD - TVZ',
    path: 'inversionTargetMFDs.totalSubSeismoOnFaultMFD_TVZ',
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

export const regionalizedMfdColors: string[] = [
  'orange',
  'steelblue',
  'lightgray',
  'black',
  'red',
  'yellow',
  'lightgreen',
  'darkgreen',
  'pink',
  'purple',
  'salmon',
  'teal',
  'blue',
];
