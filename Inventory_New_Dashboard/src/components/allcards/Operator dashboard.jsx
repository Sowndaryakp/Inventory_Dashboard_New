import React, { useState } from 'react';

const OperatorDashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);

  const operatorModules = [
    {
      id: 'job-card',
      icon: '📝', // Placeholder icon
      name: 'Job Card Management',
      description: 'Operational Time Tracking',
      subModules: [
        {
          id: 'time-entry',
          name: 'Time Entry',
          description: 'Capture Operational Details',
          features: [
            'Enter Actual Time Taken',
            'Operation-wise Tracking',
            'Standard vs Actual Time Comparison',
            'Remarks and Status Update'
          ]
        },
        {
          id: 'qr-scan',
          name: 'QR Code Scan',
          description: 'Job Details Lookup',
          features: [
            'Scan QR Code for Job Details',
            'View Manufacturing Process Plan',
            'Access Tool and Fixture Information',
            'Check Drawing Versions'
          ]
        }
      ]
    },
    {
      id: 'inventory',
      icon: '🔧', // Placeholder icon
      name: 'Inventory & Tools',
      description: 'Resource Management',
      subModules: [
        {
          id: 'tool-inventory',
          name: 'Tool Inventory',
          description: 'Tool and Resource Tracking',
          features: [
            'View Available Tools',
            'Tool Calibration Status',
            'Tool Location Tracking',
            'Consumables Monitoring'
          ]
        },
        {
          id: 'tool-request',
          name: 'Tool Request',
          description: 'Resource Requisition',
          features: [
            'Request New Tools',
            'Check Tool Availability',
            'Track Tool Requests',
            'Maintenance Alerts'
          ]
        }
      ]
    },
    {
      id: 'production-execution',
      icon: '⏱️', // Placeholder icon
      name: 'Production Execution',
      description: 'Real-time Job Tracking',
      subModules: [
        {
          id: 'job-status',
          name: 'Job Status',
          description: 'Current Job Progress',
          features: [
            'View Assigned Jobs',
            'Track Job Progress',
            'Cycle Time Monitoring',
            'Production Count Entry'
          ]
        },
        {
          id: 'digital-checks',
          name: 'Pre-Production Checks',
          description: 'Validation Workflow',
          features: [
            'Verify Drawing Versions',
            'Confirm CNC Program',
            'Check Tool Loading',
            'Job Setup Confirmation'
          ]
        }
      ]
    },
    {
      id: 'quality-control',
      icon: '✅', // Placeholder icon
      name: 'Quality Control',
      description: 'In-Process Inspection',
      subModules: [
        {
          id: 'dimensional-measurement',
          name: 'Dimensional Measurement',
          description: 'Quality Verification',
          features: [
            'Enter Measurement Data',
            'Compare with Drawings',
            'Record Instrument Details',
            'Flag Deviations'
          ]
        },
        {
          id: 'inspection-report',
          name: 'Inspection Report',
          description: 'Quality Documentation',
          features: [
            'Generate Inspection Reports',
            'Record Acceptance/Rejection',
            'Capture Non-Conformity Details',
            'Upload Measurement Evidence'
          ]
        }
      ]
    }
  ];

  const ModuleSelector = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {operatorModules.map((module) => (
        <div 
          key={module.id} 
          className="p-4 border rounded shadow hover:shadow-lg transition-all cursor-pointer"
          onClick={() => setSelectedModule(module.id)}
        >
          <div className="flex flex-row items-center space-x-4 pb-2">
            <span className="text-2xl">{module.icon}</span>
            <h2 className="text-lg font-semibold">{module.name}</h2>
          </div>
          <p className="text-sm text-gray-500">{module.description}</p>
        </div>
      ))}
    </div>
  );

  const SubModuleDetails = () => {
    const module = operatorModules.find(m => m.id === selectedModule);

    if (!module) return null;

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">{module.name} - Sub-Modules</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {module.subModules.map((subModule) => (
            <div 
              key={subModule.id} 
              className="p-4 border rounded shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold">{subModule.name}</h3>
              <p className="text-gray-500 mb-4">{subModule.description}</p>
              <div className="grid md:grid-cols-2 gap-2">
                {subModule.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Operator Dashboard
      </h1>
      
      {!selectedModule ? (
        <ModuleSelector />
      ) : (
        <div>
          <button 
            className="mb-4 px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setSelectedModule(null)}
          >
            Back to Modules
          </button>
          <SubModuleDetails />
        </div>
      )}
    </div>
  );
};

export default OperatorDashboard;
