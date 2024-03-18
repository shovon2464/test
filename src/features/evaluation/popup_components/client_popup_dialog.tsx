import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useAppSelector } from "../../../app/hooks";
import theme from "../../../style_components/global_theme_provider";
import { StyledTableCell } from '../../../components/evaluation_components/table_components/table_row_cell';
import { StyledTableRow } from '../../../components/share_components/CustomizedTable/CustomizedTable';
import { ThemeProvider } from 'styled-components';


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function SearchClientPopupDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const clientsInfo = useAppSelector((state) => state.client_predict_value.clients);

    return (
        <Dialog onClose={handleClose} open={open}
            PaperProps={{sx: { height: 500, padding: "2rem"}}}>
            <div>
                {clientsInfo.length <= 0 &&
                    <>
                    <DialogTitle color="error">Oops...!</DialogTitle>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                The phone number does not exist in the database, please try 
                                again.
                            </Alert>
                        </Stack>
                    </>
                }
                {clientsInfo.length > 0 &&
                    <>
                    <DialogTitle color="primary">Calls Query Table</DialogTitle>
                        <TableContainer sx={{ maxWidth: 600, maxHeight: 500, 
                            margin: "1rem auto" }}
                            component={Paper}>
                            <Table aria-label="Client Query Table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell><b>Client Name</b></StyledTableCell>
                                        <StyledTableCell align="right"><b>Predict Value</b>
                                        </StyledTableCell>
                                        <StyledTableCell align="right"><b>Tags</b>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                            {clientsInfo.map((foundClient, index) => {
                                let valueRange = "";

                                let predictValue = foundClient.predict_value;
                                
                                if ( predictValue < 0 ) {
                                    valueRange = "Negative";
                                }
                                if ( predictValue === 0 ) {
                                    valueRange = "Leads";
                                }
                                if ( predictValue > 0 && predictValue <= 50 ) {
                                    valueRange = "Low";
                                }
                                if ( predictValue > 50 && predictValue <= 150 ) {
                                    valueRange = "Medium";
                                }
                                if ( predictValue > 150 ) {
                                    valueRange = "High";
                                }
                                
                                let clientTags = 
                                    foundClient.client_tag?.map(a => {
                                        let eachTag = a.tag_description;
                                        return (
                                            <Chip label={eachTag} color="info" 
                                            sx={{ marginRight:"0.5rem", marginBottom:"0.3rem" }} 
                                            clickable/>
                                        )
                                    });
                                
                                return (
                                    <StyledTableRow id={foundClient.client_predict_value_id} 
                                    key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            {foundClient.client_name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {valueRange}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <ThemeProvider theme={theme}>
                                                {clientTags}
                                            </ThemeProvider>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            </div>
        </Dialog>
        );
    }