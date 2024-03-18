import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";
import { IHomeInfoRequest } from "../../../action_creators/questionnaire/home_info/home_info";

export const getHomeInfoByHomeInfoId = async (home_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
            findHomeInfoByHomeInfoId(home_info_id:"${home_id}")
            {
                CM_Home_Info_Id
                Address
                Built_Year
                HW_Tank_Year
                Roofing_Year
                Size
                Is_Basement_Completed
                Bathrooms
                Claims
                Num_Mortgages
                Comment
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

export const createNewHomeInfo = async (home_info: IHomeInfoRequest) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `mutation{
                createNewHomeInfo(home_info: {
                    Address:"${home_info.Address}"
                    Built_Year:${home_info.Built_Year}
                    HW_Tank_Year:${home_info.HW_Tank_Year}
                    Roofing_Year:${home_info.Roofing_Year}
                    Size:"${home_info.Size}"
                    Bathrooms:"${home_info.Bathrooms}"
                    Is_Basement_Completed:${home_info.Is_Basement_Completed}
                    Claims:${home_info.Claims}
                    Num_Mortgages:${home_info.Num_Mortgages}
                    Comment:"${home_info.Comment}"
                })
                {
                    CM_Home_Info_Id
                    Address
                    Built_Year
                    HW_Tank_Year
                    Roofing_Year
                    Size
                    Is_Basement_Completed
                    Bathrooms
                    Claims
                    Num_Mortgages
                    Comment
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
