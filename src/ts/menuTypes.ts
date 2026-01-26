interface IterMenuItem {
  id: number | string
  name: string
  path: string
  icon?: string
  children?: IterMenuItem[]
}

export type { IterMenuItem }
