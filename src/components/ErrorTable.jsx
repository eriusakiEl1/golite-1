import React from 'react';

const ErrorTable = ({ errors }) => {
    return (
        <div>
            <h3>Errores</h3>
            {errors.length > 0 ? (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>Mensaje de Error</th>
                        <th>Línea</th>
                        <th>Columna</th>
                    </tr>
                    </thead>
                    <tbody>
                    {errors.map((error, index) => (
                        <tr key={index}>
                            <td>{error.error}</td>
                            <td>{error.line}</td>
                            <td>{error.column}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No se encontraron errores</p>
            )}
        </div>
    );
};

export default ErrorTable;
