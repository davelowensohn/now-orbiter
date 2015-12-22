import Ember from 'ember';
import d3 from 'd3';

export default Ember.Controller.extend({

  gelRotationDegrees: 0,
  uploadedImageBack: 'pinwheel-cw.png',
  uploadedImageFront: 'pinwheel-ccw.png',
  gobo1StartingDegrees: 360,
  gobo1EndingDegrees: 0,
  gobo1RotationSeconds: 20,
  gobo2StartingDegrees: 360,
  gobo2EndingDegrees: 0,
  gobo2RotationSeconds: 10,
  rainColor: 'rgba(255,255,255,0)',

  gobo1Direction: Ember.computed('gobo1StartingDegrees', function() {
    var directionString = (this.get('gobo1StartingDegrees') === 360) ? 'Counterclockwise' : 'Clockwise';
    return directionString;
  }),

  gobo2Direction: Ember.computed('gobo2StartingDegrees', function() {
    var directionString = (this.get('gobo2StartingDegrees') === 360) ? 'Counterclockwise' : 'Clockwise';
    return directionString;
  }),

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
        var gelRotationDegrees = (this.get('gelRotationDegrees') === 180) ? 0 : 180;
        this.set('gelRotationDegrees', gelRotationDegrees);

        d3.select('#circle-gel')
          .transition()
          .duration(750)
          .attr("transform", "rotate(" + gelRotationDegrees + ")");
      }
    }
});
