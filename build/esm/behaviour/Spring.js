import Behaviour from './Behaviour';
import { Vector3D } from '../math';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_SPRING as type } from './types';
/**
 * Behaviour that causes particles to spring.
 *
 */

export default class Spring extends Behaviour {
  /**
   * Constructs a Spring behaviour instance.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(x, y, z, spring, friction, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(x, y, z, spring, friction);
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @return void
   */


  reset(x, y, z, spring, friction) {
    if (!this.pos) {
      this.pos = new Vector3D(x, y, z);
    } else {
      this.pos.set(x, y, z);
    }

    this.spring = spring || 0.1;
    this.friction = friction || 0.98;
  }
  /**
   * Applies the behaviour to the particle.
   * Mutates the particle's velocity according to this.pos and this.spring.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.velocity.x += (this.pos.x - particle.position.x) * this.spring;
    particle.velocity.y += (this.pos.y - particle.position.y) * this.spring;
    particle.velocity.z += (this.pos.z - particle.position.z) * this.spring;
  }
  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Spring}
   */


  static fromJSON(json) {
    const {
      x,
      y,
      z,
      spring,
      friction,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Spring(x, y, z, spring, friction, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvU3ByaW5nLmpzIl0sIm5hbWVzIjpbIkJlaGF2aW91ciIsIlZlY3RvcjNEIiwiZ2V0RWFzaW5nQnlOYW1lIiwiQkVIQVZJT1VSX1RZUEVfU1BSSU5HIiwidHlwZSIsIlNwcmluZyIsImNvbnN0cnVjdG9yIiwieCIsInkiLCJ6Iiwic3ByaW5nIiwiZnJpY3Rpb24iLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJwb3MiLCJzZXQiLCJtdXRhdGUiLCJwYXJ0aWNsZSIsInRpbWUiLCJpbmRleCIsImVuZXJnaXplIiwidmVsb2NpdHkiLCJwb3NpdGlvbiIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsU0FBUCxNQUFzQixhQUF0QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsU0FBekI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0MscUJBQXFCLElBQUlDLElBQWxDLFFBQThDLFNBQTlDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxNQUFOLFNBQXFCTCxTQUFyQixDQUErQjtBQUM1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFTSxFQUFBQSxXQUFXLENBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQLEVBQVVDLE1BQVYsRUFBa0JDLFFBQWxCLEVBQTRCQyxJQUE1QixFQUFrQ0MsTUFBbEMsRUFBMENDLFNBQVMsR0FBRyxJQUF0RCxFQUE0RDtBQUNyRSxVQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JULElBQXBCLEVBQTBCVSxTQUExQjtBQUVBLFNBQUtDLEtBQUwsQ0FBV1IsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsTUFBcEIsRUFBNEJDLFFBQTVCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VJLEVBQUFBLEtBQUssQ0FBQ1IsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEI7QUFDL0IsUUFBSSxDQUFDLEtBQUtLLEdBQVYsRUFBZTtBQUNiLFdBQUtBLEdBQUwsR0FBVyxJQUFJZixRQUFKLENBQWFNLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixDQUFYO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS08sR0FBTCxDQUFTQyxHQUFULENBQWFWLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQjtBQUNEOztBQUVELFNBQUtDLE1BQUwsR0FBY0EsTUFBTSxJQUFJLEdBQXhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBUSxJQUFJLElBQTVCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFTyxFQUFBQSxNQUFNLENBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBd0I7QUFDNUIsU0FBS0MsUUFBTCxDQUFjSCxRQUFkLEVBQXdCQyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQUYsSUFBQUEsUUFBUSxDQUFDSSxRQUFULENBQWtCaEIsQ0FBbEIsSUFBdUIsQ0FBQyxLQUFLUyxHQUFMLENBQVNULENBQVQsR0FBYVksUUFBUSxDQUFDSyxRQUFULENBQWtCakIsQ0FBaEMsSUFBcUMsS0FBS0csTUFBakU7QUFDQVMsSUFBQUEsUUFBUSxDQUFDSSxRQUFULENBQWtCZixDQUFsQixJQUF1QixDQUFDLEtBQUtRLEdBQUwsQ0FBU1IsQ0FBVCxHQUFhVyxRQUFRLENBQUNLLFFBQVQsQ0FBa0JoQixDQUFoQyxJQUFxQyxLQUFLRSxNQUFqRTtBQUNBUyxJQUFBQSxRQUFRLENBQUNJLFFBQVQsQ0FBa0JkLENBQWxCLElBQXVCLENBQUMsS0FBS08sR0FBTCxDQUFTUCxDQUFULEdBQWFVLFFBQVEsQ0FBQ0ssUUFBVCxDQUFrQmYsQ0FBaEMsSUFBcUMsS0FBS0MsTUFBakU7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJlLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRW5CLE1BQUFBLENBQUY7QUFBS0MsTUFBQUEsQ0FBTDtBQUFRQyxNQUFBQSxDQUFSO0FBQVdDLE1BQUFBLE1BQVg7QUFBbUJDLE1BQUFBLFFBQW5CO0FBQTZCQyxNQUFBQSxJQUE3QjtBQUFtQ0MsTUFBQUEsTUFBbkM7QUFBMkNDLE1BQUFBLFNBQVMsR0FBRztBQUF2RCxRQUFnRVksSUFBdEU7QUFFQSxXQUFPLElBQUlyQixNQUFKLENBQ0xFLENBREssRUFFTEMsQ0FGSyxFQUdMQyxDQUhLLEVBSUxDLE1BSkssRUFLTEMsUUFMSyxFQU1MQyxJQU5LLEVBT0xWLGVBQWUsQ0FBQ1csTUFBRCxDQVBWLEVBUUxDLFNBUkssQ0FBUDtBQVVEOztBQTdFMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmVoYXZpb3VyIGZyb20gJy4vQmVoYXZpb3VyJztcclxuaW1wb3J0IHsgVmVjdG9yM0QgfSBmcm9tICcuLi9tYXRoJztcclxuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XHJcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1NQUklORyBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQmVoYXZpb3VyIHRoYXQgY2F1c2VzIHBhcnRpY2xlcyB0byBzcHJpbmcuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpbmcgZXh0ZW5kcyBCZWhhdmlvdXIge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBTcHJpbmcgYmVoYXZpb3VyIGluc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGF4aXMgc3ByaW5nXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGF4aXMgc3ByaW5nXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHogLSBaIGF4aXMgc3ByaW5nXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNwcmluZyAtIFNwcmluZyBmYWN0b3JcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZnJpY3Rpb24gLSBTcHJpbmcgZnJpY3Rpb25cclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgZWFzaW5nIGVxdWF0aW9uIHRvIHVzZSBmb3IgdHJhbnNmb3Jtc1xyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoeCwgeSwgeiwgc3ByaW5nLCBmcmljdGlvbiwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XHJcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XHJcblxyXG4gICAgdGhpcy5yZXNldCh4LCB5LCB6LCBzcHJpbmcsIGZyaWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFggYXhpcyBzcHJpbmdcclxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyBzcHJpbmdcclxuICAgKiBAcGFyYW0ge251bWJlcn0geiAtIFogYXhpcyBzcHJpbmdcclxuICAgKiBAcGFyYW0ge251bWJlcn0gc3ByaW5nIC0gU3ByaW5nIGZhY3RvclxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmcmljdGlvbiAtIFNwcmluZyBmcmljdGlvblxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIHJlc2V0KHgsIHksIHosIHNwcmluZywgZnJpY3Rpb24pIHtcclxuICAgIGlmICghdGhpcy5wb3MpIHtcclxuICAgICAgdGhpcy5wb3MgPSBuZXcgVmVjdG9yM0QoeCwgeSwgeik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBvcy5zZXQoeCwgeSwgeik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zcHJpbmcgPSBzcHJpbmcgfHwgMC4xO1xyXG4gICAgdGhpcy5mcmljdGlvbiA9IGZyaWN0aW9uIHx8IDAuOTg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBsaWVzIHRoZSBiZWhhdmlvdXIgdG8gdGhlIHBhcnRpY2xlLlxyXG4gICAqIE11dGF0ZXMgdGhlIHBhcnRpY2xlJ3MgdmVsb2NpdHkgYWNjb3JkaW5nIHRvIHRoaXMucG9zIGFuZCB0aGlzLnNwcmluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBlbmdpbmUgdGltZVxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XHJcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XHJcblxyXG4gICAgcGFydGljbGUudmVsb2NpdHkueCArPSAodGhpcy5wb3MueCAtIHBhcnRpY2xlLnBvc2l0aW9uLngpICogdGhpcy5zcHJpbmc7XHJcbiAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ICs9ICh0aGlzLnBvcy55IC0gcGFydGljbGUucG9zaXRpb24ueSkgKiB0aGlzLnNwcmluZztcclxuICAgIHBhcnRpY2xlLnZlbG9jaXR5LnogKz0gKHRoaXMucG9zLnogLSBwYXJ0aWNsZS5wb3NpdGlvbi56KSAqIHRoaXMuc3ByaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIEpTT04gb2JqZWN0IHBhc3NlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gSlNPTiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVxdWlyZWQgY29uc3RydWN0b3IgcHJvcGVydGllc1xyXG4gICAqIEByZXR1cm4ge1NwcmluZ31cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyB4LCB5LCB6LCBzcHJpbmcsIGZyaWN0aW9uLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBTcHJpbmcoXHJcbiAgICAgIHgsXHJcbiAgICAgIHksXHJcbiAgICAgIHosXHJcbiAgICAgIHNwcmluZyxcclxuICAgICAgZnJpY3Rpb24sXHJcbiAgICAgIGxpZmUsXHJcbiAgICAgIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLFxyXG4gICAgICBpc0VuYWJsZWRcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==