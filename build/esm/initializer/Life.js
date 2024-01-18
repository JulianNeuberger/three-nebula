import Initializer from './Initializer';
import { createSpan } from '../math';
import { INITIALIZER_TYPE_LIFE as type } from './types';
/**
 * Sets the life property on initialized particles.
 *
 */

export default class Life extends Initializer {
  /**
   * Constructs a Life property instance.
   *
   * @param {number} min - The minimum life
   * @param {number} max - The maximum life
   * @param {boolean} [center] - Determines whether to average the life value
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
   * @return void
   */
  constructor(min, max, center, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The life span of the particle.
     * @type {Span}
     */

    this.lifePan = createSpan(min, max, center);
  }
  /**
   * Sets the particle's initial life.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    if (this.lifePan.a == Infinity || this.lifePan.a == 'infi') {
      particle.life = Infinity;
    } else {
      particle.life = this.lifePan.getValue();
    }
  }
  /**
   * Creates a Life initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.min - The minimum life time
   * @param {number} json.max - The maximum life time
   * @param {number} json.center - The center of the life time
   * @param {boolean} [json.isEnabled=true] - Determines if the initializer should be enabled or not
   * @return {Life}
   */


  static fromJSON(json) {
    const {
      min,
      max,
      center = false,
      isEnabled = true
    } = json;
    return new Life(min, max, center, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9MaWZlLmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpemVyIiwiY3JlYXRlU3BhbiIsIklOSVRJQUxJWkVSX1RZUEVfTElGRSIsInR5cGUiLCJMaWZlIiwiY29uc3RydWN0b3IiLCJtaW4iLCJtYXgiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJsaWZlUGFuIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiYSIsIkluZmluaXR5IiwibGlmZSIsImdldFZhbHVlIiwiZnJvbUpTT04iLCJqc29uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixTQUEzQjtBQUNBLFNBQVNDLHFCQUFxQixJQUFJQyxJQUFsQyxRQUE4QyxTQUE5QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsSUFBTixTQUFtQkosV0FBbkIsQ0FBK0I7QUFDNUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VLLEVBQUFBLFdBQVcsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLFNBQVMsR0FBRyxJQUEvQixFQUFxQztBQUM5QyxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxPQUFMLEdBQWVULFVBQVUsQ0FBQ0ssR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsQ0FBekI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CLFFBQUksS0FBS0YsT0FBTCxDQUFhRyxDQUFiLElBQWtCQyxRQUFsQixJQUE4QixLQUFLSixPQUFMLENBQWFHLENBQWIsSUFBa0IsTUFBcEQsRUFBNEQ7QUFDMURELE1BQUFBLFFBQVEsQ0FBQ0csSUFBVCxHQUFnQkQsUUFBaEI7QUFDRCxLQUZELE1BRU87QUFDTEYsTUFBQUEsUUFBUSxDQUFDRyxJQUFULEdBQWdCLEtBQUtMLE9BQUwsQ0FBYU0sUUFBYixFQUFoQjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJDLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRVosTUFBQUEsR0FBRjtBQUFPQyxNQUFBQSxHQUFQO0FBQVlDLE1BQUFBLE1BQU0sR0FBRyxLQUFyQjtBQUE0QkMsTUFBQUEsU0FBUyxHQUFHO0FBQXhDLFFBQWlEUyxJQUF2RDtBQUVBLFdBQU8sSUFBSWQsSUFBSixDQUFTRSxHQUFULEVBQWNDLEdBQWQsRUFBbUJDLE1BQW5CLEVBQTJCQyxTQUEzQixDQUFQO0FBQ0Q7O0FBaEQyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcclxuaW1wb3J0IHsgY3JlYXRlU3BhbiB9IGZyb20gJy4uL21hdGgnO1xyXG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX0xJRkUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGxpZmUgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIEluaXRpYWxpemVyIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgTGlmZSBwcm9wZXJ0eSBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSBUaGUgbWluaW11bSBsaWZlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heCAtIFRoZSBtYXhpbXVtIGxpZmVcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjZW50ZXJdIC0gRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIGF2ZXJhZ2UgdGhlIGxpZmUgdmFsdWVcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBpbml0aWFsaXplciBzaG91bGQgYmUgZW5hYmxlZCBvciBub3RcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihtaW4sIG1heCwgY2VudGVyLCBpc0VuYWJsZWQgPSB0cnVlKSB7XHJcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGxpZmUgc3BhbiBvZiB0aGUgcGFydGljbGUuXHJcbiAgICAgKiBAdHlwZSB7U3Bhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5saWZlUGFuID0gY3JlYXRlU3BhbihtaW4sIG1heCwgY2VudGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCBsaWZlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICBpZiAodGhpcy5saWZlUGFuLmEgPT0gSW5maW5pdHkgfHwgdGhpcy5saWZlUGFuLmEgPT0gJ2luZmknKSB7XHJcbiAgICAgIHBhcnRpY2xlLmxpZmUgPSBJbmZpbml0eTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcnRpY2xlLmxpZmUgPSB0aGlzLmxpZmVQYW4uZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBMaWZlIGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLm1pbiAtIFRoZSBtaW5pbXVtIGxpZmUgdGltZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLm1heCAtIFRoZSBtYXhpbXVtIGxpZmUgdGltZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLmNlbnRlciAtIFRoZSBjZW50ZXIgb2YgdGhlIGxpZmUgdGltZVxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2pzb24uaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgaW5pdGlhbGl6ZXIgc2hvdWxkIGJlIGVuYWJsZWQgb3Igbm90XHJcbiAgICogQHJldHVybiB7TGlmZX1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyBtaW4sIG1heCwgY2VudGVyID0gZmFsc2UsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBMaWZlKG1pbiwgbWF4LCBjZW50ZXIsIGlzRW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==