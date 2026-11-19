# LAB_SETUP — Your Linux-only practice environment

## 1. What you need
- Windows, macOS, or Linux host computer; Windows is fine as the **host** but the entire training course runs inside Linux.
- Preferred hardware: 16 GB RAM and 80+ GB available disk; 8 GB RAM can work for one VM with reduced allocation.
- Download **Ubuntu Desktop**: https://ubuntu.com/download/desktop
- Download **VirtualBox**: https://www.virtualbox.org/wiki/Downloads
- Official Ubuntu VM guide: https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox
- YouTube setup/intro video: https://www.youtube.com/watch?v=6EKzuBAEbOA
- Second Linux VM installation series: https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK

## 2. Initial VM settings
1. Install VirtualBox on your computer.
2. Create a VM called `LinuxCourse-Ubuntu` with the official Ubuntu ISO.
3. Assign around 2 CPU cores, 4 GiB RAM if the host can spare it, and a dynamically allocated virtual disk of approximately 25–35 GB. Keep adequate memory for the host.
4. Choose NAT networking initially. Install Ubuntu onto the VM **virtual disk**, not the physical host disk.
5. Run Ubuntu normally and open the Terminal.
6. Take a baseline snapshot: `week-00-clean-install`.

## 3. Basic first commands
```bash
whoami
pwd
uname -a
cat /etc/os-release
lsblk -f
ip -br addr
mkdir -p ~/linux-course/{notes,labs,reports,backups}
```

## 4. Safe lab boundaries
- All regular lab output should live under `~/linux-course/`.
- Keep a new VM snapshot at the start of Modules 6, 11, 12, 16, 17, 22 and 23.
- For disk formatting, LVM or LUKS, create a **separate blank virtual disk** attached to a throwaway VM; do not format an existing disk.
- For SSH, practice between two owned VMs or against localhost. Preserve a console login before making any SSH changes.
- For UFW, write allow rules for your own SSH test path **before** enabling a blocking rule, and confirm access from the console.
- Never upload secrets, live authentication logs or private keys to a public Git repository.

## 5. Lab evidence template
For each module create a note file:
```text
Module:
Video(s) watched:
Commands practised:
Expected result:
Actual result:
Failure and fix:
Screenshot/transcript filename:
Quiz answers:
```

## 6. No powerful computer?
Run a single Ubuntu VM, choose 2 GiB RAM if necessary, and skip parallel-VM exercises until you have suitable hardware. Some advanced labs may require more resources; observe commands and document design instead of risking your host.
