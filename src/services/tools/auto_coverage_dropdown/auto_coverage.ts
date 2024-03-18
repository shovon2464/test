import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { IAutoCoverage } from "../../../action_creators/tools/auto_coverage_dropdown/auto_coverage";

export const getAllAutoCoverage = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
                   findAllVehicleCoverage
                   {CM_Vehicle_Coverage_Id, CoverageType, CoverageDetails}}`,
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

export const createAutoCoverage = async (vehicle_coverage: IAutoCoverage) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createVehicleCoverage( coverage: {
                    CoverageType:"${vehicle_coverage.CoverageType}",
                    CoverageDetails:"${vehicle_coverage.CoverageDetails}"})               
                {CM_Vehicle_Coverage_Id, CoverageType, CoverageDetails}}`,
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

export const deleteAutoCoverage = async (vehicle_coverage_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
            deleteVehicleCoverage(
                vehicle_coverage_id:"${vehicle_coverage_id}",)        
            {Status, Message}}`,
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
