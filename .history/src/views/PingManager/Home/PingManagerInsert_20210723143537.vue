<template>
  <div id="ping-manager-insert" class="ping-manager-insert">
    <!-- 容器 -->
    <div id="x6-editor"></div>
    <!-- 左侧属性面板modal--1 -->
    <custom-modal
      :show.sync="showAttrModal"
      title="操作面板"
      @keyup.stop.native=""
      position="left"
    >
      <div slot="content">
        <el-tabs>
          <el-tab-pane label="节点" name="first">
            <el-collapse>
              <el-collapse-item title="图片节点">
                <div>
                  <span
                    class="btn"
                    title="核心路由器"
                    style="vertical-align: bottom; margin-right: 15px"
                  >
                    <img
                      :src="核心路由器"
                      width="30"
                      height="30"
                      @mousedown="startDrag('CoreRouter', $event)"
                    />
                  </span>
                  <span
                    class="btn"
                    title="核心交换机"
                    style="vertical-align: bottom; margin-right: 15px"
                  >
                    <img
                      :src="核心交换机"
                      width="30"
                      height="30"
                      @mousedown="startDrag('CoreAlterMachine', $event)"
                    />
                  </span>
                  <span
                    class="btn"
                    title="服务器"
                    style="vertical-align: bottom; margin-right: 15px"
                  >
                    <img
                      :src="服务器"
                      width="30"
                      height="30"
                      @mousedown="startDrag('Server', $event)"
                    />
                  </span>
                  <span
                    class="btn"
                    title="管理服务器"
                    style="vertical-align: bottom; margin-right: 15px"
                  >
                    <img
                      :src="管理服务器"
                      width="30"
                      height="30"
                      @mousedown="startDrag('ManagerServer', $event)"
                    />
                  </span>
                  <span
                    class="btn"
                    title="用户"
                    style="vertical-align: bottom; margin-right: 15px"
                  >
                    <img
                      :src="用户"
                      width="30"
                      height="30"
                      @mousedown="startDrag('User', $event)"
                    />
                  </span>
                  <span
                    class="btn"
                    title="终端机"
                    style="vertical-align: bottom; margin-right: 15px"
                  >
                    <img
                      :src="终端机"
                      width="30"
                      height="30"
                      @mousedown="startDrag('Commander', $event)"
                    />
                  </span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="基本节点">
                <div>
                  <div class="btn-group">
                    <div
                      class="btn"
                      title="圆形节点"
                      @mousedown="startDrag('Circle', $event)"
                    >
                      <!-- <i class="iconfont icon-circle"></i> -->
                                  <svg-icon
                icon-class="YuanQuan"
              />
                    </div>
                    <div
                      class="btn"
                      title="正方形节点"
                      @mousedown="startDrag('Rect', $event)"
                    >
                      <i class="iconfont icon-square"></i>
                    </div>
                    <div
                      class="btn"
                      title="条件节点"
                      style="vertical-align: bottom"
                    >
                      <i
                        class="iconfont icon-square rotate-square"
                        @mousedown="startDrag('Condition', $event)"
                      ></i>
                    </div>
                    <!-- <div class="btn-group_tips" v-if="showTips">
                      拖拽生成 <br />拓扑图形
                    </div> -->
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="线" name="second">
            <el-collapse>
              <el-collapse-item title="基本线段">
                <div>
                  <div class="btn-group">
                    <el-tooltip content="直线箭头" placement="bottom">
                      <div
                        :class="[
                          'btn',
                          currentArrow === '直线箭头' ? 'currentArrow' : '',
                        ]"
                        @click="changeEdgeType('直线箭头')"
                      >
                        <i class="iconfont icon-ai28"></i>
                      </div>
                    </el-tooltip>
                    <el-tooltip content="曲线箭头" placement="bottom">
                      <div
                        :class="[
                          'btn',
                          currentArrow === '曲线箭头' ? 'currentArrow' : '',
                        ]"
                        @click="changeEdgeType('曲线箭头')"
                      >
                        <i class="iconfont icon-Down-Right"></i>
                      </div>
                    </el-tooltip>
                    <el-tooltip content="直角箭头" placement="bottom">
                      <div
                        :class="[
                          'btn',
                          currentArrow === '直角箭头' ? 'currentArrow' : '',
                        ]"
                        @click="changeEdgeType('直角箭头')"
                      >
                        <i class="iconfont icon-jiantou"></i>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="功能" name="third">
            <el-collapse>
              <el-collapse-item title="基本功能">
                <div>
                  <div class="btn-group">
                    <div
                      class="btn"
                      @click="changeMode('edit')"
                      title="选择模式"
                    >
                      <i class="iconfont icon-mousepointershubiao"></i>
                    </div>
                    <div
                      class="btn"
                      @click="changeMode('drag')"
                      title="拖拽模式"
                    >
                      <i class="iconfont icon-tuozhuai"></i>
                    </div>
                  </div>
                  <div class="btn-group">
                    <el-tooltip content="删除" placement="bottom">
                      <div
                        class="btn"
                        @click="deleteNode()"
                        style="margin-top: 5px"
                      >
                        <i class="iconfont icon-shanchu"></i>
                      </div>
                    </el-tooltip>
                    <el-tooltip content="保存PNG" placement="bottom">
                      <div class="btn" @click="saveToPNG()" title="保存">
                        <i class="iconfont icon-baocun"></i>
                      </div>
                    </el-tooltip>
                    <el-tooltip content="导出JSON" placement="bottom">
                      <div class="btn" @click="saveToJSON()" title="导出">
                        <i class="iconfont2 icon-xiazai"></i>
                      </div>
                    </el-tooltip>

                    <el-tooltip content="上传JSON" placement="bottom">
                      <div class="btn" @click="uploadToJSON()" title="上传">
                        <i class="iconfont2 icon-shangchuan"></i>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
    </custom-modal>

    <!-- 右侧属性面板modal--1 -->
    <custom-elements-pannel
      :elementType="type"
      :selectCell="selectCell"
      :graph="graph"
      :grid="grid"
      @deleteNode="deleteNode"
    ></custom-elements-pannel>

    <!-- 导入JSON文件弹框 -->
    <el-dialog title="导入JSON文件" :visible.sync="dialogVisible" width="21%">
      <el-upload
        drag
        :limit="1"
        action="https://jsonplaceholder.typicode.com/posts/"
        ref="upload"
        accept=".json"
        :file-list="fileList"
        :on-success="onSuccess"
        :on-remove="onRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          上传json文件，且只能上传 1 个文件
        </div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 节点鼠标右键菜单 -->
    <div id="mouseRightDiv" v-show="rightDivShow" style="width: 80px; height: 50px;">
      <el-menu>
        <el-menu-item>
          <el-button type="text" @click="deleteButton">删除</el-button>
        </el-menu-item>
        <el-menu-item>
          <el-button type="text">添加</el-button>
        </el-menu-item>
        <el-menu-item>
          <el-button type="text">跳转</el-button>
        </el-menu-item>
      </el-menu>
    </div>

  </div>
</template>

<script>
// import "@antv/x6-vue-shape";
import { DataUri, Graph, Shape, FunctionExt } from "@antv/x6";
import insertCss from "insert-css";
import { pingManagerConfigData } from "./PingManagerHome.conf";
import { startDragToGraph, changeEdgeTypeToGraph } from "../Graph/methods.js";

import CustomModal from "@/views/PingManager/Components/CustomModal/CustomModal.vue";
import CustomElementsPannelVue from "../Components/CustomElementsPannel/CustomElementsPannel.vue";

import pingManagerMixins from "./PingManagerMixins.js";

const data = {
  ...pingManagerConfigData
}

export default {
  name: "PingManagerInsert",
  mixins: [pingManagerMixins],
  components: {
    [CustomModal.name]: CustomModal,
    [CustomElementsPannelVue.name]: CustomElementsPannelVue,
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      uploadData: [],
      rightDivShow: false,
      targetObj: '',
      graphID: "x6-editor-2021-06-16-001",
      //#region Modal
      showAttrModal: true,
      nodeFormData: {
        name: "",
        属性1: "",
        属性2: "",
      },
      //#endregion

      graph: "",
      value1: true,
      type: "grid",
      selectCell: "",
      connectEdge: {},
      showTips: false,
      currentArrow: "直线箭头",
      grid: {
        // 网格设置
        size: 20, // 网格大小 10px
        visible: true, // 渲染网格背景
        type: "mesh",
        args: {
          color: "#D0D0D0",
          thickness: 1, // 网格线宽度/网格点大小
          factor: 10,
        },
      },
    };
  },
  methods: {
    initX6() {
      var _that = this;
      this.graph = new Graph({
        container: document.getElementById("x6-editor"),
        width: 1700,
        height: "100%",
        grid: _that.grid,
        resizing: {
          //调整节点宽高
          enabled: true,
          orthogonal: false,
        },
        selecting: true, //可选
        snapline: true,
        interacting: {
          edgeLabelMovable: true,
        },
        connecting: {
          // 节点连接
          anchor: "center",
          connectionPoint: "anchor",
          allowBlank: false,
          snap: true,
          createEdge() {
            return new Shape.Edge(_that.connectEdge);
          },
        },
        highlighting: {
          magnetAvailable: {
            name: "stroke",
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: "#6a6c8a",
              },
            },
          },
        },
      });
      //
      insertCss(`
              @keyframes ant-line {
                to {
                    stroke-dashoffset: -1000
                }
              }
            `);
      this.graph.fromJSON(data);
      this.changeEdgeType(this.currentArrow);
      console.log("this.graph", this.graph);
      // this.graph.history.redo(); // 重做 再做 改装
      // this.graph.history.undo(); // 解开 取消 撤销 废除
      // 节点-鼠标右键事件
      this.graph.on("node:contextmenu", ({ e, x, y, cell, view }) => {
        this.targetObj = cell
        this.rightDivShow = true;
        var divObj = document.getElementById("mouseRightDiv")
        divObj.style.position = 'absolute'
        divObj.style.left = e.clientX + "px"
        divObj.style.top = e.clientY + "px"

      });

      // 边-鼠标右键事件
      this.graph.on("edge:contextmenu", ({ e, x, y, cell, view }) => {
        this.targetObj = cell
        this.rightDivShow = true;
        const divObj = document.getElementById("mouseRightDiv")
        divObj.style.position = 'absolute'
        divObj.style.left = e.clientX + "px"
        divObj.style.top = e.clientY + "px"
      });

      // 鼠标移入移出节点
      this.graph.on(
        "node:mouseenter",
        FunctionExt.debounce(() => {
          const container = document.getElementById("x6-editor");
          const ports = container.querySelectorAll(".x6-port-body");
          this.showPorts(ports, true);
        }),
        500
      );
      this.graph.on("node:mouseleave", () => {
        const container = document.getElementById("x6-editor");
        const ports = container.querySelectorAll(".x6-port-body");
        this.showPorts(ports, false);
      });
      // 点击空白处所触发的事件
      this.graph.on("blank:click", () => {
        this.type = "grid";
        console.log('this.type', this.type)
        this.rightDivShow = false;
      });
      //
      this.graph.on("cell:click", ({ cell }) => {
        this.type = cell.isNode() ? "node" : "edge";
         console.log('this.type', this.type)
      });
      //
      this.graph.on("selection:changed", (args) => {
        console.log('args', args)
        args.added.forEach((cell) => {
          this.selectCell = cell;
          if (cell.isEdge()) {
            // cell.isEdge() && cell.attr("line/strokeDasharray", 5); //虚线蚂蚁线
            cell.addTools([
              {
                name: "vertices",
                args: {
                  padding: 4,
                  attrs: {
                    strokeWidth: 0.1,
                    stroke: "#2d8cf0",
                    fill: "#ffffff",
                  },
                },
              },
            ]);
          }
        });
        args.removed.forEach((cell) => {
          //   cell.isEdge() && cell.attr("line/strokeDasharray", 0); //正常线
          cell.removeTools();
        });
      });
    },

    // 删除
    deleteButton() {
      this.graph.removeCell(this.targetObj);
      this.type = "grid";
      this.rightDivShow = false;
    },

    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    },
    // 拖拽生成正方形或者圆形
    startDrag(type, e) {
      startDragToGraph(this.graph, type, e);
    },
    // 删除节点
    deleteNode() {
      const cell = this.graph.getSelectedCells();
      this.graph.removeCells(cell);
      this.type = "grid";
    },
    // 保存png
    saveToPNG() {
      this.$nextTick(() => {
        this.graph.toPNG(
          (dataUri) => {
            // 下载
            DataUri.downloadDataUri(dataUri, "拓扑图.png");
          },
          {
            backgroundColor: "white",
            padding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
            quality: 1,
            copyStyles: false,
          }
        );
      });
    },
    // 导出json
    saveToJSON() {
      this.$nextTick(() => {
        let data = this.graph.toJSON();
        data = JSON.stringify(data);
        console.log("data", data);

        let uri =
          "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(data);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        link.download = "json数据表.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    // 上传JSON
    uploadToJSON() {
      this.dialogVisible = true;
    },
    onSuccess(res, file, fileList) {
      console.log("file", file);
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        this.uploadData = JSON.parse(e.target.result);
        this.graph.fromJSON(this.uploadData);

        console.log("this.uploadData", this.uploadData);
      };
    },
    onRemove(file) {
      this.fileList = [];
    },
    // 上传JSON弹框中的确定事件
    dialogVisibleClick() {
      // this.graph = this.uploadData
      // this.graph = JSON.stringify(this.uploadData);

      this.dialogVisible = false;
    },

    // 改变 边 形状
    changeEdgeType(type) {
      changeEdgeTypeToGraph(this.graph, type, this);
      this.currentArrow = type;
    },
  },
  computed: {},
  beforeMount() {},
  mounted() {
    this.initX6();
    setTimeout(() => {
      this.showTips = true;
    }, 1000);
    setTimeout(() => {
      this.showTips = false;
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
#ping-manager-insert.ping-manager-insert {
  @import "../CSS/iconfont.css";
  @import "../CSS/iconfont3.css";
  @import "../CSS/ping-manager-insert.scss";

  #x6-editor {
    width: 100vw;
    height: 100vh;
  }
  ::v-deep .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0;
  }
}
</style>
