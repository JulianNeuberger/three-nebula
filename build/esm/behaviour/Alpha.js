import { MathUtils, createSpan } from '../math';
import Behaviour from './Behaviour';
import { PARTICLE_ALPHA_THRESHOLD } from './constants';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_ALPHA as type } from './types';
/**
 * Behaviour that applies an alpha transition effect to particles.
 *
 */

export default class Alpha extends Behaviour {
  /**
   * Constructs an Alpha behaviour instance.
   *
   * @param {number} alphaA - The starting alpha value
   * @param {?number} alphaB - The ending alpha value
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(alphaA = 1, alphaB = null, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    /**
     * @desc The starting alpha value
     * @type {number|Span}
     */

    this.alphaA = alphaA;
    /**
     * @desc The ending alpha value
     * @type {number|Span}
     */

    this.alphaB = alphaB;
    this.reset(alphaA, alphaB);
  }
  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */


  get same() {
    return this._same;
  }
  /**
   * Sets the _same property which determines if the alpha are the same.
   *
   * @param {boolean} same
   * @return {boolean}
   */


  set same(same) {
    /**
     * @type {boolean}
     */
    this._same = same;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} alphaA - the starting alpha value
   * @param {?number} alphaB - the ending alpha value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */


  reset(alphaA = 1, alphaB = null, life, easing) {
    this.same = alphaB === null || alphaB === undefined ? true : false;
    this.alphaA = createSpan(alphaA);
    this.alphaB = createSpan(alphaB);
    life && super.reset(life, easing);
  }
  /**
   * Initializes the behaviour on a particle.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */


  initialize(particle) {
    particle.useAlpha = true;
    particle.transform.alphaA = this.alphaA.getValue();
    particle.transform.alphaB = this.same ? particle.transform.alphaA : this.alphaB.getValue();
  }
  /**
   * Mutates the target's alpha/opacity property.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.alpha = MathUtils.lerp(particle.transform.alphaA, particle.transform.alphaB, this.energy);

    if (particle.alpha < PARTICLE_ALPHA_THRESHOLD) {
      particle.alpha = 0;
    }
  }
  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.alphaA - The starting alpha value
   * @property {number} json.alphaB - The ending alpha value
   * @property {number} json.life - The life of the behaviour
   * @property {string} json.easing - The easing equation to use for transforms
   * @return {Body}
   */


  static fromJSON(json) {
    const {
      alphaA,
      alphaB,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Alpha(alphaA, alphaB, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiXSwibmFtZXMiOlsiTWF0aFV0aWxzIiwiY3JlYXRlU3BhbiIsIkJlaGF2aW91ciIsIlBBUlRJQ0xFX0FMUEhBX1RIUkVTSE9MRCIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX0FMUEhBIiwidHlwZSIsIkFscGhhIiwiY29uc3RydWN0b3IiLCJhbHBoYUEiLCJhbHBoYUIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJzYW1lIiwiX3NhbWUiLCJ1bmRlZmluZWQiLCJpbml0aWFsaXplIiwicGFydGljbGUiLCJ1c2VBbHBoYSIsInRyYW5zZm9ybSIsImdldFZhbHVlIiwibXV0YXRlIiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJhbHBoYSIsImxlcnAiLCJlbmVyZ3kiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFNBQVQsRUFBb0JDLFVBQXBCLFFBQXNDLFNBQXRDO0FBRUEsT0FBT0MsU0FBUCxNQUFzQixhQUF0QjtBQUNBLFNBQVNDLHdCQUFULFFBQXlDLGFBQXpDO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxTQUFoQztBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsS0FBTixTQUFvQkwsU0FBcEIsQ0FBOEI7QUFDM0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRU0sRUFBQUEsV0FBVyxDQUFDQyxNQUFNLEdBQUcsQ0FBVixFQUFhQyxNQUFNLEdBQUcsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDQyxNQUFsQyxFQUEwQ0MsU0FBUyxHQUFHLElBQXRELEVBQTREO0FBQ3JFLFVBQU1GLElBQU4sRUFBWUMsTUFBWixFQUFvQk4sSUFBcEIsRUFBMEJPLFNBQTFCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0osTUFBTCxHQUFjQSxNQUFkO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBRUEsU0FBS0ksS0FBTCxDQUFXTCxNQUFYLEVBQW1CQyxNQUFuQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ1UsTUFBSkssSUFBSSxHQUFHO0FBQ1QsV0FBTyxLQUFLQyxLQUFaO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNVLE1BQUpELElBQUksQ0FBQ0EsSUFBRCxFQUFPO0FBQ2I7QUFDSjtBQUNBO0FBQ0ksU0FBS0MsS0FBTCxHQUFhRCxJQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRCxFQUFBQSxLQUFLLENBQUNMLE1BQU0sR0FBRyxDQUFWLEVBQWFDLE1BQU0sR0FBRyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0NDLE1BQWxDLEVBQTBDO0FBQzdDLFNBQUtHLElBQUwsR0FBWUwsTUFBTSxLQUFLLElBQVgsSUFBbUJBLE1BQU0sS0FBS08sU0FBOUIsR0FBMEMsSUFBMUMsR0FBaUQsS0FBN0Q7QUFDQSxTQUFLUixNQUFMLEdBQWNSLFVBQVUsQ0FBQ1EsTUFBRCxDQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBY1QsVUFBVSxDQUFDUyxNQUFELENBQXhCO0FBRUFDLElBQUFBLElBQUksSUFBSSxNQUFNRyxLQUFOLENBQVlILElBQVosRUFBa0JDLE1BQWxCLENBQVI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VNLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CQSxJQUFBQSxRQUFRLENBQUNDLFFBQVQsR0FBb0IsSUFBcEI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CWixNQUFuQixHQUE0QixLQUFLQSxNQUFMLENBQVlhLFFBQVosRUFBNUI7QUFFQUgsSUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CWCxNQUFuQixHQUE0QixLQUFLSyxJQUFMLEdBQ3hCSSxRQUFRLENBQUNFLFNBQVQsQ0FBbUJaLE1BREssR0FFeEIsS0FBS0MsTUFBTCxDQUFZWSxRQUFaLEVBRko7QUFHRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxNQUFNLENBQUNKLFFBQUQsRUFBV0ssSUFBWCxFQUFpQkMsS0FBakIsRUFBd0I7QUFDNUIsU0FBS0MsUUFBTCxDQUFjUCxRQUFkLEVBQXdCSyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQU4sSUFBQUEsUUFBUSxDQUFDUSxLQUFULEdBQWlCM0IsU0FBUyxDQUFDNEIsSUFBVixDQUNmVCxRQUFRLENBQUNFLFNBQVQsQ0FBbUJaLE1BREosRUFFZlUsUUFBUSxDQUFDRSxTQUFULENBQW1CWCxNQUZKLEVBR2YsS0FBS21CLE1BSFUsQ0FBakI7O0FBTUEsUUFBSVYsUUFBUSxDQUFDUSxLQUFULEdBQWlCeEIsd0JBQXJCLEVBQStDO0FBQzdDZ0IsTUFBQUEsUUFBUSxDQUFDUSxLQUFULEdBQWlCLENBQWpCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkcsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFdEIsTUFBQUEsTUFBRjtBQUFVQyxNQUFBQSxNQUFWO0FBQWtCQyxNQUFBQSxJQUFsQjtBQUF3QkMsTUFBQUEsTUFBeEI7QUFBZ0NDLE1BQUFBLFNBQVMsR0FBRztBQUE1QyxRQUFxRGtCLElBQTNEO0FBRUEsV0FBTyxJQUFJeEIsS0FBSixDQUFVRSxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQkMsSUFBMUIsRUFBZ0NQLGVBQWUsQ0FBQ1EsTUFBRCxDQUEvQyxFQUF5REMsU0FBekQsQ0FBUDtBQUNEOztBQXZIMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXRoVXRpbHMsIGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcclxuXHJcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xyXG5pbXBvcnQgeyBQQVJUSUNMRV9BTFBIQV9USFJFU0hPTEQgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xyXG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9BTFBIQSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQmVoYXZpb3VyIHRoYXQgYXBwbGllcyBhbiBhbHBoYSB0cmFuc2l0aW9uIGVmZmVjdCB0byBwYXJ0aWNsZXMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhbiBBbHBoYSBiZWhhdmlvdXIgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYWxwaGFBIC0gVGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBhbHBoYUIgLSBUaGUgZW5kaW5nIGFscGhhIHZhbHVlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGFscGhhQSA9IDEsIGFscGhhQiA9IG51bGwsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xyXG4gICAgc3VwZXIobGlmZSwgZWFzaW5nLCB0eXBlLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfFNwYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYWxwaGFBID0gYWxwaGFBO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGVuZGluZyBhbHBoYSB2YWx1ZVxyXG4gICAgICogQHR5cGUge251bWJlcnxTcGFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFscGhhQiA9IGFscGhhQjtcclxuXHJcbiAgICB0aGlzLnJlc2V0KGFscGhhQSwgYWxwaGFCKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IHNhbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2FtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2FtZVxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgc2V0IHNhbWUoc2FtZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5fc2FtZSA9IHNhbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFscGhhQSAtIHRoZSBzdGFydGluZyBhbHBoYSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7P251bWJlcn0gYWxwaGFCIC0gdGhlIGVuZGluZyBhbHBoYSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgcmVzZXQoYWxwaGFBID0gMSwgYWxwaGFCID0gbnVsbCwgbGlmZSwgZWFzaW5nKSB7XHJcbiAgICB0aGlzLnNhbWUgPSBhbHBoYUIgPT09IG51bGwgfHwgYWxwaGFCID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB0aGlzLmFscGhhQSA9IGNyZWF0ZVNwYW4oYWxwaGFBKTtcclxuICAgIHRoaXMuYWxwaGFCID0gY3JlYXRlU3BhbihhbHBoYUIpO1xyXG5cclxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIHRoZSBiZWhhdmlvdXIgb24gYSBwYXJ0aWNsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBiZWhhdmlvdXIgb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICBwYXJ0aWNsZS51c2VBbHBoYSA9IHRydWU7XHJcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFBID0gdGhpcy5hbHBoYUEuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFCID0gdGhpcy5zYW1lXHJcbiAgICAgID8gcGFydGljbGUudHJhbnNmb3JtLmFscGhhQVxyXG4gICAgICA6IHRoaXMuYWxwaGFCLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNdXRhdGVzIHRoZSB0YXJnZXQncyBhbHBoYS9vcGFjaXR5IHByb3BlcnR5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIGVuZ2luZSB0aW1lXHJcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcclxuICAgIHRoaXMuZW5lcmdpemUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcclxuXHJcbiAgICBwYXJ0aWNsZS5hbHBoYSA9IE1hdGhVdGlscy5sZXJwKFxyXG4gICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFBLFxyXG4gICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFCLFxyXG4gICAgICB0aGlzLmVuZXJneVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocGFydGljbGUuYWxwaGEgPCBQQVJUSUNMRV9BTFBIQV9USFJFU0hPTEQpIHtcclxuICAgICAgcGFydGljbGUuYWxwaGEgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIEJvZHkgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uYWxwaGFBIC0gVGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uYWxwaGFCIC0gVGhlIGVuZGluZyBhbHBoYSB2YWx1ZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGpzb24uZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcclxuICAgKiBAcmV0dXJuIHtCb2R5fVxyXG4gICAqL1xyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB7IGFscGhhQSwgYWxwaGFCLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBBbHBoYShhbHBoYUEsIGFscGhhQiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==