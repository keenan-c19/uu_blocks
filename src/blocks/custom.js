import * as Blockly from 'blockly';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    // Creating delay block that allows which allows users to input a number from 0 to infinity
    // Using a dummy input which does not allow block connections
    {
        "type": "delay_ms",
        "message0": "delay in milliseconds %1",
        "args0": [
            {
                "type": "field_number",
                "name": "MILLISECONDS",
                "value": 0,
                "min": 0
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    // Creating a Port initialization block that allows users to enable ports A to B through RCGPIO Register found in
    // TM4C123GH6PM header file
    // Using a dummy input
    {
        "type": "port_cfg",
        "message0": "enable port %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PORT",
                "options": [
                    [
                        "A",
                        "PORT_A"
                    ],
                    [
                        "B",
                        "PORT_B"
                    ],
                    [
                        "C",
                        "PORT_C"
                    ],
                    [
                        "D",
                        "PORT_D"
                    ],
                    [
                        "E",
                        "PORT_E"
                    ],
                    [
                        "F",
                        "PORT_F"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    // Creating Pin direction Block which allows users to set the direction of a pin to either input or output
    // Using dummy block since we only want user external values
    {
        "type": "dir_cfg",
        "message0": "port %1 pin %2 direction %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PORT",
                "options": [
                    [
                        "A",
                        "PORT_A"
                    ],
                    [
                        "B",
                        "PORT_B"
                    ],
                    [
                        "C",
                        "PORT_C"
                    ],
                    [
                        "D",
                        "PORT_D"
                    ],
                    [
                        "E",
                        "PORT_E"
                    ],
                    [
                        "F",
                        "PORT_F"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "0",
                        "PIN_0"
                    ],
                    [
                        "1",
                        "PIN_1"
                    ],
                    [
                        "2",
                        "PIN_2"
                    ],
                    [
                        "3",
                        "PIN_3"
                    ],
                    [
                        "4",
                        "PIN_4"
                    ],
                    [
                        "5",
                        "PIN_5"
                    ],
                    [
                        "6",
                        "PIN_6"
                    ],
                    [
                        "7",
                        "PIN_7"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "DIR",
                "options": [
                    [
                        "input",
                        "INPUT"
                    ],
                    [
                        "output",
                        "OUTPUT"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        'type': 'math_number_property',
        'message0': '%1 %2',
        'args0': [
            {
                'type': 'input_value',
                'name': 'NUMBER_TO_CHECK',
                'check': 'Number',
            },
            {
                'type': 'field_dropdown',
                'name': 'PROPERTY',
                'options': [
                    ['%{BKY_MATH_IS_EVEN}', 'EVEN'],
                    ['%{BKY_MATH_IS_ODD}', 'ODD'],
                    ['%{BKY_MATH_IS_WHOLE}', 'WHOLE'],
                    ['%{BKY_MATH_IS_POSITIVE}', 'POSITIVE'],
                    ['%{BKY_MATH_IS_NEGATIVE}', 'NEGATIVE'],
                    ['%{BKY_MATH_IS_DIVISIBLE_BY}', 'DIVISIBLE_BY'],
                ],
            },
        ],
        'inputsInline': true,
        'output': 'Boolean',
        'style': 'math_blocks',
        'tooltip': '%{BKY_MATH_IS_TOOLTIP}',
        'mutator': 'math_is_divisibleby_mutator',
    },
    {
        "type": "drive_strength",
        "message0": "port %1 pin %2 drive strength %3 mA",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PORT",
                "options": [
                    [
                        "A",
                        "PORT_A"
                    ],
                    [
                        "B",
                        "PORT_B"
                    ],
                    [
                        "C",
                        "PORT_C"
                    ],
                    [
                        "D",
                        "PORT_D"
                    ],
                    [
                        "E",
                        "PORT_E"
                    ],
                    [
                        "F",
                        "PORT_F"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "0",
                        "PIN_0"
                    ],
                    [
                        "1",
                        "PIN_1"
                    ],
                    [
                        "2",
                        "PIN_2"
                    ],
                    [
                        "3",
                        "PIN_3"
                    ],
                    [
                        "4",
                        "PIN_4"
                    ],
                    [
                        "5",
                        "PIN_5"
                    ],
                    [
                        "6",
                        "PIN_6"
                    ],
                    [
                        "7",
                        "PIN_7"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "MA",
                "options": [
                    [
                        "2",
                        "2_MA"
                    ],
                    [
                        "4",
                        "4_MA"
                    ],
                    [
                        "8",
                        "8_MA"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "den_cfg",
        "message0": "port %1 pin %2 digital %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PORT",
                "options": [
                    [
                        "A",
                        "PORT_A"
                    ],
                    [
                        "B",
                        "PORT_B"
                    ],
                    [
                        "C",
                        "PORT_C"
                    ],
                    [
                        "D",
                        "PORT_D"
                    ],
                    [
                        "E",
                        "PORT_E"
                    ],
                    [
                        "F",
                        "PORT_F"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "0",
                        "PIN_0"
                    ],
                    [
                        "1",
                        "PIN_1"
                    ],
                    [
                        "2",
                        "PIN_2"
                    ],
                    [
                        "3",
                        "PIN_3"
                    ],
                    [
                        "4",
                        "PIN_4"
                    ],
                    [
                        "5",
                        "PIN_5"
                    ],
                    [
                        "6",
                        "PIN_6"
                    ],
                    [
                        "7",
                        "PIN_7"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "DEN",
                "options": [
                    [
                        "input",
                        "INPUT"
                    ],
                    [
                        "output",
                        "OUTPUT"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "resistor_cfg",
        "message0": "port %1 pin %2 resistor %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PORT",
                "options": [
                    [
                        "A",
                        "PORT_A"
                    ],
                    [
                        "B",
                        "PORT_B"
                    ],
                    [
                        "C",
                        "PORT_C"
                    ],
                    [
                        "D",
                        "PORT_D"
                    ],
                    [
                        "E",
                        "PORT_E"
                    ],
                    [
                        "F",
                        "PORT_F"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "0",
                        "PIN_0"
                    ],
                    [
                        "1",
                        "PIN_1"
                    ],
                    [
                        "2",
                        "PIN_2"
                    ],
                    [
                        "3",
                        "PIN_3"
                    ],
                    [
                        "4",
                        "PIN_4"
                    ],
                    [
                        "5",
                        "PIN_5"
                    ],
                    [
                        "6",
                        "PIN_6"
                    ],
                    [
                        "7",
                        "PIN_7"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "OHMS",
                "options": [
                    [
                        "PUR",
                        "PUR"
                    ],
                    [
                        "PDR",
                        "PDR"
                    ],
                    [
                        "ODR",
                        "ODR"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    // Block for basic arithmetic operator.
    {
        'type': 'bitwise_arithmetic',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['&', 'AND'],
                    ['|', 'OR'],
                    ['^', 'XOR'],
                    ['~', 'COMPLEMENT'],
                    ['<<', 'SLEFT'],
                    ['>>', 'SRIGHT'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': 'Number',
        'style': 'math_blocks',
        'helpUrl': '%{BKY_MATH_ARITHMETIC_HELPURL}',
        'extensions': ['math_op_tooltip'],
    },
]);
