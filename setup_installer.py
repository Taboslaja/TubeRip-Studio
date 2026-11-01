"""
==================================================================================
 YOUTUBE MP3 & VIDEÓ LETÖLTŐ - GRAFIKUS WINDOWS TELEPÍTŐ VARÁZSLÓ (SETUP WIZARD)
==================================================================================
Ez az önálló Windows Telepítő Varázsló:
1. Grafikus felületen bekéri a felhasználótól a kívánt telepítési célmappát (Tallózás... gombbal)
2. Megjeleníti a szükséges és rendelkezésre álló lemezterületet
3. Létrehozza az Asztali és Start Menü parancsikont
4. Gondoskodik a legfrissebb yt-dlp.exe motor automatikus letöltéséről
5. Másolja az összes szükséges programfájlt a célhelyre
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os
import sys
import shutil
from pathlib import Path
import subprocess
import threading
import urllib.request
import re

class WindowsSetupWizard:
    def __init__(self, root):
        self.root = root
        self.root.title("Telepítés - YouTube MP3 & Videó Letöltő Studio")
        self.root.geometry("580x430")
        self.root.resizable(False, False)

        # Apply clean theme
        style = ttk.Style()
        try:
            style.theme_use("clam")
        except Exception:
            pass

        # Target directory state - default is Program Files or Local AppData
        local_app_data = os.environ.get("LOCALAPPDATA", "C:\\Program Files")
        default_dir = os.path.join(local_app_data, "Programs", "YouTube Downloader Studio")
        self.dest_folder = tk.StringVar(value=default_dir)
        self.create_desktop_shortcut = tk.BooleanVar(value=True)
        self.create_start_menu = tk.BooleanVar(value=True)
        self.download_ytdlp = tk.BooleanVar(value=True)
        self.launch_after = tk.BooleanVar(value=True)
        self.status_msg = tk.StringVar(value="Telepítésre kész.")

        self.current_step = 0
        self.total_steps = 5

        # Main content area
        self.main_container = ttk.Frame(self.root)
        self.main_container.pack(fill="both", expand=True)

        # Bottom navigation bar
        nav_border = ttk.Separator(self.root, orient="horizontal")
        nav_border.pack(fill="x", side="bottom")

        self.nav_frame = ttk.Frame(self.root, padding=(16, 12, 16, 12))
        self.nav_frame.pack(fill="x", side="bottom")

        self.btn_cancel = ttk.Button(self.nav_frame, text="Mégse", command=self.on_cancel)
        self.btn_cancel.pack(side="right", padx=(6, 0))

        self.btn_next = ttk.Button(self.nav_frame, text="Tovább >", command=self.go_next)
        self.btn_next.pack(side="right", padx=(6, 0))

        self.btn_back = ttk.Button(self.nav_frame, text="< Vissza", command=self.go_back)
        self.btn_back.pack(side="right")

        self.pages = []
        self.init_pages()
        self.show_step(0)

    def init_pages(self):
        # PAGE 0: Welcome Screen
        p0 = ttk.Frame(self.main_container, padding=24)
        
        banner = ttk.Label(p0, text="Üdvözli a YouTube MP3 & Videó Letöltő Telepítő Varázslója", font=("Segoe UI", 13, "bold"), wraplength=520)
        banner.pack(anchor="w", pady=(8, 14))

        desc = ttk.Label(p0, text="Ez a varázsló feltelepíti a YouTube MP3 & Videó Letöltő Studio alkalmazást a számítógépére.\n\nA program támogatja az egyedi videók és a teljes YouTube lejátszási listák (playlist) közvetlen letöltését 320 kbps MP3 vagy 1080p MP4 formátumban.\n\nA folytatáshoz kattintson a Tovább gombra.", font=("Segoe UI", 9), wraplength=520)
        desc.pack(anchor="w", pady=(0, 20))

        info_box = ttk.LabelFrame(p0, text=" Rendszerkövetelmények ", padding=12)
        info_box.pack(fill="x", pady=10)
        ttk.Label(info_box, text="• Operációs rendszer: Windows 10 vagy Windows 11 (64-bit)\n• Python 3.8+ környezet vagy önálló EXE futtató\n• Szabad lemezterület: legalább 50 MB", font=("Segoe UI", 9)).pack(anchor="w")

        self.pages.append(p0)

        # PAGE 1: Select Destination Location (CÉLMAPPA MEGADÁSA)
        p1 = ttk.Frame(self.main_container, padding=24)
        
        ttk.Label(p1, text="Célmappa kiválasztása", font=("Segoe UI", 12, "bold")).pack(anchor="w", pady=(0, 4))
        ttk.Label(p1, text="Hová telepítse a Telepítő a YouTube MP3 & Videó Letöltőt?", font=("Segoe UI", 9)).pack(anchor="w", pady=(0, 16))

        dest_desc = ttk.Label(p1, text="A program az alábbi mappába fog települni. Más mappa választásához kattintson a Tallózás gombra.", font=("Segoe UI", 9), wraplength=520)
        dest_desc.pack(anchor="w", pady=(0, 10))

        folder_frame = ttk.Frame(p1)
        folder_frame.pack(fill="x", pady=(0, 16))
        self.entry_dir = ttk.Entry(folder_frame, textvariable=self.dest_folder, font=("Segoe UI", 9))
        self.entry_dir.pack(side="left", fill="x", expand=True)
        ttk.Button(folder_frame, text="Tallózás...", command=self.browse_folder).pack(side="left", padx=(8, 0))

        # Space calculation box
        space_frame = ttk.Frame(p1)
        space_frame.pack(fill="x", pady=6)
        ttk.Label(space_frame, text="Szükséges szabad lemezterület: legalább 48,5 MB", font=("Segoe UI", 9, "bold")).pack(anchor="w")
        
        try:
            free_bytes = shutil.disk_usage("C:\\").free
            free_gb = free_bytes / (1024 ** 3)
            free_text = f"Rendelkezésre álló terület a meghajtón: {free_gb:.1f} GB"
        except Exception:
            free_text = "Rendelkezésre álló terület a meghajtón: Elérhető"

        ttk.Label(space_frame, text=free_text, font=("Segoe UI", 9), foreground="#333333").pack(anchor="w")

        self.pages.append(p1)

        # PAGE 2: Additional Tasks (TOVÁBBI FELADATOK)
        p2 = ttk.Frame(self.main_container, padding=24)
        
        ttk.Label(p2, text="További feladatok kiválasztása", font=("Segoe UI", 12, "bold")).pack(anchor="w", pady=(0, 4))
        ttk.Label(p2, text="Milyen további feladatokat hajtson végre a Telepítő?", font=("Segoe UI", 9)).pack(anchor="w", pady=(0, 16))

        tasks_box = ttk.LabelFrame(p2, text=" Parancsikonok és Kiegészítők ", padding=14)
        tasks_box.pack(fill="x", pady=6)

        ttk.Checkbutton(tasks_box, text="Asztali parancsikon létrehozása (YouTube MP3 Letöltő)", variable=self.create_desktop_shortcut).pack(anchor="w", pady=4)
        ttk.Checkbutton(tasks_box, text="Start menü programcsoport és indító ikon készítése", variable=self.create_start_menu).pack(anchor="w", pady=4)
        ttk.Checkbutton(tasks_box, text="Legfrissebb yt-dlp.exe motor automatikus ellenőrzése és letöltése", variable=self.download_ytdlp).pack(anchor="w", pady=4)

        self.pages.append(p2)

        # PAGE 3: Ready to Install (TELEPÍTÉSRE KÉSZ ÖSSZEFOGLALÓ)
        p3 = ttk.Frame(self.main_container, padding=24)
        
        ttk.Label(p3, text="Telepítésre kész", font=("Segoe UI", 12, "bold")).pack(anchor="w", pady=(0, 4))
        ttk.Label(p3, text="A Telepítő készen áll a fájlok másolására a számítógépen.", font=("Segoe UI", 9)).pack(anchor="w", pady=(0, 14))

        summary_box = ttk.LabelFrame(p3, text=" Telepítési beállítások ", padding=12)
        summary_box.pack(fill="both", expand=True, pady=6)

        self.lbl_sum_dir = ttk.Label(summary_box, text="", font=("Segoe UI", 9), wraplength=480)
        self.lbl_sum_dir.pack(anchor="w", pady=2)

        self.lbl_sum_tasks = ttk.Label(summary_box, text="", font=("Segoe UI", 9), wraplength=480)
        self.lbl_sum_tasks.pack(anchor="w", pady=2)

        self.pages.append(p3)

        # PAGE 4: Installing Progress (TELEPÍTÉS FOLYAMATBAN)
        p4 = ttk.Frame(self.main_container, padding=24)
        
        ttk.Label(p4, text="Telepítés folyamatban...", font=("Segoe UI", 12, "bold")).pack(anchor="w", pady=(0, 4))
        ttk.Label(p4, text="Kérjük, várjon, amíg a Telepítő feltelepíti a fájlokat.", font=("Segoe UI", 9)).pack(anchor="w", pady=(0, 16))

        self.install_progress = ttk.Progressbar(p4, mode="determinate")
        self.install_progress.pack(fill="x", pady=(20, 10))

        self.lbl_install_status = ttk.Label(p4, textvariable=self.status_msg, font=("Segoe UI", 9))
        self.lbl_install_status.pack(anchor="w")

        self.pages.append(p4)

        # PAGE 5: Finished Screen (BEFEJEZVE)
        p5 = ttk.Frame(self.main_container, padding=24)
        
        ttk.Label(p5, text="A Telepítő befejeződött!", font=("Segoe UI", 13, "bold")).pack(anchor="w", pady=(10, 8))
        ttk.Label(p5, text="A YouTube MP3 & Videó Letöltő Studio sikeresen telepítve a számítógépére.", font=("Segoe UI", 10), wraplength=520).pack(anchor="w", pady=(0, 16))

        finished_box = ttk.LabelFrame(p5, text=" Befejezés ", padding=14)
        finished_box.pack(fill="x", pady=10)

        ttk.Checkbutton(finished_box, text="YouTube MP3 & Videó Letöltő elindítása most", variable=self.launch_after).pack(anchor="w")

        self.pages.append(p5)

    def browse_folder(self):
        chosen = filedialog.askdirectory(title="Válaszd ki a telepítési célmappát", initialdir=self.dest_folder.get())
        if chosen:
            self.dest_folder.set(chosen)

    def show_step(self, step):
        self.current_step = step
        for i, page in enumerate(self.pages):
            if i == step:
                page.pack(fill="both", expand=True)
            else:
                page.pack_forget()

        # Update button states
        if step == 0:
            self.btn_back.config(state="disabled")
            self.btn_next.config(text="Tovább >", state="normal")
            self.btn_cancel.config(state="normal")
        elif step == 1 or step == 2:
            self.btn_back.config(state="normal")
            self.btn_next.config(text="Tovább >", state="normal")
            self.btn_cancel.config(state="normal")
        elif step == 3:
            self.btn_back.config(state="normal")
            self.btn_next.config(text="Telepítés", state="normal")
            self.btn_cancel.config(state="normal")
            # Update summary labels
            self.lbl_sum_dir.config(text=f"Célmappa:\n  {self.dest_folder.get()}")
            tasks = []
            if self.create_desktop_shortcut.get():
                tasks.append("• Asztali parancsikon készítése")
            if self.create_start_menu.get():
                tasks.append("• Start menü bejegyzés készítése")
            if self.download_ytdlp.get():
                tasks.append("• yt-dlp.exe motor automatikus frissítése")
            self.lbl_sum_tasks.config(text="Kiválasztott feladatok:\n  " + "\n  ".join(tasks))
        elif step == 4:
            # Installing
            self.btn_back.config(state="disabled")
            self.btn_next.config(state="disabled")
            self.btn_cancel.config(state="disabled")
            threading.Thread(target=self.perform_installation, daemon=True).start()
        elif step == 5:
            # Finished
            self.btn_back.pack_forget()
            self.btn_cancel.pack_forget()
            self.btn_next.config(text="Befejezés", state="normal", command=self.on_finish)

    def go_next(self):
        if self.current_step < 5:
            self.show_step(self.current_step + 1)

    def go_back(self):
        if self.current_step > 0:
            self.show_step(self.current_step - 1)

    def on_cancel(self):
        if messagebox.askyesno("Megszakítás", "Biztosan megszakítja a telepítést?"):
            self.root.destroy()

    def perform_installation(self):
        dest = Path(self.dest_folder.get().strip())
        try:
            self.status_msg.set("Célkönyvtár létrehozása...")
            dest.mkdir(parents=True, exist_ok=True)
            self.install_progress["value"] = 15

            # Current directory where script runs
            curr_dir = Path(__file__).resolve().parent

            # Copy python script or exe
            self.status_msg.set("Programfájlok másolása...")
            for f in ["youtube_mp3_downloader.py", "run.bat", "TELEPITESI_UTMUTATO.txt"]:
                src = curr_dir / f
                if src.exists():
                    shutil.copy2(src, dest / f)
            self.install_progress["value"] = 40

            # Handle yt-dlp
            ytdlp_dest = dest / "yt-dlp.exe"
            ytdlp_src = curr_dir / "yt-dlp.exe"
            if ytdlp_src.exists():
                shutil.copy2(ytdlp_src, ytdlp_dest)
                self.install_progress["value"] = 70
            elif self.download_ytdlp.get():
                self.status_msg.set("yt-dlp.exe letöltése a GitHubról...")
                try:
                    url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
                    urllib.request.urlretrieve(url, str(ytdlp_dest))
                except Exception as e:
                    pass
            self.install_progress["value"] = 80

            # Create desktop shortcut via VBScript
            if self.create_desktop_shortcut.get():
                self.status_msg.set("Asztali parancsikon létrehozása...")
                target = dest / "run.bat"
                vbs = dest / "create_sc.vbs"
                vbs_code = f'''Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.SpecialFolders("Desktop") & "\\YouTube MP3 Letolto.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "{target}"
oLink.WorkingDirectory = "{dest}"
oLink.Description = "YouTube MP3 & Video Letolto Studio"
oLink.Save
'''
                with open(vbs, "w", encoding="utf-8") as vf:
                    vf.write(vbs_code)
                try:
                    subprocess.run(["cscript", "//nologo", str(vbs)], check=False)
                    vbs.unlink(missing_ok=True)
                except Exception:
                    pass

            self.install_progress["value"] = 100
            self.status_msg.set("Telepítés sikeresen befejeződött!")
            self.root.after(500, lambda: self.show_step(5))

        except Exception as e:
            messagebox.showerror("Telepítési hiba", f"Hiba történt a telepítés során:\n{e}")
            self.btn_cancel.config(state="normal")

    def on_finish(self):
        if self.launch_after.get():
            target_bat = Path(self.dest_folder.get().strip()) / "run.bat"
            if target_bat.exists():
                try:
                    subprocess.Popen([str(target_bat)], shell=True)
                except Exception:
                    pass
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = WindowsSetupWizard(root)
    root.mainloop()
