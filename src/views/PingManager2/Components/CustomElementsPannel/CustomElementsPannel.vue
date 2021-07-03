<template>
  <div id="custom-elements-pannel" class="custom-elements-pannel">
    <custom-modal
      :show.sync="showElementModal"
      :title="elementMap[elementType]"
      @keyup.stop.native=""
    >
      <div slot="content">
        <div v-if="elementType === 'grid'">
          <el-form label-position="left" label-width="85">
            <el-form-item label="是否显示网格" label-width="100">
              <el-switch v-model="showGrid" @change="changeGrid" />
            </el-form-item>
            <div v-show="showGrid">
              <el-form-item label="网格类型">
                <el-radio-group v-model="grid.type" @change="changeGridType">
                  <el-radio
                    v-for="item in gridTypeList"
                    :label="item.value"
                    :key="item.value"
                  >
                    <span>{{ item.label }}</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="网格大小" style="display: flex">
                <el-slider
                  v-model="grid.size"
                  :min="0"
                  :max="30"
                  @change="changeGrid"
                  style="width: 385px"
                ></el-slider>
              </el-form-item>
              <el-form-item label="网格颜色">
                <el-color-picker
                  v-model="grid.args.color"
                  @change="changeGrid"
                />
              </el-form-item>
              <el-form-item label="网格线宽度" style="display: flex">
                <el-slider
                  v-model="grid.args.thickness"
                  :min="0"
                  :max="20"
                  @change="changeGrid"
                  style="width: 360px"
                ></el-slider>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div v-if="elementType === 'node'">
          <el-form label-position="left" label-width="80">
            <el-form-item label="节点文本">
              <el-input
                v-model="elementNode.nodeText"
                @change="changeNodeText"
              ></el-input>
            </el-form-item>
            <el-form-item label="节点背景">
              <el-color-picker
                v-model="elementNode.fill"
                @change="changeFill"
              />
            </el-form-item>
            <el-form-item label="字体大小" style="display: flex">
              <el-slider
                v-model="elementNode.fontSize"
                :min="10"
                :max="20"
                @change="changefontSize"
                style="width: 385px"
              ></el-slider>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker
                v-model="elementNode.fontFill"
                @change="changeFontFill"
              />
            </el-form-item>
            <el-form-item label="边框宽度" style="display: flex">
              <el-slider
                v-model="elementNode.strokeWidth"
                :min="0"
                :max="10"
                @change="changeStrokeWidth"
                style="width: 385px"
              ></el-slider>
            </el-form-item>
            <el-form-item label="边框颜色">
              <el-color-picker
                v-model="elementNode.stroke"
                @change="changeStroke"
              />
            </el-form-item>
            <el-form-item label="功能">
              <el-button
                type="primary"
                icon="md-trending-up"
                @click="toTopZIndex"
                >置顶</el-button
              >
              <el-button
                type="error"
                class="margin-left-10"
                icon="md-trash"
                @click="deleteNode"
                >删除</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div v-if="elementType === 'edge'">
          <el-form label-position="left" label-width="80">
            <el-form-item label="线条文本">
              <el-input
                v-model="elementEdge.EdgeText"
                @change="changeEdgeText"
              ></el-input>
            </el-form-item>
            <el-form-item label="线条宽度" style="display: flex">
              <el-slider
                v-model="elementEdge.edgeWidth"
                :min="1"
                :max="10"
                @change="changeEdgeWidth"
                style="width: 385px"
              ></el-slider>
            </el-form-item>
            <el-form-item label="线条颜色">
              <el-color-picker
                v-model="elementEdge.edgeColor"
                @change="changeEdgeColor"
              />
            </el-form-item>
            <el-form-item label="线条节数" style="display: flex">
              <el-slider
                v-model="elementEdge.edgeSectionNumber"
                :min="1"
                :max="10"
                style="width: 360px"
                @change="changeEdgeSectionNumber"
              ></el-slider>
            </el-form-item>
            <el-form-item label="线条路由">
              <el-select v-model="elementEdge.edgeRouter" filterable @change="changeEdgeRouter">
                <el-option
                  v-for="item in edgeRouterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线条连接器">
              <el-select
                v-model="elementEdge.edgeConnector"
            
                filterable
                @change="changeEdgeConnector"
              >
                <el-option
                  v-for="item in edgeConnectorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能">
              <el-button
                type="primary"
                icon="md-trending-up"
                @click="toTopZIndex"
                >置顶</el-button
              >
              <el-button
                type="error"
                class="margin-left-10"
                icon="md-trash"
                @click="deleteNode"
                >删除</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="closeModalHandler">取消</el-button>
        <el-button type="primary" @click="confirmModalHandler">确定</el-button>
      </span>
    </custom-modal>
  </div>
</template>

<script>
import CustomModal from "@/views/PingManager/Components/CustomModal/CustomModal.vue";
export default {
  name: "custom-elements-pannel",
  components: {
    [CustomModal.name]: CustomModal,
  },
  props: {
    elementType: String,
    selectCell: String | Object,
    graph: String | Object,
    grid: Object,
  },
  data() {
    return {
      //#region Modal
      showElementModal: true,
      //#endregion

      elementMap: {
        grid: "画布背景设置",
        node: "节点设置",
        edge: "线条设置",
      },

      //#region element 配置
      gridTypeList: [
        {
          label: "四边网格",
          value: "mesh",
        },
        {
          label: "点状网格",
          value: "dot",
        },
      ],
      showGrid: true,
      elementNode: {
        fill: "",
        nodeText: "",
        fontSize: null,
        fontFill: "",
        strokeWidth: null,
        stroke: "",
      },
      elementEdge: {
        EdgeText: "",
        edgeWidth: null,
        edgeColor: "",
        edgeSectionNumber: 1,
        edgeRouter: "",
        edgeConnector: "",
        edgeMaker: "",
      },

      // 路由
      edgeRouterOptions: [
        {
          label: "normal",
          value: "normal",
        },
        {
          label: "orth",
          value: "orth",
        },
        {
          label: "oneSide",
          value: "oneSide",
        },
        {
          label: "manhattan",
          value: "manhattan",
        },
        {
          label: "metro",
          value: "metro",
        },
        {
          label: "er",
          value: "er",
        },
      ],

      // 链接器
      edgeConnectorOptions: [
        {
          label: "normal",
          value: "normal",
        },
        {
          label: "rounded",
          value: "rounded",
        },
        {
          label: "smooth",
          value: "smooth",
        },
        {
          label: "jumpover",
          value: "jumpover",
        },
      ],

      // 箭头
      edgeMakerOptions: [
        {
          label: "normal",
          value: "normal",
        },
      ],
      //#endregion
    };
  },
  methods: {
    closeModalHandler() {},
    confirmModalHandler() {},

    // 网格设置
    changeGrid() {
      this.showGrid ? this.graph.showGrid() : this.graph.hideGrid();
    },
    changeGridType(e) {
      this.grid.type = e;
      this.changeGrid();
    },
    changeGrid() {
      this.graph.drawGrid({
        ...this.grid,
      });
    },
    // 节点设置
    changeStrokeWidth(val) {
      this.selectCell.attr("body/strokeWidth", val);
    },
    changefontSize(val) {
      this.selectCell.attr("label/fontSize", val);
    },
    changeNodeText() {
      this.selectCell.attr("label/text", this.elementNode.nodeText);
    },
    changeStroke(val) {
      this.elementNode.stroke = val;
      this.selectCell.attr("body/stroke", this.elementNode.stroke);
    },
    changeFontFill(val) {
      this.elementNode.fontFill = val;
      this.selectCell.attr("label/fill", this.elementNode.fontFill);
    },
    changeFill(val) {
      this.elementNode.fill = val;
      this.selectCell.attr("body/fill", val);
    },
    // 边设置
    // 文本
    changeEdgeText() {
      console.log(this.elementEdge.EdgeText);
      this.selectCell.setLabels([
        { attrs: { label: { text: this.elementEdge.EdgeText } } },
      ]);
    },
    // 线宽
    changeEdgeWidth(val) {
      this.elementEdge.edgeWidth = val;
      this.selectCell.attr("line/strokeWidth", this.elementEdge.edgeWidth);
    },
    // 线的颜色
    changeEdgeColor(val) {
      this.elementEdge.edgeColor = val;
      this.selectCell.attr("line/stroke", this.elementEdge.edgeColor);
    },
    // 线的节数
    changeEdgeSectionNumber(val) {
    //   this.elementEdge.edgeSectionNumber = val;
      this.selectCell.attr(
        "line/strokeDasharray",
        this.elementEdge.edgeSectionNumber
      );
    },

    // 线的路由
    changeEdgeRouter(val) {
      this.elementEdge.edgeRouter = val;

      this.selectCell.setRouter(this.elementEdge.edgeRouter);
    },
    // 线的连接器
    changeEdgeConnector(val) {
      this.elementEdge.edgeConnector = val;

      this.selectCell.setConnector(this.elementEdge.edgeConnector);
    },
    // 置顶
    toTopZIndex() {
      this.selectCell.toFront();
    },
    // 删除
    deleteNode() {
      this.$emit("deleteNode");
    },
  },
  computed: {},
  beforeMount() {},
  mounted() {},
  watch: {
    selectCell: {
      handler(val) {
        if (!val) return;

        if (val.isNode()) {
          //节点
          this.elementNode.fill = val.store.data.attrs.body.fill;
          this.elementNode.nodeText = val.store.data.attrs.label.text;
          this.elementNode.fontFill = val.store.data.attrs.label.fill;
          this.elementNode.fontSize = Number(
            val.store.data.attrs.label.fontSize
          );
          this.elementNode.strokeWidth = Number(
            val.store.data.attrs.body.strokeWidth
          );
          this.elementNode.stroke = val.store.data.attrs.body.stroke;
        } else {
          //边
          this.elementEdge.EdgeText = val.store.data.labels
            ? val.store.data.labels[0].text
            : "";
          this.elementEdge.edgeWidth = Number(
            val.store.data.attrs.line.strokeWidth
          );
          this.elementEdge.edgeColor = val.store.data.attrs.line.stroke;
          this.elementEdge.edgeSectionNumber = Number(
            val.store.data.attrs.line.strokeDasharray
          );
          this.elementEdge.edgeRouter = val.store.data.router.name || "normal";
          this.elementEdge.edgeConnector = val.store.data.connector || "normal";
          //   this.elementEdge.sourceMarker = val.store.data.attrs.line.sourceMarker || 'normal';
          //   this.elementEdge.targetMarker = val.store.data.attrs.line.targetMarker || 'normal';

          console.log("selectCell", val);
        }
      },
      immediate: true,
      deep: false,
    },
  },
};
</script>

<style lang="scss" scoped>
#custom-elements-pannel.custom-elements-pannel {
}
</style>