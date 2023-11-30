import { SimpleDirectoryReader, VectorStoreIndex } from "llamaindex";

export async function testLlamaIndex() {
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData({ directoryPath: 'txt' });

  const index = await VectorStoreIndex.fromDocuments(documents);
  const queryEngine = index.asQueryEngine();
  console.log(await queryEngine.query('미코의 소꿉친구 이름은?'));
  console.log(await queryEngine.query('울프 코퍼레이션의 CEO 이름은?'));
  console.log(await queryEngine.query('미코의 성격은?'));
}