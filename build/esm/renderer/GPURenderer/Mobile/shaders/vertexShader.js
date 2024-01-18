import { SIZE_ATTENUATION_FACTOR } from '../../common/shaders/constants';
export const vertexShader = () => {
  return `
    uniform sampler2D uTexture;
    uniform vec2 atlasDim;

    attribute float size;
    attribute vec3 color;
    attribute float alpha;
    attribute vec2 texID;
    attribute float rotation;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      targetColor = color;
      targetAlpha = alpha;
      vRotation = rotation;

      vec2 tmin = floor(texID) / atlasDim;
      vec2 tmax = fract(texID);
      tileRect = vec4(tmin,tmax);

      gl_PointSize = ((size * ${SIZE_ATTENUATION_FACTOR}) / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
`;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9Nb2JpbGUvc2hhZGVycy92ZXJ0ZXhTaGFkZXIuanMiXSwibmFtZXMiOlsiU0laRV9BVFRFTlVBVElPTl9GQUNUT1IiLCJ2ZXJ0ZXhTaGFkZXIiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLHVCQUFULFFBQXdDLGdDQUF4QztBQUVBLE9BQU8sTUFBTUMsWUFBWSxHQUFHLE1BQU07QUFDaEMsU0FBUTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQ0QsdUJBQXdCO0FBQ3hEO0FBQ0E7QUFDQSxDQTVCRTtBQTZCRCxDQTlCTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNJWkVfQVRURU5VQVRJT05fRkFDVE9SIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NoYWRlcnMvY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGBcclxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1xyXG4gICAgdW5pZm9ybSB2ZWMyIGF0bGFzRGltO1xyXG5cclxuICAgIGF0dHJpYnV0ZSBmbG9hdCBzaXplO1xyXG4gICAgYXR0cmlidXRlIHZlYzMgY29sb3I7XHJcbiAgICBhdHRyaWJ1dGUgZmxvYXQgYWxwaGE7XHJcbiAgICBhdHRyaWJ1dGUgdmVjMiB0ZXhJRDtcclxuICAgIGF0dHJpYnV0ZSBmbG9hdCByb3RhdGlvbjtcclxuXHJcbiAgICB2YXJ5aW5nIGZsb2F0IHZSb3RhdGlvbjtcclxuICAgIHZhcnlpbmcgdmVjMyB0YXJnZXRDb2xvcjtcclxuICAgIHZhcnlpbmcgZmxvYXQgdGFyZ2V0QWxwaGE7XHJcbiAgICB2YXJ5aW5nIHZlYzQgdGlsZVJlY3Q7XHJcblxyXG4gICAgdm9pZCBtYWluKCkge1xyXG4gICAgICB2ZWM0IG12UG9zaXRpb24gPSBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xyXG4gICAgICB0YXJnZXRDb2xvciA9IGNvbG9yO1xyXG4gICAgICB0YXJnZXRBbHBoYSA9IGFscGhhO1xyXG4gICAgICB2Um90YXRpb24gPSByb3RhdGlvbjtcclxuXHJcbiAgICAgIHZlYzIgdG1pbiA9IGZsb29yKHRleElEKSAvIGF0bGFzRGltO1xyXG4gICAgICB2ZWMyIHRtYXggPSBmcmFjdCh0ZXhJRCk7XHJcbiAgICAgIHRpbGVSZWN0ID0gdmVjNCh0bWluLHRtYXgpO1xyXG5cclxuICAgICAgZ2xfUG9pbnRTaXplID0gKChzaXplICogJHtTSVpFX0FUVEVOVUFUSU9OX0ZBQ1RPUn0pIC8gLW12UG9zaXRpb24ueik7XHJcbiAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG12UG9zaXRpb247XHJcbiAgICB9XHJcbmA7XHJcbn07XHJcbiJdfQ==