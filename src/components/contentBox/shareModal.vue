<!--
 * @Author: 付柏磊
 * @Date: 2022-09-15 10:39:51
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-15 10:39:51
 * @Description: 分享公用弹窗
-->
<template>
  <div class="shareModal">
    <Modal
        v-model="shareModal"
        :title="shareTitle"
        width="400"
        @on-cancel="cancel"
    >
      <Form ref="formInline" :label-width="85" label-position="right">
        <FormItem label="留言：">
          <Input style="width: 240px" v-model="newMessage" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="" />
        </FormItem>
        <FormItem label="使用人：">
          <p style="">
          <span style="color: #ed4014"
          >请前往【账号管理】创建其他使用人分账户。</span
          >
          </p>
        </FormItem>
        <FormItem label="被分享人：" class="tree">
          <treeselect
              style="width: 240px"
              v-model="newShareUser"
              :multiple="true"
              :options="teamUserOther"
              placeholder="所有人"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="handleOk">确认分享</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "shareModal",
  props: {
    message: String,
    shareUser: Array,
    shareTitle: {
      type: String,
      default: "分享"
    }
  },
  data(){
    return{
      shareModal: false,
    }
  },
  created() {
    this.shareModal = true;
  },
  computed: {
    ...mapGetters(["teamUserOther"]),
    newMessage: {
      get() {
        return this.message;
      },
      set(val) {
        this.$emit('update:message', val);
      }
    },
    newShareUser: {
      get() {
        return this.shareUser;
      },
      set(val) {
        this.$emit('update:shareUser', val);
      }
    }
  },
  methods: {
    cancel(){
      this.$emit("handleClose", false);
    },
    handleOk(){
      this.$emit("handleOk", true);
    }
  }
}
</script>

<style scoped>

</style>