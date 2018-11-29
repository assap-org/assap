<template lang="pug">
  .home
    h1 This is a home page
    router-link(:to="{ name: 'about' }") About
    br/
    font-awesome-icon(:icon="['fas', 'spinner']")/
    font-awesome-icon(:icon="['fas', 'align-left']")/
</template>

<script>
export default {
  name: 'home'
}
</script>
