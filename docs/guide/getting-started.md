# 快速开始

本页帮助你快速接入 AI API 中转站服务，5 分钟内完成首次调用。

## 前提条件

- 已注册并获取 API Key（[联系管理员获取](/community)）
- 已安装对应语言的 SDK（或使用 cURL）

## 1. 获取 API Key

联系管理员注册账号后，你将获得一个专属的 API Key，格式如下：

```
sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ 请妥善保管你的 API Key，不要泄露给他人。

## 2. 配置 Base URL

将你的 API 客户端的 `base_url` 修改为中转站地址：

```
https://api.your-relay.com/v1
```

## 3. 发起第一次请求

使用 cURL 快速测试：

```bash
curl https://api.your-relay.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [
      {"role": "user", "content": "你好，请介绍一下你自己"}
    ]
  }'
```

使用 Python SDK：

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx",
    base_url="https://api.your-relay.com/v1"
)

response = client.chat.completions.create(
    model="claude-sonnet-4-20250514",
    messages=[
        {"role": "user", "content": "你好，请介绍一下你自己"}
    ]
)

print(response.choices[0].message.content)
```

## 4. 验证连接

如果请求成功返回，你会收到类似以下格式的响应：

```json
{
  "id": "msg_...",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "你好！我是 Claude，由 Anthropic 开发的 AI 助手..."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 45,
    "total_tokens": 57
  }
}
```

## 下一步

- [安装配置](/guide/installation) — 了解各客户端的详细配置方法
- [使用示例](/guide/examples) — 查看更多语言和场景的调用示例
