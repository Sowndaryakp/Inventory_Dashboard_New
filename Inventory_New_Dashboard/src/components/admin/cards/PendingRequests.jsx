import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const PendingRequests = () => {
    const [pendingRequests, setPendingRequests] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8986/inventory/analytics')
            .then(response => response.json())
            .then(data => {
                // Assuming data is in the format { "pending_requests": 5 }
                setPendingRequests(data.pending_requests);
            })
            .catch(error => {
                console.error('Error fetching pending requests:', error);
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
                <ExclamationCircleOutlined style={{ fontSize: '50px', color: '#fadb14' }} />
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>Pending Requests:</h3>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: pendingRequests !== null ? 'black' : 'gray' }}>
                        {pendingRequests !== null ? pendingRequests : <Spin />}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default PendingRequests;
