import moment, { MomentInput } from "moment";

export const toFormatedDate = (str: MomentInput) => str ? moment(str).format('DD MMM YYYY') : "";
export const toFormatedDatetime = (str: MomentInput) => str ? moment(str).format('DD MMM YYYY HH:mm') : "";
