import React from 'react';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green } from '@mui/material/colors';

function FileUploadButton({ onFileUpload }) {
    // Manejador para el evento de cambio al seleccionar un archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtén el archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result; // Contenido del archivo leído
                onFileUpload(fileContent); // Pasamos el contenido al componente principal
            };
            reader.readAsText(file); // Lee el archivo como texto
        }
    };

    return (
        <div>
            {/* El botón para subir archivos */}
            <Button
                component="label"
                variant="outlined"
                sx={{
                    color: green[500],
                    borderColor: green[500],
                    '&:hover': { backgroundColor: green[50] },
                }}
            >
                <AddCircleIcon sx={{ color: green[500], marginRight: 1 }} />
                Subir archivo
                <input
                    type="file"
                    accept=".txt" // Acepta solo archivos de texto
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
        </div>
    );
}

export default FileUploadButton;
