<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex h-10 bg-sidebar items-center px-4">
    <h1 class="text-sm font-medium text-sidebar-foreground">
      {{ t('app.title') }}
    </h1>
  </div>
</template>
