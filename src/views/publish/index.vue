<template>
  <el-card>
    <bread-crumb slot='header'>
      <template slot='title'>发布文章</template>
    </bread-crumb>
    <el-table>
        <el-table-item label='标题'>
            <el-input></el-input>
        </el-table-item>
        <el-table-item label='内容'>

        </el-table-item>
        <el-table-item label='封面'>
          <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </el-table-item>
        <el-table-item label='频道'>

        </el-table-item>
        <el-table-item>

        </el-table-item>
    </el-table>
  </el-card>

</template>

<script>
export default {

}
</script>

<style>

</style>
