// deepseek-cost-calculator.js

/**
 * Tính toán chi phí cho DeepSeek API usage
 * @param {Object} usage - Usage object từ DeepSeek API response
 * @returns {Object} - Chi phí breakdown chi tiết
 */
function calculateDeepSeekCost(usage) {
  // DeepSeek pricing (per 1M tokens)
  const PRICING = {
    CACHE_HIT_PER_1M: 0.07, // $0.07 per 1M input tokens (cache hit)
    CACHE_MISS_PER_1M: 0.56, // $0.56 per 1M input tokens (cache miss)
    OUTPUT_PER_1M: 1.68, // $1.68 per 1M output tokens
  };

  const USD_TO_VND = 25000; // 1 USD = 25,000 VND

  // Extract tokens từ usage object
  const totalTokens = usage.total_tokens || 0;
  const inputTokens = usage.prompt_tokens || 0;
  const outputTokens = usage.completion_tokens || 0;

  // Cache tokens
  const cacheHitTokens = usage.prompt_cache_hit_tokens || 0;
  const cacheMissTokens =
    usage.prompt_cache_miss_tokens ||
    usage.prompt_tokens_details?.cached_tokens !== undefined
      ? inputTokens - usage.prompt_tokens_details.cached_tokens
      : inputTokens;

  // Calculate cache hit rate
  const cacheHitRate =
    inputTokens > 0 ? (cacheHitTokens / inputTokens) * 100 : 0;

  // Calculate costs (per token, then convert to actual cost)
  const cacheHitCostUsd = (cacheHitTokens / 1000000) * PRICING.CACHE_HIT_PER_1M;
  const cacheMissCostUsd =
    (cacheMissTokens / 1000000) * PRICING.CACHE_MISS_PER_1M;
  const outputCostUsd = (outputTokens / 1000000) * PRICING.OUTPUT_PER_1M;
  const totalCostUsd = cacheHitCostUsd + cacheMissCostUsd + outputCostUsd;

  // Convert to VND and round to 2 decimal places
  const roundVnd = (usd) => Math.round(usd * USD_TO_VND * 100) / 100;

  return {
    total_tokens_used: totalTokens,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    cache_hit_tokens: cacheHitTokens,
    cache_miss_tokens: cacheMissTokens,
    cache_hit_rate_percent: Math.round(cacheHitRate * 100) / 100,
    cost_breakdown: {
      cache_hit_cost: {
        usd: Math.round(cacheHitCostUsd * 1000000) / 1000000, // Round to 6 decimals
        vnd: roundVnd(cacheHitCostUsd),
      },
      cache_miss_cost: {
        usd: Math.round(cacheMissCostUsd * 1000000) / 1000000,
        vnd: roundVnd(cacheMissCostUsd),
      },
      output_cost: {
        usd: Math.round(outputCostUsd * 1000000) / 1000000,
        vnd: roundVnd(outputCostUsd),
      },
      total_cost: {
        usd: Math.round(totalCostUsd * 1000000) / 1000000,
        vnd: roundVnd(totalCostUsd),
      },
    },
  };
}

// Export default cho ES modules
export default calculateDeepSeekCost;

// For browser global
if (typeof window !== "undefined") {
  window.calculateDeepSeekCost = calculateDeepSeekCost;
}

// Demo usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const sampleUsage = {
    prompt_tokens: 40,
    completion_tokens: 199,
    total_tokens: 239,
    prompt_tokens_details: {
      cached_tokens: 0,
    },
    prompt_cache_hit_tokens: 0,
    prompt_cache_miss_tokens: 40,
  };

  console.log("📊 DeepSeek Cost Calculator Demo");
  console.log("Usage:", JSON.stringify(sampleUsage, null, 2));
  console.log("\nCost Breakdown:");
  console.log(JSON.stringify(calculateDeepSeekCost(sampleUsage), null, 2));
}
