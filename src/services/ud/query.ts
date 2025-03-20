import { udInstance } from ".";

export async function udQuery(documentId: string) {
  return await udInstance.post("/query", {
    id: documentId,
    key: process.env.UD_API_KEY,
  });
}
