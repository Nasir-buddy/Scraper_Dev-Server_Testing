const API_BASE_URL = '/api/manage-alert-docs';

export const fetchDocsLevel1 = async () => {
  const response = await fetch(`${API_BASE_URL}/docs-level-1`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
};

export const createDocLevel1 = async (data: { title: string; content: string }) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create document');
  }
  return response.json();
};

export const updateDocLevel1 = async (id: string, data: { title: string; content: string }) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-1?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update document');
  }
  return response.json();
};

export const deleteDocLevel1 = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-1?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
  return response.json();
};

// Level 2
export const fetchDocsLevel2 = async (level1Id: string) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-2?level1Id=${level1Id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
};

export const createDocLevel2 = async (data: { title: string; content: string; docsLevel1Id: string }) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create document');
  }
  return response.json();
};

export const updateDocLevel2 = async (id: string, data: { title: string; content: string;}) => {
  console.log("data for updateDocLevel2 is:", data)
  const response = await fetch(`${API_BASE_URL}/docs-level-2?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update document');
  }
  return response.json();
};

export const deleteDocLevel2 = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-2?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
  return response.json();
};

// Level 3
export const fetchDocsLevel3 = async (level2Id: string) => {
  console.log("level2Id is in service:", level2Id)
  const response = await fetch(`${API_BASE_URL}/docs-level-3?level2Id=${level2Id}`);
  console.log("response level 3 is:", response)
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
};

export const createDocLevel3 = async (data: { title: string; content: string; docsLevel2Id: string }) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-3`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create document');
  }
  return response.json();
};

export const updateDocLevel3 = async (id: string, data: { title: string; content: string;}) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-3?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update document');
  }
  return response.json();
};

export const deleteDocLevel3 = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-3?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
  return response.json();
};

// Level 4
export const fetchDocsLevel4 = async (level3Id: string) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-4?level3Id=${level3Id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
};

export const createDocLevel4 = async (data: { title: string; content: string; docsLevel3Id: string }) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-4`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create document');
  }
  return response.json();
};

export const updateDocLevel4 = async (id: string, data: { title: string; content: string}) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-4?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update document');
  }
  return response.json();
};

export const deleteDocLevel4 = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/docs-level-4?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
  return response.json();
}; 