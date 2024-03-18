import { IUserPerformanceResponse } from "../action_creators/performance_report/user_performance";

//group any array by any key field value
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

// filtering performance records by start date and end date
export const getAllPerformanceRecordsByDate = (
  data: IUserPerformanceResponse[],
  startDate: Date,
  endDate: Date
) => {
  const dataBetweenStartEndDate = data.filter((value) => {
    let task_close_date: Date;
    if (typeof value.Job_Close_Date === "string") {
      task_close_date = new Date(value.Job_Close_Date);
    } else {
      task_close_date = value.Job_Close_Date;
    }
    return task_close_date >= startDate && task_close_date <= endDate;
  });
  return dataBetweenStartEndDate;
};

// group all performance records by user id
export const groupTotalCompletedTaskRecordsByUserName = (
  data: IUserPerformanceResponse[]
) => {
  const groupByResult = groupBy(data, (item) => item.user_id);
  return groupByResult;
};

// get all users that have performance records
export const getAllPerformanceRecordsUserNames = (
  data: IUserPerformanceResponse[]
) => {
  let totalUserNames: string[] = [];
  data.forEach((value) => {
    const username = value.UserName;
    if (!totalUserNames.length && typeof username === "string") {
      totalUserNames.push(username);
    } else {
      if (typeof username === "string" && !totalUserNames.includes(username)) {
        totalUserNames.push(username);
      }
    }
  });
  return totalUserNames;
};

// get total hours for all the completed tasks for each broker and avg cost hours by each broker
export const getTotalAndAvgTaskCostTimeByUserName = (
  data: Record<string, IUserPerformanceResponse[]>
) => {
  let result: IUserPerformanceResponse[] = [];
  for (var key in data) {
    let value = data[key];

    var eachUserValue = value.reduce((pre, curr, _, { length }) => {
      let sumCostTime = (pre.Cost_Time + curr.Cost_Time);
      return {
        User_Performance_Id: curr.User_Performance_Id,
        Job_Close_Date: curr.Job_Close_Date,
        user_id: curr.user_id,
        UserName: curr.UserName,
        Cost_Time: parseFloat(sumCostTime.toFixed(2)),
      };
    });

    let avg = {
      ...eachUserValue,
      AvgCost: parseFloat((eachUserValue.Cost_Time / value.length / 24).toFixed(2)),
      TotalCompletedTasks: value.length,
    };

    result.push(avg);
  }
  return result;
};

//get current user performance records data in object
export const getLoggedInUserPerformanceRecords = (
  data: IUserPerformanceResponse[]
) => {
  let results: IUserPerformanceResponse[] = [];
  var userValue = data.reduce(
    (pre, curr) => {
      let sumCostTime = pre.Cost_Time + curr.Cost_Time;
      return {
        User_Performance_Id: curr.User_Performance_Id,
        Job_Close_Date: curr.Job_Close_Date,
        user_id: curr.user_id,
        UserName: curr.UserName,
        Cost_Time: parseFloat(sumCostTime.toFixed(2)),
      };
    },
    { Cost_Time: 0, User_Performance_Id: "", Job_Close_Date: "", user_id: "" }
  );
  let result = {
    ...userValue,
    AvgCost: parseFloat((userValue.Cost_Time / data.length).toFixed(2)),
    TotalCompletedTasks: data.length,
  };
  results.push(result);
  return results;
};
