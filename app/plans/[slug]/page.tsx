export default function Plans({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <div>Here we are on the plan {slug}</div>;
}
