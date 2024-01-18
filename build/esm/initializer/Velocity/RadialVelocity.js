import { Vector3D, createSpan } from '../../math';
import { DR } from '../../constants';
import Velocity from './Velocity';
import { INITIALIZER_TYPE_RADIAL_VELOCITY as type } from '../types';
/**
 * Sets the velocity property on initialized particles.
 *
 */

export default class RadialVelocity extends Velocity {
  /**
   * Constructs a RadialVelocity initializer.
   *
   * @param {number|Span} radius - The velocity radius
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(radius, vector3d, theta, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc Velocity radius span.
     * @type {Span}
     */

    this.radiusPan = createSpan(radius);
    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */

    this.dir = vector3d.clone().normalize();
    /**
     * @desc Theta.
     * @type {number}
     */

    this.tha = theta * DR;
    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */

    this._useV = true;
  }
  /**
   * Creates a RadialVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.radius - The velocity radius
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {RadialVelocity}
   */


  static fromJSON(json) {
    const {
      radius,
      x,
      y,
      z,
      theta,
      isEnabled = true
    } = json;
    return new RadialVelocity(radius, new Vector3D(x, y, z), theta, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9SYWRpYWxWZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJWZWN0b3IzRCIsImNyZWF0ZVNwYW4iLCJEUiIsIlZlbG9jaXR5IiwiSU5JVElBTElaRVJfVFlQRV9SQURJQUxfVkVMT0NJVFkiLCJ0eXBlIiwiUmFkaWFsVmVsb2NpdHkiLCJjb25zdHJ1Y3RvciIsInJhZGl1cyIsInZlY3RvcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJyYWRpdXNQYW4iLCJkaXIiLCJjbG9uZSIsIm5vcm1hbGl6ZSIsInRoYSIsIl91c2VWIiwiZnJvbUpTT04iLCJqc29uIiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxRQUFULEVBQW1CQyxVQUFuQixRQUFxQyxZQUFyQztBQUVBLFNBQVNDLEVBQVQsUUFBbUIsaUJBQW5CO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjtBQUNBLFNBQVNDLGdDQUFnQyxJQUFJQyxJQUE3QyxRQUF5RCxVQUF6RDtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsY0FBTixTQUE2QkgsUUFBN0IsQ0FBc0M7QUFDbkQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSSxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsUUFBVCxFQUFtQkMsS0FBbkIsRUFBMEJDLFNBQVMsR0FBRyxJQUF0QyxFQUE0QztBQUNyRCxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxTQUFMLEdBQWlCWCxVQUFVLENBQUNPLE1BQUQsQ0FBM0I7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSyxHQUFMLEdBQVdKLFFBQVEsQ0FBQ0ssS0FBVCxHQUFpQkMsU0FBakIsRUFBWDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLEdBQUwsR0FBV04sS0FBSyxHQUFHUixFQUFuQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtlLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkMsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFWCxNQUFBQSxNQUFGO0FBQVVZLE1BQUFBLENBQVY7QUFBYUMsTUFBQUEsQ0FBYjtBQUFnQkMsTUFBQUEsQ0FBaEI7QUFBbUJaLE1BQUFBLEtBQW5CO0FBQTBCQyxNQUFBQSxTQUFTLEdBQUc7QUFBdEMsUUFBK0NRLElBQXJEO0FBRUEsV0FBTyxJQUFJYixjQUFKLENBQW1CRSxNQUFuQixFQUEyQixJQUFJUixRQUFKLENBQWFvQixDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsQ0FBM0IsRUFBa0RaLEtBQWxELEVBQXlEQyxTQUF6RCxDQUFQO0FBQ0Q7O0FBcERrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlY3RvcjNELCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vLi4vbWF0aCc7XHJcblxyXG5pbXBvcnQgeyBEUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCBWZWxvY2l0eSBmcm9tICcuL1ZlbG9jaXR5JztcclxuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9SQURJQUxfVkVMT0NJVFkgYXMgdHlwZSB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSB2ZWxvY2l0eSBwcm9wZXJ0eSBvbiBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpYWxWZWxvY2l0eSBleHRlbmRzIFZlbG9jaXR5IHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgUmFkaWFsVmVsb2NpdHkgaW5pdGlhbGl6ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSByYWRpdXMgLSBUaGUgdmVsb2NpdHkgcmFkaXVzXHJcbiAgICogQHBhcmFtIHtWZWN0b3IzRH0gdmVjdG9yM2QgLSBUaGUgZGlyZWN0aW9uYWwgdmVjdG9yIGZvciB0aGUgdmVsb2NpdHlcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGhldGEgLSBUaGUgdGhldGEgYW5nbGUgdG8gdXNlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocmFkaXVzLCB2ZWN0b3IzZCwgdGhldGEsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBWZWxvY2l0eSByYWRpdXMgc3Bhbi5cclxuICAgICAqIEB0eXBlIHtTcGFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJhZGl1c1BhbiA9IGNyZWF0ZVNwYW4ocmFkaXVzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIERpcmVjdGlvbiB2ZWN0b3IuXHJcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGlyID0gdmVjdG9yM2QuY2xvbmUoKS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZXRhLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy50aGEgPSB0aGV0YSAqIERSO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSB0aGUgZGlyZWN0aW9uYWwgdmVjdG9yIG9yIG5vdC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLl91c2VWID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBSYWRpYWxWZWxvY2l0eSBpbml0aWFsaXplciBmcm9tIEpTT04uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi5yYWRpdXMgLSBUaGUgdmVsb2NpdHkgcmFkaXVzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueCAtIFRoZSB2ZWxvY2l0eSB4IGF4aXMgZGlyZWN0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueSAtIFRoZSB2ZWxvY2l0eSB5IGF4aXMgZGlyZWN0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueiAtIFRoZSB2ZWxvY2l0eSB6IGF4aXMgZGlyZWN0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24udGhldGEgLSBUaGUgdmVsb2NpdHkgdGhldGFcclxuICAgKiBAcmV0dXJuIHtSYWRpYWxWZWxvY2l0eX1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyByYWRpdXMsIHgsIHksIHosIHRoZXRhLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xyXG5cclxuICAgIHJldHVybiBuZXcgUmFkaWFsVmVsb2NpdHkocmFkaXVzLCBuZXcgVmVjdG9yM0QoeCwgeSwgeiksIHRoZXRhLCBpc0VuYWJsZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=