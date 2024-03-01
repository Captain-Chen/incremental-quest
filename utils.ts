export const capitalize = (resourceName: string) => {
    return resourceName.charAt(0).toUpperCase() + resourceName.substring(1);
}

export const updateObject = (oldObject: Object, newValues: Object) => {
    // Object.assign will perform a shallow copy and update the "oldObject"
    return Object.assign(oldObject, newValues);
}