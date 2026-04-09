# 安装配置

了解如何在各种 AI 客户端中配置中转站服务。

## 通用配置

所有兼容 OpenAI 协议的客户端，只需修改两个参数：

| 参数 | 值 |
|------|-----|
| `API Key` | `sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx` |
| `Base URL` | `https://api.your-relay.com/v1` |

## Cursor

1. 打开 Cursor 设置（`Ctrl + ,`）
2. 进入 **Models** 设置页面
3. 找到 **OpenAI API Key** 填入你的 API Key
4. 在 **Override OpenAI Base URL** 中填入 `https://api.your-relay.com/v1`
5. 选择需要的模型即可开始使用

## Claude Code

通过环境变量配置：

```bash
# 设置 API Key
export ANTHROPIC_API_KEY="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx"

# 设置 Base URL
export ANTHROPIC_BASE_URL="https://api.your-relay.com/v1"
```

或在 `.env` 文件中配置：

```bash
ANTHROPIC_API_KEY=sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_BASE_URL=https://api.your-relay.com/v1
```

## Continue (VS Code 插件)

编辑 `~/.continue/config.json`：

```json
{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "openai",
      "model": "claude-sonnet-4-20250514",
      "apiKey": "sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx",
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
    api_key="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx",
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
  apiKey: 'sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx',
  baseURL: 'https://api.your-relay.com/v1'
})
```

## 环境变量配置（推荐）

为避免硬编码 API Key，建议使用环境变量：

```bash
# .bashrc / .zshrc
export RELAY_API_KEY="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx"
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
    api_key="sk-relay-xxx",
    base_url="https://api.your-relay.com/v1",
    timeout=60.0  # 60 秒超时
)
```

### 代理设置

如需通过代理访问中转站：

```python
import httpx

client = OpenAI(
    api_key="sk-relay-xxx",
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
