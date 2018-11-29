<template lang="pug">
  nav.navbar.is-primary(role='navigation', aria-label='main navigation')
    .navbar-brand
      a.navbar-item(href='#')
        img(src='@/assets/logo.png', width='28', height='28')
        | Anti Shoulder Surfing Attack Platform (ASSAP)
      a.navbar-burger.burger(@click="showNav = !showNav", :class="{ 'is-active': showNav }", role='button', aria-label='menu', aria-expanded='false')
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')
    .navbar-menu(:class="{ 'is-active': showNav }")
      .navbar-start
        a.navbar-item
          | Home
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-link
            | More
          .navbar-dropdown
            a.navbar-item
              | About
            a.navbar-item
              | Jobs
            a.navbar-item
              | Contact
            hr.navbar-divider
            a.navbar-item
              | Report an issue
      .navbar-end
        .navbar-item
          .buttons
            a.button.is-primary
              strong Sign up
            a.button.is-light
              | Log in
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
