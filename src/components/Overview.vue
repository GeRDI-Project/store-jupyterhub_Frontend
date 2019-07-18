<template>
  <b-list-group>
    <download-item v-for="data in progressData" :title="data.fileName" :progress="data.progressInPercent" :state="data.state" :key="data.fileName"/>
  </b-list-group>
</template>

<script>
export default {
  name: 'Overview',
  data () {
    return {
      interval: {}
    }
  },
  computed: {
    progressData: function() {
      return this.$store.getters.getProgressData
    }
  },
  methods: {
    load() {
      const self = this
      var id = this.$route.params.sessionId
      this.$store.dispatch('updateProgress', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.progress-display {
  margin-top: 2rem;
}

</style>
