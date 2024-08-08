import { Box, Button, MenuItem, Select, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { convertMoney } from "@/utils/convertMoney";
import dayjs from "dayjs";


export default async function Loans() {

  const columns: any[] = [
    { field: 'cpf', headerName: 'CPF' },
    { field: 'id', headerName: 'SALDO DEVEDOR', valueGetter: (value: number) => convertMoney(value), width: 150 },
    { field: 'interest', headerName: 'JUROS', valueGetter: (value: number) => convertMoney(value), width: 120 },
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

  const loans: any = [];


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
      <Typography variant="h3" component="h3" color="grey.500" fontWeight="100" mb={8}>Empréstimos efetivados.</Typography>

      <Box>
        <Typography variant="subtitle1" component="p" fontWeight="700" color="grey.600" fontSize="12px" textAlign="left" mt={8} mb={2}>PROJEÇÃO DAS PARCELAS:</Typography>

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
    </Box>
  );
}
