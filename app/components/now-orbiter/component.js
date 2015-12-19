import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  rotator2: 0,
  tagName: 'svg',
  classNames: 'rotator',
  width: 800,
  height: 800,
  uploadedImageBack: null,
  uploadedImageFront: null,

  gobo1StartingDegrees: null,
  gobo1EndingDegrees: null,
  gobo2StartingDegrees: null,
  gobo2EndingDegrees: null,

  didInsertElement: function (){
    this.draw();
  },

  gobo1RotationDidUpdate: Ember.observer('gobo1StartingDegrees', 'gobo1EndingDegrees', function (){
    this.groupGobo1.attr("from", this.get('gobo1StartingDegrees'));
    this.groupGobo1.attr("to", this.get('gobo1EndingDegrees'));
  }),

  gobo2RotationDidUpdate: Ember.observer('gobo2StartingDegrees', 'gobo2EndingDegrees', function (){
    this.groupGobo2.attr("from", this.get('gobo2StartingDegrees'));
    this.groupGobo2.attr("to", this.get('gobo2EndingDegrees'));
  }),

  backImageDidUpdate: Ember.observer('uploadedImageBack', function (){
    console.log('dataDidUpdate! ', this.get('uploadedImageBack'));
    this.defGobo1.attr("xlink:href", this.get('uploadedImageBack'));
  }),

  frontImageDidUpdate: Ember.observer('uploadedImageFront', function (){
    console.log('dataDidUpdate! ', this.get('uploadedImageFront'));
    this.defGobo2.attr("xlink:href", this.get('uploadedImageFront'));
  }),

  draw: function (){
    var rotator = d3.select(".rotator");

    rotator
      .attr("height", this.get("height"))
      .attr("width", this.get("width"));

    var defs = rotator.append("defs");

    this.defGobo1 = defs.append("pattern")
      .attr("id", "def-gobo1")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 1)
      .attr("width", 1)
      .append("image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 800)
        .attr("height", 800)
        .attr("xlink:href", this.get('uploadedImageBack'));

    this.defGobo2 = defs.append("pattern")
      .attr("id", "def-gobo2")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 1)
      .attr("width", 1)
      .append("image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 800)
        .attr("height", 800)
        .attr("xlink:href", this.get('uploadedImageFront'));

    this.defBurt = defs.append("pattern")
      .attr("id", "def-burt")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 1)
      .attr("width", 1)
      .append("image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 400)
        .attr("height", 225)
        .attr("xlink:href", "burt.png");

    // Two-tone gel
    this.groupGel = rotator.append("g")
      .attr("id", "group-gel")
      .attr("transform", "translate(400,400)");

    this.groupGel.append("clipPath")
      .attr("id", "cut-off-bottom")
      .append("rect")
        .attr("x", -400)
        .attr("y", 0)
        .attr("width", 800)
        .attr("height", 400);

    this.groupGel.append("circle")
      .attr("id", "circle-gel")
      .attr("r", 400)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("transform", "rotate(0)")
      .attr("clip-path", "url(#cut-off-bottom)")
      .style("fill", "#f00")
      .style("opacity", 1);

    this.groupGobo1 = rotator.append("g")
      .attr("id", "group-gobo1")
      .attr("transform", "translate(400,400)")
      .append("circle")
        .attr("id", "circle-gobo1")
        .attr("r", 400)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("transform", "rotate(180)")
        .style("fill", "url(#def-gobo1)")
        .style("opacity", 1)
        .append("animateTransform")
          .attr("attributeType", "xml")
          .attr("attributeName", "transform")
          .attr("type", "rotate")
          .attr("from", this.get('gobo1StartingDegrees'))
          .attr("to", this.get('gobo1EndingDegrees'))
          .attr("begin", 0)
          .attr("dur", "10s")
          .attr("repeatCount", "indefinite");

    this.groupGobo2 = rotator.append("g")
      .attr("id", "group-gobo2")
      .attr("transform", "translate(400,400)")
      .append("circle")
        .attr("id", "circle-gobo1")
        .attr("r", 400)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("transform", "rotate(180)")
        .style("fill", "url(#def-gobo2)")
        .style("opacity", 1)
        .append("animateTransform")
          .attr("attributeType", "xml")
          .attr("attributeName", "transform")
          .attr("type", "rotate")
          .attr("from", this.get('gobo2StartingDegrees'))
          .attr("to", this.get('gobo2EndingDegrees'))
          .attr("begin", 0)
          .attr("dur", "20s")
          .attr("repeatCount", "indefinite");

    this.groupDiffuser = rotator.append("g")
      .attr("id", "group-diffuser")
      .attr("transform", "translate(400,400)")
      .append("circle")
        .attr("id", "circle-diffuser")
        .attr("r", 400)
        .attr("cx", 0)
        .attr("cy", 0)
        .style("fill", "#fff")
        .style("opacity", 0.1);

    this.groupStage = rotator.append("g")
      .attr("id", "group-stage")
      .attr("transform", "translate(0,400)")
      .append("rect")
        .attr("id", "rect-stage")
        .attr("width", 800)
        .attr("height", 400)
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 1)
        .style("fill", "#999");

    this.groupGnome = rotator.append("g")
      .attr("id", "group-gnome")
      .attr("transform", "translate(200,300)")
      .append("rect")
        .attr("id", "rect-gnome")
        .attr("width", 400)
        .attr("height", 225)
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "url(#def-burt)");
  },

});
