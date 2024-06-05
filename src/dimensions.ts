/**
 * 
 */

import { DynamicNumber } from "@brendangooch/dynamic-objects";
import { wait } from "@brendangooch/utils";
import { iDynamic } from "./i-dynamic.js";
import { tEaseOption } from "./t-ease-option.js";

export class Dimensions implements iDynamic {

    private w: DynamicNumber;
    private h: DynamicNumber;
    private r: DynamicNumber;

    public constructor(props: { width?: number, height?: number, radius?: number }) {
        this.w = new DynamicNumber(props.width || 0);
        this.h = new DynamicNumber(props.height || 0);
        this.r = new DynamicNumber(props.radius || 0);
    }

    public get width(): number {
        return this.w.current;
    }

    public get height(): number {
        return this.h.current;
    }

    public get radius(): number {
        return this.r.current;
    }

    public get isOn(): boolean {
        return this.w.isOn || this.h.isOn || this.r.isOn;
    }

    public get isComplete(): boolean {
        return this.w.isComplete && this.h.isComplete && this.r.isComplete;
    }

    public get isActive(): boolean {
        return this.w.isActive || this.h.isActive || this.r.isActive;
    }

    public save(): string {
        return JSON.stringify({
            width: this.w.save(),
            height: this.h.save(),
            radius: this.r.save()
        });
    }

    public load(json: string): void {
        const state = JSON.parse(json);
        if (state.width === undefined) throw new Error('"width" property not provided');
        if (state.height === undefined) throw new Error('"height" property not provided');
        if (state.radius === undefined) throw new Error('"radius" property not provided');
        this.w.load(state.width);
        this.h.load(state.height);
        this.r.load(state.radius);
    }

    public update(ms: number): void {
        if (this.w.isOn) this.w.update(ms);
        if (this.h.isOn) this.h.update(ms);
        if (this.r.isOn) this.r.update(ms);
    }

    public widthTo(width: number, duration: number, ease: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.w.change(width, duration, ease);
            wait(duration).then(() => res);
        });
    }

    public heightTo(height: number, duration: number, ease: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.h.change(height, duration, ease);
            wait(duration).then(() => res);
        });
    }

    public radiusTo(radius: number, duration: number, ease: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.r.change(radius, duration, ease);
            wait(duration).then(() => res);
        });
    }

};
