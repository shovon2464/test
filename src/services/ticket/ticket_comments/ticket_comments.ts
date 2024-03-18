import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import {
  ITicketCommentsRequest
} from "../../../action_creators/ticket/ticket_comments/ticket_comments";

export const addNewTicketComment = async (
  data: ITicketCommentsRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              createTicketComment(data: {
                Comment: "${data.Comment}",
                Ticket_Id: "${data.Ticket_Id}",
                Comment_By: "${data.Comment_By}"
              }) {
                Ticket_Comments {
                  Ticket_Comment_Id
                  Comment_Date
                  Ticket_Id
                  Comment_By
                  Comment
                }
                Message
                Status
              }
            }`,
  };

  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

export const uploadNewTicketCommentFile = async (
  data: ITicketCommentsRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              uploadTicketCommentFile(data: {
                  Comment: "${data.Comment}",
                  Ticket_Id: "${data.Ticket_Id}",
                  Comment_By: "${data.Comment_By}",
                  File_URL: "${data.File_URL}"
                }) {
                  Ticket_Comments {
                    Ticket_Comment_Id
                    Comment_Date
                    Ticket_Id
                    Comment_By
                    Comment
                  }
                  Message
                  Status
                }
              }`,
  };

  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

export const getAllTicketCommentsByTicketID =
  async (ticket_id: string, comment_by: string) => {
    const AccessToken = key();
    let query: object = {
      operationName: null,
      variables: {},
      query: `query {
              findAllTicketCommentsByTicketID(
                Ticket_Id: "${ticket_id}",
                Comment_By: "${comment_by}"
              ) {
                Ticket_Comment_Id
                Comment_Date
                Ticket_Id
                Comment_By
                Comment
                File_URL
              }
            }`,
    };

    const result = await fetch(API_URL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + AccessToken,
      },
      body: JSON.stringify(query),
    }).then((res) => res.json());

    return result;
  };