<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div class="flex flex-col items-center space-y-6">
        <Icon icon="ph:download-simple-duotone" class="size-32 text-primary" />
        <h1 class="text-4xl font-bold text-center">
          {{ t('receive.waitingForFiles') }}
        </h1>
        <p class="text-muted-foreground text-center text-lg max-w-md">
          {{ t('receive.instruction') }}
        </p>
      </div>

      <div class="w-full max-w-md space-y-4">
        <div class="rounded-lg border p-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <Icon icon="ph:computer-tower-duotone" class="size-5 text-primary" />
              <span class="font-medium">{{ t('receive.deviceName') }}:</span>
              <span class="text-muted-foreground">{{ t('receive.deviceNamePlaceholder') }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <Icon icon="ph:network-duotone" class="size-5 text-primary" />
              <span class="font-medium">{{ t('receive.deviceIp') }}:</span>
              <span class="text-muted-foreground">{{ t('receive.deviceIpPlaceholder') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
