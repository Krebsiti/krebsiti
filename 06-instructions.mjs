import { createClient } from "./_client.mjs";

async function main() {
  const client = createClient();

  const completion = await client.chat.completions.create({
    model: "krebsiti-fast",
    instructions: [
      "You are Krebsiti.",
      "Always answer in Georgian (ka-GE).",
      "Keep answers short and practical.",
      "If you cite facts, include sources when available.",
    ].join("\n"),
    messages: [
      {
        role: "user",
        content: "მითხარი რა არის მონაცემთა დაცვა 3 მოკლე პუნქტად.",
      },
    ],
  });

  console.log(completion?.choices?.[0]?.message?.content || "");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

