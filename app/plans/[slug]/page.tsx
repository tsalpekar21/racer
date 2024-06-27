import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrismaClient } from "@prisma/client";
import { Calendar } from "@/components/ui/calendar";
const prisma = new PrismaClient();

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const plan = await prisma.siteTrainingPlan.findUnique({
    where: { slug },
  });

  if (!plan || !plan.plan) {
    return <div>Plan not found</div>;
  }

  return (
    <div className="p-8">
      <Calendar
        plan={plan.plan}
        raceDate={new Date("2024-10-13")}
        className="flex justify-center flex-grow bg-zinc-950 w-full"
      />

      <Table className="mt-16">
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
          {plan.plan.map((race: any) => (
            <TableRow key={race.day + race.week}>
              <TableCell>{race.week}</TableCell>
              <TableCell className="font-medium">{race.day}</TableCell>
              <TableCell className="font-medium">{race.type}</TableCell>
              <TableCell>{race.details || "None"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
