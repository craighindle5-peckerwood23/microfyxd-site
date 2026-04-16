export function isFeatureLocked(user: any, requiredPlan: string) {
  if (!user) return true;

  const order = ['free', 'pro', 'elite'];

  return order.indexOf(user.membership_plan) < order.indexOf(requiredPlan);
}
