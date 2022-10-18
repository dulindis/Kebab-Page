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

  // components: {
  //   MuiCssBaseline:{
  //     styleOverrides: {
  //       root:{
  //         scrollbarColor: "red #2b2b2b",
  //         'scrollbar-width': 'thin',

  //         "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
  //           backgroundColor: "#2b2b2b",
  //         },
  //         "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
  //           borderRadius: 8,
  //           backgroundColor: "red",
  //           minHeight: 24,
  //           border: "3px solid #2b2b2b",
  //         },
  //         "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
  //           backgroundColor: "#2b2b2b",
  //         },
  //       }
  //     }
  //   }
  // }

  
  // typography:{
  //   h4:{
  //     color:this.palette.primary
  //   }
  // },
  
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       body: {
  //         scrollbarColor: "red #2b2b2b",
  //         "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
  //           backgroundColor: "#2b2b2b",
  //         },
  //         "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
  //           borderRadius: 8,
  //           backgroundColor: "red",
  //           minHeight: 24,
  //           border: "3px solid #2b2b2b",
  //         },
  //         "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
  //           backgroundColor: "#959595",
  //         },
  //         "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
  //           backgroundColor: "#2b2b2b",
  //         },
  //       },
  //     },
  //   },
  // },

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
