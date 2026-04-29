/**
 * Base phrase set for the platform.
 * This is applied to a map for convenience.
 */
const phrases = {
  /* player position stuff */
  "position.type.label.guard":         "Guard",
  "position.type.label.pointGuard":    "Point Guard",
  "position.type.label.shootingGuard": "Shooting Guard",
  "position.type.label.forward":       "Forward",
  "position.type.label.smallForward":  "Small Forward",
  "position.type.label.powerForward":  "Power Forward",
  "position.type.label.center":        "Center",

  /* buttons */
  "button.create": "Create",
  "button.create.inProgress": "Creating",
  "button.update": "Update",
  "button.update.inProgress": "Updating",
  "button.cancel": "Cancel",
};

const phrasesMap = new Map<string, string>(Object.entries(phrases));

/**
 * This is built as a placeholder to apply something properly later.
 * @param key
 */
export const i18n = (key: string): string => {
  return phrasesMap.has(key)
    ? phrasesMap.get(key)! /* todo: revisit strict/null checks for phrases */
    : "Undefined.";
}
