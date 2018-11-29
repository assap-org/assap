<template lang="pug">
  .section
    video(id="camera", width="320", height="240", preload, autoplay, loop, muted)
    canvas(id="canvas", width="320", height="240")
</template>

<script>
  export default {
    name: 'camera',
    mounted() {
      const that = this;
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(2);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.17);
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      tracking.track('#camera', tracker, { camera: true });
      tracker.on('track', (event) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(event.data.length > 1){
          that.$toasted.error('¡Te están vigilando!');
        }
        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.lineWidth = 5;
        });
      });
    }
  }
</script>

<style lang="sass">
  video, canvas
    position: absolute
    margin: 0
</style>
