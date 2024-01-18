import Initializer from './Initializer';
import { createSpan } from '../math';
import { INITIALIZER_TYPE_RADIUS as type } from './types';
/**
 * Sets the radius property on initialized particles.
 *
 */

export default class Radius extends Initializer {
  /**
   * Constructs a Radius initializer instance.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */
  constructor(width, height, center = false, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The radius span which is used to set the particle radius value.
     * @type {Span}
     */

    this.radius = createSpan(width, height, center);
  }
  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */


  reset(width, height, center = false) {
    this.radius = createSpan(width, height, center);
  }
  /**
   * Sets the particle's initial radius.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    particle.radius = this.radius.getValue();
    particle.transform.oldRadius = particle.radius;
  }
  /**
   * Creates a Radius initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.width - The width of the particle radius
   * @property {number} json.height - The height of the particle radius
   * @property {number} json.center - The center of the particle radius
   * @return {Radius}
   */


  static fromJSON(json) {
    const {
      width,
      height,
      center = false,
      isEnabled = true
    } = json;
    return new Radius(width, height, center, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9SYWRpdXMuanMiXSwibmFtZXMiOlsiSW5pdGlhbGl6ZXIiLCJjcmVhdGVTcGFuIiwiSU5JVElBTElaRVJfVFlQRV9SQURJVVMiLCJ0eXBlIiwiUmFkaXVzIiwiY29uc3RydWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsImNlbnRlciIsImlzRW5hYmxlZCIsInJhZGl1cyIsInJlc2V0IiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiZ2V0VmFsdWUiLCJ0cmFuc2Zvcm0iLCJvbGRSYWRpdXMiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLFNBQTNCO0FBQ0EsU0FBU0MsdUJBQXVCLElBQUlDLElBQXBDLFFBQWdELFNBQWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxNQUFOLFNBQXFCSixXQUFyQixDQUFpQztBQUM5QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VLLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFNLEdBQUcsS0FBekIsRUFBZ0NDLFNBQVMsR0FBRyxJQUE1QyxFQUFrRDtBQUMzRCxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxNQUFMLEdBQWNULFVBQVUsQ0FBQ0ssS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFoQixDQUF4QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUcsRUFBQUEsS0FBSyxDQUFDTCxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLE1BQU0sR0FBRyxLQUF6QixFQUFnQztBQUNuQyxTQUFLRSxNQUFMLEdBQWNULFVBQVUsQ0FBQ0ssS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFoQixDQUF4QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUksRUFBQUEsVUFBVSxDQUFDQyxRQUFELEVBQVc7QUFDbkJBLElBQUFBLFFBQVEsQ0FBQ0gsTUFBVCxHQUFrQixLQUFLQSxNQUFMLENBQVlJLFFBQVosRUFBbEI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CQyxTQUFuQixHQUErQkgsUUFBUSxDQUFDSCxNQUF4QztBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUk8sUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFWixNQUFBQSxLQUFGO0FBQVNDLE1BQUFBLE1BQVQ7QUFBaUJDLE1BQUFBLE1BQU0sR0FBRyxLQUExQjtBQUFpQ0MsTUFBQUEsU0FBUyxHQUFHO0FBQTdDLFFBQXNEUyxJQUE1RDtBQUVBLFdBQU8sSUFBSWQsTUFBSixDQUFXRSxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsTUFBMUIsRUFBa0NDLFNBQWxDLENBQVA7QUFDRDs7QUF4RDZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgeyBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XHJcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfUkFESVVTIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuLyoqXHJcbiAqIFNldHMgdGhlIHJhZGl1cyBwcm9wZXJ0eSBvbiBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpdXMgZXh0ZW5kcyBJbml0aWFsaXplciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIFJhZGl1cyBpbml0aWFsaXplciBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgcmFkaXVzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcj1mYWxzZV0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgcmFkaXVzIHZhbHVlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgY2VudGVyID0gZmFsc2UsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcmFkaXVzIHNwYW4gd2hpY2ggaXMgdXNlZCB0byBzZXQgdGhlIHBhcnRpY2xlIHJhZGl1cyB2YWx1ZS5cclxuICAgICAqIEB0eXBlIHtTcGFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJhZGl1cyA9IGNyZWF0ZVNwYW4od2lkdGgsIGhlaWdodCwgY2VudGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyB0aGUgaW5pdGlhbGl6ZXIgcHJvcGVydGllcy5cclxuICAgKiBDbGVhcnMgYWxsIHByZXZpb3VzbHkgc2V0IHpvbmVzIGFuZCByZXNldHMgdGhlIHpvbmVzIGFjY29yZGluZyB0byBhcmdzIHBhc3NlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgcmFkaXVzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcj1mYWxzZV0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgcmFkaXVzIHZhbHVlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgcmVzZXQod2lkdGgsIGhlaWdodCwgY2VudGVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMucmFkaXVzID0gY3JlYXRlU3Bhbih3aWR0aCwgaGVpZ2h0LCBjZW50ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgcGFydGljbGUncyBpbml0aWFsIHJhZGl1cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xyXG4gICAgcGFydGljbGUucmFkaXVzID0gdGhpcy5yYWRpdXMuZ2V0VmFsdWUoKTtcclxuICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgUmFkaXVzIGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5oZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5jZW50ZXIgLSBUaGUgY2VudGVyIG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcclxuICAgKiBAcmV0dXJuIHtSYWRpdXN9XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgY2VudGVyID0gZmFsc2UsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBSYWRpdXMod2lkdGgsIGhlaWdodCwgY2VudGVyLCBpc0VuYWJsZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=