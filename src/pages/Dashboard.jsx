// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { getAll } from '../database/indexedDB';

function Dashboard() {
  const [stats, setStats] = useState({
    plannings: 0,
    groups: 0,
    students: 0,
    evaluations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [plannings, groups, students, evaluations] = await Promise.all([
          getAll('plannings'),
          getAll('groups'),
          getAll('students'),
          getAll('evaluations'),
        ]);
        setStats({
          plannings: plannings.length,
          groups: groups.length,
          students: students.length,
          evaluations: evaluations.length,
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    { title: 'Planeamientos', value: stats.plannings, color: '#2E7D32' },
    { title: 'Grupos', value: stats.groups, color: '#1976D2' },
    { title: 'Estudiantes', value: stats.students, color: '#ed6c02' },
    { title: 'Evaluaciones', value: stats.evaluations, color: '#9c27b0' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Bienvenido al PNFT Articulador 2026. Aquí tienes un resumen de tu información.
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card sx={{ borderTop: `4px solid ${card.color}` }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h3" component="div" sx={{ color: card.color, fontWeight: 'bold' }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
