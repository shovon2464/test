import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Alert, Button, TextField } from '@mui/material';
import SearchClientPopupDialog from '../../../features/evaluation/popup_components/client_popup_dialog';
import { resetClient } from '../../../features/evaluation/client_predict_value/client_predict_valueSlice';
import { retrieveClientInfoByPhoneNumber } from '../../../action_creators/evaluation/client_predict_value';

const PhoneNumberSearch: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleClickOpen = () => {
        dispatch(resetClient());
        let formated_phone = searchInput.substring(0,3)+"-"+searchInput.substring(3,6)+
        "-"+searchInput.substring(6,11)
        dispatch(retrieveClientInfoByPhoneNumber(formated_phone));
        checkInput = searchInput;
        if (checkInput !== "") {
            setOpen(true);
        }
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    let checkInput = "";

    const [searchInput, setSearchInput] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value.trim());
    }

    const dispatch = useAppDispatch();

    const searchStatus = useAppSelector((state) => state.client_predict_value.clientStatus);

    return (
    <div className="phone-number-search">
        <p className="search-bar-lable">Enter a phone number to find a client: </p>
        <div className="search-input-n-button">
            <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            placeholder="7801234567"
            onChange={handleChange}
            value={searchInput}
            />
            <Button 
            className="phone-number-search-button"
            size="large"
            variant="contained"
            color="info"
            onClick={handleClickOpen}
            >Search</Button>
            <SearchClientPopupDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>

        {checkInput === "" && searchStatus === "ERROR" &&
            <Alert className="phone-number-search-alert" severity="warning">
                The phone number cannot be null or it does not entered in the correct format 
                (e.g. 7801112222).</Alert>
        }

        {searchStatus === "SUCCESS" &&
            <Alert className="phone-number-search-alert" severity="success">The client info 
            retrieved.</Alert>
        }
    </div>
    );
}

export default PhoneNumberSearch;