// OTP Service for Ayur Setu
// Using Twilio for SMS OTP delivery

class OTPService {
  constructor() {
    // Debug environment variables
    console.log('Environment variables check:');
    console.log('All env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));
    console.log('REACT_APP_TWILIO_ACCOUNT_SID:', process.env.REACT_APP_TWILIO_ACCOUNT_SID);
    console.log('REACT_APP_TWILIO_AUTH_TOKEN:', process.env.REACT_APP_TWILIO_AUTH_TOKEN ? 'Set' : 'Missing');
    console.log('REACT_APP_TWILIO_PHONE_NUMBER:', process.env.REACT_APP_TWILIO_PHONE_NUMBER);
    
    // Twilio configuration from environment variables
    this.twilioAccountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    this.twilioAuthToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
    this.twilioPhoneNumber = process.env.REACT_APP_TWILIO_PHONE_NUMBER;
    
    // Check if we have valid credentials, otherwise use demo mode
    const hasValidCredentials = this.twilioAccountSid && 
                               this.twilioAuthToken && 
                               this.twilioPhoneNumber &&
                               this.twilioAccountSid.startsWith('AC') && // Real Twilio Account SIDs start with 'AC'
                               this.twilioAccountSid.length === 34;

    if (!hasValidCredentials) {
      console.warn('⚠️  Invalid or missing Twilio credentials. Switching to DEMO MODE.');
      console.warn('📝 To use real SMS, get credentials from: https://console.twilio.com/');
      this.isDemoMode = true;
    } else {
      this.isDemoMode = false;
      console.log('✅ Real Twilio credentials detected');
    }
    
    // Store OTPs temporarily (in production, use Redis or database)
    this.otpStore = new Map();
    
    if (this.isDemoMode) {
      console.log('🎭 Demo OTP Service initialized - Use OTP: 123456');
    } else {
      console.log('✅ Twilio OTP Service initialized successfully with phone:', this.twilioPhoneNumber);
    }
  }

  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP via Twilio or Demo Mode
  async sendOTP(phoneNumber) {
    const formattedPhone = `+91${phoneNumber}`;

    try {
      if (this.isDemoMode) {
        // Demo mode - just store fixed OTP
        const demoOTP = '123456';
        this.otpStore.set(phoneNumber, {
          otp: demoOTP,
          timestamp: Date.now(),
          attempts: 0
        });
        
        console.log(`🎭 [DEMO MODE] OTP for ${formattedPhone}: ${demoOTP}`);
        return {
          success: true,
          message: `Demo OTP sent to ${formattedPhone}. Use: ${demoOTP}`,
          sid: 'demo_' + Date.now()
        };
      }

      // Real Twilio integration
      const otp = this.generateOTP();
      console.log(`📱 Sending OTP ${otp} to ${formattedPhone} via Twilio`);
      
      const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + this.twilioAccountSid + '/Messages.json', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(this.twilioAccountSid + ':' + this.twilioAuthToken),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'From': this.twilioPhoneNumber,
          'To': formattedPhone,
          'Body': `Your Ayur Setu OTP is: ${otp}. Valid for 5 minutes. Do not share with anyone.`
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store OTP for verification
        this.otpStore.set(phoneNumber, {
          otp: otp,
          timestamp: Date.now(),
          attempts: 0
        });

        console.log(`✅ OTP sent successfully. Twilio SID: ${data.sid}`);
        return {
          success: true,
          message: `OTP sent to ${formattedPhone}`,
          sid: data.sid
        };
      } else {
        console.error('❌ Twilio API Error:', data);
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('❌ OTP Send Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send OTP. Please check your network connection.'
      };
    }
  }

  // Verify OTP
  async verifyOTP(phoneNumber, enteredOTP) {
    try {
      const storedData = this.otpStore.get(phoneNumber);
      
      if (!storedData) {
        return {
          success: false,
          message: 'OTP not found. Please request a new OTP.'
        };
      }

      const { otp, timestamp, attempts } = storedData;
      
      // Check if OTP is expired (5 minutes)
      const isExpired = (Date.now() - timestamp) > 5 * 60 * 1000;
      if (isExpired) {
        this.otpStore.delete(phoneNumber);
        return {
          success: false,
          message: 'OTP has expired. Please request a new OTP.'
        };
      }

      // Check attempt limit
      if (attempts >= 3) {
        this.otpStore.delete(phoneNumber);
        return {
          success: false,
          message: 'Too many failed attempts. Please request a new OTP.'
        };
      }

      // Verify OTP
      if (otp === enteredOTP) {
        this.otpStore.delete(phoneNumber); // Clear OTP after successful verification
        return {
          success: true,
          message: 'OTP verified successfully!'
        };
      } else {
        // Increment attempts
        this.otpStore.set(phoneNumber, {
          ...storedData,
          attempts: attempts + 1
        });
        
        return {
          success: false,
          message: `Invalid OTP. ${2 - attempts} attempts remaining.`
        };
      }
    } catch (error) {
      console.error('OTP Verify Error:', error);
      return {
        success: false,
        message: 'Failed to verify OTP. Please try again.'
      };
    }
  }

  // Resend OTP
  async resendOTP(phoneNumber) {
    // Clear existing OTP
    this.otpStore.delete(phoneNumber);
    
    // Send new OTP
    return await this.sendOTP(phoneNumber);
  }

  // Clean up expired OTPs (call periodically)
  cleanupExpiredOTPs() {
    const now = Date.now();
    for (const [phoneNumber, data] of this.otpStore.entries()) {
      if ((now - data.timestamp) > 5 * 60 * 1000) {
        this.otpStore.delete(phoneNumber);
      }
    }
  }
}

// Create singleton instance
const otpService = new OTPService();

// Cleanup expired OTPs every minute
setInterval(() => {
  otpService.cleanupExpiredOTPs();
}, 60 * 1000);

export default otpService;
