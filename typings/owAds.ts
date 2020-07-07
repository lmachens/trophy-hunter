export declare type EventDispCallback = (data: any) => void;
export declare class EventDispatcher {
  addEventListener(eventName: string, listener: EventDispCallback): boolean;
  removeEventListener(eventName: string, listener: EventDispCallback): boolean;
  fireEvent(eventName: string, eventData: any): null | undefined;
}

export declare type OwAdOptionsSize = {
  width: number;
  height: number;
};

export interface OwAdOptions {
  autoplay?: boolean;
  size?: OwAdOptionsSize | OwAdOptionsSize[];
}

export declare class OwAd {
  constructor(container: HTMLElement, options: OwAdOptions);
  get uid(): string | null;
  get version(): string;
  get containerElem(): {
    id: string;
  };
  play(): boolean;
  pause(): boolean;
  refreshAd(refreshOptions: any): boolean;
  refreshCurrentWFstep(): void;
  removeAd(): boolean;
  addEventListener(eventName: string, listener: EventDispCallback): boolean;
  removeEventListener(eventName: string, listener: EventDispCallback): boolean;
}
