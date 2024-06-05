/**
 * 
 */

import { DynamicPosition } from '@brendangooch/dynamic-objects';
import { wait } from '@brendangooch/utils';
import { iDynamic } from './i-dynamic.js';
import { tEaseOption } from './t-ease-option.js';

export class Position implements iDynamic {

    private position: DynamicPosition;

    public constructor(x?: number, y?: number) {
        this.position = new DynamicPosition(x, y);
    }

    public get x(): number {
        return this.position.x;
    }

    public get y(): number {
        return this.position.y;
    }

    public get isOn(): boolean {
        return this.position.isOn;
    }

    public get isComplete(): boolean {
        return this.position.isComplete;
    }

    public get isActive(): boolean {
        return this.position.isActive;
    }

    public save(): string {
        return this.position.save();
    }

    public load(json: string): void {
        this.position.load(json);
    }

    public update(ms: number): void {
        if (this.position.isOn) this.position.update(ms);
    }

    public placeAt(x: number, y: number): void {
        this.position.moveTo(x, y, 0);
    }

    public moveTo(x: number, y: number, duration: number, ease?: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.position.moveTo(x, y, duration, ease);
            wait(duration).then(() => res);
        });
    }

    public curveTo(x: number, y: number, rotation: number, distance: number, duration: number, ease?: tEaseOption): Promise<void> {
        return new Promise(res => {
            this.position.curveTo(x, y, rotation, distance, duration, ease);
            wait(duration).then(() => res);
        });
    }


};