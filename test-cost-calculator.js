// test-cost-calculator.js
import calculateDeepSeekCost from './deepseek-cost-calculator.js';

const testCases = [
  {
    name: "Your Example - Cache Miss Only",
    usage: {
      "prompt_tokens": 40,
      "completion_tokens": 199,
      "total_tokens": 239,
      "prompt_tokens_details": {
        "cached_tokens": 0
      },
      "prompt_cache_hit_tokens": 0,
      "prompt_cache_miss_tokens": 40
    }
  },
  {
    name: "Large Request with Cache Hit",
    usage: {
      "prompt_tokens": 1000,
      "completion_tokens": 500,
      "total_tokens": 1500,
      "prompt_cache_hit_tokens": 600,
      "prompt_cache_miss_tokens": 400
    }
  },
  {
    name: "Small Request - No Cache",
    usage: {
      "prompt_tokens": 10,
      "completion_tokens": 50,
      "total_tokens": 60,
      "prompt_cache_hit_tokens": 0,
      "prompt_cache_miss_tokens": 10
    }
  },
  {
    name: "High Cache Hit Rate",
    usage: {
      "prompt_tokens": 2000,
      "completion_tokens": 800,
      "total_tokens": 2800,
      "prompt_cache_hit_tokens": 1800,
      "prompt_cache_miss_tokens": 200
    }
  }
];

console.log('💰 DeepSeek Cost Calculator Tests\n');

testCases.forEach((test, index) => {
  console.log(`\n📋 Test ${index + 1}: ${test.name}`);
  console.log('Input Usage:', JSON.stringify(test.usage, null, 2));
  
  const result = calculateDeepSeekCost(test.usage);
  console.log('\n💵 Cost Result:');
  console.log(JSON.stringify(result, null, 2));
  
  console.log('\n📊 Summary:');
  console.log(`• Total tokens: ${result.total_tokens_used}`);
  console.log(`• Cache hit rate: ${result.cache_hit_rate_percent}%`);
  console.log(`• Total cost: $${result.cost_breakdown.total_cost.usd} (${result.cost_breakdown.total_cost.vnd} VND)`);
  console.log('─'.repeat(50));
});

// Performance test
console.log('\n⚡ Performance Test...');
const perfUsage = {
  "prompt_tokens": 1000,
  "completion_tokens": 500,
  "total_tokens": 1500,
  "prompt_cache_hit_tokens": 300,
  "prompt_cache_miss_tokens": 700
};

const start = performance.now();
for (let i = 0; i < 10000; i++) {
  calculateDeepSeekCost(perfUsage);
}
const end = performance.now();

console.log(`10,000 calculations took ${(end - start).toFixed(2)}ms`);
console.log(`Average: ${((end - start) / 10000).toFixed(4)}ms per calculation`);