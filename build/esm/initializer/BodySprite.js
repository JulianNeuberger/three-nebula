import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { DEFAULT_JSON_MATERIAL_PROPERTIES, DEFAULT_MATERIAL_PROPERTIES, SUPPORTED_MATERIAL_BLENDING_MODES } from './constants';
import Initializer from './Initializer';
import { INITIALIZER_TYPE_BODY_SPRITE as type } from './types';
import { withDefaults } from '../utils';
/**
 * Sets the body property to be a THREE.Sprite on initialized particles.
 *
 * NOTE The texture map MUST be set on the SpriteMaterial in the TextureLoader.load
 * callback. Not doing so will cause WebGL buffer errors.
 */

export default class BodySprite extends Initializer {
  /**
   * Constructs a BodySprite initializer.
   *
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} texture - The sprite texture
   * @param {object} materialProperties - The sprite material properties
   * @throws {Error} If the TextureLoader fails to load the supplied texture
   * @return void
   */
  constructor(THREE, texture, materialProperties = DEFAULT_MATERIAL_PROPERTIES, isEnabled = true) {
    super(type, isEnabled);
    const {
      Sprite,
      SpriteMaterial,
      TextureLoader
    } = THREE;
    /**
     * @desc The material properties for this object's SpriteMaterial
     * NOTE This is required for testing purposes
     * @type {object}
     */

    this.materialProperties = withDefaults(DEFAULT_MATERIAL_PROPERTIES, materialProperties);
    new TextureLoader().load(texture, map => {
      /**
       * @desc The texture for the THREE.SpriteMaterial map.
       * @type {Texture}
       */
      this.texture = map;
      /**
       * @desc THREE.SpriteMaterial instance.
       * @type {SpriteMaterial}
       */

      this.material = new SpriteMaterial(_objectSpread(_objectSpread({}, {
        map
      }), this.materialProperties));
      /**
       * @desc THREE.Sprite instance.
       * @type {Sprite}
       */

      this.sprite = new Sprite(this.material);
    }, undefined, error => {
      throw new Error(error);
    });
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
   * Creates a BodySprite initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} json.texture - The sprite texture
   * @param {object} json.materialProperties - The sprite material properties
   * @return {BodySprite}
   */


  static fromJSON(json, THREE) {
    const {
      texture,
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

    return new BodySprite(THREE, texture, withDefaults(DEFAULT_JSON_MATERIAL_PROPERTIES, ensureMappedBlendingMode(materialProperties)), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Cb2R5U3ByaXRlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTIiwiREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTIiwiU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTIiwiSW5pdGlhbGl6ZXIiLCJJTklUSUFMSVpFUl9UWVBFX0JPRFlfU1BSSVRFIiwidHlwZSIsIndpdGhEZWZhdWx0cyIsIkJvZHlTcHJpdGUiLCJjb25zdHJ1Y3RvciIsIlRIUkVFIiwidGV4dHVyZSIsIm1hdGVyaWFsUHJvcGVydGllcyIsImlzRW5hYmxlZCIsIlNwcml0ZSIsIlNwcml0ZU1hdGVyaWFsIiwiVGV4dHVyZUxvYWRlciIsImxvYWQiLCJtYXAiLCJtYXRlcmlhbCIsInNwcml0ZSIsInVuZGVmaW5lZCIsImVycm9yIiwiRXJyb3IiLCJpbml0aWFsaXplIiwicGFydGljbGUiLCJib2R5IiwiZnJvbUpTT04iLCJqc29uIiwiZW5zdXJlTWFwcGVkQmxlbmRpbmdNb2RlIiwicHJvcGVydGllcyIsImJsZW5kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxTQUNFQSxnQ0FERixFQUVFQywyQkFGRixFQUdFQyxpQ0FIRixRQUlPLGFBSlA7QUFNQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0MsNEJBQTRCLElBQUlDLElBQXpDLFFBQXFELFNBQXJEO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixVQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLFVBQU4sU0FBeUJKLFdBQXpCLENBQXFDO0FBQ2xEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQ1RDLEtBRFMsRUFFVEMsT0FGUyxFQUdUQyxrQkFBa0IsR0FBR1YsMkJBSFosRUFJVFcsU0FBUyxHQUFHLElBSkgsRUFLVDtBQUNBLFVBQU1QLElBQU4sRUFBWU8sU0FBWjtBQUVBLFVBQU07QUFBRUMsTUFBQUEsTUFBRjtBQUFVQyxNQUFBQSxjQUFWO0FBQTBCQyxNQUFBQTtBQUExQixRQUE0Q04sS0FBbEQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUNJLFNBQUtFLGtCQUFMLEdBQTBCTCxZQUFZLENBQ3BDTCwyQkFEb0MsRUFFcENVLGtCQUZvQyxDQUF0QztBQUtBLFFBQUlJLGFBQUosR0FBb0JDLElBQXBCLENBQ0VOLE9BREYsRUFFRU8sR0FBRyxJQUFJO0FBQ0w7QUFDUjtBQUNBO0FBQ0E7QUFDUSxXQUFLUCxPQUFMLEdBQWVPLEdBQWY7QUFFQTtBQUNSO0FBQ0E7QUFDQTs7QUFDUSxXQUFLQyxRQUFMLEdBQWdCLElBQUlKLGNBQUosaUNBQ1g7QUFBRUcsUUFBQUE7QUFBRixPQURXLEdBRVgsS0FBS04sa0JBRk0sRUFBaEI7QUFLQTtBQUNSO0FBQ0E7QUFDQTs7QUFDUSxXQUFLUSxNQUFMLEdBQWMsSUFBSU4sTUFBSixDQUFXLEtBQUtLLFFBQWhCLENBQWQ7QUFDRCxLQXZCSCxFQXdCRUUsU0F4QkYsRUF5QkVDLEtBQUssSUFBSTtBQUNQLFlBQU0sSUFBSUMsS0FBSixDQUFVRCxLQUFWLENBQU47QUFDRCxLQTNCSDtBQTZCRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VFLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CQSxJQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0IsS0FBS04sTUFBckI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJPLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPbEIsS0FBUCxFQUFjO0FBQzNCLFVBQU07QUFDSkMsTUFBQUEsT0FESTtBQUVKQyxNQUFBQSxrQkFBa0IsR0FBR1gsZ0NBRmpCO0FBR0pZLE1BQUFBLFNBQVMsR0FBRztBQUhSLFFBSUZlLElBSko7O0FBTUEsVUFBTUMsd0JBQXdCLEdBQUdDLFVBQVUsSUFBSTtBQUM3QyxZQUFNO0FBQUVDLFFBQUFBO0FBQUYsVUFBZUQsVUFBckI7QUFFQSw2Q0FDS0EsVUFETDtBQUVFQyxRQUFBQSxRQUFRLEVBQUVBLFFBQVEsR0FDZDVCLGlDQUFpQyxDQUFDNEIsUUFBRCxDQURuQixHQUVkNUIsaUNBQWlDLENBQ2pDRixnQ0FBZ0MsQ0FBQzhCLFFBREE7QUFKdkM7QUFRRCxLQVhEOztBQWFBLFdBQU8sSUFBSXZCLFVBQUosQ0FDTEUsS0FESyxFQUVMQyxPQUZLLEVBR0xKLFlBQVksQ0FDVk4sZ0NBRFUsRUFFVjRCLHdCQUF3QixDQUFDakIsa0JBQUQsQ0FGZCxDQUhQLEVBT0xDLFNBUEssQ0FBUDtBQVNEOztBQTdHaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gIERFRkFVTFRfTUFURVJJQUxfUFJPUEVSVElFUyxcclxuICBTVVBQT1JURURfTUFURVJJQUxfQkxFTkRJTkdfTU9ERVMsXHJcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX0JPRFlfU1BSSVRFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgd2l0aERlZmF1bHRzIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGJvZHkgcHJvcGVydHkgdG8gYmUgYSBUSFJFRS5TcHJpdGUgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxyXG4gKlxyXG4gKiBOT1RFIFRoZSB0ZXh0dXJlIG1hcCBNVVNUIGJlIHNldCBvbiB0aGUgU3ByaXRlTWF0ZXJpYWwgaW4gdGhlIFRleHR1cmVMb2FkZXIubG9hZFxyXG4gKiBjYWxsYmFjay4gTm90IGRvaW5nIHNvIHdpbGwgY2F1c2UgV2ViR0wgYnVmZmVyIGVycm9ycy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHlTcHJpdGUgZXh0ZW5kcyBJbml0aWFsaXplciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIEJvZHlTcHJpdGUgaW5pdGlhbGl6ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gVEhSRUUgLSBUaGUgV2ViIEdMIEFQSSB3ZSBhcmUgdXNpbmcgZWcuLCBUSFJFRVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0dXJlIC0gVGhlIHNwcml0ZSB0ZXh0dXJlXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1hdGVyaWFsUHJvcGVydGllcyAtIFRoZSBzcHJpdGUgbWF0ZXJpYWwgcHJvcGVydGllc1xyXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgVGV4dHVyZUxvYWRlciBmYWlscyB0byBsb2FkIHRoZSBzdXBwbGllZCB0ZXh0dXJlXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBUSFJFRSxcclxuICAgIHRleHR1cmUsXHJcbiAgICBtYXRlcmlhbFByb3BlcnRpZXMgPSBERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMsXHJcbiAgICBpc0VuYWJsZWQgPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xyXG5cclxuICAgIGNvbnN0IHsgU3ByaXRlLCBTcHJpdGVNYXRlcmlhbCwgVGV4dHVyZUxvYWRlciB9ID0gVEhSRUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgbWF0ZXJpYWwgcHJvcGVydGllcyBmb3IgdGhpcyBvYmplY3QncyBTcHJpdGVNYXRlcmlhbFxyXG4gICAgICogTk9URSBUaGlzIGlzIHJlcXVpcmVkIGZvciB0ZXN0aW5nIHB1cnBvc2VzXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hdGVyaWFsUHJvcGVydGllcyA9IHdpdGhEZWZhdWx0cyhcclxuICAgICAgREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gICAgICBtYXRlcmlhbFByb3BlcnRpZXNcclxuICAgICk7XHJcblxyXG4gICAgbmV3IFRleHR1cmVMb2FkZXIoKS5sb2FkKFxyXG4gICAgICB0ZXh0dXJlLFxyXG4gICAgICBtYXAgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIFRoZSB0ZXh0dXJlIGZvciB0aGUgVEhSRUUuU3ByaXRlTWF0ZXJpYWwgbWFwLlxyXG4gICAgICAgICAqIEB0eXBlIHtUZXh0dXJlfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IG1hcDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgVEhSRUUuU3ByaXRlTWF0ZXJpYWwgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHR5cGUge1Nwcml0ZU1hdGVyaWFsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgU3ByaXRlTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgLi4ueyBtYXAgfSxcclxuICAgICAgICAgIC4uLnRoaXMubWF0ZXJpYWxQcm9wZXJ0aWVzLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBUSFJFRS5TcHJpdGUgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHR5cGUge1Nwcml0ZX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUodGhpcy5tYXRlcmlhbCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBwYXJ0aWNsZSBib2R5IHRvIHRoZSBzcHJpdGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBzZXQgdGhlIGJvZHkgb2ZcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5zcHJpdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgQm9keVNwcml0ZSBpbml0aWFsaXplciBmcm9tIEpTT04uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRoZSBXZWIgR0wgQVBJIHdlIGFyZSB1c2luZyBlZy4sIFRIUkVFXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGpzb24udGV4dHVyZSAtIFRoZSBzcHJpdGUgdGV4dHVyZVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uLm1hdGVyaWFsUHJvcGVydGllcyAtIFRoZSBzcHJpdGUgbWF0ZXJpYWwgcHJvcGVydGllc1xyXG4gICAqIEByZXR1cm4ge0JvZHlTcHJpdGV9XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24sIFRIUkVFKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRleHR1cmUsXHJcbiAgICAgIG1hdGVyaWFsUHJvcGVydGllcyA9IERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gICAgICBpc0VuYWJsZWQgPSB0cnVlLFxyXG4gICAgfSA9IGpzb247XHJcblxyXG4gICAgY29uc3QgZW5zdXJlTWFwcGVkQmxlbmRpbmdNb2RlID0gcHJvcGVydGllcyA9PiB7XHJcbiAgICAgIGNvbnN0IHsgYmxlbmRpbmcgfSA9IHByb3BlcnRpZXM7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnByb3BlcnRpZXMsXHJcbiAgICAgICAgYmxlbmRpbmc6IGJsZW5kaW5nXHJcbiAgICAgICAgICA/IFNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFU1tibGVuZGluZ11cclxuICAgICAgICAgIDogU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTW1xyXG4gICAgICAgICAgICBERUZBVUxUX0pTT05fTUFURVJJQUxfUFJPUEVSVElFUy5ibGVuZGluZ1xyXG4gICAgICAgICAgXSxcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb2R5U3ByaXRlKFxyXG4gICAgICBUSFJFRSxcclxuICAgICAgdGV4dHVyZSxcclxuICAgICAgd2l0aERlZmF1bHRzKFxyXG4gICAgICAgIERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxyXG4gICAgICAgIGVuc3VyZU1hcHBlZEJsZW5kaW5nTW9kZShtYXRlcmlhbFByb3BlcnRpZXMpXHJcbiAgICAgICksXHJcbiAgICAgIGlzRW5hYmxlZFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19