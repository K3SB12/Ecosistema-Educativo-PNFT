// src/components/Planning/PromptGenerator.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generatePrompt } from '../../services/promptService';

function PromptGenerator({ nivel, modulo, areas, practicas, actitudes, metodologia, onEstrategiaGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [estrategia, setEstrategia] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleGeneratePrompt = () => {
    const generated = generatePrompt({
      nivel,
      modulo,
      areas,
      practicas,
      actitudes,
      metodologia,
    });
    setPrompt(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setSnackbar({ open: true, message: 'Prompt copiado al portapapeles' });
  };

  const handleImport = () => {
    onEstrategiaGenerated(estrategia);
    setSnackbar({ open: true, message: 'Estrategia importada' });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Generar estrategia con IA
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Haz clic en "Generar prompt" para obtener un prompt listo para copiar y pegar en ChatGPT, Copilot o Gemini.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={handleGeneratePrompt}>
              Generar prompt
            </Button>
            {prompt && (
              <Tooltip title="Copiar al portapapeles">
                <IconButton onClick={handleCopy}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {prompt && (
            <TextField
              fullWidth
              multiline
              rows={8}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{ mt: 2 }}
              variant="outlined"
              label="Prompt generado"
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Pega aquí la respuesta de la IA y luego impórtala a tu planeamiento.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={estrategia}
            onChange={(e) => setEstrategia(e.target.value)}
            label="Estrategia generada por IA"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleImport} disabled={!estrategia}>
            Importar estrategia
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}

export default PromptGenerator;
