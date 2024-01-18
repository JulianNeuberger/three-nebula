import Initializer from './Initializer';
import { createArraySpan } from '../math';
import { INITIALIZER_TYPE_BODY as type } from './types';
/**
 * Sets the body property on initialized particles.
 *
 */

export default class Body extends Initializer {
  /**
   * Constructs a Body initalizer instance.
   *
   * @param {string|number|object} body - The content for the particle body, can
   * be a color or an object (mesh)
   * @param {?number} w - The width of the particle body
   * @param {?number} h - The height of the particle body
   * @return void
   */
  constructor(body, w, h, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The content for the particle body
     * @type {ArraySpan}
     */

    this.body = createArraySpan(body);
    /**
     * @desc The width of the particle Body
     * @type {number}
     */

    this.w = w;
    /**
     * @desc The height of the particle Body
     * @type {number}
     */

    this.h = h || w;
  }
  /**
   * Sets the particle's initial body.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    var body = this.body.getValue();

    if (this.w) {
      particle.body = {
        width: this.w,
        height: this.h,
        body: body
      };
    } else {
      particle.body = body;
    }
  }
  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.body - The color for the particle body
   * @property {number} json.width - The width of the particle body
   * @property {number} json.height - The height of the particle body
   * @return {Body}
   */


  static fromJSON(json) {
    const {
      body,
      width,
      height,
      isEnabled = true
    } = json;
    return new Body(body, width, height, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Cb2R5LmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpemVyIiwiY3JlYXRlQXJyYXlTcGFuIiwiSU5JVElBTElaRVJfVFlQRV9CT0RZIiwidHlwZSIsIkJvZHkiLCJjb25zdHJ1Y3RvciIsImJvZHkiLCJ3IiwiaCIsImlzRW5hYmxlZCIsImluaXRpYWxpemUiLCJwYXJ0aWNsZSIsImdldFZhbHVlIiwid2lkdGgiLCJoZWlnaHQiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0MscUJBQXFCLElBQUlDLElBQWxDLFFBQThDLFNBQTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxJQUFOLFNBQW1CSixXQUFuQixDQUErQjtBQUM1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxTQUFTLEdBQUcsSUFBekIsRUFBK0I7QUFDeEMsVUFBTU4sSUFBTixFQUFZTSxTQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0gsSUFBTCxHQUFZTCxlQUFlLENBQUNLLElBQUQsQ0FBM0I7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxDQUFMLEdBQVNBLENBQUMsSUFBSUQsQ0FBZDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUcsRUFBQUEsVUFBVSxDQUFDQyxRQUFELEVBQVc7QUFDbkIsUUFBSUwsSUFBSSxHQUFHLEtBQUtBLElBQUwsQ0FBVU0sUUFBVixFQUFYOztBQUVBLFFBQUksS0FBS0wsQ0FBVCxFQUFZO0FBQ1ZJLE1BQUFBLFFBQVEsQ0FBQ0wsSUFBVCxHQUFnQjtBQUNkTyxRQUFBQSxLQUFLLEVBQUUsS0FBS04sQ0FERTtBQUVkTyxRQUFBQSxNQUFNLEVBQUUsS0FBS04sQ0FGQztBQUdkRixRQUFBQSxJQUFJLEVBQUVBO0FBSFEsT0FBaEI7QUFLRCxLQU5ELE1BTU87QUFDTEssTUFBQUEsUUFBUSxDQUFDTCxJQUFULEdBQWdCQSxJQUFoQjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNpQixTQUFSUyxRQUFRLENBQUNDLElBQUQsRUFBTztBQUNwQixVQUFNO0FBQUVWLE1BQUFBLElBQUY7QUFBUU8sTUFBQUEsS0FBUjtBQUFlQyxNQUFBQSxNQUFmO0FBQXVCTCxNQUFBQSxTQUFTLEdBQUc7QUFBbkMsUUFBNENPLElBQWxEO0FBRUEsV0FBTyxJQUFJWixJQUFKLENBQVNFLElBQVQsRUFBZU8sS0FBZixFQUFzQkMsTUFBdEIsRUFBOEJMLFNBQTlCLENBQVA7QUFDRDs7QUFqRTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgeyBjcmVhdGVBcnJheVNwYW4gfSBmcm9tICcuLi9tYXRoJztcclxuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9CT0RZIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuLyoqXHJcbiAqIFNldHMgdGhlIGJvZHkgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSBleHRlbmRzIEluaXRpYWxpemVyIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgQm9keSBpbml0YWxpemVyIGluc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfG9iamVjdH0gYm9keSAtIFRoZSBjb250ZW50IGZvciB0aGUgcGFydGljbGUgYm9keSwgY2FuXHJcbiAgICogYmUgYSBjb2xvciBvciBhbiBvYmplY3QgKG1lc2gpXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyfSB3IC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSBib2R5XHJcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBoIC0gVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgYm9keVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGJvZHksIHcsIGgsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY29udGVudCBmb3IgdGhlIHBhcnRpY2xlIGJvZHlcclxuICAgICAqIEB0eXBlIHtBcnJheVNwYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYm9keSA9IGNyZWF0ZUFycmF5U3Bhbihib2R5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgQm9keVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy53ID0gdztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIEJvZHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaCA9IGggfHwgdztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCBib2R5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICB2YXIgYm9keSA9IHRoaXMuYm9keS5nZXRWYWx1ZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLncpIHtcclxuICAgICAgcGFydGljbGUuYm9keSA9IHtcclxuICAgICAgICB3aWR0aDogdGhpcy53LFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5oLFxyXG4gICAgICAgIGJvZHk6IGJvZHksXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gYm9keTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBCb2R5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmJvZHkgLSBUaGUgY29sb3IgZm9yIHRoZSBwYXJ0aWNsZSBib2R5XHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ud2lkdGggLSBUaGUgd2lkdGggb2YgdGhlIHBhcnRpY2xlIGJvZHlcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5oZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBwYXJ0aWNsZSBib2R5XHJcbiAgICogQHJldHVybiB7Qm9keX1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyBib2R5LCB3aWR0aCwgaGVpZ2h0LCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xyXG5cclxuICAgIHJldHVybiBuZXcgQm9keShib2R5LCB3aWR0aCwgaGVpZ2h0LCBpc0VuYWJsZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=