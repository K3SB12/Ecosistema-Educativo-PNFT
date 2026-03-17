// src/pages/Logbook.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { addItem, getAll, getLogbookByGroup, getLogbookByStudent, getLogbookByDate } from '../database/indexedDB';

function Logbook() {
  const [entries, setEntries] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [plannings, setPlannings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filters, setFilters] = useState({ group: '', student: '', date: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    planningId: '',
    date: new Date().toISOString().split('T')[0],
    groupId: '',
    studentsPresent: '',
    studentsTotal: '',
    topic: '',
    reflections: { queFunciono: '', queNoFunciono: '', queMejorar: '' },
    timeAnalysis: { planificadoInicio: 10, planificadoDesarrollo: 20, planificadoConclusion: 10,
                    realInicio: '', realDesarrollo: '', realConclusion: '' },
    incidents: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const loadData = async () => {
    const grps = await getAll('groups');
    const studs = await getAll('students');
    const plans = await getAll('plannings');
    const logs = await getAll('logbook');
    setGroups(grps);
    setStudents(studs);
    setPlannings(plans);
    setEntries(logs);
  };

  const applyFilters = async () => {
    let filtered = [];
    if (filters.group) {
      filtered = await getLogbookByGroup(filters.group);
    } else if (filters.student) {
      filtered = await getLogbookByStudent(filters.student);
    } else if (filters.date) {
      filtered = await getLogbookByDate(filters.date);
    } else {
      filtered = await getAll('logbook');
    }
    setEntries(filtered);
  };

  const handleOpenDialog = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData(entry);
    } else {
      setEditingEntry(null);
      setFormData({
        planningId: '',
        date: new Date().toISOString().split('T')[0],
        groupId: '',
        studentsPresent: '',
        studentsTotal: '',
        topic: '',
        reflections: { queFunciono: '', queNoFunciono: '', queMejorar: '' },
        timeAnalysis: { planificadoInicio: 10, planificadoDesarrollo: 20, planificadoConclusion: 10,
                        realInicio: '', realDesarrollo: '', realConclusion: '' },
        incidents: [],
      });
    }
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingEntry) {
        await updateItem('logbook', { ...editingEntry, ...formData });
      } else {
        await addItem('logbook', formData);
      }
      loadData();
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Entrada guardada', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error: ' + error.message, severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta entrada?')) {
      await deleteItem('logbook', id);
      loadData();
      setSnackbar({ open: true, message: 'Entrada eliminada', severity: 'info' });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bitácora Docente
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Filtrar por grupo</InputLabel>
              <Select
                value={filters.group}
                onChange={(e) => setFilters({ ...filters, group: e.target.value, student: '', date: '' })}
                label="Filtrar por grupo"
              >
                <MenuItem value="">Todos</MenuItem>
                {groups.map((g) => (
                  <MenuItem key={g.id} value={g.id}>{g.nivel} - {g.seccion}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Filtrar por estudiante</InputLabel>
              <Select
                value={filters.student}
                onChange={(e) => setFilters({ ...filters, student: e.target.value, group: '', date: '' })}
                label="Filtrar por estudiante"
              >
                <MenuItem value="">Todos</MenuItem>
                {students.map((s) => (
                  <MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Fecha"
              type="date"
              size="small"
              fullWidth
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value, group: '', student: '' })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={applyFilters}>
              Aplicar
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
              Nueva entrada
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Grupo</TableCell>
              <TableCell>Tema</TableCell>
              <TableCell>Presentes</TableCell>
              <TableCell>¿Qué funcionó?</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{groups.find(g => g.id === entry.groupId)?.nivel} {groups.find(g => g.id === entry.groupId)?.seccion}</TableCell>
                <TableCell>{entry.topic}</TableCell>
                <TableCell>{entry.studentsPresent}/{entry.studentsTotal}</TableCell>
                <TableCell>{entry.reflections?.queFunciono?.substring(0, 50)}...</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpenDialog(entry)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(entry.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de entrada */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingEntry ? 'Editar entrada' : 'Nueva entrada de bitácora'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Planeamiento relacionado</InputLabel>
                <Select
                  value={formData.planningId}
                  onChange={(e) => setFormData({ ...formData, planningId: e.target.value })}
                  label="Planeamiento relacionado"
                >
                  {plannings.map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Fecha"
                type="date"
                size="small"
                fullWidth
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Grupo</InputLabel>
                <Select
                  value={formData.groupId}
                  onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                  label="Grupo"
                >
                  {groups.map((g) => (
                    <MenuItem key={g.id} value={g.id}>{g.nivel} - {g.seccion}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Estudiantes presentes"
                type="number"
                size="small"
                fullWidth
                value={formData.studentsPresent}
                onChange={(e) => setFormData({ ...formData, studentsPresent: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Total estudiantes"
                type="number"
                size="small"
                fullWidth
                value={formData.studentsTotal}
                onChange={(e) => setFormData({ ...formData, studentsTotal: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tema de la lección"
                size="small"
                fullWidth
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Reflexiones docentes</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="¿Qué funcionó?"
                multiline
                rows={2}
                fullWidth
                size="small"
                value={formData.reflections.queFunciono}
                onChange={(e) => setFormData({ ...formData, reflections: { ...formData.reflections, queFunciono: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="¿Qué no funcionó?"
                multiline
                rows={2}
                fullWidth
                size="small"
                value={formData.reflections.queNoFunciono}
                onChange={(e) => setFormData({ ...formData, reflections: { ...formData.reflections, queNoFunciono: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="¿Qué puedo mejorar?"
                multiline
                rows={2}
                fullWidth
                size="small"
                value={formData.reflections.queMejorar}
                onChange={(e) => setFormData({ ...formData, reflections: { ...formData.reflections, queMejorar: e.target.value } })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

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

export default Logbook;
