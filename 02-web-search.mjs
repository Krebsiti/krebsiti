import { createClient } from "./_client.mjs";

async function main() {
  const client = createClient();

  const completion = await client.chat.completions.create({
    model: "krebsiti-fast",
    web_search: {
      enabled: true,
      allowed_domains: ["matsne.gov.ge", "parliament.ge"],
    },
    messages: [
      {
        role: "user",
        content: "რა არის უახლესი ცვლილებები საქართველოს შრომის კოდექსში?",
      },
    ],
  });

  console.log(completion?.choices?.[0]?.message?.content || "");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

