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
]

// 模拟总进度（待对接后端）
const totalProgress = 35
</script>

<template>
  <div class="container mx-auto">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t('receiveProgress.label') }}
      </h2>
      <p class="text-muted-foreground">
        {{ t('receiveProgress.description') }}
      </p>
    </div>
    <Separator class="my-6" />

    <div class="space-y-6">
      <!-- 发送端信息 -->
      <div class="rounded-lg border p-6">
        <h3 class="text-lg font-semibold mb-4">
          {{ t('receiveProgress.senderInfo.title') }}
        </h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <Icon icon="ph:computer-tower-duotone" class="size-5 text-primary" />
            <span class="font-medium">{{ t('receiveProgress.senderInfo.name') }}:</span>
            <span class="text-muted-foreground">{{ senderInfo.name }}</span>
          </div>
          <div class="flex items-center space-x-3">
            <Icon icon="ph:network-duotone" class="size-5 text-primary" />
            <span class="font-medium">{{ t('receiveProgress.senderInfo.ip') }}:</span>
            <span class="text-muted-foreground">{{ senderInfo.ip }}</span>
          </div>
        </div>
      </div>

      <!-- 总体进度 -->
      <div class="rounded-lg border p-6">
        <div class="flex justify-between mb-2">
          <h3 class="text-lg font-semibold">
            {{ t('receiveProgress.overallProgress') }}
          </h3>
          <span class="text-muted-foreground">{{ totalProgress }}%</span>
        </div>
        <div class="w-full bg-secondary rounded-full h-2.5">
          <div
            class="bg-primary h-2.5 rounded-full"
            :style="{ width: `${totalProgress}%` }"
          />
        </div>
      </div>

      <!-- 文件列表 -->
      <div class="rounded-lg border">
        <div class="border-b p-4">
          <h3 class="text-lg font-semibold">
            {{ t('receiveProgress.fileList.title') }}
          </h3>
        </div>
        <div class="divide-y">
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

      <!-- 操作按钮 -->
      <div class="flex justify-end space-x-3">
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
</template>
