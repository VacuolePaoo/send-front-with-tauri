<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="container mx-auto">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t('home.label') }}
      </h2>
    </div>
    <Separator class="my-6" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 接收文件卡片 -->
      <RouterLink to="/receive" class="group">
        <div class="rounded-lg border bg-card p-6 h-full flex flex-col justify-between transition-colors duration-200 group-hover:border-primary">
          <div>
            <Icon icon="ph:box-arrow-down-duotone" class="size-12 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">
              {{ t('receive.label') }}
            </h3>
            <p class="text-muted-foreground">
              {{ t('receive.description') }}
            </p>
          </div>
          <Button variant="default" class="w-full mt-4 group-hover:bg-primary/90">
            {{ t('receive.label') }}
          </Button>
        </div>
      </RouterLink>

      <!-- 发送文件卡片 -->
      <RouterLink to="/send" class="group">
        <div class="rounded-lg border bg-card p-6 h-full flex flex-col justify-between transition-colors duration-200 group-hover:border-primary">
          <div>
            <Icon icon="ph:paper-plane-right-duotone" class="size-12 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">
              {{ t('send.label') }}
            </h3>
            <p class="text-muted-foreground">
              {{ t('send.description') }}
            </p>
          </div>
          <Button variant="default" class="w-full mt-4 group-hover:bg-primary/90">
            {{ t('send.label') }}
          </Button>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
