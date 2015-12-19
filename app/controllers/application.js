import Ember from 'ember';
import d3 from 'd3';

export default Ember.Controller.extend({

  rotationDegrees: 0,

    actions: {

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
