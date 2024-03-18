import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";



export interface DriverResponse {
    CM_Driver_Info_Id:string;
    Name: string;
    Gender: string;
    Address: string;
    DateOfBirth:string;
    LicenceNumber: string;
    LicenceYear: number;
    IsRemoved: boolean;
}

export interface DriverRequest {
    Name: string;
    Gender: string;
    Address: string;
    DateOfBirth:string;
    LicenceNumber: string;
    LicenceYear: number;
    // IsRemoved: boolean;
}



export const addDriver = async (driverRequest: DriverRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{ createNewDriverInfo(
                            driver_info:{
                               Name:"${driverRequest.Name}",
                               Gender:"${driverRequest.Gender}",
                               Address:"${driverRequest.Address}",
                               DateOfBirth:"${driverRequest.DateOfBirth}T12:00:00.000Z",
                               LicenseNumber:"${driverRequest.LicenceNumber}",
                               LicenseYear:${driverRequest.LicenceYear},
                               IsRemoved:false,
                            }
                          )
                          {CM_Driver_Info_Id, Name}
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

