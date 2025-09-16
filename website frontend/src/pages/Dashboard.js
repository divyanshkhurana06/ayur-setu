import React, { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 50, y: 100 },
    data: { 
      label: 'Farmers',
      status: 'completed',
      details: '45 Active Collectors',
      quality: 4.2
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Processors',
      status: 'in-progress',
      details: '12 Processing Units',
      quality: 4.5
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 450, y: 100 },
    data: { 
      label: 'Labs',
      status: 'completed',
      details: '8 Testing Labs',
      quality: 4.7
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 650, y: 100 },
    data: { 
      label: 'Manufacturers',
      status: 'in-progress',
      details: '6 Manufacturing Units',
      quality: 4.8
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Quality Score',
      data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7],
      borderColor: '#2E7D32',
      backgroundColor: 'rgba(46, 125, 50, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Collections',
      data: [120, 135, 145, 160, 155, 170],
      borderColor: '#66BB6A',
      backgroundColor: 'rgba(102, 187, 106, 0.1)',
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Quality & Collection Trends',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => {
    setEdges((eds) => [...eds, params]);
  }, [setEdges]);

  const stats = [
    { title: 'Active Batches', value: '45', color: '#2E7D32' },
    { title: "Today's Collections", value: '12', color: '#66BB6A' },
    { title: 'Quality Score', value: '4.7/5', color: '#4CAF50' },
    { title: 'Pending Tests', value: '8', color: '#FF9800' },
  ];

  const recentActivity = [
    { id: 1, action: 'Batch #ABC123 processed', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'Lab test completed for #DEF456', time: '15 minutes ago', status: 'success' },
    { id: 3, action: 'Quality alert for #GHI789', time: '1 hour ago', status: 'warning' },
    { id: 4, action: 'New collection from Farmer #001', time: '2 hours ago', status: 'info' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Ayur Setu Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderLeft: `4px solid ${stat.color}` }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Supply Chain Flow */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
          Supply Chain Overview
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

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Recent Activity
            </Typography>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{ 
                padding: '12px 0', 
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <Typography variant="body2">{activity.action}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {activity.time}
                  </Typography>
                </div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activity.status === 'success' ? '#4CAF50' : 
                                   activity.status === 'warning' ? '#FF9800' : '#2196F3'
                }} />
              </div>
            ))}
          </Paper>
        </Grid>

        {/* Quality Trends Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
