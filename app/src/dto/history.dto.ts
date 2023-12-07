import { Expose, Type } from "class-transformer";
import ProductionDto from "./production.dto";

export default class HistoryDto {
  @Expose({ name: "brk_time" })
  public readonly breakTime: number = 0;

  @Expose({ name: "eat_time" })
  public readonly eatTime: number = 0;

  @Expose({ name: "end_time" })
  public readonly endTime: string = "";

  @Expose({ name: "start_time" })
  public readonly startTime: string = "";

  @Expose({ name: "mid" })
  public readonly mid: string = "";

  @Expose({ name: "mkey" })
  public readonly mkey: number = 0;

  @Expose({ name: "total_time" })
  public readonly totalTime: number = 0;

  @Expose({ name: "work_time" })
  public readonly workTime: number = 0;

  @Expose({ name: "date" })
  public readonly date: string = "";

  @Expose({ name: "data" })
  @Type(() => ProductionDto)
  public readonly data: ProductionDto[] = [];
}
