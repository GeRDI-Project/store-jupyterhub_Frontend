<template>
  <div class="text-center">
    <slot>Something unexpected happened. Please go to Bookmark and try it again. If this issue persists, please contact us and explain the steps you performed right before this error occured.</slot>
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
      default: true
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
      let body = 'To whom it may concern,\n\nI\'ve encountered an error, while trying to store data into Jupyter Hub. My Session ID is ' // TODO Add username once AAI is running
      body += sessionId + ' and I received following error code: ' + code + '.\n\n'
      body += 'Thank you and best regards,'
      return 'mailto:a.busch@zbw.de?subject=Error%20in%20Store&body=' + encodeURIComponent(body)
    }
  }
}
</script>

<style scoped>
</style>
