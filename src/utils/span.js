/*
 * @Description: span
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:17:24
 */

export function spanHasTag(key, value, span) {
  if (!Array.isArray(span.tags) || !span.tags.length) {
    return false
  }
  return span.tags.some(tag => tag.key === key && tag.value === value)
}

export const isClientSpan = spanHasTag.bind(null, 'span.kind', 'client')
export const isServerSpan = spanHasTag.bind(null, 'span.kind', 'server')

const isErrorBool = spanHasTag.bind(null, 'error', true)
const isErrorStr = spanHasTag.bind(null, 'error', 'true')
export const isErrorSpan = span => isErrorBool(span) || isErrorStr(span)

export function spanContainsErredSpan(spans, parentSpanIndex) {
  const { depth } = spans[parentSpanIndex]
  let i = parentSpanIndex + 1
  for (; i < spans.length && spans[i].depth > depth;i++) {
    if (isErrorSpan(spans[i])) {
      return true
    }
  }
  return false
}
