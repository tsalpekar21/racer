"use client";

import * as React from "react";
import { CustomComponents, type DayContentProps } from "react-day-picker";

import { DayPicker } from "react-day-picker";

import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Calendar } from "@/components/ui/calendar";
dayjs.extend(weekOfYear);

type PlanProps = {
  plan: any;
  weekOffset: number;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> & PlanProps;

function DayContent({ date, weekOffset, plan }: DayContentProps & PlanProps) {
  const currentDate = dayjs(date);
  const dateActivity = plan.find(
    (activity: any) =>
      activity.day === currentDate.day() &&
      activity.week === currentDate.week() - weekOffset,
  );

  return (
    <div>
      <div className="text-sm">{date.getDate()}</div>
      {dateActivity && <div className="text-sm">{dateActivity.details}</div>}
    </div>
  );
}

export function RunCalendar({
  plan,
  weekOffset,
  ...calendarProps
}: PlanProps & CalendarProps) {
  const components: CustomComponents = {
    DayContent: ({ ...props }) => (
      <DayContent weekOffset={weekOffset} plan={plan} {...props} />
    ),
  };

  return (
    <Calendar
      className="w-full"
      components={components}
      size="24"
      classNames={{
        months: "space-y-4 sm:space-x-4 sm:space-y-0",
        nav: "space-x-1",
        head_row: "",
        row: "w-full mt-2",
      }}
      {...calendarProps}
    />
  );
}
