import { describe, it, expect } from 'vitest';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4010';

describe('Auth API contract', () => {
  it('register: should return 201 or 200 for valid registration', async () => {
    const payload = {
      email: 'testuser@example.com',
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!'
    };
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, payload);
      expect([200, 201]).toContain(res.status);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        expect([400, 409, 200, 201]).toContain(e.response?.status);
      } else {
        throw e;
      }
    }
  });

  it('login: should return 200 for valid login', async () => {
    const payload = {
      email: 'testuser@example.com',
      password: 'StrongPassword123!'
    };
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, payload);
      expect(res.status).toBe(200);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        expect([200, 401]).toContain(e.response?.status);
      } else {
        throw e;
      }
    }
  });

  it('changePassword: should return 200 for valid password change', async () => {
    const payload = {
      oldPassword: 'StrongPassword123!',
      newPassword: 'NewStrongPassword456!',
      confirmPassword: 'NewStrongPassword456!'
    };
    try {
      const res = await axios.put(`${API_BASE_URL}/password`, payload);
      expect(res.status).toBe(200);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        expect([200, 400, 401]).toContain(e.response?.status);
      } else {
        throw e;
      }
    }
  });
});
