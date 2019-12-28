<template>
  <div class='cover-image'>
      <div @click='openVisible(index)' class="cover-item" v-for='(item,index) in list' :key='index'>
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close='closeVisible'>
          <select-img @clickImg='selectImg'></select-img>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectdialog: -1
    }
  },
  methods: {
    selectImg (img) {
      // alert('地址' + img)
      this.$emit('selectImg', img, this.selectdialog)
      this.closeVisible()
    },
    openVisible (index) {
      // alert(index)
      this.selectdialog = index
      this.dialogVisible = true
    },
    closeVisible () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
    .cover-image{
        display: flex;
        margin-left:100px;
        margin-bottom: 30px;
        .cover-item{
            width: 240px;
            height: 240px;
            border: 1px solid #ccc;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
