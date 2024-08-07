import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      bgcolor="grey.100"
      px={2}
      py={8}
    >
      <Typography variant="h3" component="h3" color="grey.500" fontWeight="100" mb={8}>Simule e solicite o seu orçamento.</Typography>

      <Stack component="form" spacing={2} direction="column" justifyContent="center" textAlign="center">
        <Typography variant="subtitle1" component="p" mb={2} fontWeight="700"> Preencha o formulário abaixo para simular </Typography>
        <Stack spacing={2} direction="column" width="55rem" bgcolor="white" px={4} py={8} borderRadius={2}>
          <TextField label="CPF" variant="outlined" fullWidth />
          <TextField label="UF" variant="outlined" fullWidth />
          <TextField label="DATA DE NASCIMENTO" variant="outlined" fullWidth />
          <TextField label="QUAL O VALOR DO EMPRESTIMO" variant="outlined" fullWidth />
          <TextField label="QUAL VALOR DESEJA PAGAR POR MÊS?" variant="outlined" fullWidth />
          <Button variant="contained" className="bg-amber-700">SIMULAR</Button>
        </Stack>
      </Stack>



      <Box width="60rem" height="20rem" bgcolor="blue">
        eai
      </Box>
    </Box>
  );
}
