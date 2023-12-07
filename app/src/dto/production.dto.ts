import { Expose } from "class-transformer";

export default class ProductionDto {
  @Expose({ name: "avg_active" })
  public readonly avgActive: number = 0;

  @Expose({ name: "avg_idle" })
  public readonly avgIdle: number = 0;

  @Expose({ name: "count" })
  public readonly count: number = 0;

  @Expose({ name: "lot" })
  public readonly lot: number = 0;

  @Expose({ name: "plan" })
  public readonly plan: number = 0;

  @Expose({ name: "setting_time" })
  public readonly settingTime: number = 0;

  @Expose({ name: "std_active" })
  public readonly stdActive: number = 0;

  @Expose({ name: "lot_end" })
  public readonly lotEnd: string = "";

  @Expose({ name: "lot_start" })
  public readonly lotStart: string = "";

  @Expose({ name: "program" })
  public readonly program: string = "";

  @Expose({ name: "setting_end" })
  public readonly settingEnd: string = "";

  @Expose({ name: "setting_start" })
  public readonly settingStart: string = "";
}
