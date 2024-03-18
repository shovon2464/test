export const timeDiff = (taskCreateDate: Date, taskCompleteDate: Date) => {
  if (taskCreateDate && taskCompleteDate) {
    let diffInMilliSeconds =
      Math.abs(taskCompleteDate.getTime() - taskCreateDate.getTime()) / 36e5;
    let costHours = parseFloat(diffInMilliSeconds.toFixed(2));
    return costHours;
  }
  return 0;
};

//check if note is created 1 hour before click "completed"
// TaskStatusDropDown.tsx
export const timeCollapse = function (noteCreatedTime: Date) {
  const current = new Date();
  return ((Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes())) 
  - (Date.UTC(noteCreatedTime.getUTCFullYear(), noteCreatedTime.getUTCMonth(), noteCreatedTime.getUTCDate(), noteCreatedTime.getUTCHours(), noteCreatedTime.getMinutes())))
  / ( 1000 * 60)
};


// date difference in days
export const dateDiffInDays = function (createdDate: Date) {
  const now = new Date();
  return Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate())) /
    (1000 * 60 * 60 * 24)
  );
};