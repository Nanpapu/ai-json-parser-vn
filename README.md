# AI JSON Parser VN

🚀 Simple and robust JSON parser for AI responses. Handles markdown code blocks, malformed JSON, and mixed content.

## Features

- ✅ Parse perfect JSON responses
- ✅ Extract JSON from markdown code blocks (\`\`\`json\`\`\`)  
- ✅ Handle malformed JSON (missing quotes, trailing commas)
- ✅ Process mixed content (text + JSON)
- ✅ Vietnamese content support
- ✅ Works with DeepSeek, OpenAI, and other AI APIs

## Installation

```bash
npm install ai-json-parser-vn
```

## Usage

```javascript
import parseAIResponse from 'ai-json-parser-vn';

// Perfect JSON
const result1 = parseAIResponse('{"name": "John", "age": 30}');
console.log(result1); // {name: "John", age: 30}

// Markdown code block
const aiResponse = `
Here's your data:
\`\`\`json
{"status": "success", "items": ["a", "b"]}
\`\`\`
`;
const result2 = parseAIResponse(aiResponse);
console.log(result2); // {status: "success", items: ["a", "b"]}

// Malformed JSON
const result3 = parseAIResponse('{name: "John", age: 30,}');
console.log(result3); // {name: "John", age: 30}

// Returns null if no valid JSON found
const result4 = parseAIResponse('Just plain text');
console.log(result4); // null
```

## CommonJS Support

```javascript
const parseAIResponse = require('ai-json-parser-vn');
```

## API

### parseAIResponse(response)

- **response** `{string}` - Raw response from AI
- **Returns** `{any|null}` - Parsed JSON object or null if parsing fails

## Test Cases

The package handles these scenarios:
- Perfect JSON responses
- JSON arrays
- Markdown code blocks with/without language labels
- Mixed content (text + JSON)
- Malformed JSON (missing quotes, trailing commas)
- Vietnamese content
- DeepSeek/OpenAI style responses

## License

MIT

## Contributing

PRs welcome! Please run tests before submitting.

```bash
npm test
```