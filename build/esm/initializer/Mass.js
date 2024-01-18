import Initializer from './Initializer';
import { createSpan } from '../math';
import { INITIALIZER_TYPE_MASS as type } from './types';
/**
 * Sets the mass property on initialized particles.
 *
 */

export default class Mass extends Initializer {
  /**
   * Constructs a Mass initializer instance.
   *
   * @param {number} min - The minumum mass for the particle
   * @param {number} max - The maximum mass for the particle
   * @param {boolean} [center] - Determines whether to average the mass value
   * @return void
   */
  constructor(min, max, center = false, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The mass span which is used to set the particle mass value.
     * @type {Span}
     */

    this.massPan = createSpan(min, max, center);
  }
  /**
   * Sets the particle's initial mass.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    particle.mass = this.massPan.getValue();
  }
  /**
   * Creates a Mass initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.min - The minimum mass
   * @property {number} json.max - The maximum mass
   * @property {number} json.center - The center of the mass
   * @return {Mass}
   */


  static fromJSON(json) {
    const {
      min,
      max,
      center = false,
      isEnabled = true
    } = json;
    return new Mass(min, max, center, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9NYXNzLmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpemVyIiwiY3JlYXRlU3BhbiIsIklOSVRJQUxJWkVSX1RZUEVfTUFTUyIsInR5cGUiLCJNYXNzIiwiY29uc3RydWN0b3IiLCJtaW4iLCJtYXgiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJtYXNzUGFuIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwibWFzcyIsImdldFZhbHVlIiwiZnJvbUpTT04iLCJqc29uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixTQUEzQjtBQUNBLFNBQVNDLHFCQUFxQixJQUFJQyxJQUFsQyxRQUE4QyxTQUE5QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsSUFBTixTQUFtQkosV0FBbkIsQ0FBK0I7QUFDNUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFNLEdBQUcsS0FBcEIsRUFBMkJDLFNBQVMsR0FBRyxJQUF2QyxFQUE2QztBQUN0RCxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxPQUFMLEdBQWVULFVBQVUsQ0FBQ0ssR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsQ0FBekI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CQSxJQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0IsS0FBS0gsT0FBTCxDQUFhSSxRQUFiLEVBQWhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNpQixTQUFSQyxRQUFRLENBQUNDLElBQUQsRUFBTztBQUNwQixVQUFNO0FBQUVWLE1BQUFBLEdBQUY7QUFBT0MsTUFBQUEsR0FBUDtBQUFZQyxNQUFBQSxNQUFNLEdBQUcsS0FBckI7QUFBNEJDLE1BQUFBLFNBQVMsR0FBRztBQUF4QyxRQUFpRE8sSUFBdkQ7QUFFQSxXQUFPLElBQUlaLElBQUosQ0FBU0UsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxNQUFuQixFQUEyQkMsU0FBM0IsQ0FBUDtBQUNEOztBQTFDMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XHJcbmltcG9ydCB7IGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcclxuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9NQVNTIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBtYXNzIHByb3BlcnR5IG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIE1hc3MgaW5pdGlhbGl6ZXIgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWluIC0gVGhlIG1pbnVtdW0gbWFzcyBmb3IgdGhlIHBhcnRpY2xlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heCAtIFRoZSBtYXhpbXVtIG1hc3MgZm9yIHRoZSBwYXJ0aWNsZVxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcl0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgbWFzcyB2YWx1ZVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG1pbiwgbWF4LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSkge1xyXG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBtYXNzIHNwYW4gd2hpY2ggaXMgdXNlZCB0byBzZXQgdGhlIHBhcnRpY2xlIG1hc3MgdmFsdWUuXHJcbiAgICAgKiBAdHlwZSB7U3Bhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXNzUGFuID0gY3JlYXRlU3BhbihtaW4sIG1heCwgY2VudGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCBtYXNzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICBwYXJ0aWNsZS5tYXNzID0gdGhpcy5tYXNzUGFuLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgTWFzcyBpbml0aWFsaXplciBmcm9tIEpTT04uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5taW4gLSBUaGUgbWluaW11bSBtYXNzXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ubWF4IC0gVGhlIG1heGltdW0gbWFzc1xyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmNlbnRlciAtIFRoZSBjZW50ZXIgb2YgdGhlIG1hc3NcclxuICAgKiBAcmV0dXJuIHtNYXNzfVxyXG4gICAqL1xyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB7IG1pbiwgbWF4LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcclxuXHJcbiAgICByZXR1cm4gbmV3IE1hc3MobWluLCBtYXgsIGNlbnRlciwgaXNFbmFibGVkKTtcclxuICB9XHJcbn1cclxuIl19