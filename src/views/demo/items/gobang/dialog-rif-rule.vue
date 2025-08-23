<template>
  <el-dialog v-model="dialogVisible" title="设置RIF规则" :width="280">
    <div class="dialog-content">
      <el-checkbox class="checkbox-cbt" v-model="ruleData.rifOpen" label="启用RIF规则" />
      <el-checkbox
        v-if="ruleData.rifOpen"
        class="checkbox-yj"
        v-model="ruleData.threeRoundsExchange"
        label="启用三手交换"
      />
      <el-checkbox
        v-if="ruleData.rifOpen"
        class="checkbox-cbt"
        v-model="ruleData.fiveRoundsTwoDrop"
        label="启用五手两打"
      />
      <el-checkbox
        v-if="ruleData.rifOpen"
        class="checkbox-yj"
        v-model="ruleData.blackForbidden"
        label="启用禁手"
      />
    </div>
    <template #footer>
      <el-button color="#3f72af" plain @click="dialogVisible = false">取消</el-button>
      <el-button color="#88304e" plain @click="changeRule">确认</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { useVModel } from '@vueuse/core'
import cloneDeep from 'lodash/cloneDeep'
import useDemoDataStore from '@stores/demo-data'

defineComponent({
  name: 'dialog-rif-rule',
})
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const demoDataStore = useDemoDataStore()

const emit = defineEmits(['update:visible', 'updata'])

const dialogVisible = useVModel(props, 'visible', emit)

const ruleData = ref({})

function changeRule() {
  demoDataStore.setGobang(cloneDeep(ruleData.value))
  dialogVisible.value = false
  emit('updata')
}

watch(dialogVisible, (newVal) => {
  if (newVal) {
    ruleData.value = cloneDeep(demoDataStore.getGobang())
  }
})
</script>
<style lang="scss" scoped>
.dialog-content {
  margin-top: 16px;
  :deep {
    .el-checkbox {
      margin: 0 48px;
    }
  }
}
.checkbox-cbt {
  :deep {
    .el-checkbox__inner:hover {
      border-color: #3f72af;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #3f72af;
      border-color: #3f72af;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #3f72af;
    }
  }
}
.checkbox-yj {
  :deep {
    .el-checkbox__inner:hover {
      border-color: #88304e !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #88304e;
      border-color: #88304e;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #88304e;
    }
  }
}
</style>
