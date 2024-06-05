/**
 * uses template method pattern to render actual object to canvas
 * client extends this object and writes implemntation for renderObject() method
 * ie render playing card bitmap image to canvas
 */

import { iRenderable } from "./i-renerable.js";
import { ScreenObject } from "./screen-object.js";
import Canvas from '@brendangooch/canvas';

export abstract class ScreenObjectView implements iRenderable {

    private sObj: ScreenObject;

    public constructor(screenObject: ScreenObject) {
        this.sObj = screenObject;
    }

    public get zIndex(): number {
        return this.sObj.zIndex;
    }

    public render(canvas: Canvas): void {

        if (this.sObj.isVisible) {
            canvas.save(() => {
                canvas.translate(this.sObj.x, this.sObj.y);
                canvas.rotate(this.sObj.rotation);
                canvas.scaleBoth(this.sObj.scale);
                canvas.opacity(this.sObj.alpha);
                canvas.filter.brightness(this.sObj.brightness);
                this.renderObject(canvas);
            });
        }

    }

    protected abstract renderObject(canvas: Canvas): void;

}