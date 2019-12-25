<template>
  <el-card>
    <bread-crumb slot='header'>
      <template slot='title'>发布文章</template>
    </bread-crumb>
    <el-form style='margin-left:50px;' :model='formData' :rules='rulesData' label-width="100px" ref='publishForm'>
        <el-form-item label='标题' prop='title'>
            <el-input v-model='formData.title' style='width:60%;'></el-input>
        </el-form-item>
        <el-form-item label='内容' prop='content'>
            <el-input v-model='formData.content' type="textarea"></el-input>
        </el-form-item>
        <el-form-item label='封面' prop='type'>
          <el-radio-group v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='频道' prop='channel_id'>
            <el-select  v-model='formData.channel_id'>
                <el-option v-for="item in channels" :key='item.id' :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click='publishArticle()' type='primary'>发表</el-button>
            <el-button @click='publishArticle(true)'>存为草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      rulesData: {
        title: [{ required: true, message: '文章标题不能为空' }, { min: 5, max: 30, message: '标题字符应在5-30之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道列表不能为空' }]
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (Object.keys(to.params).length) {

      } else {
        // 无参数，清空列表
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          }
        }
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            data: this.formData,
            params: { draft }
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    if (articleId) {
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>

</style>
