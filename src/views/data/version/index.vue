<template>
    <el-container>
        <el-header>
            <el-button type="primary" @click="dialogCreateVersionVisible = true" style="margin-top:20px">创建版本</el-button>
            <el-dialog title="创建版本" :visible.sync="dialogCreateVersionVisible">
        <el-form :model="form">
            <el-form-item label="版本名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="form.publishTime"
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
        <el-form :model="form">
            <el-form-item label="版本名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
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
import { getAllVersion } from "@/api/data/version";
import { updateVersion } from "@/api/data/version";
import { createVersion } from "@/api/data/version";
import { formatDate } from "@/utils/common"

export default {
  data() {
    return {
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
      form:{
          name: '',
          description: '',
          publishTime: '',
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getAllVersion().then(response => {
        this.versionList = response.retData;
        this.listLoading = false;
      });
    },
    edit(row) {
        this.needEditRow = row;
        this.form.name = row.name;
        this.form.description = row.description;
        this.dialogEditVersionVisible = true;
    },
    updateVersion() {
        this.listLoading = true;
        updateVersion(this.needEditRow.id , this.form.name , this.form.description).then(response => {
            this.listLoading = false;
            this.dialogEditVersionVisible = false;
            this.fetchData()
        })
    },
    createVersion() {
        this.listLoading = true;
        createVersion(this.form.name , this.form.description , formatDate(new Date(this.form.publishTime) , "yyyy-MM-dd HH:mm:ss")).then(response => {
            this.listLoading = false;
            this.dialogCreateVersionVisible = false;
            this.fetchData()
        })
    }
  }
};
</script>
