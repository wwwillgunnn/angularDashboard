declare module 'three-globe' {
  import { Object3D } from 'three';

  export default class Globe extends Object3D {
    globeImageUrl(url: string): this;
    backgroundImageUrl(url: string): this;
    pointsData(data: any[]): this;
    pointAltitude(fn: number | ((d: any) => number)): this;
    pointColor(fn: string | ((d: any) => string)): this;
    pointRadius(fn: number | ((d: any) => number)): this;
  }
}
