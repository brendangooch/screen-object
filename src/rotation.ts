/**
 * rotation is stored in DEGREES internally
 */

import { DynamicNumber } from "@brendangooch/dynamic-objects";
import { Angle } from '@brendangooch/maths';
import { wait } from '@brendangooch/utils';
import { iDynamic } from "./i-dynamic.js";
import { tEaseOption } from "./t-ease-option.js";

export class Rotation implements iDynamic {

    private rotation: DynamicNumber;
    private angle: Angle = new Angle();
    private offset: number = 0;

    // default is 0 degrees
    public constructor(degrees?: number) {
        this.rotation = new DynamicNumber(degrees || 0);
    }

    // convert internal degrees into radians
    public get radians(): number {
        this.angle.degrees = this.rotation.current;
        return this.angle.radians;
    }

    public get isOn(): boolean {
        return this.rotation.isOn;
    }

    public get isComplete(): boolean {
        return this.rotation.isComplete;
    }

    public get isActive(): boolean {
        return this.rotation.isActive;
    }

    public save(): string {
        return this.rotation.save();
    }

    public load(json: string): void {
        this.rotation.load(json);
    }

    // remove spin offset on complete so next rotation works as expected
    public update(ms: number): void {
        if (this.rotation.isOn) this.rotation.update(ms);
        if (this.rotation.isComplete && this.offset !== 0) {
            this.rotation.change(this.rotation.current - this.offset, 0);
            this.offset = 0;
        }

    }


    public rotateTo(degrees: number, duration: number, ease?: tEaseOption): Promise<void> {
        return new Promise((res) => {
            this.rotation.change(degrees, duration, ease);
            wait(duration).then(() => res);
        });
    }

    // spins must be a positive integer
    public spinTo(degrees: number, spins: number, duration: number, ease?: tEaseOption, counterClockwise?: boolean): Promise<void> {
        if (Number.isInteger(spins) && spins > 0) {
            const spin = (counterClockwise) ? 360 : -360;
            this.offset = spin;
            degrees += spin;
        }
        return this.rotateTo(degrees, duration, ease);
    }

};