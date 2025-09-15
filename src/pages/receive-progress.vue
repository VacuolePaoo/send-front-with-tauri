<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const { t } = useI18n()

// 模拟发送端信息（待对接后端）
const senderInfo = {
  name: t('receiveProgress.senderInfo.namePlaceholder'),
  ip: t('receiveProgress.senderInfo.ipPlaceholder'),
}

// 模拟接收端信息（待对接后端）
const receiverInfo = {
  name: t('receiveProgress.receiverInfo.namePlaceholder'),
  ip: t('receiveProgress.receiverInfo.ipPlaceholder'),
}

// 模拟文件列表（待对接后端）
const fileList = [
  {
    id: '1',
    name: 'document.pdf',
    size: '2.4 MB',
    type: 'pdf',
    progress: 45,
  },
  {
    id: '2',
    name: 'image.png',
    size: '1.2 MB',
    type: 'image',
    progress: 70,
  },
  {
    id: '3',
    name: 'video.mp4',
    size: '24.5 MB',
    type: 'video',
    progress: 15,
  },
  {
    id: '4',
    name: 'archive.zip',
    size: '15.5 MB',
    type: 'archive',
    progress: 30,
  },
  {
    id: '5',
    name: 'presentation.pptx',
    size: '8.2 MB',
    type: 'presentation',
    progress: 60,
  },
  {
    id: '6',
    name: 'spreadsheet.xlsx',
    size: '5.1 MB',
    type: 'spreadsheet',
    progress: 90,
  },
  {
    id: '7',
    name: 'audio.mp3',
    size: '4.3 MB',
    type: 'audio',
    progress: 25,
  },
  {
    id: '8',
    name: 'text.txt',
    size: '0.2 MB',
    type: 'text',
    progress: 80,
  },
]
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col">
    <div class="space-y-0.5 flex-shrink-0">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t('receiveProgress.label') }}
      </h2>
      <p class="text-muted-foreground">
        {{ t('receiveProgress.description') }}
      </p>
    </div>
    <Separator class="my-6 flex-shrink-0" />

    <div class="space-y-6 flex-grow overflow-hidden flex flex-col">
      <!-- 发送端到接收端信息 -->
      <div class="rounded-lg border p-6 flex-shrink-0">
        <h3 class="text-lg font-semibold mb-4">
          {{ t('receiveProgress.connectionInfo.title') }}
        </h3>
        <div class="flex items-center justify-between">
          <!-- 发送端信息 -->
          <div class="flex flex-col items-center space-y-2">
            <div class="rounded-full bg-primary/10 p-3">
              <Icon icon="ph:computer-tower-duotone" class="size-6 text-primary" />
            </div>
            <div class="text-center">
              <div class="font-medium">
                {{ senderInfo.name }}
              </div>
              <div class="text-sm text-muted-foreground">
                {{ senderInfo.ip }}
              </div>
            </div>
          </div>

          <!-- 箭头指示 -->
          <div class="flex flex-col items-center">
            <Icon icon="ph:arrow-right-bold" class="size-6 text-muted-foreground" />
            <div class="text-sm text-muted-foreground mt-1">
              {{ t('receiveProgress.connectionInfo.sending') }}
            </div>
          </div>

          <!-- 接收端信息 -->
          <div class="flex flex-col items-center space-y-2">
            <div class="rounded-full bg-primary/10 p-3">
              <Icon icon="ph:download-simple-duotone" class="size-6 text-primary" />
            </div>
            <div class="text-center">
              <div class="font-medium">
                {{ receiverInfo.name }}
              </div>
              <div class="text-sm text-muted-foreground">
                {{ receiverInfo.ip }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文件列表 -->
      <div class="rounded-lg border flex-grow flex flex-col min-h-0">
        <div class="border-b p-4 flex-shrink-0">
          <h3 class="text-lg font-semibold">
            {{ t('receiveProgress.fileList.title') }}
          </h3>
        </div>
        <div class="divide-y overflow-y-auto flex-grow">
          <div
            v-for="file in fileList"
            :key="file.id"
            class="p-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon
                  :icon="`ph:${file.type}-duotone`"
                  class="size-8 text-primary"
                />
                <div>
                  <div class="font-medium">
                    {{ file.name }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    {{ file.size }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-24">
                  <div class="flex justify-between text-sm mb-1">
                    <span>{{ file.progress }}%</span>
                  </div>
                  <div class="w-full bg-secondary rounded-full h-1.5">
                    <div
                      class="bg-primary h-1.5 rounded-full"
                      :style="{ width: `${file.progress}%` }"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  @click="() => {}"
                >
                  {{ t('receiveProgress.fileList.cancel') }}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮和进度条 -->
      <div class="flex items-center justify-between flex-shrink-0">
        <!-- 简化版进度条 -->
        <div class="flex-grow mr-4">
          <div class="w-full bg-secondary rounded-full h-2">
            <div
              class="bg-primary h-2 rounded-full"
              style="width: 35%"
            />
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex space-x-3">
          <Button
            variant="outline"
            @click="() => {}"
          >
            {{ t('receiveProgress.actions.cancelAll') }}
          </Button>
          <Button
            @click="() => {}"
          >
            {{ t('receiveProgress.actions.acceptAll') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
