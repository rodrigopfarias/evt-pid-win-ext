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

import Gio from 'gi://Gio';

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

export default class EvertrackExtension {
    enable() {
        if (!this._dbus) {
            this._dbus = Gio.DBusExportedObject.wrapJSObject(DBUS_NODE_INTERFACE, this);
            this._dbus.export(Gio.DBus.session, '/org/gnome/Shell/Extensions/Evertrack');
        }
    }

    disable() {
        if (this._dbus) {
            this._dbus.flush();
            this._dbus.unexport();
            this._dbus = null;
        }
    }

    getWinFocusData() {
        const focusedWindow = global.get_window_actors()
            .map(a => a.meta_window)
            .find(w => w.has_focus());

        return focusedWindow ? focusedWindow.get_title() : "";
    }

    getWinPID() {
        const focusedWindow = global.get_window_actors()
            .map(a => a.meta_window)
            .find(w => w.has_focus());

        return focusedWindow ? String(focusedWindow.get_pid()) : "";
    }
}