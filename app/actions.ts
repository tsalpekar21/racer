"use server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NOVICE_2_TRAINING_PLAN } from "@/lib/run";
const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function extractTrainingPlan(formData: FormData) {
  const url = formData.get("url") as string;
  // const plan = await loadPlan(url);
  const plan = await fakeLoadPlan(url);
  const existingPlan = await prisma.siteTrainingPlan.findUnique({
    where: { slug: plan["slug"] },
  });
  if (!existingPlan) {
    await prisma.siteTrainingPlan.create({
      data: {
        title: plan["title"],
        slug: plan["slug"],
        plan: plan["activities"],
      },
    });
  }
  redirect(`/plans/${plan["slug"]}`);
}

async function fakeLoadPlan(url: string) {
  return NOVICE_2_TRAINING_PLAN;
}

async function loadPlan(url: string) {
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
      Extract the title of the training plan and generate a unique slug based on the title that's URL safe.
      Ensure every race in the response contains a date, an activity, and a mileage number (if applicable).
      ${url}`,
  });

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
      console.log(
        `${message.role} > ${(message.content[0] as any).text.value}`,
      );

      return (message.content[0] as any).text.value;
    }
  } else {
    console.log(run.status);
  }
}
