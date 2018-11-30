<template lang="pug">
  .section
    video(id="camera", width="270", height="150", preload, autoplay, loop, muted)
    canvas(id="canvas", width="270", height="150")
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
          new Notification('¡Alerta!', {
            body: '¿No te sientes observado?',
          });
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
    padding: 0
    top: 0
    left: 0
    width: 270px
    height: 150px
</style>
