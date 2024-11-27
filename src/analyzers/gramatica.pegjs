start
  = _ stmts:statements* _ {
      return stmts;
    }

statements
  = statement _ ";" _

statement
  = variableDeclaration
  / functionDeclaration
  / assignment
  / conditional
  / loop
  / block

variableDeclaration
  = "var" _ id:identifier _ ":" _ type:dataType {
      return { type: "VariableDeclaration", name: id, dataType: type };
    }

functionDeclaration
  = "func" _ id:identifier _ "(" params:parameterList? ")" _ functionBody:block {
      return { type: "FunctionDeclaration", name: id, parameters: params || [], body: functionBody };
    }

assignment
  = id:identifier _ "=" _ value:expression {
      return { type: "Assignment", variable: id, value: value };
    }

// Conditionals
conditional
  = "if" _ "("? _ condition:expression _ ")"? _ thenBlock:block elsePart:("else" _ elseBlock:block)? {
      return {
        type: "IfStatement",
        condition: condition,
        thenBlock: thenBlock,
        elseBlock: elsePart ? elsePart[1] : null
      };
    }

// Loops
loop
  = "for" _ init:assignment? ";" _ condition:expression? ";" _ update:assignment? _ loopBody:block {
      return { type: "ForLoop", init: init || null, condition: condition || null, update: update || null, body: loopBody };
    }
  / "for" _ condition:expression _ loopBody:block {
      return { type: "WhileLoop", condition: condition, body: loopBody };
    }
  / "for" _ loopBody:block {
      return { type: "InfiniteLoop", body: loopBody };
    }

// Blocks and Lists
block
  = "{" _ stmts:statements* _ "}" {
      return { type: "Block", statements: stmts };
    }

parameterList
  = first:param rest:(_ "," _ param)* {
      return [first].concat(rest.map(r => r[3]));
    }

param
  = id:identifier _ ":" _ type:dataType {
      return { name: id, dataType: type };
    }

dataType
  = "int" { return "int"; }
  / "float" { return "float"; }
  / "string" { return "string"; }
  / "bool" { return "bool"; }

// Expressions
expression
  = comparison additive*

additive
  = _ op:("+" / "-") _ right:comparison {
      return { type: "AdditionOrSubtraction", operator: op, right: right };
    }

comparison
  = left:term comp:comparisonOperator right:term {
      return { type: "Comparison", operator: comp, left: left, right: right };
    }
  / term

term
  = factor multiplicative*

multiplicative
  = _ op:("*" / "/") _ right:factor {
      return { type: "MultiplicationOrDivision", operator: op, right: right };
    }

factor
  = number
  / string
  / boolean
  / identifier
  / "(" _ expression _ ")"

comparisonOperator
  = "==" / "!=" / "<=" / ">=" / "<" / ">"

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

// Whitespace
_ "whitespace"
  = [ \t\n\r]* {
      return null;
    }
