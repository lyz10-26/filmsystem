declare const _default: ((import("vue").ObjectDirective<any, any> & ((app: import("vue").App<any>, ...options: any[]) => any) & {
    install?: (app: import("vue").App<any>, ...options: any[]) => any;
}) | (import("vue").ObjectDirective<any, any> & {
    install: (app: import("vue").App<any>, ...options: any[]) => any;
}) | {
    install(app: import("vue").App<any>): void;
    directive: {
        mounted(el: import("./components/loading/src/directive").ElementLoading, binding: import("vue").DirectiveBinding<any>): void;
        updated(el: import("./components/loading/src/directive").ElementLoading, binding: import("vue").DirectiveBinding<any>): void;
        unmounted(el: import("./components/loading/src/directive").ElementLoading): void;
    };
    service: (options?: import("./components/loading").ILoadingOptions) => import("./components/loading").ILoadingInstance;
} | (import("./components/message").Message & ((app: import("vue").App<any>, ...options: any[]) => any) & {
    install?: (app: import("vue").App<any>, ...options: any[]) => any;
}) | (import("./components/message").Message & {
    install: (app: import("vue").App<any>, ...options: any[]) => any;
}) | (import("./components/message-box").IElMessageBox & ((app: import("vue").App<any>, ...options: any[]) => any) & {
    install?: (app: import("vue").App<any>, ...options: any[]) => any;
}) | (import("./components/message-box").IElMessageBox & {
    install: (app: import("vue").App<any>, ...options: any[]) => any;
}) | (import("./components/notification").Notify & ((app: import("vue").App<any>, ...options: any[]) => any) & {
    install?: (app: import("vue").App<any>, ...options: any[]) => any;
}) | (import("./components/notification").Notify & {
    install: (app: import("vue").App<any>, ...options: any[]) => any;
}))[];
export default _default;
