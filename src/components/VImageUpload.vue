<template>
  <div class="v-upload">
    <upload-btn noTitleUpdate :title="title" :accept="accept" class="v-upload-btn" labelClass="v-upload-btn-label" ref="uBtn" @file-update="uploadFile">
      <template slot="icon">
        <v-icon right dark>cloud_upload</v-icon>
      </template>
    </upload-btn>
    <div class="v-upload-list" @click="clickUpload">
      <v-btn flat icon color="grey" :loading="loading" v-show="!fileSrc">
        <v-icon x-large>camera_alt</v-icon>
      </v-btn>
      <v-img :src="fileSrc" v-show="fileSrc" :height="$root.smallScreen ? 200 : 300"></v-img>
    </div>
  </div>
</template>

<script>
  import UploadButton from 'vuetify-upload-button'
  import imageCompression from 'browser-image-compression'

  /**
   * 微信内嵌浏览器不能上传图片的问题
   * const IMG_TYPE = ['bmp','jpg','png','tif','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','WMF','webp']
   * 将input标签 
   * <input type=“file" name="image" accept="image/gif, image/jpeg, image/png”>
   * 写成
   * <input type="file" name="image" accept=“image/*”>
   */

  export default {
    name: 'VImageUpload',
    components: {
      'upload-btn': UploadButton
    },
    props: {
      title: {
        type: String,
        default: '上传'
      },
      imgFile: {
        type: [File, Blob],
        default: () => ({})
      }
    },
    data () {
      return {
        accept: 'image/*',
        fileSrc: '',
        loading: false
      }
    },
    methods: {
      clickUpload () {
        // 模拟点击上传按钮
        this.$refs.uBtn.$refs.uploadFile.click()
      },
      async uploadFile (file) {
        this.loading = true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`)
        // 压缩图片参数
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }

        try {
          const compressFile = await imageCompression(file, options)
          console.log(`compressedFile size ${compressFile.size / 1024 / 1024} MB`)     // smaller than maxSizeMB
          this.fileSrc = window.URL.createObjectURL(compressFile)
          this.loading = false
          this.$emit('update:imgFile', compressFile)
        } catch (e) {
          this.loading = false
          console.log('compress file error....', e)
        }
      }
    }
  }
</script>

<style lang="stylus">
.my-app
  .v-upload
    &-btn
      padding-left: 0 !important
      text-align: left
      &-label
        margin-left: 0
    &-list
      width: 100%
      height: 300px
      line-height: 300px
      border: 1px dashed #dcdee2
      border-radius: 4px
      &:hover
        border: 1px dashed #2d8cf0
        cursor: pointer

.my-app-phone
  .v-upload-list
    height: 200px
    line-height: 200px
</style>