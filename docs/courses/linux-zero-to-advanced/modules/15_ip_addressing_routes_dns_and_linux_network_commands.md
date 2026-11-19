# Module 15: IP addressing, routes, DNS and Linux network commands
**Level:** Intermediate  |  **Phase:** Networking and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 14

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [ip command — Learn Linux TV](https://www.youtube.com/watch?v=wHfIFZlDxtU)
2. [ss command — Learn Linux TV](https://www.youtube.com/watch?v=phY8Q7Woxsw)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain interface and address information
- [ ] Read routing and DNS information
- [ ] Inspect listening ports and established sockets
- [ ] Troubleshoot a simple DNS or connectivity issue

## Detailed lesson checklist
- [ ] **Lesson 1:** Loopback and Ethernet interfaces. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** IPv4 CIDR basics. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Routing table and default gateway. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** DNS resolvers and `dig`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** TCP/UDP sockets via `ss`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** `ping` and `tracepath`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** NetworkManager and systemd-resolved overview. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
ip -br addr
ip route
resolvectl status
ss -tulpen
dig example.com
ping -c 3 1.1.1.1
```

## Hands-on lab: step-by-step instructions
1. Inspect assigned interfaces and write down your VM IP address and default gateway.
2. Use `ip route` to identify the default route.
3. Use `resolvectl status` or `/etc/resolv.conf` to inspect DNS settings.
4. Query `example.com` with `dig` and distinguish DNS success from ICMP success.
5. List listening ports with `ss -tulpen` and identify local processes where permitted.
6. Disable the virtual NIC temporarily in the VM GUI, observe command failures, then restore it.

## Expected results / self-check
- [ ] Identify active interface, IP, route and resolver
- [ ] Explain a listening versus established socket
- [ ] Restore connectivity after the lab

## Common mistakes and troubleshooting
- **Watch for:** Equating DNS failure with all network failure.
- **Watch for:** Assuming ping must work for a service to work.
- **Watch for:** Changing network settings on your host instead of VM.

## Challenge assignment
Explain the difference between a local interface address and the default gateway.

## Knowledge check
1. What is a default route?
2. What does `ss -l` show?
3. Why might ping fail when HTTPS works?

## Free documentation and references
- [ip-route2 manpages](https://man7.org/linux/man-pages/man8/ip.8.html)
- [Ubuntu networking](https://ubuntu.com/server/docs/network-configuration)

## What to submit before moving on
- A file named `module-15-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
