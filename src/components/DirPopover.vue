<template>
    <b-popover :target="target" :show.sync="showPopover" placement="bottomleft" @hidden="isHidden()">
      <template slot="title">Create a New Folder</template>
      <div class="position-relative">
        Folder Name:
        <b-form-input class="dir-input" v-model="dirName" type="text" placeholder="E.g.: Weather1990" size="sm" :state="notCreated"/>
        <b-form-invalid-feedback class="form-error-text">
          {{ warningText }}
        </b-form-invalid-feedback>
        <div>
          <b-btn variant="link" size="sm" @click="showPopover = false">Cancel</b-btn>
          <b-btn variant="primary" size="sm" @click="createDir()">Create Folder</b-btn>
        </div>
        <div v-if="loading" class="d-flex justify-content-center popover-overlay">
          <b-spinner class="m-auto" label="Busy" />
        </div>
        <div v-if="error" class="text-center popover-overlay">
          <p class="">Ups... Looks like the server is not responding. Please try again later.</p>
          <b-btn variant="link" size="sm" @click="closeError()">Close</b-btn>
        </div>
      </div>
    </b-popover>
</template>

<script>
export default {
  name: 'DirPopover',
  props: ['show', 'target'],
  data () {
    return {
      showPopover: this.show,
      dirName: '',
      notCreated: null,
      error: false,
      warningText: '',
      loading: false,
      timeout: null
    }
  },
  methods: {
    closeError: function() {
      this.showPopover = false
      window.clearTimeout(this.timeout)
    },
    createDir: function(payload) {
      if (this.dirName == '') {
        this.warningText = 'Please enter a name.'
        this.notCreated = false
        return
      }
      let self = this
      this.loading = true
      var id = this.$route.params.sessionId
      this.$store.dispatch('createDir', {
        sessionId: this.$route.params.sessionId,
        dir: this.$route.query.dir,
        dirName: this.dirName
      }).then(function(response) {
        if (response.data.dirCreated == 'false') {
          self.loading = false
          self.warningText = 'Folder already exists.'
          self.notCreated = false;
        } else {
          self.showPopover = false
          self.notCreated = null;
        }
      }).catch(function(error) {
        self.loading = false
        self.error = true
        self.timeout = window.setTimeout(function(){self.showPopover = false;}, 5000)
      })
    },
    isHidden: function(evt) {
      this.loading = false
      this.notCreated = null
      this.error = false;
      this.dirName = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error-icon {
  margin-top: 0.5rem;
}

.form-error-text {
  margin-bottom: 0.5rem;
}

.popover-overlay {
  background: #fff;
  top: 0;
  left: 0;
  position: absolute;
  height: 105%;
  width: 100%;
}

.dir-input {
  margin-bottom: 0.5rem;
}

</style>
