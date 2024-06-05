/**
 * a collection of screen objects
 */

import { iUpdateable } from "./i-updateable.js";
import { ScreenObject } from "./screen-object.js";

export class ScreenObjectComposite implements iUpdateable {

    private sObjects: ScreenObject[] = [];

    public add(obj: ScreenObject): void {
        this.sObjects.push(obj);
    }

    public get isOn(): boolean {
        return this.sObjects.filter(obj => obj.isOn).length > 0;
    }

    public update(ms: number): void {
        this.sObjects.forEach(obj => obj.update(ms));
    }

}