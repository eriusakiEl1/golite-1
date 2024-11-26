import React, { useState } from "react";
import CodeEditor from "./components/Editor"; // Tu editor Monaco
import AnalysisButtons from "./components/AnalysisButtons"; // Botones de análisis
import TokenTable from "./components/TokenTable"; // Tabla de tokens
import Footer from "./components/Result"; // Tabla de errores
import { analyzeLexical } from "./analyzers/lexico"; // Importa la lógica del análisis léxico
import { analyzeSyntax } from './analyzers/sintactico';
import { Grid, Box} from '@mui/material';
import FileUploadButton from './components/FileUploadButton';
import TeamModal from './components/TeamModal'; // Ajusta la ruta según tu proyecto


const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState(""); // Contenido del editor
    const [tokens, setTokens] = useState([]); // Tokens léxicos
    const [errors, setErrors] = useState([]); // Errores léxicos
    const [syntaxErrors, setSyntaxErrors] = useState([]); // Errores sintácticos
    const [isLexicalComplete, setLexicalComplete] = useState(false); // Estado del léxico
    const [syntaxTree, setSyntaxTree] = useState(null);
    const [isSemanticAnalysisEnabled, setSemanticAnalysisEnabled] = useState(false); // Estado del análisis semántico
    const [resultado, setResultado] = useState(''); // Mensaje para la consola de resultado

    const clearErrors = () => {
        setErrors([]);
        setSyntaxErrors([]);
    };

    const handleFileUpload = (fileContent) => {
        setCode(fileContent); // Actualiza el contenido del editor con el contenido del archivo
    };

    {/* Modal */}
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLexicalAnalysis = () => {
        try {
            // Ejecuta la función de análisis léxico con el código actual
            const { tokens: analyzedTokens, errors: analyzedErrors } = analyzeLexical(code);
    
            // Actualiza los estados con los resultados
            setTokens(analyzedTokens); // Actualiza la lista de tokens
            setErrors(analyzedErrors); // Actualiza la lista de errores
    
            // Verifica si hay errores
            if (analyzedErrors.length === 0) {
                setResultado('Análisis Léxico Completado: No se encontraron errores.'); // Mensaje en la consola
                setLexicalComplete(true); // Habilita el botón de análisis sintáctico
            } else {
                setResultado('Análisis Léxico Completado: Se encontraron errores.'); // Mensaje en la consola
                setLexicalComplete(false); // Deshabilita el botón de análisis sintáctico
            }
        } catch (error) {
            // Manejo de errores inesperados en el análisis
            setErrors([{ error: error.message, line: '-', column: '-' }]); // Error genérico
            setResultado('Error al ejecutar el análisis léxico.'); // Mensaje en la consola
            setLexicalComplete(false); // Asegura que el flujo no continúe
        }
    };
    
    const handleSyntaxAnalysis = () => {
        try {
            // Ejecutar el análisis sintáctico
            const { success, syntaxTree, errors: syntaxErrors } = analyzeSyntax(code);
    
            if (success) {
                setResultado("Análisis Sintáctico Completado: No se encontraron errores.");
                setSyntaxTree(syntaxTree); // Guarda el árbol de derivación
                setSemanticAnalysisEnabled(true); // Habilitar análisis semántico
                setSyntaxErrors([]); // Limpiar errores sintácticos
            } else {
                setResultado("Análisis Sintáctico Completado: Se encontraron errores.");
                setSyntaxErrors(syntaxErrors); // Mostrar los errores sintácticos
                setSemanticAnalysisEnabled(false); // Deshabilitar análisis semántico
            }
        } catch (error) {
            // Manejo de errores inesperados
            setResultado("Error al ejecutar el análisis sintáctico.");
            setSyntaxErrors([
                {
                    error: error.message || "Error desconocido",
                    line: "-",
                    column: "-",
                },
            ]);
            setSemanticAnalysisEnabled(false);
        }
    };
    

    // Análisis sintáctico
    const handleSyntaxAnalysis1 = () => {
        try {
            // Ejecutar el análisis sintáctico
            //parser.parse(code);

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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#3f555d', color: '#fff' }}>            
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#2c4343', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                <div style={{ backgroundColor: '#8bb3bf', padding: '10px', display: 'inline-block', borderRadius: '8px' }}>
                    <img src="/logo-tec.png" alt="logo tecnm en Celaya" width="200" />
                </div>    

                <div>
                {/* El botón para subir archivos */}
                    <FileUploadButton onFileUpload={handleFileUpload} />
                </div>            
                <div>

                    <AnalysisButtons
                        handleLexicalAnalysis={handleLexicalAnalysis}
                        handleSyntaxAnalysis={handleSyntaxAnalysis}
                        handleSemanticAnalysis={() => {}}
                        handleOpenModal={handleOpenModal}
                        isLexicalComplete={isLexicalComplete}
                        isSyntaxComplete={isSemanticAnalysisEnabled}
                    />
                </div>

                <img src='/logo-tec2.png' alt='logo tecnm en celaya' width='100' />
            </header>

            <TeamModal isOpen={isModalOpen} onClose={handleCloseModal} />
            {/* Main Content */}
            <Grid container spacing={3} sx={{ flex: 1 }}>
                    {/* Editor */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ padding: 2 }}>
                        <CodeEditor code={code} setCode={setCode} />
                    </Box>
                </Grid>
                <TokenTable tokens={tokens} />
            </Grid>
            <Footer
                resultado={resultado} // Mensaje general del resultado
                errors={[...errors, ...syntaxErrors]} // Combina errores léxicos y sintácticos
                clearErrors={clearErrors} // Función para limpiar los errores
            />
       
            </div>
    );
};

export default App;
