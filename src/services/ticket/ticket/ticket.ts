import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { ITicketsRequest } from "../../../action_creators/ticket/ticket/ticket";

export const getAllTickets = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
              findAllTickets {
                Ticket_Id
                Create_By
                Date
                Title
                Description
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

export const getAllTicketsByUserID = async (create_by: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
              findAllTicketsByUserID(
                Create_By: "${create_by}"
              ) {
                Ticket_Id
                Create_By
                Date
                Title
                Description
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

export const addNewTicket = async (
  ticket_info: ITicketsRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              createTicket(data: {
                Create_By: "${ticket_info.Create_By}",
                Title: "${ticket_info.Title}",
                Description: "${ticket_info.Description}"
              }) {
                Ticket {
                  Ticket_Id
                  Create_By
                  Date
                  Title
                  Description
                }
                Message,
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

export const deleteTicket = async (ticket_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              deleteTicketAndTicketRelatedRecords(
                Ticket_Id:"${ticket_id}"
              ) {
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