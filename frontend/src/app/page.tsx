'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";


const loanSchema = z.object({
  balance: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive()
  ),
  installments_value: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive()
  ),
  state_id: z.string(),
  birth_date: z.string(),
  cpf: z.string(),
});

type LoanProps = z.infer<typeof loanSchema>


export default function Home() {

  const { control, register, formState: { errors, isValid }, getValues, setError, handleSubmit } = useForm<LoanProps>({
    resolver: zodResolver(loanSchema)
  });


  const handleSimulate = (data: LoanProps) => {
    if (Number(String(getValues("balance")).replaceAll('.', '').replace(',', '.')) < 50000) {
      setError("balance", {
        message: "O valor mínimo é 50.000"
      })
    }
    console.log(data)
  }
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

      <Stack component="form" onSubmit={handleSubmit(handleSimulate)} spacing={2} direction="column" justifyContent="center" textAlign="center">
        <Typography variant="subtitle1" component="p" mb={2} fontWeight="700"> Preencha o formulário abaixo para simular </Typography>
        <Stack spacing={2} direction="column" width="55rem" bgcolor="white" px={4} py={8} borderRadius={2}>

          <Controller
            name="cpf"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField label="CPF" variant="outlined" fullWidth onChange={onChange} value={value} error={errors.cpf?.message !== undefined} helperText={errors.cpf?.message} />
            )}
          />

          <Controller
            name="state_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField label="UF" variant="outlined" type="number" fullWidth onChange={onChange} value={value} error={errors.state_id?.message !== undefined} helperText={errors.state_id?.message} />
            )}
          />


          <Controller
            name="birth_date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField label="DATA DE NASCIMENTO" variant="outlined" fullWidth onChange={onChange} value={value} error={errors.birth_date?.message !== undefined} helperText={errors.birth_date?.message} />
            )}
          />


          <Controller
            name="balance"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField label="QUAL O VALOR DO EMPRESTIMO" variant="outlined" fullWidth onChange={onChange} value={value} error={errors.balance?.message !== undefined} helperText={errors.balance?.message} />
            )}
          />


          <Controller
            name="installments_value"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField label="QUAL VALOR DESEJA PAGAR POR MÊS?" variant="outlined" fullWidth onChange={onChange} value={value} error={errors.installments_value?.message !== undefined} helperText={errors.installments_value?.message} />
            )}
          />
          <Button variant="contained" type="submit" className="bg-amber-700">SIMULAR</Button>
        </Stack>
      </Stack>

      <Box width="60rem" height="20rem" bgcolor="blue">
        eai
      </Box>
    </Box>
  );
}
