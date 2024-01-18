import PUID from '../utils/PUID';
import { CORE_TYPE_POOL as type } from './types';
/**
 * An object pool implementation. Used for pooling objects to avoid unnecessary
 * garbage collection.
 *
 */

export default class Pool {
  /**
   * Constructs a Pool instance.
   *
   * @return void
   */
  constructor() {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    /**
     * @desc Incrementing id that keeps a count of the number of objects created
     * @type {integer}
     */

    this.cID = 0;
    /**
     * @desc Map of pools in the format of PUID<String>: pool<Array>
     * @type {object}
     */

    this.list = {};
  }
  /**
   * Attempts to create a new object either by creating a new instance or calling its
   * clone method.
   *
   * TODO COVERAGE - for the constructorArgs
   * @param {function|object} functionOrObject - The object to instantiate or clone
   * @return {object|undefined}
   */


  create(functionOrObject, ...constructorArgs) {
    if (!this.canCreateNewObject(functionOrObject)) {
      throw new Error('The pool is unable to create or clone the object supplied');
    }

    this.cID++;

    if (this.canInstantiateObject(functionOrObject)) {
      return new functionOrObject(...constructorArgs);
    }

    if (this.canCloneObject(functionOrObject)) {
      return functionOrObject.clone();
    }
  }
  /**
   * Determines if the object is able to be instantiated or not.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */


  canInstantiateObject(object) {
    return typeof object === 'function';
  }
  /**
   * Determines if the object is able to be cloned or not.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */


  canCloneObject(object) {
    return object.clone && typeof object.clone === 'function';
  }
  /**
   * Determines if a new object is able to be created.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */


  canCreateNewObject(object) {
    return this.canInstantiateObject(object) || this.canCloneObject(object) ? true : false;
  }
  /**
   * Gets a count of all objects in the pool.
   *
   * @return {integer}
   */


  getCount() {
    var count = 0;

    for (var id in this.list) count += this.list[id].length;

    return count++;
  }
  /**
   * Gets an object either by creating a new one or retrieving it from the pool.
   *
   * @param {function|object} obj - The function or object to get
   * @param {array} args - The args to pass to the function on creation
   * @return {object}
   */


  get(obj, ...args) {
    var p,
        puid = obj.__puid || PUID.id(obj);
    if (this.list[puid] && this.list[puid].length > 0) p = this.list[puid].pop();else p = this.create(obj, ...args);
    p.__puid = obj.__puid || puid;
    return p;
  }
  /**
   * Pushes an object into the pool.
   *
   * @param {object} obj - The object to expire
   * @return {integer}
   */


  expire(obj) {
    return this._getList(obj.__puid).push(obj);
  }
  /**
   * Destroys all pools.
   *
   * @return void
   */


  destroy() {
    for (var id in this.list) {
      this.list[id].length = 0;
      delete this.list[id];
    }
  }
  /**
   * Gets the pool mapped to the UID.
   *
   * @param {string} uid - The pool uid
   * @return {array}
   */


  _getList(uid) {
    uid = uid || 'default';
    if (!this.list[uid]) this.list[uid] = [];
    return this.list[uid];
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1Bvb2wuanMiXSwibmFtZXMiOlsiUFVJRCIsIkNPUkVfVFlQRV9QT09MIiwidHlwZSIsIlBvb2wiLCJjb25zdHJ1Y3RvciIsImNJRCIsImxpc3QiLCJjcmVhdGUiLCJmdW5jdGlvbk9yT2JqZWN0IiwiY29uc3RydWN0b3JBcmdzIiwiY2FuQ3JlYXRlTmV3T2JqZWN0IiwiRXJyb3IiLCJjYW5JbnN0YW50aWF0ZU9iamVjdCIsImNhbkNsb25lT2JqZWN0IiwiY2xvbmUiLCJvYmplY3QiLCJnZXRDb3VudCIsImNvdW50IiwiaWQiLCJsZW5ndGgiLCJnZXQiLCJvYmoiLCJhcmdzIiwicCIsInB1aWQiLCJfX3B1aWQiLCJwb3AiLCJleHBpcmUiLCJfZ2V0TGlzdCIsInB1c2giLCJkZXN0cm95IiwidWlkIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxJQUFQLE1BQWlCLGVBQWpCO0FBQ0EsU0FBU0MsY0FBYyxJQUFJQyxJQUEzQixRQUF1QyxTQUF2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxJQUFOLENBQVc7QUFDeEI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxXQUFXLEdBQUc7QUFDWjtBQUNKO0FBQ0E7QUFDQTtBQUNJLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtHLEdBQUwsR0FBVyxDQUFYO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxNQUFNLENBQUNDLGdCQUFELEVBQW1CLEdBQUdDLGVBQXRCLEVBQXVDO0FBQzNDLFFBQUksQ0FBQyxLQUFLQyxrQkFBTCxDQUF3QkYsZ0JBQXhCLENBQUwsRUFBZ0Q7QUFDOUMsWUFBTSxJQUFJRyxLQUFKLENBQ0osMkRBREksQ0FBTjtBQUdEOztB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QUFpQixFQUFqQjtBQUVyQixXQUFPLEtBQUt6QixJQUFMLENBQVV5QixHQUFWLENBQVA7QUFDRDs7QUFySnVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBVSUQgZnJvbSAnLi4vdXRpbHMvUFVJRCc7XHJcbmltcG9ydCB7IENPUkVfVFlQRV9QT09MIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuLyoqXHJcbiAqIEFuIG9iamVjdCBwb29sIGltcGxlbWVudGF0aW9uLiBVc2VkIGZvciBwb29saW5nIG9iamVjdHMgdG8gYXZvaWQgdW5uZWNlc3NhcnlcclxuICogZ2FyYmFnZSBjb2xsZWN0aW9uLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIFBvb2wgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBJbmNyZW1lbnRpbmcgaWQgdGhhdCBrZWVwcyBhIGNvdW50IG9mIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBjcmVhdGVkXHJcbiAgICAgKiBAdHlwZSB7aW50ZWdlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jSUQgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgTWFwIG9mIHBvb2xzIGluIHRoZSBmb3JtYXQgb2YgUFVJRDxTdHJpbmc+OiBwb29sPEFycmF5PlxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5saXN0ID0ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRlbXB0cyB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGVpdGhlciBieSBjcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBvciBjYWxsaW5nIGl0c1xyXG4gICAqIGNsb25lIG1ldGhvZC5cclxuICAgKlxyXG4gICAqIFRPRE8gQ09WRVJBR0UgLSBmb3IgdGhlIGNvbnN0cnVjdG9yQXJnc1xyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb258b2JqZWN0fSBmdW5jdGlvbk9yT2JqZWN0IC0gVGhlIG9iamVjdCB0byBpbnN0YW50aWF0ZSBvciBjbG9uZVxyXG4gICAqIEByZXR1cm4ge29iamVjdHx1bmRlZmluZWR9XHJcbiAgICovXHJcbiAgY3JlYXRlKGZ1bmN0aW9uT3JPYmplY3QsIC4uLmNvbnN0cnVjdG9yQXJncykge1xyXG4gICAgaWYgKCF0aGlzLmNhbkNyZWF0ZU5ld09iamVjdChmdW5jdGlvbk9yT2JqZWN0KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgJ1RoZSBwb29sIGlzIHVuYWJsZSB0byBjcmVhdGUgb3IgY2xvbmUgdGhlIG9iamVjdCBzdXBwbGllZCdcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNJRCsrO1xyXG5cclxuICAgIGlmICh0aGlzLmNhbkluc3RhbnRpYXRlT2JqZWN0KGZ1bmN0aW9uT3JPYmplY3QpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgZnVuY3Rpb25Pck9iamVjdCguLi5jb25zdHJ1Y3RvckFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNhbkNsb25lT2JqZWN0KGZ1bmN0aW9uT3JPYmplY3QpKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbk9yT2JqZWN0LmNsb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBvYmplY3QgaXMgYWJsZSB0byBiZSBpbnN0YW50aWF0ZWQgb3Igbm90LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY2hlY2tcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGNhbkluc3RhbnRpYXRlT2JqZWN0KG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBvYmplY3QgaXMgYWJsZSB0byBiZSBjbG9uZWQgb3Igbm90LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY2hlY2tcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGNhbkNsb25lT2JqZWN0KG9iamVjdCkge1xyXG4gICAgcmV0dXJuIG9iamVjdC5jbG9uZSAmJiB0eXBlb2Ygb2JqZWN0LmNsb25lID09PSAnZnVuY3Rpb24nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiBhIG5ldyBvYmplY3QgaXMgYWJsZSB0byBiZSBjcmVhdGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY2hlY2tcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGNhbkNyZWF0ZU5ld09iamVjdChvYmplY3QpIHtcclxuICAgIHJldHVybiB0aGlzLmNhbkluc3RhbnRpYXRlT2JqZWN0KG9iamVjdCkgfHwgdGhpcy5jYW5DbG9uZU9iamVjdChvYmplY3QpXHJcbiAgICAgID8gdHJ1ZVxyXG4gICAgICA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGNvdW50IG9mIGFsbCBvYmplY3RzIGluIHRoZSBwb29sLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7aW50ZWdlcn1cclxuICAgKi9cclxuICBnZXRDb3VudCgpIHtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5saXN0KSBjb3VudCArPSB0aGlzLmxpc3RbaWRdLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gY291bnQrKztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYW4gb2JqZWN0IGVpdGhlciBieSBjcmVhdGluZyBhIG5ldyBvbmUgb3IgcmV0cmlldmluZyBpdCBmcm9tIHRoZSBwb29sLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbnxvYmplY3R9IG9iaiAtIFRoZSBmdW5jdGlvbiBvciBvYmplY3QgdG8gZ2V0XHJcbiAgICogQHBhcmFtIHthcnJheX0gYXJncyAtIFRoZSBhcmdzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uIG9uIGNyZWF0aW9uXHJcbiAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAqL1xyXG4gIGdldChvYmosIC4uLmFyZ3MpIHtcclxuICAgIHZhciBwLFxyXG4gICAgICBwdWlkID0gb2JqLl9fcHVpZCB8fCBQVUlELmlkKG9iaik7XHJcblxyXG4gICAgaWYgKHRoaXMubGlzdFtwdWlkXSAmJiB0aGlzLmxpc3RbcHVpZF0ubGVuZ3RoID4gMClcclxuICAgICAgcCA9IHRoaXMubGlzdFtwdWlkXS5wb3AoKTtcclxuICAgIGVsc2UgcCA9IHRoaXMuY3JlYXRlKG9iaiwgLi4uYXJncyk7XHJcblxyXG4gICAgcC5fX3B1aWQgPSBvYmouX19wdWlkIHx8IHB1aWQ7XHJcblxyXG4gICAgcmV0dXJuIHA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQdXNoZXMgYW4gb2JqZWN0IGludG8gdGhlIHBvb2wuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBleHBpcmVcclxuICAgKiBAcmV0dXJuIHtpbnRlZ2VyfVxyXG4gICAqL1xyXG4gIGV4cGlyZShvYmopIHtcclxuICAgIHJldHVybiB0aGlzLl9nZXRMaXN0KG9iai5fX3B1aWQpLnB1c2gob2JqKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3lzIGFsbCBwb29scy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmxpc3QpIHtcclxuICAgICAgdGhpcy5saXN0W2lkXS5sZW5ndGggPSAwO1xyXG4gICAgICBkZWxldGUgdGhpcy5saXN0W2lkXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHBvb2wgbWFwcGVkIHRvIHRoZSBVSUQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdWlkIC0gVGhlIHBvb2wgdWlkXHJcbiAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICovXHJcbiAgX2dldExpc3QodWlkKSB7XHJcbiAgICB1aWQgPSB1aWQgfHwgJ2RlZmF1bHQnO1xyXG4gICAgaWYgKCF0aGlzLmxpc3RbdWlkXSkgdGhpcy5saXN0W3VpZF0gPSBbXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5saXN0W3VpZF07XHJcbiAgfVxyXG59XHJcbiJdfQ==