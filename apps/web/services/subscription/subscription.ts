// src/services/subscription.ts
import  {prisma}  from "@/lib/prisma"; 
import {  SubscriptionStatus } from "@prisma/client";



export async function createSubscription(
  organizationId: string,
  planId:string
) {
  return prisma.subscription.create({
    data: {
      organization_id: organizationId,
      plan_id:planId,
      status: SubscriptionStatus.active, 
    },
  });
}

export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: SubscriptionStatus
) {
  return prisma.subscription.update({
    where: { id: subscriptionId },
    data: { status },
  });
}

export async function getSubscriptionByOrg(organizationId: string) {
  return prisma.subscription.findUnique({
    where: { organization_id: organizationId },
  });
} 
