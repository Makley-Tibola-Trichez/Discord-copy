export class FieldOutsideFormContext extends Error {
  constructor(componentName: string, fieldName: string) {
    super(`${componentName} "${fieldName}" is outside of a Form context.`);
    this.name = "FieldOutsideFormContext";
  }
}
