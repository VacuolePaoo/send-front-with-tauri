<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { Separator } from '@/components/ui/separator'

const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t('receive.label') }}
      </h2>
      <p class="text-muted-foreground">
        {{ t('receive.description') }}
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col items-center justify-center space-y-8 p-10">
      <div class="flex flex-col items-center space-y-4">
        <Icon icon="ph:download-simple-duotone" class="size-24 text-primary" />
        <h3 class="text-2xl font-semibold">
          {{ t('receive.waitingForFiles') }}
        </h3>
        <p class="text-muted-foreground text-center max-w-md">
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
