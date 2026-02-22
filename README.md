# krebsiti

Official JavaScript client for the Krebsiti Developer API.

## Install

```bash
npm install krebsiti
```

## Quick start

```ts
import { KrebsitiClient } from "krebsiti";

const client = new KrebsitiClient({
  apiKey: process.env.KREBSITI_API_KEY!,
  baseURL: process.env.KREBSITI_BASE_URL, // optional
});

const completion = await client.chat.completions.create({
  model: "krebsiti-fast",
  messages: [
    { role: "system", content: "You are Krebsiti." },
    { role: "user", content: "გამარჯობა" },
  ],
});

console.log(completion.choices?.[0]?.message?.content);
```

## Streaming

```ts
const stream = await client.chat.completions.create({
  model: "krebsiti-fast",
  stream: true,
  messages: [{ role: "user", content: "Give me a short summary." }],
});

for await (const chunk of stream as AsyncGenerator<any>) {
  if (chunk?.choices?.[0]?.delta?.content) {
    process.stdout.write(chunk.choices[0].delta.content);
  }
}
```

## API compatibility

`krebsiti` targets `POST /api/v1/chat/completions` and supports common OpenAI-style fields:

- `model`
- `messages`
- `stream`
- `instructions`
- `temperature`
- `max_tokens`
- `web_search`
- `file_search`
- `kb_collection_ids`

## Errors

API failures throw `KrebsitiApiError` with:

- `status`
- `code`
- `body`
