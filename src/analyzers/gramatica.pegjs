// Inicio de la gramática

start
  = _ statement*

// Declaraciones
statement
  = variableDeclaration
  / functionDeclaration
  / assignment
  / block

variableDeclaration
  = "var" _ id:identifier _ ":" _ dt:type {
      return { type: "VariableDeclaration", name: id, dataType: dt };
    }

functionDeclaration
  = "func" _ id:identifier _ "(" params:parameterList? ")" _ b:block {
      return { type: "FunctionDeclaration", name: id, parameters: params || [], body: b };
    }

assignment
  = id:identifier _ "=" _ val:value {
      return { type: "Assignment", variable: id, value: val };
    }

// Bloques y listas
block
  = "{" _ statements:statement* _ "}" {
      return { type: "Block", statements };
    }

parameterList
  = first:parameter rest:(_ "," _ parameter)* {
      return [first].concat(rest.map(r => r[3])); // Extraer solo el último elemento de cada sub-array
    }

parameter
  = id:identifier _ ":" _ dt:type {
      return { name: id, dataType: dt };
    }

// Tipos de datos
type
  = "int" { return "int"; }
  / "float" { return "float"; }
  / "string" { return "string"; }
  / "bool" { return "bool"; }

// Valores
value
  = number
  / string
  / boolean

number
  = [0-9]+ ("." [0-9]+)? {
      return parseFloat(text());
    }

string
  = "\"" [^\"]* "\"" {
      return text().slice(1, -1);
    }

boolean
  = "true" { return true; }
  / "false" { return false; }

// Identificadores
identifier
  = [a-zA-Z_][a-zA-Z0-9_]* {
      return text();
    }

// Espacios en blanco
_ "whitespace"
  = [ \t\n\r]*
