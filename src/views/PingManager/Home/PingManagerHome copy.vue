<template>
  <div class="ping-manager-home" id="ping-manager-home">
    <div class="tool-box">
      <el-button
        icon="el-icon-zoom-out"
        circle
        @click="setZoom(-0.1)"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-zoom-in"
        circle
        @click="setZoom(0.1)"
      ></el-button>
      <el-button
        icon="el-icon-back"
        circle
        @click="setTranslate(40, 80)"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-right"
        circle
        @click="setTranslate(240, 280)"
      ></el-button>
      <el-button icon="el-icon-download" circle @click="toSvg1"></el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        circle
        @click="toSvg2"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-remove"
        circle
        @click="dispose"
      ></el-button>
      <el-button
        icon="el-icon-plus"
        circle
        @click="addCustomElement"
      ></el-button>
    </div>
    <div id="x6-editor"></div>
  </div>
</template>

<script>
// import Vue from "vue";
// import animated from "animate.css";
// Vue.use(animated);

import { DataUri, Graph, Shape } from "@antv/x6";
import { pingManagerConfigData } from "./PingManagerHome.conf";

export default {
  name: "PingManagerHome",
  components: {},
  data() {
    return {
      graphID: "x6-editor-2021-06-16-001",
    };
  },
  methods: {
    initX6Graph() {
      const graph = new Graph({
        container: document.querySelector("#x6-editor"),
        width: 1200,
        height: 600,

        background: {
          color: "#ffffa0",
        },
        grid: {
          size: 10,
          visible: true,
        },
        panning: {
          enabled: true,
          modifiers: "shift",
          eventTypes: ["leftMouseDown", "rightMouseDown", "mouseWheel"],
        },
      });

      const data = JSON.parse(JSON.stringify(pingManagerConfigData));
      graph.fromJSON(data);

      window[this.graphID] = graph;
      graph.centerContent();
    },
    setZoom(val) {
      window[this.graphID].zoom(val);
    },
    setTranslate(x, y) {
      window[this.graphID].translate(x, y);
    },
    centerContent() {
      window[this.graphID].centerContent();
    },
    toSvg1() {
      window[this.graphID].toSVG(
        (dataUri) => {
          DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), "chart.svg");
        },
        {
          copyStyles: false,
        }
      );
    },
    toSvg2() {
      window[this.graphID].toSVG((dataUri) => {}, {
        preserveDimensions: {
          width: 100,
          height: 100,
        },

        copyStyles: false,
      });
    },
    dispose() {
      window[this.graphID].dispose();
    },
    addCustomElement() {
      const rect = new Shape.Rect({
        id: "custom-node-2021-06-16-101",
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        label: "rect" + Math.random(),
        zIndex: 2,
      });

      const circle = new Shape.Circle({
        id: "custom-node-2021-06-16-102",
        x: 280,
        y: 300,
        width: 60,
        height: 60,
        label: "circle" + Math.random(),
        zIndex: 2,
      });

      const edge = new Shape.Edge({
        id: "custom-edge-2021-06-16-100" + Math.random(),
        source: "custom-node-2021-06-16-101",
        target: "custom-node-2021-06-16-102",
      });

      window[this.graphID].addNode(rect);
      window[this.graphID].addNode(circle);
      window[this.graphID].addEdge(edge);
    },
  },
  mounted() {
    this.initX6Graph();
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

  padding-left: 32px;
  padding-right: 32px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .tool-box {
    .el-button {
      padding: 15px;
      margin-right: 10px;
    }
  }
}
</style>