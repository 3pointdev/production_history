/**
 * 서버주소 타입
 */
export const ServerUrlType = {
  BARO: process.env.NEXT_PUBLIC_BARO_URL,
} as const;
export type ServerUrlType = (typeof ServerUrlType)[keyof typeof ServerUrlType];

/**
 * fetch 날짜 상수
 */
export const HistoryDate = 2 as const;
export type HistoryDate = (typeof HistoryDate)[keyof typeof HistoryDate];

/**
 * 표 홀 짝수 색상 상수
 */
export const TableBackgroundColorType = {
  EVEN: "#ebffaa",
  ODD: "#affffe",
} as const;
export type TableBackgroundColorType =
  (typeof TableBackgroundColorType)[keyof typeof TableBackgroundColorType];
