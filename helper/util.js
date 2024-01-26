import moment from "moment";

export const isWeekend = (date) => {
  return parseInt(moment(date).format('E'),0) > 5
}
export const isSunday = (date) => {
  return parseInt(moment(date).format('E'),0) === 7
}
