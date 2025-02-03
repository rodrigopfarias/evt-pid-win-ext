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