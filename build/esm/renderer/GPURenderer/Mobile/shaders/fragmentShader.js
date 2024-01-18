export const fragmentShader = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D uTexture;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;

    void main() {
      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);

      vec2 uv = gl_PointCoord;
      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);

      float mid = 0.5;
      uv = vec2(
        cos(vRotation) * (uv.x - mid) - sin(vRotation) * (uv.y - mid) + mid,
        cos(vRotation) * (uv.y - mid) + sin(vRotation) * (uv.x - mid) + mid
      );
      
      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);
    }
`;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9Nb2JpbGUvc2hhZGVycy9mcmFnbWVudFNoYWRlci5qcyJdLCJuYW1lcyI6WyJmcmFnbWVudFNoYWRlciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNQSxjQUFjLEdBQUcsTUFBTTtBQUNsQyxTQUFRO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQXZCRTtBQXdCRCxDQXpCTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmcmFnbWVudFNoYWRlciA9ICgpID0+IHtcclxuICByZXR1cm4gYFxyXG4gICAgdW5pZm9ybSB2ZWMzIGJhc2VDb2xvcjtcclxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1xyXG5cclxuICAgIHZhcnlpbmcgZmxvYXQgdlJvdGF0aW9uO1xyXG4gICAgdmFyeWluZyB2ZWMzIHRhcmdldENvbG9yO1xyXG4gICAgdmFyeWluZyBmbG9hdCB0YXJnZXRBbHBoYTtcclxuICAgIHZhcnlpbmcgdmVjNCB0aWxlUmVjdDtcclxuXHJcbiAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoYmFzZUNvbG9yICogdGFyZ2V0Q29sb3IsIHRhcmdldEFscGhhKTtcclxuXHJcbiAgICAgIHZlYzIgdXYgPSBnbF9Qb2ludENvb3JkO1xyXG4gICAgICB1diA9IG1peCh0aWxlUmVjdC54eSwgdGlsZVJlY3QuencsIGdsX1BvaW50Q29vcmQpO1xyXG5cclxuICAgICAgZmxvYXQgbWlkID0gMC41O1xyXG4gICAgICB1diA9IHZlYzIoXHJcbiAgICAgICAgY29zKHZSb3RhdGlvbikgKiAodXYueCAtIG1pZCkgLSBzaW4odlJvdGF0aW9uKSAqICh1di55IC0gbWlkKSArIG1pZCxcclxuICAgICAgICBjb3ModlJvdGF0aW9uKSAqICh1di55IC0gbWlkKSArIHNpbih2Um90YXRpb24pICogKHV2LnggLSBtaWQpICsgbWlkXHJcbiAgICAgICk7XHJcbiAgICAgIFxyXG4gICAgICBnbF9GcmFnQ29sb3IgPSBnbF9GcmFnQ29sb3IgKiB0ZXh0dXJlMkQodVRleHR1cmUsIHV2KTtcclxuICAgIH1cclxuYDtcclxufTtcclxuIl19