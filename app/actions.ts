"use server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function extractTrainingPlan(formData: FormData) {
  const url = formData.get("url") as string;

  const assistant = await openai.beta.assistants.create({
    name: "Race Extractor",
    instructions: "You are extracting race training data from a website.",
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  console.log(`Extracting training plan from ${url}`);

  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `Extract the running training plan from this web page in the form of JSON.
      Assume that the beginning of the training plan is 2024-06-16.
      Ensure every race in the response contains a date, an activity, and a mileage number (if applicable).
      ${url}`,
  });

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`);
    }
  } else {
    console.log(run.status);
  }
}
