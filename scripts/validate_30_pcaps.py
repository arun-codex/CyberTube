import os
import shutil
import hashlib
import struct
import json

PUBLIC_PCAP_DIR = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library\public\pcaps\iot"
LABS_DIR = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library\docs\courses\iot-cybersecurity\labs"

def parse_pcap(filepath):
    if not os.path.exists(filepath):
        return {"exists": False, "error": "File not found"}

    file_size = os.path.getsize(filepath)
    with open(filepath, "rb") as f:
        data = f.read()

    sha256 = hashlib.sha256(data).hexdigest()

    if len(data) < 24:
        return {"exists": True, "valid_pcap": False, "size_bytes": file_size, "sha256": sha256, "error": "File too small for PCAP header"}

    magic = data[:4]
    if magic == b'\xd4\xc3\xb2\xa1': # Little endian
        endian = '<'
    elif magic == b'\xa1\xb2\xc3\xd4': # Big endian
        endian = '>'
    elif magic == b'\x4d\x3c\xb2\xa1' or magic == b'\xa1\xb2\x3c\x4d': # Nanosecond pcap
        endian = '<' if magic == b'\x4d\x3c\xb2\xa1' else '>'
    elif magic == b'\x0a\x0d\x0d\x0a': # pcapng
        return {
            "exists": True,
            "format": "pcapng",
            "size_bytes": file_size,
            "sha256": sha256,
            "valid_pcap": True,
            "packet_count": "pcapng_container"
        }
    else:
        return {"exists": True, "valid_pcap": False, "size_bytes": file_size, "sha256": sha256, "error": f"Invalid PCAP magic: {magic.hex()}"}

    ver_major, ver_minor, thiszone, sigfigs, snaplen, network = struct.unpack(f"{endian}HHIIII", data[4:24])
    
    offset = 24
    packet_count = 0
    protocols_detected = set()
    
    while offset + 16 <= len(data):
        ts_sec, ts_usec, incl_len, orig_len = struct.unpack(f"{endian}IIII", data[offset:offset+16])
        offset += 16
        if offset + incl_len > len(data):
            break
        pkt_data = data[offset:offset+incl_len]
        offset += incl_len
        packet_count += 1
        
        if network == 1 and len(pkt_data) >= 14:
            eth_type = struct.unpack("!H", pkt_data[12:14])[0]
            if eth_type == 0x0800: # IPv4
                protocols_detected.add("IPv4")
                if len(pkt_data) >= 34:
                    proto = pkt_data[23]
                    if proto == 6: # TCP
                        protocols_detected.add("TCP")
                        if len(pkt_data) >= 54:
                            sport, dport = struct.unpack("!HH", pkt_data[34:38])
                            if sport == 1883 or dport == 1883:
                                protocols_detected.add("MQTT")
                            elif sport == 8883 or dport == 8883:
                                protocols_detected.add("MQTT-TLS")
                            elif sport == 80 or dport == 80:
                                protocols_detected.add("HTTP")
                            elif sport == 443 or dport == 443:
                                protocols_detected.add("HTTPS/TLS")
                            elif sport == 22 or dport == 22:
                                protocols_detected.add("SSH")
                    elif proto == 17: # UDP
                        protocols_detected.add("UDP")
                        if len(pkt_data) >= 42:
                            sport, dport = struct.unpack("!HH", pkt_data[34:38])
                            if sport == 53 or dport == 53:
                                protocols_detected.add("DNS")
                            elif sport == 67 or dport == 68:
                                protocols_detected.add("DHCP")
                            elif sport == 123 or dport == 123:
                                protocols_detected.add("NTP")
                            elif sport == 5683 or dport == 5683:
                                protocols_detected.add("CoAP")
                    elif proto == 1:
                        protocols_detected.add("ICMP")
            elif eth_type == 0x0806:
                protocols_detected.add("ARP")
            elif eth_type == 0x86dd:
                protocols_detected.add("IPv6")

    return {
        "exists": True,
        "valid_pcap": True,
        "format": "libpcap",
        "version": f"{ver_major}.{ver_minor}",
        "snaplen": snaplen,
        "linktype": network,
        "packet_count": packet_count,
        "size_bytes": file_size,
        "sha256": sha256,
        "protocols": sorted(list(protocols_detected))
    }

def main():
    report = {}
    total_valid = 0
    total_packets = 0
    
    for mod_num in range(1, 31):
        mod_id = f"module-{mod_num:02d}"
        mod_dir = os.path.join(LABS_DIR, mod_id)
        evidence_dir = os.path.join(mod_dir, "evidence")
        os.makedirs(evidence_dir, exist_ok=True)
        
        # Check in public directory first
        pcap_candidates = [
            os.path.join(PUBLIC_PCAP_DIR, f"iot-lab-m{mod_num:02d}-telemetry.pcap"),
            os.path.join(PUBLIC_PCAP_DIR, f"iot-lab-m{mod_num:02d}.pcap"),
        ]
        
        source_pcap = None
        for cand in pcap_candidates:
            if os.path.exists(cand):
                source_pcap = cand
                break
                
        if not source_pcap:
            # Check inside evidence dir
            for f in os.listdir(evidence_dir):
                if f.endswith(".pcap"):
                    source_pcap = os.path.join(evidence_dir, f)
                    break
                    
        if source_pcap:
            target_evidence_pcap = os.path.join(evidence_dir, os.path.basename(source_pcap))
            if not os.path.exists(target_evidence_pcap) or os.path.getsize(target_evidence_pcap) != os.path.getsize(source_pcap):
                shutil.copy2(source_pcap, target_evidence_pcap)
                
            res = parse_pcap(source_pcap)
            res["filename"] = os.path.basename(source_pcap)
            res["public_path"] = f"/pcaps/iot/{os.path.basename(source_pcap)}"
            report[mod_id] = res
            if res.get("valid_pcap"):
                total_valid += 1
                if isinstance(res.get("packet_count"), int):
                    total_packets += res["packet_count"]
        else:
            report[mod_id] = {"exists": False, "error": f"No pcap file found for module {mod_num:02d}"}

    output_path = os.path.join(LABS_DIR, "pcap-validation-report.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "total_modules": 30,
            "valid_pcaps_found": total_valid,
            "total_packets_parsed": total_packets,
            "modules": report
        }, f, indent=2)

    print(f"PCAP Validation Complete: {total_valid}/30 modules have verified valid PCAPs. Total packets: {total_packets}")

if __name__ == "__main__":
    main()
