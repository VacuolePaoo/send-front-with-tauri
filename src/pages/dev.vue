<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const router = useRouter()
const { t } = useI18n()

function navigateTo(page: string) {
  router.push({ name: page })
}
</script>

<template>
  <div class="container mx-auto">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t('dev.title') }}
      </h2>
      <p class="text-muted-foreground">
        {{ t('dev.description') }}
      </p>
    </div>
    <Separator class="my-6" />

    <div class="space-y-6 p-10">
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">
          {{ t('dev.navigation.title') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            @click="() => navigateTo('home')"
          >
            {{ t('dev.navigation.home') }}
          </Button>
          <Button
            variant="outline"
            @click="() => navigateTo('receive')"
          >
            {{ t('dev.navigation.receive') }}
          </Button>
          <Button
            variant="outline"
            @click="() => navigateTo('receive-progress')"
          >
            {{ t('dev.navigation.receiveProgress') }}
          </Button>
          <Button
            variant="outline"
            @click="() => navigateTo('settings')"
          >
            {{ t('dev.navigation.settings') }}
          </Button>
        </div>
      </div>

      <Separator />

      <div class="space-y-4">
        <h3 class="text-xl font-semibold">
          {{ t('dev.actions.title') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            class="h-20"
            @click="() => navigateTo('receive-progress')"
          >
            <div class="flex flex-col items-center">
              <span class="font-medium">{{ t('dev.actions.startReceive') }}</span>
              <span class="text-sm opacity-80">{{ t('dev.actions.startReceiveDesc') }}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
