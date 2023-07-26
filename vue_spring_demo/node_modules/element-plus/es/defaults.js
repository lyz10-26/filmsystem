import makeInstaller from './make-installer';
import Components from './component';
import Plugins from './plugin';

var defaults = makeInstaller([...Components, ...Plugins]);

export { defaults as default };
