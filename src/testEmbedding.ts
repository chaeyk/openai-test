import { IndexFlatL2 } from "faiss-node";
import OpenAI from "openai";

export async function testEmbedding(openai: OpenAI) {
  const in_embedding = await openai.embeddings.create({
    input: '오늘은 비가 오지 않아서 다행이다.',
    model: 'text-embedding-ada-002',
  });
  const in_embeds = in_embedding.data.map((v) => v.embedding).flat();

  const target_strs = [
    '좋아하는 음식은 무엇인가요?',
    '어디에 살고 계신가요?',
    '아침 전철은 혼잡하네요.',
    '오늘은 날씨가 좋네요!',
    '요즘 경기가 좋지 않네요.',
  ];
  const target_embedding = await openai.embeddings.create({
    input: target_strs,
    model: 'text-embedding-ada-002',
  });
  const target_embeds = target_embedding.data.map((v) => v.embedding).flat();

  const index = new IndexFlatL2(1536);
  index.add(target_embeds)

  const search = index.search(in_embeds, 1);
  console.log(`distance = ${search.distances}`);
  console.log(`result = ${target_strs[search.labels[0]]}`);
}
