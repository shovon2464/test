import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";



// export interface VehicleResponse {
//     CM_Driver_Info_Id:string;
//     Name: string;
//     Gender: string;
//     Address: string;
//     DateOfBirth:string;
//     LicenceNumber: string;
//     LicenceYear: number;
//     IsRemoved: boolean;
// }


export interface VehicleRequest {
    VIN: string;
    Model: string;
    Year: number;
    isUsed: boolean;
    IfParkReason: string;
    StartEffectiveDate: string;
    EndEffectiveDate: string;
    VehicleStatusDescription: string;
    payOffMode: string;
    VehicleCoverage: string;
    UsageType: string;
    payOffTypeDetail: string;
    // payOffTypeSubDetail: string;
    // UsageDetail: string;
    Policy_Number:string;
    FinanceOrLeaseCompanyInfo:string;
    AutoUsageDetails:string;
}




export const addVehicle = async (vehicleRequest: VehicleRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          createNewVehicleInfo(
                               vehicle_info:{
                                VIN: "${vehicleRequest.VIN}",
                                Model: "${vehicleRequest.Model}",
                                Year:${vehicleRequest.Year},
                                IsUsed: ${vehicleRequest.isUsed},
                                IfParkingReason: "${vehicleRequest.IfParkReason}",
                                StartEffectiveDate:"${vehicleRequest.StartEffectiveDate}T12:00:00.000Z",
                                EndEffectiveDate:"${vehicleRequest.EndEffectiveDate}T12:00:00.000Z",
                                fk_vehicle_status_id:"${vehicleRequest.VehicleStatusDescription}",
                                PayOffMode_Id: "${vehicleRequest.payOffMode}",
                                CM_Vehicle_Coverage_Id:"${vehicleRequest.VehicleCoverage}",
                                CM_Usage_Id:"${vehicleRequest.UsageType}",
                                PayOffType_Id:"${vehicleRequest.payOffTypeDetail}",
                                Policy_Number:"${vehicleRequest.Policy_Number}",
                                FinanceOrLeaseCompanyInfo:"${vehicleRequest.FinanceOrLeaseCompanyInfo}",
                                AutoUsageDetails:"${vehicleRequest.AutoUsageDetails}"
                            }
                          )
                          {CM_Vehicle_Info_Id, VIN, Model, Year, IsUsed, IfParkingReason, fk_vehicle_status_id,FinanceOrLeaseCompanyInfo}
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