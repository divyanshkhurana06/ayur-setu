# <img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/734c306d-3364-4826-b7a8-54ef9eb13dfe" />
Ayur Setu Portal

A React-based web application for blockchain-powered botanical traceability of Ayurvedic herbs.

## Features

- 🔍 **QR Code Scanner**: Scan product QR codes to view complete herb journey
- 📊 **Interactive Dashboard**: Real-time supply chain overview with React Flow
- 📦 **Batch Tracking**: Track individual herb batches through the supply chain
- 🌐 **Supply Chain Visualization**: Interactive flow diagrams showing the complete process
- 📈 **Quality Analytics**: Comprehensive quality metrics and trends
- 🌿 **Provenance Display**: Detailed herb information from farm to consumer

## Technology Stack

- **Frontend**: React.js with Material-UI
- **Flow Diagrams**: React Flow for interactive visualizations
- **Charts**: Chart.js for analytics
- **QR Scanning**: qr-scanner library
- **Routing**: React Router DOM
- **Styling**: Material-UI + Custom CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ayur-setu-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.js       # Top navigation bar
│   ├── Sidebar.js      # Side navigation menu
│   └── CustomNode.js   # Custom React Flow node component
├── pages/              # Main application pages
│   ├── Dashboard.js    # Main dashboard with overview
│   ├── QRScanner.js    # QR code scanning interface
│   ├── ProvenanceDisplay.js  # Detailed herb information
│   ├── BatchTracking.js      # Batch management and tracking
│   ├── SupplyChainFlow.js    # Supply chain visualization
│   └── QualityAnalytics.js   # Quality metrics and analytics
├── App.js              # Main application component
├── index.js           # Application entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Key Features

### QR Code Scanner
- Camera-based QR code scanning
- Manual batch ID entry
- Sample batch testing
- Direct navigation to provenance information

### Interactive Dashboard
- Real-time statistics
- Supply chain flow visualization
- Recent activity feed
- Quality trends charts

### Batch Tracking
- Search and filter batches
- Interactive supply chain flow for each batch
- Status tracking and quality monitoring
- Direct links to detailed provenance

### Supply Chain Visualization
- Complete network overview
- Node filtering and status indicators
- Interactive flow diagrams
- Real-time updates

### Quality Analytics
- Quality trends over time
- Performance metrics
- Top performer rankings
- Quality alerts and notifications

## Demo Data

The application includes sample data for demonstration:
- Sample batch IDs: ABC123456, DEF789012, GHI345678
- Mock herb data for Ashwagandha, Tulsi, Neem, Brahmi, and Amla
- Simulated collector, processor, lab, and manufacturer data

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Hackathon Demo

This Ayur Setu application was built for the Ministry of Ayush hackathon on blockchain-based botanical traceability. Key demo features:

1. **Complete User Journey**: From QR scan to detailed provenance
2. **Interactive Visualizations**: React Flow diagrams showing supply chain
3. **Real-time Data**: Live updates and status tracking
4. **Mobile Responsive**: Works on all devices
5. **Government Standards**: Compliant with AYUSH requirements

## Support

For support and questions, please contact the development team or create an issue in the repository.
