import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { red } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
  }),
);

export default theme;
