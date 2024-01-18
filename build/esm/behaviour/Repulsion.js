import Attraction from './Attraction';
import { Vector3D } from '../math';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_REPULSION as type } from './types';
/**
 * Behaviour that causes particles to be repelled from a target position.
 *
 */

export default class Repulsion extends Attraction {
  /**
   * Constructs an Repulsion behaviour instance.
   *
   * @param {Vector3D} targetPosition - The position the particles will be repelled from
   * @param {number} force - The repulsion force scalar multiplier
   * @param {number} radius - The repulsion radius
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  constructor(targetPosition, force, radius, life, easing, isEnabled = true) {
    super(targetPosition, force, radius, life, easing, isEnabled);
    /**
     * @desc Repulsion is attraction with negative force.
     * @type {number}
     */

    this.force *= -1;
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Vector3D} targetPosition - the position the particles will be attracted to
   * @param {number} force - the attraction force multiplier
   * @param {number} radius - the attraction radius
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */


  reset(targetPosition, force, radius, life, easing) {
    super.reset(targetPosition, force, radius, life, easing);
    this.force *= -1;
  }
  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.x - The target position x value
   * @property {number} json.y - The target position y value
   * @property {number} json.z - The target position z value
   * @property {number} json.force - The attraction force scalar multiplier
   * @property {number} json.life - The life of the particle
   * @property {string} json.easing - The behaviour's decaying trend
   * @return {Body}
   */


  static fromJSON(json) {
    const {
      x,
      y,
      z,
      force,
      radius,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Repulsion(new Vector3D(x, y, z), force, radius, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUmVwdWxzaW9uLmpzIl0sIm5hbWVzIjpbIkF0dHJhY3Rpb24iLCJWZWN0b3IzRCIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX1JFUFVMU0lPTiIsInR5cGUiLCJSZXB1bHNpb24iLCJjb25zdHJ1Y3RvciIsInRhcmdldFBvc2l0aW9uIiwiZm9yY2UiLCJyYWRpdXMiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJmcm9tSlNPTiIsImpzb24iLCJ4IiwieSIsInoiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFVBQVAsTUFBdUIsY0FBdkI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFNBQXpCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxTQUFoQztBQUNBLFNBQVNDLHdCQUF3QixJQUFJQyxJQUFyQyxRQUFpRCxTQUFqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkwsVUFBeEIsQ0FBbUM7QUFDaEQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRU0sRUFBQUEsV0FBVyxDQUFDQyxjQUFELEVBQWlCQyxLQUFqQixFQUF3QkMsTUFBeEIsRUFBZ0NDLElBQWhDLEVBQXNDQyxNQUF0QyxFQUE4Q0MsU0FBUyxHQUFHLElBQTFELEVBQWdFO0FBQ3pFLFVBQU1MLGNBQU4sRUFBc0JDLEtBQXRCLEVBQTZCQyxNQUE3QixFQUFxQ0MsSUFBckMsRUFBMkNDLE1BQTNDLEVBQW1EQyxTQUFuRDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtKLEtBQUwsSUFBYyxDQUFDLENBQWY7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRVMsRUFBQUEsS0FBSyxDQUFDTixjQUFELEVBQWlCQyxLQUFqQixFQUF3QkMsTUFBeEIsRUFBZ0NDLElBQWhDLEVBQXNDQyxNQUF0QyxFQUE4QztBQUNqRCxVQUFNRSxLQUFOLENBQVlOLGNBQVosRUFBNEJDLEtBQTVCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsSUFBM0MsRUFBaURDLE1BQWpEO0FBQ0EsU0FBS0gsS0FBTCxJQUFjLENBQUMsQ0FBZjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUk0sUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFQyxNQUFBQSxDQUFGO0FBQUtDLE1BQUFBLENBQUw7QUFBUUMsTUFBQUEsQ0FBUjtBQUFXVixNQUFBQSxLQUFYO0FBQWtCQyxNQUFBQSxNQUFsQjtBQUEwQkMsTUFBQUEsSUFBMUI7QUFBZ0NDLE1BQUFBLE1BQWhDO0FBQXdDQyxNQUFBQSxTQUFTLEdBQUc7QUFBcEQsUUFBNkRHLElBQW5FO0FBRUEsV0FBTyxJQUFJVixTQUFKLENBQ0wsSUFBSUosUUFBSixDQUFhZSxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsQ0FESyxFQUVMVixLQUZLLEVBR0xDLE1BSEssRUFJTEMsSUFKSyxFQUtMUixlQUFlLENBQUNTLE1BQUQsQ0FMVixFQU1MQyxTQU5LLENBQVA7QUFRRDs7QUFqRStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSAnLi9BdHRyYWN0aW9uJztcclxuaW1wb3J0IHsgVmVjdG9yM0QgfSBmcm9tICcuLi9tYXRoJztcclxuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XHJcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1JFUFVMU0lPTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcbi8qKlxyXG4gKiBCZWhhdmlvdXIgdGhhdCBjYXVzZXMgcGFydGljbGVzIHRvIGJlIHJlcGVsbGVkIGZyb20gYSB0YXJnZXQgcG9zaXRpb24uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1bHNpb24gZXh0ZW5kcyBBdHRyYWN0aW9uIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIFJlcHVsc2lvbiBiZWhhdmlvdXIgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiB0aGUgcGFydGljbGVzIHdpbGwgYmUgcmVwZWxsZWQgZnJvbVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmb3JjZSAtIFRoZSByZXB1bHNpb24gZm9yY2Ugc2NhbGFyIG11bHRpcGxpZXJcclxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzIC0gVGhlIHJlcHVsc2lvbiByYWRpdXNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBSZXB1bHNpb24gaXMgYXR0cmFjdGlvbiB3aXRoIG5lZ2F0aXZlIGZvcmNlLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB0YXJnZXRQb3NpdGlvbiAtIHRoZSBwb3NpdGlvbiB0aGUgcGFydGljbGVzIHdpbGwgYmUgYXR0cmFjdGVkIHRvXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZvcmNlIC0gdGhlIGF0dHJhY3Rpb24gZm9yY2UgbXVsdGlwbGllclxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXMgLSB0aGUgYXR0cmFjdGlvbiByYWRpdXNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIHRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcclxuICAgIHN1cGVyLnJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xyXG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBCb2R5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnggLSBUaGUgdGFyZ2V0IHBvc2l0aW9uIHggdmFsdWVcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi55IC0gVGhlIHRhcmdldCBwb3NpdGlvbiB5IHZhbHVlXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ueiAtIFRoZSB0YXJnZXQgcG9zaXRpb24geiB2YWx1ZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmZvcmNlIC0gVGhlIGF0dHJhY3Rpb24gZm9yY2Ugc2NhbGFyIG11bHRpcGxpZXJcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5saWZlIC0gVGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGpzb24uZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXHJcbiAgICogQHJldHVybiB7Qm9keX1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyB4LCB5LCB6LCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBSZXB1bHNpb24oXHJcbiAgICAgIG5ldyBWZWN0b3IzRCh4LCB5LCB6KSxcclxuICAgICAgZm9yY2UsXHJcbiAgICAgIHJhZGl1cyxcclxuICAgICAgbGlmZSxcclxuICAgICAgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksXHJcbiAgICAgIGlzRW5hYmxlZFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19