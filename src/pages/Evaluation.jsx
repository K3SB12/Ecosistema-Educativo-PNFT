// src/pages/Evaluation.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { getAll, addItem, updateItem, deleteItem, getStudentsByGroup } from '../database/indexedDB';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Evaluation() {
  const [tabValue, setTabValue] = useState(0);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [students, setStudents] = useState([]);
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({ nombre: '', porcentaje: '' });
  const [grades, setGrades] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadGroups();
    loadComponents();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      loadStudents(selectedGroup);
    }
  }, [selectedGroup]);

  const loadGroups = async () => {
    const grps = await getAll('groups');
    setGroups(grps);
  };

  const loadComponents = async () => {
    const comps = await getAll('evaluationComponents') || []; // Asumiendo que hay un store para componentes
    setComponents(comps);
  };

  const loadStudents = async (groupId) => {
    const studs = await getStudentsByGroup(groupId);
    setStudents(studs);
    // Inicializar calificaciones vacías
    const initialGrades = {};
    studs.forEach(s => { initialGrades[s.id] = {}; });
    setGrades(initialGrades);
  };

  const handleAddComponent = async () => {
    if (!newComponent.nombre || !newComponent.porcentaje) {
      setSnackbar({ open: true, message: 'Complete todos los campos', severity: 'warning' });
      return;
    }
    try {
      const id = await addItem('evaluationComponents', newComponent);
      setComponents([...components, { id, ...newComponent }]);
      setNewComponent({ nombre: '', porcentaje: '' });
      setSnackbar({ open: true, message: 'Componente agregado', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error: ' + error.message, severity: 'error' });
    }
  };

  const handleGradeChange = (studentId, componentId, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [componentId]: value,
      }
    }));
  };

  const handleSaveGrades = async () => {
    // Aquí se guardarían las calificaciones en la base de datos
    setSnackbar({ open: true, message: 'Calificaciones guardadas (simulado)', severity: 'success' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Evaluación
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} centered>
          <Tab label="Configuración de componentes" />
          <Tab label="Registro de calificaciones" />
          <Tab label="Proyecto (III Ciclo)" />
        </Tabs>
      </Paper>

      {/* Configuración de componentes */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Agregar nuevo componente
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="Nombre del componente"
                    value={newComponent.nombre}
                    onChange={(e) => setNewComponent({ ...newComponent, nombre: e.target.value })}
                    size="small"
                  />
                  <TextField
                    label="Porcentaje (%)"
                    type="number"
                    value={newComponent.porcentaje}
                    onChange={(e) => setNewComponent({ ...newComponent, porcentaje: e.target.value })}
                    size="small"
                    inputProps={{ min: 0, max: 100 }}
                  />
                  <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddComponent}>
                    Agregar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Componentes existentes
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Porcentaje</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {components.map((comp) => (
                        <TableRow key={comp.id}>
                          <TableCell>{comp.nombre}</TableCell>
                          <TableCell>{comp.porcentaje}%</TableCell>
                          <TableCell>
                            <IconButton color="error" size="small">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Registro de calificaciones */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Seleccionar grupo</InputLabel>
              <Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} label="Seleccionar grupo">
                {groups.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.nivel} - Sección {g.seccion} ({g.añoLectivo})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {selectedGroup && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Calificaciones - {groups.find(g => g.id === selectedGroup)?.nivel} Sección {groups.find(g => g.id === selectedGroup)?.seccion}
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Estudiante</TableCell>
                          {components.map((comp) => (
                            <TableCell key={comp.id}>{comp.nombre} ({comp.porcentaje}%)</TableCell>
                          ))}
                          <TableCell>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.nombre}</TableCell>
                            {components.map((comp) => (
                              <TableCell key={comp.id}>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={grades[student.id]?.[comp.id] || ''}
                                  onChange={(e) => handleGradeChange(student.id, comp.id, e.target.value)}
                                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                                  sx={{ width: 80 }}
                                />
                              </TableCell>
                            ))}
                            <TableCell>
                              <IconButton color="primary" size="small">
                                <SaveIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveGrades}>
                      Guardar todas
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      {/* Proyecto III Ciclo */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="body1" color="text.secondary" paragraph>
          Módulo para evaluación del componente Proyecto en III Ciclo (Design Thinking).
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">Etapas del proyecto</Typography>
            <Typography><strong>Inicial (30%):</strong> Empatizar, Definir, Idear</Typography>
            <Typography><strong>Desarrollo (40%):</strong> Prototipar</Typography>
            <Typography><strong>Final (30%):</strong> Probar/Evaluar</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Configurar proyecto
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Evaluation;
