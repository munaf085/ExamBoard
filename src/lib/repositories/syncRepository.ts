import { JavaProgress, SelfEvaluation } from '@/types';

/**
 * Future backend contracts for offline-to-cloud progress synchronization.
 * Pure interface definitions ready for future sync endpoints.
 * DO NOT IMPLEMENT LIVE NETWORK CALLS NOW.
 */

export interface SyncPayload {
  userId: string;
  clientTimestamp: number;
  progress: JavaProgress;
  selfEvaluations: Record<string, SelfEvaluation>;
  solvedAssignments: string[];
}

export interface SyncResult {
  success: boolean;
  serverTimestamp: number;
  mergedProgress: JavaProgress;
  conflictsResolved: number;
}

export type ConflictStrategy = 'client_wins' | 'server_wins' | 'union_merge';

export interface SyncRepository {
  pushLocalProgress(payload: SyncPayload, strategy?: ConflictStrategy): Promise<SyncResult>;
  pullRemoteProgress(userId: string): Promise<SyncPayload | null>;
}
