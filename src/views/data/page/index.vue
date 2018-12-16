<template>
    <el-container>
        <el-header style="margin-top:30px">
            <el-select v-model="selectedProject" value-key="id" placeholder="请选择项目" @change="getModuleList()">
                <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item">
                </el-option>
            </el-select>

            <el-select v-model="selectedModule" value-key="id" placeholder="请选择模块" @change="getPageList()" style="margin-left:20px">
                <el-option
                    v-for="item in moduleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item">
                </el-option>
            </el-select>

            <el-button type="primary" @click="dialogCreatePageVisible = true" style="margin-left:20px">创建页面</el-button>
            <el-dialog title="创建页面" :visible.sync="dialogCreatePageVisible">
                <el-form :model="createForm">
                <el-form-item label="页面名称" :label-width="formLabelWidth">
                    <el-input v-model="createForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="页面Key值" :label-width="formLabelWidth">
                    <el-input v-model="createForm.key" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="页面描述" :label-width="formLabelWidth">
                    <el-input v-model="createForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属项目" :label-width="formLabelWidth">
                    <el-input v-model="selectedProject.projectName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属模块" :label-width="formLabelWidth">
                    <el-input v-model="selectedModule.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属版本" :label-width="formLabelWidth">
                    <el-select v-model="createForm.selectedVersionId" placeholder="请选择版本">
                        <el-option
                            v-for="version in versionList"
                            :key="version.id"
                            :label="version.name"
                            :value="version.id">
                        </el-option>
                    </el-select>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCreateModuleVisible = false">取 消</el-button>
            <el-button type="primary" @click="createPage()">确 定</el-button>
        </div>
    </el-dialog>
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
                    width="160">
                </el-table-column>

                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="160">
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
import { getVersionList } from "@/api/data/version.js"
import { createPage,getPageList } from "@/api/data/page.js"

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
            selectedVersionId: 0,
            paginationSize: 0,
            paginationIndex: 0,
            isShowPagination: false,
            dialogCreatePageVisible: false,
            createForm: {
              name: '',
              key: '',
              description: '',
              selectedVersionId: 0
            },
            listLoading: false
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
                this.getModuleList()
                this.getVersionList()
            })
        },
        getModuleList(){
            getModuleList(this.selectedProject.id).then(response => {
                this.moduleList = response.retData
                if (this.$route.query.moduleId != null){
                    this.moduleList.forEach(element => {
                        if(element.id == this.$route.query.moduleId){
                            this.selectedModule = element
                        }
                    });
                }else{
                    this.selectedModule = this.moduleList[0]
                }
                this.getPageList()
            })
        },
        getVersionList(){
            getVersionList(this.selectedProject.id).then(response => {
                this.versionList = response.retData
            })
        },
        getPageList(){
            getPageList(this.selectedProject.id , this.selectedModule.id , 0)
            .then(response => {
                this.pageList = response.retData
            })
        },
        createPage(){
          console.log("selected version id:" + this.createForm.selectedVersionId)
          createPage(this.createForm.name , this.createForm.key , this.createForm.description , this.selectedModule.id , this.createForm.selectedVersionId)
          .then(response => {
            this.getPageList()
          })
        }
    }
}
</script>
