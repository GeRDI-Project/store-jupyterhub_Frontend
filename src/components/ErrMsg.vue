<template>
  <div>
    <slot>The server returned an unexpected response. Please go to Bookmark and try it again.</slot>
    <div class="mt-3">
      <b-btn v-if="showContact" :href="mailLink" variant="link">Contact us</b-btn>
      <b-btn v-if="showBookmark" href="/bookmark" variant="primary">Go to Bookmark</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrMsg',
  props: {
    showContact: {
      type: Boolean,
      default: false
    },
    showBookmark: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    mailLink: function () {
      let sessionId = this.$route.params.sessionId
      let code = this.$route.params.code
      var body = 'To whom it may concern,\n\nwhile trying to store some data into Jupyter Hub, I encountered an error. My Session ID is ' // Add username and
      body += sessionId + ' and I received following error code: ' + code + '.\n\n'
      body += 'Thank you and best regards,'
      return 'mailto:a.busch@zbw.de?subject=Error%20in%20Store&body=' + encodeURIComponent(body)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
