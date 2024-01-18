import Force from './Force';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_GRAVITY as type } from './types';
/**
 * Behaviour that forces particles down the y axis.
 *
 */

export default class Gravity extends Force {
  /**
   * Constructs a Gravity behaviour instance.
   *
   * @param {number} gravity - the force to pull the particle down the y axis
   * @param {number} life - the life of the particle
   * @param {string} easing - the easing equation to use
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(gravity, life, easing, isEnabled = true) {
    super(0, -gravity, 0, life, easing, isEnabled);
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
  }

  static fromJSON(json) {
    const {
      gravity,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Gravity(gravity, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvR3Jhdml0eS5qcyJdLCJuYW1lcyI6WyJGb3JjZSIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX0dSQVZJVFkiLCJ0eXBlIiwiR3Jhdml0eSIsImNvbnN0cnVjdG9yIiwiZ3Jhdml0eSIsImxpZmUiLCJlYXNpbmciLCJpc0VuYWJsZWQiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLEtBQVAsTUFBa0IsU0FBbEI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0Msc0JBQXNCLElBQUlDLElBQW5DLFFBQStDLFNBQS9DO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxPQUFOLFNBQXNCSixLQUF0QixDQUE0QjtBQUN6QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVVDLElBQVYsRUFBZ0JDLE1BQWhCLEVBQXdCQyxTQUFTLEdBQUcsSUFBcEMsRUFBMEM7QUFDbkQsVUFBTSxDQUFOLEVBQVMsQ0FBQ0gsT0FBVixFQUFtQixDQUFuQixFQUFzQkMsSUFBdEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxTQUFwQztBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtOLElBQUwsR0FBWUEsSUFBWjtBQUNEOztBQUVjLFNBQVJPLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRUwsTUFBQUEsT0FBRjtBQUFXQyxNQUFBQSxJQUFYO0FBQWlCQyxNQUFBQSxNQUFqQjtBQUF5QkMsTUFBQUEsU0FBUyxHQUFHO0FBQXJDLFFBQThDRSxJQUFwRDtBQUVBLFdBQU8sSUFBSVAsT0FBSixDQUFZRSxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQk4sZUFBZSxDQUFDTyxNQUFELENBQTFDLEVBQW9EQyxTQUFwRCxDQUFQO0FBQ0Q7O0FBeEJ3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb3JjZSBmcm9tICcuL0ZvcmNlJztcclxuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XHJcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX0dSQVZJVFkgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEJlaGF2aW91ciB0aGF0IGZvcmNlcyBwYXJ0aWNsZXMgZG93biB0aGUgeSBheGlzLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgR3Jhdml0eSBiZWhhdmlvdXIgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3Jhdml0eSAtIHRoZSBmb3JjZSB0byBwdWxsIHRoZSBwYXJ0aWNsZSBkb3duIHRoZSB5IGF4aXNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIHRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlYXNpbmcgLSB0aGUgZWFzaW5nIGVxdWF0aW9uIHRvIHVzZVxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ3Jhdml0eSwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XHJcbiAgICBzdXBlcigwLCAtZ3Jhdml0eSwgMCwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHsgZ3Jhdml0eSwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xyXG5cclxuICAgIHJldHVybiBuZXcgR3Jhdml0eShncmF2aXR5LCBsaWZlLCBnZXRFYXNpbmdCeU5hbWUoZWFzaW5nKSwgaXNFbmFibGVkKTtcclxuICB9XHJcbn1cclxuIl19