export const getFrameInfoAsync = async (): Promise<Chat.UncheckedFrameInfo> => {
  return await new Promise(
    (resolve) =>
      chrome.runtime.sendMessage({ type: 'getFrameInfo' }, resolve)
  );
};

export const createPopup = (url: string): void => {
  chrome.runtime.sendMessage({ type: 'createPopup', url });
};

/*
 * Type predicates
 */
export const isPaidMessageRenderer =
  (r: Ytc.Renderers): r is Ytc.PaidMessageRenderer =>
    'purchaseAmountText' in r && 'bodyBackgroundColor' in r;

export const isPaidStickerRenderer =
  (r: Ytc.Renderers): r is Ytc.PaidStickerRenderer =>
    'purchaseAmountText' in r && 'moneyChipBackgroundColor' in r;

export const isMembershipRenderer =
  (r: Ytc.Renderers): r is Ytc.MembershipRenderer => 'headerSubtext' in r;

/** Checks if frameInfo values are valid */
export const isValidFrameInfo = (f: Chat.UncheckedFrameInfo, port?: Chat.Port): f is Chat.FrameInfo => {
  const check = f.tabId != null && f.frameId != null;
  if (!check) {
    console.error('Invalid frame info', { port });
  }
  return check;
};

export const responseIsAction = (r: Chat.BackgroundResponse): r is Chat.Actions => {
  const types = new Set(['message', 'bonk', 'delete', 'pin', 'unpin', 'playerProgress', 'forceUpdate']);
  return types.has(r.type);
};
