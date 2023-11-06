import moment from "moment";
import "moment-timezone";

export const convertToLocalDate = (date) => {
  if (!date) {
    return date;
  }
  date = new Date(date);
  const mo1 = moment(date);
  const mo2 = moment(date).tz("UTC");
  const modifiedDate = moment(date);
  modifiedDate.subtract(mo1.utcOffset() - mo2.utcOffset(), "minutes");

  return modifiedDate._d;
};