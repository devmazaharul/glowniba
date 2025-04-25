// /app/api/logs/route.ts (App Router)
import { loggerInformation } from '@/utils/logsView';
import { NextResponse } from 'next/server';

export async function GET() {
  const logs = loggerInformation("error");
  return NextResponse.json(logs.reverse()); // latest on top
}
