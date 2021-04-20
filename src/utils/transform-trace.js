
export const TREE_ROOT_ID = '__root__'

class TreeNode {
  static iterFunction(fn, depth = 0) {
    return node => fn(node.value, node, depth)
  }

  static searchFunction(search) {
    if (typeof search === 'function') {
      return search
    }

    return (value, node) => (search instanceof TreeNode ? node === search : value === search)
  }

  constructor(value, children = []) {
    this.value = value
    this.children = children
  }

  get depth() {
    return this.children.reduce((depth, child) => Math.max(child.depth + 1, depth), 1)
  }

  get size() {
    let i = 0
    this.walk(() => i++)
    return i
  }

  addChild(child) {
    this.children.push(child instanceof TreeNode ? child : new TreeNode(child))
    return this
  }

  find(search) {
    const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search))
    if (searchFn(this)) {
      return this
    }
    for (let i = 0;i < this.children.length;i++) {
      const result = this.children[i].find(search)
      if (result) {
        return result
      }
    }
    return null
  }

  getPath(search) {
    const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search))

    const findPath = (currentNode, currentPath) => {
      // skip if we already found the result
      const attempt = currentPath.concat([currentNode])
      // base case: return the array when there is a match
      if (searchFn(currentNode)) {
        return attempt
      }
      for (let i = 0;i < currentNode.children.length;i++) {
        const child = currentNode.children[i]
        const match = findPath(child, attempt)
        if (match) {
          return match
        }
      }
      return null
    }

    return findPath(this, [])
  }

  walk(fn, depth = 0) {
    const nodeStack = []
    let actualDepth = depth
    nodeStack.push({ node: this, depth: actualDepth })
    while (nodeStack.length) {
      const { node, depth: nodeDepth } = nodeStack.pop()
      fn(node.value, node, nodeDepth)
      actualDepth = nodeDepth + 1
      let i = node.children.length - 1
      while (i >= 0) {
        nodeStack.push({ node: node.children[i], depth: actualDepth })
        i--
      }
    }
  }

  paths(fn) {
    const stack = []
    stack.push({ node: this, childIndex: 0 })
    const paths = []
    while (stack.length) {
      const { node, childIndex } = stack[stack.length - 1]
      if (node.children.length >= childIndex + 1) {
        stack[stack.length - 1].childIndex++
        stack.push({ node: node.children[childIndex], childIndex: 0 })
      } else {
        if (node.children.length === 0) {
          const path = stack.map(item => item.node.value)
          fn(path)
        }
        stack.pop()
      }
    }
    return paths
  }
}

export function _getTraceNameImpl(spans) {
  // Use a span with no references to another span in given array
  // prefering the span with the fewest references
  // using start time as a tie breaker
  let candidateSpan
  const allIDs = new Set(spans.map(({ span_id }) => span_id))

  for (let i = 0;i < spans.length;i++) {
    const hasInternalRef =
      spans[i].references &&
      spans[i].references.some(({ trace_id, span_id }) => trace_id === spans[i].trace_id && allIDs.has(span_id))
    if (hasInternalRef) continue

    if (!candidateSpan) {
      candidateSpan = spans[i]
      continue
    }

    const thisRefLength = (spans[i].references && spans[i].references.length) || 0
    const candidateRefLength = (candidateSpan.references && candidateSpan.references.length) || 0

    if (
      thisRefLength < candidateRefLength ||
      (thisRefLength === candidateRefLength && spans[i].start_time < candidateSpan.start_time)
    ) {
      candidateSpan = spans[i]
    }
  }
  return candidateSpan ? `${candidateSpan.process.service_name}: ${candidateSpan.operation_name}` : ''
}

export const getTraceName = window._.memoize(_getTraceNameImpl, (spans) => {
  if (!spans.length) return 0
  return spans[0].trace_id
})

export function getTraceSpanIdsAsTree(trace) {
  const nodesById = new Map(trace.spans.map(span => [
    span.span_id,
    new TreeNode(span.span_id)
  ]))
  const spansById = new Map(trace.spans.map(span => [span.span_id, span]))
  const root = new TreeNode(TREE_ROOT_ID)
  trace.spans.forEach((span) => {
    const node = nodesById.get(span.span_id)
    if (Array.isArray(span.references) && span.references.length) {
      const { ref_type, span_id: parent_id } = span.references[0]
      if (ref_type === 'CHILD_OF' || ref_type === 'FOLLOWS_FROM') {
        const parent = nodesById.get(parent_id) || root
        parent.children.push(node)
      } else {
        throw new Error(`Unrecognized ref type: ${ref_type}`)
      }
    } else {
      root.children.push(node)
    }
  })
  const comparator = (nodeA, nodeB) => {
    const a = spansById.get(nodeA.value)
    const b = spansById.get(nodeB.value)
    return +(a.start_time > b.start_time) || +(a.start_time === b.start_time) - 1
  }
  trace.spans.forEach((span) => {
    const node = nodesById.get(span.span_id)
    if (node.children.length > 1) {
      node.children.sort(comparator)
    }
  })
  root.children.sort(comparator)
  return root
}

// exported for tests
export function deduplicateTags(spanTags) {
  const warningsHash = new Map()
  const tags = spanTags.reduce((uniqueTags, tag) => {
    if (!uniqueTags.some(t => t.key === tag.key && t.value === tag.value)) {
      uniqueTags.push(tag)
    } else {
      warningsHash.set(`${tag.key}:${tag.value}`, `Duplicate tag "${tag.key}:${tag.value}"`)
    }
    return uniqueTags
  }, [])
  const warnings = Array.from(warningsHash.values())
  return { tags, warnings }
}

// exported for tests
export function orderTags(spanTags, topPrefixes) {
  const orderedTags = spanTags.slice()
  const tp = (topPrefixes || []).map(p => p.toLowerCase())

  orderedTags.sort((a, b) => {
    const aKey = a.key.toLowerCase()
    const bKey = b.key.toLowerCase()

    for (let i = 0;i < tp.length;i++) {
      const p = tp[i]
      if (aKey.startsWith(p) && !bKey.startsWith(p)) {
        return -1
      }
      if (!aKey.startsWith(p) && bKey.startsWith(p)) {
        return 1
      }
    }

    if (aKey > bKey) {
      return 1
    }
    if (aKey < bKey) {
      return -1
    }
    return 0
  })

  return orderedTags
}

export function transformTraceData(data) {
  let { trace_id } = data
  if (!trace_id) {
    return null
  }
  trace_id = trace_id.toLowerCase()

  let traceEndTime = 0
  let traceStartTime = Number.MAX_SAFE_INTEGER
  const spanIdCounts = new Map()
  const spanMap = new Map()
  // filter out spans with empty start times
  // eslint-disable-next-line no-param-reassign
  data.spans = data.spans.filter(span => Boolean(span.start_time))

  const max = data.spans.length
  for (let i = 0;i < max;i++) {
    const span = data.spans[i]
    const { start_time, duration, process_id } = span
    //
    let span_id = span.span_id
    // check for start / end time for the trace
    if (start_time < traceStartTime) {
      traceStartTime = start_time
    }
    if (start_time + duration > traceEndTime) {
      traceEndTime = start_time + duration
    }
    // make sure span IDs are unique
    const idCount = spanIdCounts.get(span_id)
    if (idCount != null) {
      spanIdCounts.set(span_id, idCount + 1)
      span_id = `${span_id}_${idCount}`
      span.span_id = span_id
    } else {
      spanIdCounts.set(span_id, 1)
    }
    span.process = data.processes[process_id]
    spanMap.set(span_id, span)
  }
  // tree is necessary to sort the spans, so children follow parents, and
  // siblings are sorted by start time
  const tree = getTraceSpanIdsAsTree(data)
  const spans = []
  const svcCounts = {}

  tree.walk((span_id, node, depth = 0) => {
    if (span_id === '__root__') {
      return
    }
    const span = spanMap.get(span_id)
    if (!span) {
      return
    }
    const { service_name } = span.process
    svcCounts[service_name] = (svcCounts[service_name] || 0) + 1
    span.relative_start_time = span.start_time - traceStartTime
    span.depth = depth - 1
    span.hasChildren = node.children.length > 0
    span.warnings = span.warnings || []
    span.tags = span.tags || []
    span.references = span.references || []
    const tagsInfo = deduplicateTags(span.tags)
    span.tags = orderTags(tagsInfo.tags)
    span.warnings = span.warnings.concat(tagsInfo.warnings)
    span.references.forEach((ref, index) => {
      const refSpan = spanMap.get(ref.span_id)
      if (refSpan) {
        // eslint-disable-next-line no-param-reassign
        ref.span = refSpan
        if (index > 0) {
          // Don't take into account the parent, just other references.
          refSpan.subsidiarilyReferencedBy = refSpan.subsidiarilyReferencedBy || []
          refSpan.subsidiarilyReferencedBy.push({
            span_id,
            trace_id,
            span,
            ref_type: ref.ref_type
          })
        }
      }
    })
    spans.push(span)
  })
  const trace_name = getTraceName(spans)
  const services = Object.keys(svcCounts).map(name => ({
    name,
    numberOfSpans: svcCounts[name]
  }))
  return {
    services,
    spans,
    trace_id,
    trace_name,
    processes: data.processes,
    duration: traceEndTime - traceStartTime,
    start_time: traceStartTime,
    end_time: traceEndTime
  }
}
