import { MathUtils, createColorSpan } from '../math';
import Behaviour from './Behaviour';
import { ColorUtil } from '../utils';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_COLOR as type } from './types';
/**
 * A behaviour which mutates the color of a particle over time.
 *
 */

export default class Color extends Behaviour {
  /**
   * Constructs a Color behaviour instance.
   *
   * @param {number|string} colorA - the starting color
   * @param {number|string} colorB - the ending color
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(colorA, colorB, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(colorA, colorB);
  }
  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */


  get same() {
    return this._same;
  }
  /**
   * Sets the _same property which determines if the alpha are the same.
   *
   * @param {boolean} same
   * @return {boolean}
   */


  set same(same) {
    /**
     * @type {boolean}
     */
    this._same = same;
  }

  reset(colorA, colorB, life, easing) {
    this.same = colorB === null || colorB === undefined ? true : false;
    this.colorA = createColorSpan(colorA);
    this.colorB = createColorSpan(colorB);
    life && super.reset(life, easing);
  }

  initialize(particle) {
    particle.transform.colorA = ColorUtil.getRGB(this.colorA.getValue());
    particle.useColor = true;
    particle.transform.colorB = this.same ? particle.transform.colorA : ColorUtil.getRGB(this.colorB.getValue());
  }

  mutate(particle, time, index) {
    this.energize(particle, time, index);

    if (!this._same) {
      particle.color.r = MathUtils.lerp(particle.transform.colorA.r, particle.transform.colorB.r, this.energy);
      particle.color.g = MathUtils.lerp(particle.transform.colorA.g, particle.transform.colorB.g, this.energy);
      particle.color.b = MathUtils.lerp(particle.transform.colorA.b, particle.transform.colorB.b, this.energy);
    } else {
      particle.color.r = particle.transform.colorA.r;
      particle.color.g = particle.transform.colorA.g;
      particle.color.b = particle.transform.colorA.b;
    }
  }
  /**
   * Creates a Color initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.colorA - The starting color
   * @property {number} json.colorB - The ending color
   * @property {number} json.life - The life of the particle
   * @property {string} json.easing - The behaviour's decaying trend
   * @return {Color}
   */


  static fromJSON(json) {
    const {
      colorA,
      colorB,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Color(colorA, colorB, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQ29sb3IuanMiXSwibmFtZXMiOlsiTWF0aFV0aWxzIiwiY3JlYXRlQ29sb3JTcGFuIiwiQmVoYXZpb3VyIiwiQ29sb3JVdGlsIiwiZ2V0RWFzaW5nQnlOYW1lIiwiQkVIQVZJT1VSX1RZUEVfQ09MT1IiLCJ0eXBlIiwiQ29sb3IiLCJjb25zdHJ1Y3RvciIsImNvbG9yQSIsImNvbG9yQiIsImxpZmUiLCJlYXNpbmciLCJpc0VuYWJsZWQiLCJyZXNldCIsInNhbWUiLCJfc2FtZSIsInVuZGVmaW5lZCIsImluaXRpYWxpemUiLCJwYXJ0aWNsZSIsInRyYW5zZm9ybSIsImdldFJHQiIsImdldFZhbHVlIiwidXNlQ29sb3IiLCJtdXRhdGUiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsImNvbG9yIiwiciIsImxlcnAiLCJlbmVyZ3kiLCJnIiwiYiIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsU0FBVCxFQUFvQkMsZUFBcEIsUUFBMkMsU0FBM0M7QUFFQSxPQUFPQyxTQUFQLE1BQXNCLGFBQXRCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixVQUExQjtBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsU0FBaEM7QUFDQSxTQUFTQyxvQkFBb0IsSUFBSUMsSUFBakMsUUFBNkMsU0FBN0M7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLEtBQU4sU0FBb0JMLFNBQXBCLENBQThCO0FBQzNDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VNLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsTUFBdkIsRUFBK0JDLFNBQVMsR0FBRyxJQUEzQyxFQUFpRDtBQUMxRCxVQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JOLElBQXBCLEVBQTBCTyxTQUExQjtBQUVBLFNBQUtDLEtBQUwsQ0FBV0wsTUFBWCxFQUFt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Q0FBQ0MsU0FBVCxDQUFtQlgsTUFBbkIsQ0FBMEJ3QixDQUE3QztBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJDLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRTFCLE1BQUFBLE1BQUY7QUFBVUMsTUFBQUEsTUFBVjtBQUFrQkMsTUFBQUEsSUFBbEI7QUFBd0JDLE1BQUFBLE1BQXhCO0FBQWdDQyxNQUFBQSxTQUFTLEdBQUc7QUFBNUMsUUFBcURzQixJQUEzRDtBQUVBLFdBQU8sSUFBSTVCLEtBQUosQ0FBVUUsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLElBQTFCLEVBQWdDUCxlQUFlLENBQUNRLE1BQUQsQ0FBL0MsRUFBeURDLFNBQXpELENBQVA7QUFDRDs7QUFoRzBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0aFV0aWxzLCBjcmVhdGVDb2xvclNwYW4gfSBmcm9tICcuLi9tYXRoJztcclxuXHJcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xyXG5pbXBvcnQgeyBDb2xvclV0aWwgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xyXG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9DT0xPUiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQSBiZWhhdmlvdXIgd2hpY2ggbXV0YXRlcyB0aGUgY29sb3Igb2YgYSBwYXJ0aWNsZSBvdmVyIHRpbWUuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciBleHRlbmRzIEJlaGF2aW91ciB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIENvbG9yIGJlaGF2aW91ciBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gY29sb3JBIC0gdGhlIHN0YXJ0aW5nIGNvbG9yXHJcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBjb2xvckIgLSB0aGUgZW5kaW5nIGNvbG9yXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgcGFydGljbGVcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvbG9yQSwgY29sb3JCLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcclxuXHJcbiAgICB0aGlzLnJlc2V0KGNvbG9yQSwgY29sb3JCKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IHNhbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2FtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2FtZVxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgc2V0IHNhbWUoc2FtZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5fc2FtZSA9IHNhbWU7XHJcbiAgfVxyXG5cclxuICByZXNldChjb2xvckEsIGNvbG9yQiwgbGlmZSwgZWFzaW5nKSB7XHJcbiAgICB0aGlzLnNhbWUgPSBjb2xvckIgPT09IG51bGwgfHwgY29sb3JCID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgdGhpcy5jb2xvckEgPSBjcmVhdGVDb2xvclNwYW4oY29sb3JBKTtcclxuICAgIHRoaXMuY29sb3JCID0gY3JlYXRlQ29sb3JTcGFuKGNvbG9yQik7XHJcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XHJcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBID0gQ29sb3JVdGlsLmdldFJHQih0aGlzLmNvbG9yQS5nZXRWYWx1ZSgpKTtcclxuXHJcbiAgICBwYXJ0aWNsZS51c2VDb2xvciA9IHRydWU7XHJcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JCID0gdGhpcy5zYW1lXHJcbiAgICAgID8gcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQVxyXG4gICAgICA6IENvbG9yVXRpbC5nZXRSR0IodGhpcy5jb2xvckIuZ2V0VmFsdWUoKSk7XHJcbiAgfVxyXG5cclxuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XHJcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9zYW1lKSB7XHJcbiAgICAgIHBhcnRpY2xlLmNvbG9yLnIgPSBNYXRoVXRpbHMubGVycChcclxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBLnIsXHJcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQi5yLFxyXG4gICAgICAgIHRoaXMuZW5lcmd5XHJcbiAgICAgICk7XHJcbiAgICAgIHBhcnRpY2xlLmNvbG9yLmcgPSBNYXRoVXRpbHMubGVycChcclxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBLmcsXHJcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQi5nLFxyXG4gICAgICAgIHRoaXMuZW5lcmd5XHJcbiAgICAgICk7XHJcbiAgICAgIHBhcnRpY2xlLmNvbG9yLmIgPSBNYXRoVXRpbHMubGVycChcclxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBLmIsXHJcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQi5iLFxyXG4gICAgICAgIHRoaXMuZW5lcmd5XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJ0aWNsZS5jb2xvci5yID0gcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQS5yO1xyXG4gICAgICBwYXJ0aWNsZS5jb2xvci5nID0gcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQS5nO1xyXG4gICAgICBwYXJ0aWNsZS5jb2xvci5iID0gcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQS5iO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIENvbG9yIGluaXRpYWxpemVyIGZyb20gSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmNvbG9yQSAtIFRoZSBzdGFydGluZyBjb2xvclxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmNvbG9yQiAtIFRoZSBlbmRpbmcgY29sb3JcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5saWZlIC0gVGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGpzb24uZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXHJcbiAgICogQHJldHVybiB7Q29sb3J9XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHsgY29sb3JBLCBjb2xvckIsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcclxuXHJcbiAgICByZXR1cm4gbmV3IENvbG9yKGNvbG9yQSwgY29sb3JCLCBsaWZlLCBnZXRFYXNpbmdCeU5hbWUoZWFzaW5nKSwgaXNFbmFibGVkKTtcclxuICB9XHJcbn1cclxuIl19