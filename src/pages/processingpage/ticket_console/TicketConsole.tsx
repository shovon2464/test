import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import '../../../style_components/processingpages/ticket_console/TicketConsole.css';
import { gql, useQuery, useSubscription } from "@apollo/client";
import {
  IconButton,
  Drawer,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Badge,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Tooltip,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  ContainedSuccessButton
} from "../../../style_components/buttons/styled_contained_buttons";
import {
  TextPrimaryButton
} from "../../../style_components/buttons/styled_text_buttons";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import {
  OutlinedErrorButton
} from "../../../style_components/buttons/styled_outlined_buttons";
import {
  getAllTicketTrackingsByName,
  getTicketTrackingByName,
  addNewTicketTracking
} from "../../../services/ticket/ticket_tracking/ticket_tracking";
import { addNewTicketFile } from "../../../services/ticket/ticket_files/ticket_files";
import {
  ITicketsRequest,
  ITicketsResponse,
  retrieveAllTickets,
  retrieveAllTicketsByUserId,
  createNewTicket,
  closeTicketAndRelatedRecords

} from "../../../action_creators/ticket/ticket/ticket";
import {
  ITicketCommentsRequest,
  retrieveAllTicketCommentsByTicketId,
  createNewTicketComment,
  addNewTicketCommentFile
} from "../../../action_creators/ticket/ticket_comments/ticket_comments";
import {
  ITicketTrackingsRequest,
  ITicketTrackingsResponse
} from "../../../action_creators/ticket/ticket_tracking/ticket_tracking";
import {
  getBrokerName,
  getUserRole,
  key
} from "../../../services/auth/getKey";
import { TicketComments } from "./TicketComments";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { toBase64 } from "../../../components/share_components/PdfCreator/ToBase64";

const ALLTICKETS_SUBSCRIPTION = gql`
  subscription TicketsList {
    allTicketsChange {
      Ticket_Id
      Create_By
      Date
      Title
      Description
    }
  }
`;

const TICKETS_BY_ID_SUBSCRIPTION = gql`
  subscription TicketsListByID($create_by: String!){
    ticketsByIdChange (Create_By: $create_by) {
      Ticket_Id
      Create_By
      Date
      Title
      Description
    }
}
`;

const CHATS_SUBSCRIPTION = gql`
  subscription OnNewChat($ticket_id: String!) {
    ticketCommentSent (Ticket_Id: $ticket_id){
      Ticket_Comment_Id
      Comment_Date
      Ticket_Id
      Comment_By
      Comment
      File_URL
    }
  }
`;

const TICKETS_TRACKING_SUBSCRIPTION = gql`
  subscription OnTicketTrackingChanges($comment_by: String!){
    ticketTrackingChange 
    (Comment_By: $comment_by) {
      Ticket_Tracking_Id
      Ticket_Id
      Comment_By
    }
}
`;

export const TicketConsole: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [openTicketDescription, setOpenTicketDescription] = useState(0);
  const [openTicket, setOpenTicket] = useState(-1);
  const [detailNCommentTicketId, setDetailNCommentTicketId] = useState("");
  const [ticketTitleInput, setTicketTitleInput] = useState("");
  const [ticketDescriptionInput, setTicketDescriptionInput] = useState("");
  const [ticketCommentInput, setTicketCommentInput] = useState("");
  const [commentOrCloseTicketId, setCommentOrCloseTicketId] = useState("");
  const [checkCommentInput, setCheckCommentInput] = useState(0);
  const [checkNewTicketInput, setCheckNewTicketInput] = useState(0);
  const [allTicketTrackingsList, setAllTicketTrackingsList] =
    useState<ITicketTrackingsResponse[]>([]);
  const [checkCloseable, setCheckCloseable] = useState("");
  const [closeConfirmationOpen, setCloseConfirmationOpen] = useState(false);
  const [updateTrackingList, setUpdateTrackingList] =
    useState<ITicketTrackingsResponse[]>([]);
  const [updateBrokerTicketsList, setUpdateBrokerTicketsList] =
    useState<ITicketsResponse[]>([]);
  const [reachedBottom, setReachedBottom] = useState(0);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [checkuploadingFile, setCheckUploadingFile] = useState(0);
  const [showSendIcon, setShowSendIcon] = useState(0);
  const [errorSpace, setErrorSpace] = useState(0);

  const messagesRef = useRef<any>(null);

  const tickets = useAppSelector((state) => state.ticketList.tickets);
  const ticketComments = useAppSelector((state) =>
    state.ticketCommentsList.ticketComments);
  const name = getBrokerName();
  const role = getUserRole();
  const AccessToken = key();
  let newTicket: ITicketsRequest;
  let newTicketComment: ITicketCommentsRequest;
  let ticketTracking: ITicketTrackingsResponse[];

  const handleScroll: React.EventHandler<React.UIEvent<HTMLDivElement>> =
    (event: React.UIEvent<HTMLDivElement>) => {
      const target: EventTarget = event.target;
      const targetDiv: HTMLDivElement = target as HTMLDivElement;
      if (targetDiv.scrollHeight - targetDiv.scrollTop === targetDiv.clientHeight) {
        setReachedBottom(1);
      } else {
        if (reachedBottom !== 2) {
          setReachedBottom(2);
        }
      }
    };

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ticketComments]);

  const checkEachTicketTracking = async () => {
    if (role === "manager" || role === "assistant") {
      dispatch(retrieveAllTickets({}));
    } else {
      dispatch(retrieveAllTicketsByUserId(name));
    }
    let allTicketTrackingsArray: ITicketTrackingsResponse[] = [];
    let trackingResult = await getAllTicketTrackingsByName(name);
    ticketTracking = trackingResult.data.findAllTrackingsByName;
    if (ticketTracking.length > 0) {
      ticketTracking.forEach(value => {
        allTicketTrackingsArray.push(value);
      })
    }
    setAllTicketTrackingsList(allTicketTrackingsArray);
  }

  useEffect(() => {
    checkEachTicketTracking().catch(console.error);
  }, []);


  const handleDrawerOpen = () => {
    checkEachTicketTracking();
    setOpen(true);
  };

  const handleDrawerClose = async (lastViewedTicketId: string) => {
    if (lastViewedTicketId !== "") {
      const ticketTrackingInfo: ITicketTrackingsRequest = {
        Ticket_Id: lastViewedTicketId,
        Comment_By: name
      }
      const updateTracking = await addNewTicketTracking(ticketTrackingInfo);
    }
    checkEachTicketTracking();
    setOpen(false);
    setOpenTicket(-1);
    setCommentOrCloseTicketId("");
    setOpenTicketDescription(0);
    setTicketTitleInput("");
    setTicketDescriptionInput("");
    setCheckCloseable("");
    setCheckCommentInput(0);
    setCheckUploadingFile(0);
    setCheckNewTicketInput(0);
    setErrorSpace(0);
    setTicketCommentInput("");
    setDetailNCommentTicketId("");
    setReachedBottom(0);
    setShowSendIcon(0);
  }

  const handleBackToAllTickets = async (lastViewedTicketId: string) => {
    if (lastViewedTicketId !== "") {
      const ticketTrackingInfo: ITicketTrackingsRequest = {
        Ticket_Id: lastViewedTicketId,
        Comment_By: name
      }
      const updateTracking = await addNewTicketTracking(ticketTrackingInfo);
    }
    if (role === "manager" || role === "assistant") {
      dispatch(retrieveAllTickets({}));
    } else {
      dispatch(retrieveAllTicketsByUserId(name));
    }
    setOpenTicket(-1);
    setCommentOrCloseTicketId("");
    setOpenTicketDescription(0);
    setCheckCloseable("");
    setCheckCommentInput(0);
    setCheckUploadingFile(0);
    setCheckNewTicketInput(0);
    setErrorSpace(0);
    setTicketCommentInput("");
    setDetailNCommentTicketId("");
    setReachedBottom(0);
    setShowSendIcon(0);
  }

  const handleOpenTicketDetails =
    async (createdBy: string, index: number, ticketId: string) => {
      let fetchParams: ITicketCommentsRequest;
      fetchParams = {
        Ticket_Id: ticketId,
        Comment_By: name
      }
      dispatch(retrieveAllTicketCommentsByTicketId(fetchParams));
      setOpenTicketDescription(0);
      setDetailNCommentTicketId(ticketId);
      setCheckCloseable(createdBy);
      setOpenTicket(index);
      setCommentOrCloseTicketId(ticketId);
      const checkTracking = await getTicketTrackingByName(ticketId, name);
      ticketTracking = checkTracking.data.findTicketTrackingByName;
      if (
        ticketTracking.length <= 0 &&
        !ticketTracking.find(item => item.Comment_By.includes(name))
      ) {
        const ticketTrackingInfo: ITicketTrackingsRequest = {
          Ticket_Id: ticketId,
          Comment_By: name
        }
        const updateTracking = await addNewTicketTracking(ticketTrackingInfo);
      }
      checkEachTicketTracking();
      newTicketComment = {
        Comment: "",
        Ticket_Id: "",
        Comment_By: ""
      };
      // scrollToBottom();
    }

  const handleTicketTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTicketTitleInput(e.target.value);
    setCheckNewTicketInput(0);
  }

  const handleTicketDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTicketDescriptionInput(e.target.value);
    setCheckNewTicketInput(0);
  }

  const handleTicketCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTicketCommentInput(e.target.value);
    setCheckCommentInput(0);
    setCheckUploadingFile(0);
    setErrorSpace(0);
    if (e.target.value === "") {
      setShowSendIcon(0);
    } else {
      setShowSendIcon(1);
    }
  }

  const handlePostNewTicket = () => {
    if (ticketTitleInput.trim() === "" || ticketDescriptionInput.trim() === "") {
      setCheckNewTicketInput(1);
    } else {
      newTicket = {
        Create_By: name,
        Title: ticketTitleInput,
        Description: ticketDescriptionInput
      };
      dispatch(createNewTicket(newTicket))
        .unwrap()
        .then(() => {
          setOpenTicketDescription(0);
        })
        .catch((error) => {
          console.log(error);
        });
      setTicketTitleInput("");
      setTicketDescriptionInput("");
    }
  }

  const handlePressEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (ticketCommentInput.trim() === "") {
        setCheckCommentInput(1);
        setErrorSpace(1);
      } else {
        setShowSendIcon(0);
        handlePostNewComment();
        setShowSendIcon(0);
      }
    }
    // handlePostNewComment();
  }

  const handlePostNewComment = () => {
    if (ticketCommentInput.trim() === "") {
      setCheckCommentInput(1);
      setErrorSpace(1);
    } else {
      newTicketComment = {
        Comment: ticketCommentInput,
        Ticket_Id: commentOrCloseTicketId,
        Comment_By: name
      }
      dispatch(createNewTicketComment(newTicketComment))
        .unwrap()
        .then(() => {
          setTicketCommentInput("");
          setShowSendIcon(0);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const handleClosetTicket = () => {
    if (commentOrCloseTicketId !== "") {
      const ticketId = commentOrCloseTicketId;
      dispatch(closeTicketAndRelatedRecords(ticketId))
        .unwrap()
        .then(() => {
          setCloseConfirmationOpen(false);
          handleBackToAllTickets("");
          handleDrawerOpen();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleOpenDeleteConfirmation = () => {
    setCloseConfirmationOpen(true);
  }

  const handleCloseCloseConfirmation = () => {
    setCloseConfirmationOpen(false);
  }

  const { loading, error, data } =
    useSubscription(ALLTICKETS_SUBSCRIPTION, {
      context: {
        Headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + AccessToken,
        }
      }
    });

  const brokerTicketsList =
    useSubscription(TICKETS_BY_ID_SUBSCRIPTION, {
      variables: { create_by: name },
      context: {
        Headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + AccessToken,
        }
      }
    });

  useEffect(() => {
    if (brokerTicketsList.data) {
      const updateTicketsList = brokerTicketsList.data.ticketsByIdChange;
      setUpdateBrokerTicketsList(updateTicketsList);
    }
  }, [brokerTicketsList.data])

  const CheckTicketTracking =
    useSubscription(TICKETS_TRACKING_SUBSCRIPTION, {
      variables: { comment_by: name },
      context: {
        Headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + AccessToken,
        }
      }
    });

  useEffect(() => {
    if (CheckTicketTracking.data) {
      const updateTrackingsList = CheckTicketTracking.data.ticketTrackingChange;
      setUpdateTrackingList(updateTrackingsList);
    }
  }, [CheckTicketTracking.data])

  const TicketCommentsList =
    useSubscription(CHATS_SUBSCRIPTION, {
      variables: { ticket_id: detailNCommentTicketId },
      context: {
        Headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + AccessToken,
        }
      }
    });

  // useEffect(() => {
  //   if (TicketCommentsList.data) {
  //     const updateTicketCommentsList = TicketCommentsList.data.ticketCommentSent;
  //     setUpdateTicketCommentsList(updateTicketCommentsList);
  //   }
  // }, [TicketCommentsList.data])

  const coverBase64 = async (value: any) => {
    const fileBase64 = await toBase64(value);
    if (typeof fileBase64 === "string") {
      const bytes = fileBase64.split(",")[1];
      const fileBytesWithBrace = "{" + bytes + "}";
      return fileBytesWithBrace;
    }
    return "";
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setCheckCommentInput(0);
      const uploadedFile =
        event.currentTarget.files instanceof FileList
          ? event.currentTarget.files[0] : { name: "", type: "", size: "" };

      setUploadingFile(true);
      if (uploadedFile["type"] !== "") {
        const fileName = uploadedFile["name"];
        const fileType = uploadedFile["type"];
        const fileSize = uploadedFile["size"];
        const fileBase64 = await coverBase64(uploadedFile);

        if (
          fileType !== "image/jpg" &&
          fileType !== "image/jpeg" &&
          fileType !== "image/png" &&
          fileType !== "application/pdf") {
          setCheckUploadingFile(1);
          setUploadingFile(false);
          setErrorSpace(1);
        } else if (fileSize > (30 * 1024 * 1024)) {
          setCheckUploadingFile(2);
          setUploadingFile(false);
          setErrorSpace(1);
        } else {
          await addNewTicketFile(
            fileBase64,
            fileName,
            fileType
          ).then((res) => {
            // console.log(res);
            const FileURL = res.data.uplaodTicketFile.File_URL;
            const FileName = res.data.uplaodTicketFile.File_Name;
            newTicketComment = {
              Comment: FileName,
              Ticket_Id: commentOrCloseTicketId,
              Comment_By: name,
              File_URL: FileURL
            }
            dispatch(addNewTicketCommentFile(newTicketComment))
              .unwrap()
              .then(() => {
                setCheckUploadingFile(0);
                setUploadingFile(false);
              })
              .catch((error) => {
                setCheckUploadingFile(0);
                setUploadingFile(false);
                console.log(error);
              })
          })
            .catch((error) => {
              setCheckUploadingFile(0);
              setUploadingFile(false);
              throw Error(error);
            });
        }

      }
    } catch (err) {
      setCheckUploadingFile(0);
      setUploadingFile(false);
      console.log(err);
    }
  }

  if (loading) return (
    <>
      <div>
        <Dialog
          className="completed-task-delete-confirmation-dialog"
          open={closeConfirmationOpen}
          onClose={handleCloseCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="matching-task-confirmation-dialog" id="alert-dialog-title">
            <h4>Delete Ticket</h4>
            <IconButton
              className="dialog-close-icon-button"
              aria-label="close"
              onClick={handleCloseCloseConfirmation}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider variant="middle"></Divider>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The ticket will be deleted, are you sure you want to do this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <OutlinedErrorButton
              className="delete-task-confirm-button"
              onClick={() => handleClosetTicket()}
            >Delete</OutlinedErrorButton>
          </DialogActions>
        </Dialog>
        <div className="ticket-icon-container">
          {tickets.length === allTicketTrackingsList.length ? (
            <IconButton
              className="ticket-drawer-icon-button"
              onClick={handleDrawerOpen}
            >
              <ChatBubbleIcon
                className="ticket-drawer-icon-button-icon"
              />
            </IconButton>
          ) : (
            <Badge
              className="ticket-icon-badge"
              badgeContent=" "
              overlap="circular"
            >
              <IconButton
                className="ticket-drawer-icon-button"
                onClick={handleDrawerOpen}
              >
                <ChatBubbleIcon
                  className="ticket-drawer-icon-button-icon"
                />
              </IconButton>
            </Badge>
          )}
        </div>
        <Drawer
          className="ticket-drawer"
          anchor="bottom"
          open={open}
        >
          <div className="ticket-drawer-header">
            {openTicket === -1 ? (
              <h4>Tickets</h4>
            ) : (
              <>
                <IconButton
                  className="ticket-back-icon-button"
                  onClick={() => handleBackToAllTickets(detailNCommentTicketId)}
                >
                  <ArrowBackIosNewIcon className="ticket-back-icon-button-icon" />
                </IconButton>
                <h4>Ticket Details</h4>
              </>
            )}
            <IconButton
              className="ticket-drawer-close-button"
              onClick={() => handleDrawerClose(detailNCommentTicketId)}
            >
              <RemoveIcon
                className="ticket-drawer-close-button-icon"
              />
            </IconButton>
          </div>
          <div className="ticket-drawer-container">
            {tickets.length > 0 ? (
              <div className={`ticket-drawer-post-container ${errorSpace === 1 ?
                ("show-comments") : ("")} ${openTicketDescription === 1 ?
                  ("show-description") : ("")}`} onScroll={handleScroll}>
                {tickets.map((row: any, index: number) => (
                  <>
                    {openTicket === index && (
                      <>
                        <Card className="ticket-detail-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                          <CardContent>
                            <Typography className="ticket-user-name">
                              {row.Create_By}
                            </Typography>
                            <Typography className="ticket-detail-title">
                              {row.Title}
                            </Typography>
                            <Typography className="ticket-description">
                              {row.Description}
                            </Typography>
                            <Typography className="ticket-date">
                              {String(row.Date)
                                .replace(/.\d+Z$/g, "Z")
                                .replace('T', ' ')
                                .replace('Z', '')}
                            </Typography>
                          </CardContent>
                        </Card>
                        <div className="ticket-message-divider">
                          <Divider>
                            <Chip label="Messages" />
                          </Divider>
                        </div>
                        <div className="ticket-comments-container" ref={messagesRef}>
                          <TicketComments ticketId={detailNCommentTicketId} />
                        </div>
                      </>
                    )}
                    {openTicket === -1 && (
                      <>
                        {!allTicketTrackingsList.find(item => item.Ticket_Id.includes(row.Ticket_Id)) ? (
                          <Badge
                            className="ticket-unread-badge"
                            badgeContent=" "
                          >
                            <Card className="ticket-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                              <CardActionArea
                                onClick={() =>
                                  handleOpenTicketDetails(row.Create_By, index, row.Ticket_Id)}
                              >
                                <CardContent>
                                  <Typography className="ticket-user-name">
                                    {row.Create_By}
                                  </Typography>
                                  <Typography className="ticket-title">
                                    {row.Title}
                                  </Typography>
                                  <Typography className="ticket-date">
                                    {String(row.Date)
                                      .replace(/.\d+Z$/g, "Z")
                                      .replace('T', ' ')
                                      .replace('Z', '')}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Badge>
                        ) : (
                          <Card className="ticket-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                            <CardActionArea
                              onClick={() =>
                                handleOpenTicketDetails(row.Create_By, index, row.Ticket_Id)}
                            >
                              <CardContent>
                                <Typography className="ticket-user-name">
                                  {row.Create_By}
                                </Typography>
                                <Typography className="ticket-title">
                                  {row.Title}
                                </Typography>
                                <Typography className="ticket-date">
                                  {String(row.Date)
                                    .replace(/.\d+Z$/g, "Z")
                                    .replace('T', ' ')
                                    .replace('Z', '')}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        )}
                      </>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <Typography
                className="no-ticket-notify"
              >There are no ticket at this moment.</Typography>
            )}
            <div className="ticket-drawer-post-text-field">
              {openTicketDescription === 1 && (
                <Divider className="close-desciption-arrow-down-icon">
                  <IconButton
                    onClick={() => {
                      setCheckNewTicketInput(0);
                      setOpenTicketDescription(0);
                    }}
                  >
                    <KeyboardDoubleArrowDownIcon />
                  </IconButton>
                </Divider>
              )}
              {openTicket === -1 ? (
                <>
                  <div className="create-new-ticket-container">
                    {checkNewTicketInput === 1 &&
                      <Alert
                        className="new-ticket-alert-input"
                        severity="error"
                      >
                        Ticket title or description cannot be empty.
                      </Alert>}
                    <TextField
                      id="create-new-field1"
                      label="Create New Ticket"
                      placeholder="Title"
                      variant="outlined"
                      value={ticketTitleInput}
                      onClick={() => setOpenTicketDescription(1)}
                      onChange={handleTicketTitleChange}
                    />
                    {openTicketDescription === 1 && (
                      <>
                        <TextField
                          id="create-new-field2"
                          label="Ticket Details"
                          placeholder="Description"
                          variant="outlined"
                          multiline
                          rows={3}
                          value={ticketDescriptionInput}
                          onChange={handleTicketDescriptionChange}
                        />
                        <ContainedSuccessButton
                          className="create-new-ticket-post-button"
                          onClick={() => handlePostNewTicket()}
                        >
                          post
                        </ContainedSuccessButton>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {reachedBottom === 2 && (
                    <>
                      {(checkCloseable === name || role === "manager") ? (
                        <Tooltip
                          title="Scroll to bottom"
                          placement="top"
                        >
                          <IconButton
                            className="scroll-to-bottom-icon-button"
                            onClick={() => scrollToBottom()}
                          >
                            <VerticalAlignBottomIcon className="scroll-to-bottom-icon" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Scroll to bottom"
                          placement="top"
                        >
                          <IconButton
                            className="scroll-to-bottom-icon-button-broker-view"
                            onClick={() => scrollToBottom()}
                          >
                            <VerticalAlignBottomIcon className="scroll-to-bottom-icon" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  )}
                  <div className="close-ticket-container">
                    {(checkCloseable === name || role === "manager") && (
                      <TextPrimaryButton
                        className="close-ticket-text-button"
                        onClick={handleOpenDeleteConfirmation}
                      >
                        Close Ticket
                      </TextPrimaryButton>
                    )}
                    {checkCommentInput === 1 &&
                      <Alert
                        className="ticket-comment-alert-input"
                        severity="error"
                      >
                        Message cannot be empty
                      </Alert>}
                    {checkuploadingFile === 1 &&
                      <Alert
                        className="ticket-comment-alert-input"
                        severity="error"
                      >
                        The uploading file type must be jpg, jpeg, png or pdf
                      </Alert>}
                    {checkuploadingFile === 2 &&
                      <Alert
                        className="ticket-comment-alert-input"
                        severity="error"
                      >
                        The uploading file is bigger than 30MB maximum size limit
                      </Alert>}
                    <div className="ticket-comment-text-field-container">
                      <TextField
                        className="ticket-comment-text-field"
                        id="replay-field1"
                        label="Reply"
                        variant="outlined"
                        value={ticketCommentInput}
                        onChange={handleTicketCommentChange}
                        onKeyDown={handlePressEnterKey}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              {showSendIcon === 1 ? (
                                <IconButton
                                  className="ticket-comment-send-button"
                                  edge="end"
                                  color="primary"
                                  onClick={() => handlePostNewComment()}
                                >
                                  <SendIcon />
                                </IconButton>
                              ) : (
                                <Tooltip
                                  title="Upload file"
                                  placement="top"
                                >
                                  <IconButton
                                    className="ticket-comment-file-upload-button"
                                    edge="start"
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    disabled={uploadingFile}
                                  >
                                    <input
                                      id="uploadFile"
                                      name="uploadFile"
                                      hidden
                                      accept="image/png, image/jpeg, image/jpg, application/pdf"
                                      type="file"
                                      onChange={(event) => handleUploadFile(event)}
                                    />
                                    {uploadingFile === true ? (
                                      <CircularProgress size={25} />
                                    ) : (
                                      <AttachFileIcon />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              )}
                            </InputAdornment>
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  )

  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <Dialog
        className="completed-task-delete-confirmation-dialog"
        open={closeConfirmationOpen}
        onClose={handleCloseCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="matching-task-confirmation-dialog" id="alert-dialog-title">
          <h4>Delete Ticket</h4>
          <IconButton
            className="dialog-close-icon-button"
            aria-label="close"
            onClick={handleCloseCloseConfirmation}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The ticket will be deleted, are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedErrorButton
            className="delete-task-confirm-button"
            onClick={() => handleClosetTicket()}
          >Delete</OutlinedErrorButton>
        </DialogActions>
      </Dialog>
      <div className="ticket-icon-container">
        {role === "manager" || role === "assistant" ? (
          <>
            {updateTrackingList.length === data.allTicketsChange.length ? (
              <IconButton
                className="ticket-drawer-icon-button"
                onClick={handleDrawerOpen}
              >
                <ChatBubbleIcon
                  className="ticket-drawer-icon-button-icon"
                />
              </IconButton>
            ) : (
              <Badge
                className="ticket-icon-badge"
                badgeContent=" "
                overlap="circular"
              >
                <IconButton
                  className="ticket-drawer-icon-button"
                  onClick={handleDrawerOpen}
                >
                  <ChatBubbleIcon
                    className="ticket-drawer-icon-button-icon"
                  />
                </IconButton>
              </Badge>
            )}
          </>
        ) : (
          <>
            {updateTrackingList.length === updateBrokerTicketsList.length ? (
              <IconButton
                className="ticket-drawer-icon-button"
                onClick={handleDrawerOpen}
              >
                <ChatBubbleIcon
                  className="ticket-drawer-icon-button-icon"
                />
              </IconButton>
            ) : (
              <Badge
                className="ticket-icon-badge"
                badgeContent=" "
                overlap="circular"
              >
                <IconButton
                  className="ticket-drawer-icon-button"
                  onClick={handleDrawerOpen}
                >
                  <ChatBubbleIcon
                    className="ticket-drawer-icon-button-icon"
                  />
                </IconButton>
              </Badge>
            )}
          </>
        )}
      </div>
      <Drawer
        className="ticket-drawer"
        anchor="bottom"
        open={open}
      >
        <div className="ticket-drawer-header">
          {openTicket === -1 ? (
            <h4>Tickets</h4>
          ) : (
            <>
              <IconButton
                className="ticket-back-icon-button"
                onClick={() => handleBackToAllTickets(detailNCommentTicketId)}
              >
                <ArrowBackIosNewIcon className="ticket-back-icon-button-icon" />
              </IconButton>
              <h4>Ticket Details</h4>
            </>
          )}
          <IconButton
            className="ticket-drawer-close-button"
            onClick={() => handleDrawerClose(detailNCommentTicketId)}
          >
            <RemoveIcon
              className="ticket-drawer-close-button-icon"
            />
          </IconButton>
        </div>
        <div className="ticket-drawer-container">
          {role === "manager" || role === "assistant" ? (
            <>
              {data.allTicketsChange.length > 0 ? (
                <div className={`ticket-drawer-post-container ${errorSpace === 1 ?
                  ("show-comments") : ("")} ${openTicketDescription === 1 ?
                    ("show-description") : ("")}`} onScroll={handleScroll}>
                  {data.allTicketsChange.map((row: any, index: number) => (
                    <>
                      {openTicket === index && (
                        <>
                          <Card className="ticket-detail-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                            <CardContent>
                              <Typography className="ticket-user-name">
                                {row.Create_By}
                              </Typography>
                              <Typography className="ticket-detail-title">
                                {row.Title}
                              </Typography>
                              <Typography className="ticket-description">
                                {row.Description}
                              </Typography>
                              <Typography className="ticket-date">
                                {String(row.Date)
                                  .replace(/.\d+Z$/g, "Z")
                                  .replace('T', ' ')
                                  .replace('Z', '')}
                              </Typography>
                            </CardContent>
                          </Card>
                          <div className="ticket-message-divider">
                            <Divider>
                              <Chip label="Messages" />
                            </Divider>
                          </div>
                          <div className="ticket-comments-container" ref={messagesRef}>
                            <TicketComments ticketId={detailNCommentTicketId} />
                          </div>
                        </>
                      )}
                      {openTicket === -1 && (
                        <>
                          {!updateTrackingList.find(item => item.Ticket_Id.includes(row.Ticket_Id)) ? (
                            <Badge
                              className="ticket-unread-badge"
                              badgeContent=" "
                            >
                              <Card className="ticket-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                                <CardActionArea
                                  onClick={() =>
                                    handleOpenTicketDetails(row.Create_By, index, row.Ticket_Id)}
                                >
                                  <CardContent>
                                    <Typography className="ticket-user-name">
                                      {row.Create_By}
                                    </Typography>
                                    <Typography className="ticket-title">
                                      {row.Title}
                                    </Typography>
                                    <Typography className="ticket-date">
                                      {String(row.Date)
                                        .replace(/.\d+Z$/g, "Z")
                                        .replace('T', ' ')
                                        .replace('Z', '')}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            </Badge>
                          ) : (
                            <Card className="ticket-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                              <CardActionArea
                                onClick={() =>
                                  handleOpenTicketDetails(row.Create_By, index, row.Ticket_Id)}
                              >
                                <CardContent>
                                  <Typography className="ticket-user-name">
                                    {row.Create_By}
                                  </Typography>
                                  <Typography className="ticket-title">
                                    {row.Title}
                                  </Typography>
                                  <Typography className="ticket-date">
                                    {String(row.Date)
                                      .replace(/.\d+Z$/g, "Z")
                                      .replace('T', ' ')
                                      .replace('Z', '')}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </div>
              ) : (
                <Typography
                  className="no-ticket-notify"
                >There are no ticket at this moment.</Typography>
              )}
            </>
          ) : (
            <>
              {updateBrokerTicketsList.length > 0 ? (
                <div className={`ticket-drawer-post-container ${errorSpace === 1 ?
                  ("show-comments") : ("")} ${openTicketDescription === 1 ?
                    ("show-description") : ("")}`} onScroll={handleScroll}>
                  {updateBrokerTicketsList.map((row: any, index: number) => (
                    <>
                      {openTicket === index && (
                        <>
                          <Card className="ticket-detail-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                            <CardContent>
                              <Typography className="ticket-user-name">
                                {row.Create_By}
                              </Typography>
                              <Typography className="ticket-detail-title">
                                {row.Title}
                              </Typography>
                              <Typography className="ticket-description">
                                {row.Description}
                              </Typography>
                              <Typography className="ticket-date">
                                {String(row.Date)
                                  .replace(/.\d+Z$/g, "Z")
                                  .replace('T', ' ')
                                  .replace('Z', '')}
                              </Typography>
                            </CardContent>
                          </Card>
                          <div className="ticket-message-divider">
                            <Divider>
                              <Chip label="Messages" />
                            </Divider>
                          </div>
                          <div className="ticket-comments-container" ref={messagesRef}>
                            <TicketComments ticketId={detailNCommentTicketId} />
                          </div>
                        </>
                      )}
                      {openTicket === -1 && (
                        <>
                          {!updateTrackingList.find(item => item.Ticket_Id.includes(row.Ticket_Id)) ? (
                            <Badge
                              className="ticket-unread-badge"
                              badgeContent=" "
                            >
                              <Card className="ticket-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                                <CardActionArea
                                  onClick={() =>
                                    handleOpenTicketDetails(row.Create_By, index, row.Ticket_Id)}
                                >
                                  <CardContent>
                                    <Typography className="ticket-user-name">
                                      {row.Create_By}
                                    </Typography>
                                    <Typography className="ticket-title">
                                      {row.Title}
                                    </Typography>
                                    <Typography className="ticket-date">
                                      {String(row.Date)
                                        .replace(/.\d+Z$/g, "Z")
                                        .replace('T', ' ')
                                        .replace('Z', '')}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            </Badge>
                          ) : (
                            <Card className="ticket-card" id={row.Ticket_Id} key={row.Ticket_Id}>
                              <CardActionArea
                                onClick={() =>
                                  handleOpenTicketDetails(row.Create_By, index, row.Ticket_Id)}
                              >
                                <CardContent>
                                  <Typography className="ticket-user-name">
                                    {row.Create_By}
                                  </Typography>
                                  <Typography className="ticket-title">
                                    {row.Title}
                                  </Typography>
                                  <Typography className="ticket-date">
                                    {String(row.Date)
                                      .replace(/.\d+Z$/g, "Z")
                                      .replace('T', ' ')
                                      .replace('Z', '')}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </div>
              ) : (
                <Typography
                  className="no-ticket-notify"
                >There are no ticket at this moment.</Typography>
              )}
            </>
          )}
          <div className="ticket-drawer-post-text-field">
            {openTicketDescription === 1 && (
              <Divider className="close-desciption-arrow-down-icon">
                <IconButton
                  onClick={() => {
                    setCheckNewTicketInput(0);
                    setOpenTicketDescription(0);
                  }}
                >
                  <KeyboardDoubleArrowDownIcon />
                </IconButton>
              </Divider>
            )}
            {openTicket === -1 ? (
              <>
                <div className="create-new-ticket-container">
                  {checkNewTicketInput === 1 &&
                    <Alert
                      className="new-ticket-alert-input"
                      severity="error"
                    >
                      Ticket title or description cannot be empty.
                    </Alert>}
                  <TextField
                    id="create-new-field1"
                    label="Create New Ticket"
                    placeholder="Title"
                    variant="outlined"
                    value={ticketTitleInput}
                    onClick={() => setOpenTicketDescription(1)}
                    onChange={handleTicketTitleChange}
                  />
                  {openTicketDescription === 1 && (
                    <>
                      <TextField
                        id="create-new-field2"
                        label="Ticket Details"
                        placeholder="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={ticketDescriptionInput}
                        onChange={handleTicketDescriptionChange}
                      />
                      <ContainedSuccessButton
                        className="create-new-ticket-post-button"
                        onClick={() => handlePostNewTicket()}
                      >
                        post
                      </ContainedSuccessButton>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {reachedBottom === 2 && (
                  <>
                    {(checkCloseable === name || role === "manager") ? (
                      <Tooltip
                        title="Scroll to bottom"
                        placement="top"
                      >
                        <IconButton
                          className="scroll-to-bottom-icon-button"
                          onClick={() => scrollToBottom()}
                        >
                          <VerticalAlignBottomIcon className="scroll-to-bottom-icon" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Scroll to bottom"
                        placement="top"
                      >
                        <IconButton
                          className="scroll-to-bottom-icon-button-broker-view"
                          onClick={() => scrollToBottom()}
                        >
                          <VerticalAlignBottomIcon className="scroll-to-bottom-icon" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
                <div className="close-ticket-container">
                  {(checkCloseable === name || role === "manager") && (
                    <TextPrimaryButton
                      className="close-ticket-text-button"
                      onClick={handleOpenDeleteConfirmation}
                    >
                      Close Ticket
                    </TextPrimaryButton>
                  )}
                  {checkCommentInput === 1 &&
                    <Alert
                      className="ticket-comment-alert-input"
                      severity="error"
                    >
                      Message cannot be empty
                    </Alert>}
                  {checkuploadingFile === 1 &&
                    <Alert
                      className="ticket-comment-alert-input"
                      severity="error"
                    >
                      The uploading file type must be jpg, jpeg, png or pdf
                    </Alert>}
                  {checkuploadingFile === 2 &&
                    <Alert
                      className="ticket-comment-alert-input"
                      severity="error"
                    >
                      The uploading file is bigger than 30MB maximum size limit
                    </Alert>}
                  <div className="ticket-comment-text-field-container">
                    <TextField
                      id="replay-field1"
                      label="Reply"
                      variant="outlined"
                      value={ticketCommentInput}
                      onChange={handleTicketCommentChange}
                      onKeyDown={handlePressEnterKey}
                      InputProps={{
                        endAdornment:
                          <InputAdornment position="end">
                            {showSendIcon === 1 ? (
                              <IconButton
                                className="ticket-comment-send-button"
                                edge="end"
                                color="primary"
                                onClick={() => handlePostNewComment()}
                              >
                                <SendIcon />
                              </IconButton>
                            ) : (
                              <Tooltip
                                title="Upload file"
                                placement="top"
                              >
                                <IconButton
                                  className="ticket-comment-file-upload-button"
                                  edge="start"
                                  color="primary"
                                  aria-label="upload picture"
                                  component="label"
                                  disabled={uploadingFile}
                                >
                                  <input
                                    id="uploadFile"
                                    name="uploadFile"
                                    hidden
                                    accept="image/png, image/jpeg, image/jpg, application/pdf"
                                    type="file"
                                    onChange={(event) => handleUploadFile(event)}
                                  />
                                  {uploadingFile === true ? (
                                    <CircularProgress size={25} />
                                  ) : (
                                    <AttachFileIcon />
                                  )}
                                </IconButton>
                              </Tooltip>
                            )}
                          </InputAdornment>
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};