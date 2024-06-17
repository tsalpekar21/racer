"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractTrainingPlan } from "./actions";
import { useFormStatus } from "react-dom";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={extractTrainingPlan} method="POST">
        <Card>
          <CardHeader>
            <CardTitle>Select a training plan</CardTitle>
            <CardDescription>
              Choose a training plan from a website you know.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="email">Race Plan Link</Label>
            <Input
              type="url"
              required
              placeholder="https://www.halhigdon.com/training-programs/marathon-training/novice-2-marathon/"
              name="url"
              value="https://www.halhigdon.com/training-programs/marathon-training/novice-2-marathon/"
            />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>Submit</Button>;
};
