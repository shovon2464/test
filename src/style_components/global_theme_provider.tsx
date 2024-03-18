import '../../src/index.css';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    solidblack: Palette['primary'];
    logogreen: Palette['primary'];
  }
  interface PaletteOptions {
    solidblack: PaletteOptions['primary'];
    logogreen: PaletteOptions['primary'];
  }
}

declare module "@mui/material/IconButton" {
  export interface IconButtonPropsColorOverrides {
    solidblack: true;
    logogreen: true;
  }
}

declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    solidblack: true;
    logogreen: true;
  }
}


let theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),

    fontSize: 15,
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: ["none"],
          ":hover": {
            boxShadow: ["none"],
          }
        },
        outlined: {
          border: "2px solid",
          ":hover": {
            border: "2px solid",
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: "0.5rem",
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-checked": {
            color: "#000",
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000",
          ":hover": {
            color: "#A69282",
            textDecoration: "none"
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#C0B1A5 #FFF",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: "0.8rem",
            height: "0.8rem",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#C0B1A5",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#CFBEB2",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#CFBEB2",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#CFBEB2",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#FFF",
          },
        },
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          margin: 0,
          fontWeight: "bold"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: "visible",
        }
      }
    }
  },
  palette: {
    primary: {
      light: '#7A5B52',
      main: '#57413A',
      dark: '#2E221F',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#C0B1A5',
      main: '#A69282',
      dark: '#86715F',
      contrastText: '#FFF',
    },
    success: {
      light: '#2D8650',
      main: '#1A4D2E',
      dark: '#143923',
      contrastText: '#FFF',
    },
    error: {
      light: '#BB444E',
      main: '#853037',
      dark: '#5E2227',
      contrastText: '#FFF',
    },
    warning: {
      light: '#FFBA66',
      main: '#FF9F29',
      dark: '#E67E00',
      contrastText: '#FFF',
    },
    info: {
      light: '#FBF6E9',
      main: '#FAF3E3',
      dark: '#F3E4BE',
      contrastText: '#000',
    },
    solidblack: {
      main: "#000",
      contrastText: '#fff',
    },
    logogreen: {
      light: '#B4DD55',
      main: '#A0D229',
      dark: '#81AA22',
      contrastText: '#000',
    },
  },

});

export default theme = responsiveFontSizes(theme);

