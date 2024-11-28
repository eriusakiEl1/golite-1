start
  = _ stmts:statements* _ {
      return stmts;
    }

statements
  = statement (";" _)? // Permitir `;` opcional después de cada declaración

statement
  = variableDeclaration
  / assignment
  / conditional
  / loop
  / block

variableDeclaration
  = "var" _ id:identifier _ ":" _ type:dataType {
      return { type: "VariableDeclaration", name: id, dataType: type };
    }

assignment
  = id:identifier _ "=" _ value:expression {
      return { type: "Assignment", variable: id, value: value };
    }

// Condicionales
conditional
  = "if" _ "(" _ condition:comparison _ ")" _ thenBlock:block elsePart:("else" _ elseBlock:block)? {
      return {
        type: "IfStatement",
        condition: condition,
        thenBlock: thenBlock,
        elseBlock: elsePart ? elsePart[1] : null
      };
    }

// Bucles
loop
  = "for" _ init:assignment? ";" _ condition:comparison? ";" _ update:assignment? _ loopBody:block {
      return { type: "ForLoop", init: init || null, condition: condition || null, update: update || null, body: loopBody };
    }
  / "for" _ condition:comparison _ loopBody:block {
      return { type: "WhileLoop", condition: condition, body: loopBody };
    }
  / "for" _ loopBody:block {
      return { type: "InfiniteLoop", body: loopBody };
    }

// Bloques
block
  = "{" _ stmts:statements* _ "}" {
      return { type: "Block", statements: stmts };
    }

dataType
  = "int" { return "int"; }
  / "float" { return "float"; }
  / "string" { return "string"; }
  / "bool" { return "bool"; }

// Comparaciones
comparison
  = left:additive _ op:comparisonOperator _ right:additive {
      return { type: "Comparison", operator: op, left: left, right: right };
    }
  / additive

// Expresiones
expression
  = additive

additive
  = left:term _ op:("+" / "-") _ right:term {
      return { type: "AdditionOrSubtraction", operator: op, left: left, right: right };
    }
  / term

term
  = left:factor _ op:("*" / "/") _ right:factor {
      return { type: "MultiplicationOrDivision", operator: op, left: left, right: right };
    }
  / factor

factor
  = "(" _ expr:expression _ ")" { return expr; }
  / number
  / string
  / boolean
  / identifier

comparisonOperator
  = "==" / "!=" / "<=" / ">=" / "<" / ">"

// Primitivas
number
  = [0-9]+ ("." [0-9]+)? {
      return { type: "Number", value: parseFloat(text()) };
    }

string
  = "\"" chars:[^\"]* "\"" {
      return { type: "String", value: chars.join("") };
    }

boolean
  = "true" { return { type: "Boolean", value: true }; }
  / "false" { return { type: "Boolean", value: false }; }

identifier
  = [a-zA-Z_][a-zA-Z0-9_]* {
      return text();
    }

// Espacios
_ "whitespace"
  = [ \t\n\r]* {
      return null;
    }
