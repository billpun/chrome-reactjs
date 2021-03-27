interface AppRequest {
    type: "REQ_STATUS";
}

interface AppResponse {
    type: "STATUS";
    enable: boolean;
}

interface AppToggle {
    type: "TOGGLE";
    enable: boolean;
}

export type MessageTypes = AppRequest | AppResponse | AppToggle;
