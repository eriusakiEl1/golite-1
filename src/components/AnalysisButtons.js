import React from 'react';
import { Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const AnalysisButtons = ({
    handleLexicalAnalysis,
    handleSyntaxAnalysis,
    handleSemanticAnalysis,
    handleOpenModal,
    isLexicalComplete,
    isSyntaxComplete,
}) => {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLexicalAnalysis}
                style={{ marginRight: '10px' }}
            >
                Análisis Léxico
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleSyntaxAnalysis}
                disabled={!isLexicalComplete} // Deshabilitado hasta que se complete el análisis léxico
                style={{ marginRight: '10px' }}
            >
                Análisis Sintáctico
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={handleSemanticAnalysis}
                disabled={!isSyntaxComplete} // Deshabilitado hasta que se complete el análisis sintáctico
                style={{ marginRight: '10px' }}
            >
                Análisis Semántico
            </Button>
            <IconButton
                onClick={handleOpenModal}
                style={{ color: '#fff', backgroundColor: '#1976d2' }}
                aria-label="Información"
            >
                <InfoIcon />
            </IconButton>
        </div>
    );
};

export default AnalysisButtons;
