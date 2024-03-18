import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { IQuotePdfCoordinatesRequest } from "../../../action_creators/tools/quote_pdf_coordinates/quote_pdf_coordinates";

export const getAllQuotePdfInfo = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
            findAllQuotePdfCoordinates{
                QuotePDF_Id
                QuotePDF_Name
                QuotePDF_Store_Path
                Company_From
                PDF_Coordinates
            }}`,
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

export const getAQuotePdfInfoById = async (QuotePDF_Id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
            findQuotePdfCoordinateById(QuotePDF_Id:"${QuotePDF_Id}")
            {
                QuotePDF_Id
                QuotePDF_Name
                QuotePDF_Store_Path
                Company_From
                PDF_Coordinates
            }}`,
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

export const createNewQuotePdfInfo = async (
  quote_pdf_info: IQuotePdfCoordinatesRequest
) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createNewQuotePdfCoordinates(quote_pdf_coordinates_info:{
                    QuotePDF_Name: "${quote_pdf_info.QuotePDF_Name}",
                    QuotePDF_Store_Path:"${quote_pdf_info.QuotePDF_Store_Path}",
                    Company_From:"${quote_pdf_info.Company_From}",
                    PDF_Coordinates:"${quote_pdf_info.PDF_Coordinates}"
                })
                {
                    QuotePDF_Id
                    QuotePDF_Name
                    QuotePDF_Store_Path
                    Company_From
                    PDF_Coordinates
                }}`,
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

export const removeQuotePdfInfoById = async (QuotePDF_Id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deleteQuotePdfCoordinates(QuotePDF_Id:"${QuotePDF_Id}")
            {
                Status
                Message
            }}`,
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
