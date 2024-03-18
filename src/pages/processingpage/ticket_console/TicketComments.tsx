import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useRef, useState } from "react";
import {
  Typography
} from '@mui/material';
import {
  getBrokerName,
  getUserRole,
  key
} from "../../../services/auth/getKey";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


// const ALL_CHATS = gql`
//   query allChatsByTicketID($ticket_id: String!) {
//     findAllTicketCommentsByTicketID
//       (Ticket_Id: $ticket_id) {
//         Ticket_Comment_Id
//         Comment_Date
//         Ticket_Id
//         Comment_By
//         Comment
//     }
//   }
// `;

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

interface TicketCommentsProps {
  ticketId: string;
}

export const TicketComments: React.FC<TicketCommentsProps> = ({ ticketId }) => {
  const ticketComments = useAppSelector((state) =>
    state.ticketCommentsList.ticketComments);
  const AccessToken = key();
  const name = getBrokerName();
  const messagesRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
  };

  const { loading, error, data } =
    useSubscription(CHATS_SUBSCRIPTION, {
      variables: { ticket_id: ticketId },
      context: {
        Headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + AccessToken,
        }
      }
    });

  // subscribeToMore({
  //   document: CHATS_SUBSCRIPTION,
  //   variables: { ticket_id: ticketId },
  //   context: {
  //     Headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + AccessToken,
  //     }
  //   },
  //   updateQuery: (prev, { subscriptionData }) => {
  //     if (!subscriptionData.data) return prev;
  //     const newChat = subscriptionData.data.ticketCommentSent;

  //     return Object.assign({}, prev, {
  //       findAllTicketCommentsByTicketID:
  //         [...prev.findAllTicketCommentsByTicketID, newChat],
  //     });
  //   },
  // });

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  if (loading) return (
    <div ref={messagesRef}>
      {ticketComments.map((commentRow: any, Commentindex: number) => (
        <>
          {commentRow.File_URL !== null && commentRow.File_URL !== undefined ? (
            <div className={
              `each-comment-container ${commentRow.Comment_By
              === name && (`my-msg-container`)}`
            } id={commentRow.Ticket_Comment_Id}>
              <div className={
                `ticket-comment ${commentRow.Comment_By
                === name && (`my-messages`)}`
              }>
                <Typography className="ticket-comment-name">
                  {commentRow.Comment_By}
                </Typography>
                <Typography className="ticket-comment-content">
                  {
                    commentRow.File_URL !== undefined && commentRow.File_URL[commentRow.File_URL.length - 1] === "g" ? (
                      <>
                        <a
                          className="ticket-comment-file-image-container"
                          href={`${commentRow.File_URL}?token=${AccessToken}`}
                          target="_blank"
                        >
                          <img
                            className="ticket-comment-file-image"
                            src={`${commentRow.File_URL}?token=${AccessToken}`} />
                        </a>
                        <a
                          className="ticket-comment-file"
                          href={`${commentRow.File_URL}?token=${AccessToken}`}
                          target="_blank"
                        >
                          <PhotoLibraryIcon fontSize="small" />{commentRow.Comment}
                        </a>
                      </>
                    ) : (
                      <a
                        className="ticket-comment-file"
                        href={`${commentRow.File_URL}?token=${AccessToken}`}
                        target="_blank"
                      >
                        <PictureAsPdfIcon fontSize="small" />{commentRow.Comment}
                      </a>
                    )}
                </Typography>
              </div>
              <Typography className="ticket-comment-date">
                {String(commentRow.Comment_Date)
                  .replace(/.\d+Z$/g, "Z")
                  .replace('T', ' ')
                  .replace('Z', '')}
              </Typography>
            </div>
          ) : (
            <div className={
              `each-comment-container ${commentRow.Comment_By
              === name && (`my-msg-container`)}`
            } id={commentRow.Ticket_Comment_Id}>
              <div className={
                `ticket-comment ${commentRow.Comment_By
                === name && (`my-messages`)}`
              }>
                <Typography className="ticket-comment-name">
                  {commentRow.Comment_By}
                </Typography>
                <Typography className="ticket-comment-content">
                  {commentRow.Comment}
                </Typography>
              </div>
              <Typography className="ticket-comment-date">
                {String(commentRow.Comment_Date)
                  .replace(/.\d+Z$/g, "Z")
                  .replace('T', ' ')
                  .replace('Z', '')}
              </Typography>
            </div>
          )}
        </>
      ))}
    </div>
  );
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div ref={messagesRef}>
      {data.ticketCommentSent.map((commentRow: any, Commentindex: number) => (
        <>
          {commentRow.File_URL !== null && commentRow.File_URL !== undefined ? (
            <div className={
              `each-comment-container ${commentRow.Comment_By
              === name && (`my-msg-container`)}`
            } id={commentRow.Ticket_Comment_Id}>
              <div className={
                `ticket-comment ${commentRow.Comment_By
                === name && (`my-messages`)}`
              }>
                <Typography className="ticket-comment-name">
                  {commentRow.Comment_By}
                </Typography>
                <Typography className="ticket-comment-content">
                  {
                    commentRow.File_URL.includes("jpg") ||
                      commentRow.File_URL.includes("peg") ||
                      commentRow.File_URL.includes("png") ? (
                      <>
                        <a
                          className="ticket-comment-file-image-container"
                          href={`${commentRow.File_URL}?token=${AccessToken}`}
                          target="_blank"
                        >
                          <img
                            className="ticket-comment-file-image"
                            src={`${commentRow.File_URL}?token=${AccessToken}`} />
                        </a>
                        <a
                          className="ticket-comment-file"
                          href={`${commentRow.File_URL}?token=${AccessToken}`}
                          target="_blank"
                        >
                          <PhotoLibraryIcon fontSize="small" />{commentRow.Comment}
                        </a>
                      </>
                    ) : (
                      <a
                        className="ticket-comment-file"
                        href={`${commentRow.File_URL}?token=${AccessToken}`}
                        target="_blank"
                      >
                        <PictureAsPdfIcon fontSize="small" />{commentRow.Comment}
                      </a>
                    )}
                </Typography>
              </div>
              <Typography className="ticket-comment-date">
                {String(commentRow.Comment_Date)
                  .replace(/.\d+Z$/g, "Z")
                  .replace('T', ' ')
                  .replace('Z', '')}
              </Typography>
            </div>
          ) : (
            <div className={
              `each-comment-container ${commentRow.Comment_By
              === name && (`my-msg-container`)}`
            } id={commentRow.Ticket_Comment_Id}>
              <div className={
                `ticket-comment ${commentRow.Comment_By
                === name && (`my-messages`)}`
              }>
                <Typography className="ticket-comment-name">
                  {commentRow.Comment_By}
                </Typography>
                <Typography className="ticket-comment-content">
                  {commentRow.Comment}
                </Typography>
              </div>
              <Typography className="ticket-comment-date">
                {String(commentRow.Comment_Date)
                  .replace(/.\d+Z$/g, "Z")
                  .replace('T', ' ')
                  .replace('Z', '')}
              </Typography>
            </div>
          )}
        </>
      ))}
    </div>
  )
}