import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search, FilterList, Visibility } from '@mui/icons-material';
import CustomNode from '../components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

function BatchTracking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const batches = [
    {
      id: 'ABC123456',
      species: 'Ashwagandha',
      status: 'completed',
      quality: 4.8,
      location: 'Rishikesh, UK',
      collector: 'Rajesh Kumar',
      date: '2024-01-15',
      stage: 'Ready for Consumer'
    },
    {
      id: 'DEF789012',
      species: 'Tulsi',
      status: 'in-progress',
      quality: 4.5,
      location: 'Dehradun, UK',
      collector: 'Priya Sharma',
      date: '2024-01-18',
      stage: 'Lab Testing'
    },
    {
      id: 'GHI345678',
      species: 'Neem',
      status: 'pending',
      quality: 4.2,
      location: 'Haridwar, UK',
      collector: 'Amit Singh',
      date: '2024-01-20',
      stage: 'Processing'
    },
    {
      id: 'JKL901234',
      species: 'Brahmi',
      status: 'completed',
      quality: 4.9,
      location: 'Rishikesh, UK',
      collector: 'Sunita Devi',
      date: '2024-01-12',
      stage: 'Manufactured'
    },
    {
      id: 'MNO567890',
      species: 'Amla',
      status: 'failed',
      quality: 3.2,
      location: 'Mussoorie, UK',
      collector: 'Ramesh Kumar',
      date: '2024-01-22',
      stage: 'Quality Check Failed'
    },
  ];

  const createBatchFlow = (batch) => {
    const stages = [
      { id: 'collection', label: 'Collection', status: 'completed' },
      { id: 'processing', label: 'Processing', status: batch.stage === 'Processing' ? 'in-progress' : 'completed' },
      { id: 'testing', label: 'Lab Testing', status: batch.stage === 'Lab Testing' ? 'in-progress' : batch.stage === 'Processing' ? 'pending' : 'completed' },
      { id: 'manufacturing', label: 'Manufacturing', status: batch.stage === 'Manufacturing' ? 'in-progress' : (batch.stage === 'Ready for Consumer' || batch.stage === 'Manufactured') ? 'completed' : 'pending' },
    ];

    const nodes = stages.map((stage, index) => ({
      id: stage.id,
      type: 'custom',
      position: { x: index * 200, y: 100 },
      data: {
        label: stage.label,
        status: batch.status === 'failed' && stage.id === 'testing' ? 'failed' : stage.status,
        details: stage.id === 'collection' ? `${batch.collector}` : 
                stage.id === 'processing' ? 'Sun-dried 48hrs' :
                stage.id === 'testing' ? `Quality: ${batch.quality}/5` :
                'Final Product',
        timestamp: batch.date,
        quality: batch.quality
      },
    }));

    const edges = stages.slice(0, -1).map((stage, index) => ({
      id: `e${index}`,
      source: stage.id,
      target: stages[index + 1].id,
      animated: stages[index + 1].status === 'in-progress',
      style: { stroke: batch.status === 'failed' ? '#F44336' : '#2E7D32' }
    }));

    return { nodes, edges };
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => [...eds, params]);
  }, [setEdges]);

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    const { nodes: newNodes, edges: newEdges } = createBatchFlow(batch);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'default';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.collector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Batch Tracking
      </Typography>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by Batch ID, Species, or Collector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#2E7D32' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#2E7D32',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2E7D32',
                  },
                }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ 
                borderColor: '#2E7D32', 
                color: '#2E7D32',
                height: '56px'
              }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Batch List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '600px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Batches ({filteredBatches.length})
            </Typography>
            
            {filteredBatches.map((batch) => (
              <Card
                key={batch.id}
                sx={{
                  mb: 2,
                  cursor: 'pointer',
                  border: selectedBatch?.id === batch.id ? '2px solid #2E7D32' : '1px solid #e0e0e0',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
                onClick={() => handleBatchSelect(batch)}
              >
                <CardContent sx={{ pb: '16px !important' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                      #{batch.id}
                    </Typography>
                    <Chip
                      label={batch.status}
                      color={getStatusColor(batch.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                    {batch.species}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    📍 {batch.location}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    👨‍🌾 {batch.collector}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                      Quality: {batch.quality}/5
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(batch.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      color: '#2E7D32'
                    }}>
                      {batch.stage}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Flow Visualization */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '600px' }}>
            {selectedBatch ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                    Batch #{selectedBatch.id} - {selectedBatch.species}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/provenance/${selectedBatch.id}`)}
                    sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
                  >
                    View Full Details
                  </Button>
                </Box>
                
                <div style={{ height: '520px' }}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                  >
                    <Controls />
                    <Background />
                  </ReactFlow>
                </div>
              </>
            ) : (
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  Select a batch to view its journey
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Click on any batch from the list to see its supply chain flow
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default BatchTracking;
