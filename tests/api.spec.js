import { test, expect } from "playwright/test";
import apiTestData from "../testData/apiTestData.json" assert { type: "json" };

const baseUrl = apiTestData.baseUrl;
const endpoints = apiTestData.endpoints;
const testData = apiTestData.testData;
const expectedResponses = apiTestData.expectedResponses;

test('Handling Get method', async ({request}) => {
  const response = await request.get(`${baseUrl}${endpoints.paginatedPage2}`, {
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successGet);
});

test('Handling POST method', async ({request}) => {
  const response = await request.post(`${baseUrl}${endpoints.users}`, {
    data: testData.postUser,
    headers: apiTestData.headers.withApiKey
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(expectedResponses.successCreate);
  expect(responseJson.name).toBe(testData.postUser.name);
});

test('Handling Put method', async ({request}) => {
  const response = await request.put(`${baseUrl}${endpoints.updateUser}`, {
    data: testData.putUser,
    headers: apiTestData.headers.withApiKey
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(expectedResponses.successUpdate);
});

test('Handling Patch method', async ({request}) => {
  const response = await request.patch(`${baseUrl}${endpoints.updateUser}`, {
    data: testData.patchUser,
    headers: apiTestData.headers.withApiKey
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(expectedResponses.successUpdate);
});

test('Handling Delete Method', async ({request}) => {
  const response = await request.delete(`${baseUrl}${endpoints.deleteUser}`, {
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successDelete);
});

test('Get single user - Verify response structure', async ({request}) => {
  const response = await request.get(`${baseUrl}${endpoints.singleUser}`, {
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successGet);
  const responseJson = await response.json();
  expect(responseJson).toHaveProperty('data');
  expect(responseJson.data).toHaveProperty('id', 1);
  expect(responseJson.data).toHaveProperty('email');
  expect(responseJson.data).toHaveProperty('first_name');
  expect(responseJson.data).toHaveProperty('last_name');
  expect(responseJson.data.first_name).toBeTruthy();
});

test('Get users list - Verify pagination and data', async ({request}) => {
  const response = await request.get(`${baseUrl}${endpoints.paginatedUsers}`, {
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successGet);
  const responseJson = await response.json();
  expect(responseJson).toHaveProperty('page', 1);
  expect(responseJson).toHaveProperty('total');
  expect(responseJson).toHaveProperty('data');
  expect(Array.isArray(responseJson.data)).toBe(true);
  expect(responseJson.data.length).toBeGreaterThan(0);
});

test('POST request - Verify created timestamp', async ({request}) => {
  const response = await request.post(`${baseUrl}${endpoints.users}`, {
    data: testData.postUserEngineer,
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successCreate);
  const responseJson = await response.json();
  expect(responseJson).toHaveProperty('id');
  expect(responseJson).toHaveProperty('createdAt');
  expect(responseJson.job).toBe(testData.postUserEngineer.job);
});

test('POST request with missing fields - Validate error handling', async ({request}) => {
  const response = await request.post(`${baseUrl}${endpoints.users}`, {
    data: testData.postUserTest,
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successCreate);
  const responseJson = await response.json();
  expect(responseJson.name).toBe(testData.postUserTest.name);
});

test('PUT request - Verify complete data update', async ({request}) => {
  const response = await request.put(`${baseUrl}${endpoints.updateUser3}`, {
    data: testData.putUserUpdated,
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successUpdate);
  const responseJson = await response.json();
  expect(responseJson.name).toBe(testData.putUserUpdated.name);
  expect(responseJson.job).toBe(testData.putUserUpdated.job);
  expect(responseJson).toHaveProperty('updatedAt');
});

test('PATCH request - Verify partial data update', async ({request}) => {
  const response = await request.patch(`${baseUrl}${endpoints.updateUser4}`, {
    data: testData.patchUser,
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successUpdate);
  const responseJson = await response.json();
  expect(responseJson.job).toBe(testData.patchUser.job);
  expect(responseJson).toHaveProperty('updatedAt');
});

test('GET non-existent user - Verify 404 error', async ({request}) => {
  const response = await request.get(`${baseUrl}${endpoints.deleteNonExistentUser}`, {
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.notFound);
});

test('POST with valid headers - Verify response headers', async ({request}) => {
  const response = await request.post(`${baseUrl}${endpoints.users}`, {
    data: testData.postUserTester,
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successCreate);
  expect(response.headers()['content-type']).toContain('application/json');
  const responseJson = await response.json();
  expect(responseJson.id).toBeTruthy();
});

test('Delete non-existent user - Verify success', async ({request}) => {
  const response = await request.delete(`${baseUrl}${endpoints.deleteNonExistentUser}`, {
    headers: apiTestData.headers.withApiKey
  });
  expect(response.status()).toBe(expectedResponses.successDelete);
});