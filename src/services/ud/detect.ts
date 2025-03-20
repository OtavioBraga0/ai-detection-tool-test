import { udInstance } from ".";

export async function udDetect(content: string) {
  return await udInstance.post("/detect", {
    text: content,
    key: process.env.UD_API_KEY,
  });
}
