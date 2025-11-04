const API_URL = '/api';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export async function apiRequestWithFile(endpoint: string, formData: FormData) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST',
    }),
  me: () => apiRequest('/auth/me'),
};

// Cars API
export const carsApi = {
  getAll: (params?: { category?: string; featured?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest(`/cars${query ? `?${query}` : ''}`);
  },
  getOne: (id: string) => apiRequest(`/cars/${id}`),
  create: (data: FormData) => apiRequestWithFile('/cars', data),
  update: (id: string, data: FormData) => {
    return fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
  delete: (id: string) =>
    apiRequest(`/cars/${id}`, {
      method: 'DELETE',
    }),
};

// Categories API
export const categoriesApi = {
  getAll: () => apiRequest('/categories'),
  getOne: (id: string) => apiRequest(`/categories/${id}`),
  create: (data: FormData) => apiRequestWithFile('/categories', data),
  update: (id: string, data: FormData) => {
    return fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
  delete: (id: string) =>
    apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    }),
};

// Homepage API
export const homepageApi = {
  get: () => apiRequest('/homepage'),
  update: (data: any) =>
    apiRequest('/homepage', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  updateWithFile: (formData: FormData) => {
    return fetch(`${API_URL}/homepage`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
};

// Admin API
export const adminApi = {
  getStats: () => apiRequest('/admin/stats'),
};

// Tour Routes API
export const tourRoutesApi = {
  get: () => apiRequest('/tour-routes'),
  update: (data: any) =>
    apiRequest('/tour-routes', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// About API
export const aboutApi = {
  get: () => apiRequest('/about'),
  update: (data: any) =>
    apiRequest('/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Reviews API
export const reviewsApi = {
  getAll: (params?: { category?: string }) => {
    const query = params?.category ? `?category=${params.category}` : '';
    return apiRequest(`/reviews${query}`);
  },
  getOne: (id: string) => apiRequest(`/reviews/${id}`),
  create: (formData: FormData) => {
    return fetch(`${API_URL}/reviews`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
  update: (id: string, formData: FormData) => {
    return fetch(`${API_URL}/reviews/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
  delete: (id: string) =>
    apiRequest(`/reviews/${id}`, {
      method: 'DELETE',
    }),
};

// FAQs API
export const faqsApi = {
  getAll: (params?: { category?: string }) => {
    const query = params?.category ? `?category=${params.category}` : '';
    return apiRequest(`/faqs${query}`);
  },
  getOne: (id: string) => apiRequest(`/faqs/${id}`),
  create: (data: any) =>
    apiRequest('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/faqs/${id}`, {
      method: 'DELETE',
    }),
};

// Contact API
export const contactApi = {
  get: () => apiRequest('/contact'),
  update: (formData: FormData) => {
    return fetch(`${API_URL}/contact`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
};

// Location API
export const locationApi = {
  get: () => apiRequest('/location'),
  update: (formData: FormData) => {
    return fetch(`${API_URL}/location`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || 'Request failed');
        });
      }
      return res.json();
    });
  },
};

