import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: 'success' },
          style: {
            backgroundColor: '#21ae1e',
          },
        },
        {
          props: { color: 'warning' },
          style: {
            backgroundColor: '#FFA000',
          },
        }
      ],
    }
  }
});