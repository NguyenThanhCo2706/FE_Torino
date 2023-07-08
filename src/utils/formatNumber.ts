import moment from "moment";

export const thousandSeparator = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const caculateTime = (beforeTime: Date) => {
  const now = moment();
  let diff = now.diff(beforeTime, 'millisecond');
  if (diff < 60) {
    return {
      count: diff,
      type: "milliseconds"
    };
  }
  diff = now.diff(beforeTime, 'minutes');
  if (diff < 60) {
    return {
      count: diff,
      type: "minutes"
    };
  }
  diff = now.diff(beforeTime, 'hours');
  if (diff < 24) {
    return {
      count: diff,
      type: "hours"
    };
  }
  diff = now.diff(beforeTime, 'days');
  if (diff < 24) {
    return {
      count: diff,
      type: "days"
    };
  }
  diff = now.diff(beforeTime, 'months');
  if (diff < 12) {
    return {
      count: diff,
      type: "months"
    };
  }
  diff = now.diff(beforeTime, 'years');
  return {
    count: diff,
    type: "years"
  };
}
