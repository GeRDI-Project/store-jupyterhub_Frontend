<template>
  <div>
    <div class="text-center d-flex align-items-center justify-content-center">
      <font-awesome-icon class="warning-circle-content float-left mr-5" icon="exclamation"/>
      <h2>Oh Snap! This shouldn't have happened.</h2>
    </div>
    <err-msg v-if="errCode == 100" class="p-4 text-center">
      We aren't able to find your session. Either the server doesn't respond or your session is expired. Please go back to Bookmark and try it again in a few minutes. If this issue persists, feel free to contact us.
    </err-msg>
    <err-msg v-if="errCode == 110" class="p-4 text-center">
      We aren't able to find your session. Either the server doesn't respond or your session is expired. Please go back to Bookmark and try it again in a few minutes. If this issue persists, feel free to contact us.
    </err-msg>
    <err-msg v-if="errCode == 120" class="p-4 text-center">
      We aren't able to find your session. Either the server doesn't respond or your session is expired. Please go back to Bookmark and try it again in a few minutes. If this issue persists, feel free to contact us.
    </err-msg>
  </div>
</template>

<script>
import ErrMsg from './ErrMsg.vue'
export default {
  components: {
    ErrMsg
  },
  name: 'Error',
  computed: {
    errCode: function () {
      return this.$route.params.code
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warning-circle-content {
  color: rgba(100, 0, 0, 0.25);
  background: #f8d7da;
  width: 80px;
  height: 80px;
  border-width: 3px;
  border-style: solid;
  border-color: rgba(100, 0, 0, 0.25);
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  padding: 20px;
}
</style>
