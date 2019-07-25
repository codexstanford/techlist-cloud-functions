import * as T from "../types";
import { getMessageData, encode, getPubSub } from "../helpers/";
import { defaultWelcomeEmail } from "../config";

export function userWelcomeEmail(
  pubSubEvent: T.PubSubMessage,
  _context: T.PubSubContext
): void {
  const pubsub = getPubSub();
  const data: T.NewUserMessage = getMessageData(pubSubEvent);
  const { email: to } = data;

  const email = {
    to: to,
    from: getWelcomeEmailFrom(data),
    replyTo: getWelcomeEmailReplyTo(data),
    subject: getWelcomeEmailSubject(data),
    text: getWelcomeEmailText(data),
    html: getWelcomeEmailHTML(data)
  };

  try {
    const message = encode(email);
    const topic = pubsub.topic("sendemail");
    topic.get({ autoCreate: true });
    topic.publish(message);
  } catch (err) {
    console.log(err.toString());
  }
}

function getWelcomeEmailFrom(args: T.NewUserMessage) {
  const { options } = args;
  if (options && options.from) {
    return options.from;
  }
  return defaultWelcomeEmail.sender.from;
}

function getWelcomeEmailReplyTo(args: T.NewUserMessage) {
  const { options } = args;
  if (options && options.replyTo) {
    return options.replyTo;
  }
  if (options && options.from) {
    return options.from;
  }

  return defaultWelcomeEmail.sender.replyTo;
}

function getWelcomeEmailText(args: T.NewUserMessage) {
  const { options } = args;
  if (options && options.text) {
    return options.text;
  }
  return defaultWelcomeEmail.body.text;
}

function getWelcomeEmailHTML(args: T.NewUserMessage) {
  const { options } = args;
  if (options && options.html) {
    return options.html;
  }
  return defaultWelcomeEmail.body.text;
}

function getWelcomeEmailSubject(args: T.NewUserMessage) {
  const { options } = args;
  if (options && options.subject) {
    return options.subject;
  }
  return defaultWelcomeEmail.subject;
}
