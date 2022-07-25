export declare enum Gateway {
    Default = "DEFAULT",
    Moonpay = "MOONPAY",
    Wyre = "WYRE"
}
export declare enum ValidationStatus {
    VALID = 0,
    INVALID = 1,
    NOT_AVAILABLE = 2
}
export interface IRule {
    message: string;
    validate: (val: any, params?: any) => boolean;
}
export declare type IRules = {
    [gateway in Gateway]: {
        [rule: string]: IRule;
    };
};
export declare class OnramperValidator {
    fields: any;
    errorMessages: any;
    rules: IRules;
    element: any;
    visibleFields: any;
    messagesShown: boolean;
    className: string;
    constructor(options?: any);
    getErrorMessages(): any;
    purgeFields(): void;
    showMessages(): void;
    showMessageFor: (field: string) => void;
    hideMessageFor: (field: string) => void;
    hideMessages(): void;
    allValid(): boolean;
    fieldValid(field: string): any;
    message(field: any, inputValue: any, gateway?: Gateway): any;
    validateAll(data: any, gateway?: Gateway): void;
    private checkValidity;
}
