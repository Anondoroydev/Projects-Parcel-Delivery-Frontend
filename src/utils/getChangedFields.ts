// Enhanced version that handles arrays and edge cases
export const getChangedFieldsEnhanced = <T extends Record<string, any>>(
  original: T,
  edited: Partial<T>
): Partial<T> => {
  const changes: Partial<T> = {};

  // Check all fields in the edited object
  (Object.keys(edited) as Array<keyof T>).forEach((key) => {
    // Skip if key doesn't exist in original (newly added fields)
    if (!(key in original)) {
      changes[key] = edited[key];
      return;
    }

    const originalValue = original[key];
    const editedValue = edited[key];

    // Handle undefined/null values
    if (editedValue === undefined || editedValue === null) {
      if (originalValue !== editedValue) {
        changes[key] = editedValue;
      }
      return;
    }

    // Handle arrays
    if (Array.isArray(originalValue) || Array.isArray(editedValue)) {
      if (JSON.stringify(originalValue) !== JSON.stringify(editedValue)) {
        changes[key] = editedValue;
      }
      return;
    }

    // Handle nested objects
    if (
      typeof originalValue === "object" &&
      originalValue !== null &&
      typeof editedValue === "object" &&
      editedValue !== null
    ) {
      // Recursively check nested objects
      const nestedChanges = getChangedFieldsEnhanced(
        originalValue,
        editedValue as Partial<typeof originalValue>
      );

      // Only add the nested object if there are changes
      if (Object.keys(nestedChanges).length > 0) {
        changes[key] = nestedChanges as T[keyof T];
      }
    }
    // Handle primitive values
    else if (originalValue !== editedValue) {
      changes[key] = editedValue;
    }
  });

  return changes;
};
