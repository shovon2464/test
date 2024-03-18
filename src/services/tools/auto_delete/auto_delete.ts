import { key } from "../../auth/getKey";
import { API_URL } from "../../../app/endpoint";
import { IAutoDelete } from "../../../action_creators/tools/auto_delete/auto_delete";

export const createTaskDays = async (
  alertDays: number,
  deleteDays: number,
  targetEmail: string
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            add_task_days(
                data:
                {
                    alert_days: ${alertDays}
                    delete_days: ${deleteDays}
                    target_email: "${targetEmail}"
                })
                {alert_days, delete_days, target_email}}`,
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

export const updateTaskDaysInfo = async (data: IAutoDelete) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
        update_days (
            alert_delete_id: "79a47e2a-e386-4a2d-aaa6-8a70cc57c12f",
            alert_days: ${data.alert_days},
            delete_days: ${data.delete_days},
            target_email: "${data.target_email}",
            active: ${data.active}
        ) {
            alert_days,
            delete_days,
            target_email,
            active
        }
      }`,
  };
  // console.log(query);
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

export const getAutoDeleteInfo = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
        findAutoDeleteInfo  {
                alert_days,
                delete_days,
                target_email,
                active
            }}`,
  };
  const result = await fetch(API_URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return result;
};

export const sendDeletedDetail = async (
  deleteDetail: string,
  targetEmail: string
) => {
  const AccessToken = key();

  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      send_delete_email (
        Deleted_tasks: "${deleteDetail}",
        Target_email: "${targetEmail}"
      ) {
        Result,
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
