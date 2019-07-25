import * as T from "../types";
import { getMessageData, encode, getPubSub } from "../helpers";
import { tasks } from "../config";

export function handleNewUserRegistration(
  pubSubEvent: T.PubSubMessage,
  _context: T.PubSubContext
): void {
  const pubsub = getPubSub();
  const data: T.NewUserMessage = getMessageData(pubSubEvent);

  tasks.forEach(task => {
    try {
      const message = encode(
        Object.assign({}, data, { options: task.options })
      );
      const topic = pubsub.topic(task.name);
      topic.get({ autoCreate: true });
      topic.publish(message);
    } catch (err) {
      console.log(err.toString());
    }
  });
}
