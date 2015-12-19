import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  rotator2: 0,
  tagName: 'svg',
  classNames: 'rotator',
  width: 800,
  height: 800,

  didInsertElement: function (){
    this.draw();
  },

  draw: function (){
    var rotator = d3.select(".rotator");

    rotator
      .attr("height", this.get("height"))
      .attr("width", this.get("width"));

    var defs = rotator.append("defs");

    var defGobo1 = defs.append("pattern")
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
        .attr("xlink:href", "pinwheel-cw.png");

    var defGobo2 = defs.append("pattern")
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
        .attr("xlink:href", "pinwheel-ccw.png");

    var defBurt = defs.append("pattern")
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
    var groupGel = rotator.append("g")
      .attr("id", "group-gel")
      .attr("transform", "translate(400,400)");

    groupGel.append("clipPath")
      .attr("id", "cut-off-bottom")
      .append("rect")
        .attr("x", -400)
        .attr("y", 0)
        .attr("width", 800)
        .attr("height", 400);

    groupGel.append("circle")
      .attr("id", "circle-gel")
      .attr("r", 400)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("transform", "rotate(0)")
      .attr("clip-path", "url(#cut-off-bottom)")
      .style("fill", "#f00")
      .style("opacity", 1);

    var groupGobo1 = rotator.append("g")
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
          .attr("from", 360)
          .attr("to", 0)
          .attr("begin", 0)
          .attr("dur", "10s")
          .attr("repeatCount", "indefinite");

    var groupGobo2 = rotator.append("g")
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
          .attr("from", 360)
          .attr("to", 0)
          .attr("begin", 0)
          .attr("dur", "20s")
          .attr("repeatCount", "indefinite");

    var groupDiffuser = rotator.append("g")
      .attr("id", "group-diffuser")
      .attr("transform", "translate(400,400)")
      .append("circle")
        .attr("id", "circle-diffuser")
        .attr("r", 400)
        .attr("cx", 0)
        .attr("cy", 0)
        .style("fill", "#fff")
        .style("opacity", 0.1);

    var groupStage = rotator.append("g")
      .attr("id", "group-stage")
      .attr("transform", "translate(0,400)")
      .append("rect")
        .attr("id", "rect-stage")
        .attr("width", 800)
        .attr("height", 400)
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 0.8)
        .style("fill", "#000");


    var groupGnome = rotator.append("g")
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
