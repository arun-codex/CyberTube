import os
import struct
import time
import hashlib
import json

os.makedirs('public/pcaps/iot', exist_ok=True)

# Standard Libpcap File Format:
# Magic number: 0xa1b2c3d4 (identical endian)
# Version: 2.4
# Thiszone: 0
# Sigfigs: 0
# Snaplen: 65535
# Linktype: 1 (LINKTYPE_ETHERNET)

def create_pcap_header():
    return struct.pack('<IHHIIII', 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1)

def create_pcap_record(packet_bytes, timestamp_sec=None, timestamp_usec=0):
    if timestamp_sec is None:
        timestamp_sec = int(time.time())
    length = len(packet_bytes)
    header = struct.pack('<IIII', timestamp_sec, timestamp_usec, length, length)
    return header + packet_bytes

def make_ethernet_ip_udp(src_mac, dst_mac, src_ip, dst_ip, src_port, dst_port, payload_bytes):
    # Ethernet Header (14 bytes)
    eth = bytes.fromhex(dst_mac.replace(':', '')) + bytes.fromhex(src_mac.replace(':', '')) + struct.pack('>H', 0x0800)
    
    # IPv4 Header (20 bytes)
    total_ip_len = 20 + 8 + len(payload_bytes)
    ip_src_b = bytes([int(x) for x in src_ip.split('.')])
    ip_dst_b = bytes([int(x) for x in dst_ip.split('.')])
    ip = struct.pack('>BBHHHBBH', 0x45, 0, total_ip_len, 0x1234, 0x4000, 64, 17, 0) + ip_src_b + ip_dst_b
    
    # UDP Header (8 bytes)
    udp_len = 8 + len(payload_bytes)
    udp = struct.pack('>HHHH', src_port, dst_port, udp_len, 0)
    
    return eth + ip + udp + payload_bytes

def make_ethernet_ip_tcp(src_mac, dst_mac, src_ip, dst_ip, src_port, dst_port, payload_bytes, seq=1000, ack=2000, flags=0x18):
    # Ethernet Header (14 bytes)
    eth = bytes.fromhex(dst_mac.replace(':', '')) + bytes.fromhex(src_mac.replace(':', '')) + struct.pack('>H', 0x0800)
    
    # IPv4 Header (20 bytes)
    total_ip_len = 20 + 20 + len(payload_bytes)
    ip_src_b = bytes([int(x) for x in src_ip.split('.')])
    ip_dst_b = bytes([int(x) for x in dst_ip.split('.')])
    ip = struct.pack('>BBHHHBBH', 0x45, 0, total_ip_len, 0x5678, 0x4000, 64, 6, 0) + ip_src_b + ip_dst_b
    
    # TCP Header (20 bytes)
    tcp = struct.pack('>HHIIBBHHH', src_port, dst_port, seq, ack, (5 << 4), flags, 65535, 0, 0)
    
    return eth + ip + tcp + payload_bytes

print("--- GENERATING 30 GENUINE IOT PCAP FILES ---")
pcap_metadata = {}

base_time = 1732500000

for m in range(1, 31):
    m_str = f"{m:02d}"
    filename = f"iot-lab-m{m_str}-telemetry.pcap"
    filepath = os.path.join('public', 'pcaps', 'iot', filename)
    
    records = []
    t = base_time + m * 3600
    
    # 1. ARP announcement / Gateway probe
    arp_pkt = (bytes.fromhex('ffffffffffff') + bytes.fromhex('240ac4123456') +
               struct.pack('>H', 0x0806) +
               struct.pack('>HHBBH', 1, 0x0800, 6, 4, 1) +
               bytes.fromhex('240ac4123456') + bytes([192, 168, 1, 100 + m]) +
               bytes.fromhex('000000000000') + bytes([192, 168, 1, 1]))
    records.append(create_pcap_record(arp_pkt, t, 10000))
    
    # 2. DNS query for iot.broker.lab
    dns_query = b'\x12\x34\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x03iot\x06broker\x03lab\x00\x00\x01\x00\x01'
    pkt2 = make_ethernet_ip_udp('24:0a:c4:12:34:56', '00:11:22:33:44:55',
                               f'192.168.1.{100+m}', '192.168.1.1', 54321, 53, dns_query)
    records.append(create_pcap_record(pkt2, t + 1, 25000))
    
    # 3. Protocol-specific payload tailored to module
    if m in [8, 10, 13, 26, 30]:
        # MQTT PUBLISH telemetry payload
        topic = f"smartroom/m{m_str}/sensor/telemetry".encode('utf-8')
        payload = f'{{"device":"esp32-node-{m_str}","temp":24.5,"humidity":48.2,"status":"secure","vcc":3.3}}'.encode('utf-8')
        mqtt_packet = bytes([0x30, len(topic) + 2 + len(payload)]) + struct.pack('>H', len(topic)) + topic + payload
        pkt3 = make_ethernet_ip_tcp('24:0a:c4:12:34:56', '00:11:22:33:44:55',
                                   f'192.168.1.{100+m}', '192.168.1.10', 49152, 1883, mqtt_packet, seq=1001, ack=2001)
        records.append(create_pcap_record(pkt3, t + 2, 50000))
    elif m in [9, 18, 23]:
        # HTTP GET /api/v1/status
        http_data = f"GET /api/v1/telemetry HTTP/1.1\r\nHost: 192.168.1.{100+m}\r\nUser-Agent: IoT-Monitor-Agent\r\nAccept: application/json\r\n\r\n".encode('utf-8')
        pkt3 = make_ethernet_ip_tcp('00:11:22:33:44:55', '24:0a:c4:12:34:56',
                                   '192.168.1.50', f'192.168.1.{100+m}', 51234, 80, http_data, seq=1001, ack=2001)
        records.append(create_pcap_record(pkt3, t + 2, 50000))
    elif m in [28]:
        # Modbus/TCP Read Holding Registers
        modbus_req = struct.pack('>HHHBBHH', 1, 0, 6, 1, 3, 0, 10)
        pkt3 = make_ethernet_ip_tcp('00:11:22:33:44:55', '24:0a:c4:12:34:56',
                                   '192.168.1.50', f'192.168.1.{100+m}', 51234, 502, modbus_req, seq=1001, ack=2001)
        records.append(create_pcap_record(pkt3, t + 2, 50000))
    elif m in [25]:
        # Mirai Syn scan probe on port 23
        syn_pkt = make_ethernet_ip_tcp('aa:bb:cc:dd:ee:ff', '24:0a:c4:12:34:56',
                                      '198.51.100.25', f'192.168.1.{100+m}', 43210, 23, b'', seq=1001, ack=0, flags=0x02)
        records.append(create_pcap_record(syn_pkt, t + 2, 50000))
    else:
        # Standard device health heartbeat
        heartbeat = f'{{"node":"esp32-m{m_str}","boot_count":1,"uptime_s":360,"logic_v":3.29,"tamper":false}}'.encode('utf-8')
        pkt3 = make_ethernet_ip_udp('24:0a:c4:12:34:56', '00:11:22:33:44:55',
                                   f'192.168.1.{100+m}', '192.168.1.1', 49152, 9000, heartbeat)
        records.append(create_pcap_record(pkt3, t + 2, 50000))
        
    pcap_data = create_pcap_header() + b''.join(records)
    
    with open(filepath, 'wb') as f:
        f.write(pcap_data)
        
    sha256 = hashlib.sha256(pcap_data).hexdigest()
    file_size = len(pcap_data)
    
    pcap_metadata[m] = {
        'fileName': filename,
        'fileUrl': f"/pcaps/iot/{filename}",
        'sha256': sha256,
        'sizeBytes': file_size,
        'packetCount': len(records)
    }
    print(f"Generated {filename} ({file_size} bytes, {len(records)} packets) -> SHA256: {sha256[:16]}...")

with open('scripts/iot_pcap_manifest.json', 'w', encoding='utf-8') as f:
    json.dump(pcap_metadata, f, indent=2)

print("\nSuccessfully generated all 30 genuine IoT PCAP files in public/pcaps/iot/!")
