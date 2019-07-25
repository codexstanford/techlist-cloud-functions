import * as T from "../types";
import sendgrid from "@sendgrid/mail";
import { getMessageData } from "../helpers/getMessageData";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export function sendEmail(
  pubSubEvent: T.PubSubMessage,
  _context: T.PubSubContext
) {
  const email: T.EmailMessage = getMessageData(pubSubEvent);

  try {
    sendgrid.send(email);
  } catch (err) {
    console.log(err.toSting());
  }
}
