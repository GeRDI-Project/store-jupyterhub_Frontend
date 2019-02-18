<template>
  <div>
    <div class="d-flex">
      <b-breadcrumb class="w-100">
        <b-breadcrumb-item class="bc-item" :to="{ name: 'files', params: { sessionId: $route.params.sessionId } }">home</b-breadcrumb-item>
        <b-breadcrumb-item class="bc-item" v-for="i in path.length" :active="i == path.length" :key="i" :to="{ name: 'files', params: { sessionId: $route.params.sessionId }, query: { dir: path.slice(0,i).reduce((a,c) => a+c+'/', '/') } }">
          {{ path[i-1] }}
        </b-breadcrumb-item>
        <div class="breadcrumb-btn-group">
          <b-btn variant="link" size="sm" @click="createDir({ name: 'overview', params: { sessionId: $route.params.sessionId }, query: { dir: path.reduce((a,c) => a+c+'/', '/') } })">Create Folder</b-btn>
          <b-btn variant="primary" size="sm" @click="upload(path.reduce((a,c) => a+c+'/', '/') )">Store Here</b-btn>
        </div>
      </b-breadcrumb>
      </div>
    <b-list-group>
      <file v-for="file in sortedFiles" :title="file.displayName" :type="file.type" :uri="file.uri" :key="file.uri"/>
      <b-list-group-item v-if="files.length == 0">Empty Directory</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FileList',
  data () {
    return {
      windowRef: {},
      overlay: false,
      retries: 0
    }
  },
  computed: {
    path: function() {
      if (this.$route.query.dir) {
        let arr = this.$route.query.dir.split("/").filter(it => it.length > 0)
        return arr
      }
      return []
    },
    sortedFiles: function() {
      return this.$store.getters.getFilesList
    },
    files: function() {
      return this.$store.getters.getFilesList
    },
    loading: function() {
        return this.$store.getters.isLoading
    },
    error: function() {
        return this.$store.getters.hasError
    }
  },
  methods: {
    createDir: function(payload) {
      console.log(payload)
    },
    upload: function(dir) {
      var id = this.$route.params.sessionId
      this.$store.dispatch('triggerCopy', {
        sessionId: id,
        dir: this.$route.query.dir
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  position: relative;
}

.breadcrumb-btn-group {
  position: absolute;
  right:1rem;
  top:50%;
  transform:translateY(-50%);
}

.breadcrumb > li + li.ml-auto:before {
  content: none;
}

.bc-item {
  vertical-align: sub;
}
</style>
