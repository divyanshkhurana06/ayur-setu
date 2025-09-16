import React, { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CustomNode from '../components/CustomNode';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const nodeTypes = {
  custom: CustomNode,
};

// Quality Flow Nodes
const qualityFlowNodes = [
  {
    id: 'raw',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: { 
      label: 'Raw Herbs',
      status: 'completed',
      details: 'Initial Quality: 4.2/5',
      quality: 4.2
    },
  },
  {
    id: 'cleaning',
    type: 'custom',
    position: { x: 300, y: 200 },
    data: { 
      label: 'Cleaning',
      status: 'completed',
      details: 'Removes impurities',
      quality: 4.3
    },
  },
  {
    id: 'drying',
    type: 'custom',
    position: { x: 500, y: 200 },
    data: { 
      label: 'Drying',
      status: 'completed',
      details: 'Sun-dried 48hrs',
      quality: 4.5
    },
  },
  {
    id: 'grinding',
    type: 'custom',
    position: { x: 700, y: 200 },
    data: { 
      label: 'Grinding',
      status: 'completed',
      details: 'Fine powder',
      quality: 4.7
    },
  },
  {
    id: 'testing',
    type: 'custom',
    position: { x: 900, y: 200 },
    data: { 
      label: 'Final Testing',
      status: 'completed',
      details: 'Quality assured',
      quality: 4.8
    },
  },
];

const qualityFlowEdges = [
  { id: 'e1', source: 'raw', target: 'cleaning', animated: true, style: { stroke: '#4CAF50' } },
  { id: 'e2', source: 'cleaning', target: 'drying', animated: true, style: { stroke: '#4CAF50' } },
  { id: 'e3', source: 'drying', target: 'grinding', animated: true, style: { stroke: '#4CAF50' } },
  { id: 'e4', source: 'grinding', target: 'testing', animated: true, style: { stroke: '#4CAF50' } },
];

function QualityAnalytics() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('quality');
  
  const [nodes, setNodes, onNodesChange] = useNodesState(qualityFlowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(qualityFlowEdges);

  const onConnect = useCallback((params) => {
    setEdges((eds) => [...eds, params]);
  }, [setEdges]);

  // Quality Trends Chart Data
  const qualityTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ashwagandha',
        data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.8],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Tulsi',
        data: [4.0, 4.1, 4.3, 4.2, 4.4, 4.5],
        borderColor: '#66BB6A',
        backgroundColor: 'rgba(102, 187, 106, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Neem',
        data: [3.8, 4.0, 4.1, 4.0, 4.2, 4.3],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Quality by Herb Type Chart
  const qualityByHerbData = {
    labels: ['Ashwagandha', 'Tulsi', 'Neem', 'Brahmi', 'Amla'],
    datasets: [
      {
        label: 'Average Quality Score',
        data: [4.8, 4.5, 4.3, 4.9, 4.4],
        backgroundColor: [
          '#2E7D32',
          '#66BB6A',
          '#4CAF50',
          '#8BC34A',
          '#CDDC39',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Quality Distribution Chart
  const qualityDistributionData = {
    labels: ['Excellent (4.5-5.0)', 'Good (4.0-4.5)', 'Average (3.5-4.0)', 'Poor (<3.5)'],
    datasets: [
      {
        data: [65, 25, 8, 2],
        backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF5722'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const topPerformers = [
    { name: 'Rajesh Kumar', herb: 'Ashwagandha', quality: 4.9, batches: 24 },
    { name: 'Priya Sharma', herb: 'Tulsi', quality: 4.8, batches: 18 },
    { name: 'Sunita Devi', herb: 'Brahmi', quality: 4.8, batches: 15 },
    { name: 'Amit Singh', herb: 'Neem', quality: 4.7, batches: 22 },
    { name: 'Ramesh Kumar', herb: 'Amla', quality: 4.6, batches: 19 },
  ];

  const qualityAlerts = [
    { batchId: 'GHI789', issue: 'High moisture content', severity: 'warning', herb: 'Tulsi' },
    { batchId: 'JKL012', issue: 'Pesticide detected', severity: 'error', herb: 'Neem' },
    { batchId: 'MNO345', issue: 'Color variation', severity: 'info', herb: 'Ashwagandha' },
    { batchId: 'PQR678', issue: 'Below size standard', severity: 'warning', herb: 'Brahmi' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Quality Analytics Dashboard
      </Typography>

      {/* Controls */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2E7D32',
                },
              }}
            >
              <MenuItem value="1month">Last Month</MenuItem>
              <MenuItem value="3months">Last 3 Months</MenuItem>
              <MenuItem value="6months">Last 6 Months</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Metric</InputLabel>
            <Select
              value={selectedMetric}
              label="Metric"
              onChange={(e) => setSelectedMetric(e.target.value)}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2E7D32',
                },
              }}
            >
              <MenuItem value="quality">Quality Score</MenuItem>
              <MenuItem value="moisture">Moisture Content</MenuItem>
              <MenuItem value="purity">Purity Level</MenuItem>
              <MenuItem value="yield">Processing Yield</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #4CAF50' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Average Quality
              </Typography>
              <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                4.7/5
              </Typography>
              <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                ↑ 0.2 from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #2196F3' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Pass Rate
              </Typography>
              <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                94%
              </Typography>
              <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                ↑ 3% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #FF9800' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Failed Batches
              </Typography>
              <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 'bold' }}>
                6
              </Typography>
              <Typography variant="body2" sx={{ color: '#F44336' }}>
                ↓ 2 from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #9C27B0' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Improvement Rate
              </Typography>
              <Typography variant="h4" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                +12%
              </Typography>
              <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                Quality improvement
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quality Flow Process */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
          Quality Enhancement Flow
        </Typography>
        <div style={{ height: '300px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </Paper>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Quality Trends Over Time
            </Typography>
            <Line data={qualityTrendsData} options={chartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Quality Distribution
            </Typography>
            <Doughnut data={qualityDistributionData} options={doughnutOptions} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quality by Herb Type */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Quality by Herb Type
            </Typography>
            <Bar data={qualityByHerbData} options={barChartOptions} />
          </Paper>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Top Performers
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Collector</TableCell>
                    <TableCell>Herb</TableCell>
                    <TableCell>Quality</TableCell>
                    <TableCell>Batches</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPerformers.map((performer, index) => (
                    <TableRow key={index}>
                      <TableCell>{performer.name}</TableCell>
                      <TableCell>{performer.herb}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${performer.quality}/5`}
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{performer.batches}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Quality Alerts */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
          Quality Alerts
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Batch ID</TableCell>
                <TableCell>Herb</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qualityAlerts.map((alert, index) => (
                <TableRow key={index}>
                  <TableCell>#{alert.batchId}</TableCell>
                  <TableCell>{alert.herb}</TableCell>
                  <TableCell>{alert.issue}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.severity}
                      color={
                        alert.severity === 'error' ? 'error' :
                        alert.severity === 'warning' ? 'warning' :
                        'info'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label="Under Review"
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default QualityAnalytics;
