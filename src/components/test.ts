import { FilteredChildren, FilteredArguments } from './GeneralTaskChildrenTab';

const childTasks = [
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTkxandvbXA=',
    created: '2021-08-29T01:02:16.339432+00:00',
    duration: 74.468573,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTkyeUtpV28=',
    created: '2021-08-29T01:02:21.831275+00:00',
    duration: 74.569122,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTkzVk41QU0=',
    created: '2021-08-29T01:02:27.269229+00:00',
    duration: 74.847286,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTk0UHplbXo=',
    created: '2021-08-29T01:02:32.131648+00:00',
    duration: 75.869017,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTk1bXlKUzM=',
    created: '2021-08-29T01:02:37.581666+00:00',
    duration: 74.352186,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTk2Q1NoOVg=',
    created: '2021-08-29T01:02:48.221269+00:00',
    duration: 74.704497,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTk3TXRqWVI=',
    created: '2021-08-29T01:02:53.356898+00:00',
    duration: 74.452216,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTk4OEpMOGM=',
    created: '2021-08-29T01:02:59.102056+00:00',
    duration: 76.075897,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6OTk5NUhWYTY=',
    created: '2021-08-29T01:03:09.863549+00:00',
    duration: 76.680662,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwMFBEa2dI',
    created: '2021-08-29T01:03:26.454327+00:00',
    duration: 76.067949,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwMWp2UUZw',
    created: '2021-08-29T01:03:30.578950+00:00',
    duration: 74.824498,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwMkVXc0c1',
    created: '2021-08-29T01:03:36.892740+00:00',
    duration: 74.047269,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwM2JHY0pj',
    created: '2021-08-29T01:03:47.460245+00:00',
    duration: 74.435224,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwNFhLOXNR',
    created: '2021-08-29T01:04:04.087800+00:00',
    duration: 75.560605,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwNTIyUjdV',
    created: '2021-08-29T01:04:14.610394+00:00',
    duration: 74.66683,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwNmh1UnRi',
    created: '2021-08-29T01:04:23.101831+00:00',
    duration: 74.179277,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwN2JtR1NZ',
    created: '2021-08-29T01:04:25.118362+00:00',
    duration: 77.393527,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwOFc5c3dD',
    created: '2021-08-29T01:04:31.663844+00:00',
    duration: 74.745049,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e3',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAwOWJLU1NN',
    created: '2021-08-29T01:04:58.744693+00:00',
    duration: 79.551875,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAxMFQ0RG9r',
    created: '2021-08-29T01:05:03.885125+00:00',
    duration: 75.637516,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAxMXFpeXNv',
    created: '2021-08-29T01:05:09.306951+00:00',
    duration: 80.274583,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAxMnRBQ0VX',
    created: '2021-08-29T01:05:14.868060+00:00',
    duration: 74.419108,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAxM05ZTVM4',
    created: '2021-08-29T01:05:26.733641+00:00',
    duration: 76.925068,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAxNUpuRmtE',
    created: '2021-08-29T01:05:40.395352+00:00',
    duration: 75.034189,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAxOVNadDUy',
    created: '2021-08-29T01:06:06.989053+00:00',
    duration: 74.658005,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAyMkdjN0xF',
    created: '2021-08-29T01:06:21.183664+00:00',
    duration: 74.024035,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAyNURIYUxR',
    created: '2021-08-29T01:06:31.834993+00:00',
    duration: 74.857827,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAyN0s0VXZ0',
    created: '2021-08-29T01:06:42.522554+00:00',
    duration: 74.161172,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e3',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAyOVVkUmlK',
    created: '2021-08-29T01:06:47.696403+00:00',
    duration: 74.847583,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAzMnA2ZlZS',
    created: '2021-08-29T01:06:58.982625+00:00',
    duration: 74.878828,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '1',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAzNDZkd2tr',
    created: '2021-08-29T01:07:16.049375+00:00',
    duration: 74.950246,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e3',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
  {
    __typename: 'AutomationTask',
    id: 'QXV0b21hdGlvblRhc2s6MTAzNThmNGhy',
    created: '2021-08-29T01:07:26.237481+00:00',
    duration: 74.031636,
    state: 'DONE',
    result: 'SUCCESS',
    arguments: [
      {
        k: 'round',
        v: '0',
      },
      {
        k: 'config_type',
        v: 'subduction',
      },
      {
        k: 'rupture_set_file_id',
        v: 'RmlsZToxNTU5LjByWmtXYw==',
      },
      {
        k: 'rupture_set',
        v: '/home/chrisch/NSHM/modular/work/downloads/RmlsZToxNTU5LjByWmtXYw==/RupSet_Sub_FM(SBD_0_2_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.5)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      },
      {
        k: 'completion_energy',
        v: '0.0',
      },
      {
        k: 'max_inversion_time',
        v: '1',
      },
      {
        k: 'mfd_equality_weight',
        v: '1e4',
      },
      {
        k: 'mfd_inequality_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_weighting_type',
        v: 'BOTH',
      },
      {
        k: 'slip_rate_normalized_weight',
        v: '1e4',
      },
      {
        k: 'slip_rate_unnormalized_weight',
        v: '1e4',
      },
      {
        k: 'mfd_mag_gt_5',
        v: '29',
      },
      {
        k: 'mfd_b_value',
        v: '1.05',
      },
      {
        k: 'mfd_transition_mag',
        v: '9.15',
      },
      {
        k: 'selection_interval_secs',
        v: '1',
      },
      {
        k: 'threads_per_selector',
        v: '4',
      },
      {
        k: 'averaging_threads',
        v: '4',
      },
      {
        k: 'averaging_interval_secs',
        v: '30',
      },
      {
        k: 'non_negativity_function',
        v: 'LIMIT_ZERO_RATES',
      },
      {
        k: 'perturbation_function',
        v: 'UNIFORM_NO_TEMP_DEPENDENCE',
      },
    ],
  },
];

const filteredChildrean: FilteredChildren = [];

const sweepArguments: FilteredArguments = {
  data: [
    {
      k: 'mfd_equality_weights',
      v: ['1e4'],
    },
    {
      k: 'mfd_inequality_weights',
      v: ['1e4'],
    },
  ],
};

const filter = childTasks.filter((child) => {
  if (child.__typename === 'AutomationTask' || child.__typename === 'RuptureGenerationTask') {
    child.arguments.map((argument) => {
      return sweepArguments.data.some((sweepArgument) => {
        return sweepArgument.k === argument.k && sweepArgument.v.some((v) => v === argument.v);
      });
    });
  }
});

const filtered: FilteredChildren = {
  data: filter,
};

console.log(filtered);
