// Ayur Setu Configuration Service
// Centralized configuration management using environment variables

class Config {
  constructor() {
    this.app = {
      name: process.env.REACT_APP_NAME || 'Ayur Setu',
      version: process.env.REACT_APP_VERSION || '1.0.0',
      environment: process.env.REACT_APP_ENVIRONMENT || 'development',
      apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    };

    this.twilio = {
      accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
    };

    this.firebase = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    };

    this.fast2sms = {
      apiKey: process.env.REACT_APP_FAST2SMS_API_KEY,
      senderId: process.env.REACT_APP_FAST2SMS_SENDER_ID || 'AYRSETU',
    };

    this.aws = {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION || 'ap-south-1',
      s3Bucket: process.env.REACT_APP_AWS_S3_BUCKET || 'ayur-setu-files',
    };

    this.googleMaps = {
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    };

    this.plantNet = {
      apiKey: process.env.REACT_APP_PLANTNET_API_KEY,
    };

    this.openWeather = {
      apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY,
    };

    this.government = {
      ayushApiKey: process.env.REACT_APP_AYUSH_API_KEY,
      digitalIndiaApiKey: process.env.REACT_APP_DIGITAL_INDIA_API_KEY,
      ayushComplianceApi: process.env.REACT_APP_AYUSH_COMPLIANCE_API,
      medicinalPlantsBoardApi: process.env.REACT_APP_MEDICINAL_PLANTS_BOARD_API,
      exportCertificateApi: process.env.REACT_APP_EXPORT_CERTIFICATE_API,
    };

    this.blockchain = {
      network: process.env.REACT_APP_BLOCKCHAIN_NETWORK || 'ethereum_testnet',
      infuraProjectId: process.env.REACT_APP_INFURA_PROJECT_ID,
      infuraProjectSecret: process.env.REACT_APP_INFURA_PROJECT_SECRET,
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      privateKey: process.env.REACT_APP_PRIVATE_KEY,
    };

    this.ipfs = {
      gateway: process.env.REACT_APP_IPFS_GATEWAY || 'https://ipfs.io/ipfs/',
      pinataApiKey: process.env.REACT_APP_PINATA_API_KEY,
      pinataSecretKey: process.env.REACT_APP_PINATA_SECRET_KEY,
    };

    this.database = {
      mongodbUri: process.env.REACT_APP_MONGODB_URI,
      supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
      supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
    };

    this.security = {
      jwtSecret: process.env.REACT_APP_JWT_SECRET,
      encryptionKey: process.env.REACT_APP_ENCRYPTION_KEY,
      sessionTimeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT) || 3600000,
    };

    this.analytics = {
      googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
      mixpanelToken: process.env.REACT_APP_MIXPANEL_TOKEN,
      sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    };

    this.payment = {
      razorpay: {
        keyId: process.env.REACT_APP_RAZORPAY_KEY_ID,
        keySecret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
      },
      paytm: {
        merchantId: process.env.REACT_APP_PAYTM_MERCHANT_ID,
      },
    };

    this.features = {
      enableRealOtp: process.env.REACT_APP_ENABLE_REAL_OTP === 'true',
      enableBlockchain: process.env.REACT_APP_ENABLE_BLOCKCHAIN === 'true',
      enableOfflineMode: process.env.REACT_APP_ENABLE_OFFLINE_MODE === 'true',
      enablePushNotifications: process.env.REACT_APP_ENABLE_PUSH_NOTIFICATIONS === 'true',
      enableGeolocation: process.env.REACT_APP_ENABLE_GEOLOCATION === 'true',
      enableCamera: process.env.REACT_APP_ENABLE_CAMERA === 'true',
    };

    this.debug = {
      debugMode: process.env.REACT_APP_DEBUG_MODE === 'true',
      logLevel: process.env.REACT_APP_LOG_LEVEL || 'info',
      mockData: process.env.REACT_APP_MOCK_DATA === 'true',
    };

    this.notifications = {
      oneSignalAppId: process.env.REACT_APP_ONESIGNAL_APP_ID,
    };

    this.storage = {
      cloudinary: {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      },
    };

    this.social = {
      whatsappBusinessApi: process.env.REACT_APP_WHATSAPP_BUSINESS_API,
      telegramBotToken: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    };

    this.localization = {
      defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'en',
      supportedLanguages: process.env.REACT_APP_SUPPORTED_LANGUAGES?.split(',') || ['en', 'hi'],
    };

    this.performance = {
      cacheTimeout: parseInt(process.env.REACT_APP_CACHE_TIMEOUT) || 300000,
      imageCompressionQuality: parseFloat(process.env.REACT_APP_IMAGE_COMPRESSION_QUALITY) || 0.8,
      maxFileSize: parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 5242880,
    };

    this.demo = {
      demoMode: process.env.REACT_APP_DEMO_MODE === 'true',
      demoOtp: process.env.REACT_APP_DEMO_OTP || '123456',
      demoPhoneNumber: process.env.REACT_APP_DEMO_PHONE_NUMBER || '9876543210',
    };
  }

  // Helper methods
  isDevelopment() {
    return this.app.environment === 'development';
  }

  isProduction() {
    return this.app.environment === 'production';
  }

  isTwilioConfigured() {
    return !!(this.twilio.accountSid && this.twilio.authToken && this.twilio.phoneNumber);
  }

  isFirebaseConfigured() {
    return !!(this.firebase.apiKey && this.firebase.authDomain && this.firebase.projectId);
  }

  isBlockchainEnabled() {
    return this.features.enableBlockchain && !!(this.blockchain.infuraProjectId);
  }

  getApiUrl(endpoint = '') {
    return `${this.app.apiBaseUrl}/${endpoint}`.replace(/\/+/g, '/').replace(/\/$/, '');
  }

  log(level, message, data = null) {
    if (!this.debug.debugMode) return;
    
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(this.debug.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    if (messageLevelIndex <= currentLevelIndex) {
      console[level](`[Ayur Setu] ${message}`, data || '');
    }
  }

  // Validation methods
  validateConfiguration() {
    const warnings = [];
    const errors = [];

    // Check critical configurations
    if (this.features.enableRealOtp && !this.isTwilioConfigured() && !this.isFirebaseConfigured()) {
      warnings.push('Real OTP is enabled but no OTP service is configured');
    }

    if (this.features.enableBlockchain && !this.isBlockchainEnabled()) {
      warnings.push('Blockchain is enabled but Infura is not configured');
    }

    if (!this.googleMaps.apiKey && this.features.enableGeolocation) {
      warnings.push('Geolocation is enabled but Google Maps API key is missing');
    }

    // Log warnings and errors
    warnings.forEach(warning => this.log('warn', warning));
    errors.forEach(error => this.log('error', error));

    return { warnings, errors };
  }

  // Get configuration summary
  getConfigSummary() {
    return {
      app: this.app,
      features: this.features,
      services: {
        twilio: this.isTwilioConfigured(),
        firebase: this.isFirebaseConfigured(),
        blockchain: this.isBlockchainEnabled(),
        googleMaps: !!this.googleMaps.apiKey,
        openWeather: !!this.openWeather.apiKey,
        plantNet: !!this.plantNet.apiKey,
      },
      demo: this.demo,
    };
  }
}

// Create singleton instance
const config = new Config();

// Validate configuration on startup
if (config.isDevelopment()) {
  const validation = config.validateConfiguration();
  config.log('info', 'Configuration loaded', config.getConfigSummary());
}

export default config;
