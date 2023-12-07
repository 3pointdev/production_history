import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { fetchHistory } from "src/redux/actions/fetchHistory";
import { selectHistoryState } from "src/redux/reducers/history/historyReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";
import HistoryTable from "./historyTable";

export default function TableList() {
  const state = useAppSelector(selectHistoryState);
  const dispatch = useAppDispatch();
  const [viewIndex, setViewIndex] = useState<number[]>(null);

  useEffect(() => {
    // 어제를 기준으로 5일간 데이터를 뽑아 올 수 있도록 한다.
    const targetDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    dispatch(fetchHistory({ targetDate, count: 0 }));
  }, []);

  useEffect(() => {
    setViewIndex([0, 1, 2]);
    const intervalId = setInterval(() => {
      setViewIndex((prevIndex) => {
        if (prevIndex === null) {
          return [0, 1, 2];
        }
        const machineKeys = Object.keys(state.machines);
        const totalMachines = machineKeys.length;

        let nextIndex2 = [];

        for (let i = 0; i < 3; i++) {
          const number = prevIndex[i] + 3;
          if (number < totalMachines) {
            nextIndex2.push(number);
          }
        }

        if (prevIndex[prevIndex.length - 1] + 1 >= totalMachines) {
          nextIndex2 = [0, 1, 2];
        }

        return nextIndex2;
      });
    }, 15000);

    return () => {
      console.log("clear!");
      clearInterval(intervalId);
    };
  }, [state.machines]);

  console.log(state.machines);

  return (
    <div className="flex flex-col gap-8">
      {Object.keys(state.machines).map((key: string, index: number) => {
        if (viewIndex !== null && viewIndex.includes(index))
          return (
            <HistoryTable
              data={state.machines[key]}
              machineName={key}
              key={`${index}_table`}
            />
          );
      })}
    </div>
  );
}
