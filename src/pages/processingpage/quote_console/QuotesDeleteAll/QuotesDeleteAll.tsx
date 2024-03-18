import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import "../../../../style_components/processingpages/quote_console/quoteConsole.css";
import {
  IDeleteInfo,
  IQuoteListResponse,
  removeQuote,
} from "../../../../action_creators/quote/quote_list";

const DeleteAllQuotes: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const webQuoteList = useAppSelector((state) => state.quoteList.webQuotes);
  const quickQuoteList = useAppSelector((state) => state.quoteList.quickQuotes);
  const newQuoteList = webQuoteList.concat(quickQuoteList); 
  const viewed:IQuoteListResponse[] = [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const checkIfEmpty = () => {
    if (newQuoteList.length > 0) {
      newQuoteList.forEach((quote) => {
        if (quote.Viewed === 1) {
          viewed.push(quote);
        }
      });
      if (viewed.length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }

  };

  const handleDeleteAllQuote = () => {
    viewed.forEach((element) => {
      let quote: IDeleteInfo = {
        Type: element.Type,
        FullName: element.FullName,
        SubmitDate: element.SubmitDate,
      };
      dispatch(removeQuote(quote));
    });
    setOpen(false);
  };

  return (
    <>
      <ContainedErrorButton
        className="delete-all-quotes-button"
        onClick={handleClickOpen}
      >
        {" "}
        Delete All
      </ContainedErrorButton>

      <Dialog
        className="quote-delete-all-confirmation-dialog"
        open={open}
        onClose={handleClickClose}
      >
        <DialogTitle className="delete-all-quotes-dialog">
          Delete All Viewed Quotes
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleClickClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <DialogContentText>
            All viewed quotes will be deleted, are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedErrorButton
            className="delete-all-quote-confirm-button"
            onClick={handleDeleteAllQuote}
            hidden={checkIfEmpty()}
          >
            Delete
          </OutlinedErrorButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAllQuotes;
