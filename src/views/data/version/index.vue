<template>
    <el-container>
        <el-header style="margin-top:30px">
            <el-select v-model="selectProject" value-key="id" placeholder="请选择项目" @change="getVersionList(selectProject)">
                <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item">
                </el-option>
            </el-select>

            <el-button type="primary" @click="dialogCreateVersionVisible = true" style="margin-top:20px">创建版本</el-button>

            <el-dialog title="创建版本" :visible.sync="dialogCreateVersionVisible">
                <el-form :model="createVersionForm">
                    <el-form-item label="版本名称" :label-width="formLabelWidth">
                        <el-input v-model="createVersionForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="版本描述" :label-width="formLabelWidth">
                        <el-input v-model="createVersionForm.description" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所属项目" :label-width="formLabelWidth">
                        <el-input v-model="selectProject.projectName" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" :label-width="formLabelWidth">
                        <el-date-picker
                          v-model="createVersionForm.publishTime"
                          type="datetime"
                          placeholder="选择发布时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCreateVersionVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createVersion()">确 定</el-button>
                </div>
            </el-dialog>
        </el-header>

        <el-main>
            <el-table
        v-loading="listLoading"
        border=""
        :data="versionList"
        style="width:100%">

        <el-table-column
            prop="id"
            label="id"
            width="80">
        </el-table-column>

        <el-table-column
            prop="name"
            label="版本名称">
        </el-table-column>

        <el-table-column
            prop="description"
            label="描述">
        </el-table-column>

        <el-table-column
            prop="publishTime"
            label="发布时间">
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

        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>

    <el-dialog title="编辑版本" :visible.sync="dialogEditVersionVisible">
        <el-form :model="updateVersionForm">
            <el-form-item label="版本名称" :label-width="formLabelWidth">
                <el-input v-model="updateVersionForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本描述" :label-width="formLabelWidth">
                <el-input v-model="updateVersionForm.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditVersionVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateVersion()">确 定</el-button>
        </div>
    </el-dialog>


        </el-main>
    </el-container>
    
</template>

<script>
import { getAllProject } from "@/api/data/project"
import { getVersionList,updateVersion,createVersion } from "@/api/data/version";
import { formatDate } from "@/utils/common"

export default {
  data() {
    return {
      selectProject: null,
      projectList: null,
      versionList: null,
      listLoading: true,
      dialogEditVersionVisible: false,
      dialogCreateVersionVisible: false,
      needEditRow: null,
      updateVersionData: {
          id: 0,
          name: '',
          description: '',
      },
      createVersionForm:{
          name: '',
          projectName: '',
          description: '',
          publishTime: '',
      },
      updateVersionForm:{
          name: '',
          projectName: '',
          description: '',
          publishTime: '',
      }
    };
  },
  created() {
    this.getAllProjectList();
  },
  methods: {
    getAllProjectList() {
            this.listLoading = true
            getAllProject().then(respose => {
                this.listLoading = false
                this.projectList = respose.retData
                this.selectProject = this.projectList[0]
                this.createVersionForm.projectName = this.projectList[0].projectName
                this.getVersionList(this.selectProject)
            })
    },
    getVersionList(project){
            this.listLoading = true
            getVersionList(project.id).then(response => {
                this.listLoading = false
                this.versionList = response.retData
            })
        },
    edit(row) {
        this.needEditRow = row;
        this.updateVersionForm.name = row.name;
        this.updateVersionForm.description = row.description;
        this.dialogEditVersionVisible = true;
    },
    updateVersion() {
        this.listLoading = true;
        updateVersion(this.needEditRow.id , this.updateVersionForm.name , this.updateVersion.description).then(response => {
            this.listLoading = false;
            this.dialogEditVersionVisible = false;
            this.getVersionList(this.selectProject)
        })
    },
    createVersion() {
        this.listLoading = true;
        createVersion(this.createVersionForm.name , this.createVersionForm.description ,this.selectProject.id, formatDate(new Date(this.createVersionForm.publishTime) , "yyyy-MM-dd hh:mm:ss")).then(response => {
            this.listLoading = false
            this.dialogCreateVersionVisible = false
            this.getVersionList(this.selectProject)
        })
    }
  }
};
</script>
