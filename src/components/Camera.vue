<template lang="pug">
  video(id="camera")
</template>

<script>
  export default {
    name: 'camera',
    mounted() {
      navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
          document.getElementById('camera').srcObject = stream;
        }).catch(() => {
          console.error('There was an error!');
        });
    }
  }
</script>
