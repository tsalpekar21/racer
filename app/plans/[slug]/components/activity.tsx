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
      <CardHeader className="flex flex-row justify-between">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
          <span className="text-sm text-muted-foreground">{details}</span>
        </div>
        <div className="flex flex-row items-center">
          <Separator orientation="vertical" className="mr-4" />
          {activityDate.format("ddd, MMMM D")}
        </div>
      </CardHeader>
    </Card>
  );
}
