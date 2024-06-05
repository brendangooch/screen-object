/**
 * 
 */

import { DynamicNumber } from "@brendangooch/dynamic-objects";
import { wait } from "@brendangooch/utils";
import { iDynamic } from "./i-dynamic.js";
import { tEaseOption } from "./t-ease-option.js";

export class Opacity implements iDynamic {

    private opacity: DynamicNumber;

    // default is 1
    public constructor(init?: number) {
        this.opacity = new DynamicNumber(init || 1);
    }

    public get current(): number {
        return this.opacity.current;
    }

    public get isOn(): boolean {
        return this.opacity.isOn;
    }

    public get isComplete(): boolean {
        return this.opacity.isComplete;
    }

    public get isActive(): boolean {
        return this.opacity.isActive;
    }

    public save(): string {
        return this.opacity.save();
    }

    public load(json: string): void {
        this.opacity.load(json);
    }

    public update(ms: number): void {
        if (this.opacity.isOn) this.opacity.update(ms);
    }

    public fadeIn(duration: number, ease?: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.opacity.change(1, duration, ease);
            wait(duration).then(() => res);
        });
    }

    public fadeOut(duration: number, ease?: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.opacity.change(0, duration, ease);
            wait(duration).then(() => res);
        });
    }

};
