import { PubSub } from "@google-cloud/pubsub";

export function getPubSub(args?: { projectId?: string }) {
  let projectId = "stanfordcodextextindex";
  if (args && args.projectId && args.projectId !== null) {
    projectId = args.projectId;
  }
  return new PubSub({ projectId });
}
