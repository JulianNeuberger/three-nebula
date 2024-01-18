import { DEFAULT_RATE_NUM_PAN, DEFAULT_RATE_TIME_PAN } from './constants';
import { Span, createSpan } from '../math';
import Initializer from './Initializer';
import { INITIALIZER_TYPE_RATE as type } from './types';
/**
 * Calculates the rate of particle emission.
 *
 * NOTE This doesn't need to be an initializer, it doesn't have an initialize
 * method, it overrides the base init method and it is only relevent to the Emitter class.
 * It would be better to move this to the Emitter module itself as a standalone class.
 *
 */

export default class Rate extends Initializer {
  /**
   * Constructs a Rate instance.
   *
   * @param {number|array|Span} numPan - The number of particles to emit
   * @param {number|array|Span} timePan - The time between each particle emission
   * @return void
   */
  constructor(numPan = DEFAULT_RATE_NUM_PAN, timePan = DEFAULT_RATE_TIME_PAN) {
    super(type);
    /**
     * @desc Sets the number of particles to emit.
     * @type {Span}
     */

    this.numPan = createSpan(numPan);
    /**
     * @desc Sets the time between each particle emission.
     * @type {Span}
     */

    this.timePan = createSpan(timePan);
    /**
     * @desc The rate's start time.
     * @type {number}
     */

    this.startTime = 0;
    /**
     * @desc The rate's next time.
     * @type {number}
     */

    this.nextTime = 0;
    this.init();
  }
  /**
   * Sets the startTime and nextTime properties.
   *
   * @return void
   */


  init() {
    this.startTime = 0;
    this.nextTime = this.timePan.getValue();
  }
  /**
   * Gets the number of particles to emit.
   *
   * @param {number} time - Current particle engine time
   * @return {number}
   */


  getValue(time) {
    this.startTime += time;

    if (this.startTime >= this.nextTime) {
      this.init();

      if (this.numPan.b == 1) {
        if (this.numPan.getValue('Float') > 0.5) return 1;else return 0;
      } else {
        return this.numPan.getValue('Int');
      }
    }

    return 0;
  }
  /**
   * Creates a Rate initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.particlesMin - The minimum number of particles to emit
   * @property {number} json.particlesMax - The maximum number of particles to emit
   * @property {number} json.perSecondMin - The minimum per second emit rate
   * @property {number} json.perSecondMax - The maximum per second emit rate
   * @return {Rate}
   */


  static fromJSON(json) {
    const {
      particlesMin,
      particlesMax,
      perSecondMin,
      perSecondMax
    } = json;
    return new Rate(new Span(particlesMin, particlesMax), new Span(perSecondMin, perSecondMax));
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9SYXRlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfUkFURV9OVU1fUEFOIiwiREVGQVVMVF9SQVRFX1RJTUVfUEFOIiwiU3BhbiIsImNyZWF0ZVNwYW4iLCJJbml0aWFsaXplciIsIklOSVRJQUxJWkVSX1RZUEVfUkFURSIsInR5cGUiLCJSYXRlIiwiY29uc3RydWN0b3IiLCJudW1QYW4iLCJ0aW1lUGFuIiwic3RhcnRUaW1lIiwibmV4dFRpbWUiLCJpbml0IiwiZ2V0VmFsdWUiLCJ0aW1lIiwiYiIsImZyb21KU09OIiwianNvbiIsInBhcnRpY2xlc01pbiIsInBhcnRpY2xlc01heCIsInBlclNlY29uZE1pbiIsInBlclNlY29uZE1heCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0Esb0JBQVQsRUFBK0JDLHFCQUEvQixRQUE0RCxhQUE1RDtBQUNBLFNBQVNDLElBQVQsRUFBZUMsVUFBZixRQUFpQyxTQUFqQztBQUVBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxxQkFBcUIsSUFBSUMsSUFBbEMsUUFBOEMsU0FBOUM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsSUFBTixTQUFtQkgsV0FBbkIsQ0FBK0I7QUFDNUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUksRUFBQUEsV0FBVyxDQUFDQyxNQUFNLEdBQUdULG9CQUFWLEVBQWdDVSxPQUFPLEdBQUdULHFCQUExQyxFQUFpRTtBQUMxRSxVQUFNSyxJQUFOO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0csTUFBTCxHQUFjTixVQUFVLENBQUNNLE1BQUQsQ0FBeEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxPQUFMLEdBQWVQLFVBQVUsQ0FBQ08sT0FBRCxDQUF6QjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBRUEsU0FBS0MsSUFBTDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VBLEVBQUFBLElBQUksR0FBRztBQUNMLFNBQUtGLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtGLE9BQUwsQ0FBYUksUUFBYixFQUFoQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUEsRUFBQUEsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDYixTQUFLSixTQUFMLElBQWtCSSxJQUFsQjs7QUFFQSxRQUFJLEtBQUtKLFNBQUwsSUFBa0IsS0FBS0MsUUFBM0IsRUFBcUM7QUFDbkMsV0FBS0MsSUFBTDs7QUFFQSxVQUFJLEtBQUtKLE1BQUwsQ0FBWU8sQ0FBWixJQUFpQixDQUFyQixFQUF3QjtBQUN0QixZQUFJLEtBQUtQLE1BQUwsQ0FBWUssUUFBWixDQUFxQixPQUFyQixJQUFnQyxHQUFwQyxFQUF5QyxPQUFPLENBQVAsQ0FBekMsS0FDSyxPQUFPLENBQVA7QUFDTixPQUhELE1BR087QUFDTCxlQUFPLEtBQUtMLE1BQUwsQ0FBWUssUUFBWixDQUFxQixLQUFyQixDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPLENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkcsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFQyxNQUFBQSxZQUFGO0FBQWdCQyxNQUFBQSxZQUFoQjtBQUE4QkMsTUFBQUEsWUFBOUI7QUFBNENDLE1BQUFBO0FBQTVDLFFBQTZESixJQUFuRTtBQUVBLFdBQU8sSUFBSVgsSUFBSixDQUNMLElBQUlMLElBQUosQ0FBU2lCLFlBQVQsRUFBdUJDLFlBQXZCLENBREssRUFFTCxJQUFJbEIsSUFBSixDQUFTbUIsWUFBVCxFQUF1QkMsWUFBdkIsQ0FGSyxDQUFQO0FBSUQ7O0FBeEYyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERFRkFVTFRfUkFURV9OVU1fUEFOLCBERUZBVUxUX1JBVEVfVElNRV9QQU4gfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNwYW4sIGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcclxuXHJcbmltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcclxuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9SQVRFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSByYXRlIG9mIHBhcnRpY2xlIGVtaXNzaW9uLlxyXG4gKlxyXG4gKiBOT1RFIFRoaXMgZG9lc24ndCBuZWVkIHRvIGJlIGFuIGluaXRpYWxpemVyLCBpdCBkb2Vzbid0IGhhdmUgYW4gaW5pdGlhbGl6ZVxyXG4gKiBtZXRob2QsIGl0IG92ZXJyaWRlcyB0aGUgYmFzZSBpbml0IG1ldGhvZCBhbmQgaXQgaXMgb25seSByZWxldmVudCB0byB0aGUgRW1pdHRlciBjbGFzcy5cclxuICogSXQgd291bGQgYmUgYmV0dGVyIHRvIG1vdmUgdGhpcyB0byB0aGUgRW1pdHRlciBtb2R1bGUgaXRzZWxmIGFzIGEgc3RhbmRhbG9uZSBjbGFzcy5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUgZXh0ZW5kcyBJbml0aWFsaXplciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIFJhdGUgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcnxhcnJheXxTcGFufSBudW1QYW4gLSBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0XHJcbiAgICogQHBhcmFtIHtudW1iZXJ8YXJyYXl8U3Bhbn0gdGltZVBhbiAtIFRoZSB0aW1lIGJldHdlZW4gZWFjaCBwYXJ0aWNsZSBlbWlzc2lvblxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG51bVBhbiA9IERFRkFVTFRfUkFURV9OVU1fUEFOLCB0aW1lUGFuID0gREVGQVVMVF9SQVRFX1RJTUVfUEFOKSB7XHJcbiAgICBzdXBlcih0eXBlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFNldHMgdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdC5cclxuICAgICAqIEB0eXBlIHtTcGFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bVBhbiA9IGNyZWF0ZVNwYW4obnVtUGFuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFNldHMgdGhlIHRpbWUgYmV0d2VlbiBlYWNoIHBhcnRpY2xlIGVtaXNzaW9uLlxyXG4gICAgICogQHR5cGUge1NwYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGltZVBhbiA9IGNyZWF0ZVNwYW4odGltZVBhbik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcmF0ZSdzIHN0YXJ0IHRpbWUuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgcmF0ZSdzIG5leHQgdGltZS5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubmV4dFRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgc3RhcnRUaW1lIGFuZCBuZXh0VGltZSBwcm9wZXJ0aWVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcclxuICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gQ3VycmVudCBwYXJ0aWNsZSBlbmdpbmUgdGltZVxyXG4gICAqIEByZXR1cm4ge251bWJlcn1cclxuICAgKi9cclxuICBnZXRWYWx1ZSh0aW1lKSB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSArPSB0aW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMubnVtUGFuLmIgPT0gMSkge1xyXG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZSgnRmxvYXQnKSA+IDAuNSkgcmV0dXJuIDE7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5udW1QYW4uZ2V0VmFsdWUoJ0ludCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgUmF0ZSBpbml0aWFsaXplciBmcm9tIEpTT04uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5wYXJ0aWNsZXNNaW4gLSBUaGUgbWluaW11bSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXRcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5wYXJ0aWNsZXNNYXggLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXRcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5wZXJTZWNvbmRNaW4gLSBUaGUgbWluaW11bSBwZXIgc2Vjb25kIGVtaXQgcmF0ZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnBlclNlY29uZE1heCAtIFRoZSBtYXhpbXVtIHBlciBzZWNvbmQgZW1pdCByYXRlXHJcbiAgICogQHJldHVybiB7UmF0ZX1cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgeyBwYXJ0aWNsZXNNaW4sIHBhcnRpY2xlc01heCwgcGVyU2Vjb25kTWluLCBwZXJTZWNvbmRNYXggfSA9IGpzb247XHJcblxyXG4gICAgcmV0dXJuIG5ldyBSYXRlKFxyXG4gICAgICBuZXcgU3BhbihwYXJ0aWNsZXNNaW4sIHBhcnRpY2xlc01heCksXHJcbiAgICAgIG5ldyBTcGFuKHBlclNlY29uZE1pbiwgcGVyU2Vjb25kTWF4KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19