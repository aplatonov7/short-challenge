import moment from "moment"

export function timeSince(date) {
  return moment(date || undefined).fromNow()
}