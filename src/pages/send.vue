<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { open } from '@tauri-apps/plugin-dialog'
import { filesize } from 'filesize'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { Textarea } from '@/components/ui/textarea'

const { t } = useI18n()

// 模拟设备列表（待对接后端）
const devices = [
  {
    id: '1',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '2',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '3',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '4',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '5',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '6',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '7',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '8',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
  {
    id: '9',
    name: t('send.devicePlaceholder.name'),
    ip: t('send.devicePlaceholder.ip'),
    status: 'online',
  },
]

// 已选择的项目列表
const selectedItems = ref<{ id: string, name: string, size: string, type: 'file' | 'folder' | 'text', path?: string, content?: string }[]>([])

// 文本输入对话框控制
const isTextDialogOpen = ref(false)
const textInput = ref('')

// 选择文件
async function selectFiles() {
  try {
    const selected = await open({
      multiple: true,
      filters: [{
        name: t('send.allFiles'),
        extensions: ['*'],
      }],
    })

    if (selected) {
      const files = Array.isArray(selected) ? selected : [selected]

      // 获取文件信息（实际项目中可能需要调用Tauri的fs模块获取文件大小）
      const newFiles = files.map((path, index) => {
        // 从路径中提取文件名
        const fileName = path.split(/[/\\]/).pop() || `file-${Date.now()}-${index}`

        return {
          id: `${Date.now()}-${index}`,
          name: fileName,
          size: '0 Bytes', // 实际项目中需要获取真实文件大小
          type: 'file' as const,
          path,
        }
      })

      selectedItems.value = [...selectedItems.value, ...newFiles]
    }
  }
  catch (error) {
    console.error('选择文件时出错:', error)
  }
}

// 选择文件夹
async function selectFolders() {
  try {
    const selected = await open({
      directory: true,
      multiple: true,
    })

    if (selected) {
      const folders = Array.isArray(selected) ? selected : [selected]

      // 获取文件夹信息
      const newFolders = folders.map((path, index) => {
        // 从路径中提取文件夹名
        const folderName = path.split(/[/\\]/).pop() || `folder-${Date.now()}-${index}`

        return {
          id: `${Date.now()}-${index}`,
          name: folderName,
          size: '0 Bytes', // 实际项目中需要计算文件夹大小
          type: 'folder' as const,
          path,
        }
      })

      selectedItems.value = [...selectedItems.value, ...newFolders]
    }
  }
  catch (error) {
    console.error('选择文件夹时出错:', error)
  }
}

// 添加文本
function addText() {
  if (textInput.value.trim()) {
    const newText = {
      id: Date.now().toString(),
      name: t('send.textItemName', { count: selectedItems.value.filter(item => item.type === 'text').length + 1 }),
      size: filesize(new TextEncoder().encode(textInput.value).length),
      type: 'text' as const,
      content: textInput.value,
    }

    selectedItems.value = [...selectedItems.value, newText]
    textInput.value = ''
    isTextDialogOpen.value = false
  }
}

// 删除项目
function removeItem(itemId: string) {
  selectedItems.value = selectedItems.value.filter(item => item.id !== itemId)
}

// 清空所有项目
function clearAllItems() {
  selectedItems.value = []
}

// 获取项目图标
function getItemIcon(type: string) {
  switch (type) {
    case 'file':
      return 'ph:file-duotone'
    case 'folder':
      return 'ph:folder-duotone'
    case 'text':
      return 'ph:chat-centered-text-duotone'
    default:
      return 'ph:file-duotone'
  }
}
</script>

<template>
  <div class="container mx-auto flex flex-col h-full">
    <div class="space-y-0.5 flex-shrink-0">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t('send.label') }}
      </h2>
      <p class="text-muted-foreground">
        {{ t('send.description') }}
      </p>
    </div>
    <Separator class="my-6 flex-shrink-0" />

    <!-- 顶部操作按钮 -->
    <div class="flex flex-wrap gap-3 mb-6 flex-shrink-0">
      <Button @click="selectFiles">
        <Icon icon="ph:file-plus-duotone" class="mr-2 size-5" />
        {{ t('send.selectFiles') }}
      </Button>
      <Button variant="outline" @click="selectFolders">
        <Icon icon="ph:folder-plus-duotone" class="mr-2 size-5" />
        {{ t('send.selectFolders') }}
      </Button>

      <Dialog v-model:open="isTextDialogOpen">
        <DialogTrigger as-child>
          <Button variant="outline">
            <Icon icon="ph:chat-centered-text-duotone" class="mr-2 size-5" />
            {{ t('send.sendText') }}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ t('send.sendText') }}</DialogTitle>
          </DialogHeader>
          <div class="space-y-4">
            <Textarea
              v-model="textInput"
              :placeholder="t('send.textPlaceholder')"
              rows="5"
            />
            <div class="flex justify-end space-x-2">
              <Button variant="outline" @click="isTextDialogOpen = false">
                {{ t('send.cancel') }}
              </Button>
              <Button @click="addText">
                {{ t('send.add') }}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        class="ml-auto"
        :disabled="selectedItems.length === 0"
      >
        <Icon icon="ph:paper-plane-tilt-duotone" class="mr-2 size-5" />
        {{ t('send.send') }}
      </Button>
    </div>

    <!-- 项目列表 -->
    <div v-if="selectedItems.length > 0" class="mb-6">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold">
          {{ t('send.selectedItems') }}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground hover:text-foreground"
          @click="clearAllItems"
        >
          {{ t('send.clearAll') }}
        </Button>
      </div>
      <div class="rounded-lg border">
        <div class="divide-y">
          <div
            v-for="item in selectedItems"
            :key="item.id"
            class="p-3 flex items-center"
          >
            <Icon
              :icon="getItemIcon(item.type)"
              class="size-5 text-primary mr-3"
            />
            <div class="flex-grow min-w-0">
              <div class="font-medium text-sm truncate">
                {{ item.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ item.size }} · {{ t(`send.${item.type}`) }}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="text-muted-foreground hover:text-foreground"
              @click="() => removeItem(item.id)"
            >
              <Icon icon="ph:x" class="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <Separator class="flex-shrink-0" />

    <!-- 设备列表 -->
    <div class="mt-6 flex-grow overflow-hidden flex flex-col">
      <h3 class="text-lg font-semibold mb-4">
        {{ t('send.availableDevices') }}
      </h3>
      <div class="overflow-y-auto flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
          <div
            v-for="device in devices"
            :key="device.id"
            class="rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer flex items-center h-20"
          >
            <div class="rounded-full bg-primary/10 p-1.5 mr-2">
              <Icon icon="ph:computer-tower-duotone" class="size-4 text-primary" />
            </div>
            <div class="flex-grow min-w-0">
              <div class="font-medium text-sm truncate">
                {{ device.name }}
              </div>
              <div class="text-xs text-muted-foreground truncate">
                {{ device.ip }}
              </div>
            </div>
            <div class="ml-2">
              <div class="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
