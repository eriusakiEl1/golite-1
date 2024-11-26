import React from 'react';

const TokenTable = ({ tokens }) => {
    return (
        <div>
            <h3>Tabla de Tokens</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Componente Léxico</th>
                    <th>Lexema</th>
                    <th>Línea</th>
                    <th>Columna</th>
                </tr>
                </thead>
                <tbody>
                {tokens.map((token, index) => (
                    <tr key={index}>
                        <td>{token.type}</td>
                        <td>{token.lexeme}</td>
                        <td>{token.line}</td>
                        <td>{token.column}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TokenTable;
