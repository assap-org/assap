<template lang="pug">
  .home
    h1 This is a home page
    router-link(:to="{ name: 'about' }") About
    Camera/
</template>

<script>
import Camera from '@/components/Camera';

export default {
  name: 'home',
  components: {
    Camera
  }
}
</script>
