import Util from '../utils/Util';
import Zone from './Zone';
import { ZONE_TYPE_POINT as type } from './types';
export default class PointZone extends Zone {
  /**
   * PointZone is a point zone
   * @param {Number|Vector3D} x - the center's x value or a Vector3D Object
   * @param {Number} y - the center's y value
   * @param {Number} z - the center's z value
   * @example
   * var pointZone = new System.PointZone(0,30,10);
   * or
   * var pointZone = new System.PointZone(new System.Vector3D(0,30,10));
   * @extends {Zone}
   * @constructor
   */
  constructor(a, b, c) {
    super(type); // TODO see below, these should probably be assigned properly
    // eslint-disable-next-line

    var x, y, z;

    if (Util.isUndefined(a, b, c)) {
      x = y = z = 0;
    } else {
      x = a; // eslint-disable-next-line

      y = b; // eslint-disable-next-line

      z = c;
    }

    this.x = x; // TODO shouldn't this be set to y?

    this.y = x; // TODO shouldn't this be set to z?

    this.z = x;
    this.supportsCrossing = false;
  }
  /**
   * Returns true to indicate this is a PointZone.
   *
   * @return {boolean}
   */


  isPointZone() {
    return true;
  }

  getPosition() {
    this.vector.x = this.x;
    this.vector.y = this.y;
    this.vector.z = this.z;
    return this.vector;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1BvaW50Wm9uZS5qcyJdLCJuYW1lcyI6WyJVdGlsIiwiWm9uZSIsIlpPTkVfVFlQRV9QT0lOVCIsInR5cGUiLCJQb2ludFpvbmUiLCJjb25zdHJ1Y3RvciIsImEiLCJiIiwiYyIsIngiLCJ5IiwieiIsImlzVW5kZWZpbmVkIiwic3VwcG9ydHNDcm9zc2luZyIsImlzUG9pbnRab25lIiwiZ2V0UG9zaXRpb24iLCJ2ZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLElBQVAsTUFBaUIsZUFBakI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsU0FBU0MsZUFBZSxJQUFJQyxJQUE1QixRQUF3QyxTQUF4QztBQUVBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkgsSUFBeEIsQ0FBNkI7QUFDMUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VJLEVBQUFBLFdBQVcsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVTtBQUNuQixVQUFNTCxJQUFOLEVBRG1CLENBR25CO0FBQ0E7O0FBQ0EsUUFBSU0sQ0FBSixFQUFPQyxDQUFQLEVBQVVDLENBQVY7O0FBRUEsUUFBSVgsSUFBSSxDQUFDWSxXQUFMLENBQWlCTixDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJDLENBQXZCLENBQUosRUFBK0I7QUFDN0JDLE1BQUFBLENBQUMsR0FBR0MsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMRixNQUFBQSxDQUFDLEdBQUdILENBQUosQ0FESyxDQUVMOztBQUNBSSxNQUFBQSxDQUFDLEdBQUdILENBQUosQ0FISyxDQUlMOztBQUNBSSxNQUFBQSxDQUFDLEdBQUdILENBQUo7QUFDRDs7QUFFRCxTQUFLQyxDQUFMLEdBQVNBLENBQVQsQ0FqQm1CLENBbUJuQjs7QUFDQSxTQUFLQyxDQUFMLEdBQVNELENBQVQsQ0FwQm1CLENBc0JuQjs7QUFDQSxTQUFLRSxDQUFMLEdBQVNGLENBQVQ7QUFDQSxTQUFLSSxnQkFBTCxHQUF3QixLQUF4QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VDLEVBQUFBLFdBQVcsR0FBRztBQUNaLFdBQU8sSUFBUDtBQUNEOztBQUVEQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxNQUFMLENBQVlQLENBQVosR0FBZ0IsS0FBS0EsQ0FBckI7QUFDQSxTQUFLTyxNQUFMLENBQVlOLENBQVosR0FBZ0IsS0FBS0EsQ0FBckI7QUFDQSxTQUFLTSxNQUFMLENBQVlMLENBQVosR0FBZ0IsS0FBS0EsQ0FBckI7QUFFQSxXQUFPLEtBQUtLLE1BQVo7QUFDRDs7QUF2RHlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFV0aWwgZnJvbSAnLi4vdXRpbHMvVXRpbCc7XHJcbmltcG9ydCBab25lIGZyb20gJy4vWm9uZSc7XHJcbmltcG9ydCB7IFpPTkVfVFlQRV9QT0lOVCBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcclxuICAvKipcclxuICAgKiBQb2ludFpvbmUgaXMgYSBwb2ludCB6b25lXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ8VmVjdG9yM0R9IHggLSB0aGUgY2VudGVyJ3MgeCB2YWx1ZSBvciBhIFZlY3RvcjNEIE9iamVjdFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gdGhlIGNlbnRlcidzIHkgdmFsdWVcclxuICAgKiBAcGFyYW0ge051bWJlcn0geiAtIHRoZSBjZW50ZXIncyB6IHZhbHVlXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiB2YXIgcG9pbnRab25lID0gbmV3IFN5c3RlbS5Qb2ludFpvbmUoMCwzMCwxMCk7XHJcbiAgICogb3JcclxuICAgKiB2YXIgcG9pbnRab25lID0gbmV3IFN5c3RlbS5Qb2ludFpvbmUobmV3IFN5c3RlbS5WZWN0b3IzRCgwLDMwLDEwKSk7XHJcbiAgICogQGV4dGVuZHMge1pvbmV9XHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xyXG4gICAgc3VwZXIodHlwZSk7XHJcblxyXG4gICAgLy8gVE9ETyBzZWUgYmVsb3csIHRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSBhc3NpZ25lZCBwcm9wZXJseVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB2YXIgeCwgeSwgejtcclxuXHJcbiAgICBpZiAoVXRpbC5pc1VuZGVmaW5lZChhLCBiLCBjKSkge1xyXG4gICAgICB4ID0geSA9IHogPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeCA9IGE7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICB5ID0gYjtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgIHogPSBjO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueCA9IHg7XHJcblxyXG4gICAgLy8gVE9ETyBzaG91bGRuJ3QgdGhpcyBiZSBzZXQgdG8geT9cclxuICAgIHRoaXMueSA9IHg7XHJcblxyXG4gICAgLy8gVE9ETyBzaG91bGRuJ3QgdGhpcyBiZSBzZXQgdG8gej9cclxuICAgIHRoaXMueiA9IHg7XHJcbiAgICB0aGlzLnN1cHBvcnRzQ3Jvc3NpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgUG9pbnRab25lLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc1BvaW50Wm9uZSgpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xyXG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTtcclxuICAgIHRoaXMudmVjdG9yLnogPSB0aGlzLno7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xyXG4gIH1cclxufVxyXG4iXX0=