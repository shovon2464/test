import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";

export const getVehicleInfoByVehicleId = async (vehicle_id: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query{
                findAutoInfoDetailById(vehicle_info_id:"${vehicle_id}")
                {
                    CM_Vehicle_Info_Id
                    VIN
                    Model
                    Year
                    IsUsed
                    IfParkingReason
                    PayOffMode_Id
                    PayOffType
                    PayOffType_Id
                    PayOffTypeDetail
                    PayOffTypeDetail_Id
                    PayOffTypeSubDetail
                    CM_Vehicle_Coverage_Id
                    CoverageType
                    CoverageDetails
                    CM_Usage_Id
                    UsageType
                    CM_Usage_Detail_Id
                    UsageDetail
                    StartEffectiveDate
                    EndEffectiveDate
                    fk_vehicle_status_id
                    CM_Vehicle_Status_Description
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
