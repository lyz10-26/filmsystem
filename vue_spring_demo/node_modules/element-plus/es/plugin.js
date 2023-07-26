import { ElInfiniteScroll } from 'element-plus/es/components/infinite-scroll';
import { ElLoading } from 'element-plus/es/components/loading';
import { ElMessage } from 'element-plus/es/components/message';
import { ElMessageBox } from 'element-plus/es/components/message-box';
import { ElNotification } from 'element-plus/es/components/notification';
import { ElPopoverDirective } from 'element-plus/es/components/popover';

var plugin = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPopoverDirective
];

export { plugin as default };
