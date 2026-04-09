# 使用示例

各种语言和场景下的 API 调用示例。

## Python

### 基础调用

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx",
    base_url="https://api.your-relay.com/v1"
)

response = client.chat.completions.create(
    model="claude-sonnet-4-20250514",
    messages=[
        {"role": "system", "content": "你是一个专业的编程助手。"},
        {"role": "user", "content": "用 Python 写一个快速排序算法"}
    ]
)

print(response.choices[0].message.content)
```

### 流式响应

```python
stream = client.chat.completions.create(
    model="claude-sonnet-4-20250514",
    messages=[
        {"role": "user", "content": "解释什么是 Transformer 架构"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### 多轮对话

```python
messages = [
    {"role": "system", "content": "你是一个有帮助的 AI 助手。"}
]

while True:
    user_input = input("你: ")
    if user_input.lower() in ("exit", "quit", "q"):
        break

    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="claude-sonnet-4-20250514",
        messages=messages
    )

    assistant_message = response.choices[0].message.content
    print(f"AI: {assistant_message}")

    messages.append({"role": "assistant", "content": assistant_message})
```

## Node.js

### 基础调用

```javascript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx',
  baseURL: 'https://api.your-relay.com/v1'
})

const response = await client.chat.completions.create({
  model: 'claude-sonnet-4-20250514',
  messages: [
    { role: 'user', content: '用 JavaScript 写一个防抖函数' }
  ]
})

console.log(response.choices[0].message.content)
```

### 流式响应

```javascript
const stream = await client.chat.completions.create({
  model: 'claude-sonnet-4-20250514',
  messages: [
    { role: 'user', content: '解释 Promise 和 async/await 的区别' }
  ],
  stream: true
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '')
}
```

## cURL

### 基础请求

```bash
curl https://api.your-relay.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [
      {"role": "user", "content": "Hello, world!"}
    ]
  }'
```

### 流式请求

```bash
curl https://api.your-relay.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [
      {"role": "user", "content": "写一首关于编程的短诗"}
    ],
    "stream": true
  }'
```

## 错误处理

### Python 错误处理

```python
from openai import OpenAI, APIError, APIConnectionError, RateLimitError

client = OpenAI(
    api_key="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx",
    base_url="https://api.your-relay.com/v1"
)

try:
    response = client.chat.completions.create(
        model="claude-sonnet-4-20250514",
        messages=[{"role": "user", "content": "Hello"}]
    )
except RateLimitError:
    print("请求频率超限，请稍后重试")
except APIConnectionError:
    print("网络连接失败，请检查网络配置")
except APIError as e:
    print(f"API 错误: {e.status_code} - {e.message}")
```

### 常见错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 401 | API Key 无效 | 检查 Key 是否正确，是否已过期 |
| 429 | 请求频率超限 | 降低请求频率，或联系管理员提升限额 |
| 500 | 服务器内部错误 | 稍后重试，如持续出现请联系管理员 |
| 502 | 上游服务不可用 | 稍后重试，通常为临时性问题 |

### 自动重试

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-relay-xxxxxxxxxxxxxxxxxxxxxxxx",
    base_url="https://api.your-relay.com/v1",
    max_retries=3  # 自动重试 3 次
)
```
