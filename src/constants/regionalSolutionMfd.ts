export const regionalSolutionMfdOptions: RegionalSolutionMfdOption[] = [
  {
    displayName: 'Solution MFD-Sans TVZ(incremental)',
    path: 'mfd_plot_NZ_RECTANGLE_SANS_TVZ_Gridded_Region.png',
  },
  {
    displayName: 'TVZ(incremental)',
    path: 'mfd_plot_NZ_TVZ_Gridded_Region.png',
  },
  {
    displayName: 'Sans TVZ(cumulative)',
    path: 'mfd_plot_NZ_RECTANGLE_SANS_TVZ_Gridded_Region_cumulative.png',
  },
  {
    displayName: 'TVZ(cumulative)',
    path: 'mfd_plot_NZ_TVZ_Gridded_Region_cumulative.png',
  },
];

export interface RegionalSolutionMfdOption {
  displayName: string;
  path: string;
}
