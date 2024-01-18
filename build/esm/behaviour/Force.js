import Behaviour from './Behaviour';
import { Vector3D } from '../math';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_FORCE as type } from './types';
/**
 * Behaviour that forces particles along a specific axis.
 *
 */

export default class Force extends Behaviour {
  /**
   * Constructs a Force behaviour instance.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(fx, fy, fz, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(fx, fy, fz);
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   */


  reset(fx, fy, fz) {
    /**
     * @desc The normalized force to exert on the particle in
     * @type {Vector3D}
     */
    this.force = this.normalizeForce(new Vector3D(fx, fy, fz));
    /**
     * @desc The id of the force vector
     * @property {number} this.force.id
     */

    this.force.id = Math.random();
  }
  /**
   * Mutates the particle.acceleration property.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.acceleration.add(this.force);
  }
  /**
   * Creates a Force initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @return {Force}
   */


  static fromJSON(json) {
    const {
      fx,
      fy,
      fz,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Force(fx, fy, fz, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiXSwibmFtZXMiOlsiQmVoYXZpb3VyIiwiVmVjdG9yM0QiLCJnZXRFYXNpbmdCeU5hbWUiLCJCRUhBVklPVVJfVFlQRV9GT1JDRSIsInR5cGUiLCJGb3JjZSIsImNvbnN0cnVjdG9yIiwiZngiLCJmeSIsImZ6IiwibGlmZSIsImVhc2luZyIsImlzRW5hYmxlZCIsInJlc2V0IiwiZm9yY2UiLCJub3JtYWxpemVGb3JjZSIsImlkIiwiTWF0aCIsInJhbmRvbSIsIm11dGF0ZSIsInBhcnRpY2xlIiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJhY2NlbGVyYXRpb24iLCJhZGQiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFNBQXpCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxTQUFoQztBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsS0FBTixTQUFvQkwsU0FBcEIsQ0FBOEI7QUFDM0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFTSxFQUFBQSxXQUFXLENBQUNDLEVBQUQsRUFBS0MsRUFBTCxFQUFTQyxFQUFULEVBQWFDLElBQWIsRUFBbUJDLE1BQW5CLEVBQTJCQyxTQUFTLEdBQUcsSUFBdkMsRUFBNkM7QUFDdEQsVUFBTUYsSUFBTixFQUFZQyxNQUFaLEVBQW9CUCxJQUFwQixFQUEwQlEsU0FBMUI7QUFFQSxTQUFLQyxLQUFMLENBQVdOLEVBQVgsRUFBZUMsRUFBZixFQUFtQkMsRUFBbkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUksRUFBQUEsS0FBSyxDQUFDTixFQUFELEVBQUtDLEVBQUwsRUFBU0MsRUFBVCxFQUFhO0FBQ2hCO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksU0FBS0ssS0FBTCxHQUFhLEtBQUtDLGNBQUwsQ0FBb0IsSUFBSWQsUUFBSixDQUFhTSxFQUFiLEVBQWlCQyxFQUFqQixFQUFxQkMsRUFBckIsQ0FBcEIsQ0FBYjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtLLEtBQUwsQ0FBV0UsRUFBWCxHQUFnQkMsSUFBSSxDQUFDQyxNQUFMLEVBQWhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUMsRUFBQUEsTUFBTSxDQUFDQyxRQUFELEVBQVdDLElBQVgsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQzVCLFNBQUtDLFFBQUwsQ0FBY0gsUUFBZCxFQUF3QkMsSUFBeEIsRUFBOEJDLEtBQTlCO0FBRUFGLElBQUFBLFFBQVEsQ0FBQ0ksWUFBVCxDQUFzQkMsR0FBdEIsQ0FBMEIsS0FBS1gsS0FBL0I7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJZLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRXBCLE1BQUFBLEVBQUY7QUFBTUMsTUFBQUEsRUFBTjtBQUFVQyxNQUFBQSxFQUFWO0FBQWNDLE1BQUFBLElBQWQ7QUFBb0JDLE1BQUFBLE1BQXBCO0FBQTRCQyxNQUFBQSxTQUFTLEdBQUc7QUFBeEMsUUFBaURlLElBQXZEO0FBRUEsV0FBTyxJQUFJdEIsS0FBSixDQUFVRSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEVBQWxCLEVBQXNCQyxJQUF0QixFQUE0QlIsZUFBZSxDQUFDUyxNQUFELENBQTNDLEVBQXFEQyxTQUFyRCxDQUFQO0FBQ0Q7O0FBL0QwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xyXG5pbXBvcnQgeyBWZWN0b3IzRCB9IGZyb20gJy4uL21hdGgnO1xyXG5pbXBvcnQgeyBnZXRFYXNpbmdCeU5hbWUgfSBmcm9tICcuLi9lYXNlJztcclxuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfRk9SQ0UgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG4vKipcclxuICogQmVoYXZpb3VyIHRoYXQgZm9yY2VzIHBhcnRpY2xlcyBhbG9uZyBhIHNwZWNpZmljIGF4aXMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIEZvcmNlIGJlaGF2aW91ciBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmeCAtIHRoZSB4IGF4aXMgZm9yY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZnkgLSB0aGUgeSBheGlzIGZvcmNlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZ6IC0gdGhlIHogYXhpcyBmb3JjZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIHdpbGwgYmUgYXBwbGllZCBvciBub3RcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihmeCwgZnksIGZ6LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcclxuXHJcbiAgICB0aGlzLnJlc2V0KGZ4LCBmeSwgZnopO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmeCAtIHRoZSB4IGF4aXMgZm9yY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZnkgLSB0aGUgeSBheGlzIGZvcmNlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZ6IC0gdGhlIHogYXhpcyBmb3JjZVxyXG4gICAqL1xyXG4gIHJlc2V0KGZ4LCBmeSwgZnopIHtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIG5vcm1hbGl6ZWQgZm9yY2UgdG8gZXhlcnQgb24gdGhlIHBhcnRpY2xlIGluXHJcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKG5ldyBWZWN0b3IzRChmeCwgZnksIGZ6KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgaWQgb2YgdGhlIGZvcmNlIHZlY3RvclxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHRoaXMuZm9yY2UuaWRcclxuICAgICAqL1xyXG4gICAgdGhpcy5mb3JjZS5pZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZS5hY2NlbGVyYXRpb24gcHJvcGVydHkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcclxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gdGhlIHBhcnRpY2xlIGluZGV4XHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgbXV0YXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xyXG4gICAgdGhpcy5lbmVyZ2l6ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xyXG5cclxuICAgIHBhcnRpY2xlLmFjY2VsZXJhdGlvbi5hZGQodGhpcy5mb3JjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgRm9yY2UgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXHJcbiAgICogQHJldHVybiB7Rm9yY2V9XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHsgZngsIGZ5LCBmeiwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xyXG5cclxuICAgIHJldHVybiBuZXcgRm9yY2UoZngsIGZ5LCBmeiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==