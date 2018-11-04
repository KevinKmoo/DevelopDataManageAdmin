<template>
    <el-table
        v-loading="listLoading"
        :data="projectList"
        style="width:100%">

        <el-table-column
            prop="id"
            label="id"
            width="80">
        </el-table-column>

        <el-table-column
            prop="projectName"
            label="项目名称">
        </el-table-column>

        <el-table-column
            prop="createTime"
            label="创建时间"
            width="180">
        </el-table-column>

        <el-table-column
            prop="updateTime"
            label="更新时间"
            width="180">
        </el-table-column>
    </el-table>
</template>

<script>

import { getList } from '@/api/data/project'

export default {
    data() {
        return {
            projectList: null,
            listLoading: true
        }
    },
    created() {
        this.fetchData()
    },
    methods:{
        fetchData(){
            this.listLoading = true
            getList().then(response => {
                this.projectList = response.retData
                this.listLoading = false
            })
        }
    }
}
</script>

