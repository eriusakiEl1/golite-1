import moo from "moo";

export function analyzeLexical(code) {
    // Definir las reglas del analizador léxico
    const lexer = moo.compile({
        keyword: ['var', 'int', 'float', 'string', 'bool', 'func', 'if', 'else', 'for', 'print', 'main'],
        boolean: ['true', 'false'], // Valores booleanos específicos
        identifier: {
            match: /[a-zA-Z_][a-zA-Z0-9_]*/, // Identificadores válidos
            type: moo.keywords({ keyword: ['var', 'int', 'float', 'string', 'bool', 'func', 'if', 'else', 'for', 'print', 'main'] }),
        },
        number: {
            match: /\d+(?:\.\d+)?/, // Enteros y números reales
            type: (value) => (value.includes('.') ? 'Número Real' : 'Número'),
        },
        assign: '=', // Operador de asignación
        punctuation: [':', '{', '}', '(', ')', ';'], // Delimitadores y separadores
        operator: ['<', '>', '+', '-', '*', '/'], // Operadores aritméticos y de comparación
        string: {
            match: /"(?:\\["\\]|[^\n"\\])*"/,
            lineBreaks: true, // Cadenas válidas
        },
        unterminatedString: {
            match: /"(?:\\["\\]|[^\n"\\])*/, // Detectar cadenas sin cierre
            lineBreaks: true,
            error: true,
        },
        whitespace: { match: /\s+/, lineBreaks: true }, // Espacios y saltos de línea
        invalid: /[^a-zA-Z0-9_:{}()"=;<>+\-*/\s]/, // Caracteres no válidos
    });

    lexer.reset(code);

    const tokens = [];
    const errors = [];

    let token;
    while ((token = lexer.next())) {
        if (token.type === 'whitespace') {
            // Ignorar espacios en blanco
            continue;
        } else if (token.type === 'invalid') {
            // Reportar caracteres no válidos
            errors.push({
                error: `Caracter no válido "${token.value}"`,
                line: token.line,
                column: token.col,
            });
        } else if (token.type === 'unterminatedString') {
            // Reportar cadenas sin cierre
            errors.push({
                error: `Incorrecto cierre de cadena`,
                line: token.line,
                column: token.col,
            });
        } else {
            // Agregar tokens válidos
            tokens.push({
                type: token.type === 'keyword' ? 'Palabra Clave' : token.type,
                lexeme: token.value,
                line: token.line,
                column: token.col,
            });
        }
    }

    return { tokens, errors };
}
