import { RENDERER_TYPE_GPU_DESKTOP, RENDERER_TYPE_GPU_MOBILE } from '../../../types';
import { DATA_TEXTURE_SIZE } from './constants';
import { __DEV__ } from '../../../../constants';
import potpack from 'potpack';
/**
 * Dynamic texture atlas for performant support of systems with multiple emitters and textures.
 *
 */

export default class TextureAtlas {
  constructor(renderer, shouldDebug) {
    const {
      three: THREE,
      type: rendererType
    } = renderer;
    const data = new Float32Array(DATA_TEXTURE_SIZE * 4);
    const ctx = this.ctx = document.createElement('canvas').getContext('2d');
    const {
      canvas
    } = ctx;
    this.shouldDebug = shouldDebug;
    this.rendererType = rendererType;
    this.indexData = data;
    this.canvas = canvas;
    this.entries = [];

    if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
      this.atlasIndex = new THREE.DataTexture(data, DATA_TEXTURE_SIZE, 1, THREE.RGBAFormat, THREE.FloatType);
    }

    canvas.width = canvas.height = DATA_TEXTURE_SIZE;

    if (shouldDebug) {
      this.debug(canvas, ctx);
    }

    this.atlasTexture = new THREE.CanvasTexture(canvas);
    this.atlasTexture.flipY = false;
    renderer.material.uniforms.uTexture.value = this.atlasTexture;

    if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
      renderer.material.uniforms.atlasIndex.value = this.atlasIndex;
    }

    renderer.material.uniformsNeedUpdate = true;
  }
  /**
   * Logs to the console when in dev mode.
   *
   */


  log(...args) {
    if (!__DEV__) {
      return;
    }

    console.log(...args);
  }
  /**
   * Debugs the texture atlas by rendering it to a canvas in the DOM.
   *
   */


  debug() {
    const {
      canvas,
      ctx
    } = this;
    const halfmax = canvas.width;
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, halfmax, halfmax);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, halfmax, halfmax, halfmax);
    ctx.fillStyle = 'blue';
    ctx.fillRect(halfmax, 0, halfmax, halfmax);
    ctx.fillStyle = 'orange';
    ctx.fillRect(halfmax, halfmax, halfmax, halfmax);
    ctx.fillStyle = 'yellow';
    ctx.font = canvas.width + 'px Verdana';
    ctx.fillText('top row', 100, 500);
    ctx.fillStyle = 'pink';
    ctx.fillText('bottom row', 100, 1500);
    canvas.style.position = 'absolute';
    canvas.style.width = canvas.style.height = '300px';
    canvas.style.left = canvas.style.top = '0px';
    canvas.style.zIndex = 100;
    document.body.appendChild(canvas);
  }
  /**
   * Adds a texture to the texture atlas and flags that the atlas needs to be updated.
   *
   */


  addTexture(texture) {
    this.log('Adding texture to atlas:', texture.uuid);
    texture.textureIndex = this.entries.length;
    this.entries.push({
      texture: texture
    });
    this.needsUpdate = true;
  }
  /**
   * Updates the texture atlas. Will only rebuild the atlas if all images are loaded.
   *
   */


  update() {
    if (!this.needsUpdate) {
      return;
    }

    const {
      entries,
      canvas,
      indexData,
      ctx,
      atlasIndex,
      atlasTexture,
      rendererType
    } = this;

    for (let i = 0; i < entries.length; i++) {
      if (!entries[i].texture.image) {
        return;
      }
    }

    this.needsUpdate = false;

    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      const {
        texture
      } = e;
      const {
        width,
        height
      } = texture.image;
      e.w = width;
      e.h = height;
    }

    const stats = potpack(entries);
    this.log('Rebuilt atlas:', stats);

    if (canvas.width != stats.w || canvas.height != stats.h) {
      canvas.width = stats.w;
      canvas.height = stats.h;
    }

    for (let i = 0; i < entries.length; i++) {
      const e = this.entries[i];
      const ii = e.texture.textureIndex * 4;

      if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
        indexData[ii + 0] = e.x / canvas.width;
        indexData[ii + 1] = e.y / canvas.height;
        indexData[ii + 2] = (e.x + e.w) / canvas.width;
        indexData[ii + 3] = (e.y + e.h) / canvas.height;
      }

      if (rendererType === RENDERER_TYPE_GPU_MOBILE) {
        indexData[ii + 0] = e.x / (canvas.width + 1);
        indexData[ii + 1] = e.y / (canvas.height + 1);
        indexData[ii + 2] = (e.x + e.w) / (canvas.width + 1);
        indexData[ii + 3] = (e.y + e.h) / (canvas.height + 1);
      }

      ctx.drawImage(e.texture.image, e.x, e.y, e.w, e.h);
    }

    if (rendererType === RENDERER_TYPE_GPU_DESKTOP) {
      atlasIndex.needsUpdate = true;
    }

    atlasTexture.needsUpdate = true;
  }
  /**
   * Disposes of the textures used by the texture atlas.
   *
   * @return void
   */


  destroy() {
    const {
      atlasIndex,
      atlasTexture,
      canvas
    } = this;
    atlasTexture.dispose();
    atlasIndex && atlasIndex.dispose();

    if (this.shouldDebug) {
      canvas.remove();
    }

    this.entries = [];
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9jb21tb24vVGV4dHVyZUF0bGFzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJFTkRFUkVSX1RZUEVfR1BVX0RFU0tUT1AiLCJSRU5ERVJFUl9UWVBFX0dQVV9NT0JJTEUiLCJEQVRBX1RFWFRVUkVfU0laRSIsIl9fREVWX18iLCJwb3RwYWNrIiwiVGV4dHVyZUF0bGFzIiwiY29uc3RydWN0b3IiLCJyZW5kZXJlciIsInNob3VsZERlYnVnIiwidGhyZWUiLCJUSFJFRSIsInR5cGUiLCJyZW5kZXJlclR5cGUiLCJkYXRhIiwiRmxvYXQzMkFycmF5IiwiY3R4IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29udGV4dCIsImNhbnZhcyIsImluZGV4RGF0YSIsImVudHJpZXMiLCJhdGxhc0luZGV4IiwiRGF0YVRleHR1cmUiLCJSR0JBRm9ybWF0IiwiRmxvYXRUeXBlIiwid2lkdGgiLCJoZWlnaHQiLCJkZWJ1ZyIsImF0bGFzVGV4dHVyZSIsIkNhbnZhc1RleHR1cmUiLCJmbGlwWSIsIm1hdGVyaWFsIiwidW5pZm9ybXMiLCJ1VGV4dHVyZSIsInZhbHVlIiwidW5pZm9ybXNOZWVkVXBkYXRlIiwibG9nIiwiYXJncyIsImNvbnNvbGUiLCJoYWxmbWF4IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJzdHlsZSIsInBvc2l0aW9uIiwibGVmdCIsInRvcCIsInpJbmRleCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImFkZFRleHR1cmUiLCJ0ZXh0dXJlIiwidXVpZCIsInRleHR1cmVJbmRleCIsImxlbmd0aCIsInB1c2giLCJuZWVkc1VwZGF0ZSIsInVwZGF0ZSIsImkiLCJpbWFnZSIsImUiLCJ3IiwiaCIsInN0YXRzIiwiaWkiLCJ4IiwieSIsImRyYXdJbWFnZSIsImRlc3Ryb3kiLCJkaXNwb3NlIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUNF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QUEzQyxFQUE4Q0QsQ0FBQyxDQUFDRSxDQUFoRDtBQUNEOztBQUVELFFBQUlwRCxZQUFZLEtBQUtaLHlCQUFyQixFQUFnRDtBQUM5Q3NCLE1BQUFBLFVBQVUsQ0FBQ29DLFdBQVgsR0FBeUIsSUFBekI7QUFDRDs7QUFFRDdCLElBQUFBLFlBQVksQ0FBQzZCLFdBQWIsR0FBMkIsSUFBM0I7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFWSxFQUFBQSxPQUFPLEdBQUc7QUFDUixVQUFNO0FBQUVoRCxNQUFBQSxVQUFGO0FBQWNPLE1BQUFBLFlBQWQ7QUFBNEJWLE1BQUFBO0FBQTVCLFFBQXVDLElBQTdDO0FBRUFVLElBQUFBLFlBQVksQ0FBQzBDLE9BQWI7QUFDQWpELElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDaUQsT0FBWCxFQUFkOztBQUVBLFFBQUksS0FBSy9ELFdBQVQsRUFBc0I7QUFDcEJXLE1BQUFBLE1BQU0sQ0FBQ3FELE1BQVA7QUFDRDs7QUFFRCxTQUFLbkQsT0FBTCxHQUFlLEVBQWY7QUFDRDs7QUF4TCtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBSRU5ERVJFUl9UWVBFX0dQVV9ERVNLVE9QLFxyXG4gIFJFTkRFUkVSX1RZUEVfR1BVX01PQklMRSxcclxufSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XHJcblxyXG5pbXBvcnQgeyBEQVRBX1RFWFRVUkVfU0laRSB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgX19ERVZfXyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCBwb3RwYWNrIGZyb20gJ3BvdHBhY2snO1xyXG5cclxuLyoqXHJcbiAqIER5bmFtaWMgdGV4dHVyZSBhdGxhcyBmb3IgcGVyZm9ybWFudCBzdXBwb3J0IG9mIHN5c3RlbXMgd2l0aCBtdWx0aXBsZSBlbWl0dGVycyBhbmQgdGV4dHVyZXMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlQXRsYXMge1xyXG4gIGNvbnN0cnVjdG9yKHJlbmRlcmVyLCBzaG91bGREZWJ1Zykge1xyXG4gICAgY29uc3QgeyB0aHJlZTogVEhSRUUsIHR5cGU6IHJlbmRlcmVyVHlwZSB9ID0gcmVuZGVyZXI7XHJcbiAgICBjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShEQVRBX1RFWFRVUkVfU0laRSAqIDQpO1xyXG4gICAgY29uc3QgY3R4ID0gKHRoaXMuY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSk7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gY3R4O1xyXG5cclxuICAgIHRoaXMuc2hvdWxkRGVidWcgPSBzaG91bGREZWJ1ZztcclxuICAgIHRoaXMucmVuZGVyZXJUeXBlID0gcmVuZGVyZXJUeXBlO1xyXG4gICAgdGhpcy5pbmRleERhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmVudHJpZXMgPSBbXTtcclxuXHJcbiAgICBpZiAocmVuZGVyZXJUeXBlID09PSBSRU5ERVJFUl9UWVBFX0dQVV9ERVNLVE9QKSB7XHJcbiAgICAgIHRoaXMuYXRsYXNJbmRleCA9IG5ldyBUSFJFRS5EYXRhVGV4dHVyZShcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIERBVEFfVEVYVFVSRV9TSVpFLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgVEhSRUUuUkdCQUZvcm1hdCxcclxuICAgICAgICBUSFJFRS5GbG9hdFR5cGVcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMuaGVpZ2h0ID0gREFUQV9URVhUVVJFX1NJWkU7XHJcblxyXG4gICAgaWYgKHNob3VsZERlYnVnKSB7XHJcbiAgICAgIHRoaXMuZGVidWcoY2FudmFzLCBjdHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXRsYXNUZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcclxuICAgIHRoaXMuYXRsYXNUZXh0dXJlLmZsaXBZID0gZmFsc2U7XHJcblxyXG4gICAgcmVuZGVyZXIubWF0ZXJpYWwudW5pZm9ybXMudVRleHR1cmUudmFsdWUgPSB0aGlzLmF0bGFzVGV4dHVyZTtcclxuXHJcbiAgICBpZiAocmVuZGVyZXJUeXBlID09PSBSRU5ERVJFUl9UWVBFX0dQVV9ERVNLVE9QKSB7XHJcbiAgICAgIHJlbmRlcmVyLm1hdGVyaWFsLnVuaWZvcm1zLmF0bGFzSW5kZXgudmFsdWUgPSB0aGlzLmF0bGFzSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyZXIubWF0ZXJpYWwudW5pZm9ybXNOZWVkVXBkYXRlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvZ3MgdG8gdGhlIGNvbnNvbGUgd2hlbiBpbiBkZXYgbW9kZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIGxvZyguLi5hcmdzKSB7XHJcbiAgICBpZiAoIV9fREVWX18pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVidWdzIHRoZSB0ZXh0dXJlIGF0bGFzIGJ5IHJlbmRlcmluZyBpdCB0byBhIGNhbnZhcyBpbiB0aGUgRE9NLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZGVidWcoKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcywgY3R4IH0gPSB0aGlzO1xyXG4gICAgY29uc3QgaGFsZm1heCA9IGNhbnZhcy53aWR0aDtcclxuXHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ3B1cnBsZSc7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgaGFsZm1heCwgaGFsZm1heCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcclxuICAgIGN0eC5maWxsUmVjdCgwLCBoYWxmbWF4LCBoYWxmbWF4LCBoYWxmbWF4KTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XHJcbiAgICBjdHguZmlsbFJlY3QoaGFsZm1heCwgMCwgaGFsZm1heCwgaGFsZm1heCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ29yYW5nZSc7XHJcbiAgICBjdHguZmlsbFJlY3QoaGFsZm1heCwgaGFsZm1heCwgaGFsZm1heCwgaGFsZm1heCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ3llbGxvdyc7XHJcbiAgICBjdHguZm9udCA9IGNhbnZhcy53aWR0aCArICdweCBWZXJkYW5hJztcclxuICAgIGN0eC5maWxsVGV4dCgndG9wIHJvdycsIDEwMCwgNTAwKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSAncGluayc7XHJcbiAgICBjdHguZmlsbFRleHQoJ2JvdHRvbSByb3cnLCAxMDAsIDE1MDApO1xyXG5cclxuICAgIGNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzMwMHB4JztcclxuICAgIGNhbnZhcy5zdHlsZS5sZWZ0ID0gY2FudmFzLnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgY2FudmFzLnN0eWxlLnpJbmRleCA9IDEwMDtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgdGV4dHVyZSB0byB0aGUgdGV4dHVyZSBhdGxhcyBhbmQgZmxhZ3MgdGhhdCB0aGUgYXRsYXMgbmVlZHMgdG8gYmUgdXBkYXRlZC5cclxuICAgKlxyXG4gICAqL1xyXG4gIGFkZFRleHR1cmUodGV4dHVyZSkge1xyXG4gICAgdGhpcy5sb2coJ0FkZGluZyB0ZXh0dXJlIHRvIGF0bGFzOicsIHRleHR1cmUudXVpZCk7XHJcblxyXG4gICAgdGV4dHVyZS50ZXh0dXJlSW5kZXggPSB0aGlzLmVudHJpZXMubGVuZ3RoO1xyXG4gICAgdGhpcy5lbnRyaWVzLnB1c2goeyB0ZXh0dXJlOiB0ZXh0dXJlIH0pO1xyXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB0ZXh0dXJlIGF0bGFzLiBXaWxsIG9ubHkgcmVidWlsZCB0aGUgYXRsYXMgaWYgYWxsIGltYWdlcyBhcmUgbG9hZGVkLlxyXG4gICAqXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKCF0aGlzLm5lZWRzVXBkYXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGVudHJpZXMsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgaW5kZXhEYXRhLFxyXG4gICAgICBjdHgsXHJcbiAgICAgIGF0bGFzSW5kZXgsXHJcbiAgICAgIGF0bGFzVGV4dHVyZSxcclxuICAgICAgcmVuZGVyZXJUeXBlLFxyXG4gICAgfSA9IHRoaXM7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghZW50cmllc1tpXS50ZXh0dXJlLmltYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlID0gZW50cmllc1tpXTtcclxuICAgICAgY29uc3QgeyB0ZXh0dXJlIH0gPSBlO1xyXG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRleHR1cmUuaW1hZ2U7XHJcblxyXG4gICAgICBlLncgPSB3aWR0aDtcclxuICAgICAgZS5oID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXRzID0gcG90cGFjayhlbnRyaWVzKTtcclxuXHJcbiAgICB0aGlzLmxvZygnUmVidWlsdCBhdGxhczonLCBzdGF0cyk7XHJcblxyXG4gICAgaWYgKGNhbnZhcy53aWR0aCAhPSBzdGF0cy53IHx8IGNhbnZhcy5oZWlnaHQgIT0gc3RhdHMuaCkge1xyXG4gICAgICBjYW52YXMud2lkdGggPSBzdGF0cy53O1xyXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gc3RhdHMuaDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZSA9IHRoaXMuZW50cmllc1tpXTtcclxuICAgICAgY29uc3QgaWkgPSBlLnRleHR1cmUudGV4dHVyZUluZGV4ICogNDtcclxuXHJcbiAgICAgIGlmIChyZW5kZXJlclR5cGUgPT09IFJFTkRFUkVSX1RZUEVfR1BVX0RFU0tUT1ApIHtcclxuICAgICAgICBpbmRleERhdGFbaWkgKyAwXSA9IGUueCAvIGNhbnZhcy53aWR0aDtcclxuICAgICAgICBpbmRleERhdGFbaWkgKyAxXSA9IGUueSAvIGNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgaW5kZXhEYXRhW2lpICsgMl0gPSAoZS54ICsgZS53KSAvIGNhbnZhcy53aWR0aDtcclxuICAgICAgICBpbmRleERhdGFbaWkgKyAzXSA9IChlLnkgKyBlLmgpIC8gY2FudmFzLmhlaWdodDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlbmRlcmVyVHlwZSA9PT0gUkVOREVSRVJfVFlQRV9HUFVfTU9CSUxFKSB7XHJcbiAgICAgICAgaW5kZXhEYXRhW2lpICsgMF0gPSBlLnggLyAoY2FudmFzLndpZHRoICsgMSk7XHJcbiAgICAgICAgaW5kZXhEYXRhW2lpICsgMV0gPSBlLnkgLyAoY2FudmFzLmhlaWdodCArIDEpO1xyXG4gICAgICAgIGluZGV4RGF0YVtpaSArIDJdID0gKGUueCArIGUudykgLyAoY2FudmFzLndpZHRoICsgMSk7XHJcbiAgICAgICAgaW5kZXhEYXRhW2lpICsgM10gPSAoZS55ICsgZS5oKSAvIChjYW52YXMuaGVpZ2h0ICsgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN0eC5kcmF3SW1hZ2UoZS50ZXh0dXJlLmltYWdlLCBlLngsIGUueSwgZS53LCBlLmgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZW5kZXJlclR5cGUgPT09IFJFTkRFUkVSX1RZUEVfR1BVX0RFU0tUT1ApIHtcclxuICAgICAgYXRsYXNJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYXRsYXNUZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2VzIG9mIHRoZSB0ZXh0dXJlcyB1c2VkIGJ5IHRoZSB0ZXh0dXJlIGF0bGFzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGNvbnN0IHsgYXRsYXNJbmRleCwgYXRsYXNUZXh0dXJlLCBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgYXRsYXNUZXh0dXJlLmRpc3Bvc2UoKTtcclxuICAgIGF0bGFzSW5kZXggJiYgYXRsYXNJbmRleC5kaXNwb3NlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvdWxkRGVidWcpIHtcclxuICAgICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZW50cmllcyA9IFtdO1xyXG4gIH1cclxufVxyXG4iXX0=