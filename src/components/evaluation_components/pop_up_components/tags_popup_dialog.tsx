import React from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetClientTag } from "../../../features/evaluation/client_tag/client_tagSlice";
import { IClientTagResponse, addClientTag, removeaClientTag } from '../../../action_creators/evaluation/client_tag';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../table_components/table_row_cell';


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function EditTagsPopupDialog(props: SimpleDialogProps) {

    const dispatch = useAppDispatch();
    
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        setTagInput("");
        dispatch(resetClientTag());
        setCheckEmpty(0);
        onClose(selectedValue);
    };

    const clientTagsInfo = useAppSelector((state) => state.client_tag.clientTags);

    const incomingCalls = useAppSelector((state) => state.coming_call.comingCalls);

    const clientInfo = useAppSelector((state) => state.client_predict_value.clients);



    const [tagInput, setTagInput] = React.useState("");
    const [removetagId, setRemoveTagId] = React.useState("");
    const [checkEmpty, setCheckEmpty] = React.useState(0);

    let client_tag_info: IClientTagResponse;

    const handleClickOpen = (clientId: string) => {
        if(tagInput === "") {
            setCheckEmpty(1);
        } else {
            let tagDescription = tagInput;
            client_tag_info = {
                tag_description: tagDescription,
                client_predict_value_id: clientId,
            };
            dispatch(addClientTag(client_tag_info));
            setCheckEmpty(2);
            setTagInput("");
        }
    };

    const handleRemove = (tagId: string) => {
        dispatch(removeaClientTag(tagId));
        setCheckEmpty(3);
        setdeleteConfirmationOpen(false);
    }

    let tag = "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTagInput(e.target.value);
    }

    const addTagStatus = useAppSelector((state) => state.client_tag.clientTagStatus);

    const [deleteConfirmationOpen, setdeleteConfirmationOpen] = React.useState(false);

    const handleClickdeleteConfirmationOpen = (tagId: string) => {
        setRemoveTagId(tagId);
        setdeleteConfirmationOpen(true);
    };

    const handleClosedeleteConfirmation = () => {
        setRemoveTagId("");
        setdeleteConfirmationOpen(false);
    };

    return (
        <Dialog onClose={handleClose} open={open}
            PaperProps={{sx: { height: 800, width: 600, padding: "2rem"}}}>
            <div>
            <Dialog
                open={deleteConfirmationOpen}
                onClose={handleClosedeleteConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Delete client tag"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this client tag?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                style={{marginRight: "0.5rem"}}
                onClick={() => handleRemove(removetagId)}
                variant="contained"
                color="error"
                >Delete</Button>
                <Button 
                onClick={handleClosedeleteConfirmation}
                autoFocus
                variant="contained"
                color="primary"
                >
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
                {clientTagsInfo.length === 0 &&
                    <>
                        <DialogTitle color="primary">Client Tags Edit Page</DialogTitle>
                        <div>
                            <div className="add-tag">
                                <p className="add-tag-bar-lable"><b>Add Your First Tag: </b></p>
                                <div className="add-tag-input-n-button">
                                    <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Tag"
                                    placeholder="Enter New Tag Here"
                                    onChange={handleChange}
                                    value={tagInput}
                                    />
                                    <Button 
                                    className="client-tag-add-button"
                                    size="large"
                                    style={{padding: "0.8rem 2rem"}}
                                    variant="contained"
                                    color="info"
                                    onClick=
                                    {() => handleClickOpen
                                        (clientInfo[0].client_predict_value_id)}
                                    >Add</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {clientTagsInfo.length > 0 &&
                    <>
                    <DialogTitle color="primary">Client Tags Edit Page</DialogTitle>
                    <div>
                        <div className="add-tag">
                            <p className="add-tag-bar-lable"><b>New Tag: </b></p>
                            <div className="add-tag-input-n-button">
                                <TextField
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                label="Tag"
                                placeholder="Enter New Tag Here"
                                onChange={handleChange}
                                value={tagInput}
                                />
                                <Button 
                                className="client-tag-add-button"
                                size="large"
                                style={{padding: "0.8rem 2rem"}}
                                variant="contained"
                                color="info"
                                onClick=
                                {() => handleClickOpen
                                    (clientTagsInfo[0].client_predict_value_id)}
                                >Add</Button>
                            </div>
                        </div>
                        {checkEmpty === 1 &&
                            <Alert className="client-tag-add-alert" severity="warning">
                                The client tag cannot be empty.</Alert>
                        }

                        {/* {addTagStatus === "ERROR" &&
                            <Alert className="client-tag-add-alert" severity="warning">
                                Something went wrong trying to add new client tag.</Alert>
                        } */}

                        {checkEmpty === 2 &&
                            <Alert className="client-tag-add-alert" severity="success">
                                The client tag added. <b>Click Refresh Table</b> button to see the changes.
                            </Alert>
                        }

                        {checkEmpty === 3 &&
                            <Alert className="client-tag-add-alert" severity="success">
                                The client tag removed. <b>Click Refresh Table</b> button to see the changes.
                            </Alert>
                        }

                    </div>
                    
                        <TableContainer sx={{ maxWidth: 600, maxHeight: 800, 
                            margin: "1rem auto" }}
                            component={Paper}>
                            <Table aria-label="Client Query Table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell><b>Tags</b></StyledTableCell>
                                        <StyledTableCell align="right">  </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                            {clientTagsInfo.map((eachTag, index) => {

                                tag = eachTag.tag_description;

                                return (
                                    <StyledTableRow id={eachTag.tag_id} 
                                    key={index}>
                                        <StyledTableCell component="th" scope="row">
                                        <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        fullWidth
                                        value={tag}
                                        inputProps={{ readOnly: true, }}
                                        onChange={handleChange}
                                        />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                        <Button 
                                        className="client-tag-delete-button"
                                        size="large"
                                        style={{padding: "0.85rem 1.5rem"}}
                                        variant="outlined"
                                        color="error"
                                        onClick=
                                        {() => handleClickdeleteConfirmationOpen
                                            (eachTag.tag_id as string)}
                                        >Remove</Button>
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