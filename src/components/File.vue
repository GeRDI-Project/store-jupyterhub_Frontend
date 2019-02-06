<template>
  <b-list-group-item>
    <div v-if="type == 'httpd/unix-directory'">
      <router-link class="folder-name" :to="{ name: 'files', params: { sessionId: this.$route.params.sessionId }, query: { dir: uri } }">
        <font-awesome-icon  icon="folder" />
        {{ title }}
      </router-link>
    </div>
    <div v-else class="file-elem">
      <font-awesome-icon  icon="file" />
      {{ title }}
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'File',
  props: ['title', 'type', 'uri'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.file-elem {
  color: #AAA
}

.copy-button {
  float: right;
}

.folder-name {
  vertical-align: sub;
}

</style>
