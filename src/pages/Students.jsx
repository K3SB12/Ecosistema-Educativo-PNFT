// src/pages/Students.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as XLSX from 'xlsx';
import { addItem, getAll, updateItem, deleteItem, getStudentsByGroup } from '../database/indexedDB';

function Students() {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    encargado: '',
    acomodaciones: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      loadStudents(selectedGroup);
    } else {
      loadAllStudents();
    }
  }, [selectedGroup]);

  const loadGroups = async () => {
    const grps = await getAll('groups');
    setGroups(grps);
  };

  const loadStudents = async (groupId) => {
    const studs = await getStudentsByGroup(groupId);
    setStudents(studs);
  };

  const loadAllStudents = async () => {
    const studs = await getAll('students');
    setStudents(studs);
  };

  const handleOpenDialog = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({
        nombre: '',
        cedula: '',
        email: '',
        telefono: '',
        encargado: '',
        acomodaciones: '',
      });
    }
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.nombre) {
        setSnackbar({ open: true, message: 'El nombre es obligatorio', severity: 'warning' });
        return;
      }
      const studentToSave = {
        ...formData,
        groupId: selectedGroup || null,
      };
      if (editingStudent) {
        await updateItem('students', { ...editingStudent, ...studentToSave });
      } else {
        await addItem('students', studentToSave);
      }
      loadStudents(selectedGroup);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Estudiante guardado', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error: ' + error.message, severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este estudiante?')) {
      await deleteItem('students', id);
      loadStudents(selectedGroup);
      setSnackbar({ open: true, message: 'Estudiante eliminado', severity: 'info' });
    }
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Asumimos primera fila como encabezados: Nombre, Cédula, Email, Teléfono, Encargado, Acomodaciones
      const headers = json[0];
      const rows = json.slice(1);
      const studentsToAdd = rows.map(row => ({
        nombre: row[0] || '',
        cedula: row[1] || '',
        email: row[2] || '',
        telefono: row[3] || '',
        encargado: row[4] || '',
        acomodaciones: row[5] || '',
        groupId: selectedGroup || null,
      })).filter(s => s.nombre); // solo los que tienen nombre

      for (const student of studentsToAdd) {
        await addItem('students', student);
      }
      loadStudents(selectedGroup);
      setSnackbar({ open: true, message: `${studentsToAdd.length} estudiantes importados`, severity: 'success' });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Estudiantes
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Filtrar por grupo</InputLabel>
              <Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                label="Filtrar por grupo"
              >
                <MenuItem value="">Todos los grupos</MenuItem>
                {groups.map((g) => (
                  <MenuItem key={g.id} value={g.id}>{g.nivel} - Sección {g.seccion}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
              Agregar manual
            </Button>
            <Button variant="outlined" component="label" startIcon={<FileUploadIcon />}>
              Importar Excel
              <input type="file" hidden accept=".xlsx, .xls" onChange={handleImportExcel} />
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Encargado</TableCell>
              <TableCell>Acomodaciones</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.nombre}</TableCell>
                <TableCell>{student.cedula}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.telefono}</TableCell>
                <TableCell>{student.encargado}</TableCell>
                <TableCell>
                  {student.acomodaciones && (
                    <Chip label="Adecuación" size="small" color="warning" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpenDialog(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(student.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de estudiante */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingStudent ? 'Editar estudiante' : 'Nuevo estudiante'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                fullWidth
                size="small"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cédula"
                fullWidth
                size="small"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                size="small"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                fullWidth
                size="small"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre del encargado legal"
                fullWidth
                size="small"
                value={formData.encargado}
                onChange={(e) => setFormData({ ...formData, encargado: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adecuaciones curriculares"
                fullWidth
                size="small"
                multiline
                rows={2}
                value={formData.acomodaciones}
                onChange={(e) => setFormData({ ...formData, acomodaciones: e.target.value })}
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

export default Students;
