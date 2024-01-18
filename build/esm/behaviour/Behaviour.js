import { DEFAULT_BEHAVIOUR_EASING, DEFAULT_LIFE } from './constants';
import { BEHAVIOUR_TYPE_ABSTRACT } from './types';
import { MEASURE } from '../constants';
import isNumber from 'lodash/isNumber';
import { uid } from '../utils';
/**
 * The base behaviour class.
 * Behaviours manage a particle's behaviour after they have been emitted.
 *
 */

export default class Behaviour {
  /**
   * Constructs a Behaviour instance.
   *
   * @param {number} [life=Infinity] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   * @param {string} [type=BEHAVIOUR_TYPE_ABSTRACT] - The behaviour type
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(life = Infinity, easing = DEFAULT_BEHAVIOUR_EASING, type = BEHAVIOUR_TYPE_ABSTRACT, isEnabled = true) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    /**
     * @desc Determines if the behaviour will be applied or not
     * @type {boolean}
     */

    this.isEnabled = isEnabled;
    /**
     * @desc The behaviour's id
     * @type {string} id
     */

    this.id = `behaviour-${uid()}`;
    /**
     * @desc The life of the behaviour
     * @type {number}
     */

    this.life = life;
    /**
     * @desc The behaviour's decaying trend
     * @type {function}
     */

    this.easing = easing;
    /**
     * @desc The age of the behaviour
     * @type {number}
     */

    this.age = 0;
    /**
     * @desc The energy of the behaviour
     * @type {number}
     */

    this.energy = 1;
    /**
     * Determines if the behaviour is dead or not
     * @type {boolean}
     */

    this.dead = false;
  }
  /**
   * Reset this behaviour's parameters
   *
   * @param {number} [life=DEFAULT_LIFE] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   */


  reset(life = DEFAULT_LIFE, easing = DEFAULT_BEHAVIOUR_EASING) {
    this.life = life;
    this.easing = easing || DEFAULT_BEHAVIOUR_EASING;
  }
  /**
   * Ensures that life is infinity if an invalid value is supplied.
   *
   * @return void
   */


  set life(life) {
    this._life = isNumber(life) ? life : DEFAULT_LIFE;
  }
  /**
   * Gets the behaviour's life.
   *
   * @return {Number}
   */


  get life() {
    return this._life;
  }
  /**
   * Normalize a force by 1:100;
   *
   * @param {Vector3D} force - The force to normalize.
   * @return {Vector3D}
   */


  normalizeForce(force) {
    return force.scalar(MEASURE);
  }
  /**
   * Normalize a value by 1:100;
   *
   * @param {number} value - The value to normalize
   * @return {number}
   */


  normalizeValue(value) {
    return value * MEASURE;
  }
  /**
   * Set the behaviour's initial properties on the particle.
   *
   * @param {Particle} particle
   * @abstract
   */


  initialize(particle) {} // eslint-disable-line

  /**
   * Apply behaviour to the target as a factor of time.
   * Internally calls the mutate method to change properties on the target
   * Will not do so if the behaviour is disabled
   *
   * @abstract
   * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
   * @param {Number} time - the system integration time
   * @param {integer} index - the target index
   * @return mixed
   */


  applyBehaviour(target, time, index) {
    if (!this.isEnabled) {
      return;
    }

    this.mutate(target, time, index);
  }
  /**
   * Change the target's properties according to specific behaviour logic.
   *
   * @abstract
   * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
   * @param {Number} time - the system integration time
   * @return mixed
   */


  mutate(target, time, index) {} // eslint-disable-line

  /**
   * Compares the age of the behaviour vs integration time and determines
   * if the behaviour should be set to dead or not.
   * Sets the behaviour energy as a factor of particle age and life.
   *
   * @param {Particle} particle - The particle to apply the behaviour to
   * @param {Number} time - the system integration time
   * @return void
   */


  energize(particle, time) {
    if (this.dead) {
      return;
    }

    this.age += time;

    if (this.age >= this.life) {
      this.energy = 0;
      this.dead = true;
      return;
    }

    const scale = this.easing(particle.age / particle.life);
    this.energy = Math.max(1 - scale, 0);
  }
  /**
   * Destory this behaviour.
   *
   * @abstract
   */


  destroy() {}
  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @abstract
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Behaviour}
   */


  fromJSON(json) {} // eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQmVoYXZpb3VyLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfQkVIQVZJT1VSX0VBU0lORyIsIkRFRkFVTFRfTElGRSIsIkJFSEFWSU9VUl9UWVBFX0FCU1RSQUNUIiwiTUVBU1VSRSIsImlzTnVtYmVyIiwidWlkIiwiQmVoYXZpb3VyIiwiY29uc3RydWN0b3IiLCJsaWZlIiwiSW5maW5pdHkiLCJlYXNpbmciLCJ0eXBlIiwiaXNFbmFibGVkIiwiaWQiLCJhZ2UiLCJlbmVyZ3kiLCJkZWFkIiwicmVzZXQiLCJfbGlmZSIsIm5vcm1hbGl6ZUZvcmNlIiwiZm9yY2UiLCJzY2FsYXIiLCJub3JtYWxpemVWYWx1ZSIsInZhbHVlIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiYXBwbHlCZWhhdmlvdXIiLCJ0YXJnZXQiLCJ0aW1lIiwiaW5kZXgiLCJtdXRhdGUiLCJlbmVyZ2l6ZSIsInNjYWxlIiwiTWF0aCIsIm1heCIsImRlc3Ryb3kiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLHdCQUFULEVBQW1DQyxZQUFuQyxRQUF1RCxhQUF2RDtBQUVBLFNBQVNDLHVCQUFULFFBQXdDLFNBQXhDO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixjQUF4QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsaUJBQXJCO0FBQ0EsU0FBU0MsR0FBVCxRQUFvQixVQUFwQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxTQUFOLENBQWdCO0FBQzdCO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxXQUFXLENBQ1RDLElBQUksR0FBR0MsUUFERSxFQUVUQyxNQUFNLEdBQUdWLHdCQUZBLEVBR1RXLElBQUksR0FBR1QsdUJBSEUsRUFJVFUsU0FBUyxHQUFHLElBSkgsRUFLVDtBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksU0FBS0QsSUFBTCxHQUFZQSxJQUFa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RDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRyxFQUFBQSxPQUFPLEdBQUcsQ0FBRTtBQUVaO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUMsRUFBQUEsUUFBUSxDQUFDQyxJQUFELEVBQU8sQ0FBRSxDQWpNWSxDQWlNWDs7O0FBak1XIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HLCBERUZBVUxUX0xJRkUgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9BQlNUUkFDVCB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNRUFTVVJFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IGlzTnVtYmVyIGZyb20gJ2xvZGFzaC9pc051bWJlcic7XHJcbmltcG9ydCB7IHVpZCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBiZWhhdmlvdXIgY2xhc3MuXHJcbiAqIEJlaGF2aW91cnMgbWFuYWdlIGEgcGFydGljbGUncyBiZWhhdmlvdXIgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZW1pdHRlZC5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIEJlaGF2aW91ciBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1ERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkddIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPUJFSEFWSU9VUl9UWVBFX0FCU1RSQUNUXSAtIFRoZSBiZWhhdmlvdXIgdHlwZVxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBsaWZlID0gSW5maW5pdHksXHJcbiAgICBlYXNpbmcgPSBERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkcsXHJcbiAgICB0eXBlID0gQkVIQVZJT1VSX1RZUEVfQUJTVFJBQ1QsXHJcbiAgICBpc0VuYWJsZWQgPSB0cnVlXHJcbiAgKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgYmVoYXZpb3VyJ3MgaWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9IGlkXHJcbiAgICAgKi9cclxuICAgIHRoaXMuaWQgPSBgYmVoYXZpb3VyLSR7dWlkKCl9YDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubGlmZSA9IGxpZmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcclxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5lYXNpbmcgPSBlYXNpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgYWdlIG9mIHRoZSBiZWhhdmlvdXJcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYWdlID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBlbmVyZ3kgb2YgdGhlIGJlaGF2aW91clxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIGlzIGRlYWQgb3Igbm90XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1ERUZBVUxUX0xJRkVdIC0gVGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9REVGQVVMVF9CRUhBVklPVVJfRUFTSU5HXSAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxyXG4gICAqL1xyXG4gIHJlc2V0KGxpZmUgPSBERUZBVUxUX0xJRkUsIGVhc2luZyA9IERFRkFVTFRfQkVIQVZJT1VSX0VBU0lORykge1xyXG4gICAgdGhpcy5saWZlID0gbGlmZTtcclxuICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IERFRkFVTFRfQkVIQVZJT1VSX0VBU0lORztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuc3VyZXMgdGhhdCBsaWZlIGlzIGluZmluaXR5IGlmIGFuIGludmFsaWQgdmFsdWUgaXMgc3VwcGxpZWQuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBzZXQgbGlmZShsaWZlKSB7XHJcbiAgICB0aGlzLl9saWZlID0gaXNOdW1iZXIobGlmZSkgPyBsaWZlIDogREVGQVVMVF9MSUZFO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgYmVoYXZpb3VyJ3MgbGlmZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgKi9cclxuICBnZXQgbGlmZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saWZlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm9ybWFsaXplIGEgZm9yY2UgYnkgMToxMDA7XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSBmb3JjZSAtIFRoZSBmb3JjZSB0byBub3JtYWxpemUuXHJcbiAgICogQHJldHVybiB7VmVjdG9yM0R9XHJcbiAgICovXHJcbiAgbm9ybWFsaXplRm9yY2UoZm9yY2UpIHtcclxuICAgIHJldHVybiBmb3JjZS5zY2FsYXIoTUVBU1VSRSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMDtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBub3JtYWxpemVcclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSAqIE1FQVNVUkU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGJlaGF2aW91cidzIGluaXRpYWwgcHJvcGVydGllcyBvbiB0aGUgcGFydGljbGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbHkgYmVoYXZpb3VyIHRvIHRoZSB0YXJnZXQgYXMgYSBmYWN0b3Igb2YgdGltZS5cclxuICAgKiBJbnRlcm5hbGx5IGNhbGxzIHRoZSBtdXRhdGUgbWV0aG9kIHRvIGNoYW5nZSBwcm9wZXJ0aWVzIG9uIHRoZSB0YXJnZXRcclxuICAgKiBXaWxsIG5vdCBkbyBzbyBpZiB0aGUgYmVoYXZpb3VyIGlzIGRpc2FibGVkXHJcbiAgICpcclxuICAgKiBAYWJzdHJhY3RcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfEVtaXR0ZXJ9IHRhcmdldCAtIFRoZSBwYXJ0aWNsZSBvciBlbWl0dGVyIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cclxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSAtIHRoZSBzeXN0ZW0gaW50ZWdyYXRpb24gdGltZVxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgdGFyZ2V0IGluZGV4XHJcbiAgICogQHJldHVybiBtaXhlZFxyXG4gICAqL1xyXG4gIGFwcGx5QmVoYXZpb3VyKHRhcmdldCwgdGltZSwgaW5kZXgpIHtcclxuICAgIGlmICghdGhpcy5pc0VuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXV0YXRlKHRhcmdldCwgdGltZSwgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHRoZSB0YXJnZXQncyBwcm9wZXJ0aWVzIGFjY29yZGluZyB0byBzcGVjaWZpYyBiZWhhdmlvdXIgbG9naWMuXHJcbiAgICpcclxuICAgKiBAYWJzdHJhY3RcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfEVtaXR0ZXJ9IHRhcmdldCAtIFRoZSBwYXJ0aWNsZSBvciBlbWl0dGVyIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cclxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSAtIHRoZSBzeXN0ZW0gaW50ZWdyYXRpb24gdGltZVxyXG4gICAqIEByZXR1cm4gbWl4ZWRcclxuICAgKi9cclxuICBtdXRhdGUodGFyZ2V0LCB0aW1lLCBpbmRleCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cclxuICAvKipcclxuICAgKiBDb21wYXJlcyB0aGUgYWdlIG9mIHRoZSBiZWhhdmlvdXIgdnMgaW50ZWdyYXRpb24gdGltZSBhbmQgZGV0ZXJtaW5lc1xyXG4gICAqIGlmIHRoZSBiZWhhdmlvdXIgc2hvdWxkIGJlIHNldCB0byBkZWFkIG9yIG5vdC5cclxuICAgKiBTZXRzIHRoZSBiZWhhdmlvdXIgZW5lcmd5IGFzIGEgZmFjdG9yIG9mIHBhcnRpY2xlIGFnZSBhbmQgbGlmZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cclxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSAtIHRoZSBzeXN0ZW0gaW50ZWdyYXRpb24gdGltZVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGVuZXJnaXplKHBhcnRpY2xlLCB0aW1lKSB7XHJcbiAgICBpZiAodGhpcy5kZWFkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xyXG5cclxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUpIHtcclxuICAgICAgdGhpcy5lbmVyZ3kgPSAwO1xyXG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XHJcblxyXG4gICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdG9yeSB0aGlzIGJlaGF2aW91ci5cclxuICAgKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBiZWhhdmlvdXIgZnJvbSB0aGUgSlNPTiBvYmplY3QgcGFzc2VkLlxyXG4gICAqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSByZXF1aXJlZCBjb25zdHJ1Y3RvciBwcm9wZXJ0aWVzXHJcbiAgICogQHJldHVybiB7QmVoYXZpb3VyfVxyXG4gICAqL1xyXG4gIGZyb21KU09OKGpzb24pIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxufVxyXG4iXX0=