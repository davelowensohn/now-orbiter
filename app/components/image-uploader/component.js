import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'file',
  layer: null,

  change: function(e) {
    let self = this;
    var layer = this.get('layer');

    var inputFiles = e.target.files;
    if (inputFiles.length < 1) {
      return;
    }

    let inputFile = inputFiles[0];

    let fileInfo = {
      name: inputFile.name,
      type: inputFile.type || 'n/a',
      size: inputFile.size,
      date: inputFile.lastModifiedDate ?
            inputFile.lastModifiedDate.toLocaleDateString() : 'n/a',
    };

    var fileReader = new FileReader();

    fileReader.onloadend = function(e) {
      let fileReader = e.target;
      fileInfo.dataURL = fileReader.result;

      self.sendAction('fileChanged', fileInfo.dataURL, layer);
    };

    var uploadedImage = fileReader.readAsDataURL(inputFile);
    // console.log("uploadedImage", uploadedImage);


    // let firstFile = e.target.files[0];
    // fileReader.readAsText(firstFile);
    // fileReader.readAsDataURL(firstFile);
  },
});
