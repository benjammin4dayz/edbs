# Elite Dangerous Binding Switcher

EDBS is a simple utility written in JavaScript that facilitates the process of switching between different bindings in Elite Dangerous.

## Features

- **Cross-Platform**: This _should_ work on Linux. I'll assume it does until someone reports otherwise.
- **Templates**: Save your `.binds` files from [EDRefCard](https://edrefcard.info/) as an `.edbs` template and reference them later.
- **Easy Switching**: Run the program, pick a number, and fly!
- **Lightweight and Portable**: No dependencies or installation required.

## Usage

1.  Get a `.binds` file from https://edrefcard.info/

2.  Rename the file to `anything you want_but-it-MUST end-with.edbs`

    - Note the file extension `.edbs`- this is important!

3.  Place the `.edbs` file(s) inside the `bindings/` folder next to the EDBS executable

        - Elite Dangerous Binding Switcher
          - bindings/
            - Mouse and Keyboard.edbs
            - Gamepad.edbs
            - Joystick.edbs
          - edbs.exe
          - README.md

4.  Run the executable and select your bindings

5.  Launch Elite Dangerous and Fly Safe!

## Troubleshooting

#### My selection list says [N/A]

- No `.edbs` files were found.
  - Ensure that the files exist within the `bindings/` folder
  - Confirm that the extension of each file is `.edbs`

## P.S. to Linux Users

I don't know if this works, but I tried. Good luck!
