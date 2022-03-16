export const solutionMfdOptions: SolutionMfdOption[] = [
  {
    displayName: 'Incremental',
    path: 'mfd_plot_NZ_RECTANGLE_Gridded_Region.png',
  },
  {
    displayName: 'Cumulative',
    path: 'mfd_plot_NZ_RECTANGLE_Gridded_Region_cumulative.png',
  },
];

export interface SolutionMfdOption {
  displayName: string;
  path: string;
}
