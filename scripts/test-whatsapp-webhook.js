#!/usr/bin/env node

/**
 * Test script for WhatsApp webhook integration
 * This script simulates WhatsApp webhook calls to test the integration
 */

const crypto = require('crypto');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Configuration
const BASE_URL = 'http://localhost:3000';
const WEBHOOK_URL = `${BASE_URL}/api/webhooks/whatsapp`;
const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'your-verify-token';

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          statusText: res.statusMessage,
          text: () => Promise.resolve(data),
          json: () => Promise.resolve(JSON.parse(data))
        });
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Test data
const TEST_GUEST_ID = 'test-guest-id';
const TEST_MESSAGE_ID = 'wamid.test123456789';
const TEST_PHONE_NUMBER = '+1234567890';

// Helper function to create webhook signature
function createWebhookSignature(payload, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
}

// Test webhook verification
async function testWebhookVerification() {
  console.log('\n🔍 Testing webhook verification...');
  
  const challenge = 'test-challenge-' + Date.now();
  const verifyUrl = `${WEBHOOK_URL}?hub.mode=subscribe&hub.challenge=${challenge}&hub.verify_token=${WEBHOOK_VERIFY_TOKEN}`;
  
  try {
    const response = await makeRequest(verifyUrl, { method: 'GET' });
    const responseText = await response.text();
    
    if (response.ok && responseText === challenge) {
      console.log('✅ Webhook verification successful');
      return true;
    } else {
      console.log('❌ Webhook verification failed');
      console.log('Response status:', response.status);
      console.log('Response body:', responseText);
      return false;
    }
  } catch (error) {
    console.log('❌ Webhook verification error:', error.message);
    return false;
  }
}

// Test message status update
async function testMessageStatusUpdate(status) {
  console.log(`\n📱 Testing ${status} status update...`);
  
  const webhookPayload = {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'test-entry-id',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: {
            display_phone_number: TEST_PHONE_NUMBER,
            phone_number_id: 'test-phone-id'
          },
          statuses: [{
            id: TEST_MESSAGE_ID,
            status: status.toLowerCase(),
            timestamp: Math.floor(Date.now() / 1000).toString(),
            recipient_id: TEST_PHONE_NUMBER.replace('+', ''),
            ...(status === 'failed' && {
              errors: [{
                code: 131000,
                title: 'Test error',
                message: 'This is a test error message'
              }]
            })
          }]
        },
        field: 'messages'
      }]
    }]
  };
  
  const payload = JSON.stringify(webhookPayload);
  
  try {
    const response = await makeRequest(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': `sha256=${createWebhookSignature(payload, process.env.WHATSAPP_WEBHOOK_SECRET || 'test-secret')}`
      },
      body: payload
    });
    
    if (response.ok) {
      console.log(`✅ ${status} status update successful`);
      return true;
    } else {
      const errorText = await response.text();
      console.log(`❌ ${status} status update failed:`, response.status, errorText);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${status} status update error:`, error.message);
    return false;
  }
}

// Test incoming message
async function testIncomingMessage() {
  console.log('\n💬 Testing incoming message...');
  
  const webhookPayload = {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'test-entry-id',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: {
            display_phone_number: TEST_PHONE_NUMBER,
            phone_number_id: 'test-phone-id'
          },
          messages: [{
            from: TEST_PHONE_NUMBER.replace('+', ''),
            id: 'wamid.incoming123456789',
            timestamp: Math.floor(Date.now() / 1000).toString(),
            text: {
              body: 'Hello, this is a test message!'
            },
            type: 'text'
          }]
        },
        field: 'messages'
      }]
    }]
  };
  
  const payload = JSON.stringify(webhookPayload);
  
  try {
    const response = await makeRequest(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': `sha256=${createWebhookSignature(payload, process.env.WHATSAPP_WEBHOOK_SECRET || 'test-secret')}`
      },
      body: payload
    });
    
    if (response.ok) {
      console.log('✅ Incoming message handling successful');
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Incoming message handling failed:', response.status, errorText);
      return false;
    }
  } catch (error) {
    console.log('❌ Incoming message handling error:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting WhatsApp webhook integration tests...');
  console.log('📍 Testing against:', WEBHOOK_URL);
  
  const results = [];
  
  // Test webhook verification
  results.push(await testWebhookVerification());
  
  // Test different message statuses
  results.push(await testMessageStatusUpdate('sent'));
  results.push(await testMessageStatusUpdate('delivered'));
  results.push(await testMessageStatusUpdate('read'));
  results.push(await testMessageStatusUpdate('failed'));
  
  // Test incoming message
  results.push(await testIncomingMessage());
  
  // Summary
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! WhatsApp webhook integration is working correctly.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the webhook implementation.');
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
WhatsApp Webhook Test Script

Usage: node test-whatsapp-webhook.js

Environment Variables:
  WHATSAPP_WEBHOOK_VERIFY_TOKEN - Webhook verification token
  WHATSAPP_WEBHOOK_SECRET       - Webhook secret for signature verification

This script tests:
  - Webhook verification endpoint
  - Message status updates (sent, delivered, read, failed)
  - Incoming message handling
`);
  process.exit(0);
}

// Run tests
if (require.main === module) {
  runTests().catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = {
  testWebhookVerification,
  testMessageStatusUpdate,
  testIncomingMessage,
  runTests
};