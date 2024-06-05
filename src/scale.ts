/**
 * 
 */

import { DynamicNumber } from "@brendangooch/dynamic-objects";
import { wait } from "@brendangooch/utils";
import { iDynamic } from "./i-dynamic.js";
import { tEaseOption } from "./t-ease-option.js";

export class Scale implements iDynamic {

    private scale: DynamicNumber;

    // default is a scale of 1
    public constructor(init?: number) {
        this.scale = new DynamicNumber(init || 1);
    }

    public get current(): number {
        return this.scale.current;
    }

    public get isOn(): boolean {
        return this.scale.isOn;
    }

    public get isComplete(): boolean {
        return this.scale.isComplete;
    }

    public get isActive(): boolean {
        return this.scale.isActive;
    }

    public save(): string {
        return this.scale.save();
    }

    public load(json: string): void {
        this.scale.load(json);
    }

    public update(ms: number): void {
        if (this.scale.isOn) this.scale.update(ms);
    }

    public scaleTo(amount: number, duration: number, ease?: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.scale.change(amount, duration, ease);
            wait(duration).then(() => res);
        });
    }

};
