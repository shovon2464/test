import { API_URL } from "../../app/endpoint";
import { key } from "../auth/getKey";

export const getAllComingCallsList = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                    findAllComingCallsWithClienInfos {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getComingCallsByPhoneNumber = async (phone_number: string) => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                    findComingCallsByPhoneNumber(phone_number: "${phone_number}")
                    {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getAllComingCallsByPredictValuesLessThanZero = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                    findAllComingCallsByPredictValuesLessThanZero {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getAllComingCallsByPredictValuesEqualToZero = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                    findAllComingCallsByPredictValuesEqualToZero {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getAllComingCallsByPredictValuesFromOneToFifty = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                    findAllComingCallsByPredictValuesFromOneToFifty {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getAllComingCallsByPredictValuesFromFiftyToAHundred = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
                    findAllComingCallsByPredictValuesFromFiftyToAHundred {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getAllComingCallsByPredictValuesGreatherThanAHundredFifty =
  async () => {
    const AccessToken = key();
    let query: object = {
      operationName: null,
      variables: {},
      query: `query {
                    findAllComingCallsByPredictValuesGreatherThanAHundredFifty {
                        call_id
                        phone_number
                        date
                        duration
                        phone_id
                        phone_list {
                            phone_id
                            phone_number
                            client_predict_value_id
                            client_predict_value {
                                client_predict_value_id
                                client_name
                                predict_value
                                client_tag {
                                    tag_id
                                    tag_description
                                    client_predict_value_id
                                }
                            }
                        }
                    }
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

export const getCRMComingCalls = async () => {
  const AccessToken = key();
  let query: object = {
    operationName: null,
    variables: {},
    query: `query {
      findComingCalls {
          name
          phone_number
          datetime
          duration
          recordingURL
      }
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
