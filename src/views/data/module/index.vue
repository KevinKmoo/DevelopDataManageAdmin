<template>
    <el-container>
        <el-header style="margin-top:30px">
            <el-select v-model="selectProject" value-key="id" placeholder="请选择项目" @change="getModuleList(selectProject.id)">
                <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item">
                </el-option>
            </el-select>

            <el-button type="primary" @click="dialogCreateModuleVisible = true" style="margin-left:20px">创建模块</el-button>
            <el-dialog title="创建模块" :visible.sync="dialogCreateModuleVisible">
                <el-form :model="createForm">
                <el-form-item label="模块名称" :label-width="formLabelWidth">
                    <el-input v-model="createForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="模块描述" :label-width="formLabelWidth">
                    <el-input v-model="createForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属项目" :label-width="formLabelWidth">
                    <el-input v-model="createForm.projectName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属版本" :label-width="formLabelWidth">
                    <el-select v-model="selectVersionId" placeholder="请选择版本">
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
            <el-button type="primary" @click="createModule()">确 定</el-button>
        </div>
    </el-dialog>
        </el-header>
        <el-main>
            <el-table
                v-loading="listLoading"
                border=""
                :data="moduleList"
                style="width:100%">
                <el-table-column
                    prop="id"
                    label="id"
                    width="80">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="模块名称"
                    width="120">
                </el-table-column>

                <el-table-column
                    prop="description"
                    label="模块描述">
                </el-table-column>

                <el-table-column
                    prop="projectName"
                    label="所属项目"
                    width="120">
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

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="更新模块" :visible.sync="dialogUpdateModuleVisible">
                <el-form :model="updateForm">
                <el-form-item label="模块名称" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="模块描述" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属项目" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.projectName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属版本" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.versionName" :disabled="true"></el-input>
                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCreateModuleVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateModule()">确 定</el-button>
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>

import { getAllProject } from "@/api/data/project.js"
import { getModuleList } from "@/api/data/module.js"
import { getAllVersion } from "@/api/data/version.js"
import { createModule } from "@/api/data/module.js"
import { updateModule } from "@/api/data/module.js"

export default {
    data(){
        return {
            projectList: null,
            moduleList: null,
            selectProject: null,
            selectVersionId: null,
            dialogCreateModuleVisible: false,
            dialogUpdateModuleVisible: false,
            versionList: null,
            createForm:{
                name: "",
                description: "",
                projectName: "",
            },
            updateForm:{
                id: null,
                name:'',
                description:'',
                projectName:'',
                versionName:'',
            }
        }
    },
    created(){
        this.getAllProjectList()
    },
    methods:{
        getAllProjectList(){
            this.listLoading = true
            getAllProject().then(respose => {
                this.listLoading = false
                this.projectList = respose.retData
                this.selectProject = this.projectList[0]
                this.createForm.projectName = this.projectList[0].projectName
                this.updateForm.projectName = this.projectList[0].projectName
                this.getModuleList(this.selectProject.id)
                this.getVersionList(this.selectProject.id)
            })
        },
        getModuleList(projectId){
            this.listLoading = true
            getModuleList(projectId).then(response => {
                this.listLoading = false
                this.moduleList = response.retData
            })
        },
        getVersionList(projectId){
            this.listLoading = true
            getAllVersion().then(response => {
                this.listLoading = false
                this.versionList = response.retData
            })
        },
        createModule(){
            this.listLoading = true
            createModule(this.createForm.name, this.createForm.description , this.selectProjectId , this.selectVersionId)
            .then(response => {
                this.listLoading = false
                this.dialogCreateModuleVisible = false
                this.getModuleList(this.selectProjectId)
            })
        },
        edit(row){
            this.updateForm.id = row.id
            this.updateForm.name = row.name
            this.updateForm.description = row.description
            this.dialogUpdateModuleVisible = true
        },
        updateModule(){
            this.listLoading = true
            updateModule(this.updateForm.id , this.updateForm.name , this.updateForm.description)
            .then(response => {
                this.listLoading = false
                this.dialogUpdateModuleVisible = false
                this.getModuleList(this.selectProjectId)
            })
        }
    }
}
</script>

