'use client'
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { convertMoney } from "@/utils/convertMoney";
import dayjs from "dayjs";
import { ListLoansService } from "@/services/LoansService";
import { useEffect, useState } from "react";
import { CPFFormat } from "@/formatCPF";
import CircularProgress from '@mui/material/CircularProgress';
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";


export default function Loans() {
  const [loans, setLoans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const columns: any[] = [
    { field: 'cpf', headerName: 'CPF', valueGetter: (value: string) => CPFFormat(value), width: 150 },
    { field: 'balance', headerName: 'SALDO DEVEDOR', valueGetter: (value: number) => convertMoney(value), width: 150 },
    { field: 'interest_value', headerName: 'JUROS', valueGetter: (value: number) => convertMoney(value), width: 120 },
    { field: 'balance_with_interest', headerName: 'SALDO DEVEDOR AJUSTADO', valueGetter: (value: number) => convertMoney(value), width: 220 },
    {
      field: 'installments_value',
      headerName: 'VALOR DA PARCELA',
      type: 'string',
      valueGetter: (value: number) => convertMoney(value),
      width: 200
    },
    {
      field: 'maturity_date',
      headerName: 'VENCIMENTO',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (value: Date) => dayjs(value).format("MM/YYYY"),
      width: 100
    },
  ];

  useEffect(() => {
    setIsLoading(true)
    ListLoansService().then((res) => {
      const { data } = res
      setLoans(data.data)
    })
    setIsLoading(false)
  }, [])

  const handleBackPage = () => {
    router.push("/")
  }

  return (
    <Box
      display="flex"
      minHeight="100vh"
      flexDirection="column"
      alignItems="center"
      bgcolor="grey.100"
      px={2}
      py={8}
    >
      <Typography variant="h3" component="h3" color="grey.500" fontWeight="100" mb={8}>Empréstimos efetivados.</Typography>

      {
        isLoading ?
          (
            <CircularProgress />
          ) :
          (
            <Box bgcolor="white" px={4} py={2} borderRadius={2}>
              <Button variant="contained" onClick={handleBackPage} style={{ margin: '1rem 0' }} endIcon={<Add />}>NOVA SIMULAÇÃO</Button>
              <DataGrid
                rows={loans}
                columns={columns}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSorting
                disableColumnResize
                hideFooterPagination={true}
                sx={{ border: 'none' }}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5, },
                  }
                }}
              />
            </Box>

          )
      }
    </Box >
  );
}
