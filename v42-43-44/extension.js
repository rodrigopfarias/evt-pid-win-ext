/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const { Gio } = imports.gi;

const DBUS_NODE_INTERFACE = `
<node>
    <interface name="org.gnome.Shell.Extensions.Evertrack">
       <method name="getWinFocusData">
            <arg type="s" direction="out" />
        </method>
        <method name="getWinPID">
            <arg type="s" direction="out" />
        </method>
    </interface>
</node>`;

class EvertrackExtension {
    constructor() {
        this._dbus = null;
    }

    enable() {
        log("Evertrack Extension enabled");

        if (!this._dbus) {
            const bus = Gio.bus_get_sync(Gio.BusType.SESSION, null);
            if (!bus) {
                log("Failed to connect to DBus session");
                return;
            }

            this._dbus = Gio.DBusExportedObject.wrapJSObject(DBUS_NODE_INTERFACE, this);

            try {
                this._dbus.export(bus, '/org/gnome/Shell/Extensions/Evertrack');
                log("DBus Object Exported successfully");
            } catch (e) {
                log("Failed to export DBus Object:", e);
            }
        }
    }

    disable() {
        log("Evertrack Extension disabled");

        if (this._dbus) {
            try {
                this._dbus.flush();
                this._dbus.unexport();
                log("DBus Object Unexported successfully");
            } catch (e) {
                log("Failed to unexport DBus Object:", e);
            }
            this._dbus = null;
        }
    }

    getWinFocusData() {
        const focusedWindow = global.get_window_actors()
            .map(a => a.meta_window)
            .find(w => w.has_focus());

        if (focusedWindow) {
            log("Focused Window Title: " + focusedWindow.get_title());
            return focusedWindow.get_title();
        } else {
            log("No focused window found");
            return "";
        }
    }

    getWinPID() {
        const focusedWindow = global.get_window_actors()
            .map(a => a.meta_window)
            .find(w => w.has_focus());

        if (focusedWindow) {
            log("Focused Window PID: " + focusedWindow.get_pid());
            return String(focusedWindow.get_pid());
        } else {
            log("No focused window found");
            return "";
        }
    }
}

function init() {
    log("Evertrack Extension initialized");
    return new EvertrackExtension();
}
