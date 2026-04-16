export default function PlanBadge({ plan }: { plan: string }) {
  const colors: any = {
    free: 'bg-gray-600',
    pro: 'bg-blue-600',
    elite: 'bg-purple-600'
  };

  return (
    <span className={`px-2 py-1 rounded text-white text-xs ${colors[plan]}`}>
      {plan.toUpperCase()}
    </span>
  );
}
