#!/usr/bin/env python3
'''
Created by Yinon Cohen and Maor Shabtay on 25/12/2017.
'''
from tkinter import *
from tkinter import Tk, Label, PhotoImage,filedialog,messagebox
import socket
import signal, os, subprocess
import time

'''
    Dependent modules
'''
root = Tk()
var = IntVar()
IP_text = StringVar()
Port_text = StringVar()
fs_text = StringVar(root, '/home')
FileDownload_text = StringVar(root,'/')

'''
    create the GUI of attacker
'''
var.set(1)
#size windows
root.geometry("620x413+0+0")
root.title("Final Project DDoS Attack")

#background image
canv = Canvas(root, width=620, height=413, bg='white')
canv.grid(row=2, column=3)
img = PhotoImage(file="image/hacker.png")
canv.create_image(0,0, anchor=NW, image=img)

#labels & Entry
label_MAIN = Label(root, text="DoS Attacker", bg="black", fg="#fecc15", font="Ariel 20 bold")
label_IP = Label(root, text="IP Dest:", bg="black", fg="#fecc15", font="Ariel 10 bold")
label_Port = Label(root, text="Port:",bg="black", fg="#fecc15", font="Ariel 10 bold")
label_fs = Label(root, text="fs:",bg="black", fg="#fecc15", font="Ariel 10 bold")
label_FileDownload = Label(root, text="file:", bg="black", fg="#fecc15", font="Ariel 10 bold")
Entry_IP = Entry(root, textvariable=IP_text)
Entry_Port = Entry(root, textvariable=Port_text)
Entry_fs = Entry(root, textvariable=fs_text)
Entry_FileDownload = Entry(root, textvariable=FileDownload_text)
label_MAIN.place(x=210,y=50)
label_IP.place(x=170,y=100)
label_Port.place(x=170,y=120)
label_fs.place(x=170,y=140)
label_FileDownload.place(x=170,y=160)
Entry_IP.place(x=240,y=100)
Entry_Port.place(x=240,y=120)
Entry_fs.place(x=240,y=140)
Entry_FileDownload.place(x=240,y=160)
Entry_FileDownload.config(state="readonly")

#clock
class tick():
    def __init__(self):
        self.label = Label(root,text="", font=('times', 12, 'bold'), bg="black", fg="#fecc15")
        self.label.place(x=5,y=5)
        self.update_clock()

    def update_clock(self):
        now = time.strftime("%D  %H:%M:%S")
        self.label.configure(text=now)
        root.after(1000, self.update_clock)
tick()
# options to add attack types
MODES = [
    ("Traffic Flood", 1),
]

v = StringVar()
v.set("L")
# initialize options
i=0

b=[0]
def chooseAttack():
    b[0].configure(background="black")
    selection = var.get()
    if (selection == 1):
        b[0].configure(background="blue")

for text, mode in MODES:
    b[i] = Radiobutton(root, text=text,indicatoron = 1,width = 10,padx=10,variable=var , bg="black", fg="#fecc15", font="Ariel 10 bold", value=mode, command=chooseAttack)
    b[i].place(x=250, y=200+(i*25))
    i=i+1
    #print (mode)
b[0].configure(background="blue")
#searh file to download inside
def browsecv():
    filename = filedialog.askdirectory()
    if (os.path.isdir(filename)):
        Entry_FileDownload.configure(state='normal')
        Entry_FileDownload.delete(0,END)
        Entry_FileDownload.insert(0,filename)
        Entry_FileDownload.config(state="readonly")
    else:
        Entry_FileDownload.configure(state='normal')
        Entry_FileDownload.delete(0,END)
        Entry_FileDownload.insert(0,"/")
        Entry_FileDownload.config(state="readonly")
        messagebox.showwarning("PATH ERROR", "Path not exist")

#button choose file
bbutton = Button(root, text = "browse", bg="black", fg="#fecc15", font="Ariel 10 bold", command=browsecv)
bbutton.place(x=420,y=155)

'''
    check ip and port is validity
'''
#check IP
def isValidAddress():
    try:
        socket.inet_pton(socket.AF_INET, IP_text.get())
    except AttributeError:  # no inet_pton here, sorry
        try:
            socket.inet_aton(IP_text.get())
        except socket.error:
            return False
        return IP_text.get().count('.') == 3
    except socket.error:  # not a valid address
        return False

    return True
#check port
def isValidPort():
    try:
        if (int(Port_text.get())>0 and int(Port_text.get())<65536):
            return True
        else:
            return False
    except ValueError:
        return False
#Error for wrong details
def checkMsg():
    if (not isValidAddress()):
        Entry_IP.focus_set()
        messagebox.showwarning("IP ERROR", "Your IP must between 0.0.0.0 to 255.255.255.255")
        return False;
    if (not isValidPort()):
        Entry_Port.focus_set()
        messagebox.showwarning("Port ERROR", "Your port must between 1 to 65535")
        return False
    return True
#click on START/STOP
nodeAttack=0

'''
    Creating the attack by the parameters that client choose
'''
def toggle_text():
    global texti, nodeAttack
    if button_start["text"] == "START":
        if not checkMsg():
            return;
        selection = var.get()
        nodeAttack = subprocess.Popen(["node","request","-t",str(IP_text.get()),"-p",str(Port_text.get()),"-f",str(FileDownload_text)])
        button_start["text"] = "STOP"
        texti = 'stop'
        ToolBar()
    else:
        try:
            nodeAttack.send_signal(signal.SIGINT)
        except:
            button_start["text"] = "START"
        finally:
            button_start["text"] = "START"
            texti = 'start'
            ToolBar()

button_start = Button(root, text="START", bg="black", fg="#fecc15", font="Ariel 10 bold", command=toggle_text)
button_start.place(x=280,y=270)

'''
    Define toolbar on GUI
'''
texti= 'start'
class ToolBar(Frame):
    global texti
    t=0
    def __init__(self):
        super().__init__()

        self.initUI()


    def initUI(self):
        self.master.title("DoS Attacker")

        menubar = Menu(self.master)
        self.master.config(menu=menubar)


        fileMenu = Menu(menubar)
        fileMenu.add_command(label=texti,foreground="#fecc15" , command=self.onStart)
        fileMenu.add_command(label="Exit",foreground="#fecc15", command=self.onExit)
        menubar.add_cascade(label="File",foreground="#fecc15", menu=fileMenu)
        menubar.add_command(label="README", foreground="#fecc15",command=self.onReadMe)
        menubar.configure(background="black", font=("Ariel", "8", "bold"))
        fileMenu.configure(background="black")

    def onStart(self):

        self.initUI()
        toggle_text()


    def onExit(self):
        self.quit()

    def onReadMe(self):
        global t
        try:
            t=t.destroy()
        except:
            t = Toplevel(self)
            t.wm_title("README")
            file = open("howtouse.txt", "r")
            i=1
            for line in file:
                l = Label(t, text=line)
                l.pack(side=TOP, anchor=W)
                i=i+1


ToolBar()

root.mainloop()


