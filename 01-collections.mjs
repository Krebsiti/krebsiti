import { createClient, requiredEnv } from "./_client.mjs";

async function main() {
  const client = createClient();
  const collectionId = requiredEnv("KREBSITI_COLLECTION_ID");

  const completion = await client.chat.completions.create({
    model: "krebsiti-fast",
    web_search: false,
    kb_collection_ids: [collectionId],
    messages: [
      {
        role: "user",
        content: "მომეცი მოკლე შეჯამება ამ კოლექციიდან ყველაზე მნიშვნელოვანი პუნქტებით.",
      },
    ],
  });

  console.log(completion?.choices?.[0]?.message?.content || "");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

