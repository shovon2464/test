import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const addNewTicketFile = async (
  upload_File: string,
  file_Name: string,
  file_Type: string
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation {
              uplaodTicketFile(
                upload_File: "${upload_File}",
                file_Name: "${file_Name}",
                file_Type: "${file_Type}"
              ) {
                File_URL
                File_Name
                File_Type
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

