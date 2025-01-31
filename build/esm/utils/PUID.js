export default {
  _id: 0,
  _uids: new Map(),
  getNewId: function () {
    return `PUID_${++this._id}`;
  },
  id: function (functionOrObject) {
    if (this._uids.has(functionOrObject)) {
      return this._uids.get(functionOrObject);
    }

    const newId = this.getNewId();

    this._uids.set(functionOrObject, newId);

    return newId;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9QVUlELmpzIl0sIm5hbWVzIjpbIl9pZCIsIl91aWRzIiwiTWFwIiwiZ2V0TmV3SWQiLCJpZCIsImZ1bmN0aW9uT3JPYmplY3QiLCJoYXMiLCJnZXQiLCJuZXdJZCIsInNldCJdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtBQUNiQSxFQUFBQSxHQUFHLEVBQUUsQ0FEUTtBQUViQyxFQUFBQSxLQUFLLEVBQUUsSUFBSUMsR0FBSixFQUZNO0FBR2JDLEVBQUFBLFFBQVEsRUFBRSxZQUFXO0FBQ25CLFdBQVEsUUFBTyxFQUFFLEtBQUtILEdBQUksRUFBMUI7QUFDRCxHQUxZO0FBTWJJLEVBQUFBLEVBQUUsRUFBRSxVQUFTQyxnQkFBVCxFQUEyQjtBQUM3QixRQUFJLEtBQUtKLEtBQUwsQ0FBV0ssR0FBWCxDQUFlRCxnQkFBZixDQUFKLEVBQXNDO0FBQ3BDLGFBQU8sS0FBS0osS0FBTCxDQUFXTSxHQUFYLENBQWVGLGdCQUFmLENBQVA7QUFDRDs7QUFFRCxVQUFNRyxLQUFLLEdBQUcsS0FBS0wsUUFBTCxFQUFkOztBQUVBLFNBQUtGLEtBQUwsQ0FBV1EsR0FBWCxDQUFlSixnQkFBZixFQUFpQ0csS0FBakM7O0FBRUEsV0FBT0EsS0FBUDtBQUNEO0FBaEJZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgX2lkOiAwLFxyXG4gIF91aWRzOiBuZXcgTWFwKCksXHJcbiAgZ2V0TmV3SWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGBQVUlEXyR7Kyt0aGlzLl9pZH1gO1xyXG4gIH0sXHJcbiAgaWQ6IGZ1bmN0aW9uKGZ1bmN0aW9uT3JPYmplY3QpIHtcclxuICAgIGlmICh0aGlzLl91aWRzLmhhcyhmdW5jdGlvbk9yT2JqZWN0KSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdWlkcy5nZXQoZnVuY3Rpb25Pck9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3SWQgPSB0aGlzLmdldE5ld0lkKCk7XHJcblxyXG4gICAgdGhpcy5fdWlkcy5zZXQoZnVuY3Rpb25Pck9iamVjdCwgbmV3SWQpO1xyXG5cclxuICAgIHJldHVybiBuZXdJZDtcclxuICB9LFxyXG59O1xyXG4iXX0=