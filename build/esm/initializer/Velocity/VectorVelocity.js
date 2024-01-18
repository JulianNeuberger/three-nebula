import { Vector3D, createSpan } from '../../math';
import { DR } from '../../constants';
import Velocity from './Velocity';
import { INITIALIZER_TYPE_VECTOR_VELOCITY as type } from '../types';
/**
 * Sets the velocity property on initialized particles.
 *
 */

export default class VectorVelocity extends Velocity {
  /**
   * Constructs a VectorVelocity initializer.
   *
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(vector3d, theta, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc Velocity radius span.
     * @type {Span}
     */

    this.radiusPan = createSpan(1);
    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */

    this.dir = vector3d.clone();
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
   * Creates a VectorVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {VectorVelocity}
   */


  static fromJSON(json) {
    const {
      x,
      y,
      z,
      theta,
      isEnabled = true
    } = json;
    return new VectorVelocity(new Vector3D(x, y, z), theta, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9WZWN0b3JWZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJWZWN0b3IzRCIsImNyZWF0ZVNwYW4iLCJEUiIsIlZlbG9jaXR5IiwiSU5JVElBTElaRVJfVFlQRV9WRUNUT1JfVkVMT0NJVFkiLCJ0eXBlIiwiVmVjdG9yVmVsb2NpdHkiLCJjb25zdHJ1Y3RvciIsInZlY3RvcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJyYWRpdXNQYW4iLCJkaXIiLCJjbG9uZSIsInRoYSIsIl91c2VWIiwiZnJvbUpTT04iLCJqc29uIiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxRQUFULEVBQW1CQyxVQUFuQixRQUFxQyxZQUFyQztBQUVBLFNBQVNDLEVBQVQsUUFBbUIsaUJBQW5CO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjtBQUNBLFNBQVNDLGdDQUFnQyxJQUFJQyxJQUE3QyxRQUF5RCxVQUF6RDtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsY0FBTixTQUE2QkgsUUFBN0IsQ0FBc0M7QUFDbkQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUksRUFBQUEsV0FBVyxDQUFDQyxRQUFELEVBQVdDLEtBQVgsRUFBa0JDLFNBQVMsR0FBRyxJQUE5QixFQUFvQztBQUM3QyxVQUFNTCxJQUFOLEVBQVlLLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxTQUFMLEdBQWlCVixVQUFVLENBQUMsQ0FBRCxDQUEzQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtXLEdBQUwsR0FBV0osUUFBUSxDQUFDSyxLQUFULEVBQVg7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxHQUFMLEdBQVdMLEtBQUssR0FBR1AsRUFBbkI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLYSxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNpQixTQUFSQyxRQUFRLENBQUNDLElBQUQsRUFBTztBQUNwQixVQUFNO0FBQUVDLE1BQUFBLENBQUY7QUFBS0MsTUFBQUEsQ0FBTDtBQUFRQyxNQUFBQSxDQUFSO0FBQVdYLE1BQUFBLEtBQVg7QUFBa0JDLE1BQUFBLFNBQVMsR0FBRztBQUE5QixRQUF1Q08sSUFBN0M7QUFFQSxXQUFPLElBQUlYLGNBQUosQ0FBbUIsSUFBSU4sUUFBSixDQUFha0IsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLENBQW5CLEVBQTBDWCxLQUExQyxFQUFpREMsU0FBakQsQ0FBUDtBQUNEOztBQWxEa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3IzRCwgY3JlYXRlU3BhbiB9IGZyb20gJy4uLy4uL21hdGgnO1xyXG5cclxuaW1wb3J0IHsgRFIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgVmVsb2NpdHkgZnJvbSAnLi9WZWxvY2l0eSc7XHJcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfVkVDVE9SX1ZFTE9DSVRZIGFzIHR5cGUgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgdmVsb2NpdHkgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yVmVsb2NpdHkgZXh0ZW5kcyBWZWxvY2l0eSB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIFZlY3RvclZlbG9jaXR5IGluaXRpYWxpemVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtWZWN0b3IzRH0gdmVjdG9yM2QgLSBUaGUgZGlyZWN0aW9uYWwgdmVjdG9yIGZvciB0aGUgdmVsb2NpdHlcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGhldGEgLSBUaGUgdGhldGEgYW5nbGUgdG8gdXNlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodmVjdG9yM2QsIHRoZXRhLCBpc0VuYWJsZWQgPSB0cnVlKSB7XHJcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVmVsb2NpdHkgcmFkaXVzIHNwYW4uXHJcbiAgICAgKiBAdHlwZSB7U3Bhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yYWRpdXNQYW4gPSBjcmVhdGVTcGFuKDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGlyZWN0aW9uIHZlY3Rvci5cclxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kaXIgPSB2ZWN0b3IzZC5jbG9uZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhldGEuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRoYSA9IHRoZXRhICogRFI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIHRoZSBkaXJlY3Rpb25hbCB2ZWN0b3Igb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuX3VzZVYgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIFZlY3RvclZlbG9jaXR5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnggLSBUaGUgdmVsb2NpdHkgeCBheGlzIGRpcmVjdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnkgLSBUaGUgdmVsb2NpdHkgeSBheGlzIGRpcmVjdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnogLSBUaGUgdmVsb2NpdHkgeiBheGlzIGRpcmVjdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnRoZXRhIC0gVGhlIHZlbG9jaXR5IHRoZXRhXHJcbiAgICogQHJldHVybiB7VmVjdG9yVmVsb2NpdHl9XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHsgeCwgeSwgeiwgdGhldGEsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3JWZWxvY2l0eShuZXcgVmVjdG9yM0QoeCwgeSwgeiksIHRoZXRhLCBpc0VuYWJsZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=