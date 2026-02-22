import { createClient } from "./_client.mjs";

async function main() {
  const client = createClient();

  const stream = await client.chat.completions.create({
    model: "krebsiti-fast",
    stream: true,
    messages: [
      {
        role: "user",
        content: "მომეცი მოკლე, პუნქტებად პასუხი: რა არის GDPR?",
      },
    ],
  });

  for await (const chunk of stream) {
    const token = chunk?.choices?.[0]?.delta?.content;
    if (token) process.stdout.write(token);
  }

  process.stdout.write("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

