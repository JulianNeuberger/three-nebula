import { DR, PI } from '../constants';
import { MathUtils, Vector3D, createSpan } from '../math';
import Behaviour from './Behaviour';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_ROTATE as type } from './types';
/**
 * Behaviour that rotates particles.
 */

export default class Rotate extends Behaviour {
  /**
   * Constructs a Rotate behaviour instance.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(x, y, z, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(x, y, z);
  }
  /**
   * Gets the rotation type.
   *
   * @return {string}
   */


  get rotationType() {
    return this._rotationType;
  }
  /**
   * Sets the rotation type.
   *
   * @param {string}
   * @return void
   */


  set rotationType(rotationType) {
    /**
     * @desc The rotation type. ENUM of ['same', 'set', 'to', 'add'].
     * @type {string}
     */
    this._rotationType = rotationType;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */


  reset(x, y, z, life, easing) {
    /**
     * @desc X axis rotation.
     * @type {number|Span}
     */
    this.x = x || 0;
    /**
     * @desc Y axis rotation.
     * @type {number|Span}
     */

    this.y = y || 0;
    /**
     * @desc Z axis rotation.
     * @type {number|Span}
     */

    this.z = z || 0;

    if (x === undefined || x == 'same') {
      this.rotationType = 'same';
    } else if (y == undefined) {
      this.rotationType = 'set';
    } else if (z === undefined) {
      this.rotationType = 'to';
    } else {
      this.rotationType = 'add';
      this.x = createSpan(this.x * DR);
      this.y = createSpan(this.y * DR);
      this.z = createSpan(this.z * DR);
    }

    life && super.reset(life, easing);
  }
  /**
   * Initializes the behaviour on a particle.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */


  initialize(particle) {
    switch (this.rotationType) {
      case 'same':
        break;

      case 'set':
        this._setRotation(particle.rotation, this.x);

        break;

      case 'to':
        particle.transform.fR = particle.transform.fR || new Vector3D();
        particle.transform.tR = particle.transform.tR || new Vector3D();

        this._setRotation(particle.transform.fR, this.x);

        this._setRotation(particle.transform.tR, this.y);

        break;

      case 'add':
        particle.transform.addR = new Vector3D(this.x.getValue(), this.y.getValue(), this.z.getValue());
        break;
    }
  }
  /**
   * Sets the particle's rotation prior to the behaviour being applied.
   *
   * NOTE It's hard to see here, but this is mutating the particle's rotation
   * even though the particle is not being passed in directly.
   *
   * NOTE the else if below will never be reached because the value being passed in
   * will never be of type Vector3D.
   *
   * @param {Vector3D} particleRotation - the particle's rotation vector
   * @param {string|number} value - the value to set the rotation value to, if 'random'
   * rotation is randomised
   * @return void
   */


  _setRotation(particleRotation, value) {
    particleRotation = particleRotation || new Vector3D();

    if (value == 'random') {
      var x = MathUtils.randomAToB(-PI, PI);
      var y = MathUtils.randomAToB(-PI, PI);
      var z = MathUtils.randomAToB(-PI, PI);
      particleRotation.set(x, y, z);
    } // we can't ever get here because value will never be a Vector3D!
    // consider refactoring to
    //  if (value instance of Span) { vec3.add(value.getValue()); }
    else if (value instanceof Vector3D) {
      particleRotation.copy(value);
    }
  }
  /**
   * Mutates the particle.rotation property.
   *
   * @see http://stackoverflow.com/questions/21622956/how-to-convert-direction-vector-to-euler-angles
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);

    switch (this.rotationType) {
      // orients the particle in the direction it is moving
      case 'same':
        if (!particle.rotation) {
          particle.rotation = new Vector3D();
        }

        particle.rotation.copy(particle.velocity);
        break;

      case 'set':
        //
        break;

      case 'to':
        particle.rotation.x = MathUtils.lerp(particle.transform.fR.x, particle.transform.tR.x, this.energy);
        particle.rotation.y = MathUtils.lerp(particle.transform.fR.y, particle.transform.tR.y, this.energy);
        particle.rotation.z = MathUtils.lerp(particle.transform.fR.z, particle.transform.tR.z, this.energy);
        break;

      case 'add':
        particle.rotation.add(particle.transform.addR);
        break;
    }
  }

  static fromJSON(json) {
    const {
      x,
      y,
      z,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Rotate(x, y, z, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUm90YXRlLmpzIl0sIm5hbWVzIjpbIkRSIiwiUEkiLCJNYXRoVXRpbHMiLCJWZWN0b3IzRCIsImNyZWF0ZVNwYW4iLCJCZWhhdmlvdXIiLCJnZXRFYXNpbmdCeU5hbWUiLCJCRUhBVklPVVJfVFlQRV9ST1RBVEUiLCJ0eXBlIiwiUm90YXRlIiwiY29uc3RydWN0b3IiLCJ4IiwieSIsInoiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJyb3RhdGlvblR5cGUiLCJfcm90YXRpb25UeXBlIiwidW5kZWZpbmVkIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiX3NldFJvdGF0aW9uIiwicm90YXRpb24iLCJ0cmFuc2Zvcm0iLCJmUiIsInRSIiwiYWRkUiIsImdldFZhbHVlIiwicGFydGljbGVSb3RhdGlvbiIsInZhbHVlIiwicmFuZG9tQVRvQiIsInNldCIsImNvcHkiLCJtdXRhdGUiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsInZlbG9jaXR5IiwibGVycCIsImVuZXJneSIsImFkZCIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsRUFBVCxFQUFhQyxFQUFiLFFBQXVCLGNBQXZCO0FBQ0EsU0FBU0MsU0FBVCxFQUFvQkMsUUFBcEIsRUFBOEJDLFVBQTlCLFFBQWdELFNBQWhEO0FBRUEsT0FBT0MsU0FBUCxNQUFzQixhQUF0QjtBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsU0FBaEM7QUFDQSxTQUFTQyxxQkFBcUIsSUFBSUMsSUFBbEMsUUFBOEMsU0FBOUM7QUFFQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxNQUFOLFNBQXFCSixTQUFyQixDQUErQjtBQUM1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VLLEVBQUFBLFdBQVcsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVUMsSUFBVixFQUFn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QmtCLEdBQWxCLENBQXNCcEIsUUFBUSxDQUFDRyxTQUFULENBQW1CRyxJQUF6QztBQUNBO0FBbENKO0FBb0NEOztBQUVjLFNBQVJlLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRWpDLE1BQUFBLENBQUY7QUFBS0MsTUFBQUEsQ0FBTDtBQUFRQyxNQUFBQSxDQUFSO0FBQVdDLE1BQUFBLElBQVg7QUFBaUJDLE1BQUFBLE1BQWpCO0FBQXlCQyxNQUFBQSxTQUFTLEdBQUc7QUFBckMsUUFBOEM0QixJQUFwRDtBQUVBLFdBQU8sSUFBSW5DLE1BQUosQ0FBV0UsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsSUFBcEIsRUFBMEJSLGVBQWUsQ0FBQ1MsTUFBRCxDQUF6QyxFQUFtREMsU0FBbkQsQ0FBUDtBQUNEOztBQTNNMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEUiwgUEkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNYXRoVXRpbHMsIFZlY3RvcjNELCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XHJcblxyXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gJy4vQmVoYXZpb3VyJztcclxuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XHJcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1JPVEFURSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQmVoYXZpb3VyIHRoYXQgcm90YXRlcyBwYXJ0aWNsZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBSb3RhdGUgYmVoYXZpb3VyIGluc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGF4aXMgcm90YXRpb25cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyByb3RhdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0gWiBheGlzIHJvdGF0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHosIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xyXG4gICAgc3VwZXIobGlmZSwgZWFzaW5nLCB0eXBlLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIHRoaXMucmVzZXQoeCwgeSwgeik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSByb3RhdGlvbiB0eXBlLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCByb3RhdGlvblR5cGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm90YXRpb25UeXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgcm90YXRpb24gdHlwZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIHNldCByb3RhdGlvblR5cGUocm90YXRpb25UeXBlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSByb3RhdGlvbiB0eXBlLiBFTlVNIG9mIFsnc2FtZScsICdzZXQnLCAndG8nLCAnYWRkJ10uXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9yb3RhdGlvblR5cGUgPSByb3RhdGlvblR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGF4aXMgcm90YXRpb25cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyByb3RhdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0gWiBheGlzIHJvdGF0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gdGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICByZXNldCh4LCB5LCB6LCBsaWZlLCBlYXNpbmcpIHtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgWCBheGlzIHJvdGF0aW9uLlxyXG4gICAgICogQHR5cGUge251bWJlcnxTcGFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBZIGF4aXMgcm90YXRpb24uXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfFNwYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFogYXhpcyByb3RhdGlvbi5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ8U3Bhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy56ID0geiB8fCAwO1xyXG5cclxuICAgIGlmICh4ID09PSB1bmRlZmluZWQgfHwgeCA9PSAnc2FtZScpIHtcclxuICAgICAgdGhpcy5yb3RhdGlvblR5cGUgPSAnc2FtZSc7XHJcbiAgICB9IGVsc2UgaWYgKHkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucm90YXRpb25UeXBlID0gJ3NldCc7XHJcbiAgICB9IGVsc2UgaWYgKHogPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uVHlwZSA9ICd0byc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uVHlwZSA9ICdhZGQnO1xyXG4gICAgICB0aGlzLnggPSBjcmVhdGVTcGFuKHRoaXMueCAqIERSKTtcclxuICAgICAgdGhpcy55ID0gY3JlYXRlU3Bhbih0aGlzLnkgKiBEUik7XHJcbiAgICAgIHRoaXMueiA9IGNyZWF0ZVNwYW4odGhpcy56ICogRFIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIHRoZSBiZWhhdmlvdXIgb24gYSBwYXJ0aWNsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBiZWhhdmlvdXIgb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMucm90YXRpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgJ3NhbWUnOlxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnc2V0JzpcclxuICAgICAgICB0aGlzLl9zZXRSb3RhdGlvbihwYXJ0aWNsZS5yb3RhdGlvbiwgdGhpcy54KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ3RvJzpcclxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIgPSBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIgfHwgbmV3IFZlY3RvcjNEKCk7XHJcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLnRSID0gcGFydGljbGUudHJhbnNmb3JtLnRSIHx8IG5ldyBWZWN0b3IzRCgpO1xyXG4gICAgICAgIHRoaXMuX3NldFJvdGF0aW9uKHBhcnRpY2xlLnRyYW5zZm9ybS5mUiwgdGhpcy54KTtcclxuICAgICAgICB0aGlzLl9zZXRSb3RhdGlvbihwYXJ0aWNsZS50cmFuc2Zvcm0udFIsIHRoaXMueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdhZGQnOlxyXG4gICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5hZGRSID0gbmV3IFZlY3RvcjNEKFxyXG4gICAgICAgICAgdGhpcy54LmdldFZhbHVlKCksXHJcbiAgICAgICAgICB0aGlzLnkuZ2V0VmFsdWUoKSxcclxuICAgICAgICAgIHRoaXMuei5nZXRWYWx1ZSgpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3Mgcm90YXRpb24gcHJpb3IgdG8gdGhlIGJlaGF2aW91ciBiZWluZyBhcHBsaWVkLlxyXG4gICAqXHJcbiAgICogTk9URSBJdCdzIGhhcmQgdG8gc2VlIGhlcmUsIGJ1dCB0aGlzIGlzIG11dGF0aW5nIHRoZSBwYXJ0aWNsZSdzIHJvdGF0aW9uXHJcbiAgICogZXZlbiB0aG91Z2ggdGhlIHBhcnRpY2xlIGlzIG5vdCBiZWluZyBwYXNzZWQgaW4gZGlyZWN0bHkuXHJcbiAgICpcclxuICAgKiBOT1RFIHRoZSBlbHNlIGlmIGJlbG93IHdpbGwgbmV2ZXIgYmUgcmVhY2hlZCBiZWNhdXNlIHRoZSB2YWx1ZSBiZWluZyBwYXNzZWQgaW5cclxuICAgKiB3aWxsIG5ldmVyIGJlIG9mIHR5cGUgVmVjdG9yM0QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSBwYXJ0aWNsZVJvdGF0aW9uIC0gdGhlIHBhcnRpY2xlJ3Mgcm90YXRpb24gdmVjdG9yXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBzZXQgdGhlIHJvdGF0aW9uIHZhbHVlIHRvLCBpZiAncmFuZG9tJ1xyXG4gICAqIHJvdGF0aW9uIGlzIHJhbmRvbWlzZWRcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBfc2V0Um90YXRpb24ocGFydGljbGVSb3RhdGlvbiwgdmFsdWUpIHtcclxuICAgIHBhcnRpY2xlUm90YXRpb24gPSBwYXJ0aWNsZVJvdGF0aW9uIHx8IG5ldyBWZWN0b3IzRCgpO1xyXG4gICAgaWYgKHZhbHVlID09ICdyYW5kb20nKSB7XHJcbiAgICAgIHZhciB4ID0gTWF0aFV0aWxzLnJhbmRvbUFUb0IoLVBJLCBQSSk7XHJcbiAgICAgIHZhciB5ID0gTWF0aFV0aWxzLnJhbmRvbUFUb0IoLVBJLCBQSSk7XHJcbiAgICAgIHZhciB6ID0gTWF0aFV0aWxzLnJhbmRvbUFUb0IoLVBJLCBQSSk7XHJcblxyXG4gICAgICBwYXJ0aWNsZVJvdGF0aW9uLnNldCh4LCB5LCB6KTtcclxuICAgIH1cclxuICAgIC8vIHdlIGNhbid0IGV2ZXIgZ2V0IGhlcmUgYmVjYXVzZSB2YWx1ZSB3aWxsIG5ldmVyIGJlIGEgVmVjdG9yM0QhXHJcbiAgICAvLyBjb25zaWRlciByZWZhY3RvcmluZyB0b1xyXG4gICAgLy8gIGlmICh2YWx1ZSBpbnN0YW5jZSBvZiBTcGFuKSB7IHZlYzMuYWRkKHZhbHVlLmdldFZhbHVlKCkpOyB9XHJcbiAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFZlY3RvcjNEKSB7XHJcbiAgICAgIHBhcnRpY2xlUm90YXRpb24uY29weSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZS5yb3RhdGlvbiBwcm9wZXJ0eS5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTYyMjk1Ni9ob3ctdG8tY29udmVydC1kaXJlY3Rpb24tdmVjdG9yLXRvLWV1bGVyLWFuZ2xlc1xyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBlbmdpbmUgdGltZVxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XHJcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnJvdGF0aW9uVHlwZSkge1xyXG4gICAgICAvLyBvcmllbnRzIHRoZSBwYXJ0aWNsZSBpbiB0aGUgZGlyZWN0aW9uIGl0IGlzIG1vdmluZ1xyXG4gICAgICBjYXNlICdzYW1lJzpcclxuICAgICAgICBpZiAoIXBhcnRpY2xlLnJvdGF0aW9uKSB7XHJcbiAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFydGljbGUucm90YXRpb24uY29weShwYXJ0aWNsZS52ZWxvY2l0eSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdzZXQnOlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICd0byc6XHJcbiAgICAgICAgcGFydGljbGUucm90YXRpb24ueCA9IE1hdGhVdGlscy5sZXJwKFxyXG4gICAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmZSLngsXHJcbiAgICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0udFIueCxcclxuICAgICAgICAgIHRoaXMuZW5lcmd5XHJcbiAgICAgICAgKTtcclxuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbi55ID0gTWF0aFV0aWxzLmxlcnAoXHJcbiAgICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIueSxcclxuICAgICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS50Ui55LFxyXG4gICAgICAgICAgdGhpcy5lbmVyZ3lcclxuICAgICAgICApO1xyXG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uLnogPSBNYXRoVXRpbHMubGVycChcclxuICAgICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5mUi56LFxyXG4gICAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLnRSLnosXHJcbiAgICAgICAgICB0aGlzLmVuZXJneVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdhZGQnOlxyXG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uLmFkZChwYXJ0aWNsZS50cmFuc2Zvcm0uYWRkUik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyB4LCB5LCB6LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBSb3RhdGUoeCwgeSwgeiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==