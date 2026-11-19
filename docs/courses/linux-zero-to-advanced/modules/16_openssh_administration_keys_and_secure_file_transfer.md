# Module 16: OpenSSH administration, keys and secure file transfer
**Level:** Intermediate  |  **Phase:** Networking and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 15

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Public key authentication — Learn Linux TV](https://www.youtube.com/watch?v=bfwfRCCFTVI)
2. [scp command — Learn Linux TV](https://www.youtube.com/watch?v=Aa7tKMmeFZI)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Use SSH for remote Linux shell access
- [ ] Distinguish password and public-key authentication
- [ ] Transfer files securely with scp and sftp
- [ ] Inspect SSH service configuration and logs

## Detailed lesson checklist
- [ ] **Lesson 1:** SSH client/server roles. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Host keys and known_hosts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Private/public key pairs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `authorized_keys` and correct permissions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `ssh -v` troubleshooting. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** SCP/SFTP file transfer. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Avoid exposing SSH unnecessarily. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
ssh -V
ssh-keygen -t ed25519 -f ~/linux-course/16-labkey
ls -l ~/linux-course/16-labkey*
systemctl status ssh --no-pager
ss -tln | grep :22 || true
```

## Hands-on lab: step-by-step instructions
1. Use two disposable Linux VMs or localhost; install `openssh-server` only if needed.
2. Generate a **disposable practice key** in your course folder; do not overwrite an existing real key.
3. Confirm the SSH daemon is listening; inspect `/etc/ssh/sshd_config` read-only.
4. Copy only the public key to an authorized test account using `ssh-copy-id` or manual practice.
5. Connect over SSH and use `scp` to transfer a harmless text file.
6. Record how file permissions protect the private key and how to revoke a test key.

## Expected results / self-check
- [ ] SSH session uses the expected target VM
- [ ] Transferred file has correct contents
- [ ] Private key never included in submitted screenshots or reports

## Common mistakes and troubleshooting
- **Watch for:** Publishing a private key in GitHub.
- **Watch for:** Disabling password authentication before confirming key access.
- **Watch for:** Changing production SSH settings without console fallback.

## Challenge assignment
Explain how to verify an SSH host key fingerprint securely.

## Knowledge check
1. Which key is secret?
2. What is known_hosts?
3. What is the difference between scp and rsync over SSH?

## Free documentation and references
- [OpenSSH documentation](https://www.openssh.com/manual.html)
- [Ubuntu OpenSSH server](https://ubuntu.com/server/docs/service-openssh)

## What to submit before moving on
- A file named `module-16-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
