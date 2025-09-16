import React from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'pending': return '#9E9E9E';
      case 'failed': return '#F44336';
      default: return '#2196F3';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '⏳';
      case 'pending': return '⏸️';
      case 'failed': return '❌';
      default: return '🔵';
    }
  };

  return (
    <div 
      style={{
        background: 'white',
        border: `2px solid ${getStatusColor(data.status)}`,
        borderRadius: '8px',
        padding: '12px',
        minWidth: '150px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Handle type="target" position={Position.Left} />
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ marginRight: '8px', fontSize: '16px' }}>
          {getStatusIcon(data.status)}
        </span>
        <strong style={{ color: getStatusColor(data.status) }}>
          {data.label}
        </strong>
      </div>
      
      {data.details && (
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
          {data.details}
        </div>
      )}
      
      {data.timestamp && (
        <div style={{ fontSize: '10px', color: '#999' }}>
          {new Date(data.timestamp).toLocaleDateString()}
        </div>
      )}
      
      {data.quality && (
        <div style={{ 
          fontSize: '12px', 
          color: '#2E7D32',
          fontWeight: 'bold',
          marginTop: '4px'
        }}>
          Quality: {data.quality}/5
        </div>
      )}
      
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomNode;
