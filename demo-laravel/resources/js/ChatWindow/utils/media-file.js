import {
  IMAGE_TYPES,
  VIDEO_TYPES,
  AUDIO_TYPES,
  IMAGE_EXTENSIONS,
  VIDEO_EXTENSIONS,
  AUDIO_EXTENSIONS
} from './constants'

function checkMediaType(types, file) {
  if (!file || !file.type) return
  return types.some(t => file.type.toLowerCase().includes(t))
}

function checkMediaExtension(extensions, file) {
  if (!file || !file.name) return
  return extensions.some(e => file.name.toLowerCase().endsWith(e))
}

function checkMedia(types, extensions, file) {
  if (file && file.type) return checkMediaType(types, file)
  else if (file && file.name) return checkMediaExtension(extensions, file)
  return false
}

export function isImageFile(file) {
  return checkMedia(IMAGE_TYPES, IMAGE_EXTENSIONS, file)
}

export function isVideoFile(file) {
  return checkMedia(VIDEO_TYPES, VIDEO_EXTENSIONS, file)
}

export function isImageVideoFile(file) {
  return isImageFile(file) || isVideoFile(file)
}

export function isAudioFile(file) {
  return checkMedia(AUDIO_TYPES, AUDIO_EXTENSIONS, file)
}
