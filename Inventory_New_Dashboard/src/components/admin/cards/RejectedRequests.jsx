import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const RejectedRequests = () => {
    const [rejectedRequests, setRejectedRequests] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8986/inventory/analytics')
            .then(response => response.json())
            .then(data => {
                // Assuming data is in the format { "rejected_requests": 10 }
                setRejectedRequests(data.rejected_requests);
            })
            .catch(error => {
                console.error('Error fetching rejected requests:', error);
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
                <CloseCircleOutlined style={{ fontSize: '50px', color: '#ff4d4f' }} />
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>Rejected Requests:</h3>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: rejectedRequests !== null ? 'black' : 'gray' }}>
                        {rejectedRequests !== null ? rejectedRequests : <Spin />}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default RejectedRequests;
