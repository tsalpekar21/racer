import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RunCalendar } from "./components/run-calendar";
import { Activity } from "./components/activity";
import prisma from "@/lib/primsa";
import dayjs from "dayjs";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const plan = await prisma.siteTrainingPlan.findUnique({
    where: { slug },
  });

  if (!plan || !plan.plan) {
    return <div>Plan not found</div>;
  }

  const raceDate = dayjs("2024-10-13");
  const currentDate = dayjs();
  const lengthOfPlan = Math.max(
    ...(plan.plan as any).map((activity: any) => activity.week),
  );
  const weekOffset = raceDate.week() - lengthOfPlan;
  const todaysActivity = (plan.plan as any).find(
    (activity: any) =>
      activity.day === currentDate.day() &&
      activity.week === currentDate.week() - weekOffset,
  );
  const upcomingActivities = (plan.plan as any)
    .filter(
      (activity: any) =>
        activity.week >= currentDate.week() - weekOffset &&
        activity.day >= currentDate.day(),
    )
    .slice(0, 3);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-4 sm:gap-4">
      <div className="hidden sm:grid sm:col-span-3">
        <h3>Calendar</h3>
        <RunCalendar
          plan={plan.plan}
          weekOffset={weekOffset}
          className="bg-zinc-950 w-full"
        />
      </div>

      <div className="col-span-1">
        <h3 className="mb-4 w-full">{"Today's Activity"}</h3>
        <Activity
          title={todaysActivity.type}
          details={todaysActivity.details}
          day={todaysActivity.day}
          week={todaysActivity.week + weekOffset}
        />
        <h3 className="mt-4 w-full">{"Upcoming Activities"}</h3>
        {upcomingActivities.map((activity: any) => (
          <Activity
            className="my-4"
            key={activity.day + activity.week}
            title={activity.type}
            details={activity.details}
            day={activity.day}
            week={activity.week + weekOffset}
          />
        ))}
      </div>

      {/* <Table className="mt-16">
        <TableCaption>Training Plan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead className="w-[100px]">Day</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Mileage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(plan.plan as any).map((race: any) => (
            <TableRow key={race.day + race.week}>
              <TableCell>{race.week}</TableCell>
              <TableCell className="font-medium">{race.day}</TableCell>
              <TableCell className="font-medium">{race.type}</TableCell>
              <TableCell>{race.details || "None"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
}
