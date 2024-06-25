export class ShouldNotReachError extends Error {
  constructor() {
    super("Cannot reach this place in the code");
    this.name = "CannotReachError";
  }
}
