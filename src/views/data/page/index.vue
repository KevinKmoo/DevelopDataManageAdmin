<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <el-table
                v-loading="listLoading"
                border=""
                :data="pageList"
                style="with:100%">

                <el-table-column
                    prop="id"
                    label="id"
                    width="80">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="页面名称"
                    width="100">
                </el-table-column>

                <el-table-column
                    prop="description"
                    label="页面描述">
                </el-table-column>

                <el-table-column
                    prop="key"
                    label="页面key值"
                    width="100">
                </el-table-column>

                <el-table-column
                    prop="moduleName"
                    label="所属模块"
                    width="140">
                </el-table-column>

                <el-table-column
                    prop="versionName"
                    label="所属版本"
                    width="140">
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="140">
                </el-table-column>

                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="140">
                </el-table-column>

            </el-table>
            <el-row 
                type="flex" 
                justify="center"
                style="margin-top:20px">
                <el-col :span="6">
                    <el-pagination
                        layout="prev, pager, next"
                        :page-count="paginationSize"
                        :current-page="paginationIndex"
                        v-show="isShowPagination">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { getAllProject } from "@/api/data/project.js"
import { getModuleList } from "@/api/data/module.js"
import { getAllVersion } from "@/api/data/version.js"

export default {
    data(){
        return {
            pageList: null,
            projectList: null,
            moduleList: null,
            versionList: null,
            selectedProject: null,
            selectedModule: null,
            selectedVersion: null,
            paginationSize: 0,
            paginationIndex: 0,
            isShowPagination: false,
        }
    },
    created(){
        this.getProjectList()
    },
    methods:{
        getProjectList(){
            getAllProject().then(response => {
                this.projectList = response.retData
                if(this.$route.query.projectId != null){
                    this.projectList.forEach(element => {
                        if(element.id == this.$route.query.projectId){
                            this.selectedProject = element
                        }
                    });
                }else{
                    this.selectedProject = this.projectList[0]
                }
                getModuleList(this.selectedProject.id)
                getVersionList(this.selectedProject.id)
            })
        },
        getModuleList(projectId){
            getModuleList(projectId).then(response => {
                this.moduleList = response.retData
                if (this.$route.query.moduleId != null){
                    this.moduleList.forEach(element => {
                        if(element.id == this.$route.query.moduleId){
                            this.selectedModule = element
                        }
                    });
                }
            })
        },
        getVersionList(projectId){
            getAllVersion()
        },
        getPageList(){
            
        }
    }
}
</script>
