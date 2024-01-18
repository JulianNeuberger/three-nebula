/**
 * You can use this emit particles.
 *
 * This method will console.log the fixed number of your info  in updata or requestAnimationFrame
 *
 * use like this log('+12',mc); log 12 times
 *
 * @return void
 */
export default function () {
  let once = 0;

  if (window.console && window.console.trace) {
    var arg = Array.prototype.slice.call(arguments);
    var s1 = arguments[0] + '';

    if (s1.indexOf('+') == 0) {
      var n = parseInt(arguments[0]);

      if (once < n) {
        arg.shift();
        console.trace.apply(console, arg);
        once++;
      }
    } else {
      arg.unshift('+15');
      this.apply(console, arg);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWJ1Zy9sb2cuanMiXSwibmFtZXMiOlsib25jZSIsIndpbmRvdyIsImNvbnNvbGUiLCJ0cmFjZSIsImFyZyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiczEiLCJpbmRleE9mIiwibiIsInBhcnNlSW50Iiwic2hpZnQiLCJhcHBseSIsInVuc2hpZnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBVztBQUN4QixNQUFJQSxJQUFJLEdBQUcsQ0FBWDs7QUFFQSxNQUFJQyxNQUFNLENBQUNDLE9BQVAsSUFBa0JELE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxLQUFyQyxFQUE0QztBQUMxQyxRQUFJQyxHQUFHLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixDQUFWO0FBQ0EsUUFBSUMsRUFBRSxHQUFHRCxTQUFTLENBQUMsQ0FBRCxDQUFULEdBQWUsRUFBeEI7O0FBRUEsUUFBSUMsRUFBRSxDQUFDQyxPQUFILENBQVcsR0FBWCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixVQUFJQyxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0osU0FBUyxDQUFDLENBQUQsQ0FBVixDQUFoQjs7QUFFQSxVQUFJVCxJQUFJLEdBQUdZLENBQVgsRUFBYztBQUNaUixRQUFBQSxHQUFHLENBQUNVLEtBQUo7QUFDQVosUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNZLEtBQWQsQ0FBb0JiLE9BQXBCLEVBQTZCRSxHQUE3QjtBQUNBSixRQUFBQSxJQUFJO0FBQ0w7QUFDRixLQVJELE1BUU87QUFDTEksTUFBQUEsR0FBRyxDQUFDWSxPQUFKLENBQVksS0FBWjtBQUNBLFdBQUtELEtBQUwsQ0FBV2IsT0FBWCxFQUFvQkUsR0FBcEI7QUFDRDtBQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogWW91IGNhbiB1c2UgdGhpcyBlbWl0IHBhcnRpY2xlcy5cclxuICpcclxuICogVGhpcyBtZXRob2Qgd2lsbCBjb25zb2xlLmxvZyB0aGUgZml4ZWQgbnVtYmVyIG9mIHlvdXIgaW5mbyAgaW4gdXBkYXRhIG9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gKlxyXG4gKiB1c2UgbGlrZSB0aGlzIGxvZygnKzEyJyxtYyk7IGxvZyAxMiB0aW1lc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBvbmNlID0gMDtcclxuXHJcbiAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRyYWNlKSB7XHJcbiAgICB2YXIgYXJnID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgIHZhciBzMSA9IGFyZ3VtZW50c1swXSArICcnO1xyXG5cclxuICAgIGlmIChzMS5pbmRleE9mKCcrJykgPT0gMCkge1xyXG4gICAgICB2YXIgbiA9IHBhcnNlSW50KGFyZ3VtZW50c1swXSk7XHJcblxyXG4gICAgICBpZiAob25jZSA8IG4pIHtcclxuICAgICAgICBhcmcuc2hpZnQoKTtcclxuICAgICAgICBjb25zb2xlLnRyYWNlLmFwcGx5KGNvbnNvbGUsIGFyZyk7XHJcbiAgICAgICAgb25jZSsrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcmcudW5zaGlmdCgnKzE1Jyk7XHJcbiAgICAgIHRoaXMuYXBwbHkoY29uc29sZSwgYXJnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19