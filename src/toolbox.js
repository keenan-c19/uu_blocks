import * as Blockly from 'blockly';

export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
      // Creating the logic category and including the following blocks
    {
      'kind': 'category',
      'name': 'Logic',
      'categorystyle': 'logic_category',
      'contents':  [
        {
          'kind': 'block',
          'type': 'controls_if',
        },
        {
          'kind': 'block',
          'type': 'logic_compare',
        },
        {
          'kind': 'block',
          'type': 'logic_operation',
        },
        {
          'kind': 'block',
          'type': 'logic_negate',
        },
        {
          'kind': 'block',
          'type': 'logic_boolean',
        },
        {
          'kind': 'block',
          'type': 'logic_null',
        },
        {
          'kind': 'block',
          'type': 'logic_ternary',
        },
      ]
    },
      // Creating the Loop Category and including the following blocks
    {
      'kind': 'category',
      'name': 'Loops',
      'categorystyle': 'loop_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'controls_repeat_ext',
          'inputs': {
            'TIMES': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 10,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'controls_whileUntil',
        },
        {
          'kind': 'block',
          'type': 'controls_for',
          'inputs': {
            'FROM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'TO': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 10,
                },
              },
            },
            'BY': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'controls_forEach',
        },
        {
          'kind': 'block',
          'type': 'controls_flow_statements',
        },
      ],
    },
      // Creating Math category and including the following the blocks
    {
      'kind': 'category',
      'name': 'Math',
      'categorystyle': 'math_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'math_number',
          'fields': {
            'NUM': 123,
          },
        },
        {
          'kind': 'block',
          'type': 'math_arithmetic',
          'inputs': {
            'A': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'B': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
          },
        },
      ],
    },
    // Creating Bitwise Category and including custom blocks
    {
      'kind': 'category',
      'name': 'Bitwiseass',
      'colour': 180,
      'contents': [
        {
          'kind': 'block',
          'type': 'bitwise_arithmetic'
        },
      ]
    },
      // Creating Time Category and including custom blocks
    {
      'kind': 'category',
      'name': 'Time',
      'colour': 200,
      'contents': [
        {
          "kind": "block",
          "type": "delay_ms"
        }
      ]
    },
    {
      'kind': 'category',
      'name': 'Port',
      'colour': 260,
      'contents': [
        {
          "kind": "block",
          "type": "port_cfg",
        }
      ]
    },
      // Creating Register Category and including custom blocks
    {
      'kind': 'category',
      'name': 'Register',
      'colour': 10,
      'contents': [
        {
          "kind": "block",
          "type": "dir_cfg"
        },
        {
          "kind": "block",
          "type": "drive_strength"
        },
        {
          "kind": "block",
          "type": "den_cfg"
        },
        {
          "kind": "block",
          "type": "resistor_cfg"
        },
      ]
    },
      // Separating above category
    {
      'kind': 'sep',
    },
      // Creating Variable category and including the following blocks
    {
      'kind': 'category',
      'name': 'Variables',
      'categorystyle': 'variable_category',
      'custom': 'VARIABLE',
    },
      // Creating Function category and including the following blocks
    {
      'kind': 'category',
      'name': 'Functions',
      'categorystyle': 'procedure_category',
      'custom': 'PROCEDURE',
    },
  ]
}
