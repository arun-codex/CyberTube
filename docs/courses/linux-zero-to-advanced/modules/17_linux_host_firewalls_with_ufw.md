# Module 17: Linux host firewalls with UFW
**Level:** Intermediate  |  **Phase:** Networking and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 16

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [UFW Made Easy — Learn Linux TV](https://www.youtube.com/watch?v=F-ubkT1WNFk)
2. [ss command — Learn Linux TV](https://www.youtube.com/watch?v=phY8Q7Woxsw)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain inbound versus outbound policy
- [ ] Inspect UFW configuration
- [ ] Test least-privilege access to a lab service
- [ ] Understand how to avoid SSH lockouts

## Detailed lesson checklist
- [ ] **Lesson 1:** Netfilter/nftables concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** UFW interface on Ubuntu. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Allow/deny rules. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Default inbound policy. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Rules by port and source. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Firewall logging. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Testing and rollback. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
sudo ufw status verbose
ss -tulpen
sudo ufw show added
sudo ufw status numbered
sudo journalctl -k -n 20 --no-pager
```

## Hands-on lab: step-by-step instructions
1. Take a VM snapshot and confirm you have access to the VM console.
2. Inspect listening services with `ss` before enabling the firewall.
3. Watch the UFW tutorial and write intended allow rules for the actual local lab services.
4. If testing SSH remotely, allow its required test connection BEFORE enabling a deny-by-default inbound policy.
5. Enable and test UFW in a disposable VM only; validate that desired traffic is allowed and unwanted access is denied.
6. Document every rule and either reset the disposable VM snapshot or leave the correct known-safe configuration in place.

## Expected results / self-check
- [ ] Firewall status is documented before and after
- [ ] Expected services remain available
- [ ] Unnecessary inbound connectivity is blocked within lab

## Common mistakes and troubleshooting
- **Watch for:** Locking yourself out of a remote VM.
- **Watch for:** Assuming disabling UFW removes all firewall layers.
- **Watch for:** Using broad allow-any rules without a reason.

## Challenge assignment
Recreate a small ruleset from a written network access policy.

## Knowledge check
1. What is default deny inbound?
2. Why test firewall changes from the console?
3. How does UFW relate to netfilter?

## Free documentation and references
- [Ubuntu firewall documentation](https://ubuntu.com/server/docs/firewalls)
- [nftables wiki](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)

## What to submit before moving on
- A file named `module-17-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** FIREWALL SAFETY: Use a VM snapshot and console access; never apply untested deny rules to a production or remotely managed machine.
