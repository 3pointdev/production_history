import axios, { AxiosError, AxiosResponse } from "axios";
import { HistoryDate } from "config/constants";
import dayjs from "dayjs";
import { Dispatch } from "redux";
import { setHistory } from "../reducers/history/historyReducer";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
  resetIndicatorState,
} from "../reducers/indicator/indicatorReducer";

interface IParams {
  targetDate: string;
  count: number;
}

/**
 * [재귀] 전일을 기준으로 생산리포트를 가져오고 만약 가져온 날짜의 데이터가 없다면 그 전일 데이터를 가져오게 됨.
 * 총 HistoryDate일간의 데이터를 가져오고 종료되는 fetch함수
 * @param targetDate 접속 기준 전날 (YYYY-MM-DD) string
 * @param count 컴포넌트나 뷰파일에서 실행 시 0을 입력하면 총 5일간 데이터를 수집하도록 되어있음. number
 */
export const fetchHistory = ({ targetDate, count }: IParams): any => {
  const url = `${process.env.NEXT_PUBLIC_BARO_URL}/report/${targetDate}`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch: Dispatch) => {
    dispatch(increaseIndicatorState());
    api
      .get(url, {
        params: {
          sender: window.localStorage.getItem("sender"),
        },
      })
      .then((result: AxiosResponse) => {
        if (result.data.length < 1) {
          dispatch(
            fetchHistory({
              targetDate: dayjs(targetDate)
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
              count: count,
            })
          );
        } else {
          dispatch(setHistory({ list: result.data, date: targetDate }));
          if (count < HistoryDate) {
            dispatch(
              fetchHistory({
                targetDate: dayjs(targetDate)
                  .subtract(1, "day")
                  .format("YYYY-MM-DD"),
                count: count + 1,
              })
            );
          }
        }

        if (count === HistoryDate) {
          dispatch(resetIndicatorState());
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
        dispatch(decreaseIndicatorState());
      });
  };
};
