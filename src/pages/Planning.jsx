// src/pages/Planning.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Chip,
  TextField,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { getNiveles, AREAS_CONOCIMIENTO, PRACTICAS_PENSADOR_COMPUTACIONAL, ACTITUDES_PENSADOR_COMPUTACIONAL } from '../data/pnft-curriculum';
import { addItem, getAll } from '../database/indexedDB';
import PromptGenerator from '../components/Planning/PromptGenerator';

const steps = ['Datos generales', 'Selección de saberes', 'Estrategia IA', 'Revisión y guardar'];

function Planning() {
  const [activeStep, setActiveStep] = useState(0);
  const [niveles, setNiveles] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState('');
  const [selectedModulo, setSelectedModulo] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedPracticas, setSelectedPracticas] = useState([]);
  const [selectedActitudes, setSelectedActitudes] = useState([]);
  const [metodologia, setMetodologia] = useState('');
  const [ejeTransversal, setEjeTransversal] = useState('');
  const [estrategiaIA, setEstrategiaIA] = useState('');
  const [planningName, setPlanningName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setNiveles(getNiveles());
  }, []);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSave = async () => {
    try {
      const planning = {
        nombre: planningName || 'Planeamiento sin nombre',
        nivel: selectedNivel,
        modulo: selectedModulo,
        areas: selectedAreas,
        practicas: selectedPracticas,
        actitudes: selectedActitudes,
        metodologia,
        ejeTransversal,
        estrategiaIA,
        fechaCreacion: new Date().toISOString(),
      };
      await addItem('plannings', planning);
      setSnackbar({ open: true, message: 'Planeamiento guardado exitosamente', severity: 'success' });
      // Reiniciar formulario o redirigir
      setActiveStep(0);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar: ' + error.message, severity: 'error' });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del planeamiento"
                value={planningName}
                onChange={(e) => setPlanningName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Ciclo / Nivel</InputLabel>
                <Select
                  value={selectedNivel}
                  onChange={(e) => setSelectedNivel(e.target.value)}
                  label="Ciclo / Nivel"
                >
                  {niveles.map((n) => (
                    <MenuItem key={`${n.ciclo}-${n.nivel}`} value={`${n.ciclo}|${n.nivel}`}>
                      {n.ciclo} - {n.nivel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Módulo</InputLabel>
                <Select
                  value={selectedModulo}
                  onChange={(e) => setSelectedModulo(e.target.value)}
                  label="Módulo"
                >
                  <MenuItem value={1}>Módulo 1</MenuItem>
                  <MenuItem value={2}>Módulo 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Metodología activa</InputLabel>
                <Select
                  value={metodologia}
                  onChange={(e) => setMetodologia(e.target.value)}
                  label="Metodología activa"
                >
                  <MenuItem value="ABJ">Aprendizaje Basado en Juegos (ABJ)</MenuItem>
                  <MenuItem value="ABR">Aprendizaje Basado en Retos (ABR)</MenuItem>
                  <MenuItem value="DT">Design Thinking</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Eje transversal</InputLabel>
                <Select
                  value={ejeTransversal}
                  onChange={(e) => setEjeTransversal(e.target.value)}
                  label="Eje transversal"
                >
                  <MenuItem value="ciudadania">Ciudadanía y ética digital</MenuItem>
                  <MenuItem value="pensamiento">Pensamiento computacional para la resolución de problemas</MenuItem>
                  <MenuItem value="emprendimiento">Emprendimiento e Innovación</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Áreas de conocimiento
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Seleccionar áreas</InputLabel>
                <Select
                  multiple
                  value={selectedAreas}
                  onChange={(e) => setSelectedAreas(e.target.value)}
                  input={<OutlinedInput label="Seleccionar áreas" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={AREAS_CONOCIMIENTO.find(a => a.id === value)?.nombre || value} />
                      ))}
                    </Box>
                  )}
                >
                  {AREAS_CONOCIMIENTO.map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      <Checkbox checked={selectedAreas.includes(area.id)} />
                      <ListItemText primary={area.nombre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Prácticas del pensador computacional
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Seleccionar prácticas</InputLabel>
                <Select
                  multiple
                  value={selectedPracticas}
                  onChange={(e) => setSelectedPracticas(e.target.value)}
                  input={<OutlinedInput label="Seleccionar prácticas" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={PRACTICAS_PENSADOR_COMPUTACIONAL.find(p => p.id === value)?.nombre || value} />
                      ))}
                    </Box>
                  )}
                >
                  {PRACTICAS_PENSADOR_COMPUTACIONAL.map((practica) => (
                    <MenuItem key={practica.id} value={practica.id}>
                      <Checkbox checked={selectedPracticas.includes(practica.id)} />
                      <ListItemText primary={practica.nombre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Actitudes del pensador computacional
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Seleccionar actitudes</InputLabel>
                <Select
                  multiple
                  value={selectedActitudes}
                  onChange={(e) => setSelectedActitudes(e.target.value)}
                  input={<OutlinedInput label="Seleccionar actitudes" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={ACTITUDES_PENSADOR_COMPUTACIONAL.find(a => a.id === value)?.nombre || value} />
                      ))}
                    </Box>
                  )}
                >
                  {ACTITUDES_PENSADOR_COMPUTACIONAL.map((actitud) => (
                    <MenuItem key={actitud.id} value={actitud.id}>
                      <Checkbox checked={selectedActitudes.includes(actitud.id)} />
                      <ListItemText primary={actitud.nombre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <PromptGenerator
            nivel={selectedNivel}
            modulo={selectedModulo}
            areas={selectedAreas}
            practicas={selectedPracticas}
            actitudes={selectedActitudes}
            metodologia={metodologia}
            onEstrategiaGenerated={setEstrategiaIA}
          />
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Resumen del planeamiento
            </Typography>
            <Card>
              <CardContent>
                <Typography><strong>Nombre:</strong> {planningName}</Typography>
                <Typography><strong>Nivel:</strong> {selectedNivel}</Typography>
                <Typography><strong>Módulo:</strong> {selectedModulo}</Typography>
                <Typography><strong>Metodología:</strong> {metodologia}</Typography>
                <Typography><strong>Eje transversal:</strong> {ejeTransversal}</Typography>
                <Typography><strong>Áreas:</strong> {selectedAreas.map(a => AREAS_CONOCIMIENTO.find(ar => ar.id === a)?.nombre).join(', ')}</Typography>
                <Typography><strong>Prácticas:</strong> {selectedPracticas.map(p => PRACTICAS_PENSADOR_COMPUTACIONAL.find(pr => pr.id === p)?.nombre).join(', ')}</Typography>
                <Typography><strong>Actitudes:</strong> {selectedActitudes.map(a => ACTITUDES_PENSADOR_COMPUTACIONAL.find(ac => ac.id === a)?.nombre).join(', ')}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1">Estrategia generada:</Typography>
                <Typography paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                  {estrategiaIA || 'No se ha generado ninguna estrategia aún.'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Planeamiento Didáctico
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atrás
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar planeamiento
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Siguiente
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Planning;
