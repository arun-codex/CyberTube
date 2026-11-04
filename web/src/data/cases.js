window.CYBERTUBE_CASES = {
  "cases": [
    {
      "id": "case-001-pe-security",
      "title": "Windows PE Security Posture: Auditing Authenticode & Control Flow Guard",
      "slug": "pe-security-posture",
      "description": "Analyze a Windows system binary (powershell.exe) using REA static inspection tools to determine its exploit mitigation posture, Authenticode signing structure, and runtime dependencies.",
      "domain": "pe-static",
      "difficulty": "beginner",
      "status": "published",
      "version": "1.0.0",
      "created_at": "2026-11-04T12:45:00.000Z",
      "updated_at": "2026-11-04T12:45:00.000Z",
      "author": "CyberTube Research Team",
      "tags": [
        "windows",
        "pe",
        "control-flow-guard",
        "authenticode",
        "load-config",
        "iat",
        "exploit-mitigations"
      ],
      "learning_objectives": [
        {
          "id": "obj-1",
          "description": "Extract and interpret PE Load Configuration directory to verify Control Flow Guard (CFG) instrumentation.",
          "rea_tools": [
            "inspect_pe_load_config"
          ]
        },
        {
          "id": "obj-2",
          "description": "Distinguish between observed binary facts (linker flags) and runtime enforcement claims.",
          "rea_tools": [
            "inspect_pe_load_config"
          ]
        },
        {
          "id": "obj-3",
          "description": "Inspect the Authenticode certificate table and understand catalog signing vs embedded signatures.",
          "rea_tools": [
            "inspect_pe_certificates"
          ]
        },
        {
          "id": "obj-4",
          "description": "Analyze the Import Address Table (IAT) and compute the import hash (imphash).",
          "rea_tools": [
            "inspect_pe_imports"
          ]
        }
      ],
      "evidence_files": [
        "evidence/inspect_pe_load_config.json",
        "evidence/inspect_pe_certificates.json",
        "evidence/inspect_pe_imports.json"
      ],
      "quiz": [
        {
          "id": "q1",
          "question": "In inspect_pe_load_config, what does the presence of IMAGE_GUARD_CF_INSTRUMENTED in GuardFlags prove?",
          "options": [
            "It proves the operating system kernel is actively enforcing CFG checks at runtime.",
            "It is a linker metadata claim indicating the binary was compiled with /guard:cf, but does not independently prove runtime enforcement.",
            "It proves the binary is completely immune to return-oriented programming (ROP) exploits.",
            "It indicates that SafeSEH structured exception handlers are registered."
          ],
          "correct_index": 1,
          "explanation": "GuardFlags bits are declared linker characteristics within the IMAGE_LOAD_CONFIG_DIRECTORY. In REA's evidence methodology, this is classified as an inference based on linker claims, not an observation of runtime instruction execution.",
          "evidence_ref": "ev_e20c10605115e8bcb5b82e6864fbc471d8043e37b7ba9c0265c7173fa882cac7"
        },
        {
          "id": "q2",
          "question": "When inspect_pe_certificates reports that IMAGE_DIRECTORY_ENTRY_SECURITY is absent, what conclusion is scientifically valid?",
          "options": [
            "The binary is definitely untrusted malware because it has no signature.",
            "The file is missing an embedded Authenticode signature table, but may still be signed via a Windows Security Catalog (.cat).",
            "The file cannot be executed on 64-bit Windows systems.",
            "The binary has an expired X.509 certificate."
          ],
          "correct_index": 1,
          "explanation": "Core Windows operating system binaries (such as powershell.exe) are frequently signed through external Windows Catalog files rather than embedded Authenticode tables. Absence of the embedded table is an observed fact, but is not proof of being unsigned.",
          "evidence_ref": "ev_fed1d0f0b677d97854e68733676b91abd4a7eef32bccbc3219e4f4cc45fb435a"
        },
        {
          "id": "q3",
          "question": "What is the primary function of the imphash (Import Hash) calculated in inspect_pe_imports?",
          "options": [
            "To verify that the file bytes have not been modified since compilation.",
            "To identify malware families or toolchain similarities by hashing the ordered list of imported DLLs and APIs.",
            "To calculate the cryptographic SHA-256 digest of the export table.",
            "To check if the binary uses delay-loaded imports."
          ],
          "correct_index": 1,
          "explanation": "Imphash is an MD5 hash derived from the specific order and names of imported libraries and APIs. Binaries built from the same codebase or compiler toolchain often share identical imphash values, making it a valuable heuristic.",
          "evidence_ref": "ev_515646196e03c6708c6276554247bd25b03a9936ebb0f4d848f64ef3ec0329e2"
        }
      ],
      "prerequisites": [
        "Basic understanding of PE header structure (DOS header, NT headers, Optional header)",
        "Familiarity with software exploit mitigations (ASLR, DEP, CFG)"
      ],
      "evidence": {
        "inspect_pe_load_config": {
          "evidence_id": "ev_e20c10605115e8bcb5b82e6864fbc471d8043e37b7ba9c0265c7173fa882cac7",
          "subject": {
            "name": "powershell.exe",
            "digest": {
              "sha256": "9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3"
            },
            "format": "pe",
            "architecture": "x86_64"
          },
          "provider": {
            "id": "rea-pe-load-config",
            "name": "REA PE TLS/load-config parser",
            "version": "1"
          },
          "analysis_profile": null,
          "predicate_type": "rea.analysis",
          "operation": "inspect_pe_load_config",
          "parameters": {
            "path": "<system>/powershell.exe",
            "max_file_bytes": 67108864,
            "max_callbacks": 64
          },
          "raw_result": null,
          "normalized_result": {
            "artifact": {
              "path": "<system>/powershell.exe",
              "sha256": "9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3",
              "bytes": 455680
            },
            "format": "pe32-plus",
            "machine": 34404,
            "bits": 64,
            "architecture": "amd64",
            "tls": {
              "directory": {
                "rva": 48360,
                "size": 40,
                "file_offset": 42728
              },
              "start_address_of_raw_data": "0x140014de0",
              "end_address_of_raw_data": "0x140014de8",
              "raw_data_size": 8,
              "raw_data_file_offset": 79840,
              "raw_data_section": ".rdata",
              "address_of_index": {
                "va": "0x140017c40",
                "rva": 97344,
                "file_offset": null,
                "section": ".data"
              },
              "address_of_callbacks": "0x14000ee30",
              "size_of_zero_fill": 0,
              "characteristics": 3145728,
              "alignment": 4,
              "callbacks": [],
              "callback_array_locations": [
                {
                  "offset": 55344,
                  "bytes": 8
                }
              ]
            },
            "load_config": {
              "directory": {
                "rva": 48080,
                "size": 280,
                "file_offset": 42448
              },
              "size": 280,
              "structure_location": {
                "offset": 42448,
                "bytes": 280
              },
              "security_cookie": {
                "va": "0x140017648",
                "rva": 95816,
                "file_offset": 89672,
                "section": ".data"
              },
              "se_handler_table": null,
              "se_handler_count": null,
              "guard_cf_check_function_pointer": {
                "va": "0x14000edb8",
                "rva": 60856,
                "file_offset": 55224,
                "section": ".rdata"
              },
              "guard_cf_dispatch_function_pointer": {
                "va": "0x14000edc0",
                "rva": 60864,
                "file_offset": 55232,
                "section": ".rdata"
              },
              "guard_cf_function_table": {
                "va": "0x14000ee58",
                "rva": 61016,
                "file_offset": 55384,
                "section": ".rdata"
              },
              "guard_cf_function_count": 59,
              "guard_flags": {
                "raw": 4289792,
                "flags": [
                  "IMAGE_GUARD_CF_INSTRUMENTED",
                  "IMAGE_GUARD_CF_FUNCTION_TABLE_PRESENT",
                  "IMAGE_GUARD_PROTECT_DELAYLOAD_IAT",
                  "IMAGE_GUARD_DELAYLOAD_IAT_IN_ITS_OWN_SECTION",
                  "IMAGE_GUARD_CF_EXPORT_SUPPRESSION_INFO_PRESENT",
                  "IMAGE_GUARD_CF_LONGJUMP_TABLE_PRESENT",
                  "IMAGE_GUARD_EH_CONTINUATION_TABLE_PRESENT"
                ],
                "unrecognized": 0,
                "cf_function_table_stride": 4
              },
              "guard_address_taken_iat_entry_table": {
                "va": "0x14000ef44",
                "rva": 61252,
                "file_offset": 55620,
                "section": ".rdata"
              },
              "guard_address_taken_iat_entry_count": 1,
              "guard_long_jump_target_table": {
                "va": "0x0",
                "rva": null,
                "file_offset": null,
                "section": null
              },
              "guard_long_jump_target_count": 0,
              "dynamic_value_reloc_table": "0x0",
              "chpe_metadata_pointer": "0x0",
              "dynamic_value_reloc_table_offset": 0,
              "dynamic_value_reloc_table_section": 0,
              "guard_eh_continuation_table": {
                "va": "0x14000ee38",
                "rva": 60984,
                "file_offset": 55352,
                "section": ".rdata"
              },
              "guard_eh_continuation_count": 8,
              "guard_xfg_check_function_pointer": null,
              "inferences": [
                {
                  "id": "cfg_instrumented",
                  "evidence_kind": "inferred",
                  "basis": "GuardFlags has cfg_instrumented set. That bit is a linker claim; this inspection did not verify the corresponding instructions."
                }
              ]
            },
            "examined_callbacks": 0,
            "limitations": [
              "TLS callbacks and load-config fields reproduce IMAGE_DIRECTORY_ENTRY_TLS and IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG. They do not establish that a callback runs or that a mitigation is enforced at load.",
              "Claims such as CFG instrumentation are inferred from GuardFlags bits and are not observations of instrumented instructions.",
              "A missing TLS or load-config directory is observed absence of that table, not proof the image never registered callbacks or mitigations through another mechanism.",
              "SafeSEH table and count are reported only for PE32. PE32+ struct slots that share those names are not a SafeSEH table.",
              "CHPE metadata and dynamic value relocation pointers are raw virtual addresses. Dynamic relocation table offset and section are separate source values; their target is not derived or decoded.",
              "Load-config fields newer than GuardXFGCheckFunctionPointer stay unread. A Size larger than the fields this version knows does not fail the read."
            ]
          },
          "confidence": "observed",
          "authority": "shipped-artifact",
          "environment": null,
          "limitations": [
            "TLS callbacks and load-config fields reproduce IMAGE_DIRECTORY_ENTRY_TLS and IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG. They do not establish that a callback runs or that a mitigation is enforced at load.",
            "Claims such as CFG instrumentation are inferred from GuardFlags bits and are not observations of instrumented instructions.",
            "A missing TLS or load-config directory is observed absence of that table, not proof the image never registered callbacks or mitigations through another mechanism.",
            "SafeSEH table and count are reported only for PE32. PE32+ struct slots that share those names are not a SafeSEH table.",
            "CHPE metadata and dynamic value relocation pointers are raw virtual addresses. Dynamic relocation table offset and section are separate source values; their target is not derived or decoded.",
            "Load-config fields newer than GuardXFGCheckFunctionPointer stay unread. A Size larger than the fields this version knows does not fail the read."
          ],
          "relationship_coverage": null,
          "locations": [
            {
              "kind": "artifact-path",
              "path": "<system>/powershell.exe"
            },
            {
              "kind": "file-offset-range",
              "start": 42728,
              "end": 42768
            },
            {
              "kind": "file-offset-range",
              "start": 42448,
              "end": 42728
            },
            {
              "kind": "file-offset-range",
              "start": 55344,
              "end": 55352
            }
          ],
          "evidence_links": [],
          "case_id": "case-001-pe-security",
          "created_at": "2026-11-04T07:15:26.295Z",
          "residual_unknowns": []
        },
        "inspect_pe_certificates": {
          "evidence_id": "ev_fed1d0f0b677d97854e68733676b91abd4a7eef32bccbc3219e4f4cc45fb435a",
          "subject": {
            "name": "powershell.exe",
            "digest": {
              "sha256": "9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3"
            },
            "format": "pe",
            "architecture": "x86_64"
          },
          "provider": {
            "id": "rea-pe-certificates",
            "name": "REA PE certificate parser",
            "version": "1"
          },
          "analysis_profile": null,
          "predicate_type": "rea.analysis",
          "operation": "inspect_pe_certificates",
          "parameters": {
            "path": "<system>/powershell.exe",
            "max_file_bytes": 67108864,
            "max_entries": 8
          },
          "raw_result": null,
          "normalized_result": {
            "artifact": {
              "path": "<system>/powershell.exe",
              "sha256": "9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3",
              "bytes": 455680
            },
            "format": "pe32-plus",
            "machine": 34404,
            "table": null,
            "entries": [],
            "coverage": {
              "status": "complete",
              "examined_entries": 0,
              "certificates": 0
            },
            "limitations": [
              "IMAGE_DIRECTORY_ENTRY_SECURITY is absent. That is not proof the image is unsigned in every catalog or overlay sense.",
              "This workflow does not verify signatures, certificate chains, timestamps, or Authenticode digest coverage of image bytes."
            ]
          },
          "confidence": "observed",
          "authority": "shipped-artifact",
          "environment": null,
          "limitations": [
            "IMAGE_DIRECTORY_ENTRY_SECURITY is absent. That is not proof the image is unsigned in every catalog or overlay sense.",
            "This workflow does not verify signatures, certificate chains, timestamps, or Authenticode digest coverage of image bytes."
          ],
          "relationship_coverage": null,
          "locations": [
            {
              "kind": "artifact-path",
              "path": "<system>/powershell.exe"
            }
          ],
          "evidence_links": [],
          "case_id": "case-001-pe-security",
          "created_at": "2026-11-04T07:15:26.132Z",
          "residual_unknowns": []
        },
        "inspect_pe_imports": {
          "evidence_id": "ev_515646196e03c6708c6276554247bd25b03a9936ebb0f4d848f64ef3ec0329e2",
          "subject": {
            "name": "powershell.exe",
            "digest": {
              "sha256": "9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3"
            },
            "format": "pe",
            "architecture": "x86_64"
          },
          "provider": {
            "id": "rea-pe-imports",
            "name": "REA PE import parser",
            "version": "1"
          },
          "analysis_profile": null,
          "predicate_type": "rea.analysis",
          "operation": "inspect_pe_imports",
          "parameters": {
            "path": "<system>/powershell.exe",
            "max_file_bytes": 67108864,
            "max_dlls": 256,
            "max_functions": 8192
          },
          "raw_result": null,
          "normalized_result": {
            "artifact": {
              "path": "<system>/powershell.exe",
              "sha256": "9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3",
              "bytes": 455680
            },
            "format": "pe32-plus",
            "machine": 34404,
            "bits": 64,
            "architecture": "amd64",
            "import_directory": {
              "rva": 89836,
              "size": 180,
              "locations": [
                {
                  "offset": 84204,
                  "bytes": 180
                }
              ]
            },
            "delay_import_directory": null,
            "imports": [
              {
                "index": 0,
                "name": "msvcrt.dll",
                "name_rva": 91616,
                "original_first_thunk_rva": 90744,
                "first_thunk_rva": 60472,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84204,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": 833,
                    "name": "_unlock",
                    "ordinal": null,
                    "ilt_rva": 90744,
                    "iat_rva": 60472,
                    "thunk_hex": "165f4"
                  },
                  {
                    "hint": 486,
                    "name": "_lock",
                    "ordinal": null,
                    "ilt_rva": 90752,
                    "iat_rva": 60480,
                    "thunk_hex": "165ec"
                  },
                  {
                    "hint": 210,
                    "name": "_commode",
                    "ordinal": null,
                    "ilt_rva": 90760,
                    "iat_rva": 60488,
                    "thunk_hex": "165d4"
                  },
                  {
                    "hint": 295,
                    "name": "_fmode",
                    "ordinal": null,
                    "ilt_rva": 90768,
                    "iat_rva": 60496,
                    "thunk_hex": "165ca"
                  },
                  {
                    "hint": 381,
                    "name": "_initterm",
                    "ordinal": null,
                    "ilt_rva": 90776,
                    "iat_rva": 60504,
                    "thunk_hex": "165be"
                  },
                  {
                    "hint": 144,
                    "name": "__setusermatherr",
                    "ordinal": null,
                    "ilt_rva": 90784,
                    "iat_rva": 60512,
                    "thunk_hex": "165aa"
                  },
                  {
                    "hint": 193,
                    "name": "_cexit",
                    "ordinal": null,
                    "ilt_rva": 90792,
                    "iat_rva": 60520,
                    "thunk_hex": "165a0"
                  },
                  {
                    "hint": 123,
                    "name": "__dllonexit",
                    "ordinal": null,
                    "ilt_rva": 90800,
                    "iat_rva": 60528,
                    "thunk_hex": "165fe"
                  },
                  {
                    "hint": 1074,
                    "name": "exit",
                    "ordinal": null,
                    "ilt_rva": 90808,
                    "iat_rva": 60536,
                    "thunk_hex": "16590"
                  },
                  {
                    "hint": 142,
                    "name": "__set_app_type",
                    "ordinal": null,
                    "ilt_rva": 90816,
                    "iat_rva": 60544,
                    "thunk_hex": "1657e"
                  },
                  {
                    "hint": 157,
                    "name": "__wgetmainargs",
                    "ordinal": null,
                    "ilt_rva": 90824,
                    "iat_rva": 60552,
                    "thunk_hex": "1656c"
                  },
                  {
                    "hint": 174,
                    "name": "_amsg_exit",
                    "ordinal": null,
                    "ilt_rva": 90832,
                    "iat_rva": 60560,
                    "thunk_hex": "1655e"
                  },
                  {
                    "hint": 85,
                    "name": "_XcptFilter",
                    "ordinal": null,
                    "ilt_rva": 90840,
                    "iat_rva": 60568,
                    "thunk_hex": "16550"
                  },
                  {
                    "hint": 47,
                    "name": "?terminate@@YAXXZ",
                    "ordinal": null,
                    "ilt_rva": 90848,
                    "iat_rva": 60576,
                    "thunk_hex": "16616"
                  },
                  {
                    "hint": 18,
                    "name": "??1type_info@@UEAA@XZ",
                    "ordinal": null,
                    "ilt_rva": 90856,
                    "iat_rva": 60584,
                    "thunk_hex": "1662a"
                  },
                  {
                    "hint": 1172,
                    "name": "memmove",
                    "ordinal": null,
                    "ilt_rva": 90864,
                    "iat_rva": 60592,
                    "thunk_hex": "16546"
                  },
                  {
                    "hint": 270,
                    "name": "_exit",
                    "ordinal": null,
                    "ilt_rva": 90872,
                    "iat_rva": 60600,
                    "thunk_hex": "16598"
                  },
                  {
                    "hint": 656,
                    "name": "_onexit",
                    "ordinal": null,
                    "ilt_rva": 90880,
                    "iat_rva": 60608,
                    "thunk_hex": "1660c"
                  },
                  {
                    "hint": 873,
                    "name": "_vsnwprintf",
                    "ordinal": null,
                    "ilt_rva": 90888,
                    "iat_rva": 60616,
                    "thunk_hex": "16b0a"
                  },
                  {
                    "hint": 906,
                    "name": "_wcsicmp",
                    "ordinal": null,
                    "ilt_rva": 90896,
                    "iat_rva": 60624,
                    "thunk_hex": "16b18"
                  },
                  {
                    "hint": 916,
                    "name": "_wcsnicmp",
                    "ordinal": null,
                    "ilt_rva": 90904,
                    "iat_rva": 60632,
                    "thunk_hex": "16b24"
                  },
                  {
                    "hint": 1058,
                    "name": "bsearch",
                    "ordinal": null,
                    "ilt_rva": 90912,
                    "iat_rva": 60640,
                    "thunk_hex": "16b30"
                  },
                  {
                    "hint": 1078,
                    "name": "fclose",
                    "ordinal": null,
                    "ilt_rva": 90920,
                    "iat_rva": 60648,
                    "thunk_hex": "16b3a"
                  },
                  {
                    "hint": 963,
                    "name": "_wfopen",
                    "ordinal": null,
                    "ilt_rva": 90928,
                    "iat_rva": 60656,
                    "thunk_hex": "16b44"
                  },
                  {
                    "hint": 474,
                    "name": "_itow_s",
                    "ordinal": null,
                    "ilt_rva": 90936,
                    "iat_rva": 60664,
                    "thunk_hex": "16b4e"
                  },
                  {
                    "hint": 1307,
                    "name": "wcstoul",
                    "ordinal": null,
                    "ilt_rva": 90944,
                    "iat_rva": 60672,
                    "thunk_hex": "16b58"
                  },
                  {
                    "hint": 1281,
                    "name": "wcschr",
                    "ordinal": null,
                    "ilt_rva": 90952,
                    "iat_rva": 60680,
                    "thunk_hex": "16b62"
                  },
                  {
                    "hint": 151,
                    "name": "__uncaught_exception",
                    "ordinal": null,
                    "ilt_rva": 90960,
                    "iat_rva": 60688,
                    "thunk_hex": "16b6c"
                  },
                  {
                    "hint": 1170,
                    "name": "memcpy",
                    "ordinal": null,
                    "ilt_rva": 90968,
                    "iat_rva": 60696,
                    "thunk_hex": "1653c"
                  },
                  {
                    "hint": 75,
                    "name": "_CxxThrowException",
                    "ordinal": null,
                    "ilt_rva": 90976,
                    "iat_rva": 60704,
                    "thunk_hex": "16526"
                  },
                  {
                    "hint": 49,
                    "name": "?what@exception@@UEBAPEBDXZ",
                    "ordinal": null,
                    "ilt_rva": 90984,
                    "iat_rva": 60712,
                    "thunk_hex": "16508"
                  },
                  {
                    "hint": 17,
                    "name": "??1exception@@UEAA@XZ",
                    "ordinal": null,
                    "ilt_rva": 90992,
                    "iat_rva": 60720,
                    "thunk_hex": "164f0"
                  },
                  {
                    "hint": 12,
                    "name": "??0exception@@QEAA@AEBV0@@Z",
                    "ordinal": null,
                    "ilt_rva": 91000,
                    "iat_rva": 60728,
                    "thunk_hex": "164d2"
                  },
                  {
                    "hint": 11,
                    "name": "??0exception@@QEAA@AEBQEBDH@Z",
                    "ordinal": null,
                    "ilt_rva": 91008,
                    "iat_rva": 60736,
                    "thunk_hex": "164b2"
                  },
                  {
                    "hint": 10,
                    "name": "??0exception@@QEAA@AEBQEBD@Z",
                    "ordinal": null,
                    "ilt_rva": 91016,
                    "iat_rva": 60744,
                    "thunk_hex": "16492"
                  },
                  {
                    "hint": 191,
                    "name": "_callnewh",
                    "ordinal": null,
                    "ilt_rva": 91024,
                    "iat_rva": 60752,
                    "thunk_hex": "16486"
                  },
                  {
                    "hint": 1158,
                    "name": "malloc",
                    "ordinal": null,
                    "ilt_rva": 91032,
                    "iat_rva": 60760,
                    "thunk_hex": "1647c"
                  },
                  {
                    "hint": 1291,
                    "name": "wcsncmp",
                    "ordinal": null,
                    "ilt_rva": 91040,
                    "iat_rva": 60768,
                    "thunk_hex": "16472"
                  },
                  {
                    "hint": 1296,
                    "name": "wcsrchr",
                    "ordinal": null,
                    "ilt_rva": 91048,
                    "iat_rva": 60776,
                    "thunk_hex": "16468"
                  },
                  {
                    "hint": 1100,
                    "name": "free",
                    "ordinal": null,
                    "ilt_rva": 91056,
                    "iat_rva": 60784,
                    "thunk_hex": "16460"
                  },
                  {
                    "hint": 670,
                    "name": "_purecall",
                    "ordinal": null,
                    "ilt_rva": 91064,
                    "iat_rva": 60792,
                    "thunk_hex": "16454"
                  },
                  {
                    "hint": 20,
                    "name": "??3@YAXPEAX@Z",
                    "ordinal": null,
                    "ilt_rva": 91072,
                    "iat_rva": 60800,
                    "thunk_hex": "16444"
                  },
                  {
                    "hint": 1171,
                    "name": "memcpy_s",
                    "ordinal": null,
                    "ilt_rva": 91080,
                    "iat_rva": 60808,
                    "thunk_hex": "16438"
                  },
                  {
                    "hint": 35,
                    "name": "??_V@YAXPEAX@Z",
                    "ordinal": null,
                    "ilt_rva": 91088,
                    "iat_rva": 60816,
                    "thunk_hex": "16426"
                  },
                  {
                    "hint": 87,
                    "name": "__C_specific_handler",
                    "ordinal": null,
                    "ilt_rva": 91096,
                    "iat_rva": 60824,
                    "thunk_hex": "1640e"
                  },
                  {
                    "hint": 91,
                    "name": "__CxxFrameHandler3",
                    "ordinal": null,
                    "ilt_rva": 91104,
                    "iat_rva": 60832,
                    "thunk_hex": "163f8"
                  },
                  {
                    "hint": 1174,
                    "name": "memset",
                    "ordinal": null,
                    "ilt_rva": 91112,
                    "iat_rva": 60840,
                    "thunk_hex": "16ce8"
                  }
                ]
              },
              {
                "index": 1,
                "name": "ATL.DLL",
                "name_rva": 91714,
                "original_first_thunk_rva": 90096,
                "first_thunk_rva": 59824,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84224,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 30,
                    "ilt_rva": 90096,
                    "iat_rva": 59824,
                    "thunk_hex": "800000000000001e"
                  }
                ]
              },
              {
                "index": 2,
                "name": "KERNEL32.dll",
                "name_rva": 92874,
                "original_first_thunk_rva": 90112,
                "first_thunk_rva": 59840,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84244,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": 1160,
                    "name": "UnmapViewOfFile",
                    "ordinal": null,
                    "ilt_rva": 90112,
                    "iat_rva": 59840,
                    "thunk_hex": "16bee"
                  },
                  {
                    "hint": 641,
                    "name": "GetVersionExW",
                    "ordinal": null,
                    "ilt_rva": 90120,
                    "iat_rva": 59848,
                    "thunk_hex": "16bde"
                  },
                  {
                    "hint": 474,
                    "name": "GetLocaleInfoW",
                    "ordinal": null,
                    "ilt_rva": 90128,
                    "iat_rva": 59856,
                    "thunk_hex": "16bcc"
                  },
                  {
                    "hint": 636,
                    "name": "GetUserDefaultUILanguage",
                    "ordinal": null,
                    "ilt_rva": 90136,
                    "iat_rva": 59864,
                    "thunk_hex": "16bb0"
                  },
                  {
                    "hint": 581,
                    "name": "GetSystemDefaultUILanguage",
                    "ordinal": null,
                    "ilt_rva": 90144,
                    "iat_rva": 59872,
                    "thunk_hex": "16b92"
                  },
                  {
                    "hint": 990,
                    "name": "SearchPathW",
                    "ordinal": null,
                    "ilt_rva": 90152,
                    "iat_rva": 59880,
                    "thunk_hex": "16b84"
                  },
                  {
                    "hint": 296,
                    "name": "FindResourceExW",
                    "ordinal": null,
                    "ilt_rva": 90160,
                    "iat_rva": 59888,
                    "thunk_hex": "16c00"
                  },
                  {
                    "hint": 622,
                    "name": "GetTickCount",
                    "ordinal": null,
                    "ilt_rva": 90168,
                    "iat_rva": 59896,
                    "thunk_hex": "16aba"
                  },
                  {
                    "hint": 592,
                    "name": "GetSystemTimeAsFileTime",
                    "ordinal": null,
                    "ilt_rva": 90176,
                    "iat_rva": 59904,
                    "thunk_hex": "16aa0"
                  },
                  {
                    "hint": 411,
                    "name": "GetCurrentThreadId",
                    "ordinal": null,
                    "ilt_rva": 90184,
                    "iat_rva": 59912,
                    "thunk_hex": "16a8a"
                  },
                  {
                    "hint": 898,
                    "name": "QueryPerformanceCounter",
                    "ordinal": null,
                    "ilt_rva": 90192,
                    "iat_rva": 59920,
                    "thunk_hex": "16a70"
                  },
                  {
                    "hint": 792,
                    "name": "LoadResource",
                    "ordinal": null,
                    "ilt_rva": 90200,
                    "iat_rva": 59928,
                    "thunk_hex": "16c12"
                  },
                  {
                    "hint": 1114,
                    "name": "SetUnhandledExceptionFilter",
                    "ordinal": null,
                    "ilt_rva": 90208,
                    "iat_rva": 59936,
                    "thunk_hex": "16a3e"
                  },
                  {
                    "hint": 1157,
                    "name": "UnhandledExceptionFilter",
                    "ordinal": null,
                    "ilt_rva": 90216,
                    "iat_rva": 59944,
                    "thunk_hex": "16a22"
                  },
                  {
                    "hint": 985,
                    "name": "RtlVirtualUnwind",
                    "ordinal": null,
                    "ilt_rva": 90224,
                    "iat_rva": 59952,
                    "thunk_hex": "16a0e"
                  },
                  {
                    "hint": 978,
                    "name": "RtlLookupFunctionEntry",
                    "ordinal": null,
                    "ilt_rva": 90232,
                    "iat_rva": 59960,
                    "thunk_hex": "169f4"
                  },
                  {
                    "hint": 973,
                    "name": "RtlCaptureContext",
                    "ordinal": null,
                    "ilt_rva": 90240,
                    "iat_rva": 59968,
                    "thunk_hex": "169e0"
                  },
                  {
                    "hint": 1129,
                    "name": "SleepConditionVariableSRW",
                    "ordinal": null,
                    "ilt_rva": 90248,
                    "iat_rva": 59976,
                    "thunk_hex": "169c4"
                  },
                  {
                    "hint": 1200,
                    "name": "WakeAllConditionVariable",
                    "ordinal": null,
                    "ilt_rva": 90256,
                    "iat_rva": 59984,
                    "thunk_hex": "169a8"
                  },
                  {
                    "hint": 0,
                    "name": "AcquireSRWLockExclusive",
                    "ordinal": null,
                    "ilt_rva": 90264,
                    "iat_rva": 59992,
                    "thunk_hex": "1698e"
                  },
                  {
                    "hint": 949,
                    "name": "ReleaseSRWLockExclusive",
                    "ordinal": null,
                    "ilt_rva": 90272,
                    "iat_rva": 60000,
                    "thunk_hex": "16974"
                  },
                  {
                    "hint": 113,
                    "name": "CreateFileMappingW",
                    "ordinal": null,
                    "ilt_rva": 90280,
                    "iat_rva": 60008,
                    "thunk_hex": "16c30"
                  },
                  {
                    "hint": 739,
                    "name": "IsWow64Process",
                    "ordinal": null,
                    "ilt_rva": 90288,
                    "iat_rva": 60016,
                    "thunk_hex": "1695a"
                  },
                  {
                    "hint": 1019,
                    "name": "SetConsoleTitleW",
                    "ordinal": null,
                    "ilt_rva": 90296,
                    "iat_rva": 60024,
                    "thunk_hex": "16946"
                  },
                  {
                    "hint": 453,
                    "name": "GetFileType",
                    "ordinal": null,
                    "ilt_rva": 90304,
                    "iat_rva": 60032,
                    "thunk_hex": "16938"
                  },
                  {
                    "hint": 318,
                    "name": "FreeLibrary",
                    "ordinal": null,
                    "ilt_rva": 90312,
                    "iat_rva": 60040,
                    "thunk_hex": "16c22"
                  },
                  {
                    "hint": 1140,
                    "name": "TerminateProcess",
                    "ordinal": null,
                    "ilt_rva": 90320,
                    "iat_rva": 60048,
                    "thunk_hex": "16a5c"
                  },
                  {
                    "hint": 569,
                    "name": "GetStartupInfoW",
                    "ordinal": null,
                    "ilt_rva": 90328,
                    "iat_rva": 60056,
                    "thunk_hex": "1664a"
                  },
                  {
                    "hint": 1174,
                    "name": "VerifyVersionInfoW",
                    "ordinal": null,
                    "ilt_rva": 90336,
                    "iat_rva": 60064,
                    "thunk_hex": "16922"
                  },
                  {
                    "hint": 276,
                    "name": "FindFirstFileW",
                    "ordinal": null,
                    "ilt_rva": 90344,
                    "iat_rva": 60072,
                    "thunk_hex": "1665c"
                  },
                  {
                    "hint": 809,
                    "name": "MapViewOfFile",
                    "ordinal": null,
                    "ilt_rva": 90352,
                    "iat_rva": 60080,
                    "thunk_hex": "16c46"
                  },
                  {
                    "hint": 789,
                    "name": "LoadLibraryExW",
                    "ordinal": null,
                    "ilt_rva": 90360,
                    "iat_rva": 60088,
                    "thunk_hex": "16c56"
                  },
                  {
                    "hint": 75,
                    "name": "CompareStringW",
                    "ordinal": null,
                    "ilt_rva": 90368,
                    "iat_rva": 60096,
                    "thunk_hex": "16692"
                  },
                  {
                    "hint": 492,
                    "name": "GetModuleHandleW",
                    "ordinal": null,
                    "ilt_rva": 90376,
                    "iat_rva": 60104,
                    "thunk_hex": "168ee"
                  },
                  {
                    "hint": 1057,
                    "name": "SetLastError",
                    "ordinal": null,
                    "ilt_rva": 90384,
                    "iat_rva": 60112,
                    "thunk_hex": "166b8"
                  },
                  {
                    "hint": 491,
                    "name": "GetModuleHandleExW",
                    "ordinal": null,
                    "ilt_rva": 90392,
                    "iat_rva": 60120,
                    "thunk_hex": "16c68"
                  },
                  {
                    "hint": 406,
                    "name": "GetCurrentProcess",
                    "ordinal": null,
                    "ilt_rva": 90400,
                    "iat_rva": 60128,
                    "thunk_hex": "166da"
                  },
                  {
                    "hint": 570,
                    "name": "GetStdHandle",
                    "ordinal": null,
                    "ilt_rva": 90408,
                    "iat_rva": 60136,
                    "thunk_hex": "166ee"
                  },
                  {
                    "hint": 1245,
                    "name": "WriteFile",
                    "ordinal": null,
                    "ilt_rva": 90416,
                    "iat_rva": 60144,
                    "thunk_hex": "166fe"
                  },
                  {
                    "hint": 407,
                    "name": "GetCurrentProcessId",
                    "ordinal": null,
                    "ilt_rva": 90424,
                    "iat_rva": 60152,
                    "thunk_hex": "168c2"
                  },
                  {
                    "hint": 251,
                    "name": "ExpandEnvironmentStringsW",
                    "ordinal": null,
                    "ilt_rva": 90432,
                    "iat_rva": 60160,
                    "thunk_hex": "1670a"
                  },
                  {
                    "hint": 1171,
                    "name": "VerSetConditionMask",
                    "ordinal": null,
                    "ilt_rva": 90440,
                    "iat_rva": 60168,
                    "thunk_hex": "168ac"
                  },
                  {
                    "hint": 797,
                    "name": "LocalFree",
                    "ordinal": null,
                    "ilt_rva": 90448,
                    "iat_rva": 60176,
                    "thunk_hex": "168a0"
                  },
                  {
                    "hint": 1244,
                    "name": "WriteConsoleW",
                    "ordinal": null,
                    "ilt_rva": 90456,
                    "iat_rva": 60184,
                    "thunk_hex": "16890"
                  },
                  {
                    "hint": 488,
                    "name": "GetModuleFileNameW",
                    "ordinal": null,
                    "ilt_rva": 90464,
                    "iat_rva": 60192,
                    "thunk_hex": "16c7e"
                  },
                  {
                    "hint": 1104,
                    "name": "SetThreadUILanguage",
                    "ordinal": null,
                    "ilt_rva": 90472,
                    "iat_rva": 60200,
                    "thunk_hex": "1675e"
                  },
                  {
                    "hint": 757,
                    "name": "K32GetModuleFileNameExW",
                    "ordinal": null,
                    "ilt_rva": 90480,
                    "iat_rva": 60208,
                    "thunk_hex": "16774"
                  },
                  {
                    "hint": 536,
                    "name": "GetProcAddress",
                    "ordinal": null,
                    "ilt_rva": 90488,
                    "iat_rva": 60216,
                    "thunk_hex": "16c94"
                  },
                  {
                    "hint": 1034,
                    "name": "SetErrorMode",
                    "ordinal": null,
                    "ilt_rva": 90496,
                    "iat_rva": 60224,
                    "thunk_hex": "16ca6"
                  },
                  {
                    "hint": 267,
                    "name": "FindClose",
                    "ordinal": null,
                    "ilt_rva": 90504,
                    "iat_rva": 60232,
                    "thunk_hex": "167ae"
                  },
                  {
                    "hint": 116,
                    "name": "CreateFileW",
                    "ordinal": null,
                    "ilt_rva": 90512,
                    "iat_rva": 60240,
                    "thunk_hex": "167ba"
                  },
                  {
                    "hint": 445,
                    "name": "GetFileAttributesW",
                    "ordinal": null,
                    "ilt_rva": 90520,
                    "iat_rva": 60248,
                    "thunk_hex": "167c8"
                  },
                  {
                    "hint": 844,
                    "name": "OpenProcess",
                    "ordinal": null,
                    "ilt_rva": 90528,
                    "iat_rva": 60256,
                    "thunk_hex": "167de"
                  },
                  {
                    "hint": 157,
                    "name": "CreateToolhelp32Snapshot",
                    "ordinal": null,
                    "ilt_rva": 90536,
                    "iat_rva": 60264,
                    "thunk_hex": "167ec"
                  },
                  {
                    "hint": 1127,
                    "name": "Sleep",
                    "ordinal": null,
                    "ilt_rva": 90544,
                    "iat_rva": 60272,
                    "thunk_hex": "1696c"
                  },
                  {
                    "hint": 314,
                    "name": "FormatMessageW",
                    "ordinal": null,
                    "ilt_rva": 90552,
                    "iat_rva": 60280,
                    "thunk_hex": "1681e"
                  },
                  {
                    "hint": 870,
                    "name": "Process32FirstW",
                    "ordinal": null,
                    "ilt_rva": 90560,
                    "iat_rva": 60288,
                    "thunk_hex": "16852"
                  },
                  {
                    "hint": 58,
                    "name": "CloseHandle",
                    "ordinal": null,
                    "ilt_rva": 90568,
                    "iat_rva": 60296,
                    "thunk_hex": "16864"
                  },
                  {
                    "hint": 470,
                    "name": "GetLastError",
                    "ordinal": null,
                    "ilt_rva": 90576,
                    "iat_rva": 60304,
                    "thunk_hex": "16830"
                  },
                  {
                    "hint": 872,
                    "name": "Process32NextW",
                    "ordinal": null,
                    "ilt_rva": 90584,
                    "iat_rva": 60312,
                    "thunk_hex": "16840"
                  }
                ]
              },
              {
                "index": 3,
                "name": "OLEAUT32.dll",
                "name_rva": 92888,
                "original_first_thunk_rva": 90656,
                "first_thunk_rva": 60384,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84264,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 6,
                    "ilt_rva": 90656,
                    "iat_rva": 60384,
                    "thunk_hex": "8000000000000006"
                  },
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 26,
                    "ilt_rva": 90664,
                    "iat_rva": 60392,
                    "thunk_hex": "800000000000001a"
                  },
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 2,
                    "ilt_rva": 90672,
                    "iat_rva": 60400,
                    "thunk_hex": "8000000000000002"
                  },
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 9,
                    "ilt_rva": 90680,
                    "iat_rva": 60408,
                    "thunk_hex": "8000000000000009"
                  },
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 15,
                    "ilt_rva": 90688,
                    "iat_rva": 60416,
                    "thunk_hex": "800000000000000f"
                  },
                  {
                    "hint": null,
                    "name": null,
                    "ordinal": 7,
                    "ilt_rva": 90696,
                    "iat_rva": 60424,
                    "thunk_hex": "8000000000000007"
                  }
                ]
              },
              {
                "index": 4,
                "name": "ADVAPI32.dll",
                "name_rva": 92902,
                "original_first_thunk_rva": 90016,
                "first_thunk_rva": 59744,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84284,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": 212,
                    "name": "EventRegister",
                    "ordinal": null,
                    "ilt_rva": 90016,
                    "iat_rva": 59744,
                    "thunk_hex": "16880"
                  },
                  {
                    "hint": 471,
                    "name": "RegEnumKeyExW",
                    "ordinal": null,
                    "ilt_rva": 90024,
                    "iat_rva": 59752,
                    "thunk_hex": "16cb6"
                  },
                  {
                    "hint": 489,
                    "name": "RegOpenKeyExW",
                    "ordinal": null,
                    "ilt_rva": 90032,
                    "iat_rva": 59760,
                    "thunk_hex": "1679e"
                  },
                  {
                    "hint": 478,
                    "name": "RegGetValueW",
                    "ordinal": null,
                    "ilt_rva": 90040,
                    "iat_rva": 59768,
                    "thunk_hex": "1678e"
                  },
                  {
                    "hint": 214,
                    "name": "EventUnregister",
                    "ordinal": null,
                    "ilt_rva": 90048,
                    "iat_rva": 59776,
                    "thunk_hex": "1674c"
                  },
                  {
                    "hint": 218,
                    "name": "EventWriteTransfer",
                    "ordinal": null,
                    "ilt_rva": 90056,
                    "iat_rva": 59784,
                    "thunk_hex": "168d8"
                  },
                  {
                    "hint": 442,
                    "name": "RegCloseKey",
                    "ordinal": null,
                    "ilt_rva": 90064,
                    "iat_rva": 59792,
                    "thunk_hex": "16914"
                  },
                  {
                    "hint": 501,
                    "name": "RegQueryValueExW",
                    "ordinal": null,
                    "ilt_rva": 90072,
                    "iat_rva": 59800,
                    "thunk_hex": "1666e"
                  },
                  {
                    "hint": 213,
                    "name": "EventSetInformation",
                    "ordinal": null,
                    "ilt_rva": 90080,
                    "iat_rva": 59808,
                    "thunk_hex": "16808"
                  }
                ]
              },
              {
                "index": 5,
                "name": "OLE32.dll",
                "name_rva": 92916,
                "original_first_thunk_rva": 90600,
                "first_thunk_rva": 60328,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84304,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": 87,
                    "name": "CoInitialize",
                    "ordinal": null,
                    "ilt_rva": 90600,
                    "iat_rva": 60328,
                    "thunk_hex": "16682"
                  },
                  {
                    "hint": 358,
                    "name": "PropVariantClear",
                    "ordinal": null,
                    "ilt_rva": 90608,
                    "iat_rva": 60336,
                    "thunk_hex": "166a4"
                  },
                  {
                    "hint": 126,
                    "name": "CoTaskMemAlloc",
                    "ordinal": null,
                    "ilt_rva": 90616,
                    "iat_rva": 60344,
                    "thunk_hex": "166c8"
                  },
                  {
                    "hint": 131,
                    "name": "CoUninitialize",
                    "ordinal": null,
                    "ilt_rva": 90624,
                    "iat_rva": 60352,
                    "thunk_hex": "16726"
                  },
                  {
                    "hint": 38,
                    "name": "CoCreateInstance",
                    "ordinal": null,
                    "ilt_rva": 90632,
                    "iat_rva": 60360,
                    "thunk_hex": "16738"
                  },
                  {
                    "hint": 88,
                    "name": "CoInitializeEx",
                    "ordinal": null,
                    "ilt_rva": 90640,
                    "iat_rva": 60368,
                    "thunk_hex": "16902"
                  }
                ]
              },
              {
                "index": 6,
                "name": "USER32.dll",
                "name_rva": 92926,
                "original_first_thunk_rva": 90712,
                "first_thunk_rva": 60440,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84324,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": 403,
                    "name": "LoadStringW",
                    "ordinal": null,
                    "ilt_rva": 90712,
                    "iat_rva": 60440,
                    "thunk_hex": "16872"
                  }
                ]
              },
              {
                "index": 7,
                "name": "mscoree.dll",
                "name_rva": 93404,
                "original_first_thunk_rva": 90728,
                "first_thunk_rva": 60456,
                "time_date_stamp": 0,
                "forwarder_chain": 0,
                "location": {
                  "offset": 84344,
                  "bytes": 20
                },
                "functions": [
                  {
                    "hint": 15,
                    "name": "CorBindToRuntimeEx",
                    "ordinal": null,
                    "ilt_rva": 90728,
                    "iat_rva": 60456,
                    "thunk_hex": "16cc6"
                  }
                ]
              }
            ],
            "delay_imports": [],
            "imphash": {
              "algorithm": "pefile",
              "md5": "3d08f4848535206d772de145804ff4b6",
              "reason": null
            },
            "coverage": {
              "status": "complete",
              "reason": null,
              "examined_dlls": 8,
              "imports": 131,
              "delay_imports": 0
            },
            "issues": [],
            "limitations": [
              "Rows reproduce the PE import and delay-load directories; they do not establish that an import is bound, forwarded or reachable at runtime.",
              "Bound import snapshots, the import address table as loaded, and export-forward resolution in another DLL remain unobserved."
            ]
          },
          "confidence": "observed",
          "authority": "shipped-artifact",
          "environment": null,
          "limitations": [
            "Rows reproduce the PE import and delay-load directories; they do not establish that an import is bound, forwarded or reachable at runtime.",
            "Bound import snapshots, the import address table as loaded, and export-forward resolution in another DLL remain unobserved."
          ],
          "relationship_coverage": null,
          "locations": [
            {
              "kind": "artifact-path",
              "path": "<system>/powershell.exe"
            },
            {
              "kind": "file-offset-range",
              "start": 84204,
              "end": 84384
            }
          ],
          "evidence_links": [],
          "case_id": "case-001-pe-security",
          "created_at": "2026-11-04T07:11:30.472Z",
          "residual_unknowns": []
        }
      },
      "lesson_markdown": "# Case 001: Windows PE Security Posture — Auditing Authenticode & Control Flow Guard\n\n**Target Binary**: `powershell.exe` (Windows PowerShell v1.0 engine host)  \n**Format**: PE32+ (64-bit AMD64)  \n**SHA-256**: `9785001b0dcf755eddb8af294a373c0b87b2498660f724e76c4d53f9c217c7a3`  \n**Provider**: REA Portable Artifact Parsers (`rea-agents@6.8.0`)\n\n---\n\n## 1. Learning Objectives\n\nIn this case study, you will learn to:\n1. Extract and interpret the `IMAGE_LOAD_CONFIG_DIRECTORY` of a Windows binary.\n2. Audit modern exploit mitigations, specifically **Control Flow Guard (CFG)**, **EH Continuation Tables**, and **Security Cookies**.\n3. Strictly separate **observed binary facts** from **runtime behavioral claims**.\n4. Evaluate Authenticode signature tables and understand the distinction between embedded signatures and Windows Catalog signing.\n5. Analyze the Import Address Table (IAT) and compute the import hash (`imphash`).\n\n---\n\n## 2. Evidence Walkthrough\n\n### Part A: Load Configuration & Exploit Mitigations\n**Tool Executed**: `inspect_pe_load_config`  \n**Evidence ID**: `ev_e20c10605115e8bcb5b82e6864fbc471d8043e37b7ba9c0265c7173fa882cac7`\n\n#### Observed Facts:\n- **Load Config Directory**: Size `280` bytes located at RVA `0x0000BC30` (file offset `42,448`).\n- **Security Cookie (`/GS`)**: VA `0x140017648` located in the `.data` section.\n- **GuardFlags (Raw value `4,289,792`)**:\n  - `IMAGE_GUARD_CF_INSTRUMENTED`: Binary was built with CFG instrumentation enabled.\n  - `IMAGE_GUARD_CF_FUNCTION_TABLE_PRESENT`: Valid indirect call targets are enumerated in a bitmap table.\n  - `IMAGE_GUARD_CF_LONGJUMP_TABLE_PRESENT`: Valid setjmp/longjmp targets are cataloged.\n  - `IMAGE_GUARD_EH_CONTINUATION_TABLE_PRESENT`: Valid Exception Handling continuation targets are cataloged (8 entries observed).\n  - `IMAGE_GUARD_PROTECT_DELAYLOAD_IAT`: Protects delay-load import tables from overwrite.\n- **CFG Target Table**: 59 valid function pointer targets recorded at RVA `61,016`.\n\n#### Critical Boundary Distinction:\n> **Observed Fact vs. Inference**:\n> The presence of `IMAGE_GUARD_CF_INSTRUMENTED` in `GuardFlags` is a **linker claim**. It proves that the compiler/linker inserted CFG checks (`__guard_check_icall`) into indirect branch sites during compilation. It does **not** prove that the host operating system kernel is actively enforcing CFG checks at runtime (which depends on OS version, kernel CFG configuration, and process mitigation policy).\n\n---\n\n### Part B: Authenticode Signature Inspection\n**Tool Executed**: `inspect_pe_certificates`  \n**Evidence ID**: `ev_fed1d0f0b677d97854e68733676b91abd4a7eef32bccbc3219e4f4cc45fb435a`\n\n#### Observed Facts:\n- **Security Directory (`IMAGE_DIRECTORY_ENTRY_SECURITY`)**: Absent (`table: null`, `entries: []`).\n- **Examined Certificates**: 0.\n\n#### Analysis & Pedagogical Insight:\nWhy does a critical Microsoft Windows system binary have no embedded Authenticode certificate?\n- **Catalog Signing**: Standard Windows OS binaries are typically not signed with embedded Authenticode tables to reduce on-disk bloat and simplify component servicing. Instead, their cryptographic hashes are stored in signed system catalog files (`.cat`) in `%SystemRoot%\\System32\\CatRoot`.\n- **Methodological Rule**: Never declare that a binary is \"unsigned\" simply because the embedded certificate table is absent. The correct scientific finding is: *\"IMAGE_DIRECTORY_ENTRY_SECURITY is absent. That is not proof the image is unsigned in every catalog or overlay sense.\"*\n\n---\n\n### Part C: Import Address Table & Imphash\n**Tool Executed**: `inspect_pe_imports`  \n**Evidence ID**: `ev_515646196e03c6708c6276554247bd25b03a9936ebb0f4d848f64ef3ec0329e2`\n\n#### Observed Facts:\n- **Total Imported DLLs**: 8 libraries (`msvcrt.dll`, `ATL.DLL`, `KERNEL32.dll`, `OLEAUT32.dll`, `ADVAPI32.dll`, `OLE32.dll`, `USER32.dll`, `mscoree.dll`).\n- **Total Imported APIs**: 131 functions.\n- **CLR Bootstrapper**: Imports `CorBindToRuntimeEx` from `mscoree.dll`, revealing that `powershell.exe` serves as a native native unmanaged host that initializes the .NET Common Language Runtime (CLR).\n- **Imphash**: `3d08f4848535206d772de145804ff4b6` (calculated via standard pefile ordering).\n\n---\n\n## 3. Clean-Room Architectural Reconstruction\n\nIn reverse engineering, reconstruction validates that you truly understand the parsed structures.\nSee [`reconstruction/mitigation-audit.ts`](reconstruction/mitigation-audit.ts) for a clean-room TypeScript parser that evaluates mitigation scores from raw Load Config and Import data.\n\n---\n\n## 4. Active-Recall Knowledge Check\n\nTest your understanding of this case study by reviewing the interactive quiz questions in the CyberTube viewer:\n1. *What does GuardFlags prove vs what does it infer?*\n2. *Why do standard Windows binaries lack embedded Authenticode tables?*\n3. *What does the presence of `mscoree.dll!CorBindToRuntimeEx` indicate about this executable?*\n",
      "reconstruction_code": "/**\n * CyberTube Clean-Room Reconstruction\n * Case 001: Windows PE Exploit Mitigation Auditor\n *\n * This module reconstructs the logic required to audit a PE binary's\n * compile-time exploit mitigations from normalized REA evidence data.\n */\n\nexport interface MitigationScore {\n  cfg_enabled: boolean;\n  cfg_target_count: number;\n  eh_continuation_enabled: boolean;\n  security_cookie_present: boolean;\n  delay_load_protected: boolean;\n  clr_bootstrapper: boolean;\n  imphash: string;\n  mitigation_level: 'High' | 'Medium' | 'Low' | 'Incomplete';\n  observations: string[];\n  inferences: string[];\n  limitations: string[];\n}\n\nexport function auditPeMitigations(\n  loadConfigEvidence: Record<string, any>,\n  importsEvidence: Record<string, any>\n): MitigationScore {\n  const normLoad = loadConfigEvidence.normalized_result?.load_config || {};\n  const normImports = importsEvidence.normalized_result || {};\n\n  const guardFlags: string[] = normLoad.guard_flags?.flags || [];\n  const cfgEnabled = guardFlags.includes('IMAGE_GUARD_CF_INSTRUMENTED');\n  const cfgTargets = normLoad.guard_cf_function_count || 0;\n  const ehContEnabled = guardFlags.includes('IMAGE_GUARD_EH_CONTINUATION_TABLE_PRESENT');\n  const cookiePresent = Boolean(normLoad.security_cookie?.va && normLoad.security_cookie.va !== '0x0');\n  const delayLoadProt = guardFlags.includes('IMAGE_GUARD_PROTECT_DELAYLOAD_IAT');\n\n  // Check for CLR bootstrap\n  const importsList: any[] = normImports.imports || [];\n  const clrBootstrapper = importsList.some(\n    (imp) => imp.name?.toLowerCase() === 'mscoree.dll' &&\n             imp.functions?.some((f: any) => f.name === 'CorBindToRuntimeEx')\n  );\n\n  const observations: string[] = [];\n  const inferences: string[] = [];\n  const limitations: string[] = [\n    ...(loadConfigEvidence.limitations || []),\n    ...(importsEvidence.limitations || [])\n  ];\n\n  // Observed facts\n  observations.push(`Load Config size: ${normLoad.size || 0} bytes`);\n  if (cookiePresent) {\n    observations.push(`Security Cookie (/GS) allocated at VA: ${normLoad.security_cookie.va}`);\n  }\n  if (cfgEnabled) {\n    observations.push(`GuardFlags contains IMAGE_GUARD_CF_INSTRUMENTED (raw: ${normLoad.guard_flags?.raw})`);\n    observations.push(`CFG target table contains ${cfgTargets} valid call targets`);\n  }\n  if (clrBootstrapper) {\n    observations.push('Import Table references mscoree.dll!CorBindToRuntimeEx (Native CLR Host)');\n  }\n\n  // Explicit inferences\n  if (cfgEnabled) {\n    inferences.push('Binary was compiled with MSVC /guard:cf flag. Runtime enforcement depends on host OS policy.');\n  }\n\n  // Mitigation rating\n  let level: MitigationScore['mitigation_level'] = 'Low';\n  if (cfgEnabled && cookiePresent && ehContEnabled) {\n    level = 'High';\n  } else if (cfgEnabled || cookiePresent) {\n    level = 'Medium';\n  }\n\n  return {\n    cfg_enabled: cfgEnabled,\n    cfg_target_count: cfgTargets,\n    eh_continuation_enabled: ehContEnabled,\n    security_cookie_present: cookiePresent,\n    delay_load_protected: delayLoadProt,\n    clr_bootstrapper: clrBootstrapper,\n    imphash: normImports.imphash?.md5 || 'N/A',\n    mitigation_level: level,\n    observations,\n    inferences,\n    limitations\n  };\n}\n"
    }
  ]
};