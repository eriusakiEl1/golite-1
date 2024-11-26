import React, { useState } from "react";
import CodeEditor from "./components/Editor"; // Tu editor Monaco
import AnalysisButtons from "./components/AnalysisButtons"; // Botones de análisis
import TokenTable from "./components/TokenTable"; // Tabla de tokens
import ErrorTable from "./components/ErrorTable"; // Tabla de errores
import { analyzeLexical } from "./analyzers/lexico"; // Importa la lógica del análisis léxico
import parser from './analyzers/sintactico'; // Importa el analizador generado

const App = () => {
    const [code, setCode] = useState(""); // Contenido del editor
    const [tokens, setTokens] = useState([]); // Tokens léxicos
    const [errors, setErrors] = useState([]); // Errores léxicos
    const [syntaxErrors, setSyntaxErrors] = useState([]); // Errores sintácticos
    const [isLexicalComplete, setLexicalComplete] = useState(false); // Estado del léxico
    const [isSemanticAnalysisEnabled, setSemanticAnalysisEnabled] = useState(false); // Estado del análisis semántico

    // Análisis léxico
    const handleLexicalAnalysis = () => {
        const { tokens: analyzedTokens, errors: analyzedErrors } = analyzeLexical(code);

        setTokens(analyzedTokens); // Actualiza la tabla de tokens
        setErrors(analyzedErrors); // Actualiza la tabla de errores

        if (analyzedErrors.length === 0) {
            setLexicalComplete(true); // Habilitar el botón de análisis sintáctico
        } else {
            setLexicalComplete(false);
        }
    };

    // Análisis sintáctico
    const handleSyntaxAnalysis = () => {
        try {
            // Ejecutar el análisis sintáctico
            parser.parse(code);

            // Si no hay errores:
            setErrors(["No se encontraron errores"]); // Mensaje en la tabla
            setSemanticAnalysisEnabled(true); // Habilitar Análisis Semántico
        } catch (error) {
            // Si hay errores:
            setErrors([error.message]); // Mostrar los errores en la tabla
            setSemanticAnalysisEnabled(false); // Desactivar Análisis Semántico
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Compilador Golite</h1>
            <CodeEditor code={code} setCode={setCode} />
            <AnalysisButtons
                handleLexicalAnalysis={handleLexicalAnalysis}
                handleSyntaxAnalysis={handleSyntaxAnalysis}
                handleSemanticAnalysis={() => {}}
                isLexicalComplete={isLexicalComplete}
                isSyntaxComplete={isSemanticAnalysisEnabled}
            />

            <TokenTable tokens={tokens} />
            <ErrorTable errors={[...errors, ...syntaxErrors]} />
        </div>
    );
};

export default App;
