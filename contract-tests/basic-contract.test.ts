import { describe, it, expect } from 'vitest';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4010';

describe('OpenAPI contract: /health', () => {
  it('should return 200 OK for /health', async () => {
    const res = await axios.get(`${API_BASE_URL}/health`);
    expect(res.status).toBe(200);
  });
});
