<template>
  <div>
    <wait></wait>
    <h3 class="text-center">Setting up your Jupyter Hub storage</h3>
    <div v-if="step == 0">
      <h5>You are being logged in into the storage provider right now.</h5>
    </div>
    <div v-if="step == 1">
      <h5>Waiting for your storage space to be created.</h5>
    </div>
    <div v-if="step == 2 || step == 3">
      <h5>Please select a location where all files should be copied to.</h5>
      <transition appear v-on:after-leave="leftSelect" name="fade">
        <file-list v-if="step == 2" class="files-display"></file-list>
      </transition>
    </div>
    <div v-if="step == 4 || step == 5">
      <h5>The selected files are being copied to your storage space.</h5>
      <transition appear name="fade" v-on:after-leave="leftOverview">
        <overview v-if="step == 4" class="files-display"></overview>
      </transition>
    </div>
    <div v-if="step == 6">
      <h5>All selected files have been successfully copied to your storage space.</h5>
      <transition appear name="fade">
        <div v-if="step == 6" class="files-display text-center">
          <b-button variant="link" @click="ok()">Go Back to Bookmark</b-button>
          <b-button variant="outline-primary" @click="openJupyter()">Open your Jupyter Notebook</b-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import usercookie from '../util/usercookie.js'

export default {
  name: 'Files',
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
    },
    step: function() {
        return this.$store.getters.getCurrentStep
    }
  },
  watch: {
    '$route.query': "load"
  },
  methods: {
    load() {
      let id = this.$route.params.sessionId
      let dir = this.$route.query.dir
      this.$store.dispatch('load', {
        sessionId: id,
        dir: dir
      })
    },
    login() {
      let self = this
      let id = this.$route.params.sessionId
      this.$store.dispatch('load', {
        sessionId: id
      })
    },
    leftSelect: function() {
      this.$store.commit('leftSelect')
    },
    leftOverview: function() {
      this.$store.commit('leftOverview')
    },
    ok() {
      window.location='/bookmark'
    },
    openJupyter() {
      window.location='/analyze/user/' + usercookie.getUsername() + '/tree'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb > li + li.ml-auto:before {
  content: none;
}

.files-display {
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 100%;
  max-height: 3000px;
  opacity: 1;
}

.bc-item {
  vertical-align: sub;
}

.files-btn {
  margin-left: 0.5rem;
  margin-bottom: 1rem;
}

h5 {
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: max-height 2s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0px;
  opacity: 1;
}

#overlay {
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
}

#text{
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    text-align: center;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
}
</style>
