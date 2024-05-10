import moment from "moment";

export const currentDate = moment().format("DD/MM/YYYY");
export const dateAfterOneYear = moment().clone().add(1, "year").format("DD/MM/YYYY");