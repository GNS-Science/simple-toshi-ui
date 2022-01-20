import { SolutionDiagnosticsOption, ViewTypeEnum } from '../interfaces/generaltask';

export const diagnosticReportViewOptions: SolutionDiagnosticsOption[] = [
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Solution MFDs (incremental)',
    finalPath: 'mfd_plot_Total_MFD.png',
    imgHght: 600,
    imgWdth: 500,
  },
  // solution_report/resources/mfd_plot_Total_Target_MFDs_cumulative.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Solution MFDs (cumulative)',
    finalPath: 'mfd_plot_Total_MFD_cumulative.png',
    imgHght: 600,
    imgWdth: 500,
  },
  // solution_report/resources/sa_progress_energy_vs_time.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Energy vs Time',
    finalPath: 'sa_progress_energy_vs_time.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sa_progress_rate_dist.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Rate Distribution',
    finalPath: 'rate_dist.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_supra_seis.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation - Supraseismogenic',
    finalPath: 'sol_partic_supra_seis.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_supra_seis_to_m7.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation <= M7',
    finalPath: 'sol_partic_supra_seis_to_m7.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_m7.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation >= M7',
    finalPath: 'sol_partic_m7.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_m7_to_m8.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation M7 to M8',
    finalPath: 'sol_partic_m7_to_m8.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_m8.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation >= M8',
    finalPath: 'sol_partic_m8.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_m8_to_m9.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation M8 to M9',
    finalPath: 'sol_partic_m8_to_m9.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/sol_partic_m9.png
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Participation >= M9',
    finalPath: 'sol_partic_m9.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/hist_MAG_rates_log.png #Rupture Magnitude Annual Rate histogram
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Magnitude Annual Rate histogram',
    finalPath: 'hist_MAG_rates_log.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/hist_MAG_cumulative.png #Rupture Magnitude Annual Rate cumulative
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Magnitude Annual Rate cumulative',
    finalPath: 'hist_MAG_cumulative.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/hist_MAG_vs_rate_hist2D.png #Rupture Magnitude vs Rate
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Rupture Magnitude vs Rate 2D histogram',
    finalPath: 'hist_MAG_vs_rate_hist2D.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_orig.png #Slip Rate original
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate original',
    finalPath: 'slip_rates_orig.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_reduced.png #Slip Rate reduced
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate reduced',
    finalPath: 'slip_rates_reduced.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_target.png #Slip Rate Target
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate Target',
    finalPath: 'slip_rates_target.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_sol.png #Slip Rate Solution
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate Solution',
    finalPath: 'slip_rates_sol.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_sol_diff.png #Slip Rate Difference
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate (Solution - Target)',
    finalPath: 'slip_rates_sol_diff.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_sol_ratio.png #Slip Rate Ratio
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate (Solution / Target)',
    finalPath: 'slip_rates_sol_ratio.png',
    imgHght: 600,
    imgWdth: 500,
  },
  //solution_report/resources/slip_rates_sol_scatter.png #Slip Rate (Scatter)
  {
    viewType: ViewTypeEnum.Image,
    displayName: 'Slip Rate Scatter plot',
    finalPath: 'slip_rates_sol_scatter.png',
    imgHght: 600,
    imgWdth: 500,
  },
];
