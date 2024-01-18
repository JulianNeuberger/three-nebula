import { DATA_TEXTURE_SIZE } from '../../common/TextureAtlas/constants';
import { SIZE_ATTENUATION_FACTOR } from '../../common/shaders/constants';
export const vertexShader = () => {
  return `
    uniform sampler2D uTexture;
    //atlasIndex is a 256x1 float texture of tile rectangles as r=minx g=miny b=maxx a=maxy
    uniform sampler2D atlasIndex;

    attribute float size;
    attribute vec3 color;
    attribute float alpha;
    attribute float texID;
    attribute float rotation;

    varying float vRotation;
    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;
    varying float tileID;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      targetColor = color;
      targetAlpha = alpha;
      vRotation = rotation;

      tileID = texID;
      //get the tile rectangle from the atlasIndex texture..
      tileRect = texture2D(atlasIndex, vec2((tileID + 0.5) / ${DATA_TEXTURE_SIZE}.0, 0.5));

      gl_PointSize = ((size * ${SIZE_ATTENUATION_FACTOR}) / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
`;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIl0sIm5hbWVzIjpbIkRBVEFfVEVYVFVSRV9TSVpFIiwiU0laRV9BVFRFTlVBVElPTl9GQUNUT1IiLCJ2ZXJ0ZXhTaGFkZXIiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLGlCQUFULFFBQWtDLHFDQUFsQztBQUNBLFNBQVNDLHVCQUFULFFBQXdDLGdDQUF4QztBQUVBLE9BQU8sTUFBTUMsWUFBWSxHQUFHLE1BQU07QUFDaEMsU0FBUTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErREYsaUJBQWtCO0FBQ2pGO0FBQ0EsZ0NBQWdDQyx1QkFBd0I7QUFDeEQ7QUFDQTtBQUNBLENBOUJFO0FBK0JELENBaENNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgREFUQV9URVhUVVJFX1NJWkUgfSBmcm9tICcuLi8uLi9jb21tb24vVGV4dHVyZUF0bGFzL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNJWkVfQVRURU5VQVRJT05fRkFDVE9SIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NoYWRlcnMvY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGBcclxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1xyXG4gICAgLy9hdGxhc0luZGV4IGlzIGEgMjU2eDEgZmxvYXQgdGV4dHVyZSBvZiB0aWxlIHJlY3RhbmdsZXMgYXMgcj1taW54IGc9bWlueSBiPW1heHggYT1tYXh5XHJcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCBhdGxhc0luZGV4O1xyXG5cclxuICAgIGF0dHJpYnV0ZSBmbG9hdCBzaXplO1xyXG4gICAgYXR0cmlidXRlIHZlYzMgY29sb3I7XHJcbiAgICBhdHRyaWJ1dGUgZmxvYXQgYWxwaGE7XHJcbiAgICBhdHRyaWJ1dGUgZmxvYXQgdGV4SUQ7XHJcbiAgICBhdHRyaWJ1dGUgZmxvYXQgcm90YXRpb247XHJcblxyXG4gICAgdmFyeWluZyBmbG9hdCB2Um90YXRpb247XHJcbiAgICB2YXJ5aW5nIHZlYzMgdGFyZ2V0Q29sb3I7XHJcbiAgICB2YXJ5aW5nIGZsb2F0IHRhcmdldEFscGhhO1xyXG4gICAgdmFyeWluZyB2ZWM0IHRpbGVSZWN0O1xyXG4gICAgdmFyeWluZyBmbG9hdCB0aWxlSUQ7XHJcblxyXG4gICAgdm9pZCBtYWluKCkge1xyXG4gICAgICB2ZWM0IG12UG9zaXRpb24gPSBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xyXG4gICAgICB0YXJnZXRDb2xvciA9IGNvbG9yO1xyXG4gICAgICB0YXJnZXRBbHBoYSA9IGFscGhhO1xyXG4gICAgICB2Um90YXRpb24gPSByb3RhdGlvbjtcclxuXHJcbiAgICAgIHRpbGVJRCA9IHRleElEO1xyXG4gICAgICAvL2dldCB0aGUgdGlsZSByZWN0YW5nbGUgZnJvbSB0aGUgYXRsYXNJbmRleCB0ZXh0dXJlLi5cclxuICAgICAgdGlsZVJlY3QgPSB0ZXh0dXJlMkQoYXRsYXNJbmRleCwgdmVjMigodGlsZUlEICsgMC41KSAvICR7REFUQV9URVhUVVJFX1NJWkV9LjAsIDAuNSkpO1xyXG5cclxuICAgICAgZ2xfUG9pbnRTaXplID0gKChzaXplICogJHtTSVpFX0FUVEVOVUFUSU9OX0ZBQ1RPUn0pIC8gLW12UG9zaXRpb24ueik7XHJcbiAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG12UG9zaXRpb247XHJcbiAgICB9XHJcbmA7XHJcbn07XHJcbiJdfQ==