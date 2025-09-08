// ai-json-parser.js
import { jsonrepair } from 'jsonrepair';

/**
 * Parse JSON từ AI response string
 * Xử lý các trường hợp: raw JSON, code blocks, malformed JSON
 * 
 * @param {string} response - Raw response từ AI
 * @returns {any|null} - Parsed JSON object hoặc null nếu không parse được
 */
function parseAIResponse(response) {
  if (!response || typeof response !== 'string') {
    return null;
  }

  const cleaned = response.trim();
  
  // 1. Thử parse trực tiếp (case lý tưởng)
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Continue to fallbacks
  }

  // 2. Extract từ code block ```json```
  const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (codeBlockMatch) {
    try {
      return JSON.parse(jsonrepair(codeBlockMatch[1].trim()));
    } catch (e) {
      // Continue to next fallback
    }
  }

  // 3. Tìm JSON object/array đầu tiên
  const jsonMatch = cleaned.match(/[{\[]([\s\S]*)[}\]]/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonrepair(jsonMatch[0]));
    } catch (e) {
      // Continue to final fallback
    }
  }

  // 4. Fallback cuối: jsonrepair toàn bộ string
  try {
    return JSON.parse(jsonrepair(cleaned));
  } catch (e) {
    console.warn('Could not parse AI response as JSON:', e.message);
    return null;
  }
}

// Export default cho ES modules
export default parseAIResponse;

// For browser global
if (typeof window !== 'undefined') {
  window.parseAIResponse = parseAIResponse;
}