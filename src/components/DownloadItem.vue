<template>
  <b-list-group-item>
    {{ title }}
    <b-progress :variant="variant" :animated="state == 'RUNNING' || state == 'PENDING' || state == 'UNKNOWN_SIZE'" >
      <b-progress-bar :value="realProgress" :label="translatedLabel">
      </b-progress-bar>
    </b-progress>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'DownloadItem',
  props: ['title', 'progress', 'state'],
  data () {
    return {}
  },
  computed: {
    variant: function() {
      if (this.state == 'UNKNOWN_SIZE') return 'warning'
      if (this.state == 'ERROR') return 'danger'
      if (this.state == 'FINISHED') return 'success'
      if (this.state == 'RUNNING' || this.state == 'PENDING') return 'info'
      return 'success'
    },
    realProgress: function() {
      return (this.state == 'UNKNOWN_SIZE' || this.state == 'ERROR') ? 100 : this.progress
    },
    translatedLabel: function() {
      if (this.state == 'UNKNOWN_SIZE') {
        return 'Unknown Size'
      } else if (this.state == 'ERROR') {
        return 'Error'
      } else {
        return this.progress.toString()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
