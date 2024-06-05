/**
 * 
 */

import Canvas from "@brendangooch/canvas";

export interface iRenderable {
    render(canvas: Canvas): void;
}