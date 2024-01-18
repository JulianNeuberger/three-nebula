import MathUtils from './MathUtils';
import Util from '../utils/Util';
import { MATH_TYPE_SPAN as type } from './types';
export default class Span {
  /**
   * Span Class. Get a random Number from a to b. Or from c-a to c+b
   * @param {Number|Array} a - min number
   * @param {Number} b - max number
   * @param {Number} center - the center's z value
   * @example
   * var span = new Span(0,30);
   * or
   * var span = new Span(["#fff","#ff0","#000"]);
   * or
   * var span = new Span(5,1,"center");
   * @extends {Zone}
   * @constructor
   */
  constructor(a, b, center) {
    this._isArray = false;
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;

    if (Util.isArray(a)) {
      this._isArray = true;
      this.a = a;
    } else {
      this.a = Util.initValue(a, 1);
      this.b = Util.initValue(b, this.a);
      this._center = Util.initValue(center, false);
    }
  }
  /**
   * Span.getValue function
   * @name get a random Number from a to b. Or get a random Number from c-a to c+b
   * @param {number} INT or int
   * @return {number} a random Number
   */


  getValue(INT) {
    if (this._isArray) {
      return this.a[this.a.length * Math.random() >> 0];
    } else {
      if (!this._center) return MathUtils.randomAToB(this.a, this.b, INT);else return MathUtils.randomFloating(this.a, this.b, INT);
    }
  }

}
export const createSpan = (a, b, c) => {
  if (a instanceof Span) return a;

  if (b === undefined) {
    return new Span(a);
  } else {
    if (c === undefined) return new Span(a, b);else return new Span(a, b, c);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1NwYW4uanMiXSwibmFtZXMiOlsiTWF0aFV0aWxzIiwiVXRpbCIsIk1BVEhfVFlQRV9TUEFOIiwidHlwZSIsIlNwYW4iLCJjb25zdHJ1Y3RvciIsImEiLCJiIiwiY2VudGVyIiwiX2lzQXJyYXkiLCJpc0FycmF5IiwiaW5pdFZhbHVlIiwiX2NlbnRlciIsImdldFZhbHVlIiwiSU5UIiwibGVuZ3RoIiwiTWF0aCIsInJhbmRvbSIsInJhbmRvbUFUb0IiLCJyYW5kb21GbG9hdGluZyIsImNyZWF0ZVNwYW4iLCJjIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLE1BQXNCLGFBQXRCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixlQUFqQjtBQUNBLFNBQVNDLGNBQWMsSUFBSUMsSUFBM0IsUUFBdUMsU0FBdkM7QUFFQSxlQUFlLE1BQU1DLElBQU4sQ0FBVztBQUN4QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VDLEVBQUFBLFdBQVcsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLE1BQVAsRUFBZTtBQUN4QixTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS04sSUFBTCxHQUFZQSxJQUFaOztBQUVBLFFBQUlGLElBQUksQ0FBQ1MsT0FBTCxDQUFhSixDQUFiLENBQUosRUFBcUI7QUFDbkIsV0FBS0csUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUtILENBQUwsR0FBU0EsQ0FBVDtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUtBLENBQUwsR0FBU0wsSUFBSSxDQUFDVSxTQUFMLENBQWVMLENBQWYsRUFBa0IsQ0FBbEIsQ0FBVDtBQUNBLFdBQUtDLENBQUwsR0FBU04sSUFBSSxDQUFDVSxTQUFMLENBQWVKLENBQWYsRUFBa0IsS0FBS0QsQ0FBdkIsQ0FBVDtBQUNBLFdBQUtNLE9BQUwsR0FBZVgsSUFBSSxDQUFDVSxTQUFMLENBQWVILE1BQWYsRUFBdUIsS0FBdkIsQ0FBZjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFSyxFQUFBQSxRQUFRLENBQUNDLEdBQUQsRUFBTTtBQUNaLFFBQUksS0FBS0wsUUFBVCxFQUFtQjtBQUNqQixhQUFPLEtBQUtILENBQUwsQ0FBUSxLQUFLQSxDQUFMLENBQU9TLE1BQVAsR0FBZ0JDLElBQUksQ0FBQ0MsTUFBTCxFQUFqQixJQUFtQyxDQUExQyxDQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBSSxDQUFDLEtBQUtMLE9BQVYsRUFBbUIsT0FBT1osU0FBUyxDQUFDa0IsVUFBVixDQUFxQixLQUFLWixDQUExQixFQUE2QixLQUFLQyxDQUFsQyxFQUFxQ08sR0FBckMsQ0FBUCxDQUFuQixLQUNLLE9BQU9kLFNBQVMsQ0FBQ21CLGNBQVYsQ0FBeUIsS0FBS2IsQ0FBOUIsRUFBaUMsS0FBS0MsQ0FBdEMsRUFBeUNPLEdBQXpDLENBQVA7QUFDTjtBQUNGOztBQS9DdUI7QUFrRDFCLE9BQU8sTUFBTU0sVUFBVSxHQUFHLENBQUNkLENBQUQsRUFBSUMsQ0FBSixFQUFPYyxDQUFQLEtBQWE7QUFDckMsTUFBSWYsQ0FBQyxZQUFZRixJQUFqQixFQUF1QixPQUFPRSxDQUFQOztBQUV2QixNQUFJQyxDQUFDLEtBQUtlLFNBQVYsRUFBcUI7QUFDbkIsV0FBTyxJQUFJbEIsSUFBSixDQUFTRSxDQUFULENBQVA7QUFDRCxHQUZELE1BRU87QUFDTCxRQUFJZSxDQUFDLEtBQUtDLFNBQVYsRUFBcUIsT0FBTyxJQUFJbEIsSUFBSixDQUFTRSxDQUFULEVBQVlDLENBQVosQ0FBUCxDQUFyQixLQUNLLE9BQU8sSUFBSUgsSUFBSixDQUFTRSxDQUFULEVBQVlDLENBQVosRUFBZWMsQ0FBZixDQUFQO0FBQ047QUFDRixDQVRNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGhVdGlscyBmcm9tICcuL01hdGhVdGlscyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL3V0aWxzL1V0aWwnO1xyXG5pbXBvcnQgeyBNQVRIX1RZUEVfU1BBTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIHtcclxuICAvKipcclxuICAgKiBTcGFuIENsYXNzLiBHZXQgYSByYW5kb20gTnVtYmVyIGZyb20gYSB0byBiLiBPciBmcm9tIGMtYSB0byBjK2JcclxuICAgKiBAcGFyYW0ge051bWJlcnxBcnJheX0gYSAtIG1pbiBudW1iZXJcclxuICAgKiBAcGFyYW0ge051bWJlcn0gYiAtIG1heCBudW1iZXJcclxuICAgKiBAcGFyYW0ge051bWJlcn0gY2VudGVyIC0gdGhlIGNlbnRlcidzIHogdmFsdWVcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIHZhciBzcGFuID0gbmV3IFNwYW4oMCwzMCk7XHJcbiAgICogb3JcclxuICAgKiB2YXIgc3BhbiA9IG5ldyBTcGFuKFtcIiNmZmZcIixcIiNmZjBcIixcIiMwMDBcIl0pO1xyXG4gICAqIG9yXHJcbiAgICogdmFyIHNwYW4gPSBuZXcgU3Bhbig1LDEsXCJjZW50ZXJcIik7XHJcbiAgICogQGV4dGVuZHMge1pvbmV9XHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XHJcbiAgICB0aGlzLl9pc0FycmF5ID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xyXG4gICAgICB0aGlzLl9pc0FycmF5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hID0gYTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYSA9IFV0aWwuaW5pdFZhbHVlKGEsIDEpO1xyXG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xyXG4gICAgICB0aGlzLl9jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNwYW4uZ2V0VmFsdWUgZnVuY3Rpb25cclxuICAgKiBAbmFtZSBnZXQgYSByYW5kb20gTnVtYmVyIGZyb20gYSB0byBiLiBPciBnZXQgYSByYW5kb20gTnVtYmVyIGZyb20gYy1hIHRvIGMrYlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBJTlQgb3IgaW50XHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBhIHJhbmRvbSBOdW1iZXJcclxuICAgKi9cclxuICBnZXRWYWx1ZShJTlQpIHtcclxuICAgIGlmICh0aGlzLl9pc0FycmF5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFbKHRoaXMuYS5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKSA+PiAwXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5fY2VudGVyKSByZXR1cm4gTWF0aFV0aWxzLnJhbmRvbUFUb0IodGhpcy5hLCB0aGlzLmIsIElOVCk7XHJcbiAgICAgIGVsc2UgcmV0dXJuIE1hdGhVdGlscy5yYW5kb21GbG9hdGluZyh0aGlzLmEsIHRoaXMuYiwgSU5UKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTcGFuID0gKGEsIGIsIGMpID0+IHtcclxuICBpZiAoYSBpbnN0YW5jZW9mIFNwYW4pIHJldHVybiBhO1xyXG5cclxuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gbmV3IFNwYW4oYSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChjID09PSB1bmRlZmluZWQpIHJldHVybiBuZXcgU3BhbihhLCBiKTtcclxuICAgIGVsc2UgcmV0dXJuIG5ldyBTcGFuKGEsIGIsIGMpO1xyXG4gIH1cclxufTtcclxuIl19