import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard({
    color = 'white',
    title
}) {
    return (
        <Card sx={{ minWidth: 200, marginBottom: '10px', backgroundColor: color  }}>
            <CardContent>
                <Typography sx={{ fontSize: 20, textAlign: 'center' }}gutterBottom>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}
