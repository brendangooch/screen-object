/**
* provides zIndex for controlling the order in which screen objects are rendered on top of one another (default composite)
* 
*/

import { Brightness } from "./brightness.js";
import { Dimensions } from "./dimensions.js";
import { iUpdateable } from "./i-updateable.js";
import { Opacity } from "./opacity.js";
import { Position } from "./position.js";
import { Rotation } from "./rotation.js";
import { Scale } from "./scale.js";
import { Visibility } from "./visibility.js";

export class ScreenObject implements iUpdateable {

    private z: number = 1;
    protected _position: Position;
    protected _rotation: Rotation;
    protected _scale: Scale;
    protected _opacity: Opacity;
    protected _brightness: Brightness;
    protected _visibility: Visibility;
    protected _dimensions: Dimensions;

    public constructor(props: {
        x?: number;
        y?: number;
        degrees?: number;
        scale?: number;
        alpha?: number;
        brightness?: number;
        visible?: boolean;
        dimensions: {
            width?: number;
            height?: number;
            radius?: number;
        }
    }) {
        this._position = new Position(props.x, props.y);
        this._rotation = new Rotation(props.degrees);
        this._scale = new Scale(props.scale);
        this._opacity = new Opacity(props.alpha);
        this._brightness = new Brightness(props.brightness);
        this._visibility = new Visibility(props.visible);
        this._dimensions = new Dimensions(props.dimensions);
    }

    public get zIndex(): number {
        return this.z;
    }

    public set zIndex(z: number) {
        this.z = z;
    }

    // isVisible
    public get isVisible(): boolean {
        return this._visibility.isVisible;
    }

    // x
    public get x(): number {
        return this._position.x;
    }

    // y
    public get y(): number {
        return this._position.y;
    }

    // radians
    public get rotation(): number {
        return this._rotation.radians;
    }

    // scale
    public get scale(): number {
        return this._scale.current;
    }

    // alpha
    public get alpha(): number {
        return this._opacity.current;
    }

    // brightness
    public get brightness(): number {
        return this._brightness.current;
    }

    // width
    public get width(): number {
        return this._dimensions.width;
    }

    // height
    public get height(): number {
        return this._dimensions.height;
    }

    // radius
    public get radius(): number {
        return this._dimensions.radius;
    }

    public get isOn(): boolean {
        return (
            this._position.isOn ||
            this._rotation.isOn ||
            this._scale.isOn ||
            this._opacity.isOn ||
            this._brightness.isOn ||
            this._visibility.isOn ||
            this._dimensions.isOn
        )
    }

    public load(json: string): void {
        const state = JSON.parse(json);
        if (state.z === undefined) throw new Error('"z" property not defined');
        if (state.position === undefined) throw new Error('"position" property not defined');
        if (state.rotation === undefined) throw new Error('"rotation" property not defined');
        if (state.scale === undefined) throw new Error('"scale" property not defined');
        if (state.opacity === undefined) throw new Error('"opacity" property not defined');
        if (state.brightness === undefined) throw new Error('"brightness" property not defined');
        if (state.visibility === undefined) throw new Error('"visibility" property not defined');
        if (state.dimensions === undefined) throw new Error('"dimensions" property not defined');
        this.z = state.z;
        this._position.load(state.position);
        this._rotation.load(state.rotation);
        this._scale.load(state.scale);
        this._opacity.load(state.opacity);
        this._brightness.load(state.brightness);
        this._visibility.load(state.visibility);
        this._dimensions.load(state.dimensions);
    }

    public save(): string {
        return JSON.stringify({
            z: this.z,
            position: this._position.save(),
            rotation: this._rotation.save(),
            scale: this._scale.save(),
            opacity: this._opacity.save(),
            brightness: this._brightness.save(),
            visibility: this._visibility.save(),
            dimensions: this._dimensions.save()
        });
    }

    public update(ms: number): void {
        if (this._position.isOn) this._position.update(ms);
        if (this._rotation.isOn) this._rotation.update(ms);
        if (this._scale.isOn) this._scale.update(ms);
        if (this._opacity.isOn) this._opacity.update(ms);
        if (this._brightness.isOn) this._brightness.update(ms);
        if (this._visibility.isOn) this._visibility.update(ms);
        if (this._dimensions.isOn) this._dimensions.update(ms);
    }

}