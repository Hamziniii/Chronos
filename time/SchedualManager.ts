import TimeSlot, { TimeSlotSettings } from "./TimeSlot";
import Schedual, { SchedualSettings } from "./Schedual";
import { EventEmitter } from "events";
import { settings } from "cluster";
export default class SchedualManager {
  private _currentTag: string = "";
  private _nextTag: string = "";
  private _scheduals: Array<Schedual> = [];
  private _currentSchedual: Schedual | null = null;
  private nextSchedual: EventEmitter;
  private _settings: SchedualSettings[];
  constructor(scheduals: SchedualSettings[]) {
    this._settings = scheduals;
    this.nextSchedual = new EventEmitter();
    this.nextSchedual.on("end", () => {
      this.goToNextSchedual();
    });
    scheduals.map((schedual) => {
      this._scheduals.push(new Schedual(schedual, this.nextSchedual));
    });
  }
  //Finds index of Schedual based on given tag or returns -1 if not found
  private getSchedualIndexBasedOnTag(tag: string): number {
    let r = -1;
    this._scheduals.map((schedual: Schedual, i) => {
      schedual.tags.map((testTag: String) => {
        if (testTag == tag) {
          r = i;
        }
      });
    });
    return r;
  }
  set setNextTag(tag: string) {
    this._nextTag = tag;
  }
  //Go to schedual based on _nextTag
  public goToNextSchedual() {
    this.goToSchedual(this._nextTag);
  }
  //i is the index of current schedual
  private generateOutOfBounds(i: number): TimeSlotSettings {
    if (this._nextTag) {
    }
    return {
      begin: this._settings[i].timeSlots[this._settings[i].timeSlots.length - 1]
        .end,
      end: this._settings[this.getSchedualIndexBasedOnTag(this._nextTag)]
        .timeSlots[0].begin,
      name: this._settings[i].outOfBoundsName,
    };
  }
  //Go to schedual based on tag
  public goToSchedual(tag: string) {
    //Gets rid of chance of nextSchedual emitter from being activated
    if (this._currentSchedual) {
      this._currentSchedual.purify();
    }
    let schedualIndex = this.getSchedualIndexBasedOnTag(tag);
    console.log(schedualIndex);
    this._currentSchedual = this._scheduals[schedualIndex];
    this._currentTag = tag;
    this._nextTag = this._settings[schedualIndex].defaultNextSchedualTag;
    this._currentSchedual.initiateCurrentTimeSlot(
      this.generateOutOfBounds(schedualIndex)
    );
  }
  public get currentTimeSlot(): TimeSlot | null {
    if (this._currentSchedual) {
      let currentTimeSlot: TimeSlot | null = this._currentSchedual
        .currentTimeSlot;
      if (currentTimeSlot) {
        return currentTimeSlot;
      }
      console.log("No valid time found based on tags");
      return null;
    }
    console.log("No valid schedual found based on tags");
    return null;
  }
  public get currentTag(): string {
    return this._currentTag;
  }
}
