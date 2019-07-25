import * as T from "../types";
import { decode } from "./decode";

export const getMessageData = (pubSubEvent: T.PubSubMessage) => {
  const json = decode(pubSubEvent.data);
  return JSON.parse(json);
};
