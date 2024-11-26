// Inicio de la gramática

start
  = statement*

// Declaraciones
statement
  = variableDeclaration
  / functionDeclaration
  / assignment

variableDeclaration
  = "var" _ id:identifier _ ":" _ dt:type _ {
      return { type: "VariableDeclaration", name: id, dataType: dt };
    }

functionDeclaration
  = "func" _ id:identifier _ "(" params:parameterList? ")" _ block {
      return { type: "FunctionDeclaration", name: id, parameters: params || [] };
    }

assignment
  = id:identifier _ "=" _ val:value _ {
      return { type: "Assignment", variable: id, value: val };
    }

// Bloques y listas
block
  = "{" _ statement* _ "}"

parameterList
  = parameter (_ "," _ parameter)*

parameter
  = id:identifier _ ":" _ dt:type

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
  = [0-9]+ ("." [0-9]+)? { return parseFloat(text()); }

string
  = "\"" [^\"]* "\"" { return text().slice(1, -1); }

boolean
  = "true" { return true; }
  / "false" { return false; }

// Identificadores
identifier
  = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }

// Espacios en blanco
_ "whitespace"
  = [ \t\n\r]*
