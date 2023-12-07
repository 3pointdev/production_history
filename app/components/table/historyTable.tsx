import { TableBackgroundColorType } from "config/constants";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import HistoryDto from "src/dto/history.dto";

interface IProps {
  machineName: string;
  data: HistoryDto[];
}

export default function HistoryTable({ data, machineName }: IProps) {
  const [dataLength, setDataLength] = useState<number>(1);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].data.length > dataLength) {
        setDataLength(data[i].data.length);
      }
    }
  }, [data]);

  const setBackground = (index: number) => {
    return index % 2 === 0
      ? TableBackgroundColorType.ODD
      : TableBackgroundColorType.EVEN;
  };

  const secToString = (time: number) => {
    if (typeof time !== "number" || isNaN(time) || time < 0) {
      return "0시간 0분 0초";
    }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    let result = "";

    if (hours > 0) {
      result += `${hours}시간`;
    }

    if (minutes > 0) {
      if (result.length > 0) {
        result += " ";
      }
      result += `${minutes}분`;
    }

    if (seconds > 0) {
      if (result.length > 0) {
        result += " ";
      }
      result += `${seconds}초`;
    }

    return result;
  };

  return (
    <table className="flex overflow-x-auto overflow-y-hidden w-full border-2 border-black text-2xl font-bold">
      <thead className="w-1/5 shrink-0">
        <tr className="w-full block text-3xl">
          <th className="font-extrabold">{machineName}</th>
          <th>기계가동률</th>
          {dataLength < 2 ? (
            <>
              <th style={{ background: TableBackgroundColorType.ODD }}>
                가공명
              </th>
              <th style={{ background: TableBackgroundColorType.ODD }}>
                생산량
              </th>
              <th style={{ background: TableBackgroundColorType.ODD }}>
                평균실가공
              </th>
              <th style={{ background: TableBackgroundColorType.ODD }}>
                평균준비교체
              </th>
            </>
          ) : (
            [...new Array(dataLength)].map((value, index: number) => {
              const bgColor = setBackground(index);

              return (
                <>
                  <th style={{ background: bgColor }}>{`가공명`}</th>
                  <th style={{ background: bgColor }}>{`생산량`}</th>
                  <th style={{ background: bgColor }}>{`평균실가공`}</th>
                  <th style={{ background: bgColor }}>{`평균준비교체`}</th>
                </>
              );
            })
          )}
        </tr>
      </thead>
      <tbody className="flex w-4/5 shrink-0">
        {data.map((history: HistoryDto, index: number) => {
          const day = dayjs(history.date).format("MM/DD");
          return (
            <tr key={`${history.mid}_${index}`} className="w-1/3">
              <td className="flex items-center justify-center text-3xl">
                {day}
              </td>
              <td className="text-[34px]">
                {`${Math.round((history.workTime / history.totalTime) * 100)}%`}
              </td>
              {[...new Array(dataLength)].map((value, index: number) => {
                const bgColor = setBackground(index);
                const program = history.data[index]?.program.includes("(")
                  ? history.data[index].program.split("(")[1]?.split(")")[0]
                  : history.data[index]?.program;
                if (history.data[index]) {
                  return (
                    <>
                      <td
                        className="text-[26px]"
                        style={{ background: bgColor }}
                      >
                        {program}
                      </td>
                      <td className="text-3xl" style={{ background: bgColor }}>
                        {`${history.data[index]?.count} 개`}
                      </td>
                      <td className="text-3xl" style={{ background: bgColor }}>
                        {secToString(history.data[index]?.avgActive)}
                      </td>
                      <td className="text-3xl" style={{ background: bgColor }}>
                        {secToString(history.data[index]?.avgIdle)}
                      </td>
                    </>
                  );
                } else {
                  return (
                    <>
                      <td style={{ background: bgColor }}></td>
                      <td style={{ background: bgColor }}></td>
                      <td style={{ background: bgColor }}></td>
                      <td style={{ background: bgColor }}></td>
                    </>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
