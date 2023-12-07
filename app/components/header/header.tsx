import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { selectHistoryState } from "src/redux/reducers/history/historyReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function Header() {
  const [dateRange, setDateRange] = useState<string>("");
  const state = useAppSelector(selectHistoryState);

  useEffect(() => {
    setDateRange(
      `${dayjs(state.dates[0]).format("MM/DD")} ~ ${dayjs(
        state.dates[state.dates.length - 1]
      ).format("MM/DD")}`
    );
  }, [state.dates]);
  return (
    <header className="w-full h-12 flex items-center justify-center mb-6">
      <h1 className=" text-4xl font-bold">{`생산이력 ( ${dateRange} )`}</h1>
    </header>
  );
}
