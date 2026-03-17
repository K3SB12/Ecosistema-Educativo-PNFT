# Ecosistema-Educativo-PNFT

# PNFT Articulador 2026

**Sistema Integral de Planeamiento y Evaluación**  
Programa Nacional de Formación Tecnológica  
Ministerio de Educación Pública - Costa Rica

---

## 📋 Descripción

Aplicación web 100% gratuita, offline/online, que permite a los docentes del PNFT:
- Crear planeamientos didácticos articulados al currículo oficial.
- Registrar evaluaciones según lineamientos MEP 2026.
- Mantener bitácora vinculada al planeamiento.
- Gestionar estudiantes y grupos.
- Respaldar automáticamente la información.

Todo almacenado localmente (IndexedDB) con backup exportable.

---

## 🚀 Características

- ✅ **100% gratuito**: sin APIs pagas, sin suscripciones.
- ✅ **100% offline**: funciona sin internet después de descargar.
- ✅ **100% MEP**: alineado con currículo PNFT y evaluación 2026.
- ✅ **100% privado**: datos almacenados localmente en el equipo del docente.
- ✅ **Currículo completo**: 11 niveles (Preescolar a 9°), 22 módulos.
- ✅ **Evaluación 2026**: componentes configurables, proyecto con Design Thinking.
- ✅ **Bitácora vinculada**: reflexiones docentes, incidencias, respaldo legal.
- ✅ **IA opcional**: generación de estrategias con ChatGPT, Copilot o Gemini.
- ✅ **Exportación**: Word (plantilla oficial), PDF, Excel.
- ✅ **Backup triple**: diario, semanal, manual.

---

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite, Material UI
- **Base de datos local**: IndexedDB (via idb)
- **Exportación**: docxtemplater, jsPDF, SheetJS (xlsx)
- **Hosting**: GitHub Pages (gratuito)

---

## 📦 Instalación y uso

### Requisitos
- Node.js 18+ y npm (solo para desarrollo, no para uso final)

### Desarrollo local
```bash
git clone https://github.com/tuusuario/pnft-articulador.git
cd pnft-articulador
npm install
npm run dev
