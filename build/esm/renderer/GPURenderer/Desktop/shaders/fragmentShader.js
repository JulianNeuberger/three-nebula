export const fragmentShader = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D uTexture;
    uniform sampler2D atlasIndex;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;
    varying float tileID;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL3NoYWRlcnMvZnJhZ21lbnRTaGFkZXIuanMiXSwibmFtZXMiOlsiZnJhZ21lbnRTaGFkZXIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTUEsY0FBYyxHQUFHLE1BQU07QUFDbEMsU0FBUTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0ExQkU7QUEyQkQsQ0E1Qk0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGBcclxuICAgIHVuaWZvcm0gdmVjMyBiYXNlQ29sb3I7XHJcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB1VGV4dHVyZTtcclxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIGF0bGFzSW5kZXg7XHJcblxyXG4gICAgdmFyeWluZyBmbG9hdCB2Um90YXRpb247XHJcbiAgICB2YXJ5aW5nIHZlYzMgdGFyZ2V0Q29sb3I7XHJcbiAgICB2YXJ5aW5nIGZsb2F0IHRhcmdldEFscGhhO1xyXG4gICAgdmFyeWluZyB2ZWM0IHRpbGVSZWN0O1xyXG4gICAgdmFyeWluZyBmbG9hdCB0aWxlSUQ7XHJcblxyXG4gICAgdm9pZCBtYWluKCkge1xyXG4gICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGJhc2VDb2xvciAqIHRhcmdldENvbG9yLCB0YXJnZXRBbHBoYSk7XHJcblxyXG4gICAgICB2ZWMyIHV2ID0gZ2xfUG9pbnRDb29yZDtcclxuICAgICAgdXYgPSBtaXgodGlsZVJlY3QueHksIHRpbGVSZWN0Lnp3LCBnbF9Qb2ludENvb3JkKTtcclxuXHJcbiAgICAgIGZsb2F0IG1pZCA9IDAuNTtcclxuICAgICAgdXYgPSB2ZWMyKFxyXG4gICAgICAgIGNvcyh2Um90YXRpb24pICogKHV2LnggLSBtaWQpIC0gc2luKHZSb3RhdGlvbikgKiAodXYueSAtIG1pZCkgKyBtaWQsXHJcbiAgICAgICAgY29zKHZSb3RhdGlvbikgKiAodXYueSAtIG1pZCkgKyBzaW4odlJvdGF0aW9uKSAqICh1di54IC0gbWlkKSArIG1pZFxyXG4gICAgICApO1xyXG5cclxuICAgICAgZ2xfRnJhZ0NvbG9yID0gZ2xfRnJhZ0NvbG9yICogdGV4dHVyZTJEKHVUZXh0dXJlLCB1dik7XHJcblxyXG4gICAgfVxyXG5gO1xyXG59O1xyXG4iXX0=