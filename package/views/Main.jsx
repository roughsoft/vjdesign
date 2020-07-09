import Vue from "vue";
import DesignContent from "../components/DesignContent/index";
import DesignMetadata from "../components/DesignMetadata/index";
import DesignPreview from "../components/DesignPreview/index";
import ModelPreview from "../components/ModelPreview/index";

export default Vue.extend({
  components: {
    DesignContent,
    DesignMetadata,
    DesignPreview,
    ModelPreview
  },
  render() {
    return (
      <el-main class="main" style={{ padding: 0 }}>
        <el-tabs type="border-card" class="max-aside">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-edit-outline"></i> 设计器
            </span>
            <div class="design">
              <design-content></design-content>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-tickets"></i> 元数据
            </span>
            <design-metadata></design-metadata>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-view"></i> 视图预览
            </span>
            <design-preview></design-preview>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-coin"></i> 数据预览
            </span>
            <model-preview></model-preview>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    );
  }
});