/**
 * 
 */

import { DynamicNumber } from "@brendangooch/dynamic-objects";
import { clamp } from "@brendangooch/maths";
import { wait } from "@brendangooch/utils";
import { iDynamic } from "./i-dynamic.js";
import { tEaseOption } from "./t-ease-option.js";

export class Brightness implements iDynamic {

    private static MIN_BRIGHTNESS: number = 0;
    private static MAX_BRIGHTNESS: number = 5;

    private brightness: DynamicNumber;

    // default is 1
    public constructor(init?: number) {
        this.brightness = new DynamicNumber(init || 1);
    }

    public get current(): number {
        return this.brightness.current;
    }

    public get isOn(): boolean {
        return this.brightness.isOn;
    }

    public get isComplete(): boolean {
        return this.brightness.isComplete;
    }

    public get isActive(): boolean {
        return this.brightness.isActive;
    }

    public save(): string {
        return this.brightness.save();
    }

    public load(json: string): void {
        this.brightness.load(json);
    }

    public update(ms: number): void {
        if (this.brightness.isOn) this.brightness.update(ms);
    }

    // amount clamped to between MIN_BRIGHTNESS and MAX_BRIGHTNESS
    public adjustTo(amount: number, duration: number, ease?: tEaseOption): Promise<void> {
        amount = clamp(amount, Brightness.MIN_BRIGHTNESS, Brightness.MAX_BRIGHTNESS);
        return new Promise(res => {
            this.brightness.change(amount, duration, ease);
            wait(duration).then(() => res);
        });
    }

};