import Vue from "vue";
import { mapState } from "vuex";
import { assembly } from "../lib/feature/property";
import emiter from "../utils/emiter";
import Datasource from "../components/Datasource";

export default Vue.extend({
  components: { Datasource },
  data() {
    return {
      editorGroups: [],
      updating: null,
      groupNames: [],
      propNames: [],
      //
      showDatasource: false
    };
  },
  computed: mapState({
    editing: state => state.form.fieldMap[state.form.editing]
  }),
  watch: {
    editing(value) {
      if (!value) {
        this.editorGroups = [];
        return;
      }

      const groups = assembly(value.component);
      this.editorGroups = Object.keys(groups)
        .filter(key => groups[key].length > 0)
        .map(key => {
          const fields = groups[key];
          const components = {};
          fields.map(field => {
            if (field.instance) {
              components[field.instance.name] = field.instance;
            }
            return { ...field, instance: undefined };
          });
          return { key, fields, components };
        });
      this.groupNames = Object.keys(groups);
    },
    updating(value) {
      if (value === null) {
        return;
      }

      this.$nextTick(() => {
        this.$store.commit("form/UPDATE_EDITING", value);
        this.updating = null;
      });
    }
  },
  methods: {
    updateEditing(value) {
      this.updating = value;
    }
  },
  created() {
    emiter.$on("component-selected", field => {
      this.$store.commit("form/SELECT_EDITING", field);
    });

    emiter.$on("component-delete", field => {
      this.$store.commit("form/DELETE_FIELD", field);
    });
  },
  render() {
    return (
      <el-aside class="aside right">
        <el-tabs type="border-card" class="max-aside">
          <el-tab-pane label="组件属性">
            {this.editing ? (
              <el-collapse
                v-model={this.groupNames}
                class="components"
                key={this.editing.uuid}
              >
                {this.editorGroups.map((group, index) => (
                  <el-collapse-item key={index} name={group.key}>
                    <div slot="title">
                      <i class="el-icon-s-operation"></i> {group.key}
                    </div>
                    <el-form
                      size="mini"
                      label-position="left"
                      label-width="80px"
                    >
                      <vjform
                        fields={group.fields}
                        value={this.editing}
                        onInput={this.updateEditing}
                        components={group.components}
                      ></vjform>
                    </el-form>
                  </el-collapse-item>
                ))}
              </el-collapse>
            ) : null}
          </el-tab-pane>
          <el-tab-pane label="页面属性">
            <el-collapse v-model={this.propNames} class="components">
              <datasource></datasource>
              <el-collapse-item key="vjform_watchs" name="vjform_watchs">
                <div slot="title">
                  <i class="el-icon-s-operation"></i> 监听
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    );
  }
});
