import fs from 'fs'
import path from 'path'

interface SidebarItem {
  text: string
  link: string
  order?: number
}

/**
 * 自动扫描指定目录下的 .md 文件，生成 VitePress 侧边栏配置。
 * 支持通过 frontmatter 中的 title 和 order 自定义显示名称和排序。
 *
 * @param dir 要扫描的目录（相对于 docs 根目录）
 * @returns VitePress SidebarItem 数组
 */
export function getSidebar(dir: string): SidebarItem[] {
  const docsRoot = path.resolve(__dirname, '../../')
  const targetDir = path.resolve(docsRoot, dir)

  if (!fs.existsSync(targetDir)) {
    return []
  }

  const files = fs.readdirSync(targetDir).filter(
    (file) => file.endsWith('.md') && file !== 'index.md'
  )

  const items: SidebarItem[] = files.map((file) => {
    const filePath = path.resolve(targetDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    // 解析 frontmatter
    const frontmatter = parseFrontmatter(content)
    const fileName = file.replace(/\.md$/, '')

    return {
      text: frontmatter.title || formatTitle(fileName),
      link: `/${dir}/${fileName}`,
      order: frontmatter.order ?? 999,
    }
  })

  // 按 order 排序
  items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

  // 移除 order 字段（VitePress 不需要）
  return items.map(({ order, ...rest }) => rest)
}

/**
 * 解析 Markdown 文件的 frontmatter
 */
function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter: Record<string, unknown> = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value: unknown = line.slice(colonIndex + 1).trim()

    // 类型转换
    if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (/^\d+$/.test(value as string)) value = parseInt(value as string, 10)

    frontmatter[key] = value
  }

  return frontmatter
}

/**
 * 文件名转标题：kebab-case → 中文友好格式
 * 如 my-document → My Document
 */
function formatTitle(fileName: string): string {
  return fileName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
