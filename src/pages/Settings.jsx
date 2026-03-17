// src/pages/Settings.jsx
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
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RestoreIcon from '@mui/icons-material/Restore';
import { getSetting, setSetting, getAll, saveBackup, getLatestBackups, clearStore } from '../database/indexedDB';
import * as XLSX from 'xlsx';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [periodos, setPeriodos] = useState([]);
  const [newPeriodo, setNewPeriodo] = useState({ año: '', nombre: '', inicio: '', fin: '' });
  const [porcentajes, setPorcentajes] = useState({
    trabajoCotidiano: 35,
    tareas: 10,
    pruebas: 30,
    proyecto: 15,
    asistencia: 10,
  });
  const [backups, setBackups] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [autoBackup, setAutoBackup] = useState({ diario: true, semanal: true });

  useEffect(() => {
    loadPeriodos();
    loadBackups();
    loadPorcentajes();
  }, []);

  const loadPeriodos = async () => {
    const per = await getSetting('periodos') || [];
    setPeriodos(per);
  };

  const loadBackups = async () => {
    const bk = await getLatestBackups(10);
    setBackups(bk);
  };

  const loadPorcentajes = async () => {
    const pct = await getSetting('porcentajes') || {
      trabajoCotidiano: 35,
      tareas: 10,
      pruebas: 30,
      proyecto: 15,
      asistencia: 10,
    };
    setPorcentajes(pct);
  };

  const handleAddPeriodo = async () => {
    if (!newPeriodo.año || !newPeriodo.nombre) {
      setSnackbar({ open: true, message: 'Complete los campos requeridos', severity: 'warning' });
      return;
    }
    const updated = [...periodos, { ...newPeriodo, id: Date.now() }];
    setPeriodos(updated);
    await setSetting('periodos', updated);
    setNewPeriodo({ año: '', nombre: '', inicio: '', fin: '' });
    setSnackbar({ open: true, message: 'Periodo agregado', severity: 'success' });
  };

  const handleDeletePeriodo = async (id) => {
    const updated = periodos.filter(p => p.id !== id);
    setPeriodos(updated);
    await setSetting('periodos', updated);
    setSnackbar({ open: true, message: 'Periodo eliminado', severity: 'info' });
  };

  const handleSavePorcentajes = async () => {
    await setSetting('porcentajes', porcentajes);
    setSnackbar({ open: true, message: 'Porcentajes guardados', severity: 'success' });
  };

  const handleExportBackup = async () => {
    try {
      const data = {
        plannings: await getAll('plannings'),
        evaluations: await getAll('evaluations'),
        logbook: await getAll('logbook'),
        students: await getAll('students'),
        groups: await getAll('groups'),
        settings: await getAll('settings'),
        version: '1.0',
        fecha: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pnft_backup_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      await saveBackup(data, 'manual');
      loadBackups();
      setSnackbar({ open: true, message: 'Backup exportado', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error: ' + error.message, severity: 'error' });
    }
  };

  const handleImportBackup = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        // Aquí se deberían restaurar los datos en IndexedDB
        // Por simplicidad, solo mostramos mensaje
        setSnackbar({ open: true, message: 'Backup importado (simulado)', severity: 'success' });
        loadBackups();
      } catch (error) {
        setSnackbar({ open: true, message: 'Archivo inválido', severity: 'error' });
      }
    };
    reader.readAsText(file);
  };

  const handleRestoreFromStore = async (id) => {
    // Simular restauración desde un backup guardado en store
    setSnackbar({ open: true, message: 'Restauración simulada', severity: 'info' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configuración
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} centered>
          <Tab label="Periodos" />
          <Tab label="Componentes evaluación" />
          <Tab label="Backup y restauración" />
          <Tab label="General" />
        </Tabs>
      </Paper>

      {/* Periodos */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Agregar periodo lectivo
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Año"
                      type="number"
                      fullWidth
                      size="small"
                      value={newPeriodo.año}
                      onChange={(e) => setNewPeriodo({ ...newPeriodo, año: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre del periodo (ej. I Semestre)"
                      fullWidth
                      size="small"
                      value={newPeriodo.nombre}
                      onChange={(e) => setNewPeriodo({ ...newPeriodo, nombre: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Fecha inicio"
                      type="date"
                      fullWidth
                      size="small"
                      value={newPeriodo.inicio}
                      onChange={(e) => setNewPeriodo({ ...newPeriodo, inicio: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Fecha fin"
                      type="date"
                      fullWidth
                      size="small"
                      value={newPeriodo.fin}
                      onChange={(e) => setNewPeriodo({ ...newPeriodo, fin: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={handleAddPeriodo}>
                      Agregar periodo
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Periodos configurados
                </Typography>
                <List>
                  {periodos.map((p) => (
                    <React.Fragment key={p.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${p.nombre} ${p.año}`}
                          secondary={`${p.inicio || '?'} - ${p.fin || '?'}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleDeletePeriodo(p.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Componentes evaluación */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Porcentajes de evaluación (MEP 2026)
            </Typography>
            <Grid container spacing={2} sx={{ maxWidth: 400 }}>
              <Grid item xs={12}>
                <TextField
                  label="Trabajo Cotidiano (%)"
                  type="number"
                  fullWidth
                  size="small"
                  value={porcentajes.trabajoCotidiano}
                  onChange={(e) => setPorcentajes({ ...porcentajes, trabajoCotidiano: e.target.value })}
                  inputProps={{ min: 0, max: 100 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tareas (%)"
                  type="number"
                  fullWidth
                  size="small"
                  value={porcentajes.tareas}
                  onChange={(e) => setPorcentajes({ ...porcentajes, tareas: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pruebas (%)"
                  type="number"
                  fullWidth
                  size="small"
                  value={porcentajes.pruebas}
                  onChange={(e) => setPorcentajes({ ...porcentajes, pruebas: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Proyecto (%)"
                  type="number"
                  fullWidth
                  size="small"
                  value={porcentajes.proyecto}
                  onChange={(e) => setPorcentajes({ ...porcentajes, proyecto: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Asistencia (%)"
                  type="number"
                  fullWidth
                  size="small"
                  value={porcentajes.asistencia}
                  onChange={(e) => setPorcentajes({ ...porcentajes, asistencia: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSavePorcentajes}>
                  Guardar porcentajes
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Backup */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Exportar / Importar backup
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportBackup}>
                    Exportar backup (JSON)
                  </Button>
                  <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
                    Importar backup
                    <input type="file" hidden accept=".json" onChange={handleImportBackup} />
                  </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1">Backups automáticos</Typography>
                  <FormControlLabel
                    control={<Switch checked={autoBackup.diario} onChange={(e) => setAutoBackup({ ...autoBackup, diario: e.target.checked })} />}
                    label="Backup diario (18:00)"
                  />
                  <FormControlLabel
                    control={<Switch checked={autoBackup.semanal} onChange={(e) => setAutoBackup({ ...autoBackup, semanal: e.target.checked })} />}
                    label="Backup semanal (viernes 17:00)"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Backups recientes
                </Typography>
                <List>
                  {backups.map((b) => (
                    <ListItem key={b.id}>
                      <ListItemText
                        primary={`${b.type} - ${new Date(b.createdAt).toLocaleString()}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRestoreFromStore(b.id)}>
                          <RestoreIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* General */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Información del sistema
            </Typography>
            <Typography>Versión: 1.0.0</Typography>
            <Typography>Currículo: PNFT 2026</Typography>
            <Typography>Almacenamiento: IndexedDB local</Typography>
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

export default Settings;
