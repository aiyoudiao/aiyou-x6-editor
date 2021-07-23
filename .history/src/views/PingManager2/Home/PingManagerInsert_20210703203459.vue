<template>
  <div id="ping-manager-insert" class="ping-manager-insert">
    <div id="x6-editor"></div>

    <!-- 属性modal -->
    <!-- <custom-modal
      :show.sync="showAttrModal"
      title="属性配置"
      @keyup.stop.native=""
    >
      <div slot="content">
        <el-form :model="nodeFormData" label-width="80px" label-position="left">
          <el-form-item label="名称" prop="name">
            <el-input v-model="nodeFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="属性1" prop="属性1">
            <el-input v-model="nodeFormData.属性1"></el-input>
          </el-form-item>
          <el-form-item label="属性2" prop="属性2">
            <el-input v-model="nodeFormData.属性2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="closeModalHandler">取消</el-button>
        <el-button type="primary" @click="confirmModalHandler">确定</el-button>
      </span>
    </custom-modal> -->
    <custom-modal
      :show.sync="showAttrModal"
      title="操作面板"
      @keyup.stop.native=""
      position="left"
    >
      <div slot="content">
        <div class="btn-group">
          <div
            class="btn"
            title="圆形节点"
            @mousedown="startDrag('Circle', $event)"
          >
            <i class="iconfont icon-circle"></i>
          </div>
          <div
            class="btn"
            title="正方形节点"
            @mousedown="startDrag('Rect', $event)"
          >
            <i class="iconfont icon-square"></i>
          </div>
          <div class="btn" title="条件节点" style="vertical-align: bottom;">
            <!-- <i
              class="iconfont icon-square rotate-square"
              @mousedown="startDrag('Condition', $event)"
            ></i> -->
            <img
              :src="核心路由器"
              width="30"
              height="30"
              @mousedown="startDrag('Condition', $event)"
            />
          </div>
          <div class="btn-group_tips" v-if="showTips">
            拖拽生成 <br />拓扑图形
          </div>
        </div>
        <div class="btn-group">
          <el-tooltip content="直线箭头" placement="bottom">
            <div
              :class="['btn', currentArrow === 1 ? 'currentArrow' : '']"
              @click="changeEdgeType('normal')"
            >
              <i class="iconfont icon-ai28"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="曲线箭头" placement="bottom">
            <div
              :class="['btn', currentArrow === 2 ? 'currentArrow' : '']"
              @click="changeEdgeType('smooth')"
            >
              <i class="iconfont icon-Down-Right"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="直角箭头" placement="bottom">
            <div
              :class="['btn', currentArrow === 3 ? 'currentArrow' : '']"
              @click="changeEdgeType()"
            >
              <i class="iconfont icon-jiantou"></i>
            </div>
          </el-tooltip>
        </div>
        <!-- <div class="btn-group">
          <div class="btn" @click="changeMode('edit')" title="选择模式">
            <i class="iconfont icon-mousepointershubiao"></i>
          </div>
          <div class="btn" @click="changeMode('drag')" title="拖拽模式">
            <i class="iconfont icon-tuozhuai"></i>
          </div>
        </div> -->
        <div class="btn-group">
          <el-tooltip content="删除" placement="bottom">
            <div class="btn" @click="deleteNode()" style="margin-top: 5px">
              <i class="iconfont icon-shanchu"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="保存PNG" placement="bottom">
            <div class="btn" @click="saveToPNG()" title="保存">
              <i class="iconfont icon-baocun"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="保存JSON" placement="bottom">
            <div class="btn" @click="saveToJSON()" title="保存">
              <i class="iconfont icon-baocun"></i>
            </div>
          </el-tooltip>
        </div>
        <el-divider></el-divider>
        <!-- 
        <el-carousel :interval="5000" arrow="always" indicator-position="none">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  一致性 Consistency<i class="header-icon el-icon-info"></i>
                </template>
                <div>
                  与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                </div>
              </el-collapse-item>
              <el-collapse-item title="反馈 Feedback">
                <div>
                  控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                </div>
              </el-collapse-item>
              <el-collapse-item title="效率 Efficiency">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>
                  清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
                </div>
              </el-collapse-item>
              <el-collapse-item title="可控 Controllability">
                <div>
                  用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-carousel-item>
        </el-carousel> -->
      </div>
    </custom-modal>

    <custom-elements-pannel
      :elementType="type"
      :selectCell="selectCell"
      :graph="graph"
      :grid="grid"
      @deleteNode="deleteNode"
    ></custom-elements-pannel>
  </div>
</template>

<script>
// import "@antv/x6-vue-shape";
import { DataUri, Graph, Shape, FunctionExt } from "@antv/x6";
import insertCss from "insert-css";
import { pingManagerConfigData } from "./PingManagerHome.conf";
import { startDragToGraph } from "../Graph/methods.js";

import CustomModal from "@/views/PingManager/Components/CustomModal/CustomModal.vue";
import CustomElementsPannelVue from "../Components/CustomElementsPannel/CustomElementsPannel.vue";
import { 核心路由器 } from "@/views/PingManager/IMG/img";

const data = {};

export default {
  name: "PingManagerInsert",
  components: {
    [CustomModal.name]: CustomModal,
    [CustomElementsPannelVue.name]: CustomElementsPannelVue,
  },
  data() {
    return {
      graphID: "x6-editor-2021-06-16-001",

      核心路由器: 核心路由器,

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
      connectEdgeType: {
        //连线方式
        connector: "normal",
        router: {
          name: "",
        },
      },
      showTips: false,
      currentArrow: 1,
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
    closeModalHandler() {},
    confirmModalHandler() {},

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
            console.log('调用了')
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: "#1890ff",
                  strokeWidth: 1,
                  targetMarker: {
                    name: "classic",
                    size: 8,
                  },
                  strokeDasharray: 0, //虚线
                  style: {
                    animation: "ant-line 30s infinite linear",
                  },
                },
              },
              label: {
                text: "",
              },
              connector: _that.connectEdgeType.connector,
              router: {
                name: _that.connectEdgeType.router.name || "",
              },
              zIndex: 0,
            });
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
      insertCss(`
              @keyframes ant-line {
                to {
                    stroke-dashoffset: -1000
                }
              }
            `);
      this.graph.fromJSON(data);
      console.log('this.graph', this.graph)
      this.graph.history.redo();
      this.graph.history.undo();
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
      this.graph.on("blank:click", () => {
        this.type = "grid";
      });
      this.graph.on("cell:click", ({ cell }) => {
        this.type = cell.isNode() ? "node" : "edge";
      });
      this.graph.on("selection:changed", (args) => {
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
    // 保存json
    saveToJSON() {
      this.$nextTick(() => {
        const data = this.graph.toJSON();
        console.log('data', data)
      });
    },
    // 改变 边 形状
    changeEdgeType(e) {
      if (e === "normal") {
        this.connectEdgeType = {
          connector: "normal",
          router: { name: "" },
        };
        this.currentArrow = 1;
      } else if (e === "smooth") {
        this.connectEdgeType = {
          connector: "smooth",
          router: { name: "" },
        };
        this.currentArrow = 2;
      } else {
        this.connectEdgeType = {
          connector: "normal",
          router: { name: "manhattan" },
        };
        this.currentArrow = 3;
      }
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
  @import "../CSS/ping-manager-insert.scss";

  #x6-editor {
    width: 100vw;
    height: 100vh;
  }
}
</style>