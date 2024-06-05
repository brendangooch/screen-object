/**
 * 
 */

import { DynamicUnit } from "@brendangooch/dynamic-objects";
import { wait } from "@brendangooch/utils";
import { iDynamic } from "./i-dynamic.js";

export class Visibility implements iDynamic {

    private visibility: DynamicUnit;

    public constructor(visible?: boolean) {
        this.visibility = new DynamicUnit();
        if (visible) this.show();
    }

    public get isVisible(): boolean {
        return this.visibility.current === 1;
    }

    public get isOn(): boolean {
        return this.visibility.isOn;
    }

    public get isComplete(): boolean {
        return this.visibility.isComplete;
    }

    public get isActive(): boolean {
        return this.visibility.isActive;
    }

    public save(): string {
        return this.visibility.save();
    }

    public load(json: string): void {
        this.visibility.load(json);
    }

    public update(ms: number): void {
        if (this.visibility.isOn) this.visibility.update(ms);
    }

    public show(): void {
        this.visibility.start(0, { invert: true, round: true });
    }

    public hide(): void {
        this.visibility.start(0, { invert: false, round: true });
    }

    // frequency in ms
    public blink(repeat: number, frequency: number): Promise<void> {
        const duration = repeat * frequency;
        return new Promise(res => {
            this.visibility.start(frequency, { round: true, repeat: repeat, alternate: true });
            wait(duration).then(() => res);
        });
    }

};