import { Box, Typography } from "@mui/material";

interface IProps {
  title: string;
  info: string;
}
function ProspectionInfo({ info, title }: IProps) {
  return (
    <Box>
      <Typography variant="subtitle1" component="p" fontWeight="700" color="grey.600" fontSize="12px">{title}</Typography>
      <Typography variant="subtitle1" component="p" fontWeight="700" fontSize="18px">{info}</Typography>
    </Box>
  )
}
export { ProspectionInfo }