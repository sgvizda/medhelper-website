/** Minimal helpers to build Lexical rich-text JSON for seeding. */
type Node = Record<string, unknown>

const textNode = (text: string, bold = false): Node => ({
  type: 'text',
  text,
  format: bold ? 1 : 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const base = { direction: 'ltr', format: '', indent: 0, version: 1 }

export const p = (text: string): Node => ({ ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [textNode(text)] })
export const h = (text: string, tag: 'h2' | 'h3' = 'h2'): Node => ({ ...base, type: 'heading', tag, children: [textNode(text)] })
export const ul = (items: string[]): Node => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  children: items.map((t, i) => ({ ...base, type: 'listitem', value: i + 1, children: [textNode(t)] })),
})

export const doc = (...children: Node[]) => ({
  root: { ...base, type: 'root', children },
})
