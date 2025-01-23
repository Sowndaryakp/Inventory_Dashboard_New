import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const ApprovedRequests = () => {
    const [approvedRequests, setApprovedRequests] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8986/inventory/analytics')
            .then(response => response.json())
            .then(data => {
                // Assuming data is in the format { "approved_requests": 15 }
                setApprovedRequests(data.approved_requests);
            })
            .catch(error => {
                console.error('Error fetching approved requests:', error);
            });
    }, []);

    return (
        <div style={{ marginLeft: '1rem' }}>
            <Card
                hoverable
                style={{
                    width: 320,
                    height: 120,
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    marginRight: '1rem',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
                bodyStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                }}
            >
                <CheckCircleOutlined style={{ fontSize: '50px', color: '#52c41a' }} />
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>Approved Requests:</h3>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: approvedRequests !== null ? 'black' : 'gray' }}>
                        {approvedRequests !== null ? approvedRequests : <Spin />}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default ApprovedRequests;
