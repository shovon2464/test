import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getTask = async (task_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
      findOneTask(
        Task_Id: "${task_id}"
      ){task}
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

export const uploadUnsignedPdf = async (
  receive: string,
  pdfType: string,
  fileName: string,
  fileType: string,
  unsigned_file: string,
  Task_Id: string
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                ERPfileupload(
                    receive:"${receive}",
                    pdfType:"${pdfType}",
                    fileName:"${fileName}",
                    fileType:"${fileType}",
                    unsigned_file:"${unsigned_file}",
                    Task_Id:"${Task_Id}"){file_url, file_name, Result, Status}}`,
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

export const uploadUnsignedPdfToBothTextEmail = async (
  receive: string,
  pdfType: string,
  fileName: string,
  fileType: string,
  unsigned_file: string,
  Task_Id: string
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      ERPfileuploadForBothTextAndEmail(
                    receive:"${receive}",
                    pdfType:"${pdfType}",
                    fileName:"${fileName}",
                    fileType:"${fileType}",
                    unsigned_file:"${unsigned_file}",
                    Task_Id:"${Task_Id}"){file_url, file_name, Result, Status}}`,
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

export const sendReminder = async (
  Task_Id: string
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
      resendMessage(
        Task_Id: "${Task_Id}"
      ) {
        Result, Status
      }
    }`
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

  console.log(result);

  return result;
}

// export const uploadOnTaskUnsignedPdf = async (
//   receive: string,
//   pdfType: string,
//   fileName: string,
//   fileType: string,
//   unsigned_file: string,
//   Task_Id: string
// ) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     variables: {},
//     query: `mutation{
//                 onTaskFileUpload(
//                     receive:"${receive}",
//                     pdfType:"${pdfType}",
//                     fileName:"${fileName}",
//                     fileType:"${fileType}",
//                     unsigned_file:"${unsigned_file}",
//                     Task_Id:"${Task_Id}"){file_url, file_name, Result, Status}}`,
//   };
//   const result = await fetch(API_URL, {
//     method: "post",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + AccessToken,
//     },
//     body: JSON.stringify(query),
//   }).then((res) => res.json());

//   return result;
// };
