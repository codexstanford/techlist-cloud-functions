const kms = require("@google-cloud/kms");
const client = new kms.KeyManagementServiceClient();

export function getKMSClient(options: CreateKMSClientOptions) {
  const projectId = options.projectId || "stanfordcodextextindex";
  const locationId = options.locationId || "global";
  const keyringId = options.keyringId || "codex";
  const cryptoKeyId = options.cryptoKeyId || "queryparams";
  const name = client.cryptoKeyPath(
    projectId,
    locationId,
    keyringId,
    cryptoKeyId
  );
  return { client, name };
}

interface CreateKMSClientOptions {
  projectId?: string;
  locationId?: string;
  keyringId?: string;
  cryptoKeyId?: string;
}
