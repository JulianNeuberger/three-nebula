import Span from './Span';
import sample from 'lodash/sample';
import { MATH_TYPE_ARRAY_SPAN as type } from './types';
/**
 * Class for storing items of mixed type and fetching a randomised
 * value from these items.
 *
 */

export default class ArraySpan extends Span {
  /**
   * Constructs an ArraySpan instance.
   *
   * @param {mixed|array<mixed>} items - Items
   * @return void
   */
  constructor(items) {
    super();
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc An array of colors
     * @type {array}
     */

    this.items = Array.isArray(items) ? items : [items];
  }
  /**
   * Gets a random item.
   *
   * @return {mixed}
   */


  getValue() {
    return sample(this.items);
  }

}
/**
 * Attempts to create an ArraySpan from the items provided.
 *
 * @param {mixed} items - Items to try and create an ArraySpan from
 * @return {?ArraySpan}
 */

export const createArraySpan = items => {
  if (!items) {
    return null;
  }

  if (items instanceof ArraySpan) {
    return items;
  }

  return new ArraySpan(items);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyJdLCJuYW1lcyI6WyJTcGFuIiwic2FtcGxlIiwiTUFUSF9UWVBFX0FSUkFZX1NQQU4iLCJ0eXBlIiwiQXJyYXlTcGFuIiwiY29uc3RydWN0b3IiLCJpdGVtcyIsIkFycmF5IiwiaXNBcnJheSIsImdldFZhbHVlIiwiY3JlYXRlQXJyYXlTcGFuIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixlQUFuQjtBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxTQUFOLFNBQXdCSixJQUF4QixDQUE2QjtBQUMxQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVE7QUFDakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLRyxLQUFMLEdBQWFDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixLQUFkLElBQXVCQSxLQUF2QixHQUErQixDQUFDQSxLQUFELENBQTVDO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUcsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsV0FBT1IsTUFBTSxDQUFDLEtBQUtLLEtBQU4sQ0FBYjtBQUNEOztBQTlCeUM7QUFpQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxPQUFPLE1BQU1JLGVBQWUsR0FBR0osS0FBSyxJQUFJO0FBQ3RDLE1BQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSUEsS0FBSyxZQUFZRixTQUFyQixFQUFnQztBQUM5QixXQUFPRSxLQUFQO0FBQ0Q7O0FBRUQsU0FBTyxJQUFJRixTQUFKLENBQWNFLEtBQWQsQ0FBUDtBQUNELENBVk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3BhbiBmcm9tICcuL1NwYW4nO1xyXG5pbXBvcnQgc2FtcGxlIGZyb20gJ2xvZGFzaC9zYW1wbGUnO1xyXG5pbXBvcnQgeyBNQVRIX1RZUEVfQVJSQVlfU1BBTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQ2xhc3MgZm9yIHN0b3JpbmcgaXRlbXMgb2YgbWl4ZWQgdHlwZSBhbmQgZmV0Y2hpbmcgYSByYW5kb21pc2VkXHJcbiAqIHZhbHVlIGZyb20gdGhlc2UgaXRlbXMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVNwYW4gZXh0ZW5kcyBTcGFuIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIEFycmF5U3BhbiBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bWl4ZWR8YXJyYXk8bWl4ZWQ+fSBpdGVtcyAtIEl0ZW1zXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaXRlbXMpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBBbiBhcnJheSBvZiBjb2xvcnNcclxuICAgICAqIEB0eXBlIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pdGVtcyA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbaXRlbXNdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIHJhbmRvbSBpdGVtLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICovXHJcbiAgZ2V0VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gc2FtcGxlKHRoaXMuaXRlbXMpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEF0dGVtcHRzIHRvIGNyZWF0ZSBhbiBBcnJheVNwYW4gZnJvbSB0aGUgaXRlbXMgcHJvdmlkZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWl4ZWR9IGl0ZW1zIC0gSXRlbXMgdG8gdHJ5IGFuZCBjcmVhdGUgYW4gQXJyYXlTcGFuIGZyb21cclxuICogQHJldHVybiB7P0FycmF5U3Bhbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVBcnJheVNwYW4gPSBpdGVtcyA9PiB7XHJcbiAgaWYgKCFpdGVtcykge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheVNwYW4pIHtcclxuICAgIHJldHVybiBpdGVtcztcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgQXJyYXlTcGFuKGl0ZW1zKTtcclxufTtcclxuIl19