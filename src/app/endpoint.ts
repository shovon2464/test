//Production mode
export const API_URL: string = "https://task.uwinsure.com:5000/graphql";
export const Esign_API_URL: string = "https://esign.abots.win:4002/graphql"

// Development mode
// export const API_URL: string = "http://localhost:5000/graphql";
// export const Esign_API_URL: string = "http://localhost:4000/graphql";


// do not change the following
const updateWS = API_URL.replace("http", "ws");
export const WS_URL = updateWS.replace("graphql", "subscriptions");

export const CRM_Policy_Search_URL: string =
  "http://crm.uwinsure.com/index.php?action=UnifiedSearch&module=Home&search_form=false&advanced=false&query_string=";
export const CRM_Name_Search_URL: string =
  "http://crm.uwinsure.com/index.php?action=UnifiedSearch&query_string=";

//export const API_URL: string = "http://ca.uwinsure.com:5000/graphql";
//export const API_URL: string = "https://bis.abots.win:5000/graphql";
