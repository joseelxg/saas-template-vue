<template>
    <el-image
      :src="isAbsolutePath?src:baseApi+src"
      :fit="fit"
      :alt="alt"
      :z-index="zIndex"
       :preview-src-list="fixedPreviewSrcList"
    />
  
</template>

<script>

export default {
  name: 'HlImage',
  props: {
    src: {
      required: true,
      type: String
    },
    fit: {
      type: String,
      default: 'cover'
    },
    alt: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default:2000
    },
    previewSrcList:Array,
    isAbsolutePath:Boolean,
  },
  data(){
      return {
        baseApi:process.env.VUE_APP_BASE_API
      }
      
  },
  computed: {
    fixedPreviewSrcList(){
      
      if(this.isAbsolutePath)
      {
        return this.previewSrcList
      }
      else
      {
        var list = []
        for (const item of this.previewSrcList) {
          list.push(this.baseApi+item)
        }
        return list
      }
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
