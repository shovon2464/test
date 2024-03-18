import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
// export const getPdfFile = async (unsigned_file: string, fileName: string) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     variables: {},
//     query: `query{
//         getPdfFile(
//           fileName:"${fileName}",
//           unsigned_file:"${unsigned_file}",
//           ){Status, Message}
//         }`,
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

// export const sendHelloSign = async (
//   fileName: string,
//   email: string,
//   name: string
// ) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     varibales: {},
//     query: `query{
//         sendHelloSign(
//           fileName:"${fileName}",
//           email:"${email}",
//           name:"${name}",
//         ){Status, SignatureRequestId, IsComplete}
//       }`,
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

// export const createHelloSign = async (
//   Signature_Request_Id: string,
//   IsComplete: boolean,
//   Task_Id: string
// ) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     query: `
//         mutation {
//           createHelloSign(
//             hellosign:{
//               Signature_Request_Id:"${Signature_Request_Id}",
//               IsComplete:${IsComplete},
//               Task_Id: ${Task_Id},
//             }){
//             HelloSign{HelloSign_Id}
//             Status
//             Message
//           }
//         }`,
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

// export const findHelloSignId = async (Task_Id: string) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     query: `
//     query {
//       findHelloSignId(Task_Id:"${Task_Id}"){
//         Status
//         Message
//       }
//     }`,
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

// export const findOneHelloSign = async (HelloSign_Id: string) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     query: `
//       query {
//         findOneHelloSign(HelloSign_Id: "${HelloSign_Id}"){
//           Signature_Request_Id
//           IsComplete
//         }
//       }`,
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
// export const updateHelloSign = async (
//   Task_Id: string,
//   HelloSign_Id: string
// ) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     query: `
//           mutation {
//             updateHelloSign(
//               hellosign:{
//                 Task_Id: "${Task_Id}",
//               }
//               HelloSign_Id: "${HelloSign_Id}"
//             ){
//               Status
//               Message
//             }
//           }`,
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

// export const checkIsComplete = async (SignatureRequestId: string) => {
//   const AccessToken = key();
//   let query: object = {
//     operationName: null,
//     query: `
//     query {
//       checkHelloSignIsComplete(
//         signatureRequest_Id: "${SignatureRequestId}"
//       ){
//         Status
//         Message
//       }
//     }`,
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
