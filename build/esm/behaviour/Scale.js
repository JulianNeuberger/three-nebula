import { MathUtils, createSpan } from '../math';
import Behaviour from './Behaviour';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_SCALE as type } from './types';
/**
 * Behaviour that scales particles.
 *
 */

export default class Scale extends Behaviour {
  /**
   * Constructs a Scale behaviour instance.
   *
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(scaleA, scaleB, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(scaleA, scaleB);
  }
  /**
   * Gets the _same property which determines if the scale props are the same.
   *
   * @return {boolean}
   */


  get same() {
    return this._same;
  }
  /**
   * Sets the _same property which determines if the scale props are the same.
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
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */


  reset(scaleA, scaleB, life, easing) {
    this.same = scaleB === null || scaleB === undefined ? true : false;
    /**
     * @desc The starting scale.
     * @type {Span}
     */

    this.scaleA = createSpan(scaleA || 1);
    /**
     * @desc The ending scale.
     * @type {Span}
     */

    this.scaleB = createSpan(scaleB);
    life && super.reset(life, easing);
  }
  /**
   * Initializes the behaviour on a particle.
   * Stores initial values for comparison and mutation in the applyBehaviour method.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */


  initialize(particle) {
    particle.transform.scaleA = this.scaleA.getValue();
    particle.transform.oldRadius = particle.radius;
    particle.transform.scaleB = this.same ? particle.transform.scaleA : this.scaleB.getValue();
  }
  /**
   * Applies the behaviour to the particle.
   * Mutates the particle's scale and its radius according to this scale.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.scale = MathUtils.lerp(particle.transform.scaleA, particle.transform.scaleB, this.energy);

    if (particle.scale < 0.0005) {
      particle.scale = 0;
    }

    particle.radius = particle.transform.oldRadius * particle.scale;
  }
  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Spring}
   */


  static fromJSON(json) {
    const {
      scaleA,
      scaleB,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Scale(scaleA, scaleB, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvU2NhbGUuanMiXSwibmFtZXMiOlsiTWF0aFV0aWxzIiwiY3JlYXRlU3BhbiIsIkJlaGF2aW91ciIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX1NDQUxFIiwidHlwZSIsIlNjYWxlIiwiY29uc3RydWN0b3IiLCJzY2FsZUEiLCJzY2FsZUIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJzYW1lIiwiX3NhbWUiLCJ1bmRlZmluZWQiLCJpbml0aWFsaXplIiwicGFydGljbGUiLCJ0cmFuc2Zvcm0iLCJnZXRWYWx1ZSIsIm9sZFJhZGl1cyIsInJhZGl1cyIsIm11dGF0ZSIsInRpbWUiLCJpbmRleCIsImVuZXJnaXplIiwic2NhbGUiLCJsZXJwIiwiZW5lcmd5IiwiZnJvbUpTT04iLCJqc29uIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxTQUFULEVBQW9CQyxVQUFwQixRQUFzQyxTQUF0QztBQUVBLE9BQU9DLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0Msb0JBQW9CLElBQUlDLElBQWpDLFFBQTZDLFNBQTdDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxLQUFOLFNBQW9CSixTQUFwQixDQUE4QjtBQUMzQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxFQUFpQkMsSUFBakIsRUFBdUJDLE1BQXZCLEVBQStCQyxTQUFTLEdBQUcsSUFBM0MsRUFBaUQ7QUFDMUQsVUFBTUYsSUFBTixFQUFZQyxNQUFaLEVBQW9CTixJQUFwQixFQUEwQk8sU0FBMUI7QUFFQSxTQUFLQyxLQUFMLENBQVdMLE1BQVgsRUFBbUJDLE1BQW5CO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFDVSxNQUFKSyxJQUFJLEdBQUc7QUFDVCxXQUFPLEtBQUtDLEtBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ1UsTUFBSkQsSUFBSSxDQUFDQSxJQUFELEVBQU87QUFDYjtBQUNKO0FBQ0E7QUFDSSxTQUFLQyxLQUFMLEdBQWFELElBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VELEVBQUFBLEtBQUssQ0FBQ0wsTUFBRCxFQUFTQyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsTUFBdkIsRUFBK0I7QUFDbEMsU0FBS0csSUFBTCxHQUFZTCxNQUFNLEtBQUssSUFBWCxJQUFtQkEsTUFBTSxLQUFLTyxTQUE5QixHQUEwQyxJQUExQyxHQUFpRCxLQUE3RDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtSLE1BQUwsR0FBY1AsVUFBVSxDQUFDTyxNQUFNLElBQUksQ0FBWCxDQUF4QjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLE1BQUwsR0FBY1IsVUFBVSxDQUFDUSxNQUFELENBQXhCO0FBRUFDLElBQUFBLElBQUksSUFBSSxNQUFNRyxLQUFOLENBQVlILElBQVosRUFBa0JDLE1BQWxCLENBQVI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRU0sRUFBQUEsVUFBVSxDQUFDQyxRQUFELEVBQVc7QUFDbkJBLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlgsTUFBbkIsR0FBNEIsS0FBS0EsTUFBTCxDQUFZWSxRQUFaLEVBQTVCO0FBQ0FGLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkUsU0FBbkIsR0FBK0JILFFBQVEsQ0FBQ0ksTUFBeEM7QUFFQUosSUFBQUEsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQUFuQixHQUE0QixLQUFLSyxJQUFMLEdBQ3hCSSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJYLE1BREssR0FFeEIsS0FBS0MsTUFBTCxDQUFZVyxRQUFaLEVBRko7QUFHRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLE1BQU0sQ0FBQ0wsUUFBRCxFQUFXTSxJQUFYLEVBQWlCQyxLQUFqQixFQUF3QjtBQUM1QixTQUFLQyxRQUFMLENBQWNSLFFBQWQsRUFBd0JNLElBQXhCLEVBQThCQyxLQUE5QjtBQUVBUCxJQUFBQSxRQUFRLENBQUNTLEtBQVQsR0FBaUIzQixTQUFTLENBQUM0QixJQUFWLENBQ2ZWLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlgsTUFESixFQUVmVSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJWLE1BRkosRUFHZixLQUFLb0IsTUFIVSxDQUFqQjs7QUFNQSxRQUFJWCxRQUFRLENBQUNTLEtBQVQsR0FBaUIsTUFBckIsRUFBNkI7QUFDM0JULE1BQUFBLFFBQVEsQ0FBQ1MsS0FBVCxHQUFpQixDQUFqQjtBQUNEOztBQUVEVCxJQUFBQSxRQUFRLENBQUNJLE1BQVQsR0FBa0JKLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkUsU0FBbkIsR0FBK0JILFFBQVEsQ0FBQ1MsS0FBMUQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJHLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRXZCLE1BQUFBLE1BQUY7QUFBVUMsTUFBQUEsTUFBVjtBQUFrQkMsTUFBQUEsSUFBbEI7QUFBd0JDLE1BQUFBLE1BQXhCO0FBQWdDQyxNQUFBQSxTQUFTLEdBQUc7QUFBNUMsUUFBcURtQixJQUEzRDtBQUVBLFdBQU8sSUFBSXpCLEtBQUosQ0FBVUUsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLElBQTFCLEVBQWdDUCxlQUFlLENBQUNRLE1BQUQsQ0FBL0MsRUFBeURDLFNBQXpELENBQVA7QUFDRDs7QUFySDBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0aFV0aWxzLCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XHJcblxyXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gJy4vQmVoYXZpb3VyJztcclxuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XHJcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1NDQUxFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBCZWhhdmlvdXIgdGhhdCBzY2FsZXMgcGFydGljbGVzLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBTY2FsZSBiZWhhdmlvdXIgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVBIC0gdGhlIHN0YXJ0aW5nIHNjYWxlIHZhbHVlXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBzY2FsZUIgLSB0aGUgZW5kaW5nIHNjYWxlIHZhbHVlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gdGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNjYWxlQSwgc2NhbGVCLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcclxuXHJcbiAgICB0aGlzLnJlc2V0KHNjYWxlQSwgc2NhbGVCKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIHNjYWxlIHByb3BzIGFyZSB0aGUgc2FtZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IHNhbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2FtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIHNjYWxlIHByb3BzIGFyZSB0aGUgc2FtZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2FtZVxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgc2V0IHNhbWUoc2FtZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5fc2FtZSA9IHNhbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlQSAtIHRoZSBzdGFydGluZyBzY2FsZSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7P251bWJlcn0gc2NhbGVCIC0gdGhlIGVuZGluZyBzY2FsZSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgcmVzZXQoc2NhbGVBLCBzY2FsZUIsIGxpZmUsIGVhc2luZykge1xyXG4gICAgdGhpcy5zYW1lID0gc2NhbGVCID09PSBudWxsIHx8IHNjYWxlQiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHN0YXJ0aW5nIHNjYWxlLlxyXG4gICAgICogQHR5cGUge1NwYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2NhbGVBID0gY3JlYXRlU3BhbihzY2FsZUEgfHwgMSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgZW5kaW5nIHNjYWxlLlxyXG4gICAgICogQHR5cGUge1NwYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2NhbGVCID0gY3JlYXRlU3BhbihzY2FsZUIpO1xyXG5cclxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIHRoZSBiZWhhdmlvdXIgb24gYSBwYXJ0aWNsZS5cclxuICAgKiBTdG9yZXMgaW5pdGlhbCB2YWx1ZXMgZm9yIGNvbXBhcmlzb24gYW5kIG11dGF0aW9uIGluIHRoZSBhcHBseUJlaGF2aW91ciBtZXRob2QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyIG9uXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xyXG4gICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQSA9IHRoaXMuc2NhbGVBLmdldFZhbHVlKCk7XHJcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0ub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xyXG5cclxuICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5zY2FsZUIgPSB0aGlzLnNhbWVcclxuICAgICAgPyBwYXJ0aWNsZS50cmFuc2Zvcm0uc2NhbGVBXHJcbiAgICAgIDogdGhpcy5zY2FsZUIuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGxpZXMgdGhlIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXHJcbiAgICogTXV0YXRlcyB0aGUgcGFydGljbGUncyBzY2FsZSBhbmQgaXRzIHJhZGl1cyBhY2NvcmRpbmcgdG8gdGhpcyBzY2FsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBlbmdpbmUgdGltZVxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XHJcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XHJcblxyXG4gICAgcGFydGljbGUuc2NhbGUgPSBNYXRoVXRpbHMubGVycChcclxuICAgICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQSxcclxuICAgICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQixcclxuICAgICAgdGhpcy5lbmVyZ3lcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHBhcnRpY2xlLnNjYWxlIDwgMC4wMDA1KSB7XHJcbiAgICAgIHBhcnRpY2xlLnNjYWxlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSBwYXJ0aWNsZS50cmFuc2Zvcm0ub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBiZWhhdmlvdXIgZnJvbSB0aGUgSlNPTiBvYmplY3QgcGFzc2VkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSByZXF1aXJlZCBjb25zdHJ1Y3RvciBwcm9wZXJ0aWVzXHJcbiAgICogQHJldHVybiB7U3ByaW5nfVxyXG4gICAqL1xyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB7IHNjYWxlQSwgc2NhbGVCLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBTY2FsZShzY2FsZUEsIHNjYWxlQiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==