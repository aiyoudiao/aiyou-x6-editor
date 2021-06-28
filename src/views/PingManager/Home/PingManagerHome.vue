<template>
  <div id="ping-manager-home" class="ping-manager-home">
    <!-- <dv-loading v-if="tableLoading" class="my-loading">数据加载中...</dv-loading> -->

    <div class="nav-view">
      <div class="left-box">
        <el-button type="primary" @click="isShowDialog = true"
          >新增配置</el-button
        >
      </div>
      <div class="right-box">
        <el-input
          v-model="searchValue"
          size="medium"
          clearable
          placeholder="请输入搜索内容"
          @keyup.native.enter="handleSearchEvent"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="handleSearchEvent"
          />
        </el-input>
      </div>
    </div>

    <div class="content-view">
      <section class="table-container">
        <el-table :data="tableData" style="width='inherit'" height="70vh">
          <el-table-column label="序号" width="50" fixed="left" align="center">
            <template slot-scope="scope">
              <span v-text="countMethod(scope.$index)"></span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in columnData"
            :key="item.name + '_' + index"
            fixed
            :label="item.label"
            :prop="item.name"
            align="center"
            :resizable="false"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <section class="operate-toolbar">
                <el-button
                  type="text"
                  size="small"
                  @click="handlePerformClick(scope.row)"
                  >执行</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleEditClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="handleDeleteClick(scope.row)"
                  >删除</el-button
                >
              </section>
            </template>
          </el-table-column>
        </el-table>
      </section>

      <!-- 分页条 -->
      <section class="pagination-container">
        <custom-pagination
          v-show="tableData.length > 0"
          :total="tableData.length"
          :page="pageNumber"
          :limit="pageSize"
          @pagination="getDataList"
          :background="false"
          :isSmall="true"
        ></custom-pagination>
      </section>
    </div>
  </div>
</template>

<script>
import { getTableData, deleteTableData } from "@/api/pingManager/home.api.js";
import CustomPagination from "@/views/PingManager/Components/Pagination/Pagination";

export default {
  name: "PingManagerHome",
  components: {
    "custom-pagination": CustomPagination,
  },
  data() {
    return {
      tableLoading: true,
      searchValue: "",
      pageSize: 10,
      pageNumber: 1,
      columnData: [
        {
          name: "configName",
          label: "配置名称",
        },
        {
          name: "createDate",
          label: "创建时间",
        },
        {
          name: "creater",
          label: "创建人",
        },
        {
          name: "lastModifier",
          label: "修改人",
        },
        {
          name: "lastModifyDate",
          label: "修改时间",
        },
      ],
      tableData: [],
      total: 0,
      requestId: 0,
    };
  },
  async mounted() {
    this.fillData();
  },

  methods: {
    // 计算索引
    countMethod($index) {
      return (this.pageNumber - 1) * this.pageSize + $index + 1;
    },

    // 填充数据
    async fillData() {
      this.startTableLoading();
      // const data = await this.requestCurrentData("query");
      // const { pageNumber, pageSize, total, detail } = data;
      const detail = [
        {
          createDate: "2021-05-02 16:44:55",
          creater: "root",
          id: 2550,
          lastModifier: "root",
          lastModifyDate: "2021-05-15 13:33:32",
          configName: "审计系统（旧）",
          sourceModelId: null,
        },
        {
          createDate: "2021-05-02 16:44:55",
          creater: "root",
          id: 2550,
          lastModifier: "root",
          lastModifyDate: "2021-05-15 13:33:32",
          configName: "审计系统（旧）",
          sourceModelId: null,
        },
        {
          createDate: "2021-05-02 16:44:55",
          creater: "root",
          id: 2550,
          lastModifier: "root",
          lastModifyDate: "2021-05-15 13:33:32",
          configName: "审计系统（旧）",
          sourceModelId: null,
        },
      ];
      this.tableData = detail;
      // this.total = total;
      // this.pageSize = pageSize;
      // this.pageNumber = pageNumber;
      this.endTableLoading();
    },

    // 查询数据
    async handleSearchEvent() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        await this.resetPagination();
      }, 500);
    },

    // 删除某一行数据，单击事件
    async handleDeleteClick(row) {
      this.$confirm("请确定删除该条配置数据。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.handleDeleteRowData(row);
        })
        .catch(() => {
          this.$message("您已经取消删除该条配置数据。");
        });
    },

    // 删除一行数据
    async handleDeleteRowData(row) {
      this.requestId = row.id;
      const result = await this.requestDeleteData();
      const { code, message } = result;
      this.$notify({
        title: "成功",
        message: message,
        type: "success",
      });
      // await this.fillData();
    },

    // 查看详情数据，跳转页面
    handlePerformClick(row) {
      this.$router.push({
        name: "app-visual-template-view",
        query: {
          requestId: row.id,
        },
      });
    },

    // 编辑数据，跳转页面
    handleEditClick(row) {
      this.$router.push({
        name: "app-visual-template-update",
        query: {
          requestId: row.id,
        },
      });
    },

    // 请求获取页面中所有的数据
    async requestCurrentData(partUrl) {
      let res = await getTableData(
        this.searchValue,
        this.pageSize,
        this.pageNumber
      );
      return res;
    },

    // 删除某一行数据，发送请求
    async requestDeleteData() {
      let res = await deleteTableData(this.requestId);
      return res;
    },

    // 页码操作
    async getDataList(data) {
      const { page, limit } = data;

      this.pageNumber = page;
      this.pageSize = limit;
      await this.fillData();
    },

    // 重置分页码和表格数据
    async resetPagination() {
      this.pageSize = 10;
      this.pageNumber = 1;
      // await this.fillData();
    },

    // 弹出第一个表格的加载动画
    startTableLoading() {
      this.tableLoading = true;
    },

    // 结束第一个表格的加载动画
    endTableLoading() {
      setTimeout(() => {
        this.tableLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
#ping-manager-home.ping-manager-home {
  * {
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  margin: 20px;

  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .dv-loading.my-loading {
    position: absolute;
    z-index: 999999;
    background-color: rgba(256, 256, 256, 0.75);
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }

  .nav-view {
    padding: 5px 20px 20px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .right-box {
      width: 20%;
    }

    .left-box {
      .el-button {
        margin-left: 0px;
        padding: 10px 15px;
        width: 100px;
      }
    }
  }

  .content-view {
    padding: 0 20px;
    margin: 0px auto 0px auto;

    .table-container {
    }
    .operate-toolbar {
      .el-button {
        margin-left: 5px;
        margin-right: 5px;
      }
    }

    .pagination-container {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
