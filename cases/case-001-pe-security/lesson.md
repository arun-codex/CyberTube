# Case 001: Windows PE Security Posture — Auditing Authenticode & Control Flow Guard

**Target Binary**: `powershell.exe` (Windows PowerShell v1.0 engine host)  
**Format**: PE32+ (64-bit AMD64)  
**SHA-256**: `9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3`  
**Provider**: REA Portable Artifact Parsers (`rea-agents@6.8.0`)

---

## 1. Learning Objectives

In this case study, you will learn to:
1. Extract and interpret the `IMAGE_LOAD_CONFIG_DIRECTORY` of a Windows binary.
2. Audit modern exploit mitigations, specifically **Control Flow Guard (CFG)**, **EH Continuation Tables**, and **Security Cookies**.
3. Strictly separate **observed binary facts** from **runtime behavioral claims**.
4. Evaluate Authenticode signature tables and understand the distinction between embedded signatures and Windows Catalog signing.
5. Analyze the Import Address Table (IAT) and compute the import hash (`imphash`).

---

## 2. Evidence Walkthrough

### Part A: Load Configuration & Exploit Mitigations
**Tool Executed**: `inspect_pe_load_config`  
**Evidence ID**: `ev_e20c10605115e8bcb5b82e6864fbc471d8043e37b7ba9c0265c7173fa882cac7`

#### Observed Facts:
- **Load Config Directory**: Size `280` bytes located at RVA `0x0000BC30` (file offset `42,448`).
- **Security Cookie (`/GS`)**: VA `0x140017648` located in the `.data` section.
- **GuardFlags (Raw value `4,289,792`)**:
  - `IMAGE_GUARD_CF_INSTRUMENTED`: Binary was built with CFG instrumentation enabled.
  - `IMAGE_GUARD_CF_FUNCTION_TABLE_PRESENT`: Valid indirect call targets are enumerated in a bitmap table.
  - `IMAGE_GUARD_CF_LONGJUMP_TABLE_PRESENT`: Valid setjmp/longjmp targets are cataloged.
  - `IMAGE_GUARD_EH_CONTINUATION_TABLE_PRESENT`: Valid Exception Handling continuation targets are cataloged (8 entries observed).
  - `IMAGE_GUARD_PROTECT_DELAYLOAD_IAT`: Protects delay-load import tables from overwrite.
- **CFG Target Table**: 59 valid function pointer targets recorded at RVA `61,016`.

#### Critical Boundary Distinction:
> **Observed Fact vs. Inference**:
> The presence of `IMAGE_GUARD_CF_INSTRUMENTED` in `GuardFlags` is a **linker claim**. It proves that the compiler/linker inserted CFG checks (`__guard_check_icall`) into indirect branch sites during compilation. It does **not** prove that the host operating system kernel is actively enforcing CFG checks at runtime (which depends on OS version, kernel CFG configuration, and process mitigation policy).

---

### Part B: Authenticode Signature Inspection
**Tool Executed**: `inspect_pe_certificates`  
**Evidence ID**: `ev_fed1d0f0b677d97854e68733676b91abd4a7eef32bccbc3219e4f4cc45fb435a`

#### Observed Facts:
- **Security Directory (`IMAGE_DIRECTORY_ENTRY_SECURITY`)**: Absent (`table: null`, `entries: []`).
- **Examined Certificates**: 0.

#### Analysis & Pedagogical Insight:
Why does a critical Microsoft Windows system binary have no embedded Authenticode certificate?
- **Catalog Signing**: Standard Windows OS binaries are typically not signed with embedded Authenticode tables to reduce on-disk bloat and simplify component servicing. Instead, their cryptographic hashes are stored in signed system catalog files (`.cat`) in `%SystemRoot%\System32\CatRoot`.
- **Methodological Rule**: Never declare that a binary is "unsigned" simply because the embedded certificate table is absent. The correct scientific finding is: *"IMAGE_DIRECTORY_ENTRY_SECURITY is absent. That is not proof the image is unsigned in every catalog or overlay sense."*

---

### Part C: Import Address Table & Imphash
**Tool Executed**: `inspect_pe_imports`  
**Evidence ID**: `ev_515646196e03c6708c6276554247bd25b03a9936ebb0f4d848f64ef3ec0329e2`

#### Observed Facts:
- **Total Imported DLLs**: 8 libraries (`msvcrt.dll`, `ATL.DLL`, `KERNEL32.dll`, `OLEAUT32.dll`, `ADVAPI32.dll`, `OLE32.dll`, `USER32.dll`, `mscoree.dll`).
- **Total Imported APIs**: 131 functions.
- **CLR Bootstrapper**: Imports `CorBindToRuntimeEx` from `mscoree.dll`, revealing that `powershell.exe` serves as a native native unmanaged host that initializes the .NET Common Language Runtime (CLR).
- **Imphash**: `3d08f4848535206d772de145804ff4b6` (calculated via standard pefile ordering).

---

## 3. Clean-Room Architectural Reconstruction

In reverse engineering, reconstruction validates that you truly understand the parsed structures.
See [`reconstruction/mitigation-audit.ts`](reconstruction/mitigation-audit.ts) for a clean-room TypeScript parser that evaluates mitigation scores from raw Load Config and Import data.

---

## 4. Active-Recall Knowledge Check

Test your understanding of this case study by reviewing the interactive quiz questions in the CyberTube viewer:
1. *What does GuardFlags prove vs what does it infer?*
2. *Why do standard Windows binaries lack embedded Authenticode tables?*
3. *What does the presence of `mscoree.dll!CorBindToRuntimeEx` indicate about this executable?*

