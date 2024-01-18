import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { DEFAULT_JSON_MATERIAL_PROPERTIES, DEFAULT_MATERIAL_PROPERTIES, SUPPORTED_MATERIAL_BLENDING_MODES } from './constants';
import Initializer from './Initializer';
import { INITIALIZER_TYPE_TEXTURE as type } from './types';
import { withDefaults } from '../utils';
/**
 * Sets the body property to be a THREE.Sprite with a texture map on initialized particles.
 *
 */

export default class Texture extends Initializer {
  /**
   * Constructs an Texture initializer.
   *
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} texture - The sprite texture
   * @param {object|undefined} materialProperties - The sprite material properties
   * @param {?Texture} loadedTexture - Preloaded THREE.Texture instance
   */
  constructor(THREE, loadedTexture, materialProperties = DEFAULT_MATERIAL_PROPERTIES, isEnabled = true) {
    super(type, isEnabled);
    const {
      Sprite,
      SpriteMaterial
    } = THREE;
    /**
     * @desc The material properties for this object's SpriteMaterial
     * NOTE This is required for testing purposes
     * @type {object}
     */

    this.materialProperties = withDefaults(DEFAULT_MATERIAL_PROPERTIES, materialProperties);
    /**
     * @desc The texture for the THREE.SpriteMaterial map.
     * @type {Texture}
     */

    this.texture = loadedTexture;
    /**
     * @desc THREE.SpriteMaterial instance.
     * @type {SpriteMaterial}
     */

    this.material = new SpriteMaterial(_objectSpread(_objectSpread({}, {
      map: loadedTexture
    }), this.materialProperties));
    /**
     * @desc THREE.Sprite instance.
     * @type {Sprite}
     */

    this.sprite = new Sprite(this.material);
  }
  /**
   * Sets the particle body to the sprite.
   *
   * @param {Particle} particle - The particle to set the body of
   * @return void
   */


  initialize(particle) {
    particle.body = this.sprite;
  }
  /**
   * Creates a Texture initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {Texture} json.loadedTexture - The loaded sprite texture
   * @param {object} json.materialProperties - The sprite material properties
   * @return {BodySprite}
   */


  static fromJSON(json, THREE) {
    const {
      loadedTexture,
      materialProperties = DEFAULT_JSON_MATERIAL_PROPERTIES,
      isEnabled = true
    } = json;

    const ensureMappedBlendingMode = properties => {
      const {
        blending
      } = properties;
      return _objectSpread(_objectSpread({}, properties), {}, {
        blending: blending ? SUPPORTED_MATERIAL_BLENDING_MODES[blending] : SUPPORTED_MATERIAL_BLENDING_MODES[DEFAULT_JSON_MATERIAL_PROPERTIES.blending]
      });
    };

    return new Texture(THREE, loadedTexture, withDefaults(DEFAULT_JSON_MATERIAL_PROPERTIES, ensureMappedBlendingMode(materialProperties)), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9UZXh0dXJlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTIiwiREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTIiwiU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTIiwiSW5pdGlhbGl6ZXIiLCJJTklUSUFMSVpFUl9UWVBFX1RFWFRVUkUiLCJ0eXBlIiwid2l0aERlZmF1bHRzIiwiVGV4dHVyZSIsImNvbnN0cnVjdG9yIiwiVEhSRUUiLCJsb2FkZWRUZXh0dXJlIiwibWF0ZXJpYWxQcm9wZXJ0aWVzIiwiaXNFbmFibGVkIiwiU3ByaXRlIiwiU3ByaXRlTWF0ZXJpYWwiLCJ0ZXh0dXJlIiwibWF0ZXJpYWwiLCJtYXAiLCJzcHJpdGUiLCJpbml0aWFsaXplIiwicGFydGljbGUiLCJib2R5IiwiZnJvbUpTT04iLCJqc29uIiwiZW5zdXJlTWFwcGVkQmxlbmRpbmdNb2RlIiwicHJvcGVydGllcyIsImJsZW5kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxTQUNFQSxnQ0FERixFQUVFQywyQkFGRixFQUdFQyxpQ0FIRixRQUlPLGFBSlA7QUFNQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0Msd0JBQXdCLElBQUlDLElBQXJDLFFBQWlELFNBQWpEO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixVQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsT0FBTixTQUFzQkosV0FBdEIsQ0FBa0M7QUFDL0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQ1RDLEtBRFMsRUFFVEMsYUFGUyxFQUdUQyxrQkFBa0IsR0FBR1YsMkJBSFosRUFJVFcsU0FBUyxHQUFHLElBSkgsRUFLVDtBQUNBLFVBQU1QLElBQU4sRUFBWU8sU0FBWjtBQUVBLFVBQU07QUFBRUMsTUFBQUEsTUFBRjtBQUFVQyxNQUFBQTtBQUFWLFFBQTZCTCxLQUFuQztBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0Usa0JBQUwsR0FBMEJMLFlBQVksQ0FDcENMLDJCQURvQyxFQUVwQ1Usa0JBRm9DLENBQXRDO0FBS0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0ksT0FBTCxHQUFlTCxhQUFmO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS00sUUFBTCxHQUFnQixJQUFJRixjQUFKLGlDQUNYO0FBQUVHLE1BQUFBLEdBQUcsRUFBRVA7QUFBUCxLQURXLEdBRVgsS0FBS0Msa0JBRk0sRUFBaEI7QUFLQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLTyxNQUFMLEdBQWMsSUFBSUwsTUFBSixDQUFXLEtBQUtHLFFBQWhCLENBQWQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CQSxJQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0IsS0FBS0gsTUFBckI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJJLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPZCxLQUFQLEVBQWM7QUFDM0IsVUFBTTtBQUNKQyxNQUFBQSxhQURJO0FBRUpDLE1BQUFBLGtCQUFrQixHQUFHWCxnQ0FGakI7QUFHSlksTUFBQUEsU0FBUyxHQUFHO0FBSFIsUUFJRlcsSUFKSjs7QUFNQSxVQUFNQyx3QkFBd0IsR0FBR0MsVUFBVSxJQUFJO0FBQzdDLFlBQU07QUFBRUMsUUFBQUE7QUFBRixVQUFlRCxVQUFyQjtBQUVBLDZDQUNLQSxVQURMO0FBRUVDLFFBQUFBLFFBQVEsRUFBRUEsUUFBUSxHQUNkeEIsaUNBQWlDLENBQUN3QixRQUFELENBRG5CLEdBRWR4QixpQ0FBaUMsQ0FDakNGLGdDQUFnQyxDQUFDMEIsUUFEQTtBQUp2QztBQVFELEtBWEQ7O0FBYUEsV0FBTyxJQUFJbkIsT0FBSixDQUNMRSxLQURLLEVBRUxDLGFBRkssRUFHTEosWUFBWSxDQUNWTixnQ0FEVSxFQUVWd0Isd0JBQXdCLENBQUNiLGtCQUFELENBRmQsQ0FIUCxFQU9MQyxTQVBLLENBQVA7QUFTRDs7QUFuRzhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBERUZBVUxUX0pTT05fTUFURVJJQUxfUFJPUEVSVElFUyxcclxuICBERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMsXHJcbiAgU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTLFxyXG59IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbmltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcclxuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9URVhUVVJFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgd2l0aERlZmF1bHRzIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGJvZHkgcHJvcGVydHkgdG8gYmUgYSBUSFJFRS5TcHJpdGUgd2l0aCBhIHRleHR1cmUgbWFwIG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHR1cmUgZXh0ZW5kcyBJbml0aWFsaXplciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhbiBUZXh0dXJlIGluaXRpYWxpemVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IFRIUkVFIC0gVGhlIFdlYiBHTCBBUEkgd2UgYXJlIHVzaW5nIGVnLiwgVEhSRUVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dHVyZSAtIFRoZSBzcHJpdGUgdGV4dHVyZVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fHVuZGVmaW5lZH0gbWF0ZXJpYWxQcm9wZXJ0aWVzIC0gVGhlIHNwcml0ZSBtYXRlcmlhbCBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIHs/VGV4dHVyZX0gbG9hZGVkVGV4dHVyZSAtIFByZWxvYWRlZCBUSFJFRS5UZXh0dXJlIGluc3RhbmNlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBUSFJFRSxcclxuICAgIGxvYWRlZFRleHR1cmUsXHJcbiAgICBtYXRlcmlhbFByb3BlcnRpZXMgPSBERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMsXHJcbiAgICBpc0VuYWJsZWQgPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIGNvbnN0IHsgU3ByaXRlLCBTcHJpdGVNYXRlcmlhbCB9ID0gVEhSRUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgbWF0ZXJpYWwgcHJvcGVydGllcyBmb3IgdGhpcyBvYmplY3QncyBTcHJpdGVNYXRlcmlhbFxyXG4gICAgICogTk9URSBUaGlzIGlzIHJlcXVpcmVkIGZvciB0ZXN0aW5nIHB1cnBvc2VzXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hdGVyaWFsUHJvcGVydGllcyA9IHdpdGhEZWZhdWx0cyhcclxuICAgICAgREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gICAgICBtYXRlcmlhbFByb3BlcnRpZXNcclxuICAgICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgdGV4dHVyZSBmb3IgdGhlIFRIUkVFLlNwcml0ZU1hdGVyaWFsIG1hcC5cclxuICAgICAqIEB0eXBlIHtUZXh0dXJlfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRleHR1cmUgPSBsb2FkZWRUZXh0dXJlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVEhSRUUuU3ByaXRlTWF0ZXJpYWwgaW5zdGFuY2UuXHJcbiAgICAgKiBAdHlwZSB7U3ByaXRlTWF0ZXJpYWx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgU3ByaXRlTWF0ZXJpYWwoe1xyXG4gICAgICAuLi57IG1hcDogbG9hZGVkVGV4dHVyZSB9LFxyXG4gICAgICAuLi50aGlzLm1hdGVyaWFsUHJvcGVydGllcyxcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVEhSRUUuU3ByaXRlIGluc3RhbmNlLlxyXG4gICAgICogQHR5cGUge1Nwcml0ZX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMubWF0ZXJpYWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgcGFydGljbGUgYm9keSB0byB0aGUgc3ByaXRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gc2V0IHRoZSBib2R5IG9mXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xyXG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMuc3ByaXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIFRleHR1cmUgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb21cclxuICAgKiBAcGFyYW0ge29iamVjdH0gVEhSRUUgLSBUaGUgV2ViIEdMIEFQSSB3ZSBhcmUgdXNpbmcgZWcuLCBUSFJFRVxyXG4gICAqIEBwYXJhbSB7VGV4dHVyZX0ganNvbi5sb2FkZWRUZXh0dXJlIC0gVGhlIGxvYWRlZCBzcHJpdGUgdGV4dHVyZVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uLm1hdGVyaWFsUHJvcGVydGllcyAtIFRoZSBzcHJpdGUgbWF0ZXJpYWwgcHJvcGVydGllc1xyXG4gICAqIEByZXR1cm4ge0JvZHlTcHJpdGV9XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24sIFRIUkVFKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGxvYWRlZFRleHR1cmUsXHJcbiAgICAgIG1hdGVyaWFsUHJvcGVydGllcyA9IERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gICAgICBpc0VuYWJsZWQgPSB0cnVlLFxyXG4gICAgfSA9IGpzb247XHJcblxyXG4gICAgY29uc3QgZW5zdXJlTWFwcGVkQmxlbmRpbmdNb2RlID0gcHJvcGVydGllcyA9PiB7XHJcbiAgICAgIGNvbnN0IHsgYmxlbmRpbmcgfSA9IHByb3BlcnRpZXM7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnByb3BlcnRpZXMsXHJcbiAgICAgICAgYmxlbmRpbmc6IGJsZW5kaW5nXHJcbiAgICAgICAgICA/IFNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFU1tibGVuZGluZ11cclxuICAgICAgICAgIDogU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTW1xyXG4gICAgICAgICAgICBERUZBVUxUX0pTT05fTUFURVJJQUxfUFJPUEVSVElFUy5ibGVuZGluZ1xyXG4gICAgICAgICAgXSxcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUZXh0dXJlKFxyXG4gICAgICBUSFJFRSxcclxuICAgICAgbG9hZGVkVGV4dHVyZSxcclxuICAgICAgd2l0aERlZmF1bHRzKFxyXG4gICAgICAgIERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gICAgICAgIGVuc3VyZU1hcHBlZEJsZW5kaW5nTW9kZShtYXRlcmlhbFByb3BlcnRpZXMpXHJcbiAgICAgICksXHJcbiAgICAgIGlzRW5hYmxlZFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19