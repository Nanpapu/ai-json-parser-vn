# AI JSON Parser VN

🚀 Complete toolkit for AI responses: JSON parser + DeepSeek cost calculator

## Features

### JSON Parser

- ✅ Parse perfect JSON responses
- ✅ Extract JSON from markdown code blocks (\`\`\`json\`\`\`)
- ✅ Handle malformed JSON (missing quotes, trailing commas)
- ✅ Process mixed content (text + JSON)
- ✅ Vietnamese content support
- ✅ Works with DeepSeek, OpenAI, and other AI APIs

### DeepSeek Cost Calculator

- ✅ Calculate API usage costs with current DeepSeek pricing
- ✅ Support cache hit/miss token pricing
- ✅ USD to VND conversion (1 USD = 25,000 VND)
- ✅ Detailed cost breakdown
- ✅ Cache hit rate analysis

## Installation

```bash
npm install ai-json-parser-vn
```

## Usage

### JSON Parser

```javascript
import parseAIResponse from "ai-json-parser-vn";

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
const result4 = parseAIResponse("Just plain text");
console.log(result4); // null
```

### DeepSeek Cost Calculator

```javascript
import calculateCost from "ai-json-parser-vn/cost";

const usage = {
  prompt_tokens: 40,
  completion_tokens: 199,
  total_tokens: 239,
  prompt_tokens_details: {
    cached_tokens: 0,
  },
  prompt_cache_hit_tokens: 0,
  prompt_cache_miss_tokens: 40,
};

const cost = calculateCost(usage);
console.log(cost);

/*
Output:
{
  "total_tokens_used": 239,
  "input_tokens": 40,
  "output_tokens": 199,
  "cache_hit_tokens": 0,
  "cache_miss_tokens": 40,
  "cache_hit_rate_percent": 0,
  "cost_breakdown": {
    "cache_hit_cost": {
      "usd": 0,
      "vnd": 0
    },
    "cache_miss_cost": {
      "usd": 0.000022,
      "vnd": 0.56
    },
    "output_cost": {
      "usd": 0.000334,
      "vnd": 8.36
    },
    "total_cost": {
      "usd": 0.000357,
      "vnd": 8.92
    }
  }
}
}
*/
```

### Combined Usage

```javascript
import parseAIResponse from "ai-json-parser-vn";
import calculateCost from "ai-json-parser-vn/cost";

// After calling DeepSeek API
const response = await deepSeekAPI.chat({
  messages: [{ role: "user", content: "Return JSON data" }],
});

// Parse the response content
const parsedData = parseAIResponse(response.choices[0].message.content);

// Calculate the cost
const costInfo = calculateCost(response.usage);

console.log("Parsed Data:", parsedData);
console.log("Total Cost:", costInfo.cost_breakdown.total_cost.vnd, "VND");
console.log("Cache Hit Rate:", costInfo.cache_hit_rate_percent + "%");
```

## DeepSeek Pricing (Current)

- **1M Input Tokens (Cache Hit)**: $0.07
- **1M Input Tokens (Cache Miss)**: $0.56
- **1M Output Tokens**: $1.68
- **Exchange Rate**: 1 USD = 25,000 VND

## CommonJS Support

```javascript
const parseAIResponse = require("ai-json-parser-vn");
const calculateCost = require("ai-json-parser-vn/cost");
```

## API Reference

### parseAIResponse(response)

- **response** `{string}` - Raw response from AI
- **Returns** `{any|null}` - Parsed JSON object or null if parsing fails

### calculateCost(usage)

- **usage** `{Object}` - Usage object from DeepSeek API response
- **Returns** `{Object}` - Detailed cost breakdown with USD and VND

## Test Cases

### JSON Parser handles:

- Perfect JSON responses
- JSON arrays
- Markdown code blocks with/without language labels
- Mixed content (text + JSON)
- Malformed JSON (missing quotes, trailing commas)
- Vietnamese content
- DeepSeek/OpenAI style responses

### Cost Calculator handles:

- Cache hit/miss tokens
- Different usage patterns
- Accurate pricing calculations
- Currency conversion

## Testing

```bash
npm test           # Test JSON parser
npm run test:cost  # Test cost calculator
```

## License

MIT

## Contributing

PRs welcome! Please run tests before submitting.

## Repository

GitHub: [https://github.com/Nanpapu/ai-json-parser-vn](https://github.com/Nanpapu/ai-json-parser-vn)
