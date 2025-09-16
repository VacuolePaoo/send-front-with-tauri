export interface FileTypeInfo {
  icon: string
  color: string
  type: string
}

// 文件扩展名到图标的映射
const fileIconMap: Record<string, FileTypeInfo> = {
  // 文档文件
  'doc': { icon: 'ph:file-doc-duotone', color: 'text-blue-500', type: 'document' },
  'docx': { icon: 'ph:file-doc-duotone', color: 'text-blue-500', type: 'document' },
  'pdf': { icon: 'ph:file-pdf-duotone', color: 'text-red-500', type: 'document' },
  'txt': { icon: 'ph:file-text-duotone', color: 'text-gray-500', type: 'document' },
  'rtf': { icon: 'ph:file-text-duotone', color: 'text-gray-500', type: 'document' },
  'md': { icon: 'ph:file-text-duotone', color: 'text-gray-500', type: 'document' },
  'pages': { icon: 'ph:file-duotone', color: 'text-blue-500', type: 'document' },

  // 表格文件
  'xls': { icon: 'ph:file-excel-duotone', color: 'text-green-500', type: 'spreadsheet' },
  'xlsx': { icon: 'ph:file-excel-duotone', color: 'text-green-500', type: 'spreadsheet' },
  'csv': { icon: 'ph:table-duotone', color: 'text-green-600', type: 'spreadsheet' },
  'numbers': { icon: 'ph:file-excel-duotone', color: 'text-green-500', type: 'spreadsheet' },

  // 演示文稿
  'ppt': { icon: 'ph:file-powerpoint-duotone', color: 'text-orange-500', type: 'presentation' },
  'pptx': { icon: 'ph:file-powerpoint-duotone', color: 'text-orange-500', type: 'presentation' },
  'key': { icon: 'ph:file-powerpoint-duotone', color: 'text-orange-500', type: 'presentation' },

  // 图片文件
  'jpg': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'jpeg': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'png': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'gif': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'svg': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'webp': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'bmp': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },
  'ico': { icon: 'ph:file-image-duotone', color: 'text-purple-500', type: 'image' },

  // 音频文件
  'mp3': { icon: 'ph:file-audio-duotone', color: 'text-yellow-500', type: 'audio' },
  'wav': { icon: 'ph:file-audio-duotone', color: 'text-yellow-500', type: 'audio' },
  'flac': { icon: 'ph:file-audio-duotone', color: 'text-yellow-500', type: 'audio' },
  'aac': { icon: 'ph:file-audio-duotone', color: 'text-yellow-500', type: 'audio' },
  'ogg': { icon: 'ph:file-audio-duotone', color: 'text-yellow-500', type: 'audio' },
  'm4a': { icon: 'ph:file-audio-duotone', color: 'text-yellow-500', type: 'audio' },

  // 视频文件
  'mp4': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },
  'avi': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },
  'mkv': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },
  'mov': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },
  'webm': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },
  'flv': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },
  'mpeg': { icon: 'ph:file-video-duotone', color: 'text-teal-500', type: 'video' },

  // 压缩文件
  'zip': { icon: 'ph:package-duotone', color: 'text-yellow-600', type: 'archive' },
  'rar': { icon: 'ph:package-duotone', color: 'text-yellow-600', type: 'archive' },
  '7z': { icon: 'ph:package-duotone', color: 'text-yellow-600', type: 'archive' },
  'tar': { icon: 'ph:package-duotone', color: 'text-yellow-600', type: 'archive' },
  'gz': { icon: 'ph:package-duotone', color: 'text-yellow-600', type: 'archive' },
  'bz2': { icon: 'ph:package-duotone', color: 'text-yellow-600', type: 'archive' },

  // 代码文件
  'js': { icon: 'ph:file-js-duotone', color: 'text-yellow-500', type: 'code' },
  'ts': { icon: 'ph:file-ts-duotone', color: 'text-blue-600', type: 'code' },
  'jsx': { icon: 'ph:file-jsx-duotone', color: 'text-cyan-500', type: 'code' },
  'tsx': { icon: 'ph:file-jsx-duotone', color: 'text-blue-500', type: 'code' },
  'html': { icon: 'ph:file-html-duotone', color: 'text-orange-600', type: 'code' },
  'css': { icon: 'ph:file-css-duotone', color: 'text-blue-500', type: 'code' },
  'scss': { icon: 'ph:file-css-duotone', color: 'text-pink-500', type: 'code' },
  'sass': { icon: 'ph:file-css-duotone', color: 'text-pink-500', type: 'code' },
  'vue': { icon: 'ph:file-code-duotone', color: 'text-green-500', type: 'code' },
  'json': { icon: 'ph:code-block-duotone', color: 'text-yellow-600', type: 'code' },
  'xml': { icon: 'ph:code-block-duotone', color: 'text-teal-500', type: 'code' },
  'yml': { icon: 'ph:file-text-duotone', color: 'text-red-500', type: 'code' },
  'yaml': { icon: 'ph:file-text-duotone', color: 'text-red-500', type: 'code' },
  'mdx': { icon: 'ph:file-text-duotone', color: 'text-indigo-500', type: 'code' },

  // 可执行文件
  'exe': { icon: 'ph:gear-six-duotone', color: 'text-red-600', type: 'executable' },
  'msi': { icon: 'ph:gear-six-duotone', color: 'text-red-600', type: 'executable' },
  'app': { icon: 'ph:app-window-duotone', color: 'text-blue-500', type: 'executable' },
  'dmg': { icon: 'ph:app-window-duotone', color: 'text-blue-500', type: 'executable' },

  // 数据库文件
  'db': { icon: 'ph:database-duotone', color: 'text-emerald-500', type: 'database' },
  'sqlite': { icon: 'ph:database-duotone', color: 'text-emerald-500', type: 'database' },
  'sql': { icon: 'ph:database-duotone', color: 'text-emerald-500', type: 'database' },
}

// 默认图标
const defaultFileIcon: FileTypeInfo = {
  icon: 'ph:file-duotone',
  color: 'text-gray-500',
  type: 'file',
}

const defaultFolderIcon: FileTypeInfo = {
  icon: 'ph:folder-duotone',
  color: 'text-yellow-500',
  type: 'folder',
}

const defaultTextIcon: FileTypeInfo = {
  icon: 'ph:chat-centered-text-duotone',
  color: 'text-blue-500',
  type: 'text',
}

/**
 * 根据文件扩展名获取图标信息
 * @param fileName 文件名
 * @param fileType 文件类型 (file, folder, text)
 * @returns 图标信息
 */
export function getFileIconInfo(fileName: string, fileType: string): FileTypeInfo {
  // 如果是文件夹
  if (fileType === 'folder') {
    return defaultFolderIcon
  }

  // 如果是文本
  if (fileType === 'text') {
    return defaultTextIcon
  }

  // 如果是文件，根据扩展名获取图标
  if (fileType === 'file') {
    const ext = fileName.split('.').pop()?.toLowerCase() || ''
    return fileIconMap[ext] || defaultFileIcon
  }

  // 默认返回文件图标
  return defaultFileIcon
}
