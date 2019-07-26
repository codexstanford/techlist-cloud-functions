import { Request, Response } from "express";
const querystring = require("querystring");

import { encrypt, decrypt } from "../../helpers";

export async function handleCallback(req: Request, res: Response) {
  const decryptedPayload = await decrypt(req.query.payload);

  res.send({
    payload: req.query.payload,
    decryptedPayload: decryptedPayload.toString("utf8")
  });
}

export async function generateTestData(req: Request, res: Response) {
  const encryptedData: any = await encrypt(req.query);
  const queryString = querystring.encode({
    payload: encryptedData.toString("base64")
  });

  const href = `https://us-central1-stanfordcodextextindex.cloudfunctions.net/handleCallback?${queryString}`;
  res.send(
    `<h3>SecretLink: </h3><a href=${href}>${queryString.slice(0, 25)}</a>`
  );
}
