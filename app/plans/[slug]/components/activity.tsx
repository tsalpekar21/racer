import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { PropsWithRef } from "react";

export type ActivityProps = {
  title: string;
  details: string;
  day: number;
  week: number;
};

export function Activity({
  title,
  details,
  day,
  week,
  ...props
}: ActivityProps & PropsWithRef<React.HTMLAttributes<HTMLDivElement>>) {
  const activityDate = dayjs().day(day).week(week);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{details}</CardDescription>
        <div>{activityDate.format("ddd | MMMM D")}</div>
      </CardHeader>
    </Card>
  );
}
