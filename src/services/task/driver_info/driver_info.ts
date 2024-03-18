import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getDriverInfoByVehicleId = async (vehicle_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
                findDriversInfoByVehicleId(vehicle_info_id:"${vehicle_id}")
                {
                    CM_Driver_Info_Id
                    Name
                    Gender
                    Address
                    DateOfBirth
                    LicenseNumber
                    LicenseYear
                    IsRemoved
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
