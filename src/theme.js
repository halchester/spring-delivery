import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Baloo 2',
    body2: {
      fontSize: 20,
    },
  },
  palette: {
    primary: {
      main: '#1b1717',
    },
    secondary: {
      main: '#ce1212',
    },
  },
});
export default theme;
