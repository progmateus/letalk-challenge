'use client'
import { SimulateLoanService } from "@/services/LoansService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { ProspectionInfo } from "@/components/ProspectionInfo";
import { convertMoney } from "@/utils/convertMoney";
import { useState } from "react";
import { IProspectionDTO } from "@/dtos/IProspectionDTO";
import { LoadingButton } from '@mui/lab';


dayjs.extend(customParseFormat)
const loanSchema = z.object({
  balance: z.preprocess(
    (a) => parseInt(z.string().transform((val) => val.replaceAll('.', '').replace(',', '.')).parse(a), 10),
    z.number().positive()
  ),
  installments_value: z.preprocess(
    (a) => parseInt(z.string().transform((val) => val.replaceAll('.', '').replace(',', '.')).parse(a), 10),
    z.number().positive()
  ),
  state_id: z.string().transform((val) => parseInt(val)),
  birth_date: z.string().transform((val) => dayjs(val, "DD/MM/YYYY").toDate()),
  cpf: z.string().transform((val) => val.replaceAll('.', '').replaceAll('-', '')),
});

type LoanProps = z.infer<typeof loanSchema>


export default function Home() {

  const { control, register, formState: { errors, isValid }, getValues, setError, handleSubmit } = useForm<LoanProps>({
    resolver: zodResolver(loanSchema)
  });

  const [currentProspection, setCurrentProspection] = useState<IProspectionDTO | null>(null)
  const [moreProspections, setMoreProspections] = useState<IProspectionDTO[] | []>([])
  const [isLoading, setIsLoading] = useState(false)


  const handleSimulate = async ({ balance, birth_date, cpf, installments_value, state_id }: LoanProps) => {
    if (isLoading) return
    if (balance < 50000) {
      setError("balance", {
        message: "O valor mínimo é R$50.000"
      })
      return
    }

    if (installments_value > balance) {
      setError("installments_value", {
        message: "O valor da parcela não pode ser maior que o valor do empréstimo"
      })
      return
    }
    setIsLoading(true)
    await SimulateLoanService({ balance, birth_date, cpf, installments_value, state_id }).then((res) => {
      const { data } = res
      setCurrentProspection(data.data.currentSimulation)
      setMoreProspections(data.data.moreSimulations)
    }).catch((err) => {
      console.log(err)
      console.log(err.response.data.message)

      if (err.response.data.message === "ERR_INVALID_CPF") {
        setError("cpf", {
          message: "CPF invialido"
        })
        return
      }
    }).finally(() => {
      setIsLoading(false)
    })
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
          <LoadingButton variant="contained" type="submit" className="bg-amber-700" loading={isLoading}>SIMULAR</LoadingButton>
        </Stack>
      </Stack>

      {
        currentProspection && (
          <Stack spacing={2} direction="column" justifyContent="center" textAlign="center" mt={12}>
            <Typography variant="subtitle1" component="p" mb={2} fontWeight="700"> Veja a simulação para seu emprestimo antes de efetivar </Typography>
            <Stack spacing={2} direction="column" width="55rem" bgcolor="white" px={4} py={8} borderRadius={2}>

              <Box textAlign="left" display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="4rem">

                <ProspectionInfo title="VALOR REQUERIDO:" info={convertMoney(currentProspection.balance)} />

                <ProspectionInfo title="TAXA DE JUROS:" info="1% ao mês" />

                <ProspectionInfo title="VALOR QUE DESEJA PAGAR POR MÊS:" info={convertMoney(currentProspection.installments_value)} />

                <ProspectionInfo title="TOTAL DE MESES PARA QUITAR:" info={`${currentProspection.installments_times} MESES`} />

                <ProspectionInfo title="TOTAL DE JUROS:" info={convertMoney(currentProspection.interest)} />

                <ProspectionInfo title="TOTAL A PAGAR:" info={convertMoney(currentProspection.balance_with_interest)} />
              </Box>
              <Button variant="contained" type="submit" className="bg-amber-700">SIMULAR</Button>
            </Stack>
          </Stack>
        )
      }
    </Box>
  );
}
