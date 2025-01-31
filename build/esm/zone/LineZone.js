import Vector3D from '../math/Vector3D';
import Zone from './Zone';
import { ZONE_TYPE_LINE as type } from './types';
export default class LineZone extends Zone {
  /**
   * LineZone is a 3d line zone
   * @param {Number|Vector3D} x1 - the line's start point of x value or a Vector3D Object
   * @param {Number|Vector3D} y1 - the line's start point of y value or a Vector3D Object
   * @param {Number} z1 - the line's start point of z value
   * @param {Number} x2 - the line's end point of x value
   * @param {Number} y2 - the line's end point of y value
   * @param {Number} z2 - the line's end point of z value
   * @example
   * var lineZone = new System.LineZone(0,0,0,100,100,0);
   * or
   * var lineZone = new System.LineZone(new System.Vector3D(0,0,0),new System.Vector3D(100,100,0));
   * @extends {Zone}
   * @constructor
   */
  constructor(x1, y1, z1, x2, y2, z2) {
    super(type);

    if (x1 instanceof Vector3D) {
      this.x1 = x1.x;
      this.y1 = x1.y;
      this.z1 = x1.z;
      this.x2 = x2.x;
      this.y2 = x2.y;
      this.z2 = x2.z;
    } else {
      this.x1 = x1;
      this.y1 = y1;
      this.z1 = z1;
      this.x2 = x2;
      this.y2 = y2;
      this.z2 = z2;
    }

    this.supportsCrossing = false;
  }
  /**
   * Returns true to indicate this is a LineZone.
   *
   * @return {boolean}
   */


  isLineZone() {
    return true;
  }

  getPosition() {
    this.random = Math.random();
    this.vector.x = this.x1 + this.random * (this.x2 - this.x1);
    this.vector.y = this.y1 + this.random * (this.y2 - this.y1);
    this.vector.z = this.z1 + this.random * (this.z2 - this.z1);
    return this.vector;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL0xpbmVab25lLmpzIl0sIm5hbWVzIjpbIlZlY3RvcjNEIiwiWm9uZSIsIlpPTkVfVFlQRV9MSU5FIiwidHlwZSIsIkxpbmVab25lIiwiY29uc3RydWN0b3IiLCJ4MSIsInkxIiwiejEiLCJ4MiIsInkyIiwiejIiLCJ4IiwieSIsInoiLCJzdXBwb3J0c0Nyb3NzaW5nIiwiaXNMaW5lWm9uZSIsImdldFBvc2l0aW9uIiwicmFuZG9tIiwiTWF0aCIsInZlY3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixrQkFBckI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsU0FBU0MsY0FBYyxJQUFJQyxJQUEzQixRQUF1QyxTQUF2QztBQUVBLGVBQWUsTUFBTUMsUUFBTixTQUF1QkgsSUFBdkIsQ0FBNEI7QUFDekM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VJLEVBQUFBLFdBQVcsQ0FBQ0MsRUFBRCxFQUFLQyxFQUFMLEVBQVNDLEVBQVQsRUFBYUMsRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLEVBQXJCLEVBQXlCO0FBQ2xDLFVBQU1SLElBQU47O0FBRUEsUUFBSUcsRUFBRSxZQUFZTixRQUFsQixFQUE0QjtBQUMxQixXQUFLTSxFQUFMLEdBQVVBLEVBQUUsQ0FBQ00sQ0FBYjtBQUNBLFdBQUtMLEVBQUwsR0FBVUQsRUFBRSxDQUFDTyxDQUFiO0FBQ0EsV0FBS0wsRUFBTCxHQUFVRixFQUFFLENBQUNRLENBQWI7QUFFQSxXQUFLTCxFQUFMLEdBQVVBLEVBQUUsQ0FBQ0csQ0FBYjtBQUNBLFdBQUtGLEVBQUwsR0FBVUQsRUFBRSxDQUFDSSxDQUFiO0FBQ0EsV0FBS0YsRUFBTCxHQUFVRixFQUFFLENBQUNLLENBQWI7QUFDRCxLQVJELE1BUU87QUFDTCxXQUFLUixFQUFMLEdBQVVBLEVBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFFQSxXQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDRDs7QUFFRCxTQUFLSSxnQkFBTCxHQUF3QixLQUF4QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VDLEVBQUFBLFVBQVUsR0FBRztBQUNYLFdBQU8sSUFBUDtBQUNEOztBQUVEQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxNQUFMLEdBQWNDLElBQUksQ0FBQ0QsTUFBTCxFQUFkO0FBQ0EsU0FBS0UsTUFBTCxDQUFZUixDQUFaLEdBQWdCLEtBQUtOLEVBQUwsR0FBVSxLQUFLWSxNQUFMLElBQWUsS0FBS1QsRUFBTCxHQUFVLEtBQUtILEVBQTlCLENBQTFCO0FBQ0EsU0FBS2MsTUFBTCxDQUFZUCxDQUFaLEdBQWdCLEtBQUtOLEVBQUwsR0FBVSxLQUFLVyxNQUFMLElBQWUsS0FBS1IsRUFBTCxHQUFVLEtBQUtILEVBQTlCLENBQTFCO0FBQ0EsU0FBS2EsTUFBTCxDQUFZTixDQUFaLEdBQWdCLEtBQUtOLEVBQUwsR0FBVSxLQUFLVSxNQUFMLElBQWUsS0FBS1AsRUFBTCxHQUFVLEtBQUtILEVBQTlCLENBQTFCO0FBRUEsV0FBTyxLQUFLWSxNQUFaO0FBQ0Q7O0FBeER3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRCBmcm9tICcuLi9tYXRoL1ZlY3RvcjNEJztcclxuaW1wb3J0IFpvbmUgZnJvbSAnLi9ab25lJztcclxuaW1wb3J0IHsgWk9ORV9UWVBFX0xJTkUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZVpvbmUgZXh0ZW5kcyBab25lIHtcclxuICAvKipcclxuICAgKiBMaW5lWm9uZSBpcyBhIDNkIGxpbmUgem9uZVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfFZlY3RvcjNEfSB4MSAtIHRoZSBsaW5lJ3Mgc3RhcnQgcG9pbnQgb2YgeCB2YWx1ZSBvciBhIFZlY3RvcjNEIE9iamVjdFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfFZlY3RvcjNEfSB5MSAtIHRoZSBsaW5lJ3Mgc3RhcnQgcG9pbnQgb2YgeSB2YWx1ZSBvciBhIFZlY3RvcjNEIE9iamVjdFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MSAtIHRoZSBsaW5lJ3Mgc3RhcnQgcG9pbnQgb2YgeiB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4MiAtIHRoZSBsaW5lJ3MgZW5kIHBvaW50IG9mIHggdmFsdWVcclxuICAgKiBAcGFyYW0ge051bWJlcn0geTIgLSB0aGUgbGluZSdzIGVuZCBwb2ludCBvZiB5IHZhbHVlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHoyIC0gdGhlIGxpbmUncyBlbmQgcG9pbnQgb2YgeiB2YWx1ZVxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogdmFyIGxpbmVab25lID0gbmV3IFN5c3RlbS5MaW5lWm9uZSgwLDAsMCwxMDAsMTAwLDApO1xyXG4gICAqIG9yXHJcbiAgICogdmFyIGxpbmVab25lID0gbmV3IFN5c3RlbS5MaW5lWm9uZShuZXcgU3lzdGVtLlZlY3RvcjNEKDAsMCwwKSxuZXcgU3lzdGVtLlZlY3RvcjNEKDEwMCwxMDAsMCkpO1xyXG4gICAqIEBleHRlbmRzIHtab25lfVxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHgxLCB5MSwgejEsIHgyLCB5MiwgejIpIHtcclxuICAgIHN1cGVyKHR5cGUpO1xyXG5cclxuICAgIGlmICh4MSBpbnN0YW5jZW9mIFZlY3RvcjNEKSB7XHJcbiAgICAgIHRoaXMueDEgPSB4MS54O1xyXG4gICAgICB0aGlzLnkxID0geDEueTtcclxuICAgICAgdGhpcy56MSA9IHgxLno7XHJcblxyXG4gICAgICB0aGlzLngyID0geDIueDtcclxuICAgICAgdGhpcy55MiA9IHgyLnk7XHJcbiAgICAgIHRoaXMuejIgPSB4Mi56O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy54MSA9IHgxO1xyXG4gICAgICB0aGlzLnkxID0geTE7XHJcbiAgICAgIHRoaXMuejEgPSB6MTtcclxuXHJcbiAgICAgIHRoaXMueDIgPSB4MjtcclxuICAgICAgdGhpcy55MiA9IHkyO1xyXG4gICAgICB0aGlzLnoyID0gejI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdXBwb3J0c0Nyb3NzaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIExpbmVab25lLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc0xpbmVab25lKCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBnZXRQb3NpdGlvbigpIHtcclxuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcclxuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLngxICsgdGhpcy5yYW5kb20gKiAodGhpcy54MiAtIHRoaXMueDEpO1xyXG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTEgKyB0aGlzLnJhbmRvbSAqICh0aGlzLnkyIC0gdGhpcy55MSk7XHJcbiAgICB0aGlzLnZlY3Rvci56ID0gdGhpcy56MSArIHRoaXMucmFuZG9tICogKHRoaXMuejIgLSB0aGlzLnoxKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XHJcbiAgfVxyXG59XHJcbiJdfQ==