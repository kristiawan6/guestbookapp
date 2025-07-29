/**
 * Test file for /api/guests/send-email endpoint
 * 
 * This endpoint integrates QR code processing with email sending to provide
 * personalized QR code cards as email attachments.
 * 
 * Key functionality tested:
 * - Email sending with QR code attachments
 * - Guest data validation
 * - Error handling for missing email/QR codes
 * - Image processing integration
 */

// Test cases for manual verification:
// 1. Valid request with guests having email and QR codes
// 2. Request with missing required fields (subject, message, templateImageUrl)
// 3. Guests without email addresses
// 4. Guests without QR codes
// 5. Email sending failures
// 6. Image processing failures

interface TestGuest {
  id: string;
  name: string;
  email: string | null;
  qrCode: string | null;
}

interface EmailRequest {
  guestIds: string[];
  subject: string;
  message: string;
  templateImageUrl: string;
  eventId?: string;
}

interface EmailResponse {
  success: boolean;
  totalGuests: number;
  successfulSends: number;
  failedSends: number;
  results: Array<{
    guestId: string;
    guestName: string;
    email: string;
    status: string;
    qrCardPath: string;
  }>;
  errors: Array<{
    guestId: string;
    guestName: string;
    error: string;
  }>;
}

describe('/api/guests/send-email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock PrismaClient constructor
    (PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(() => mockPrisma);
    
    // Mock ImageProcessingService constructor
    (ImageProcessingService as jest.MockedClass<typeof ImageProcessingService>).mockImplementation(() => mockImageProcessingService);
    
    // Mock fs operations
    mockFs.mkdir.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);
    
    // Mock fetch for template image
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
    } as Response);
    
    // Mock email service
    mockEmailService.sendEmailWithQRCard.mockResolvedValue(true);
    
    // Mock image processing service
    mockProcessQRCodeTemplate.mockResolvedValue(Buffer.from('processed-image'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully send emails with QR code attachments', async () => {
    // Mock guest data
    const mockGuests = [
      {
        id: 'guest-1',
        name: 'John Doe',
        email: 'john@example.com',
        qrCode: 'qr-code-data-1'
      },
      {
        id: 'guest-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        qrCode: 'qr-code-data-2'
      }
    ];

    mockPrisma.guest.findMany.mockResolvedValue(mockGuests);

    const request = new NextRequest('http://localhost:3000/api/guests/send-email', {
      method: 'POST',
      body: JSON.stringify({
        guestIds: ['guest-1', 'guest-2'],
        subject: 'Test Event Invitation',
        message: 'You are invited to our event!',
        templateImageUrl: 'http://example.com/template.png',
        eventId: 'event-1'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.totalGuests).toBe(2);
    expect(result.successfulSends).toBe(2);
    expect(result.failedSends).toBe(0);
    expect(result.results).toHaveLength(2);
    
    // Verify that the image processing service was called for each guest
    expect(mockProcessQRCodeTemplate).toHaveBeenCalledTimes(2);
    
    // Verify that emails were sent for each guest
    expect(mockEmailService.sendEmailWithQRCard).toHaveBeenCalledTimes(2);
    
    // Verify the first email call
    expect(mockEmailService.sendEmailWithQRCard).toHaveBeenCalledWith(
      'john@example.com',
      'Test Event Invitation',
      'You are invited to our event!',
      expect.stringContaining('qr-card-guest-1'),
      'John Doe'
    );
  });

  it('should handle missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/guests/send-email', {
      method: 'POST',
      body: JSON.stringify({
        guestIds: ['guest-1'],
        // Missing subject and message
        templateImageUrl: 'http://example.com/template.png'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Subject and message are required');
  });

  it('should handle guests without email addresses', async () => {
    const mockGuests = [
      {
        id: 'guest-1',
        name: 'John Doe',
        email: null, // No email
        qrCode: 'qr-code-data-1'
      }
    ];

    mockPrisma.guest.findMany.mockResolvedValue(mockGuests);

    const request = new NextRequest('http://localhost:3000/api/guests/send-email', {
      method: 'POST',
      body: JSON.stringify({
        guestIds: ['guest-1'],
        subject: 'Test Event Invitation',
        message: 'You are invited to our event!',
        templateImageUrl: 'http://example.com/template.png'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.successfulSends).toBe(0);
    expect(result.failedSends).toBe(1);
    expect(result.errors[0].error).toBe('Guest has no email address');
  });

  it('should handle guests without QR codes', async () => {
    const mockGuests = [
      {
        id: 'guest-1',
        name: 'John Doe',
        email: 'john@example.com',
        qrCode: null // No QR code
      }
    ];

    mockPrisma.guest.findMany.mockResolvedValue(mockGuests);

    const request = new NextRequest('http://localhost:3000/api/guests/send-email', {
      method: 'POST',
      body: JSON.stringify({
        guestIds: ['guest-1'],
        subject: 'Test Event Invitation',
        message: 'You are invited to our event!',
        templateImageUrl: 'http://example.com/template.png'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.successfulSends).toBe(0);
    expect(result.failedSends).toBe(1);
    expect(result.errors[0].error).toBe('Guest has no QR code');
  });

  it('should handle email sending failures', async () => {
    const mockGuests = [
      {
        id: 'guest-1',
        name: 'John Doe',
        email: 'john@example.com',
        qrCode: 'qr-code-data-1'
      }
    ];

    mockPrisma.guest.findMany.mockResolvedValue(mockGuests);
    mockEmailService.sendEmailWithQRCard.mockResolvedValue(false); // Email sending fails

    const request = new NextRequest('http://localhost:3000/api/guests/send-email', {
      method: 'POST',
      body: JSON.stringify({
        guestIds: ['guest-1'],
        subject: 'Test Event Invitation',
        message: 'You are invited to our event!',
        templateImageUrl: 'http://example.com/template.png'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.successfulSends).toBe(0);
    expect(result.failedSends).toBe(1);
    expect(result.errors[0].error).toBe('Failed to send email');
  });

  it('should handle image processing failures', async () => {
    const mockGuests = [
      {
        id: 'guest-1',
        name: 'John Doe',
        email: 'john@example.com',
        qrCode: 'qr-code-data-1'
      }
    ];

    mockPrisma.guest.findMany.mockResolvedValue(mockGuests);
    mockProcessQRCodeTemplate.mockRejectedValue(new Error('Image processing failed'));

    const request = new NextRequest('http://localhost:3000/api/guests/send-email', {
      method: 'POST',
      body: JSON.stringify({
        guestIds: ['guest-1'],
        subject: 'Test Event Invitation',
        message: 'You are invited to our event!',
        templateImageUrl: 'http://example.com/template.png'
      })
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.successfulSends).toBe(0);
    expect(result.failedSends).toBe(1);
    expect(result.errors[0].error).toBe('Image processing failed');
  });
});