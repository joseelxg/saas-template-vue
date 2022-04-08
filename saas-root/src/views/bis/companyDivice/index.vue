<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
     <el-form-item label="公司" prop="companyId">
        <el-select v-model="queryParams.companyId" filterable placeholder="请选择公司" clearable size="small">
          <el-option
            v-for="dict in companyList"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型" prop="type">
        <el-select v-model="queryParams.type" filterable placeholder="请选择农资类型" clearable size="small">
          <el-option
            v-for="dict in dict.type.device_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['bis:companyDevice:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['bis:companyDevice:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['bis:companyDevice:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['bis:companyDevice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="companyDeviceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="公司" align="center" prop="companyName" />
      <el-table-column label="设备类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.device_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="设备名称" align="center" prop="name" />
      <el-table-column label="设备编号" align="center" prop="deviceId" />
      <el-table-column label="服务标识" align="center" prop="serverPort" />
      <el-table-column label="所在维度" align="center" prop="lat" />
      <el-table-column label="所在经度" align="center" prop="lan" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['bis:companyDevice:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['bis:companyDevice:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改公司设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row :gutter="10">

       <el-form-item label="公司" prop="companyId">
        <el-select v-model="form.companyId" filterable placeholder="请选择公司" clearable size="small">
          <el-option
            v-for="dict in companyList"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="设备类型" prop="type">
        <el-select v-model="form.type" filterable placeholder="请选择设备类型" clearable size="small">
          <el-option
            v-for="dict in dict.type.device_type"
            :key="dict.value"
            :label="dict.label"
            :value="parseInt(dict.value)"
          />
        </el-select>
      </el-form-item>
        <el-col :span="12">
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入设备名称" />
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="设备编号" prop="deviceId">
              <el-input v-model="form.deviceId" placeholder="请输入设备编号" />
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="服务标识" prop="serverPort">
              <el-input v-model="form.serverPort" placeholder="请输入服务标识" />
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="所在维度" prop="lat">
              <el-input v-model="form.lat" placeholder="请输入所在维度" />
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="所在经度" prop="lan">
              <el-input v-model="form.lan" placeholder="请输入所在经度" />
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCompanyDevice, getCompanyDevice, delCompanyDevice, addCompanyDevice, updateCompanyDevice } from "@/api/bis/companyDevice";
import { listCompany } from "@/api/company/company";
export default {
  name: "CompanyDevice",
  dicts: ['device_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公司设备表格数据
      companyDeviceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyId: null,
      },
      // 表单参数
      form: {
        serverPort:60002
      },
      // 表单校验
      rules: {
        companyId: [
          { required: true, message: "公司id不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "设备类型不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        deviceId: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        serverPort: [
          { required: true, message: "服务标识不能为空", trigger: "blur" }
        ],
        lat: [
          { required: true, message: "所在维度不能为空", trigger: "blur" }
        ],
        lan: [
          { required: true, message: "所在经度不能为空", trigger: "blur" }
        ],
      },
      companyList:[]
    };
  },
  created() {
    this.getList();
    listCompany({pageNum:-1}).then(response => {
        this.companyList = response.rows;
      });
  },
  methods: {
    /** 查询公司设备列表 */
    getList() {
      this.loading = true;
      listCompanyDevice(this.queryParams).then(response => {
        this.companyDeviceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        companyId: null,
        name: null,
        deviceId: null,
        serverPort :60002,
        lat: null,
        lan: null,
        remark: null,
        createBy: null,
        updateBy: null,
        createTime: null,
        updateTime: null,
        deleted: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公司设备";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompanyDevice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司设备";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompanyDevice(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompanyDevice(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除公司设备编号为"' + ids + '"的数据项？').then(function() {
        return delCompanyDevice(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bis/companyDevice/export', {
        ...this.queryParams
      }, `companyDevice_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
