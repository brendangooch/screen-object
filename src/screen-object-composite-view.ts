/**
 * has one job - to render the screen objects in the correct order according to zIndex
 */

import Canvas from "@brendangooch/canvas";
import { ScreenObjectView } from "./screen-object-view.js";
import { iRenderable } from "./i-renerable.js";

export class ScreenObjectCompositeView implements iRenderable {

    private views: ScreenObjectView[] = [];

    public add(view: ScreenObjectView): void {
        this.views.push(view);
    }

    public render(canvas: Canvas): void {
        this.reorder();
        this.views.forEach(view => view.render(canvas));
    }

    // order backwards so that highest zIndex renders last
    private reorder(): void {
        this.views.sort((a: ScreenObjectView, b: ScreenObjectView) => {
            if (a.zIndex > b.zIndex) return -1;
            return 1;
        });
    }

}