import { createTheme } from "@mui/material/styles";





const theme = createTheme({
  palette: {
    primary: {
    //   main: "#bf360c",
    //   light: "#f9683a",
    //   dark: "#870000",
      main: "#827717",
      light: "#b4a647",
      dark: "#524c00",
    
    },

    secondary:{
      main:"#fff"
    }
  },
  
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },

  // overrides: {
  //   MuiExpansionPanelSummary: {
  //     root: {
  //       "&:hover:not(.Mui-disabled)": {
  //         cursor: "crosshair",
  //         // cursor: "default"

  //       }
  //     }
  //   }
  // }

});

export default theme
