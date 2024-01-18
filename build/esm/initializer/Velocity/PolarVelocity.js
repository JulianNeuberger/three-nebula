import { DR } from '../../constants';
import { Polar3D } from '../../math';
import Velocity from './Velocity';
import { INITIALIZER_TYPE_POLAR_VELOCITY as type } from '../types';
/**
 * Sets the velocity property on initialized particles.
 *
 */

export default class PolarVelocity extends Velocity {
  /**
   * Constructs a PolarVelocity initializer.
   *
   * @param {Polar3D} polar3d - The polar vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(polar3d, theta, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc Theta.
     * @type {number}
     */

    this.tha = theta * DR;
    /**
     * @desc Directional vector
     * @type {Vector3D}
     */

    this.dirVec = polar3d.toVector3D();
    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */

    this._useV = false;
  }
  /**
   * Creates a PolarVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.polarRadius - The Polar3D radius
   * @param {number} json.polarTheta - The Polar3D theta
   * @param {number} json.polarPhi - The Polar3D phi
   * @param {number} json.velocityTheta - The velocity theta
   * @return {PolarVelocity}
   */


  static fromJSON(json) {
    const {
      polarRadius,
      polarTheta,
      polarPhi,
      velocityTheta,
      isEnabled = true
    } = json;
    return new PolarVelocity(new Polar3D(polarRadius, polarTheta, polarPhi), velocityTheta, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9Qb2xhclZlbG9jaXR5LmpzIl0sIm5hbWVzIjpbIkRSIiwiUG9sYXIzRCIsIlZlbG9jaXR5IiwiSU5JVElBTElaRVJfVFlQRV9QT0xBUl9WRUxPQ0lUWSIsInR5cGUiLCJQb2xhclZlbG9jaXR5IiwiY29uc3RydWN0b3IiLCJwb2xhcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJ0aGEiLCJkaXJWZWMiLCJ0b1ZlY3RvcjNEIiwiX3VzZVYiLCJmcm9tSlNPTiIsImpzb24iLCJwb2xhclJhZGl1cyIsInBvbGFyVGhldGEiLCJwb2xhclBoaSIsInZlbG9jaXR5VGhldGEiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLEVBQVQsUUFBbUIsaUJBQW5CO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixZQUF4QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsWUFBckI7QUFDQSxTQUFTQywrQkFBK0IsSUFBSUMsSUFBNUMsUUFBd0QsVUFBeEQ7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLGFBQU4sU0FBNEJILFFBQTVCLENBQXFDO0FBQ2xEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VJLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQWlCQyxTQUFTLEdBQUcsSUFBN0IsRUFBbUM7QUFDNUMsVUFBTUwsSUFBTixFQUFZSyxTQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsR0FBTCxHQUFXRixLQUFLLEdBQUdSLEVBQW5CO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS1csTUFBTCxHQUFjSixPQUFPLENBQUNLLFVBQVIsRUFBZDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJDLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFDSkMsTUFBQUEsV0FESTtBQUVKQyxNQUFBQSxVQUZJO0FBR0pDLE1BQUFBLFFBSEk7QUFJSkMsTUFBQUEsYUFKSTtBQUtKVixNQUFBQSxTQUFTLEdBQUc7QUFMUixRQU1GTSxJQU5KO0FBUUEsV0FBTyxJQUFJVixhQUFKLENBQ0wsSUFBSUosT0FBSixDQUFZZSxXQUFaLEVBQXlCQyxVQUF6QixFQUFxQ0MsUUFBckMsQ0FESyxFQUVMQyxhQUZLLEVBR0xWLFNBSEssQ0FBUDtBQUtEOztBQXREaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFBvbGFyM0QgfSBmcm9tICcuLi8uLi9tYXRoJztcclxuaW1wb3J0IFZlbG9jaXR5IGZyb20gJy4vVmVsb2NpdHknO1xyXG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX1BPTEFSX1ZFTE9DSVRZIGFzIHR5cGUgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgdmVsb2NpdHkgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXJWZWxvY2l0eSBleHRlbmRzIFZlbG9jaXR5IHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgUG9sYXJWZWxvY2l0eSBpbml0aWFsaXplci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UG9sYXIzRH0gcG9sYXIzZCAtIFRoZSBwb2xhciB2ZWN0b3IgZm9yIHRoZSB2ZWxvY2l0eVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aGV0YSAtIFRoZSB0aGV0YSBhbmdsZSB0byB1c2VcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb2xhcjNkLCB0aGV0YSwgaXNFbmFibGVkID0gdHJ1ZSkge1xyXG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZXRhLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy50aGEgPSB0aGV0YSAqIERSO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGlyZWN0aW9uYWwgdmVjdG9yXHJcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGlyVmVjID0gcG9sYXIzZC50b1ZlY3RvcjNEKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIHRoZSBkaXJlY3Rpb25hbCB2ZWN0b3Igb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuX3VzZVYgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBQb2xhclZlbG9jaXR5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnBvbGFyUmFkaXVzIC0gVGhlIFBvbGFyM0QgcmFkaXVzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ucG9sYXJUaGV0YSAtIFRoZSBQb2xhcjNEIHRoZXRhXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ucG9sYXJQaGkgLSBUaGUgUG9sYXIzRCBwaGlcclxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi52ZWxvY2l0eVRoZXRhIC0gVGhlIHZlbG9jaXR5IHRoZXRhXHJcbiAgICogQHJldHVybiB7UG9sYXJWZWxvY2l0eX1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwb2xhclJhZGl1cyxcclxuICAgICAgcG9sYXJUaGV0YSxcclxuICAgICAgcG9sYXJQaGksXHJcbiAgICAgIHZlbG9jaXR5VGhldGEsXHJcbiAgICAgIGlzRW5hYmxlZCA9IHRydWUsXHJcbiAgICB9ID0ganNvbjtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvbGFyVmVsb2NpdHkoXHJcbiAgICAgIG5ldyBQb2xhcjNEKHBvbGFyUmFkaXVzLCBwb2xhclRoZXRhLCBwb2xhclBoaSksXHJcbiAgICAgIHZlbG9jaXR5VGhldGEsXHJcbiAgICAgIGlzRW5hYmxlZFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19