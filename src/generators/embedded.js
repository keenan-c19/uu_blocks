import * as Blockly from 'blockly';

export const embeddedGenerator = new Blockly.Generator('Embedded');

embeddedGenerator.ORDER_ATOMIC = 0;             // 0 "" ...
embeddedGenerator.ORDER_UNARY_POSTFIX = 1;      // expr++ expr-- () [] .
embeddedGenerator.ORDER_UNARY_PREFIX = 2;       // -expr !expr ~expr ++expr --expr
embeddedGenerator.ORDER_MULTIPLICATIVE = 3;     // * / % ~/
embeddedGenerator.ORDER_ADDITIVE = 4;           // + -
embeddedGenerator.ORDER_SHIFT = 5;              // << >>
embeddedGenerator.ORDER_RELATIONAL = 6;         // >= > <= <
embeddedGenerator.ORDER_EQUALITY = 7;           // == != === !==
embeddedGenerator.ORDER_BITWISE_AND = 8;        // &
embeddedGenerator.ORDER_BITWISE_XOR = 9;        // ^
embeddedGenerator.ORDER_BITWISE_OR = 10;        // |
embeddedGenerator.ORDER_LOGICAL_AND = 11;       // &&
embeddedGenerator.ORDER_LOGICAL_OR = 12;        // ||
embeddedGenerator.ORDER_CONDITIONAL = 13;       // expr ? expr : expr
embeddedGenerator.ORDER_ASSIGNMENT = 14;        // = *= /= ~/= %= += -= <<= >>= &= ^= |=
embeddedGenerator.ORDER_COMMA = 15;             // ,
embeddedGenerator.ORDER_UNARY_NEGATION = 16;
embeddedGenerator.ORDER_MEMBER = 17;
embeddedGenerator.ORDER_NONE = 99;              // (...)

embeddedGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + '\n' + embeddedGenerator.blockToCode(nextBlock);
    }
    return code;
};

embeddedGenerator['controls_if'] = function(block) {
    // If/elseif/else condition.
    let n = 0;
    let code = '';
    if (embeddedGenerator.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += embeddedGenerator.injectId(embeddedGenerator.STATEMENT_PREFIX, block);
    }
    do {
        const conditionCode =
            embeddedGenerator.valueToCode(block, 'IF' + n, embeddedGenerator.ORDER_NONE) ||
            'false';
        let branchCode = embeddedGenerator.statementToCode(block, 'DO' + n);
        if (embeddedGenerator.STATEMENT_SUFFIX) {
            branchCode = embeddedGenerator.prefixLines(
                    embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block),
                    embeddedGenerator.INDENT) +
                branchCode;
        }
        code += (n > 0 ? ' else ' : '') + 'if (' + conditionCode + ') \n{\n' +
            branchCode + '\n}';
        n++;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE') || embeddedGenerator.STATEMENT_SUFFIX) {
        let branchCode = embeddedGenerator.statementToCode(block, 'ELSE');
        if (embeddedGenerator.STATEMENT_SUFFIX) {
            branchCode = embeddedGenerator.prefixLines(
                    embeddedGenerator.injectId(embeddedGenerator.STATEMENT_SUFFIX, block),
                    embeddedGenerator.INDENT) +
                branchCode;
        }
        code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};

embeddedGenerator['controls_ifelse'] = embeddedGenerator['controls_if'];

embeddedGenerator['logic_compare'] = function(block) {
    // Comparison operator.
    const OPERATORS =
        {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='};
    const operator = OPERATORS[block.getFieldValue('OP')];
    const order = (operator === '==' || operator === '!=') ?
        embeddedGenerator.ORDER_EQUALITY :
        embeddedGenerator.ORDER_RELATIONAL;
    const argument0 = embeddedGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = embeddedGenerator.valueToCode(block, 'B', order) || '0';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

embeddedGenerator['logic_operation'] = function(block) {
    // Operations 'and', 'or'.
    const operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
    const order = (operator === '&&') ? embeddedGenerator.ORDER_LOGICAL_AND :
        embeddedGenerator.ORDER_LOGICAL_OR;
    let argument0 = embeddedGenerator.valueToCode(block, 'A', order);
    let argument1 = embeddedGenerator.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        const defaultArgument = (operator === '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

embeddedGenerator['logic_negate'] = function(block) {
    // Negation.
    const order = embeddedGenerator.ORDER_LOGICAL_NOT;
    const argument0 = embeddedGenerator.valueToCode(block, 'BOOL', order) || 'true';
    const code = '!' + argument0;
    return [code, order];
};

embeddedGenerator['logic_boolean'] = function(block) {
    // Boolean values true and false.
    const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
    return [code, embeddedGenerator.ORDER_ATOMIC];
};

embeddedGenerator['logic_null'] = function(block) {
    // Null data type.
    return ['null', embeddedGenerator.ORDER_ATOMIC];
};

embeddedGenerator['logic_ternary'] = function(block) {
    // Ternary operator.
    const value_if =
        embeddedGenerator.valueToCode(block, 'IF', embeddedGenerator.ORDER_CONDITIONAL) ||
        'false';
    const value_then =
        embeddedGenerator.valueToCode(block, 'THEN', embeddedGenerator.ORDER_CONDITIONAL) ||
        'null';
    const value_else =
        embeddedGenerator.valueToCode(block, 'ELSE', embeddedGenerator.ORDER_CONDITIONAL) ||
        'null';
    const code = value_if + ' ? ' + value_then + ' : ' + value_else;
    return [code, embeddedGenerator.ORDER_CONDITIONAL];
};


embeddedGenerator['delay_ms'] = function(block) {
    return 'my code string';
}

embeddedGenerator['delay_ms'] = function(block) {
    // Assigning field number to variable
    let number_milliseconds = block.getFieldValue('MILLISECONDS');
    // Outputting pre-defined string plus user input
    const code = `delay(${number_milliseconds});`;
    return code;
};

embeddedGenerator['port_cfg'] = function(block) {
    const port = {
        'PORT_A': '0x01',
        'PORT_B': '0x02',
        'PORT_C': '0x04',
        'PORT_D': '0x08',
        'PORT_E': '0x10',
        'PORT_F': '0x20'
    };
    // Assembling block
    const code = `SYSCTL->RCGCGPIO |= ${port[block.getFieldValue("PORT")]};`;
    return code;
};

embeddedGenerator['pin_cfg'] = function(block) {
    const port = {
        'PORT_A': '0x01',
        'PORT_B': '0x02',
        'PORT_C': '0x04',
        'PORT_D': '0x08',
        'PORT_E': '0x10',
        'PORT_F': '0x20'
    };
    // Assembling block
    const code = `SYSCTL->RCGCGPIO |= ${port[block.getFieldValue("PORT")]};`;
    return code;
};

embeddedGenerator['dir_cfg'] = function(block) {
    const port = {
        'PORT_A': 'A',
        'PORT_B': 'B',
        'PORT_C': 'C',
        'PORT_D': 'D',
        'PORT_E': 'E',
        'PORT_F': 'F'
    };
    const pin = {
        'PIN_0': '0x01',
        'PIN_1': '0x02',
        'PIN_2': '0x04',
        'PIN_3': '0x08',
        'PIN_4': '0x10',
        'PIN_5': '0x20',
        'PIN_6': '0x40',
        'PIN_7': '0x80'
    };
    const dir = {
        'INPUT': '|= ',
        'OUTPUT': '&= ~'
    }
    const code = `GPIO${port[block.getFieldValue('PORT')]}->DIR ${dir[block.getFieldValue('DIR')]}${pin[block.getFieldValue('PIN')]};`
    return code;
};

embeddedGenerator['math_number'] = function(block) {
    // Numeric value.
    const code = Number(block.getFieldValue('NUM'));
    const order = code >= 0 ? embeddedGenerator.ORDER_ATOMIC :
        embeddedGenerator.ORDER_ADDITIVE;
    return [code, order];
};

embeddedGenerator['math_arithmetic'] = function (block) {
    // Basic arithmetic operators, and power.
    const OPERATORS = {
        'ADD': [' + ', embeddedGenerator.ORDER_ADDITIVE],
        'MINUS': [' - ', embeddedGenerator.ORDER_ADDITIVE],
        'MULTIPLY': [' * ', embeddedGenerator.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', embeddedGenerator.ORDER_MULTIPLICATIVE],
        'POWER': [null, embeddedGenerator.ORDER_NONE],  // Handle power separately.
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = embeddedGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = embeddedGenerator.valueToCode(block, 'B', order) || '0';
    let code;
    // Power in embeddedGenerator requires a special case since it has no operator.
    if (!operator) {
        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
        return [code, embeddedGenerator.ORDER_FUNCTION_CALL];
    }
    code = argument0 + operator + argument1;
    return [code, order];
};

embeddedGenerator['variables_get'] = function(block) {
    // Variable getter.
    const code = embeddedGenerator.nameDB_.getName(block.getFieldValue('VAR'),
        NameType.VARIABLE);
    return [code, embeddedGenerator.ORDER_ATOMIC];
};

embeddedGenerator['variables_set'] = function(block) {
    // Variable setter.
    const argument0 = embeddedGenerator.valueToCode(
        block, 'VALUE', embeddedGenerator.ORDER_ASSIGNMENT) || '0';
    const varName = embeddedGenerator.nameDB_.getName(
        block.getFieldValue('VAR'), NameType.VARIABLE);
    return varName + ' = ' + argument0 + ';\n';
};

embeddedGenerator['drive_strength'] = function(block) {
    const port = {
        'PORT_A': 'A',
        'PORT_B': 'B',
        'PORT_C': 'C',
        'PORT_D': 'D',
        'PORT_E': 'E',
        'PORT_F': 'F'
    };
    const pin = {
        'PIN_0': '0x01',
        'PIN_1': '0x02',
        'PIN_2': '0x04',
        'PIN_3': '0x08',
        'PIN_4': '0x10',
        'PIN_5': '0x20',
        'PIN_6': '0x40',
        'PIN_7': '0x80'
    };

    const mamps = {
        '2_MA': '2',
        '4_MA': '4',
        '8_MA': '8'
    }

    // TODO: Assemble JavaScript into code variable.
    const code = `GPIO${port[block.getFieldValue('PORT')]}->DR${mamps[block.getFieldValue('MA')]}R |= ${pin[block.getFieldValue('PIN')]}`;
    return code;
};

embeddedGenerator['den_cfg'] = function(block) {
    const port = {
        'PORT_A': 'A',
        'PORT_B': 'B',
        'PORT_C': 'C',
        'PORT_D': 'D',
        'PORT_E': 'E',
        'PORT_F': 'F'
    };
    const pin = {
        'PIN_0': '0x01',
        'PIN_1': '0x02',
        'PIN_2': '0x04',
        'PIN_3': '0x08',
        'PIN_4': '0x10',
        'PIN_5': '0x20',
        'PIN_6': '0x40',
        'PIN_7': '0x80'
    };
    const den = {
        'INPUT': '|= ',
        'OUTPUT': '&= ~'
    }
    const code = `GPIO${port[block.getFieldValue('PORT')]}->DEN ${den[block.getFieldValue('DEN')]}${pin[block.getFieldValue('PIN')]};`
    return code;
};

embeddedGenerator['resistor_cfg'] = function(block) {
    const dropdown_ma = block.getFieldValue('MA');
    const port = {
        'PORT_A': 'A',
        'PORT_B': 'B',
        'PORT_C': 'C',
        'PORT_D': 'D',
        'PORT_E': 'E',
        'PORT_F': 'F'
    };
    const pin = {
        'PIN_0': '0x01',
        'PIN_1': '0x02',
        'PIN_2': '0x04',
        'PIN_3': '0x08',
        'PIN_4': '0x10',
        'PIN_5': '0x20',
        'PIN_6': '0x40',
        'PIN_7': '0x80'
    };

    const resistance = {
        'PUR': 'PUR',
        'PDR': 'PDR',
        'ODR': 'ODR'
    }

    // TODO: Assemble JavaScript into code variable.
    const code = `GPIO${port[block.getFieldValue('PORT')]}->${resistance[block.getFieldValue('OHMS')]} |= ${pin[block.getFieldValue('PIN')]}`;
    return code;
};

embeddedGenerator['bitwise_arithmetic'] = function (block) {
    // Bitwise Operators
    const OPERATORS = {
        'AND': [' & ', embeddedGenerator.ORDER_BITWISE_AND],
        'OR': [' | ', embeddedGenerator.ORDER_BITWISE_OR],
        'XOR': [' ^ ', embeddedGenerator.ORDER_BITWISE_XOR],
        'COMPLEMENT': [' ~ ', embeddedGenerator.ORDER_BITWISE_AND],
        'SLEFT': ['<<', embeddedGenerator.ORDER_SHIFT],
        'SRIGHT': ['>>', embeddedGenerator.ORDER_SHIFT],
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = embeddedGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = embeddedGenerator.valueToCode(block, 'B', order) || '0';
    let code;
    // Power in embeddedGenerator requires a special case since it has no operator.
    if (!operator) {
        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
        return [code, embeddedGenerator.ORDER_FUNCTION_CALL];
    }
    code = argument0 + operator + argument1;
    return [code, order];
};
