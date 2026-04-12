import { defineConfig } from 'vitepress'
import { getSidebar } from './utils/sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AuraLinks',
  description: '高速、稳定的 AI API 中转服务文档',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/favicon.png' }],
  ],

  themeConfig: {
    logo: '/images/logo.png',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '使用指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '安装配置', link: '/guide/installation' },
          { text: '使用示例', link: '/guide/examples' },
        ],
      },
      {
        text: '更多文档',
        link: '/articles/',
        activeMatch: '/articles/',
      },
      { text: '常见问题', link: '/faq' },
      { text: '拼车社区', link: '/community' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装配置', link: '/guide/installation' },
            { text: '使用示例', link: '/guide/examples' },
          ],
        },
      ],
      '/articles/': [
        {
          text: '更多文档',
          items: getSidebar('articles'),
        },
      ],
      '/faq': [
        {
          text: '常见问题',
          link: '/faq',
        },
      ],
      '/community': [
        {
          text: '拼车社区',
          link: '/community',
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: '© 2024-2026 AuraLinks',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangbhan/claude_relay_docs' },
    ],

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
