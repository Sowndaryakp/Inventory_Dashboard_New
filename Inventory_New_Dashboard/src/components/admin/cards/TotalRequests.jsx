import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const TotalRequests = () => {
    const [totalRequests, setTotalRequests] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8986/inventory/analytics')
            .then(response => response.json())
            .then(data => {
                // Assuming data is in the format { "total_requests": 29 }
                setTotalRequests(data.total_requests);
            })
            .catch(error => {
                console.error('Error fetching total requests:', error);
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
                <InfoCircleOutlined style={{ fontSize: '50px', color: '#38bdf8' }} />
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>Total Requests:</h3>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: totalRequests !== null ? 'black' : 'gray' }}>
                        {totalRequests !== null ? totalRequests : <Spin />}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default TotalRequests;
