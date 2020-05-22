<template>
  <div class="page-box">
    <!-- 表格 -->
    <div class="table">
      <!-- 操作按钮 -->
      <div class="table-btn">
        <el-button type="text" @click="del">
          <i class="el-icon-close"></i>
          <span>删除</span>
        </el-button>
        <el-button type="text" @click="add">
          <i class="el-icon-plus"></i>
          <span>添加角色</span>
        </el-button>
      </div>
      <el-table
        :data="info.list"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" :selectable="isDisabled"></el-table-column>

        <el-table-column prop="name" label="角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>

        <el-table-column fixed="right" label="操作" min-width="50">
          <template slot-scope="scope">
            <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              @click="change(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.name!=='super'"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <MyPagination
        :total="info.count"
        :currentPage.sync="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>

    <component
      :visible.sync="showDialog"
      :is="currentCom"
      :_id="activeId"
      @before-close="handleClose"
    ></component>

    <DelDialog
      :visible.sync="showDialog"
      :req="roleRemoveReq"
      :ids="multipleSelection"
      v-if="showDialog&&!currentCom"
      @before-close="handleClose"
    />
  </div>
</template>

<script>
import { AddDialog, ChangeDialog, CheckDialog } from './components'
import { rolePageReq, roleRemoveReq } from '@/apis'
import pageMixin from '@/mixin/pageMixin'
export default {
  mixins: [pageMixin],
  components: {
    CheckDialog,
    AddDialog,
    ChangeDialog
  },
  data() {
    return {
      searchData: {
        name: '' //用户名
      },
      roleRemoveReq
    }
  },
  methods: {
    isDisabled(row) {
      return row.name !== 'super'
    },
    //添加
    add() {
      this.showDialog = true
      this.currentCom = AddDialog
    },

    // 查看
    check(row) {
      this.activeId = row._id
      this.showDialog = true
      this.currentCom = CheckDialog
    },

    // 修改
    change(row) {
      this.activeId = row._id
      this.showDialog = true
      this.currentCom = ChangeDialog
    },

    //请求表格数据
    async renderTable() {
      let { pageNum, pageSize } = this
      let { name } = this.searchData
      let dataObj = {
        pageSize,
        pageNum,
        data: {
          name
        }
      }
      const res = await rolePageReq(dataObj)
      if (res.data.code == 200) {
        let info = res.data.data
        this.info = info
      }
    }
  },
  created() {
    this.renderTable()
  }
}
</script>
