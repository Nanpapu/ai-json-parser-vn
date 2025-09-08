// test-ai-json-parser.js
import parseAIResponse from "./ai-json-parser.js";

// Test cases mô phỏng các responses thực tế từ AI
const testCases = [
  {
    name: "Perfect JSON",
    input: '{"name": "John", "age": 30}',
    expected: { name: "John", age: 30 },
  },
  {
    name: "JSON Array",
    input: '[{"id": 1, "text": "Hello"}, {"id": 2, "text": "World"}]',
    expected: [
      { id: 1, text: "Hello" },
      { id: 2, text: "World" },
    ],
  },
  {
    name: "Markdown Code Block",
    input: `Here's your data:
\`\`\`json
{
  "status": "success",
  "data": ["item1", "item2"]
}
\`\`\``,
    expected: { status: "success", data: ["item1", "item2"] },
  },
  {
    name: "Code Block without 'json' label",
    input: `Response:
\`\`\`
{"result": true, "message": "Done"}
\`\`\``,
    expected: { result: true, message: "Done" },
  },
  {
    name: "Mixed Content with JSON",
    input: `Based on your request, here's the analysis:

{"confidence": 0.95, "prediction": "positive"}

This shows high confidence in the result.`,
    expected: { confidence: 0.95, prediction: "positive" },
  },
  {
    name: "Malformed JSON (missing quotes)",
    input: '{name: "John", age: 30, active: true}',
    expected: { name: "John", age: 30, active: true },
  },
  {
    name: "JSON with trailing comma",
    input: '{"items": ["a", "b", "c",], "count": 3,}',
    expected: { items: ["a", "b", "c"], count: 3 },
  },
  {
    name: "DeepSeek style response",
    input: `I'll analyze this data and return the results:

\`\`\`json
{
  "analysis": "completed",
  "findings": [
    {"type": "pattern", "value": "increasing trend"},
    {"type": "anomaly", "value": "spike at day 15"}
  ],
  "recommendations": ["monitor closely", "investigate spike"]
}
\`\`\`

The analysis shows clear patterns in your data.`,
    expected: {
      analysis: "completed",
      findings: [
        { type: "pattern", value: "increasing trend" },
        { type: "anomaly", value: "spike at day 15" },
      ],
      recommendations: ["monitor closely", "investigate spike"],
    },
  },
  {
    name: "Empty string",
    input: "",
    expected: null,
  },
  {
    name: "Invalid JSON",
    input: "This is just plain text with no JSON",
    expected: null,
  },
  {
    name: "Vietnamese content with JSON",
    input: `Kết quả phân tích của tôi:
\`\`\`json
{
  "nguoi_dung": "Nguyễn Văn A", 
  "diem_so": 85,
  "nhan_xet": "Tốt"
}
\`\`\`
Đây là đánh giá chi tiết.`,
    expected: { nguoi_dung: "Nguyễn Văn A", diem_so: 85, nhan_xet: "Tốt" },
  },
];

// Utility để so sánh objects
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Run tests
console.log("🧪 Testing AI JSON Parser...\n");

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
  console.log(`Test ${index + 1}: ${test.name}`);
  console.log(
    `Input: ${test.input.substring(0, 50)}${
      test.input.length > 50 ? "..." : ""
    }`
  );

  const result = parseAIResponse(test.input);
  const isPass = deepEqual(result, test.expected);

  console.log("Parsed JSON:", JSON.stringify(result, null, 2));

  if (isPass) {
    console.log("✅ PASS\n");
    passed++;
  } else {
    console.log("❌ FAIL");
    console.log("Expected:", JSON.stringify(test.expected, null, 2));
    console.log("Got:", JSON.stringify(result, null, 2));
    console.log("");
    failed++;
  }
});

console.log(`📊 Results: ${passed} passed, ${failed} failed`);

// Performance test
console.log("\n⚡ Performance Test...");
const perfTest = `\`\`\`json
{"large": "dataset", "items": [1,2,3,4,5], "nested": {"deep": {"value": true}}}
\`\`\``;

const start = performance.now();
for (let i = 0; i < 1000; i++) {
  parseAIResponse(perfTest);
}
const end = performance.now();

console.log(`1000 parses took ${(end - start).toFixed(2)}ms`);
console.log(`Average: ${((end - start) / 1000).toFixed(3)}ms per parse`);
