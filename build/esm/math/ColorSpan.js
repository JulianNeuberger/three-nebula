import MathUtils from './MathUtils';
import Span from './Span';
import sample from 'lodash/sample';
import { MATH_TYPE_COLOR_SPAN as type } from './types';
/**
 * Class for storing and interacting with an array of colours.
 *
 */

export default class ColorSpan extends Span {
  /**
   * Constructs a ColorSpan instance.
   *
   * @param {string|array<string>} colors - A color or array of colors. If the
   * string 'random' is provided, a random color will be returned from getValue
   * @return void
   */
  constructor(colors) {
    super();
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc Determines if a random color should be returned from the getValue method.
     * @type {boolean}
     */

    this.shouldRandomize = colors === 'random' ? true : false;
    /**
     * @desc An array of colors to select from
     * @type {array<string>}
     */

    this.colors = Array.isArray(colors) ? colors : [colors];
  }
  /**
   * Gets a color from the color array
   * or a random color if this.shouldRandomize is true.
   *
   * @return {string} a hex color
   */


  getValue() {
    return this.shouldRandomize ? MathUtils.randomColor() : sample(this.colors);
  }

}
/**
 * Attempts to create an ArraySpan from the colors provided.
 *
 * @param {mixed} colors - colors to try and create an ArraySpan from
 * @return {?ColorSpan}
 */

export const createColorSpan = colors => {
  if (!colors) {
    console.warn(`Invalid colors argument ${colors} passed to createColorSpan. Defaulting to 'random'.`);
    colors = 'random';
  }

  if (colors instanceof ColorSpan) {
    return colors;
  }

  return new ColorSpan(colors);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0NvbG9yU3Bhbi5qcyJdLCJuYW1lcyI6WyJNYXRoVXRpbHMiLCJTcGFuIiwic2FtcGxlIiwiTUFUSF9UWVBFX0NPTE9SX1NQQU4iLCJ0eXBlIiwiQ29sb3JTcGFuIiwiY29uc3RydWN0b3IiLCJjb2xvcnMiLCJzaG91bGRSYW5kb21pemUiLCJBcnJheSIsImlzQXJyYXkiLCJnZXRWYWx1ZSIsInJhbmRvbUNvbG9yIiwiY3JlYXRlQ29sb3JTcGFuIiwiY29uc29sZSIsIndhcm4iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixlQUFuQjtBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkosSUFBeEIsQ0FBNkI7QUFDMUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQVM7QUFDbEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSSxlQUFMLEdBQXVCRCxNQUFNLEtBQUssUUFBWCxHQUFzQixJQUF0QixHQUE2QixLQUFwRDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtBLE1BQUwsR0FBY0UsS0FBSyxDQUFDQyxPQUFOLENBQWNILE1BQWQsSUFBd0JBLE1BQXhCLEdBQWlDLENBQUNBLE1BQUQsQ0FBL0M7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VJLEVBQUFBLFFBQVEsR0FBRztBQUNULFdBQU8sS0FBS0gsZUFBTCxHQUF1QlIsU0FBUyxDQUFDWSxXQUFWLEVBQXZCLEdBQWlEVixNQUFNLENBQUMsS0FBS0ssTUFBTixDQUE5RDtBQUNEOztBQXRDeUM7QUF5QzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxPQUFPLE1BQU1NLGVBQWUsR0FBR04sTUFBTSxJQUFJO0FBQ3ZDLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1hPLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNHLDJCQUEwQlIsTUFBTyxxREFEcEM7QUFJQUEsSUFBQUEsTUFBTSxHQUFHLFFBQVQ7QUFDRDs7QUFFRCxNQUFJQSxNQUFNLFlBQVlGLFNBQXRCLEVBQWlDO0FBQy9CLFdBQU9FLE1BQVA7QUFDRDs7QUFFRCxTQUFPLElBQUlGLFNBQUosQ0FBY0UsTUFBZCxDQUFQO0FBQ0QsQ0FkTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRoVXRpbHMgZnJvbSAnLi9NYXRoVXRpbHMnO1xyXG5pbXBvcnQgU3BhbiBmcm9tICcuL1NwYW4nO1xyXG5pbXBvcnQgc2FtcGxlIGZyb20gJ2xvZGFzaC9zYW1wbGUnO1xyXG5pbXBvcnQgeyBNQVRIX1RZUEVfQ09MT1JfU1BBTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQ2xhc3MgZm9yIHN0b3JpbmcgYW5kIGludGVyYWN0aW5nIHdpdGggYW4gYXJyYXkgb2YgY29sb3Vycy5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU3BhbiBleHRlbmRzIFNwYW4ge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBDb2xvclNwYW4gaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xhcnJheTxzdHJpbmc+fSBjb2xvcnMgLSBBIGNvbG9yIG9yIGFycmF5IG9mIGNvbG9ycy4gSWYgdGhlXHJcbiAgICogc3RyaW5nICdyYW5kb20nIGlzIHByb3ZpZGVkLCBhIHJhbmRvbSBjb2xvciB3aWxsIGJlIHJldHVybmVkIGZyb20gZ2V0VmFsdWVcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb2xvcnMpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIGEgcmFuZG9tIGNvbG9yIHNob3VsZCBiZSByZXR1cm5lZCBmcm9tIHRoZSBnZXRWYWx1ZSBtZXRob2QuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5zaG91bGRSYW5kb21pemUgPSBjb2xvcnMgPT09ICdyYW5kb20nID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgQW4gYXJyYXkgb2YgY29sb3JzIHRvIHNlbGVjdCBmcm9tXHJcbiAgICAgKiBAdHlwZSB7YXJyYXk8c3RyaW5nPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb2xvcnMgPSBBcnJheS5pc0FycmF5KGNvbG9ycykgPyBjb2xvcnMgOiBbY29sb3JzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYSBjb2xvciBmcm9tIHRoZSBjb2xvciBhcnJheVxyXG4gICAqIG9yIGEgcmFuZG9tIGNvbG9yIGlmIHRoaXMuc2hvdWxkUmFuZG9taXplIGlzIHRydWUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgaGV4IGNvbG9yXHJcbiAgICovXHJcbiAgZ2V0VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaG91bGRSYW5kb21pemUgPyBNYXRoVXRpbHMucmFuZG9tQ29sb3IoKSA6IHNhbXBsZSh0aGlzLmNvbG9ycyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQXR0ZW1wdHMgdG8gY3JlYXRlIGFuIEFycmF5U3BhbiBmcm9tIHRoZSBjb2xvcnMgcHJvdmlkZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWl4ZWR9IGNvbG9ycyAtIGNvbG9ycyB0byB0cnkgYW5kIGNyZWF0ZSBhbiBBcnJheVNwYW4gZnJvbVxyXG4gKiBAcmV0dXJuIHs/Q29sb3JTcGFufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbG9yU3BhbiA9IGNvbG9ycyA9PiB7XHJcbiAgaWYgKCFjb2xvcnMpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgYEludmFsaWQgY29sb3JzIGFyZ3VtZW50ICR7Y29sb3JzfSBwYXNzZWQgdG8gY3JlYXRlQ29sb3JTcGFuLiBEZWZhdWx0aW5nIHRvICdyYW5kb20nLmBcclxuICAgICk7XHJcblxyXG4gICAgY29sb3JzID0gJ3JhbmRvbSc7XHJcbiAgfVxyXG5cclxuICBpZiAoY29sb3JzIGluc3RhbmNlb2YgQ29sb3JTcGFuKSB7XHJcbiAgICByZXR1cm4gY29sb3JzO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ldyBDb2xvclNwYW4oY29sb3JzKTtcclxufTtcclxuIl19