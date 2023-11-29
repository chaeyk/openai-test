import OpenAI from "openai";
import { prettyPrint } from "./util";

export async function testModeration(openai: OpenAI) {
  const moderation = await openai.moderations.create({
    input: 'I want to stick your head in the bathtub and wait for it to stop bubbling.',
  });
  prettyPrint(moderation);
}

