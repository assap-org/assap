<template lang="pug">
  nav.navbar.is-primary(role='navigation', aria-label='main navigation')
    .navbar-brand
      router-link.navbar-item(:to="{ name: 'home' }")
        img(src='@/assets/logo.png', width='28', height='28')
        | Anti Shoulder Surfing Attack Platform (ASSAP)
      a.navbar-burger.burger(@click="showNav = !showNav", :class="{ 'is-active': showNav }", role='button', aria-label='menu', aria-expanded='false')
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')
    .navbar-menu(:class="{ 'is-active': showNav }")
      .navbar-end
        .navbar-item
          .buttons
            router-link.is-primary(:to="{ name: 'config' }")
              font-awesome-icon(:icon="['fas', 'cog']")/
</template>

<script>

export default {
  name: 'Bar',
  data() {
    return {
      showNav: false
    }
  }
}
</script>
