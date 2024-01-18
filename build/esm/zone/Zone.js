import Vector3D from '../math/Vector3D';
import { ZONE_TYPE_ABSTRACT } from './types';
/**
 * A Zone determines the area in 3D space where an emitter's particles can position
 * themselves. They are supplied to both the Position initializer
 * and the CrossZone behaviour.
 *
 * @see {@link '../initialize/Position.js'}
 * @see {@link '../behaviour/CrossZone.js'}
 * @abstract
 */

export default class Zone {
  /**
   * Constructs a Zone instance.
   *
   * @param {string} type - The zone type
   * @return void
   */
  constructor(type = ZONE_TYPE_ABSTRACT) {
    this.type = type;
    this.vector = new Vector3D(0, 0, 0);
    this.random = 0;
    this.crossType = 'dead';
    this.log = true;
    this.supportsCrossing = true;
  }

  getPosition() {
    return null;
  }

  crossing(particle) {
    if (!this.supportsCrossing) {
      return console.warn(`${this.constructor.name} does not support the crossing method`);
    }

    switch (this.crossType) {
      case 'bound':
        this._bound(particle);

        break;

      case 'cross':
        this._cross(particle);

        break;

      case 'dead':
        this._dead(particle);

        break;
    }
  }
  /**
   * Determines if this zone is a BoxZone.
   *
   * @return {boolean}
   */


  isBoxZone() {
    return false;
  }
  /**
   * Determines if this zone is a LineZone.
   *
   * @return {boolean}
   */


  isLineZone() {
    return false;
  }
  /**
   * Determines if this zone is a MeshZone.
   *
   * @return {boolean}
   */


  isMeshZone() {
    return false;
  }
  /**
   * Determines if this zone is a PointZone.
   *
   * @return {boolean}
   */


  isPointZone() {
    return false;
  }
  /**
   * Determines if this zone is a ScreenZone.
   *
   * @return {boolean}
   */


  isScreenZone() {
    return false;
  }
  /**
   * Determines if this zone is a SphereZone.
   *
   * @return {boolean}
   */


  isSphereZone() {
    return false;
  }
  /**
   * Sets the particle's dead property to true if required.
   *
   * @param {Particle} particle
   * @abstract
   */


  _dead(particle) {} //eslint-disable-line

  /**
   * @abstract
   */


  _bound(particle) {} //eslint-disable-line

  /**
   * @abstract
   */


  _cross(particle) {} //eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1pvbmUuanMiXSwibmFtZXMiOlsiVmVjdG9yM0QiLCJaT05FX1RZUEVfQUJTVFJBQ1QiLCJab25lIiwiY29uc3RydWN0b3IiLCJ0eXBlIiwidmVjdG9yIiwicmFuZG9tIiwiY3Jvc3NUeXBlIiwibG9nIiwic3VwcG9ydHNDcm9zc2luZyIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJwYXJ0aWNsZSIsImNvbnNvbGUiLCJ3YXJuIiwibmFtZSIsIl9ib3VuZCIsIl9jcm9zcyIsIl9kZWFkIiwiaXNCb3hab25lIiwiaXNMaW5lWm9uZSIsImlzTWVzaFpvbmUiLCJpc1BvaW50Wm9uZSIsImlzU2NyZWVuWm9uZSIsImlzU3BoZXJlWm9uZSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixrQkFBckI7QUFDQSxTQUFTQyxrQkFBVCxRQUFtQyxTQUFuQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLElBQU4sQ0FBVztBQUN4QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFJLEdBQUdILGtCQUFSLEVBQTRCO0FBQ3JDLFNBQUtHLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFJTCxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFkO0FBQ0EsU0FBS00sTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLElBQVg7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOztBQUVEQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixXQUFPLElBQVA7QUFDRDs7QUFFREMsRUFBQUEsUUFBUSxDQUFDQyxRQUFELEVBQVc7QUFDakIsUUFBSSxDQUFDLEtBQUtILGdCQUFWLEVBQTRCO0FBQzFCLGFBQU9JLE9BQU8sQ0FBQ0MsSUFBUixDQUNKLEdBQUUsS0FBS1gsV0FBTCxDQUFpQlksSUFBSyx1Q0FEcEIsQ0FBUDtBQUdEOztBQUVELFlBQVEsS0FBS1IsU0FBYjtBQUNFLFdBQUssT0FBTDtBQUNFLGFBQUtTLE1BQUwsQ0FBWUosUUFBWjs7QUFDQTs7QUFFRixXQUFLLE9BQUw7QUFDRSxhQUFLSyxNQUFMLENBQVlMLFFBQVo7O0FBQ0E7O0FBRUYsV0FBSyxNQUFMO0FBQ0UsYUFBS00sS0FBTCxDQUFXTixRQUFYOztBQUNBO0FBWEo7QUFhRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFTyxFQUFBQSxTQUFTLEdBQUc7QUFDVixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxVQUFVLEdBQUc7QUFDWCxXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxVQUFVLEdBQUc7QUFDWCxXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxZQUFZLEdBQUc7QUFDYixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxZQUFZLEdBQUc7QUFDYixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VOLEVBQUFBLEtBQUssQ0FBQ04sUUFBRCxFQUFXLENBQUUsQ0F0R00sQ0FzR0w7O0FBRW5CO0FBQ0Y7QUFDQTs7O0FBQ0VJLEVBQUFBLE1BQU0sQ0FBQ0osUUFBRCxFQUFXLENBQUUsQ0EzR0ssQ0EyR0o7O0FBRXBCO0FBQ0Y7QUFDQTs7O0FBQ0VLLEVBQUFBLE1BQU0sQ0FBQ0wsUUFBRCxFQUFXLENBQUUsQ0FoSEssQ0FnSEo7OztBQWhISSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRCBmcm9tICcuLi9tYXRoL1ZlY3RvcjNEJztcclxuaW1wb3J0IHsgWk9ORV9UWVBFX0FCU1RSQUNUIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQSBab25lIGRldGVybWluZXMgdGhlIGFyZWEgaW4gM0Qgc3BhY2Ugd2hlcmUgYW4gZW1pdHRlcidzIHBhcnRpY2xlcyBjYW4gcG9zaXRpb25cclxuICogdGhlbXNlbHZlcy4gVGhleSBhcmUgc3VwcGxpZWQgdG8gYm90aCB0aGUgUG9zaXRpb24gaW5pdGlhbGl6ZXJcclxuICogYW5kIHRoZSBDcm9zc1pvbmUgYmVoYXZpb3VyLlxyXG4gKlxyXG4gKiBAc2VlIHtAbGluayAnLi4vaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyd9XHJcbiAqIEBzZWUge0BsaW5rICcuLi9iZWhhdmlvdXIvQ3Jvc3Nab25lLmpzJ31cclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgWm9uZSBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHpvbmUgdHlwZVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBaT05FX1RZUEVfQUJTVFJBQ1QpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IzRCgwLCAwLCAwKTtcclxuICAgIHRoaXMucmFuZG9tID0gMDtcclxuICAgIHRoaXMuY3Jvc3NUeXBlID0gJ2RlYWQnO1xyXG4gICAgdGhpcy5sb2cgPSB0cnVlO1xyXG4gICAgdGhpcy5zdXBwb3J0c0Nyb3NzaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldFBvc2l0aW9uKCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xyXG4gICAgaWYgKCF0aGlzLnN1cHBvcnRzQ3Jvc3NpbmcpIHtcclxuICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihcclxuICAgICAgICBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgdGhlIGNyb3NzaW5nIG1ldGhvZGBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuY3Jvc3NUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ2JvdW5kJzpcclxuICAgICAgICB0aGlzLl9ib3VuZChwYXJ0aWNsZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdjcm9zcyc6XHJcbiAgICAgICAgdGhpcy5fY3Jvc3MocGFydGljbGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnZGVhZCc6XHJcbiAgICAgICAgdGhpcy5fZGVhZChwYXJ0aWNsZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoaXMgem9uZSBpcyBhIEJveFpvbmUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzQm94Wm9uZSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhpcyB6b25lIGlzIGEgTGluZVpvbmUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzTGluZVpvbmUoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoaXMgem9uZSBpcyBhIE1lc2hab25lLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc01lc2hab25lKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBQb2ludFpvbmUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzUG9pbnRab25lKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBTY3JlZW5ab25lLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc1NjcmVlblpvbmUoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoaXMgem9uZSBpcyBhIFNwaGVyZVpvbmUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzU3BoZXJlWm9uZSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgZGVhZCBwcm9wZXJ0eSB0byB0cnVlIGlmIHJlcXVpcmVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcclxuICAgKiBAYWJzdHJhY3RcclxuICAgKi9cclxuICBfZGVhZChwYXJ0aWNsZSkge30gLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gIC8qKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIF9ib3VuZChwYXJ0aWNsZSkge30gLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gIC8qKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIF9jcm9zcyhwYXJ0aWNsZSkge30gLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbn1cclxuIl19