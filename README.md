# EasyPass

A secure and lightweight password and passphrase generator built with **Tauri**, **Angular**, and **Rust**.

## Features

- 🔐 **Password Generator** - Create strong passwords with customizable options:
  - Adjustable length (6-32 characters)
  - Lowercase letters (a-z)
  - Uppercase letters (A-Z)
  - Numbers (0-9)
  - Symbols (!@#$%&()+...)
  - Custom characters
  - User provided entropy
  - Security level indicator

- 📝 **Passphrase Generator** - Generate memorable yet secure passphrases (WIP)

- 🌍 **Multi-language Support** - Available in English and Spanish

- 📋 **One-click Copy** - Easily copy generated passwords to clipboard

- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

- 💻 **Cross-platform** - Works on Windows, macOS, and Linux

## Requirements

### Development

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

### Build Dependencies

- **UPX** (Ultimate Packer for eXecutables) - Required for binary compression
  - Windows: Download from [UPX releases](https://github.com/upx/upx/releases) and add to PATH
  - macOS: `brew install upx`
  - Linux: `sudo apt install upx` or `sudo pacman -S upx`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/juanpardos/easypass.git
   cd easypass
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Tauri CLI (if not already installed):
   ```bash
   cargo install tauri-cli
   ```

## Development

Run the application in development mode:

```bash
npm run tauri dev
```

## Building

Build the application for production:

```bash
npm run tauri build
```

The compiled binary will be available in `src-tauri/target/release/`.

> **Note:** Ensure UPX is installed and available in your PATH for optimal binary compression.

## Project Structure

```
easypass/
├── src/                         # Angular frontend
│   ├── app/
│   │   ├── features/            # Feature components
│   │   │   ├── home/            # Home page
│   │   │   ├── password/        # Password generator
│   │   │   └── passphrase/      # Passphrase generator
│   │   ├── layout/              # Layout components (footer)
│   │   ├── utils/               # Utilities (i18n service)
│   │   └── types/               # TypeScript types
│   └── assets/
│       └── i18n/                # Translation files
├── src-tauri/                   # Rust backend
│   ├── src/
│   │   ├── service/             # Core services
│   │   ├── types/               # Rust types
│   │   ├── utils/               # Utility functions  
│   │   ├── main.rs              # Entry point
│   │   └── lib.rs               # Tauri commands
│   └── Cargo.toml               # Rust dependencies
└── package.json                 # Node.js dependencies
```

## Tech Stack

- **Frontend:** Angular 20, Tailwind CSS
- **Backend:** Rust, Tauri
- **i18n:** ngx-translate
- **Build:** Cargo

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**Juan Pardos** - [GitHub](https://github.com/juanpardos)

---

⭐ Star this repository if you find it useful!