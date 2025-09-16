import React, { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, MiniMap } from 'reactflow';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Refresh, ZoomIn, ZoomOut, CenterFocusStrong } from '@mui/icons-material';
import CustomNode from '../components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  // Farmers Layer
  {
    id: 'farmer1',
    type: 'custom',
    position: { x: 100, y: 50 },
    data: { 
      label: 'Rajesh Kumar',
      status: 'completed',
      details: 'Ashwagandha Farmer',
      quality: 4.8,
      timestamp: '2024-01-15'
    },
  },
  {
    id: 'farmer2',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: { 
      label: 'Priya Sharma',
      status: 'completed',
      details: 'Tulsi Farmer',
      quality: 4.5,
      timestamp: '2024-01-18'
    },
  },
  {
    id: 'farmer3',
    type: 'custom',
    position: { x: 100, y: 350 },
    data: { 
      label: 'Amit Singh',
      status: 'in-progress',
      details: 'Neem Collector',
      quality: 4.2,
      timestamp: '2024-01-20'
    },
  },

  // Processing Layer
  {
    id: 'processor1',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Green Valley Processing',
      status: 'completed',
      details: 'Primary Processing Unit',
      quality: 4.6,
      timestamp: '2024-01-20'
    },
  },
  {
    id: 'processor2',
    type: 'custom',
    position: { x: 400, y: 300 },
    data: { 
      label: 'Mountain Herbs Co.',
      status: 'in-progress',
      details: 'Secondary Processing',
      quality: 4.3,
      timestamp: '2024-01-22'
    },
  },

  // Testing Labs Layer
  {
    id: 'lab1',
    type: 'custom',
    position: { x: 700, y: 150 },
    data: { 
      label: 'Ayush Quality Labs',
      status: 'completed',
      details: 'Quality Testing Lab',
      quality: 4.7,
      timestamp: '2024-01-22'
    },
  },
  {
    id: 'lab2',
    type: 'custom',
    position: { x: 700, y: 300 },
    data: { 
      label: 'Himalayan Test Center',
      status: 'in-progress',
      details: 'DNA & Purity Testing',
      quality: 4.8,
      timestamp: '2024-01-24'
    },
  },

  // Manufacturing Layer
  {
    id: 'manufacturer1',
    type: 'custom',
    position: { x: 1000, y: 100 },
    data: { 
      label: 'Himalayan Herbs Ltd',
      status: 'completed',
      details: 'Final Product Manufacturing',
      quality: 4.8,
      timestamp: '2024-01-25'
    },
  },
  {
    id: 'manufacturer2',
    type: 'custom',
    position: { x: 1000, y: 300 },
    data: { 
      label: 'Ayur Wellness Co.',
      status: 'pending',
      details: 'Formulation Unit',
      quality: 4.5,
      timestamp: '2024-01-26'
    },
  },

  // Retail Layer
  {
    id: 'retail1',
    type: 'custom',
    position: { x: 1300, y: 200 },
    data: { 
      label: 'Health Store Network',
      status: 'completed',
      details: 'Retail Distribution',
      quality: 4.7,
      timestamp: '2024-01-28'
    },
  },
];

const initialEdges = [
  // Farmer to Processor connections
  { id: 'e1', source: 'farmer1', target: 'processor1', animated: false, style: { stroke: '#4CAF50' } },
  { id: 'e2', source: 'farmer2', target: 'processor1', animated: false, style: { stroke: '#4CAF50' } },
  { id: 'e3', source: 'farmer3', target: 'processor2', animated: true, style: { stroke: '#FF9800' } },

  // Processor to Lab connections
  { id: 'e4', source: 'processor1', target: 'lab1', animated: false, style: { stroke: '#4CAF50' } },
  { id: 'e5', source: 'processor2', target: 'lab2', animated: true, style: { stroke: '#FF9800' } },

  // Lab to Manufacturer connections
  { id: 'e6', source: 'lab1', target: 'manufacturer1', animated: false, style: { stroke: '#4CAF50' } },
  { id: 'e7', source: 'lab2', target: 'manufacturer2', animated: false, style: { stroke: '#9E9E9E' } },

  // Manufacturer to Retail connections
  { id: 'e8', source: 'manufacturer1', target: 'retail1', animated: false, style: { stroke: '#4CAF50' } },
  { id: 'e9', source: 'manufacturer2', target: 'retail1', animated: false, style: { stroke: '#9E9E9E' } },
];

function SupplyChainFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => {
    setEdges((eds) => [...eds, params]);
  }, [setEdges]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const filterNodes = (filter) => {
    let filteredNodes = initialNodes;
    let filteredEdges = initialEdges;

    switch (filter) {
      case 'completed':
        filteredNodes = initialNodes.filter(node => node.data.status === 'completed');
        filteredEdges = initialEdges.filter(edge => 
          filteredNodes.find(n => n.id === edge.source) && 
          filteredNodes.find(n => n.id === edge.target)
        );
        break;
      case 'in-progress':
        filteredNodes = initialNodes.filter(node => node.data.status === 'in-progress');
        filteredEdges = initialEdges.filter(edge => 
          filteredNodes.find(n => n.id === edge.source) && 
          filteredNodes.find(n => n.id === edge.target)
        );
        break;
      case 'high-quality':
        filteredNodes = initialNodes.filter(node => node.data.quality >= 4.5);
        filteredEdges = initialEdges.filter(edge => 
          filteredNodes.find(n => n.id === edge.source) && 
          filteredNodes.find(n => n.id === edge.target)
        );
        break;
      default:
        // Show all
        break;
    }

    setNodes(filteredNodes);
    setEdges(filteredEdges);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    filterNodes(filter);
  };

  const resetView = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedFilter('all');
    setSelectedNode(null);
  };

  const stats = {
    totalNodes: nodes.length,
    completedNodes: nodes.filter(n => n.data.status === 'completed').length,
    inProgressNodes: nodes.filter(n => n.data.status === 'in-progress').length,
    avgQuality: (nodes.reduce((sum, n) => sum + n.data.quality, 0) / nodes.length).toFixed(1),
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Supply Chain Flow Visualization
      </Typography>

      {/* Controls */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filter Nodes</InputLabel>
            <Select
              value={selectedFilter}
              label="Filter Nodes"
              onChange={(e) => handleFilterChange(e.target.value)}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2E7D32',
                },
              }}
            >
              <MenuItem value="all">All Nodes</MenuItem>
              <MenuItem value="completed">Completed Only</MenuItem>
              <MenuItem value="in-progress">In Progress Only</MenuItem>
              <MenuItem value="high-quality">High Quality (4.5+)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={resetView}
              sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
            >
              Reset View
            </Button>
            <Button
              variant="outlined"
              startIcon={<CenterFocusStrong />}
              sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
            >
              Center View
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Flow Diagram */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ height: '600px', position: 'relative' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.1 }}
            >
              <Controls />
              <Background />
              <MiniMap 
                style={{
                  height: 120,
                  width: 200,
                  backgroundColor: '#f8f9fa',
                }}
                zoomable
                pannable
              />
            </ReactFlow>
          </Paper>
        </Grid>

        {/* Info Panel */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Network Statistics
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">Total Nodes</Typography>
              <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                {stats.totalNodes}
              </Typography>
            </Box>

            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Completed</Typography>
                <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                  {stats.completedNodes}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">In Progress</Typography>
                <Typography variant="h6" sx={{ color: '#FF9800' }}>
                  {stats.inProgressNodes}
                </Typography>
              </Grid>
            </Grid>

            <Box>
              <Typography variant="body2" color="textSecondary">Avg Quality</Typography>
              <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                {stats.avgQuality}/5
              </Typography>
            </Box>
          </Paper>

          {/* Legend */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Status Legend
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Chip label="✅ Completed" size="small" sx={{ backgroundColor: '#e8f5e8' }} />
              <Chip label="⏳ In Progress" size="small" sx={{ backgroundColor: '#fff3e0' }} />
              <Chip label="⏸️ Pending" size="small" sx={{ backgroundColor: '#f3f4f6' }} />
              <Chip label="❌ Failed" size="small" sx={{ backgroundColor: '#ffebee' }} />
            </Box>
          </Paper>

          {/* Selected Node Details */}
          {selectedNode && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                Node Details
              </Typography>
              
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedNode.data.label}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {selectedNode.data.details}
              </Typography>
              
              <Box sx={{ mb: 1 }}>
                <Chip 
                  label={selectedNode.data.status} 
                  size="small"
                  color={
                    selectedNode.data.status === 'completed' ? 'success' :
                    selectedNode.data.status === 'in-progress' ? 'warning' :
                    'default'
                  }
                />
              </Box>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Quality:</strong> {selectedNode.data.quality}/5
              </Typography>
              
              <Typography variant="body2">
                <strong>Last Updated:</strong> {new Date(selectedNode.data.timestamp).toLocaleDateString()}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default SupplyChainFlow;
