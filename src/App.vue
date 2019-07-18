<template>
  <div id="app">
    <nav-menu/>
    <div class="container content">
      <router-view/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
</script>

<style lang="scss">
/* @import './styles/gerdi.scss'; */
@import '~shared-ui/scss/gerdi.scss';
@import '~bootstrap/scss/bootstrap';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content { flex: 1; }
</style>
