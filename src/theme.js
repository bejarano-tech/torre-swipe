import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#cddc39',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#27292D',
    },
    color: {
        default: "#FFF"
    }
  },
});

export default theme;