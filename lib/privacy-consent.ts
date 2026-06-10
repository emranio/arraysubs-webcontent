export const COOKIE_CONSENT_EVENT = "arraysubs:open-cookie-consent";
export const COOKIE_CONSENT_NAME = "cc_cookie";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
// v2: analytics moved into the always-on "necessary" tier and a separate
// optional "retargeting" choice was added. Bumping invalidates v1 records so
// returning visitors are re-prompted for the new retargeting choice.
export const COOKIE_CONSENT_VERSION = 2;

// Marker cookie set to a unique 12-char id when a visitor opts in to
// retargeting; removed when they decline.
export const RETARGETING_COOKIE_NAME = "array_hash_re_ok";
export const RETARGETING_ID_LENGTH = 12;
