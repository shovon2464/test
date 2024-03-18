import { API_URL } from "../../../app/endpoint";
import { key } from "../../auth/getKey";


// export  interface VehicleDriverReponse{
//     Status: boolean;
//     Message: string;
// }

export  interface VehicleDriverRequest{
    vehicle_info_id: string;
    driver_info_id: string;
    principle_driver: boolean;
}

export const addVehicleDriver = async (vehicleDriverRequest: VehicleDriverRequest) => {
    const AccessToken = key();
    let query: object = {
        operationName: null,
        variables: {},
        query: `mutation{
                          forTestingInsertIds(
                               vehicle_info_id:"${vehicleDriverRequest.vehicle_info_id}",
                               driver_info_id:"${vehicleDriverRequest.driver_info_id}",
                               principle_driver:${vehicleDriverRequest.principle_driver},
                          )
                          {Status, Message}
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

