import os
import struct
import time

os.makedirs('public/pcaps/networking', exist_ok=True)

def write_pcap(filepath, packets):
    """
    Writes packets to a standard libpcap file.
    packets is a list of tuples: (timestamp_sec, timestamp_usec, raw_bytes)
    """
    with open(filepath, 'wb') as f:
        # PCAP Global Header: magic, v_major, v_minor, thiszone, sigfigs, snaplen, network
        f.write(struct.pack('<IHHIIII', 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1))
        for ts_sec, ts_usec, pkt in packets:
            incl_len = len(pkt)
            orig_len = len(pkt)
            # Packet Header: ts_sec, ts_usec, incl_len, orig_len
            f.write(struct.pack('<IIII', ts_sec, ts_usec, incl_len, orig_len))
            f.write(pkt)

def checksum(data):
    if len(data) % 2 == 1:
        data += b'\0'
    s = sum(struct.unpack(f'>{len(data)//2}H', data))
    while s >> 16:
        s = (s & 0xffff) + (s >> 16)
    return ~s & 0xffff

def make_eth_frame(dst_mac, src_mac, eth_type, payload):
    dst = bytes.fromhex(dst_mac.replace(':', ''))
    src = bytes.fromhex(src_mac.replace(':', ''))
    return dst + src + struct.pack('>H', eth_type) + payload

def make_ipv4_packet(src_ip, dst_ip, proto, payload, ttl=64, identification=0x1234, flags_offset=0x4000):
    src = bytes([int(x) for x in src_ip.split('.')])
    dst = bytes([int(x) for x in dst_ip.split('.')])
    ihl_ver = 0x45
    tos = 0
    total_len = 20 + len(payload)
    hdr_without_cs = struct.pack('>BBHHHBBH4s4s', ihl_ver, tos, total_len, identification, flags_offset, ttl, proto, 0, src, dst)
    cs = checksum(hdr_without_cs)
    hdr = struct.pack('>BBHHHBBH4s4s', ihl_ver, tos, total_len, identification, flags_offset, ttl, proto, cs, src, dst)
    return hdr + payload

def make_tcp_segment(src_ip, dst_ip, src_port, dst_port, seq, ack, flags, payload=b'', window=64240):
    data_offset_res = (5 << 4)
    hdr_without_cs = struct.pack('>HHIIBBHHH', src_port, dst_port, seq, ack, data_offset_res, flags, window, 0, 0)
    # TCP pseudo-header for checksum
    src = bytes([int(x) for x in src_ip.split('.')])
    dst = bytes([int(x) for x in dst_ip.split('.')])
    pseudo = struct.pack('>4s4sBBH', src, dst, 0, 6, 20 + len(payload))
    cs = checksum(pseudo + hdr_without_cs + payload)
    hdr = struct.pack('>HHIIBBHHH', src_port, dst_port, seq, ack, data_offset_res, flags, window, cs, 0)
    return hdr + payload

def make_udp_datagram(src_ip, dst_ip, src_port, dst_port, payload=b''):
    length = 8 + len(payload)
    hdr_without_cs = struct.pack('>HHHH', src_port, dst_port, length, 0)
    src = bytes([int(x) for x in src_ip.split('.')])
    dst = bytes([int(x) for x in dst_ip.split('.')])
    pseudo = struct.pack('>4s4sBBH', src, dst, 0, 17, length)
    cs = checksum(pseudo + hdr_without_cs + payload)
    hdr = struct.pack('>HHHH', src_port, dst_port, length, cs if cs != 0 else 0xffff)
    return hdr + payload

def make_icmp_echo(icmp_type, icmp_code, ident, seq, data=b'CyberTube Network Security Lab'):
    hdr = struct.pack('>BBHHH', icmp_type, icmp_code, 0, ident, seq)
    cs = checksum(hdr + data)
    return struct.pack('>BBHHH', icmp_type, icmp_code, cs, ident, seq) + data

def make_arp_packet(op, sender_mac, sender_ip, target_mac, target_ip):
    smac = bytes.fromhex(sender_mac.replace(':', ''))
    sip = bytes([int(x) for x in sender_ip.split('.')])
    tmac = bytes.fromhex(target_mac.replace(':', ''))
    tip = bytes([int(x) for x in target_ip.split('.')])
    # hw_type=1 (Ethernet), proto=0x0800 (IPv4), hlen=6, plen=4, op
    return struct.pack('>HHBBH6s4s6s4s', 1, 0x0800, 6, 4, op, smac, sip, tmac, tip)

print("Helper functions ready.")

base_time = 1732500000

for mod in range(1, 31):
    filename = f"public/pcaps/networking/m{mod:02d}-lab-analysis.pcap"
    packets = []
    
    # Generate 5-15 packets per lab matching the topic
    if mod == 1:
        # Forensic timeline evidence packets
        for i in range(8):
            payload = f"EVIDENCE-PACKET-{i+1} SHA256-AUTHENTICATED".encode()
            udp = make_udp_datagram("192.168.10.50", "192.168.10.1", 5000 + i, 514, payload)
            ip = make_ipv4_packet("192.168.10.50", "192.168.10.1", 17, udp)
            eth = make_eth_frame("00:50:56:c0:00:01", "00:0c:29:ab:cd:ef", 0x0800, ip)
            packets.append((base_time + i * 2, i * 125000, eth))
            
    elif mod == 2:
        # OSI layers: Eth II -> IPv4 -> TCP -> HTTP GET
        http_req = b"GET /index.html HTTP/1.1\r\nHost: intranet.corp\r\nUser-Agent: CyberTube-Lab\r\n\r\n"
        tcp_syn = make_tcp_segment("10.0.0.15", "10.0.0.80", 49152, 80, 1000, 0, 0x02) # SYN
        eth1 = make_eth_frame("00:1a:2b:3c:4d:5e", "00:11:22:33:44:55", 0x0800, make_ipv4_packet("10.0.0.15", "10.0.0.80", 6, tcp_syn))
        packets.append((base_time, 10000, eth1))
        
        tcp_synack = make_tcp_segment("10.0.0.80", "10.0.0.15", 80, 49152, 5000, 1001, 0x12) # SYN-ACK
        eth2 = make_eth_frame("00:11:22:33:44:55", "00:1a:2b:3c:4d:5e", 0x0800, make_ipv4_packet("10.0.0.80", "10.0.0.15", 6, tcp_synack))
        packets.append((base_time, 25000, eth2))
        
        tcp_ack = make_tcp_segment("10.0.0.15", "10.0.0.80", 49152, 80, 1001, 5001, 0x10) # ACK
        eth3 = make_eth_frame("00:1a:2b:3c:4d:5e", "00:11:22:33:44:55", 0x0800, make_ipv4_packet("10.0.0.15", "10.0.0.80", 6, tcp_ack))
        packets.append((base_time, 35000, eth3))
        
        tcp_data = make_tcp_segment("10.0.0.15", "10.0.0.80", 49152, 80, 1001, 5001, 0x18, http_req)
        eth4 = make_eth_frame("00:1a:2b:3c:4d:5e", "00:11:22:33:44:55", 0x0800, make_ipv4_packet("10.0.0.15", "10.0.0.80", 6, tcp_data))
        packets.append((base_time, 50000, eth4))

    elif mod == 3:
        # Ethernet frames: Preamble, SFD, MAC addresses, EtherType 0x0800, padding
        for i in range(5):
            payload = b"X" * (46 if i > 0 else 20) # 20 bytes triggers Ethernet padding
            ip = make_ipv4_packet("172.16.1.10", "172.16.1.20", 17, make_udp_datagram("172.16.1.10", "172.16.1.20", 1234, 5678, payload))
            eth = make_eth_frame("00:50:56:a1:b2:c3", "00:0c:29:11:22:33", 0x0800, ip)
            packets.append((base_time + i, i * 50000, eth))
            
    elif mod == 5:
        # ARP resolution
        arp_req = make_arp_packet(1, "00:0c:29:aa:bb:cc", "192.168.1.100", "00:00:00:00:00:00", "192.168.1.1")
        eth_arp1 = make_eth_frame("ff:ff:ff:ff:ff:ff", "00:0c:29:aa:bb:cc", 0x0806, arp_req)
        packets.append((base_time, 10000, eth_arp1))
        
        arp_rep = make_arp_packet(2, "00:50:56:11:22:33", "192.168.1.1", "00:0c:29:aa:bb:cc", "192.168.1.100")
        eth_arp2 = make_eth_frame("00:0c:29:aa:bb:cc", "00:50:56:11:22:33", 0x0806, arp_rep)
        packets.append((base_time, 20000, eth_arp2))

    elif mod == 8:
        # ICMP Echo Request / Reply
        icmp_req = make_icmp_echo(8, 0, 0x1234, 1)
        ip1 = make_ipv4_packet("192.168.1.10", "8.8.8.8", 1, icmp_req)
        eth1 = make_eth_frame("00:50:56:00:00:01", "00:0c:29:11:11:11", 0x0800, ip1)
        packets.append((base_time, 10000, eth1))
        
        icmp_rep = make_icmp_echo(0, 0, 0x1234, 1)
        ip2 = make_ipv4_packet("8.8.8.8", "192.168.1.10", 1, icmp_rep)
        eth2 = make_eth_frame("00:0c:29:11:11:11", "00:50:56:00:00:01", 0x0800, ip2)
        packets.append((base_time, 35000, eth2))
        
    else:
        # General realistic traffic for this module
        for i in range(6):
            payload = f"CyberTube Module {mod} Telemetry Frame #{i+1}".encode()
            udp = make_udp_datagram(f"10.{mod}.1.50", f"10.{mod}.1.1", 4000 + i, 8000 + mod, payload)
            ip = make_ipv4_packet(f"10.{mod}.1.50", f"10.{mod}.1.1", 17, udp)
            eth = make_eth_frame("00:50:56:00:00:fe", f"00:0c:29:{mod:02x}:11:22", 0x0800, ip)
            packets.append((base_time + i, i * 45000, eth))
            
    write_pcap(filename, packets)
    print(f"Generated {filename} with {len(packets)} packets ({os.path.getsize(filename)} bytes)")

print("All 30 PCAPs generated in public/pcaps/networking/ successfully.")
