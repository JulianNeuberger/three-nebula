export default {
  initValue: function (value, defaults) {
    var _value = value != null && value != undefined ? value : defaults;

    return _value;
  },
  isArray: function (value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  destroyArray: function (array) {
    array.length = 0;
  },
  destroyObject: function (obj) {
    for (var o in obj) delete obj[o];
  },
  isUndefined: function () {
    for (var id in arguments) {
      var arg = arguments[id];
      if (arg !== undefined) return false;
    }

    return true;
  },
  setVectorByObj: function (target, pOBJ) {
    if (pOBJ['x'] !== undefined) target.position.x = pOBJ['x'];
    if (pOBJ['y'] !== undefined) target.position.y = pOBJ['y'];
    if (pOBJ['z'] !== undefined) target.position.z = pOBJ['z'];
    if (pOBJ['vx'] !== undefined) target.velocity.x = pOBJ['vx'];
    if (pOBJ['vy'] !== undefined) target.velocity.y = pOBJ['vy'];
    if (pOBJ['vz'] !== undefined) target.velocity.z = pOBJ['vz'];
    if (pOBJ['ax'] !== undefined) target.acceleration.x = pOBJ['ax'];
    if (pOBJ['ay'] !== undefined) target.acceleration.y = pOBJ['ay'];
    if (pOBJ['az'] !== undefined) target.acceleration.z = pOBJ['az'];
    if (pOBJ['p'] !== undefined) target.position.copy(pOBJ['p']);
    if (pOBJ['v'] !== undefined) target.velocity.copy(pOBJ['v']);
    if (pOBJ['a'] !== undefined) target.acceleration.copy(pOBJ['a']);
    if (pOBJ['position'] !== undefined) target.position.copy(pOBJ['position']);
    if (pOBJ['velocity'] !== undefined) target.velocity.copy(pOBJ['velocity']);
    if (pOBJ['accelerate'] !== undefined) target.acceleration.copy(pOBJ['accelerate']);
  },
  //set prototype
  setPrototypeByObj: function (target, proObj, filters) {
    for (var key in proObj) {
      // eslint-disable-next-line no-prototype-builtins
      if (target.hasOwnProperty(key)) {
        if (filters) {
          if (filters.indexOf(key) < 0) target[key] = this._getValue(proObj[key]);
        } else {
          target[key] = this._getValue(proObj[key]);
        }
      }
    }

    return target;
  },
  _getValue: function (pan) {
    if (pan.constructor.type === 'Span') return pan.getValue();else return pan;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9VdGlsLmpzIl0sIm5hbWVzIjpbImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJfdmFsdWUiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZGVzdHJveUFycmF5IiwiYXJyYXkiLCJsZW5ndGgiLCJkZXN0cm95T2JqZWN0Iiwib2JqIiwibyIsImlzVW5kZWZpbmVkIiwiaWQiLCJhcmd1bWVudHMiLCJhcmciLCJzZXRWZWN0b3JCeU9iaiIsInRhcmdldCIsInBPQkoiLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsInZlbG9jaXR5IiwiYWNjZWxlcmF0aW9uIiwiY29weSIsInNldFByb3RvdHlwZUJ5T2JqIiwicHJvT2JqIiwiZmlsdGVycyIsImtleSIsImhhc093blByb3BlcnR5IiwiaW5kZXhPZiIsIl9nZXRWYWx1ZSIsInBhbiIsImNvbnN0cnVjdG9yIiwidHlwZSIsImdldFZhbHVlIl0sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2JBLEVBQUFBLFNBQVMsRUFBRSxVQUFTQyxLQUFULEVBQWdCQyxRQUFoQixFQUEwQjtBQUNuQyxRQUFJQyxNQUFNLEdBQUdGLEtBQUssSUFBSSxJQUFULElBQWlCQSxLQUFLLElBQUlHLFNBQTFCLEdBQXNDSCxLQUF0QyxHQUE4Q0MsUUFBM0Q7O0FBRUEsV0FBT0MsTUFBUDtBQUNELEdBTFk7QUFPYkUsRUFBQUEsT0FBTyxFQUFFLFVBQVNKLEtBQVQsRUFBZ0I7QUFDdkIsV0FBT0ssTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JSLEtBQS9CLE1BQTBDLGdCQUFqRDtBQUNELEdBVFk7QUFXYlMsRUFBQUEsWUFBWSxFQUFFLFVBQVNDLEtBQVQsRUFBZ0I7QUFDNUJBLElBQUFBLEtBQUssQ0FBQ0MsTUFBTixHQUFlLENBQWY7QUFDRCxHQWJZO0FBZWJDLEVBQUFBLGFBQWEsRUFBRSxV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QXFCbEIsU0FBekIsRUFBb0NpQixNQUFNLENBQUNNLFFBQVAsQ0FBZ0JFLElBQWhCLENBQXFCUCxJQUFJLENBQUMsVUFBRCxDQUF6QjtBQUNwQyxRQUFJQSxJQUFJLENBQUMsWUFBRCxDQUFKLEtBQXVCbEIsU0FBM0IsRUFDRWlCLE1BQU0sQ0FBQ08sWUFBUCxDQUFvQkMsSUFBcEIsQ0FBeUJQLElBQUksQ0FBQyxZQUFELENBQTdCO0FBQ0gsR0FsRFk7QUFvRGI7QUFDQVEsRUFBQUEsaUJBQWlCLEVBQUUsVUFBU1QsTUFBVCxFQUFpQlUsTUFBakIsRUFBeUJDLE9BQXpCLEVBQWtDO0FBQ25ELFNBQUssSUFBSUMsR0FBVCxJQUFnQkYsTUFBaEIsRUFBd0I7QUFDdEI7QUFDQSxVQUFJVixNQUFNLENBQUNhLGNBQVAsQ0FBc0JELEdBQXRCLENBQUosRUFBZ0M7QUFDOUIsWUFBSUQsT0FBSixFQUFhO0FBQ1gsY0FBSUEsT0FBTyxDQUFDRyxPQUFSLENBQWdCRixHQUFoQixJQUF1QixDQUEzQixFQUNFWixNQUFNLENBQUNZLEdBQUQsQ0FBTixHQUFjLEtBQUtHLFNBQUwsQ0FBZUwsTUFBTSxDQUFDRSxHQUFELENBQXJCLENBQWQ7QUFDSCxTQUhELE1BR087QUFDTFosVUFBQUEsTUFBTSxDQUFDWSxHQUFELENBQU4sR0FBYyxLQUFLRyxTQUFMLENBQWVMLE1BQU0sQ0FBQ0UsR0FBRCxDQUFyQixDQUFkO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQU9aLE1BQVA7QUFDRCxHQW5FWTtBQXFFYmUsRUFBQUEsU0FBUyxFQUFFLFVBQVNDLEdBQVQsRUFBYztBQUN2QixRQUFJQSxHQUFHLENBQUNDLFdBQUosQ0FBZ0JDLElBQWhCLEtBQXlCLE1BQTdCLEVBQXFDLE9BQU9GLEdBQUcsQ0FBQ0csUUFBSixFQUFQLENBQXJDLEtBQ0ssT0FBT0gsR0FBUDtBQUNOO0FBeEVZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdFZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgZGVmYXVsdHMpIHtcclxuICAgIHZhciBfdmFsdWUgPSB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9IHVuZGVmaW5lZCA/IHZhbHVlIDogZGVmYXVsdHM7XHJcblxyXG4gICAgcmV0dXJuIF92YWx1ZTtcclxuICB9LFxyXG5cclxuICBpc0FycmF5OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgfSxcclxuXHJcbiAgZGVzdHJveUFycmF5OiBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgYXJyYXkubGVuZ3RoID0gMDtcclxuICB9LFxyXG5cclxuICBkZXN0cm95T2JqZWN0OiBmdW5jdGlvbihvYmopIHtcclxuICAgIGZvciAodmFyIG8gaW4gb2JqKSBkZWxldGUgb2JqW29dO1xyXG4gIH0sXHJcblxyXG4gIGlzVW5kZWZpbmVkOiBmdW5jdGlvbigpIHtcclxuICAgIGZvciAodmFyIGlkIGluIGFyZ3VtZW50cykge1xyXG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2lkXTtcclxuXHJcbiAgICAgIGlmIChhcmcgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIHNldFZlY3RvckJ5T2JqOiBmdW5jdGlvbih0YXJnZXQsIHBPQkopIHtcclxuICAgIGlmIChwT0JKWyd4J10gIT09IHVuZGVmaW5lZCkgdGFyZ2V0LnBvc2l0aW9uLnggPSBwT0JKWyd4J107XHJcbiAgICBpZiAocE9CSlsneSddICE9PSB1bmRlZmluZWQpIHRhcmdldC5wb3NpdGlvbi55ID0gcE9CSlsneSddO1xyXG4gICAgaWYgKHBPQkpbJ3onXSAhPT0gdW5kZWZpbmVkKSB0YXJnZXQucG9zaXRpb24ueiA9IHBPQkpbJ3onXTtcclxuXHJcbiAgICBpZiAocE9CSlsndngnXSAhPT0gdW5kZWZpbmVkKSB0YXJnZXQudmVsb2NpdHkueCA9IHBPQkpbJ3Z4J107XHJcbiAgICBpZiAocE9CSlsndnknXSAhPT0gdW5kZWZpbmVkKSB0YXJnZXQudmVsb2NpdHkueSA9IHBPQkpbJ3Z5J107XHJcbiAgICBpZiAocE9CSlsndnonXSAhPT0gdW5kZWZpbmVkKSB0YXJnZXQudmVsb2NpdHkueiA9IHBPQkpbJ3Z6J107XHJcblxyXG4gICAgaWYgKHBPQkpbJ2F4J10gIT09IHVuZGVmaW5lZCkgdGFyZ2V0LmFjY2VsZXJhdGlvbi54ID0gcE9CSlsnYXgnXTtcclxuICAgIGlmIChwT0JKWydheSddICE9PSB1bmRlZmluZWQpIHRhcmdldC5hY2NlbGVyYXRpb24ueSA9IHBPQkpbJ2F5J107XHJcbiAgICBpZiAocE9CSlsnYXonXSAhPT0gdW5kZWZpbmVkKSB0YXJnZXQuYWNjZWxlcmF0aW9uLnogPSBwT0JKWydheiddO1xyXG5cclxuICAgIGlmIChwT0JKWydwJ10gIT09IHVuZGVmaW5lZCkgdGFyZ2V0LnBvc2l0aW9uLmNvcHkocE9CSlsncCddKTtcclxuICAgIGlmIChwT0JKWyd2J10gIT09IHVuZGVmaW5lZCkgdGFyZ2V0LnZlbG9jaXR5LmNvcHkocE9CSlsndiddKTtcclxuICAgIGlmIChwT0JKWydhJ10gIT09IHVuZGVmaW5lZCkgdGFyZ2V0LmFjY2VsZXJhdGlvbi5jb3B5KHBPQkpbJ2EnXSk7XHJcblxyXG4gICAgaWYgKHBPQkpbJ3Bvc2l0aW9uJ10gIT09IHVuZGVmaW5lZCkgdGFyZ2V0LnBvc2l0aW9uLmNvcHkocE9CSlsncG9zaXRpb24nXSk7XHJcbiAgICBpZiAocE9CSlsndmVsb2NpdHknXSAhPT0gdW5kZWZpbmVkKSB0YXJnZXQudmVsb2NpdHkuY29weShwT0JKWyd2ZWxvY2l0eSddKTtcclxuICAgIGlmIChwT0JKWydhY2NlbGVyYXRlJ10gIT09IHVuZGVmaW5lZClcclxuICAgICAgdGFyZ2V0LmFjY2VsZXJhdGlvbi5jb3B5KHBPQkpbJ2FjY2VsZXJhdGUnXSk7XHJcbiAgfSxcclxuXHJcbiAgLy9zZXQgcHJvdG90eXBlXHJcbiAgc2V0UHJvdG90eXBlQnlPYmo6IGZ1bmN0aW9uKHRhcmdldCwgcHJvT2JqLCBmaWx0ZXJzKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvT2JqKSB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcclxuICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgaWYgKGZpbHRlcnMpIHtcclxuICAgICAgICAgIGlmIChmaWx0ZXJzLmluZGV4T2Yoa2V5KSA8IDApXHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gdGhpcy5fZ2V0VmFsdWUocHJvT2JqW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHRoaXMuX2dldFZhbHVlKHByb09ialtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH0sXHJcblxyXG4gIF9nZXRWYWx1ZTogZnVuY3Rpb24ocGFuKSB7XHJcbiAgICBpZiAocGFuLmNvbnN0cnVjdG9yLnR5cGUgPT09ICdTcGFuJykgcmV0dXJuIHBhbi5nZXRWYWx1ZSgpO1xyXG4gICAgZWxzZSByZXR1cm4gcGFuO1xyXG4gIH0sXHJcbn07XHJcbiJdfQ==