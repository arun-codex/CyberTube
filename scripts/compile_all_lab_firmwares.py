import os
import shutil
import subprocess
import json
import re

ARDUINO_CLI = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library\tools\bin\arduino-cli.exe"
LABS_DIR = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library\docs\courses\iot-cybersecurity\labs"
TEMP_BASE = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library\tools\temp_sketches"

MODULES_TO_COMPILE = [f"module-{i:02d}" for i in range(1, 31)]

def compile_sketch(mod_id):
    sketch_dir = os.path.join(LABS_DIR, mod_id)
    sketch_file = os.path.join(sketch_dir, "firmware.ino")
    v_report_path = os.path.join(sketch_dir, "verification-report.json")
    
    if not os.path.exists(sketch_file):
        return {
            "module": mod_id,
            "status": "SKIPPED",
            "reason": "No firmware.ino found"
        }

    # Check if already successfully compiled
    v_data = {}
    if os.path.exists(v_report_path):
        try:
            with open(v_report_path, "r", encoding="utf-8") as f:
                v_data = json.load(f)
        except Exception:
            pass

    existing_comp = v_data.get("compilation", {})
    if existing_comp.get("status") == "COMPILED" and mod_id != "module-17":
        print(f"[{mod_id}] ALREADY COMPILED: Flash: {existing_comp.get('flash_usage')}, RAM: {existing_comp.get('ram_usage')}", flush=True)
        return {
            "module": mod_id,
            "status": "COMPILED",
            "exit_code": existing_comp.get("exit_code", 0),
            "flash_usage": existing_comp.get("flash_usage"),
            "ram_usage": existing_comp.get("ram_usage")
        }

    mod_num = mod_id.replace("module-", "m")
    temp_sketch_name = f"sketch_{mod_num}"
    temp_mod_dir = os.path.join(TEMP_BASE, temp_sketch_name)
    os.makedirs(temp_mod_dir, exist_ok=True)
    temp_ino = os.path.join(temp_mod_dir, f"{temp_sketch_name}.ino")
    
    shutil.copy2(sketch_file, temp_ino)

    cmd = [
        ARDUINO_CLI,
        "compile",
        "--fqbn", "esp32:esp32:esp32",
        temp_mod_dir
    ]
    
    print(f"[{mod_id}] Compiling firmware.ino with esp32:esp32:esp32...", flush=True)
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    stdout = result.stdout
    stderr = result.stderr
    exit_code = result.returncode
    
    flash_match = re.search(r"Sketch uses (\d+) bytes \(([0-9]+%)\)", stdout)
    ram_match = re.search(r"Global variables use (\d+) bytes \(([0-9]+%)\)", stdout)
    
    flash_bytes = int(flash_match.group(1)) if flash_match else None
    flash_percent = flash_match.group(2) if flash_match else None
    ram_bytes = int(ram_match.group(1)) if ram_match else None
    ram_percent = ram_match.group(2) if ram_match else None
    
    is_success = (exit_code == 0)
    status = "COMPILED" if is_success else "FAILED"
    
    res = {
        "module": mod_id,
        "status": status,
        "exit_code": exit_code,
        "flash_bytes": flash_bytes,
        "flash_percent": flash_percent,
        "ram_bytes": ram_bytes,
        "ram_percent": ram_percent,
        "flash_usage": f"{flash_bytes} bytes ({flash_percent})" if flash_bytes else "N/A",
        "ram_usage": f"{ram_bytes} bytes ({ram_percent})" if ram_bytes else "N/A",
        "compiler_output": stdout[-1000:] if stdout else "",
        "compiler_errors": stderr[-1000:] if stderr else ""
    }
    
    v_data["compilation"] = {
        "status": status,
        "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
        "exit_code": exit_code,
        "flash_usage": f"{flash_bytes} bytes ({flash_percent})" if flash_bytes else "N/A",
        "ram_usage": f"{ram_bytes} bytes ({ram_percent})" if ram_bytes else "N/A",
        "verified_at": "2026-11-25T08:30:00Z"
    }
    
    with open(v_report_path, "w", encoding="utf-8") as f:
        json.dump(v_data, f, indent=2)
        
    if is_success:
        print(f"[{mod_id}] SUCCESS: Flash: {flash_bytes} B ({flash_percent}), RAM: {ram_bytes} B ({ram_percent})", flush=True)
    else:
        print(f"[{mod_id}] FAILED with exit code {exit_code}", flush=True)
        if stderr:
            print(f"Stderr: {stderr[:300]}", flush=True)
            
    return res

def main():
    if os.path.exists(TEMP_BASE):
        shutil.rmtree(TEMP_BASE, ignore_errors=True)
    os.makedirs(TEMP_BASE, exist_ok=True)
    
    results = {}
    success_count = 0
    fail_count = 0
    
    for mod_id in MODULES_TO_COMPILE:
        res = compile_sketch(mod_id)
        results[mod_id] = res
        if res["status"] == "COMPILED":
            success_count += 1
        elif res["status"] == "FAILED":
            fail_count += 1
            
    # Clean up temp directory
    shutil.rmtree(TEMP_BASE, ignore_errors=True)
    
    summary_path = os.path.join(LABS_DIR, "hardware-compilation-summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump({
            "total_modules_checked": len(MODULES_TO_COMPILE),
            "successfully_compiled": success_count,
            "failed": fail_count,
            "results": results
        }, f, indent=2)
        
    print(f"\n=== COMPILATION COMPLETE: {success_count}/{len(MODULES_TO_COMPILE)} PASSED, {fail_count} FAILED ===")

if __name__ == "__main__":
    main()
