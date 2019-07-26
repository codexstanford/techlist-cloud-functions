import { getKMSClient } from "./getKMSClient";
import { encode } from "./encode";

export async function encrypt(data: object) {
  const { client, name } = getKMSClient({});
  const plaintext = encode(data).toString("base64");
  try {
    const [result] = await client.encrypt({ name, plaintext });
    return result.ciphertext;
  } catch (err) {
    console.log("CRYPTO ERROR", err.toString());
    return err.toString();
  }
}

export async function decrypt(data: string) {
  const { client, name } = getKMSClient({});
  const ciphertext = Buffer.from(data, "base64");
  try {
    const [result] = await client.decrypt({ name, ciphertext });
    return result.plaintext;
  } catch (err) {
    console.log("CRYPTO ERROR", err.toString());
    return err.toString();
  }
}
