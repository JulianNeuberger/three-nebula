import { DEFAULT_AGE, DEFAULT_ALPHA, DEFAULT_BODY, DEFAULT_DEAD, DEFAULT_EASING, DEFAULT_ENERGY, DEFAULT_LIFE, DEFAULT_MASS, DEFAULT_PARENT, DEFAULT_RADIUS, DEFAULT_SCALE, DEFAULT_SLEEP, DEFAULT_USE_ALPHA, DEFAULT_USE_COLOR } from './constants';
import { Util, uid } from '../utils';
import { PI } from '../constants';
import { Vector3D } from '../math';
import { CORE_TYPE_PARTICLE as type } from './types';
/**
 * A Particle is an object that is emitted by an emitter.
 *
 */

export default class Particle {
  /**
   * Constructs a Particle instance.
   *
   * @param {object} properties - The properties to instantiate the particle with
   * @property {number} properties.life - The particle's life
   * @property {number} properties.age - The particle's age
   * @property {number} properties.energy - The particle's energy loss
   * @property {boolean} properties.dead - Determines if the particle is dead or not
   * @property {boolean} properties.sleep - Determines if the particle is sleeping or not
   * @property {object} properties.target - The particle's target
   * @property {object} properties.body - The particle's body
   * @property {number} properties.mass - The particle's mass
   * @property {number} properties.radius - The particle's radius
   * @property {number} properties.alpha - The particle's alpha
   * @property {number} properties.scale - The particle's scale
   * @property {number} properties.rotation - The particle's rotation
   * @property {string|number} properties.color - The particle's color
   * @property {function} properties.easing - The particle's easing
   * @property {Vector3D} properties.position - The particle's position
   * @property {Vector3D} properties.velocity - The particle's velocity
   * @property {Vector3D} properties.acceleration - The particle's acceleration
   * @property {array} properties.behaviours - The particle's behaviours array
   * @property {object} properties.transform - The particle's transform collection
   * @return void
   */
  constructor(properties) {
    /**
     * @desc The particle's unique id
     * @type {number}
     */
    this.id = `particle-${uid()}`;
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc The particle's life
     * @type {number}
     */

    this.life = DEFAULT_LIFE;
    /**
     * @desc The particle's age
     * @type {number}
     */

    this.age = DEFAULT_AGE;
    /**
     * @desc The particle's energy loss
     * @type {number}
     */

    this.energy = DEFAULT_ENERGY;
    /**
     * @desc Determines if the particle is dead or not
     * @type {number}
     */

    this.dead = DEFAULT_DEAD;
    /**
     * @desc Determines if the particle is sleeping or not
     * @type {number}
     */

    this.sleep = DEFAULT_SLEEP;
    /**
     * @desc The particle's body
     * @type {object}
     */

    this.body = DEFAULT_BODY;
    /**
     * @desc The particle's parent
     * @type {?Emitter}
     */

    this.parent = DEFAULT_PARENT;
    /**
     * @desc The particle's mass
     * @type {number}
     */

    this.mass = DEFAULT_MASS;
    /**
     * @desc The particle's radius
     * @type {number}
     */

    this.radius = DEFAULT_RADIUS;
    /**
     * @desc The particle's alpha
     * @type {number}
     */

    this.alpha = DEFAULT_ALPHA;
    /**
     * @desc The particle's scale
     * @type {number}
     */

    this.scale = DEFAULT_SCALE;
    /**
     * @desc Determines whether to use color or not
     * @type {boolean}
     */

    this.useColor = DEFAULT_USE_COLOR;
    /**
     * @desc Determines whether to use alpha or not
     * @type {boolean}
     */

    this.useAlpha = DEFAULT_USE_ALPHA;
    /**
     * @desc The particle's easing
     * @type {string}
     */

    this.easing = DEFAULT_EASING;
    /**
     * @desc The particle's position
     * @type {Vector3D}
     */

    this.position = new Vector3D();
    /**
     * @desc The particle's velocity
     * @type {Vector3D}
     */

    this.velocity = new Vector3D();
    /**
     * @desc The particle's acceleration
     * @type {Vector3D}
     */

    this.acceleration = new Vector3D();
    /**
     * @desc The particle's last position, velocity and acceleration
     * @type {Vector3D}
     */

    this.old = {};
    /**
     * @desc The particle's old position
     * @type {Vector3D}
     */

    this.old.position = this.position.clone();
    /**
     * @desc The particle's old velocity
     * @type {Vector3D}
     */

    this.old.velocity = this.velocity.clone();
    /**
     * @desc The particle's old acceleration
     * @type {Vector3D}
     */

    this.old.acceleration = this.acceleration.clone();
    /**
     * @desc The particle's behaviours array
     * @type {array}
     */

    this.behaviours = [];
    /**
     * @desc The particle's transform collection
     * @type {object}
     */

    this.transform = {};
    /**
     * @desc The particle's color store
     * @type {object}
     */

    this.color = {
      r: 0,
      g: 0,
      b: 0
    };
    /**
     * @desc The particle's rotation
     * @type {number}
     */

    this.rotation = new Vector3D();
    /**
     * @desc The particle's distance to the camera, only set by the GPURenderer for depth sorting purposes.
     * @type {number}
     */

    this.distanceToCamera = 0; // override constructor props with passed properties.

    Util.setPrototypeByObj(this, properties);
  }
  /**
   * Gets the particle's current direction.
   *
   * @return {number}
   */


  getDirection() {
    return Math.atan2(this.velocity.x, -this.velocity.y) * (180 / PI);
  }
  /**
   * Resets the particle's default properties and clear's its particle's position,
   * velocity, acceleration, color and rotation. Also destroy's the particle's
   * transform collection & removes all behaviours.
   *
   * @return {Particle}
   */


  reset() {
    this.life = DEFAULT_LIFE;
    this.age = DEFAULT_AGE;
    this.energy = DEFAULT_ENERGY;
    this.dead = DEFAULT_DEAD;
    this.sleep = DEFAULT_SLEEP;
    this.body = DEFAULT_BODY;
    this.parent = DEFAULT_PARENT;
    this.mass = DEFAULT_MASS;
    this.radius = DEFAULT_RADIUS;
    this.alpha = DEFAULT_ALPHA;
    this.scale = DEFAULT_SCALE;
    this.useColor = DEFAULT_USE_COLOR;
    this.useAlpha = DEFAULT_USE_ALPHA;
    this.easing = DEFAULT_EASING;
    this.position.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.acceleration.set(0, 0, 0);
    this.old.position.set(0, 0, 0);
    this.old.velocity.set(0, 0, 0);
    this.old.acceleration.set(0, 0, 0);
    this.color.r = 0;
    this.color.g = 0;
    this.color.b = 0;
    this.rotation.clear();
    Util.destroyObject(this.transform);
    this.removeAllBehaviours();
    return this;
  }
  /**
   * Updates the particle's properties by applying each behaviour to the particle.
   * Will also update the particle's energy, unless it's age is greater than it's life
   * in which case it will be destroyed.
   *
   * @param {number} time - Integration time
   * @param {integer} index - Particle index
   * @return void
   */


  update(time, index) {
    if (!this.sleep) {
      this.age += time;
      let i = this.behaviours.length;

      while (i--) {
        let behaviour = this.behaviours[i]; //behaviour && 

        behaviour.applyBehaviour(this, time, index);
      }
    }

    if (this.age >= this.life) {
      this.destroy();
    } else {
      const scale = this.easing(this.age / this.life);
      this.energy = Math.max(1 - scale, 0);
    }
  }
  /**
   * Adds a behaviour to the particle.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the particle
   * @return void
   */


  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
    behaviour.initialize(this);
  }
  /**
   * Adds multiple behaviours to the particle.
   *
   * @param {array<Behaviour>} behaviours - An array of behaviours to add to the particle
   * @return void
   */


  addBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addBehaviour(behaviours[i]);
    }
  }
  /**
   * Removes the behaviour from the particle.
   *
   * @param {Behaviour} behaviour - The behaviour to remove from the particle
   * @return void
   */


  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      this.behaviours.splice(index, 1);
    }
  }
  /**
   * Removes all behaviours from the particle.
   *
   * @return void
   */


  removeAllBehaviours() {
    Util.destroyArray(this.behaviours);
  }
  /**
   * Destroys the particle.
   *
   * @return void
   */


  destroy() {
    this.removeAllBehaviours();
    this.energy = 0;
    this.dead = true;
    this.parent = null;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfQUdFIiwiREVGQVVMVF9BTFBIQSIsIkRFRkFVTFRfQk9EWSIsIkRFRkFVTFRfREVBRCIsIkRFRkFVTFRfRUFTSU5HIiwiREVGQVVMVF9FTkVSR1kiLCJERUZBVUxUX0xJRkUiLCJERUZBVUxUX01BU1MiLCJERUZBVUxUX1BBUkVOVCIsIkRFRkFVTFRfUkFESVVTIiwiREVGQVVMVF9TQ0FMRSIsIkRFRkFVTFRfU0xFRVAiLCJERUZBVUxUX1VTRV9BTFBIQSIsIkRFRkFVTFRfVVNFX0NPTE9SIiwiVXRpbCIsInVpZCIsIlBJIiwiVmVjdG9yM0QiLCJDT1JFX1RZUEVfUEFSVElDTEUiLCJ0eXBlIiwiUGFydGljbGUiLCJjb25zdHJ1Y3RvciIsInByb3BlcnRpZXMiLCJpZCIsImxpZmUiLCJhZ2UiLCJlbmVyZ3kiLCJkZWFkIiwic2xlZXAiLCJib2R5IiwicGFyZW50IiwibWFzcyIsInJhZGl1cyIsImFscGhhIiwic2NhbGUiLCJ1c2VDb2xvciIsInVzZUFscGhhIiwiZWFzaW5nIiwicG9zaXRpb24iLCJ2ZWxvY2l0eSIsImFjY2VsZXJhdGlvbiIsIm9sZCIsImNsb25lIiwiYmVoYXZpb3VycyIsInRyYW5zZm9ybSIsImNvbG9yIiwiciIsImciLCJiIiwicm90YXRpb24iLCJkaXN0YW5jZVRvQ2FtZXJhIiwic2V0UHJvdG90eXBlQnlPYmoiLCJnZXREaXJlY3Rpb24iLCJNYXRoIiwiYXRhbjIiLCJ4IiwieSIsInJlc2V0Iiwic2V0IiwiY2xlYXIiLCJkZXN0cm95T2JqZWN0IiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsInVwZGF0ZSIsInRpbWUiLCJpbmRleCIsImkiLCJsZW5ndGgiLCJiZWhhdmlvdXIiLCJhcHBseUJlaGF2aW91ciIsImRlc3Ryb3kiLCJtYXgiLCJhZGRCZWhhdmlvdXIiLCJwdXNoIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhh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VUFBVSxDQUFDc0IsQ0FBRCxDQUE1QjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFVSxFQUFBQSxlQUFlLENBQUNSLFNBQUQsRUFBWTtBQUN6QixVQUFNSCxLQUFLLEdBQUcsS0FBS3JCLFVBQUwsQ0FBZ0JpQyxPQUFoQixDQUF3QlQsU0FBeEIsQ0FBZDs7QUFFQSxRQUFJSCxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCO0FBQ2QsV0FBS3JCLFVBQUwsQ0FBZ0JrQyxNQUFoQixDQUF1QmIsS0FBdkIsRUFBOEIsQ0FBOUI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VILEVBQUFBLG1CQUFtQixHQUFHO0FBQ3BCL0MsSUFBQUEsSUFBSSxDQUFDZ0UsWUFBTCxDQUFrQixLQUFLbkMsVUFBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFMEIsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsU0FBS1IsbUJBQUw7QUFDQSxTQUFLbkMsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtHLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7O0FBeFQyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgREVGQVVMVF9BR0UsXHJcbiAgREVGQVVMVF9BTFBIQSxcclxuICBERUZBVUxUX0JPRFksXHJcbiAgREVGQVVMVF9ERUFELFxyXG4gIERFRkFVTFRfRUFTSU5HLFxyXG4gIERFRkFVTFRfRU5FUkdZLFxyXG4gIERFRkFVTFRfTElGRSxcclxuICBERUZBVUxUX01BU1MsXHJcbiAgREVGQVVMVF9QQVJFTlQsXHJcbiAgREVGQVVMVF9SQURJVVMsXHJcbiAgREVGQVVMVF9TQ0FMRSxcclxuICBERUZBVUxUX1NMRUVQLFxyXG4gIERFRkFVTFRfVVNFX0FMUEhBLFxyXG4gIERFRkFVTFRfVVNFX0NPTE9SLFxyXG59IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgVXRpbCwgdWlkIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgUEkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBWZWN0b3IzRCB9IGZyb20gJy4uL21hdGgnO1xyXG5pbXBvcnQgeyBDT1JFX1RZUEVfUEFSVElDTEUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEEgUGFydGljbGUgaXMgYW4gb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCBieSBhbiBlbWl0dGVyLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBQYXJ0aWNsZSBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIC0gVGhlIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgdGhlIHBhcnRpY2xlIHdpdGhcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5saWZlIC0gVGhlIHBhcnRpY2xlJ3MgbGlmZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLmFnZSAtIFRoZSBwYXJ0aWNsZSdzIGFnZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLmVuZXJneSAtIFRoZSBwYXJ0aWNsZSdzIGVuZXJneSBsb3NzXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBwcm9wZXJ0aWVzLmRlYWQgLSBEZXRlcm1pbmVzIGlmIHRoZSBwYXJ0aWNsZSBpcyBkZWFkIG9yIG5vdFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvcGVydGllcy5zbGVlcCAtIERldGVybWluZXMgaWYgdGhlIHBhcnRpY2xlIGlzIHNsZWVwaW5nIG9yIG5vdFxyXG4gICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBwcm9wZXJ0aWVzLnRhcmdldCAtIFRoZSBwYXJ0aWNsZSdzIHRhcmdldFxyXG4gICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBwcm9wZXJ0aWVzLmJvZHkgLSBUaGUgcGFydGljbGUncyBib2R5XHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMubWFzcyAtIFRoZSBwYXJ0aWNsZSdzIG1hc3NcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5yYWRpdXMgLSBUaGUgcGFydGljbGUncyByYWRpdXNcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5hbHBoYSAtIFRoZSBwYXJ0aWNsZSdzIGFscGhhXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMuc2NhbGUgLSBUaGUgcGFydGljbGUncyBzY2FsZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLnJvdGF0aW9uIC0gVGhlIHBhcnRpY2xlJ3Mgcm90YXRpb25cclxuICAgKiBAcHJvcGVydHkge3N0cmluZ3xudW1iZXJ9IHByb3BlcnRpZXMuY29sb3IgLSBUaGUgcGFydGljbGUncyBjb2xvclxyXG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHByb3BlcnRpZXMuZWFzaW5nIC0gVGhlIHBhcnRpY2xlJ3MgZWFzaW5nXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3IzRH0gcHJvcGVydGllcy5wb3NpdGlvbiAtIFRoZSBwYXJ0aWNsZSdzIHBvc2l0aW9uXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3IzRH0gcHJvcGVydGllcy52ZWxvY2l0eSAtIFRoZSBwYXJ0aWNsZSdzIHZlbG9jaXR5XHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3IzRH0gcHJvcGVydGllcy5hY2NlbGVyYXRpb24gLSBUaGUgcGFydGljbGUncyBhY2NlbGVyYXRpb25cclxuICAgKiBAcHJvcGVydHkge2FycmF5fSBwcm9wZXJ0aWVzLmJlaGF2aW91cnMgLSBUaGUgcGFydGljbGUncyBiZWhhdmlvdXJzIGFycmF5XHJcbiAgICogQHByb3BlcnR5IHtvYmplY3R9IHByb3BlcnRpZXMudHJhbnNmb3JtIC0gVGhlIHBhcnRpY2xlJ3MgdHJhbnNmb3JtIGNvbGxlY3Rpb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHVuaXF1ZSBpZFxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pZCA9IGBwYXJ0aWNsZS0ke3VpZCgpfWA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGxpZmVcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubGlmZSA9IERFRkFVTFRfTElGRTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgYWdlXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFnZSA9IERFRkFVTFRfQUdFO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBlbmVyZ3kgbG9zc1xyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5lbmVyZ3kgPSBERUZBVUxUX0VORVJHWTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgcGFydGljbGUgaXMgZGVhZCBvciBub3RcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGVhZCA9IERFRkFVTFRfREVBRDtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgcGFydGljbGUgaXMgc2xlZXBpbmcgb3Igbm90XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsZWVwID0gREVGQVVMVF9TTEVFUDtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgYm9keVxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5ib2R5ID0gREVGQVVMVF9CT0RZO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBwYXJlbnRcclxuICAgICAqIEB0eXBlIHs/RW1pdHRlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wYXJlbnQgPSBERUZBVUxUX1BBUkVOVDtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgbWFzc1xyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXNzID0gREVGQVVMVF9NQVNTO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyByYWRpdXNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmFkaXVzID0gREVGQVVMVF9SQURJVVM7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGFscGhhXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFscGhhID0gREVGQVVMVF9BTFBIQTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3Mgc2NhbGVcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2NhbGUgPSBERUZBVUxUX1NDQUxFO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIGNvbG9yIG9yIG5vdFxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMudXNlQ29sb3IgPSBERUZBVUxUX1VTRV9DT0xPUjtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSBhbHBoYSBvciBub3RcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnVzZUFscGhhID0gREVGQVVMVF9VU0VfQUxQSEE7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGVhc2luZ1xyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5lYXNpbmcgPSBERUZBVUxUX0VBU0lORztcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgcG9zaXRpb25cclxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyB2ZWxvY2l0eVxyXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcjNEKCk7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGFjY2VsZXJhdGlvblxyXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBsYXN0IHBvc2l0aW9uLCB2ZWxvY2l0eSBhbmQgYWNjZWxlcmF0aW9uXHJcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMub2xkID0ge307XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIG9sZCBwb3NpdGlvblxyXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm9sZC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3Mgb2xkIHZlbG9jaXR5XHJcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMub2xkLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5jbG9uZSgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBvbGQgYWNjZWxlcmF0aW9uXHJcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMub2xkLmFjY2VsZXJhdGlvbiA9IHRoaXMuYWNjZWxlcmF0aW9uLmNsb25lKCk7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGJlaGF2aW91cnMgYXJyYXlcclxuICAgICAqIEB0eXBlIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHRyYW5zZm9ybSBjb2xsZWN0aW9uXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBjb2xvciBzdG9yZVxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb2xvciA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyByb3RhdGlvblxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgZGlzdGFuY2UgdG8gdGhlIGNhbWVyYSwgb25seSBzZXQgYnkgdGhlIEdQVVJlbmRlcmVyIGZvciBkZXB0aCBzb3J0aW5nIHB1cnBvc2VzLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kaXN0YW5jZVRvQ2FtZXJhID0gMDtcclxuXHJcbiAgICAvLyBvdmVycmlkZSBjb25zdHJ1Y3RvciBwcm9wcyB3aXRoIHBhc3NlZCBwcm9wZXJ0aWVzLlxyXG4gICAgVXRpbC5zZXRQcm90b3R5cGVCeU9iaih0aGlzLCBwcm9wZXJ0aWVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHBhcnRpY2xlJ3MgY3VycmVudCBkaXJlY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0RGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52ZWxvY2l0eS54LCAtdGhpcy52ZWxvY2l0eS55KSAqICgxODAgLyBQSSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgdGhlIHBhcnRpY2xlJ3MgZGVmYXVsdCBwcm9wZXJ0aWVzIGFuZCBjbGVhcidzIGl0cyBwYXJ0aWNsZSdzIHBvc2l0aW9uLFxyXG4gICAqIHZlbG9jaXR5LCBhY2NlbGVyYXRpb24sIGNvbG9yIGFuZCByb3RhdGlvbi4gQWxzbyBkZXN0cm95J3MgdGhlIHBhcnRpY2xlJ3NcclxuICAgKiB0cmFuc2Zvcm0gY29sbGVjdGlvbiAmIHJlbW92ZXMgYWxsIGJlaGF2aW91cnMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQYXJ0aWNsZX1cclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMubGlmZSA9IERFRkFVTFRfTElGRTtcclxuICAgIHRoaXMuYWdlID0gREVGQVVMVF9BR0U7XHJcbiAgICB0aGlzLmVuZXJneSA9IERFRkFVTFRfRU5FUkdZO1xyXG4gICAgdGhpcy5kZWFkID0gREVGQVVMVF9ERUFEO1xyXG4gICAgdGhpcy5zbGVlcCA9IERFRkFVTFRfU0xFRVA7XHJcbiAgICB0aGlzLmJvZHkgPSBERUZBVUxUX0JPRFk7XHJcbiAgICB0aGlzLnBhcmVudCA9IERFRkFVTFRfUEFSRU5UO1xyXG4gICAgdGhpcy5tYXNzID0gREVGQVVMVF9NQVNTO1xyXG4gICAgdGhpcy5yYWRpdXMgPSBERUZBVUxUX1JBRElVUztcclxuICAgIHRoaXMuYWxwaGEgPSBERUZBVUxUX0FMUEhBO1xyXG4gICAgdGhpcy5zY2FsZSA9IERFRkFVTFRfU0NBTEU7XHJcbiAgICB0aGlzLnVzZUNvbG9yID0gREVGQVVMVF9VU0VfQ09MT1I7XHJcbiAgICB0aGlzLnVzZUFscGhhID0gREVGQVVMVF9VU0VfQUxQSEE7XHJcbiAgICB0aGlzLmVhc2luZyA9IERFRkFVTFRfRUFTSU5HO1xyXG4gICAgdGhpcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICB0aGlzLnZlbG9jaXR5LnNldCgwLCAwLCAwKTtcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgIHRoaXMub2xkLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgIHRoaXMub2xkLnZlbG9jaXR5LnNldCgwLCAwLCAwKTtcclxuICAgIHRoaXMub2xkLmFjY2VsZXJhdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICB0aGlzLmNvbG9yLnIgPSAwO1xyXG4gICAgdGhpcy5jb2xvci5nID0gMDtcclxuICAgIHRoaXMuY29sb3IuYiA9IDA7XHJcblxyXG4gICAgdGhpcy5yb3RhdGlvbi5jbGVhcigpO1xyXG4gICAgVXRpbC5kZXN0cm95T2JqZWN0KHRoaXMudHJhbnNmb3JtKTtcclxuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgcGFydGljbGUncyBwcm9wZXJ0aWVzIGJ5IGFwcGx5aW5nIGVhY2ggYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cclxuICAgKiBXaWxsIGFsc28gdXBkYXRlIHRoZSBwYXJ0aWNsZSdzIGVuZXJneSwgdW5sZXNzIGl0J3MgYWdlIGlzIGdyZWF0ZXIgdGhhbiBpdCdzIGxpZmVcclxuICAgKiBpbiB3aGljaCBjYXNlIGl0IHdpbGwgYmUgZGVzdHJveWVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBJbnRlZ3JhdGlvbiB0aW1lXHJcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIFBhcnRpY2xlIGluZGV4XHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcclxuICAgICAgdGhpcy5hZ2UgKz0gdGltZTtcclxuXHJcbiAgICAgIGxldCBpID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcclxuXHJcbiAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICBsZXQgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzW2ldO1xyXG5cclxuICAgICAgICAvL2JlaGF2aW91ciAmJiBcclxuICAgICAgICBiZWhhdmlvdXIuYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYWdlID49IHRoaXMubGlmZSkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcodGhpcy5hZ2UgLyB0aGlzLmxpZmUpO1xyXG5cclxuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byBhZGQgdG8gdGhlIHBhcnRpY2xlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgYWRkQmVoYXZpb3VyKGJlaGF2aW91cikge1xyXG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcclxuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBtdWx0aXBsZSBiZWhhdmlvdXJzIHRvIHRoZSBwYXJ0aWNsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7YXJyYXk8QmVoYXZpb3VyPn0gYmVoYXZpb3VycyAtIEFuIGFycmF5IG9mIGJlaGF2aW91cnMgdG8gYWRkIHRvIHRoZSBwYXJ0aWNsZVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xyXG4gICAgbGV0IGkgPSBiZWhhdmlvdXJzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIHBhcnRpY2xlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gcmVtb3ZlIGZyb20gdGhlIHBhcnRpY2xlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xyXG5cclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBwYXJ0aWNsZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XHJcbiAgICBVdGlsLmRlc3Ryb3lBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveXMgdGhlIHBhcnRpY2xlLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xyXG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xyXG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB9XHJcbn1cclxuIl19