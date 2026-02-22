import { createClient, requiredEnv } from "./_client.mjs";

async function main() {
  const client = createClient();
  const collectionId = requiredEnv("KREBSITI_COLLECTION_ID");
  const abortController = new AbortController();

  const timeoutMs = Number(process.env.KREBSITI_ABORT_AFTER_MS || 0);
  const timeout =
    timeoutMs > 0
      ? setTimeout(() => {
          abortController.abort();
        }, timeoutMs)
      : null;

  try {
    const stream = await client.chat.completions.create(
      {
        model: "krebsiti-fast",
        stream: true,
        kb_collection_ids: [collectionId],
        web_search: { enabled: true },
        file_search: { collection_id: collectionId, max_num_results: 5 },
        messages: [
          {
            role: "user",
            content: "ამ საკითხზე გააკეთე KB-first პასუხი, და თუ საჭიროა დაამატე web წყაროებიც.",
          },
        ],
      },
      { signal: abortController.signal },
    );

    for await (const chunk of stream) {
      const token = chunk?.choices?.[0]?.delta?.content;
      if (token) process.stdout.write(token);
    }
    process.stdout.write("\n");
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

main().catch((err) => {
  if (err?.name === "AbortError") {
    console.error("Stream aborted");
    return;
  }
  console.error(err);
  process.exit(1);
});

