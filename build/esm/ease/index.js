import { PI } from '../constants';
/**
 * The Ease class provides a collection of easing functions for use with System
 */

export const ease = {
  easeLinear: function (value) {
    return value;
  },
  easeInQuad: function (value) {
    return Math.pow(value, 2);
  },
  easeOutQuad: function (value) {
    return -(Math.pow(value - 1, 2) - 1);
  },
  easeInOutQuad: function (value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);
    return -0.5 * ((value -= 2) * value - 2);
  },
  easeInCubic: function (value) {
    return Math.pow(value, 3);
  },
  easeOutCubic: function (value) {
    return Math.pow(value - 1, 3) + 1;
  },
  easeInOutCubic: function (value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);
    return 0.5 * (Math.pow(value - 2, 3) + 2);
  },
  easeInQuart: function (value) {
    return Math.pow(value, 4);
  },
  easeOutQuart: function (value) {
    return -(Math.pow(value - 1, 4) - 1);
  },
  easeInOutQuart: function (value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);
    return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
  },
  easeInSine: function (value) {
    return -Math.cos(value * (PI / 2)) + 1;
  },
  easeOutSine: function (value) {
    return Math.sin(value * (PI / 2));
  },
  easeInOutSine: function (value) {
    return -0.5 * (Math.cos(PI * value) - 1);
  },
  easeInExpo: function (value) {
    return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
  },
  easeOutExpo: function (value) {
    return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
  },
  easeInOutExpo: function (value) {
    if (value === 0) return 0;
    if (value === 1) return 1;
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));
    return 0.5 * (-Math.pow(2, -10 * --value) + 2);
  },
  easeInCirc: function (value) {
    return -(Math.sqrt(1 - value * value) - 1);
  },
  easeOutCirc: function (value) {
    return Math.sqrt(1 - Math.pow(value - 1, 2));
  },
  easeInOutCirc: function (value) {
    if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
    return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
  },
  easeInBack: function (value) {
    var s = 1.70158;
    return value * value * ((s + 1) * value - s);
  },
  easeOutBack: function (value) {
    var s = 1.70158;
    return (value = value - 1) * value * ((s + 1) * value + s) + 1;
  },
  easeInOutBack: function (value) {
    var s = 1.70158;
    if ((value /= 0.5) < 1) return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
    return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
  }
};
export const {
  easeLinear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack
} = ease;
export const setEasingByName = easeName => {
  if (ease[easeName]) return ease[easeName];else return ease.easeLinear;
};
export const getEasingByName = name => ease[name] ? ease[name] : ease.easeLinear;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lYXNlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlBJIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJ2YWx1ZSIsImVhc2VJblF1YWQiLCJNYXRoIiwicG93IiwiZWFzZU91dFF1YWQiLCJlYXNlSW5PdXRRdWFkIiwiZWFzZUluQ3ViaWMiLCJlYXNlT3V0Q3ViaWMiLCJlYXNlSW5PdXRDdWJpYyIsImVhc2VJblF1YXJ0IiwiZWFzZU91dFF1YXJ0IiwiZWFzZUluT3V0UXVhcnQiLCJlYXNlSW5TaW5lIiwiY29zIiwiZWFzZU91dFNpbmUiLCJzaW4iLCJlYXNlSW5PdXRTaW5lIiwiZWFzZUluRXhwbyIsImVhc2VPdXRFeHBvIiwiZWFzZUluT3V0RXhwbyIsImVhc2VJbkNpcmMiLCJzcXJ0IiwiZWFzZU91dENpcmMiLCJlYXNlSW5PdXRDaXJjIiwiZWFzZUluQmFjayIsInMiLCJlYXNlT3V0QmFjayIsImVhc2VJbk91dEJhY2siLCJzZXRFYXNpbmdCeU5hbWUiLCJlYXNlTmFtZSIsImdldEVhc2luZ0J5TmFtZSIsIm5hbWUiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLEVBQVQsUUFBbUIsY0FBbkI7QUFFQTtBQUNBO0FBQ0E7O0FBQ0EsT0FBTyxNQUFNQyxJQUFJLEdBQUc7QUFDbEJDLEVBQUFBLFVBQVUsRUFBRSxVQUFTQyxLQUFULEVBQWdCO0FBQzFCLFdBQU9BLEtBQVA7QUFDRCxHQUhpQjtBQUtsQkMsRUFBQUEsVUFBVSxFQUFFLFVBQVNELEtBQVQsRUFBZ0I7QUFDMUIsV0FBT0UsSUFBSSxDQUFDQyxHQUFMLENBQVNILEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBUDtBQUNELEdBUGlCO0FBU2xCSSxFQUFBQSxXQUFXLEVBQUUsVUFBU0osS0FBVCxFQUFnQjtBQUMzQixXQUFPLEVBQUVFLElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxLQUFLLEdBQUcsQ0FBakIsRUFBb0IsQ0FBcEIsSUFBeUIsQ0FBM0IsQ0FBUDtBQUNELEdBWGlCO0FBYWxCSyxFQUFBQSxh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QixHQUE2QnlCLENBQXJELElBQTBELENBQWpFLENBQVA7QUFDRDtBQTVHaUIsQ0FBYjtBQStHUCxPQUFPLE1BQU07QUFDWDFCLEVBQUFBLFVBRFc7QUFFWEUsRUFBQUEsVUFGVztBQUdYRyxFQUFBQSxXQUhXO0FBSVhDLEVBQUFBLGFBSlc7QUFLWEMsRUFBQUEsV0FMVztBQU1YQyxFQUFBQSxZQU5XO0FBT1hDLEVBQUFBLGNBUFc7QUFRWEMsRUFBQUEsV0FSVztBQVNYQyxFQUFBQSxZQVRXO0FBVVhDLEVBQUFBLGNBVlc7QUFXWEMsRUFBQUEsVUFYVztBQVlYRSxFQUFBQSxXQVpXO0FBYVhFLEVBQUFBLGFBYlc7QUFjWEMsRUFBQUEsVUFkVztBQWVYQyxFQUFBQSxXQWZXO0FBZ0JYQyxFQUFBQSxhQWhCVztBQWlCWEMsRUFBQUEsVUFqQlc7QUFrQlhFLEVBQUFBLFdBbEJXO0FBbUJYQyxFQUFBQSxhQW5CVztBQW9CWEMsRUFBQUEsVUFwQlc7QUFxQlhFLEVBQUFBLFdBckJXO0FBc0JYQyxFQUFBQTtBQXRCVyxJQXVCVDdCLElBdkJHO0FBeUJQLE9BQU8sTUFBTThCLGVBQWUsR0FBR0MsUUFBUSxJQUFJO0FBQ3pDLE1BQUkvQixJQUFJLENBQUMrQixRQUFELENBQVIsRUFBb0IsT0FBTy9CLElBQUksQ0FBQytCLFFBQUQsQ0FBWCxDQUFwQixLQUNLLE9BQU8vQixJQUFJLENBQUNDLFVBQVo7QUFDTixDQUhNO0FBS1AsT0FBTyxNQUFNK0IsZUFBZSxHQUFHQyxJQUFJLElBQ2pDakMsSUFBSSxDQUFDaUMsSUFBRCxDQUFKLEdBQWFqQyxJQUFJLENBQUNpQyxJQUFELENBQWpCLEdBQTBCakMsSUFBSSxDQUFDQyxVQUQxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBJIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRWFzZSBjbGFzcyBwcm92aWRlcyBhIGNvbGxlY3Rpb24gb2YgZWFzaW5nIGZ1bmN0aW9ucyBmb3IgdXNlIHdpdGggU3lzdGVtXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZWFzZSA9IHtcclxuICBlYXNlTGluZWFyOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VJblF1YWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDIpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VPdXRRdWFkOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCAyKSAtIDEpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VJbk91dFF1YWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDIpO1xyXG5cclxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlIC0gMik7XHJcbiAgfSxcclxuXHJcbiAgZWFzZUluQ3ViaWM6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDMpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VPdXRDdWJpYzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSAtIDEsIDMpICsgMTtcclxuICB9LFxyXG5cclxuICBlYXNlSW5PdXRDdWJpYzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMyk7XHJcblxyXG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdyh2YWx1ZSAtIDIsIDMpICsgMik7XHJcbiAgfSxcclxuXHJcbiAgZWFzZUluUXVhcnQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDQpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VPdXRRdWFydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgNCkgLSAxKTtcclxuICB9LFxyXG5cclxuICBlYXNlSW5PdXRRdWFydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgNCk7XHJcblxyXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogTWF0aC5wb3codmFsdWUsIDMpIC0gMik7XHJcbiAgfSxcclxuXHJcbiAgZWFzZUluU2luZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiAtTWF0aC5jb3ModmFsdWUgKiAoUEkgLyAyKSkgKyAxO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VPdXRTaW5lOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIE1hdGguc2luKHZhbHVlICogKFBJIC8gMikpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VJbk91dFNpbmU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gLTAuNSAqIChNYXRoLmNvcyhQSSAqIHZhbHVlKSAtIDEpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VJbkV4cG86IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XHJcbiAgfSxcclxuXHJcbiAgZWFzZU91dEV4cG86IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHZhbHVlKSArIDE7XHJcbiAgfSxcclxuXHJcbiAgZWFzZUluT3V0RXhwbzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIDA7XHJcbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiAxO1xyXG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xyXG5cclxuICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdmFsdWUpICsgMik7XHJcbiAgfSxcclxuXHJcbiAgZWFzZUluQ2lyYzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcclxuICB9LFxyXG5cclxuICBlYXNlT3V0Q2lyYzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VJbk91dENpcmM6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XHJcblxyXG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh2YWx1ZSAtPSAyKSAqIHZhbHVlKSArIDEpO1xyXG4gIH0sXHJcblxyXG4gIGVhc2VJbkJhY2s6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlIC0gcyk7XHJcbiAgfSxcclxuXHJcbiAgZWFzZU91dEJhY2s6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB2YXIgcyA9IDEuNzAxNTg7XHJcblxyXG4gICAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlIC0gMSkgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgKyBzKSArIDE7XHJcbiAgfSxcclxuXHJcbiAgZWFzZUluT3V0QmFjazogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHZhciBzID0gMS43MDE1ODtcclxuXHJcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKVxyXG4gICAgICByZXR1cm4gMC41ICogKHZhbHVlICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgLSBzKSk7XHJcblxyXG4gICAgcmV0dXJuIDAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSArIHMpICsgMik7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHtcclxuICBlYXNlTGluZWFyLFxyXG4gIGVhc2VJblF1YWQsXHJcbiAgZWFzZU91dFF1YWQsXHJcbiAgZWFzZUluT3V0UXVhZCxcclxuICBlYXNlSW5DdWJpYyxcclxuICBlYXNlT3V0Q3ViaWMsXHJcbiAgZWFzZUluT3V0Q3ViaWMsXHJcbiAgZWFzZUluUXVhcnQsXHJcbiAgZWFzZU91dFF1YXJ0LFxyXG4gIGVhc2VJbk91dFF1YXJ0LFxyXG4gIGVhc2VJblNpbmUsXHJcbiAgZWFzZU91dFNpbmUsXHJcbiAgZWFzZUluT3V0U2luZSxcclxuICBlYXNlSW5FeHBvLFxyXG4gIGVhc2VPdXRFeHBvLFxyXG4gIGVhc2VJbk91dEV4cG8sXHJcbiAgZWFzZUluQ2lyYyxcclxuICBlYXNlT3V0Q2lyYyxcclxuICBlYXNlSW5PdXRDaXJjLFxyXG4gIGVhc2VJbkJhY2ssXHJcbiAgZWFzZU91dEJhY2ssXHJcbiAgZWFzZUluT3V0QmFja1xyXG59ID0gZWFzZTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRFYXNpbmdCeU5hbWUgPSBlYXNlTmFtZSA9PiB7XHJcbiAgaWYgKGVhc2VbZWFzZU5hbWVdKSByZXR1cm4gZWFzZVtlYXNlTmFtZV07XHJcbiAgZWxzZSByZXR1cm4gZWFzZS5lYXNlTGluZWFyO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEVhc2luZ0J5TmFtZSA9IG5hbWUgPT5cclxuICBlYXNlW25hbWVdID8gZWFzZVtuYW1lXSA6IGVhc2UuZWFzZUxpbmVhcjtcclxuIl19