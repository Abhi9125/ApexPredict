export const CACHE_TTL = {
  LIVE_MATCH: 5,
  MATCH_LIST: 60,
  USER_PROFILE: 300,
  AI_INSIGHT: 86400,
} as const;


export const CACHE_KEYS = {
  MATCH_DETAIL: (matchId: string) => `apexpredict:match:${matchId}`,
  LIVE_MATCHES: 'apexpredict:matches:live',
  MATCH_LIST: (queryParams: string) => `apexpredict:matches:list:${queryParams}`,
  AI_INSIGHT: (matchId: string) => `apexpredict:insight:${matchId}`,
  USER_PROFILE: (userId: string) => `apexpredict:user:${userId}`,
} as const;