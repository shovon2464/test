import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useRef, useState } from "react";
import { key } from "../../../services/auth/getKey";
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
  CircularProgress,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert
} from '@mui/material';
import {
  getBrokerName,
  getUserRole
} from "../../../services/auth/getKey";
import { TicketComments } from "./TicketComments";
import {
  ITicketCommentsRequest,
  retrieveAllTicketCommentsByTicketId
} from "../../../action_creators/ticket/ticket_comments/ticket_comments";
import {
  getTicketTrackingByName,
  getAllTicketTrackingsByName
} from "../../../services/ticket/ticket_tracking/ticket_tracking";
import {
  ITicketsRequest,
  ITicketsResponse,
  retrieveAllTickets,
  retrieveAllTicketsByUserId,
  createNewTicket,
  closeTicketAndRelatedRecords

} from "../../../action_creators/ticket/ticket/ticket";
import {
  ITicketTrackingsRequest,
  ITicketTrackingsResponse
} from "../../../action_creators/ticket/ticket_tracking/ticket_tracking";

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

export const Tickets: React.FC = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.ticketList.tickets);
  const ticketComments = useAppSelector((state) =>
    state.ticketCommentsList.ticketComments);
  const AccessToken = key();
  const name = getBrokerName();
  const role = getUserRole();
  const [openTicket, setOpenTicket] = useState(-1);
  const [detailNCommentTicketId, setDetailNCommentTicketId] = useState("");
  const [openTicketDescription, setOpenTicketDescription] = useState(0);
  const [checkCloseable, setCheckCloseable] = useState("");
  const [commentOrCloseTicketId, setCommentOrCloseTicketId] = useState("");
  const [checkTrackingTicketId, setCheckTrackingTicketId] = useState("");
  const [unreadTicketsList, setUnreadTicketsList] = useState<ITicketTrackingsResponse[]>([]);
  const [updateTrackingList, setUpdateTrackingList] = useState<ITicketTrackingsResponse[]>([]);
  const messagesRef = useRef<any>(null);

  let newTicketComment: ITicketCommentsRequest;
  let ticketTracking: ITicketTrackingsResponse[];
  let updateTrackings: ITicketTrackingsResponse[];

  const checkEachTicketTracking = async () => {
    let unreadTicketsArray: ITicketTrackingsResponse[] = [];
    let trackingResult = await getAllTicketTrackingsByName(name);
    ticketTracking = trackingResult.data.findAllTrackingsByName;
    if (ticketTracking.length > 0) {
      ticketTracking.forEach(value => {
        unreadTicketsArray.push(value);
      })
    }
    setUnreadTicketsList(unreadTicketsArray);
  }

  useEffect(() => {
    checkEachTicketTracking().catch(console.error);
  }, []);

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
  };

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
      // const checkTracking = await getTicketTrackingByName(ticketId, name);
      // ticketTracking = checkTracking.data.findTicketTrackingByName;
      // if (
      //   ticketTracking.length <= 0 &&
      //   !ticketTracking.find(item => item.Comment_By.includes(name))
      // ) {
      //   const ticketTrackingInfo: ITicketTrackingsRequest = {
      //     Ticket_Id: ticketId,
      //     Comment_By: name
      //   }
      //   const updateTracking = await addNewTicketTracking(ticketTrackingInfo);
      // }
      // checkEachTicketTracking();
      newTicketComment = {
        Comment: "",
        Ticket_Id: "",
        Comment_By: ""
      };
      scrollToBottom();
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

  // if (checkTicketTracking.data.ticketTrackingChange !== undefined) {
  //   console.log(checkTicketTracking.data.ticketTrackingChange);
  // }

  // const { loading, error, data } = 
  // useSubscription(TICKETS_BY_ID_SUBSCRIPTION, {
  //   variables: { create_by: name },
  //   context: {
  //     Headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + AccessToken,
  //     }
  //   }
  // });

  if (loading) return (
    <>
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
              {ticketComments.length > 0 ? (
                <div className="ticket-comments-container" ref={messagesRef}>
                  <TicketComments ticketId={detailNCommentTicketId} />
                </div>
              ) : (
                <div className="ticket-comments-container">
                  <Typography className="ticket-user">
                    There is no message at this moment.</Typography>
                </div>
              )}
            </>
          )}
          {openTicket === -1 && (
            <>
              {!unreadTicketsList.find(item => item.Ticket_Id.includes(row.Ticket_Id)) ? (
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
    </>
  );
  if (error) return <p>`Error! ${error.message}`</p>;


  return (
    <>
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
              {ticketComments.length > 0 ? (
                <div className="ticket-comments-container" ref={messagesRef}>
                  <TicketComments ticketId={detailNCommentTicketId} />
                </div>
              ) : (
                <div className="ticket-comments-container">
                  <Typography className="ticket-user">
                    There is no message at this moment.</Typography>
                </div>
              )}
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
    </>
  )
}