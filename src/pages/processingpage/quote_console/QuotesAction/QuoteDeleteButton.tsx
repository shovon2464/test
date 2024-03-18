import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import "../../../../style_components/processingpages/quote_console/quoteConsole.css";
import {
  IDeleteInfo,
  removeQuote,
} from "../../../../action_creators/quote/quote_list";

interface QuoteDeleteButtonProps {
  Type: number;
  FullName: string;
  SubmitDate: any;
}

const QuoteDeleteButton: React.FC<QuoteDeleteButtonProps> = (props) => {
  const { Type, FullName, SubmitDate } = props;
  const dispatch = useAppDispatch();
  const quoteList = useAppSelector((state) => state.quoteList.quote);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  React.useState(false);

  const handleOpenDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleOnClick = () => {
    let quote: IDeleteInfo = {
      Type: Type,
      FullName: FullName,
      SubmitDate: SubmitDate,
    };
    dispatch(removeQuote(quote));
    setDeleteConfirmationOpen(false);

  };

  return (
    <>
      <ContainedErrorButton
        className="quote-delete-button"
        onClick={handleOpenDeleteConfirmation}
      >
        Delete
      </ContainedErrorButton>
      <Dialog
        className="quote-delete-confirmation-dialog"
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle className="delete-quote-dialog">
          Delete Quote
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleCloseDeleteConfirmation}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <DialogContentText>
            The selected quote will be deleted, are you sure you want to do
            this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedErrorButton
            className="delete-quote-confirm-button"
            onClick={handleOnClick}
          >
            Delete
          </OutlinedErrorButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuoteDeleteButton;
