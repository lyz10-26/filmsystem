'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var infiniteScroll = require('element-plus/lib/components/infinite-scroll');
var loading = require('element-plus/lib/components/loading');
var message = require('element-plus/lib/components/message');
var messageBox = require('element-plus/lib/components/message-box');
var notification = require('element-plus/lib/components/notification');
var popover = require('element-plus/lib/components/popover');

var plugin = [
  infiniteScroll.ElInfiniteScroll,
  loading.ElLoading,
  message.ElMessage,
  messageBox.ElMessageBox,
  notification.ElNotification,
  popover.ElPopoverDirective
];

exports["default"] = plugin;
