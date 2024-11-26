import React from 'react';

const AnalysisButtons = ({
                             handleLexicalAnalysis,
                             handleSyntaxAnalysis,
                             handleSemanticAnalysis,
                             isLexicalComplete,
                             isSyntaxComplete,
                         }) => {
    return (
        <div>
            <button onClick={handleLexicalAnalysis}>Análisis Léxico</button>
            <button
                onClick={handleSyntaxAnalysis}
                disabled={!isLexicalComplete} // Activado solo si el léxico fue exitoso
            >
                Análisis Sintáctico
            </button>
            <button
                onClick={handleSemanticAnalysis}
                disabled={!isSyntaxComplete} // Activado solo si el sintáctico fue exitoso
            >
                Análisis Semántico
            </button>
        </div>
    );
};

export default AnalysisButtons;


