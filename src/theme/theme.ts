    'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-inter), Arial, Helvetica, sans-serif',
    allVariants: {
      fontFamily: 'var(--font-inter), Arial, Helvetica, sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'var(--font-inter), Arial, Helvetica, sans-serif',
        },
      },
    },
  },
});

export default theme;

