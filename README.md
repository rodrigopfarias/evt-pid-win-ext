# evt-pid-win-ext

A GNOME Shell extension that uses D-Bus to identify the PID and window in focus.

## Installation

### Manual Installation - GNOME Shell 42, 43, and 44
#### https://extensions.gnome.org/extension/7854/evertrack-v2204/
```bash
sudo rm -rf /usr/share/{user}/extensions/evt-pid-win-extension-v2204@evertrack.com.br
sudo rm -rf ~/.local/share/{user}/extensions/evt-pid-win-extension-v2204@evertrack.com.br/
sudo cp -r evt-pid-win-extension-v2204@evertrack.com.br/ /usr/share/{user}/extensions/
sudo cp -r evt-pid-win-extension-v2204@evertrack.com.br/ ~/.local/share/{user}/extensions/
```

### Manual Installation - GNOME Shell 45, 46, and 47
#### https://extensions.gnome.org/extension/7844/evertrack/
```bash
sudo rm -rf /usr/share/{user}/extensions/evt-pid-win-extension@evertrack.com.br
sudo rm -rf ~/.local/share/{user}/extensions/evt-pid-win-extension@evertrack.com.br/
sudo cp -r evt-pid-win-extension@evertrack.com.br/ /usr/share/{user}/extensions/
sudo cp -r evt-pid-win-extension@evertrack.com.br/ ~/.local/share/{user}/extensions/
```

## Usage

### Get Window Focus Data
Retrieve information about the currently focused window:
```bash
gdbus call --session \
    --dest org.gnome.Shell \
    --object-path /org/gnome/Shell/Extensions/Evertrack \
    --method org.gnome.Shell.Extensions.Evertrack.getWinFocusData
```

### Get Window PID
Retrieve the process ID (PID) of the currently focused window:
```bash
gdbus call --session \
    --dest org.gnome.Shell \
    --object-path /org/gnome/Shell/Extensions/Evertrack \
    --method org.gnome.Shell.Extensions.Evertrack.getWinPID
```

