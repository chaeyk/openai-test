import OpenAI from "openai";
import fs from 'node:fs';

export async function testImage(openai: OpenAI) {
  const edit = await openai.images.edit({
    image: fs.createReadStream('img/racing.png'),
    prompt: 'Cats are running on the racing road. They are running with a look of horror on their faces.',
  })
  console.log(edit);
}
