import { createClient, requiredEnv } from "./_client.mjs";

async function main() {
  const client = createClient();
  const collectionId = requiredEnv("KREBSITI_COLLECTION_ID");

  const completion = await client.chat.completions.create({
    model: "krebsiti-fast",
    kb_collection_ids: [collectionId],
    file_search: {
      collection_id: collectionId,
      max_num_results: 5,
    },
    messages: [
      {
        role: "user",
        content: "იპოვე დოკუმენტებში ვადების შესახებ ნაწილი და მოკლედ ამიხსენი.",
      },
    ],
  });

  console.log(completion?.choices?.[0]?.message?.content || "");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

