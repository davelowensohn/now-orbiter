import Ember from 'ember';
import d3 from 'd3';

export default Ember.Controller.extend({

  rotationDegrees: 0,
  uploadedImageBack: 'pinwheel-cw.png',
  uploadedImageFront: 'pinwheel-ccw.png',
  gobo1StartingDegrees: 360,
  gobo1EndingDegrees: 0,
  gobo2StartingDegrees: 360,
  gobo2EndingDegrees: 0,

    actions: {

      fileChanged: function(uploadedImage, layer){
        this.set(layer, uploadedImage);
      },

      reverseGobo1: function() {
        if (this.get('gobo1StartingDegrees') === 360) {
          this.set('gobo1StartingDegrees', 0);
          this.set('gobo1EndingDegrees', 360);
        } else {
          this.set('gobo1StartingDegrees', 360);
          this.set('gobo1EndingDegrees', 0);
        }
      },

      reverseGobo2: function() {
        if (this.get('gobo2StartingDegrees') === 360) {
          this.set('gobo2StartingDegrees', 0);
          this.set('gobo2EndingDegrees', 360);
        } else {
          this.set('gobo2StartingDegrees', 360);
          this.set('gobo2EndingDegrees', 0);
        }
      },

      rotateGel: function() {
        var rotationDegrees = (this.get('rotationDegrees') === 180) ? 0 : 180;
        this.set('rotationDegrees', rotationDegrees);

        d3.select('#circle-gel')
          .transition()
          .duration(750)
          .attr("transform", "rotate(" + rotationDegrees + ")");
      }
    }
});
