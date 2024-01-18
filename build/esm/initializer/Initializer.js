import { INITIALIZER_TYPE_ABSTRACT } from './types';
/**
 * The base Emitter / Particle property class.
 *
 * @abstract
 */

export default class Initializer {
  /**
   * Constructs an Initializer instance.
   *
   * @param {string} [type=INITIALIZER_TYPE_ABSTRACT] - The intiializer type
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
     * @return void
   */
  constructor(type = INITIALIZER_TYPE_ABSTRACT, isEnabled = true) {
    this.type = type;
    this.isEnabled = isEnabled;
  }
  /**
   * Initializes the property on the emitter or particle.
   *
   * @see {@link '../emitter/emitter.js'} setupParticle
   * @param {Emitter} emitter - the emitter to initialize the property on
   * @param {Particle} particle - the particle to intiialize the property on
   * @return void
   */


  init(emitter, particle) {
    if (!this.isEnabled) {
      return;
    }

    if (particle) {
      this.initialize(particle);
      particle.hasBeenInitialized = true;
    } else {
      this.initialize(emitter);
      emitter.hasBeenInitialized = true;
    }
  }
  /**
   * @abstract
   */


  reset() {}
  /**
   * Place custom property initialization code in this method in the subclass.
   *
   * @param {object} target - either an Emitter or a Particle
   * @abstract
   */


  initialize(target) {} // eslint-disable-line

  /**
   * Determines if the initializer requires a Web GL API to be provided to its constructor.
   * If true, the WebGL API will need to be provided as the first argument to the constructor
   * and fromJSON methods.
   *
   * @return {boolean}
   */


  static requiresWebGlApi() {
    return false;
  }
  /**
   * Returns a new instance of the initializer from the JSON object passed.
   *
   * @abstract
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Behaviour}
   */


  static fromJSON(json) {} // eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Jbml0aWFsaXplci5qcyJdLCJuYW1lcyI6WyJJTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNUIiwiSW5pdGlhbGl6ZXIiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJpc0VuYWJsZWQiLCJpbml0IiwiZW1pdHRlciIsInBhcnRpY2xlIiwiaW5pdGlhbGl6ZSIsImhhc0JlZW5Jbml0aWFsaXplZCIsInJlc2V0IiwidGFyZ2V0IiwicmVxdWlyZXNXZWJHbEFwaSIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EseUJBQVQsUUFBMEMsU0FBMUM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsV0FBTixDQUFrQjtBQUMvQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVFQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBR0gseUJBQVIsRUFBbUNJLFNBQVMsR0FBRyxJQUEvQyxFQUFxRDtBQUM5RCxTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VDLEVBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQW9CO0FBQ3RCLFFBQUksQ0FBQyxLQUFLSCxTQUFWLEVBQXFCO0FBQ25CO0FBQ0Q7O0FBRUQsUUFBSUcsUUFBSixFQUFjO0FBQ1osV0FBS0MsVUFBTCxDQUFnQkQsUUFBaEI7QUFDQUEsTUFBQUEsUUFBUSxDQUFDRSxrQkFBVCxHQUE4QixJQUE5QjtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUtELFVBQUwsQ0FBZ0JGLE9BQWhCO0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0csa0JBQVIsR0FBNkIsSUFBN0I7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBOzs7QUFDRUMsRUFBQUEsS0FBSyxHQUFHLENBQUU7QUFFVjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRixFQUFBQSxVQUFVLENBQUNHLE1BQUQsRUFBUyxDQUFFLENBL0NVLENBK0NUOztBQUV0QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ3lCLFNBQWhCQyxnQkFBZ0IsR0FBRztBQUN4QixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkMsUUFBUSxDQUFDQyxJQUFELEVBQU8sQ0FBRSxDQW5FTyxDQW1FTjs7O0FBbkVNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9BQlNUUkFDVCB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBiYXNlIEVtaXR0ZXIgLyBQYXJ0aWNsZSBwcm9wZXJ0eSBjbGFzcy5cclxuICpcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhbiBJbml0aWFsaXplciBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1JTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNUXSAtIFRoZSBpbnRpaWFsaXplciB0eXBlXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgaW5pdGlhbGl6ZXIgc2hvdWxkIGJlIGVuYWJsZWQgb3Igbm90XHJcblxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBJTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNULCBpc0VuYWJsZWQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5pc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyB0aGUgcHJvcGVydHkgb24gdGhlIGVtaXR0ZXIgb3IgcGFydGljbGUuXHJcbiAgICpcclxuICAgKiBAc2VlIHtAbGluayAnLi4vZW1pdHRlci9lbWl0dGVyLmpzJ30gc2V0dXBQYXJ0aWNsZVxyXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlciAtIHRoZSBlbWl0dGVyIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXHJcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW50aWlhbGl6ZSB0aGUgcHJvcGVydHkgb25cclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFydGljbGUpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKHBhcnRpY2xlKTtcclxuICAgICAgcGFydGljbGUuaGFzQmVlbkluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShlbWl0dGVyKTtcclxuICAgICAgZW1pdHRlci5oYXNCZWVuSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICovXHJcbiAgcmVzZXQoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBQbGFjZSBjdXN0b20gcHJvcGVydHkgaW5pdGlhbGl6YXRpb24gY29kZSBpbiB0aGlzIG1ldGhvZCBpbiB0aGUgc3ViY2xhc3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gZWl0aGVyIGFuIEVtaXR0ZXIgb3IgYSBQYXJ0aWNsZVxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluaXRpYWxpemVyIHJlcXVpcmVzIGEgV2ViIEdMIEFQSSB0byBiZSBwcm92aWRlZCB0byBpdHMgY29uc3RydWN0b3IuXHJcbiAgICogSWYgdHJ1ZSwgdGhlIFdlYkdMIEFQSSB3aWxsIG5lZWQgdG8gYmUgcHJvdmlkZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBjb25zdHJ1Y3RvclxyXG4gICAqIGFuZCBmcm9tSlNPTiBtZXRob2RzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBzdGF0aWMgcmVxdWlyZXNXZWJHbEFwaSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGluaXRpYWxpemVyIGZyb20gdGhlIEpTT04gb2JqZWN0IHBhc3NlZC5cclxuICAgKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gSlNPTiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVxdWlyZWQgY29uc3RydWN0b3IgcHJvcGVydGllc1xyXG4gICAqIEByZXR1cm4ge0JlaGF2aW91cn1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG59XHJcbiJdfQ==