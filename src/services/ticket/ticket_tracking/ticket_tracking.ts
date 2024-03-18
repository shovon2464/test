import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import {
  ITicketTrackingsRequest
} from "../../../action_creators/ticket/ticket_tracking/ticket_tracking";

export const getAllTicketTrackingsByTicketID = async (ticket_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
              findAllTicketTrackingsByTicketID
                (Ticket_Id: "${ticket_id}") {
                Ticket_Tracking_Id
                Ticket_Id
                Comment_By
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

export const getTicketTrackingByName = async (ticket_id: string, name: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
              findTicketTrackingByName
                (Ticket_Id: "${ticket_id}",
                Comment_By: "${name}") {
                Ticket_Tracking_Id
                Ticket_Id
                Comment_By
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

export const getAllTicketTrackingsByName = async (name: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
              findAllTrackingsByName
                (Comment_By: "${name}") {
                Ticket_Tracking_Id
                Ticket_Id
                Comment_By
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

export const addNewTicketTracking = async (
  data: ITicketTrackingsRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              createTicketTracking(data: {
                Ticket_Id: "${data.Ticket_Id}",
                Comment_By: "${data.Comment_By}"
              }) {
                Ticket_Tracking {
                  Ticket_Tracking_Id
                  Ticket_Id
                  Comment_By
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