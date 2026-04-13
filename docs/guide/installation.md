# 安装配置

了解如何在各种 AI 客户端中配置中转站服务。

## 通用配置

所有兼容 OpenAI 协议的客户端，只需修改两个参数：

| 参数 | 值                               |
|------|---------------------------------|
| `API Key` | `cr-xxxxxxxxxxxxxxxxxxxxxxxx`   |
| `Base URL` | `https://api.your-relay.com/v1` |

## Claude Code

Claude Code 是 Anthropic 官方的 AI 编程助手 CLI 工具，支持终端交互式编程、代码审查、重构等。

### 安装 Node.js 环境

Claude Code 需要 Node.js 18+ 环境。

::: code-group

```bash [Windows (Chocolatey)]
choco install nodejs
```

```bash [Windows (Scoop)]
scoop install nodejs
```

```bash [macOS (Homebrew)]
brew install node
```

```bash [Linux / WSL2 (nvm)]
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc

# 安装最新 LTS 版本
nvm install --lts
```

:::

> Windows 用户也可直接从 [Node.js 官网](https://nodejs.org/) 下载 LTS 版本安装包。

验证安装是否成功：

```bash
node --version
npm --version
```

如果显示版本号，说明安装成功。

### 安装 Claude Code

```bash
# 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code
```

验证安装：

```bash
claude --version
```

> 如果遇到权限问题，Windows 用户请以管理员身份运行 PowerShell，macOS/Linux 用户可在命令前加 `sudo`。

### 配置环境变量

为了让 Claude Code 连接到中转服务，需要设置以下环境变量：

| 变量名 | 值 |
|--------|-----|
| `ANTHROPIC_BASE_URL` | `https://api.your-relay.com/v1` |
| `ANTHROPIC_AUTH_TOKEN` | 你的 API Key |

::: code-group

```powershell [Windows PowerShell（临时）]
# 当前会话生效
$env:ANTHROPIC_BASE_URL = "https://api.your-relay.com/v1"
$env:ANTHROPIC_AUTH_TOKEN = "cr-xxxxxxxxxxxxxxxxxxxxxxxx"
```

```powershell [Windows PowerShell（永久）]
# 设置用户级环境变量（永久生效）
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.your-relay.com/v1", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "cr-xxxxxxxxxxxxxxxxxxxxxxxx", [System.EnvironmentVariableTarget]::User)

# 设置后需要重新打开 PowerShell 窗口才能生效
```

```bash [macOS / Linux（临时）]
# 当前终端会话生效
export ANTHROPIC_BASE_URL="https://api.your-relay.com/v1"
export ANTHROPIC_AUTH_TOKEN="cr-xxxxxxxxxxxxxxxxxxxxxxxx"
```

```bash [macOS / Linux（永久）]
# 将以下内容添加到 ~/.bashrc 或 ~/.zshrc
echo 'export ANTHROPIC_BASE_URL="https://api.your-relay.com/v1"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="cr-xxxxxxxxxxxxxxxxxxxxxxxx"' >> ~/.bashrc
source ~/.bashrc
```

:::

验证环境变量是否设置成功：

::: code-group

```powershell [Windows]
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN
```

```bash [macOS / Linux]
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN
```

:::

预期输出：

```
https://api.your-relay.com/v1
cr-xxxxxxxxxxxxxxxxxxxxxxxx
```

> 如果输出为空，说明环境变量未设置成功，请重新配置。

### VSCode Claude 插件配置

如果使用 VSCode 的 Claude 插件，需要在配置文件中进行设置。

配置文件路径：

- Windows：`C:\Users\你的用户名\.claude\config.json`
- macOS/Linux：`~/.claude/config.json`

> 如果该文件不存在，请手动创建。

```json
{
  "primaryApiKey": "cr-xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### 启动使用

```bash
# 启动 Claude Code 交互式会话
claude

# 在特定项目中使用
cd /path/to/your/project
claude
```

## Cursor

1. 打开 Cursor 设置（`Ctrl + ,`）
2. 进入 **Models** 设置页面
3. 找到 **OpenAI API Key** 填入你的 API Key
4. 在 **Override OpenAI Base URL** 中填入 `https://api.your-relay.com/v1`
5. 选择需要的模型即可开始使用

## Continue (VS Code 插件)

编辑 `~/.continue/config.json`：

```json
{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "openai",
      "model": "claude-sonnet-4-20250514",
      "apiKey": "cr-xxxxxxxxxxxxxxxxxxxxxxxx",
      "apiBase": "https://api.your-relay.com/v1"
    }
  ]
}
```

## Python (OpenAI SDK)

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI(
    api_key="cr-xxxxxxxxxxxxxxxxxxxxxxxx",
    base_url="https://api.your-relay.com/v1"
)
```

## Node.js

```bash
npm install openai
```

```javascript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'cr-xxxxxxxxxxxxxxxxxxxxxxxx',
  baseURL: 'https://api.your-relay.com/v1'
})
```

## 环境变量配置（推荐）

为避免硬编码 API Key，建议使用环境变量：

```bash
# .bashrc / .zshrc
export RELAY_API_KEY="cr-xxxxxxxxxxxxxxxxxxxxxxxx"
export RELAY_BASE_URL="https://api.your-relay.com/v1"
```

在代码中读取：

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("RELAY_API_KEY"),
    base_url=os.environ.get("RELAY_BASE_URL")
)
```

## 高级配置

### 超时设置

```python
client = OpenAI(
    api_key="cr-xxx",
    base_url="https://api.your-relay.com/v1",
    timeout=60.0  # 60 秒超时
)
```

### 代理设置

如需通过代理访问中转站：

```python
import httpx

client = OpenAI(
    api_key="cr-xxx",
    base_url="https://api.your-relay.com/v1",
    http_client=httpx.Client(proxy="http://your-proxy:port")
)
```

## 支持的模型列表

| 模型 | 模型 ID | 说明 |
|------|---------|------|
| Claude Sonnet 4 | `claude-sonnet-4-20250514` | 推荐日常使用，性价比最高 |
| Claude Opus 4 | `claude-opus-4-20250514` | 最强能力，适合复杂任务 |
| Claude Haiku 3.5 | `claude-3-5-haiku-20241022` | 最快速度，适合简单任务 |

> 模型列表可能随时更新，请联系管理员获取最新支持的模型。
