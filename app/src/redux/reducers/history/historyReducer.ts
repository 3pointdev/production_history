import { createSlice } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";
import { HistoryDate } from "config/constants";
import HistoryDto from "src/dto/history.dto";
import { RootState } from "../../store";

export interface HistoryState {
  machines: { [key: string]: HistoryDto[] };
  dates: string[];
}

const initialState: HistoryState = {
  machines: {},
  dates: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    /**
     * machines의 데이터 중 같은값을 찾아서 이미 5개가 있는 경우 break;
     * 아닌 경우 같은값이 있다면 새 데이터 push 없다면 새 데이터 셋팅
     */
    setHistory: (state, action) => {
      let newMachines = state.machines;

      for (let i = 0; i < action.payload.list.length; i++) {
        const target = action.payload.list[i];
        if (newMachines[target.mid]?.length > HistoryDate) break;

        if (target.mid in state.machines) {
          newMachines[target.mid].unshift(
            plainToInstance(HistoryDto, {
              ...target,
              date: action.payload.date,
            })
          );
        } else {
          newMachines[target.mid] = [
            plainToInstance(HistoryDto, {
              ...target,
              date: action.payload.date,
            }),
          ];
        }
      }

      state.machines = newMachines;
      state.dates.unshift(action.payload.date);
    },
  },
});

export const { setHistory } = historySlice.actions;
export const selectHistoryState = (state: RootState) => state.history;
export default historySlice.reducer;
