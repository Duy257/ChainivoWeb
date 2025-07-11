export interface IColorTheme {
  // primary
  primary_darker_color: string;
  primary_main_color: string;
  primary_sub_color: string;
  primary_border_color: string;
  primary_background: string;

  // secondary 1-6
  secondary1_darker_color: string;
  secondary1_main_color: string;
  secondary1_sub_color: string;
  secondary1_border_color: string;
  secondary1_background: string;

  secondary2_darker_color: string;
  secondary2_main_color: string;
  secondary2_sub_color: string;
  secondary2_border_color: string;
  secondary2_background: string;

  secondary3_darker_color: string;
  secondary3_main_color: string;
  secondary3_sub_color: string;
  secondary3_border_color: string;
  secondary3_background: string;

  secondary4_darker_color: string;
  secondary4_main_color: string;
  secondary4_sub_color: string;
  secondary4_border_color: string;
  secondary4_background: string;

  secondary5_darker_color: string;
  secondary5_main_color: string;
  secondary5_sub_color: string;
  secondary5_border_color: string;
  secondary5_background: string;

  secondary6_darker_color: string;
  secondary6_main_color: string;
  secondary6_sub_color: string;
  secondary6_border_color: string;
  secondary6_background: string;

  // status colors
  success_darker_color: string;
  success_main_color: string;
  success_sub_color: string;
  success_border_color: string;
  success_background: string;

  infor_darker_color: string;
  infor_main_color: string;
  infor_sub_color: string;
  infor_border_color: string;
  infor_background: string;

  warning_darker_color: string;
  warning_main_color: string;
  warning_sub_color: string;
  warning_border_color: string;
  warning_background: string;

  error_darker_color: string;
  error_main_color: string;
  error_sub_color: string;
  error_border_color: string;
  error_background: string;

  // neutral backgrounds
  neutral_bolder_background_color: string;
  neutral_absolute_background_color: string;
  neutral_main_background_color: string;
  neutral_lighter_background_color: string;
  neutral_overlay_background_color: string;
  neutral_disable_background_color: string;
  neutral_selected_background_color: string;
  neutral_hover_background_color: string;

  // reverse backgrounds
  neutral_absolute_reverse_background_color: string;
  neutral_bolder_reverse_background_color: string;
  neutral_main_reverse_background_color: string;
  neutral_lighter_reverse_background_color: string;
  neutral_disable_reverse_background_color: string;

  // neutral text
  neutral_text_title_color: string;
  neutral_text_subtitle_color: string;
  neutral_text_body_color: string;
  neutral_text_label_color: string;
  neutral_text_placeholder_color: string;
  neutral_text_disabled_color: string;
  neutral_text_stable_color: string;

  // reverse text
  neutral_text_title_reverse_color: string;
  neutral_text_subtitle_reverse_color: string;
  neutral_text_body_reverse_color: string;
  neutral_text_label_reverse_color: string;
  neutral_text_placeholder_reverse_color: string;
  neutral_text_disabled_reverse_color: string;
  neutral_text_stable_reverse_color: string;

  // neutral borders
  neutral_bolder_border_color: string;
  neutral_main_border_color: string;
  neutral_lighter_border_color: string;
  neutral_bolder_border: string;
  neutral_main_border: string;
  neutral_lighter_border: string;

  // reverse borders
  neutral_bolder_reverse_border_color: string;
  neutral_main_reverse_border_color: string;
  neutral_lighter_reverse_border_color: string;
  neutral_bolder_reverse_border: string;
  neutral_main_reverse_border: string;
  neutral_lighter_reverse_border: string;

  // shadows
  shadow_top: string;
  shadow_bottom: string;
  shadow_right: string;
  shadow_left: string;
  shadow_dropdown: string;

  // misc
  transparent: string;
  white: string;

  // Cho phép thêm các thuộc tính động từ API
  [key: string]: any;
}

export const ColorThemes: {
  light: IColorTheme;
  dark: IColorTheme;
} = {
  light: {
    /* primary */
    primary_darker_color: '#1C33FF',
    primary_main_color: '#1C33FF',
    primary_sub_color: '#40A9FF',
    primary_border_color: '#91D5FF',
    primary_background: '#E6F7FF',
    /* secondary 1 */
    secondary1_darker_color: '#E36003',
    secondary1_main_color: '#FC7A1C',
    secondary1_sub_color: '#FD974F',
    secondary1_border_color: '#FED3B3',
    secondary1_background: '#FFF3EB',
    /* secondary 2 */
    secondary2_darker_color: '#2D8655',
    secondary2_main_color: '#3AAC6D',
    secondary2_sub_color: '#53C586',
    secondary2_border_color: '#C6ECD7',
    secondary2_background: '#E8F7EF',
    /* secondary 3 */
    secondary3_darker_color: '#22C3AE',
    secondary3_main_color: '#3CDDC7',
    secondary3_sub_color: '#67E4D4',
    secondary3_border_color: '#BEF4EC',
    secondary3_background: '#EEFCFA',
    /* secondary 4 */
    secondary4_darker_color: '#7B22C3',
    secondary4_main_color: '#943CDD',
    secondary4_sub_color: '#AC67E4',
    secondary4_border_color: '#DBBEF4',
    secondary4_background: '#F6EEFC',
    /* secondary 5 */
    secondary5_darker_color: '#E19405',
    secondary5_main_color: '#FAAD1E',
    secondary5_sub_color: '#FBBF50',
    secondary5_border_color: '#FDE4B4',
    secondary5_background: '#FFF8EB',
    /* secondary 6 */
    secondary6_darker_color: '#C8291E',
    secondary6_main_color: '#E86D64',
    secondary6_sub_color: '#E86D64',
    secondary6_border_color: '#F5C0BC',
    secondary6_background: '#FCEEED',
    /* success */
    success_darker_color: '#2D8655',
    success_main_color: '#3AAC6D',
    success_sub_color: '#53C586',
    success_border_color: '#C6ECD7',
    success_background: '#E8F7EF',
    /* info */
    infor_darker_color: '#0F62D7',
    infor_main_color: '#287CF0',
    infor_sub_color: '#5899F3',
    infor_border_color: '#B7D3FA',
    infor_background: '#ECF3FE',
    infor_text_color: '#002766',
    /* warning */
    warning_darker_color: '#E36003',
    warning_main_color: '#FC7A1C',
    warning_sub_color: '#FD974F',
    warning_border_color: '#FED3B3',
    warning_background: '#FFF3EB',
    /* error */
    error_darker_color: '#C8291E',
    error_main_color: '#E14337',
    error_sub_color: '#E86D64',
    error_border_color: '#F5C0BC',
    error_background: '#FCEEED',
    /* neutral_background */
    neutral_bolder_background_color: '#EAEAEC',
    neutral_absolute_background_color: '#FFFFFF',
    neutral_main_background_color: '#EFEFF0',
    neutral_lighter_background_color: '#F4F4F5',
    neutral_overlay_background_color: '#000000B3',
    neutral_disable_background_color: '#F4F4F5',
    neutral_selected_background_color: '#18181B14',
    neutral_hover_background_color: '#18181B0A',
    /* reverse */
    neutral_absolute_reverse_background_color: '#000000',
    neutral_bolder_reverse_background_color: '#18181B',
    neutral_main_reverse_background_color: '#242428',
    neutral_lighter_reverse_background_color: '#313135',
    neutral_disable_reverse_background_color: '#313135',
    /* neutral_text */
    neutral_text_title_color: '#18181B',
    neutral_text_subtitle_color: '#61616B',
    neutral_text_body_color: '#313135',
    neutral_text_label_color: '#313135',
    neutral_text_placeholder_color: '#878792',
    neutral_text_disabled_color: '#A2A2AA',
    neutral_text_stable_color: '#FFFFFF',
    /* reverse */
    neutral_text_title_reverse_color: '#F4F4F5',
    neutral_text_subtitle_reverse_color: '#A2A2AA',
    neutral_text_body_reverse_color: '#D7D7DB',
    neutral_text_label_reverse_color: '#EAEAEC',
    neutral_text_placeholder_reverse_color: '#A2A2AA',
    neutral_text_disabled_reverse_color: '#878792',
    neutral_text_stable_reverse_color: '#000000',
    /* neutral_border_color */
    neutral_bolder_border_color: '#D7D7DB',
    neutral_main_border_color: '#EAEAEC',
    neutral_lighter_border_color: '#F4F4F5',
    /* neutral_border */
    neutral_bolder_border: '1px solid #D7D7DB',
    neutral_main_border: '1px solid #EAEAEC',
    neutral_lighter_border: '1px solid #F4F4F5',
    /* neutral_border_color reverse */
    neutral_bolder_reverse_border_color: '#242428',
    neutral_main_reverse_border_color: '#313135',
    neutral_lighter_reverse_border_color: '#494950',
    /* neutral_border reverse */
    neutral_bolder_reverse_border: '1px solid #242428',
    neutral_main_reverse_border: '1px solid #313135',
    neutral_lighter_reverse_border: '1px solid #494950',

    shadow_top: '0px _1px 6px 0px #2D32390F',
    shadow_bottom: '0px 1px 6px 0px #2D32390F',
    shadow_right: '1px 0px 6px 0px #2D32390F',
    shadow_left: '_1px 0px 6px 0px #2D32390F',
    shadow_dropdown: '2px 0px 16px 0px #0000000A',

    transparent: 'transparent',
    white: '#FFFFFF',
  },
  dark: {
    /* primary */
    primary_darker_color: '#2D8655',
    primary_main_color: '#3AAC6D',
    primary_sub_color: '#53c586',
    primary_border_color: '#c6ecd7',
    primary_background: '#e8f7ef',
    /* secondary 1 */
    secondary1_darker_color: '#E36003',
    secondary1_main_color: '#FC7A1C',
    secondary1_sub_color: '#FD974F',
    secondary1_border_color: '#FED3B3',
    secondary1_background: '#FFF3EB',
    /* secondary 2 */
    secondary2_darker_color: '#2D8655',
    secondary2_main_color: '#3AAC6D',
    secondary2_sub_color: '#53C586',
    secondary2_border_color: '#C6ECD7',
    secondary2_background: '#E8F7EF',
    /* secondary 3 */
    secondary3_darker_color: '#22C3AE',
    secondary3_main_color: '#3CDDC7',
    secondary3_sub_color: '#67E4D4',
    secondary3_border_color: '#BEF4EC',
    secondary3_background: '#EEFCFA',
    /* secondary 4 */
    secondary4_darker_color: '#7B22C3',
    secondary4_main_color: '#943CDD',
    secondary4_sub_color: '#AC67E4',
    secondary4_border_color: '#DBBEF4',
    secondary4_background: '#F6EEFC',
    /* secondary 5 */
    secondary5_darker_color: '#E19405',
    secondary5_main_color: '#FAAD1E',
    secondary5_sub_color: '#FBBF50',
    secondary5_border_color: '#FDE4B4',
    secondary5_background: '#FFF8EB',
    /* secondary 6 */
    secondary6_darker_color: '#C8291E',
    secondary6_main_color: '#E86D64',
    secondary6_sub_color: '#E86D64',
    secondary6_border_color: '#F5C0BC',
    secondary6_background: '#FCEEED',
    /* success */
    success_darker_color: '#2D8655',
    success_main_color: '#3AAC6D',
    success_sub_color: '#53C586',
    success_border_color: '#C6ECD7',
    success_background: '#E8F7EF',
    /* info */
    infor_darker_color: '#0F62D7',
    infor_main_color: '#287CF0',
    infor_sub_color: '#5899F3',
    infor_border_color: '#B7D3FA',
    infor_background: '#ECF3FE',
    infor_text_color: '#002766',

    /* warning */
    warning_darker_color: '#E36003',
    warning_main_color: '#FC7A1C',
    warning_sub_color: '#FD974F',
    warning_border_color: '#FED3B3',
    warning_background: '#FFF3EB',
    /* error */
    error_darker_color: '#C8291E',
    error_main_color: '#E14337',
    error_sub_color: '#E86D64',
    error_border_color: '#F5C0BC',
    error_background: '#FCEEED',
    /* neutral_background */
    neutral_bolder_background_color: '#EAEAEC',
    neutral_absolute_background_color: '#FFFFFF',
    neutral_main_background_color: '#EFEFF0',
    neutral_lighter_background_color: '#F4F4F5',
    neutral_overlay_background_color: '#000000B3',
    neutral_disable_background_color: '#F4F4F5',
    neutral_selected_background_color: '#18181B14',
    neutral_hover_background_color: '#18181B0A',
    /* reverse */
    neutral_absolute_reverse_background_color: '#000000',
    neutral_bolder_reverse_background_color: '#18181B',
    neutral_main_reverse_background_color: '#242428',
    neutral_lighter_reverse_background_color: '#313135',
    neutral_disable_reverse_background_color: '#313135',
    /* neutral_text */
    neutral_text_title_color: '#18181B',
    neutral_text_subtitle_color: '#61616B',
    neutral_text_body_color: '#313135',
    neutral_text_label_color: '#313135',
    neutral_text_placeholder_color: '#878792',
    neutral_text_disabled_color: '#A2A2AA',
    neutral_text_stable_color: '#FFFFFF',
    /* reverse */
    neutral_text_title_reverse_color: '#F4F4F5',
    neutral_text_subtitle_reverse_color: '#A2A2AA',
    neutral_text_body_reverse_color: '#D7D7DB',
    neutral_text_label_reverse_color: '#EAEAEC',
    neutral_text_placeholder_reverse_color: '#A2A2AA',
    neutral_text_disabled_reverse_color: '#878792',
    neutral_text_stable_reverse_color: '#000000',
    /* neutral_border_color */
    neutral_bolder_border_color: '#D7D7DB',
    neutral_main_border_color: '#EAEAEC',
    neutral_lighter_border_color: '#F4F4F5',
    /* neutral_border */
    neutral_bolder_border: '1px solid #D7D7DB',
    neutral_main_border: '1px solid #EAEAEC',
    neutral_lighter_border: '1px solid #F4F4F5',
    /* neutral_border_color reverse */
    neutral_bolder_reverse_border_color: '#242428',
    neutral_main_reverse_border_color: '#313135',
    neutral_lighter_reverse_border_color: '#494950',
    /* neutral_border reverse */
    neutral_bolder_reverse_border: '1px solid #242428',
    neutral_main_reverse_border: '1px solid #313135',
    neutral_lighter_reverse_border: '1px solid #494950',

    shadow_top: '0px _1px 6px 0px #2D32390F',
    shadow_bottom: '0px 1px 6px 0px #2D32390F',
    shadow_right: '1px 0px 6px 0px #2D32390F',
    shadow_left: '_1px 0px 6px 0px #2D32390F',
    shadow_dropdown: '2px 0px 16px 0px #0000000A',

    transparent: 'transparent',
    white: '#FFFFFF',
  },
};

// Type helper để lấy tất cả các key có sẵn
export type ColorThemeKeys = keyof typeof ColorThemes.light;
