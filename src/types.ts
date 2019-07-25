export interface PubSubMessage {
  data: string;
  attributes?: { [index: string]: string };
}

export interface PubSubContext {
  messageId: string;
  publishTime: string;
}

export interface NewUserMessage {
  email: string;
  id: string;
  options?: { [index: string]: any };
}

export interface EmailMessage {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  [index: string]: any;
}

export interface NewUserTask {
  name: "userWelcomeEmail";
  options: { [index: string]: any };
}

export type NewUserTasks = NewUserTask[];
